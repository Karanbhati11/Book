async function searchFile() {
  const { GoogleAuth } = require("google-auth-library");
  const { google } = require("googleapis");
  const path = require("path");
  const auth = new google.auth.GoogleAuth({
    keyFile:"keys.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const service = google.drive({ version: "v3", auth });
  const files = [];
  try {
    const res = await service.files.list({ q: "mimeType='application/pdf'" });
    Array.prototype.push.apply(files, res.files);
    res.data.files.forEach(function (file) {
      // console.log("Found file:", file.name, file.id);
    });
    return res.data.files;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}

module.exports = searchFile;
