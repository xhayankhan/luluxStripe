require("dotenv").config();
const stripe = require("stripe")(
  "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"
);
const multer = require("multer");
const path = require("path");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("../lulux-b7e7a-firebase-adminsdk-c5zet-13c3d17c8f.json");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "/uploads/"));
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    cb(null, req.body.accID + "-" + file.fieldname + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
module.exports = { stripe, upload, db };
