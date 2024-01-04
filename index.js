var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (request, response) => {
  const filename = request.file.originalname;
  const fileType = request.file.mimetype;
  const fileSize = request.file.size;

  response.json({
    name: filename,
    type: fileType,
    size: fileSize,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
