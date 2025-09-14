import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.log("\nerror: " + err + "\n");
      return res.status(400).json(err.message);
    }
    if (!req.file) return res.status(400).json("No file uploaded");
    const file = req.file;
    res
      .status(200)
      .json(`${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
  });
});

export default router;
