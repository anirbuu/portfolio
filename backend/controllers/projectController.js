const Project = require("../models/Project");

// GET ALL PROJECTS
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects"
    });
  }
};

// ADD PROJECT
const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      category,
      technologies,
      liveLink,
      githubLink
    } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "Title, description and image are required"
      });
    }

    const project = new Project({
      title,
      description,
      image,
      category,
      technologies,
      liveLink,
      githubLink
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      project
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add project"
    });
  }
};

module.exports = {
  getProjects,
  addProject
};