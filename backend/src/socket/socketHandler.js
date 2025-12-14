// socket/socketHandler.js

const ChatMessage = require("../models/ChatMessage");

module.exports = function socketHandler(io) {
  // 🔥 Presence Mapping
  const presence = new Map();

  const broadcastPresence = () => {
    const users = Array.from(presence.values()).map((u) => ({
      id: u.id,
      name: u.name,
    }));

    io.emit("presence:update", users);
  };

  io.on("connection", (socket) => {
    console.log("⚡ Socket connected:", socket.id);

    // --------------------------
    // IDENTIFY USER
    // --------------------------
    socket.on("identify", ({ id: userId, name }) => {
      if (!userId) return;

      const existing = presence.get(userId) || {
        id: userId,
        name: name || "User",
        socketIds: new Set(),
      };

      existing.name = name || existing.name;
      existing.socketIds.add(socket.id);

      presence.set(userId, existing);
      broadcastPresence();
    });

    // --------------------------
    // JOIN A GROUP
    // --------------------------
    socket.on("joinGroup", (groupId) => {
      if (!groupId) return;
      socket.join(groupId);
      console.log(`➡️ Joined group: ${groupId}`);
    });

    // --------------------------
    // LEAVE A GROUP
    // --------------------------
    socket.on("leaveGroup", (groupId) => {
      socket.leave(groupId);
      console.log(`⬅️ Left group: ${groupId}`);
    });

    // --------------------------
    // TYPING INDICATOR
    // --------------------------
    socket.on("typing", ({ groupId, isTyping, user }) => {
      if (!groupId || !user) return;
      socket.to(groupId).emit("userTyping", { user, isTyping });
    });

    // --------------------------
    // READ RECEIPTS
    // --------------------------
    socket.on("readMessages", async ({ groupId, messageIds, userId }) => {
      if (!groupId || !messageIds || !userId) return;

      try {
        await ChatMessage.updateMany(
          { _id: { $in: messageIds } },
          { $addToSet: { readBy: userId } }
        );
      } catch (e) {
        console.error("Read receipt error:", e);
      }

      io.to(groupId).emit("messagesRead", { messageIds, userId });
    });

    // --------------------------
    // GROUP MESSAGE
    // --------------------------
    socket.on("groupMessage", async (payload) => {
      try {
        const { groupId, message, userId, type, attachments = [] } = payload;

        if (!groupId || (!message && attachments.length === 0) || !userId) {
          console.log("Invalid message payload");
          return;
        }

        const saved = await ChatMessage.create({
          groupId,
          message,
          user: userId,
          type,
          attachments,
        });

        const populated = await saved.populate("user", "name");
        io.to(groupId).emit("newMessage", populated);
      } catch (err) {
        console.error("Chat save error:", err);
      }
    });

    // --------------------------
    // DISCONNECT
    // --------------------------
    socket.on("disconnect", () => {
      for (const [userId, info] of presence.entries()) {
        if (info.socketIds.has(socket.id)) {
          info.socketIds.delete(socket.id);

          if (info.socketIds.size === 0) presence.delete(userId);
          else presence.set(userId, info);

          break;
        }
      }

      broadcastPresence();
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
};
