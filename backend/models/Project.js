const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    category: {
      type: String,
      default: "Frontend"
    },

    technologies: {
      type: [String],
      default: []
    },

    liveLink: {
      type: String,
      default: ""
    },

    githubLink: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);