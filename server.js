import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import postCategoriesRoutes from "./routes/postCategoriesRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin:", origin); // Debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // optionsSuccessStatus: 200,
  //  allowedHeaders: "Content-Type, Authorization"
  exposedHeaders: "*",

};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ➕ Add a ping route to keep DB/server awake
app.get("/ping", (req, res) => {
    res.status(200).json({ success: true, message: "Server is live!" })
})

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);

// static assets
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
