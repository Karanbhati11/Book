async function Delete() {
  const { GoogleAuth } = require("google-auth-library");
  const { google } = require("googleapis");

  const auth = new google.auth.GoogleAuth({
    keyFile: "../KEY_FILE.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const service = google.drive({ version: "v3", auth });
  const files = [];
  try {
    const fetch = await service.files.list({ q: "mimeType='application/pdf'" });
    Array.prototype.push.apply(files, fetch.files);
    fetch.data.files.forEach(function (file) {
      console.log("Found file:", file.name, file.id);
      const res = service.files.delete({
        fileId: file.id,
      });
      console.log(res.data, res.status);
    });
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}

module.exports = Delete;
