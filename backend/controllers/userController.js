import asynchHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// here we are creating all the controllers for the routes to perform the authentication process from the backend

// controller -> routes ->

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public

const authUser = asynchHandler(async (req, res) => {
  // data we are getting here as props from the user which is getting posted on
  // /login and we are destructring the data and getting it from the body

  const { email, password } = req.body;

  // here we are using findOne mongodb method to find single document with the collection
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Register user
// @route  POST /api/users
// @access Public

const registerUser = asynchHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // simply created a function which takes in response and user id and create token and stored it in the cookie as http-only cookie

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Logout user / clear cookie
// @route  POST /api/users/logout
// @access Private

const logoutUser = asynchHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private

const getUserProfile = asynchHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private

const updateUserProfile = asynchHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Get all users
// @route  GET /api/users
// @access Private/Admin

const getUsers = asynchHandler(async (req, res) => {
  res.send("get users");
});

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private/Admin

const getUserByID = asynchHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Admin

const deleteUser = asynchHandler(async (req, res) => {
  res.send("delete users");
});

// @desc   update user
// @route  PUT /api/users/:id
// @access Private/Admin

const updateUser = asynchHandler(async (req, res) => {
  res.send("update users");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
};
