const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success)
    return res.status(411).json({
      message: "Error while updating information",
    });

  const user = await User.findByIdAndUpdate(req.userId, { ...req.body });

  await user.save();

  return res.status(200).json({
    message: "Updated successfully",
  });
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success)
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });

  const { username, firstName, lastName, password } = req.body;
  const initialBalance = Math.floor(Math.random() * 10000) + 1;

  const user = await User.findOne({ username });
  if (user)
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });

  const newUser = new User({ username, firstName, lastName });

  const hashedPassword = await newUser.createHash(password);
  newUser.password = hashedPassword;

  await Account.create({
    userId: newUser._id,
    balance: initialBalance,
  });

  await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

  return res.status(200).json({
    message: "User created successfully",
    token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success)
    return res.status(411).json({
      message: "Error while logging in",
    });

  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user)
    return res.status(411).json({
      message: "Error while logging in",
    });

  const validPassword = await user.validatePassword(password);
  if (!validPassword)
    return res.status(411).json({
      message: "Error while logging in",
    });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  return res.status(200).json({
    token,
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const { filter } = req.query || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.status(200).json({
    users: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
