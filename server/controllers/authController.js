const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Member = require("../models/Members");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ username, email, password });
    console.log("Password before save:", user.password);
    await user.save();
    console.log("Hashed password after save:", user.password);
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log("Queried user:", user);
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    console.log("Plain text password:", password);
    console.log("Hashed password from DB:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true });
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
};

exports.getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.addMember = async (req, res) => {
  const { name, contactNumber, address, numberOfBody, userId } = req.body;
  try {
    // Create a new member
    const newMember = new Member({
      name,
      contactNumber,
      address,
      numberOfBody,
      userId,
    });

    // Save the member to the database
    await newMember.save();

    res
      .status(201)
      .json({ msg: "Member added successfully", member: newMember });
  } catch (err) {
    console.error("Error adding member:", err.message);
    res.status(500).send("Server error");
  }
};
