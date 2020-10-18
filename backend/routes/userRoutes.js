import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").get(protect, admin, getUsers);
router.route("/:id").delete(protect, admin, deleteUser);
router.route("/:id").get(protect, admin, getUserById);
router.route("/:id").put(protect, admin, updateUser);

export default router;
