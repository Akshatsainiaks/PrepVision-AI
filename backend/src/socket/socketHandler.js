// // socket/socketHandler.js

// const ChatMessage = require("../models/ChatMessage");

// module.exports = function socketHandler(io) {
//   // 🔥 Presence Mapping
//   const presence = new Map();

//   const broadcastPresence = () => {
//     const users = Array.from(presence.values()).map((u) => ({
//       id: u.id,
//       name: u.name,
//     }));

//     io.emit("presence:update", users);
//   };

//   io.on("connection", (socket) => {
//     console.log("⚡ Socket connected:", socket.id);

//     // --------------------------
//     // IDENTIFY USER
//     // --------------------------
//     socket.on("identify", ({ id: userId, name }) => {
//       if (!userId) return;

//       const existing = presence.get(userId) || {
//         id: userId,
//         name: name || "User",
//         socketIds: new Set(),
//       };

//       existing.name = name || existing.name;
//       existing.socketIds.add(socket.id);

//       presence.set(userId, existing);
//       broadcastPresence();
//     });

//     // --------------------------
//     // JOIN A GROUP
//     // --------------------------
//     socket.on("joinGroup", (groupId) => {
//       if (!groupId) return;
//       socket.join(groupId);
//       console.log(`➡️ Joined group: ${groupId}`);
//     });

//     // --------------------------
//     // LEAVE A GROUP
//     // --------------------------
//     socket.on("leaveGroup", (groupId) => {
//       socket.leave(groupId);
//       console.log(`⬅️ Left group: ${groupId}`);
//     });

//     // --------------------------
//     // TYPING INDICATOR
//     // --------------------------
//     socket.on("typing", ({ groupId, isTyping, user }) => {
//       if (!groupId || !user) return;
//       socket.to(groupId).emit("userTyping", { user, isTyping });
//     });

//     // --------------------------
//     // READ RECEIPTS
//     // --------------------------
//     socket.on("readMessages", async ({ groupId, messageIds, userId }) => {
//       if (!groupId || !messageIds || !userId) return;

//       try {
//         await ChatMessage.updateMany(
//           { _id: { $in: messageIds } },
//           { $addToSet: { readBy: userId } }
//         );
//       } catch (e) {
//         console.error("Read receipt error:", e);
//       }

//       io.to(groupId).emit("messagesRead", { messageIds, userId });
//     });

//     // --------------------------
//     // GROUP MESSAGE
//     // --------------------------
//     socket.on("groupMessage", async (payload) => {
//       try {
//         const { groupId, message, userId, type, attachments = [] } = payload;

//         if (!groupId || (!message && attachments.length === 0) || !userId) {
//           console.log("Invalid message payload");
//           return;
//         }

//         const saved = await ChatMessage.create({
//           groupId,
//           message,
//           user: userId,
//           type,
//           attachments,
//         });

//         const populated = await saved.populate("user", "name");
//         io.to(groupId).emit("newMessage", populated);
//       } catch (err) {
//         console.error("Chat save error:", err);
//       }
//     });

//     // --------------------------
//     // DISCONNECT
//     // --------------------------
//     socket.on("disconnect", () => {
//       for (const [userId, info] of presence.entries()) {
//         if (info.socketIds.has(socket.id)) {
//           info.socketIds.delete(socket.id);

//           if (info.socketIds.size === 0) presence.delete(userId);
//           else presence.set(userId, info);

//           break;
//         }
//       }

//       broadcastPresence();
//       console.log("❌ Socket disconnected:", socket.id);
//     });
//   });
// };


//next acc claude code
const ChatMessage = require("../models/ChatMessage");

