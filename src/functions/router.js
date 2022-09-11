// router.js

const stream = require("stream");
const express = require("express");
const multer = require("multer");
const { google } = require("googleapis");
// const GOOGLE_API_FOLDER_ID = "1OZbs8PO60f80y7VI9iS8mpxOAk8xmnM4";
// const GOOGLE_API_FOLDER_ID = "1oIlVFLai5Lm4M6t1fVAeDoWb99kV_y7v";
const GOOGLE_API_FOLDER_ID = "1X_If3_GzAEjgNCj7SXkkCLkYHmxVDELS";
var ID = "";
const uploadRouter = express.Router();
const upload = multer();

const uploadFile = async (fileObject) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "KEY_FILE.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: [GOOGLE_API_FOLDER_ID],
    },
    fields: "id,name",
  });
  console.log(`Uploaded file ${data.name}`);
  console.log(`https://drive.google.com/uc?export=view&id=${data.id}`);
  ID = data.id;
};

uploadRouter.post("/upload", upload.any(), async (req, res) => {
  try {
    const { body, files } = req;

    for (let f = 0; f < files.length; f += 1) {
      await uploadFile(files[f]);
    }
    // console.log(body);
    // console.log(ID);
    res.status(200).send({
      status: "Form Submitted",
      data: `https://drive.google.com/uc?export=view&id=${ID}`,
    });
  } catch (f) {
    res.send(f.message);
  }
});

module.exports = uploadRouter;
