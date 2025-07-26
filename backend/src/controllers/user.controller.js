// Import dependencies
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../services/db");

// Controller for user registration
exports.register = async (req, res) => {
  if (req.body instanceof Buffer) {
    req.body = JSON.parse(req.body.toString());
  }
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await db.getByEmail("Users", email);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" }); // HTTP 409 = Conflict
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
    };

    // Store new user in the database
    await db.put("Users", newUser);

    res.json({ message: "User registered", userId: newUser.id });
  } catch (err) {
    // Handle registration errors
    console.error("Registration error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Controller for user login
exports.login = async (req, res) => {
  if (req.body instanceof Buffer) {
    req.body = JSON.parse(req.body.toString());
  }
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await db.getByEmail("Users", email);
    if (!user) {
      return res.status(401).json({ error: "User does not exists" });
    }
    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    // Generate JWT token for authenticated user
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ message: "Logged in", userId: user.id, token });
  } catch (err) {
    // Handle login errors
    res.status(500).json({ error: err.message });
  }
};
