// import { v2 as cloudinary } from "cloudinary";
// import { config } from "../../shared/config";

// cloudinary.config({
//   cloud_name: config.cloudinary.CLOUDINARY_CLOUD_NAME!,
//   api_key: config.cloudinary.CLOUDINARY_API_KEY!,
//   api_secret: config.cloudinary.CLOUDINARY_SECRET!,
//   secure:true,
// });

// export { cloudinary };

// File: ../cloudinary/cloudinary.config.ts

import { v2 as cloudinary } from "cloudinary";
import { config } from "../../shared/config"; 

// 1. Configure the actual cloudinary object
cloudinary.config({
  cloud_name: config.cloudinary.CLOUDINARY_CLOUD_NAME!,
  api_key: config.cloudinary.CLOUDINARY_API_KEY!,
  api_secret: config.cloudinary.CLOUDINARY_SECRET!,
  secure:true,
});

// 2. CREATE THE WRAPPER OBJECT (MANDATORY for this specific error)
// We are giving it a distinct name to ensure there is no confusion.
const configuredCloudinaryWrapper = {
    v2: cloudinary 
};

// 3. EXPORT the distinct wrapper object.
export { configuredCloudinaryWrapper }; // Note: Exporting by its full name