import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for Profile Pictures
const profilePictureStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_user_profile_pictures", // Folder for profile pictures
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 300, height: 300, crop: "fill" }], // Resize profile picture
  },
});

// Storage for Post Images
const postImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_post_images", // Folder for post images
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 800, height: 500, crop: "fill" }], // Resize post images
  },
});

// Multer middleware for uploads
const uploadProfilePicture = multer({ storage: profilePictureStorage });
const uploadPostImage = multer({ storage: postImageStorage });

export { uploadProfilePicture, uploadPostImage, cloudinary };
