import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const deleteFile = async (file) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const fileName = file.split("/uploads/")[1];
  //console.log("fileName: " + fileName + "\n");
  if (fileName) {
    const filePath = path.join(__dirname, "uploads", fileName);
    //console.log("filePath: " + filePath + "\n");
    try {
      await fs.unlink(filePath);
    } catch (err) {
      //console.log("File not found:", err.message);
    }
  }
};

export default deleteFile;
