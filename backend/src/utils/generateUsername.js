const User = require("../models/User");

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 20);

const generateUsername = async (name) => {
  const base = slugify(name);
  let username = base;
  let exists = true;

  while (exists) {
    const random = Math.floor(100 + Math.random() * 900); // 3 digits
    username = `${base}${random}`;
    exists = await User.exists({ username });
  }

  return username;
};

module.exports = generateUsername;
