const upload = require("../middleware/upload");
const express = require("express");

const router = express.Router();

const {
  getProjects,
  addProject
} = require("../controllers/projectController");

router.get("/", getProjects);
router.post(
  "/",
  upload.single("image"),
  addProject
);

module.exports = router;