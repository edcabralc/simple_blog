import fs from "fs/promises";
import { v4 } from "uuid";

const handleUplodCover = async (file: Express.Multer.File) => {
  const allowedTypesImages = ["image/jpeg", "image/jpg", "image/png"];
  const allowedImages = allowedTypesImages.includes(file.mimetype);

  if (allowedImages) {
    const coverName = `${v4()}.jpg`;
    try {
      await fs.rename(file.path, `./public/images/cover/${coverName}`);
    } catch (error) {
      return false;
    }

    return coverName;
  }
  return false;
};

export { handleUplodCover };
