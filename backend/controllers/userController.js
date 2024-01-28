import asynchHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// here we are creating all the controllers for the routes to perform the authentication process from the backend

// controller -> routes ->

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public

const authUser = asynchHandler(async (req, res) => {
  const { email, password } = req.body;

  // here we are using findOne mongodb method to find single document with the collection
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
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
  res.send("register user");
});

// @desc   Logout user / clear cookie
// @route  POST /api/users/logout
// @access Private

const logoutUser = asynchHandler(async (req, res) => {
  res.send("Logout user");
});

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private

const getUserProfile = asynchHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private

const updateUserProfile = asynchHandler(async (req, res) => {
  res.send("Update user profile");
});

// @desc   Get users
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
