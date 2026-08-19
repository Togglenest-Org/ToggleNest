import Task from '../models/Task.js';
import Project from '../models/Project.js';

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, column, priority, projectId } = req.body;

    // Verify the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Security: Check if user is a member of this project
    if (!project.members.includes(req.user)) {
      return res.status(403).json({ message: 'Not authorized to add tasks to this project' });
    }

    const task = await Task.create({
      title,
      description,
      column: column || 'To Do',
      priority: priority || 'medium',
      project: projectId,
      assignedTo: [req.user], // Wrapped in an array to match your schema!
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// @desc    Get all tasks for a specific project
// @route   GET /api/tasks/:projectId
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email') // Updated to match your schema
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// @desc    Update a task (e.g., Drag and Drop status change)
// @route   PATCH /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the fields that were passed in
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the newly updated task
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};