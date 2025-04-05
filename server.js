import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import cors from "cors";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler";

// Routes
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import postCategoriesRoutes from "./routes/postCategoriesRoutes";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGIN.split(",") || [];

console.log(allowedOrigins);
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies/auth headers
  optionsSuccessStatus: 200,
  exposedHeaders: ["Content-Length", "X-Total-Count"], // Expose additional headers if needed
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
