import cloudinary from "cloudinary";
import multiparty from "multiparty";
import { mongooseConnect } from "@/lib/mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  await mongooseConnect();

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  console.log(files); // Verifica la estructura de files

  const links = [];

  // Iterar sobre files.image en lugar de files.file
  if (Array.isArray(files.image)) {
    for (const file of files.image) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "bryandejesusrt.dev",
        public_id: `file_${Date.now()}`,
        resource_type: "auto",
      });

      const link = result.secure_url;
      links.push(link);
    }
  } else {
    console.error("files.image is not an array:", files.image);
  }

  res.status(200).json({ links });
}

export const config = {
  api: {
    bodyParser: false,
  },
};