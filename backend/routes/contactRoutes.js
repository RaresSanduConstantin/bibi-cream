import express from "express";
const router = express.Router();
import {
  addContactForm,
  getContactForm,
  deleteContactForm,
  getContactById,
} from "../controllers/contactController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(addContactForm);
router.route("/").get(protect, admin, getContactForm);
router.route("/:id").get(protect, admin, getContactById);
router.route("/:id").delete(protect, admin, deleteContactForm);

export default router;
