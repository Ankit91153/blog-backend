import express from "express";
const router = express.Router();
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postControllers.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" })

router.route("/").post(authGuard, adminGuard, createPost).get(getAllPosts);
router
  .route("/:slug")
  .put(authGuard, adminGuard,upload.single("postPicture"), updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

export default router;
