const express = require("express");

const router = express.Router();

const {
  sendContactMessage
} = require("../controllers/contactController");

// CONTACT ROUTE
router.post("/", sendContactMessage);

module.exports = router;