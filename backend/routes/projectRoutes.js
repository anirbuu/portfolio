const upload = require("../middleware/upload");
const express = require("express");

const router = express.Router();

const {
  getProjects,
  addProject,
  updateProjectImages
} = require("../controllers/projectController");

router.get("/", getProjects);
router.post(
  "/",
  upload.array("images", 6),
  addProject
);

router.put(
  "/:id/images",
  upload.array("images", 6),
  updateProjectImages
);

module.exports = router;