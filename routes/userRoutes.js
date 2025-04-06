import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  deleteUser,
} from "../controllers/userControllers.js";
import { adminGuard, authGuard } from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" })

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile/:userId", authGuard, updateProfile);
router.put("/updateProfilePicture", authGuard,upload.single("profilePicture"), updateProfilePicture);
router.get("/", authGuard, adminGuard, getAllUsers);
router.delete("/:userId", authGuard, adminGuard, deleteUser);

export default router;
