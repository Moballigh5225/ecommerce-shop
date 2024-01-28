import mongoose from "mongoose";
import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserByID).put(updateUser);

export default router;
