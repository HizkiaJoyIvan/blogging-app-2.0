const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3200;
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const cookieParser = require("cookie-parser"); 
const multer = require("multer");
const path = require("path");

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({storage: storage})

app.post("/api/upload", upload.single('file'), (req,res) => {
  const file = req.file
  res.status(200).json(file.filename)
})

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
