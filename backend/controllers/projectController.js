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
      category,
      technologies,
      liveLink,
      githubLink
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    // CLOUDINARY IMAGE URL
    const image = req.file ? req.file.path : "";

    const project = new Project({
      title,
      description,
      image,
      category,
      technologies: technologies
        ? technologies.split(",")
        : [],
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

    console.error(error);

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