const express = require("express");
const uploadRouter = require("./router");
const Retrieve = require("./Retrieve");
const Delete = require("./Delete");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");
const cors = require('cors')

app.use(cors())

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(uploadRouter);
router.get("/", (req, res) => {
  res.send("hello");
  console.log(__dirname);
});
router.get("/response", (req, res) => {
  Retrieve().then((resp) => {
    res.send({ driveresponse: resp });
  });
});
router.get("/delete", (req, res) => {
  Delete().then((resp) => {
    res.send({ Message: "Files Deleted" });
  });
});
// app.listen(port, () => {
//   console.log("Form running on port 8080");
// });

app.use("/", router);

module.exports.handler = serverless(app);
