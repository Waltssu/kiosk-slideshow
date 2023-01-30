const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

// media array
const media = [];

app.use(bodyParser.json());
app.set("view engine", "ejs");

// get media files from media folder and add to media array
async function updateMediaArray() {
  try {
    const filePaths = await getFilesFromDir("./media");
    media.splice(0, media.length, ...filePaths);
  } catch (err) {
    console.error(err);
  }
}

// get all media files from media folder and show as html
app.get("/", (req, res) => {
  // map filePaths to an array of objects, each object containing the path and type of the media file
  const mediaFiles = media.map((filePath) => {
    const fileExtension = path.extname(filePath);
    let type;
    if (
      fileExtension === ".jpg" ||
      fileExtension === ".jpeg" ||
      fileExtension === ".png"
    ) {
      type = "image";
    } else if (fileExtension === ".mp4" || fileExtension === ".webm") {
      type = "video";
    }
    return {
      path: filePath,
      type: type,
    };
  });
  // shuffle media elements to randomize the order
  mediaFiles.sort(() => Math.random() - 0.5);
  // render the ejs template with the shuffled media files
  res.render("index", { mediaFiles });
});

// function to get all files from a directory
function getFilesFromDir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const filePaths = files.map((file) => path.join(dirPath, file));
        resolve(filePaths);
      }
    });
  });
}

app.use(express.static("public"));
app.use("/media", express.static("media"));

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
  updateMediaArray();
});
