// /* eslint-disable @typescript-eslint/no-explicit-any */
// import multer from "multer";
// import CloudinaryStorage from "multer-storage-cloudinary";



// import { cloudinary } from "../cloudinary/cloudinary.config";
// import { config } from "../../shared/config";


// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "blog_images",
//     allowed_formats: ["jpg", "png", "jpeg"],
//     public_id: (req: unknown, file: { originalname: string }) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.replace(/\.[^/.]+$/, "");
//       return `${originalName}-${timestamp}`;
//     },
//   } as any,
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     console.log(file)
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type! Only JPEG, PNG, and JPG are allowed."));
//     }
//   },
// });

// export default upload;


// /* eslint-disable @typescript-eslint/no-explicit-any */
// import multer from "multer";
// import CloudinaryStorage from "multer-storage-cloudinary";
// import cloudinary from "cloudinary"
// import { config } from "../../shared/config";
// import { v2 as cld } from "cloudinary"; 

// // 1. Configure the cld (v2) object
// cld.config({
//     cloud_name: config.cloudinary.CLOUDINARY_CLOUD_NAME!,
//     api_key: config.cloudinary.CLOUDINARY_API_KEY!,
//     api_secret: config.cloudinary.CLOUDINARY_SECRET!
// });


// const storage = new CloudinaryStorage({
//     // 2. PASS THE CONFIGURED V2 INSTANCE DIRECTLY
//     cloudinary: cld as any, // Pass 'cld' (the configured v2 instance)
//     params: {
//         folder: 'blog-images',
//         allowedFormats: ['jpg', 'png']
//     }
// })

// ... rest of your multer setup ...


import multer from "multer";
import fs from 'fs';


// Function to ensure a directory exists
const ensureDirectoryExists = (directory: string) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = './uploads/images';
        ensureDirectoryExists(folderPath);
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        // Use the original file name and append a timestamp to it to avoid conflicts
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    console.log(file);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type! Only JPEG, PNG, and JPG are allowed."));
    }
  },
});

export default upload;