module.exports = function socketHandler(io) {
  // presence map: userId → { id, name, avatar, socketIds: Set }
  const presence = new Map();

  const broadcastPresence = () => {
    const users = Array.from(presence.values()).map((u) => ({
      id: u.id,
      name: u.name,
      avatar: u.avatar || "",
    }));
    io.emit("presence:update", users);
  };

  const getDMRoomId = (a, b) => "dm_" + [a, b].sort().join("_");

  // Validate a MongoDB ObjectId string
  const isValidId = (id) =>
    typeof id === "string" && /^[a-f\d]{24}$/i.test(id);

  io.on("connection", (socket) => {
    // ── Use userId from JWT (set in server.js io.use middleware) ─
    // socket.data.userId is verified from JWT. We NEVER use userId
    // sent from client payloads for any DB write.
    const authedUserId = socket.data.userId;
    const authedName   = socket.data.name || "User";

    // ── Identify / register presence ─────────────────────────────
    socket.on("identify", ({ name, avatar } = {}) => {
      if (!authedUserId) return;

      const existing = presence.get(authedUserId) || {
        id:        authedUserId,
        name:      name || authedName,
        avatar:    avatar || "",
        socketIds: new Set(),
      };
      existing.name   = name || existing.name;
      existing.avatar = avatar || existing.avatar;
      existing.socketIds.add(socket.id);

      socket.userId = authedUserId;
      presence.set(authedUserId, existing);
      broadcastPresence();
    });

    // ── Channel join / leave ──────────────────────────────────────
    socket.on("joinGroup", (groupId) => {
      if (groupId) socket.join(groupId);
    });

    socket.on("leaveGroup", (groupId) => {
      if (groupId) socket.leave(groupId);
    });

    // ── DM room join ──────────────────────────────────────────────
    socket.on("joinDM", ({ peerId } = {}) => {
      if (!authedUserId || !peerId) return;
      const room = getDMRoomId(authedUserId, peerId);
      socket.join(room);
      // Also force peer's sockets into the room if they're online
      const peer = presence.get(peerId);
      if (peer) {
        peer.socketIds.forEach(sid => {
          const peerSocket = io.sockets.sockets.get(sid);
          if (peerSocket) peerSocket.join(room);
        });
      }
    });

    // ── Typing indicators ─────────────────────────────────────────
    socket.on("typing", ({ groupId, isTyping } = {}) => {
      if (!groupId || !authedUserId) return;
      const user = { id: authedUserId, name: presence.get(authedUserId)?.name || authedName };
      socket.to(groupId).emit("userTyping", { user, isTyping });
    });

    // ── Mark messages as read ─────────────────────────────────────
    socket.on("readMessages", async ({ groupId, messageIds } = {}) => {
      if (!groupId || !messageIds?.length || !authedUserId) return;
      try {
        await ChatMessage.updateMany(
          { _id: { $in: messageIds } },
          { $addToSet: { readBy: authedUserId } }
        );
        io.to(groupId).emit("messagesRead", { messageIds, userId: authedUserId });
      } catch (e) {
        console.error("readMessages error:", e);
      }
    });

    // ── Group / Channel message ───────────────────────────────────
    // userId always comes from JWT (authedUserId), NOT from payload
    socket.on("groupMessage", async (payload = {}) => {
      try {
        const { groupId, message, type = "text", attachments = [], replyTo = null } = payload;

        if (!authedUserId || !isValidId(authedUserId)) {
          console.warn("groupMessage blocked — not authenticated, userId:", authedUserId);
          return;
        }
        if (!groupId || (!message?.trim() && !attachments.length)) {
          console.warn("groupMessage blocked — missing groupId or message");
          return;
        }

        const saved = await ChatMessage.create({
          groupId,
          message:  message?.trim(),
          user:     authedUserId,
          type,
          attachments,
          replyTo:  replyTo || null,
        });

        const populated = await saved.populate([
          { path: "user",    select: "name avatar" },
          { path: "replyTo", populate: { path: "user", select: "name" } },
        ]);

        io.to(groupId).emit("newMessage", populated.toObject());
      } catch (err) {
        console.error("groupMessage socket error:", err);
      }
    });

    // ── Direct Message ────────────────────────────────────────────
    socket.on("directMessage", async (payload = {}) => {
      try {
        const { toId, message, type = "text", attachments = [] } = payload;

        if (!authedUserId || !isValidId(authedUserId)) {
          console.warn("directMessage blocked — not authenticated");
          return;
        }
        if (!isValidId(toId)) {
          console.warn("directMessage blocked — invalid toId:", toId);
          return;
        }
        if (!message?.trim() && !attachments.length) return;

        const room = getDMRoomId(authedUserId, toId);

        // Ensure both sender's socket is in the room
        socket.join(room);

        const saved = await ChatMessage.create({
          groupId:  room,
          message:  message?.trim(),
          user:     authedUserId,
          type,
          attachments,
          private:  true,
        });

        const populated = await saved.populate("user", "name avatar");
        io.to(room).emit("newMessage", populated.toObject());

        // Notify recipient for unread tracking
        const recipient = presence.get(toId);
        if (recipient) {
          recipient.socketIds.forEach((sid) => {
            const recipientSocket = io.sockets.sockets.get(sid);
            if (recipientSocket) {
              // Only send dmNotification if NOT actively viewing this room
              io.to(sid).emit("dmNotification", {
                from:   { id: authedUserId, name: presence.get(authedUserId)?.name },
                roomId: room,
                message: message?.trim(),
              });
            }
          });
        }
      } catch (err) {
        console.error("directMessage socket error:", err);
      }
    });

    // ── Reactions ─────────────────────────────────────────────────
    socket.on("reactToMessage", async ({ msgId, emoji, groupId } = {}) => {
      if (!msgId || !emoji || !authedUserId || !groupId) return;
      try {
        const msg = await ChatMessage.findById(msgId);
        if (!msg) return;

        const reactions = msg.reactions || new Map();
        const users     = reactions.get(emoji) || [];

        if (users.includes(authedUserId)) {
          const updated = users.filter((u) => u !== authedUserId);
          if (updated.length === 0) reactions.delete(emoji);
          else reactions.set(emoji, updated);
        } else {
          reactions.set(emoji, [...users, authedUserId]);
        }

        msg.reactions = reactions;
        await msg.save();

        const reactionsObj = {};
        msg.reactions.forEach((v, k) => { reactionsObj[k] = v; });
        io.to(groupId).emit("messageReaction", { msgId, reactions: reactionsObj });
      } catch (err) {
        console.error("reaction error:", err);
      }
    });

    // ── Delete message ────────────────────────────────────────────
    socket.on("deleteMessage", async ({ msgId, groupId } = {}) => {
      if (!msgId || !groupId || !authedUserId) return;
      try {
        const msg = await ChatMessage.findById(msgId);
        if (!msg || msg.user.toString() !== authedUserId) return;
        await msg.deleteOne();
        io.to(groupId).emit("messageDeleted", { msgId });
      } catch (err) {
        console.error("deleteMessage error:", err);
      }
    });

    // ── Edit message ──────────────────────────────────────────────
    socket.on("editMessage", async ({ msgId, message, groupId } = {}) => {
      if (!msgId || !message || !groupId || !authedUserId) return;
      try {
        const msg = await ChatMessage.findById(msgId);
        if (!msg || msg.user.toString() !== authedUserId) return;
        msg.message = message.trim();
        msg.edited  = true;
        await msg.save();
        io.to(groupId).emit("messageEdited", { msgId, message: message.trim(), edited: true });
      } catch (err) {
        console.error("editMessage error:", err);
      }
    });

    // ── Disconnect ────────────────────────────────────────────────
    socket.on("disconnect", () => {
      const userId = socket.userId || authedUserId;
      if (userId) {
        const info = presence.get(userId);
        if (info) {
          info.socketIds.delete(socket.id);
          if (info.socketIds.size === 0) presence.delete(userId);
          else presence.set(userId, info);
        }
      }
      broadcastPresence();
    });
  });
};