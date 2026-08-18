import Project from '../models/Project.js';

// @desc    Create a new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      owner: req.user, // Got this from the protect middleware!
      members: [req.user], // Owner is automatically a member
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// @desc    Get all projects for the logged-in user
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    // Find projects where the user is a member
    const projects = await Project.find({ members: req.user })
      .populate('owner', 'name email') // Replaces the owner ID with their actual name/email
      .sort({ updatedAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Security check: ensure user is a member of this project
    if (!project.members.some((member) => member._id.toString() === req.user.toString())) {
      return res.status(403).json({ message: 'Not authorized to view this project' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};