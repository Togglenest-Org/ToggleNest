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

// @desc    Get ALL tasks for the logged-in user (for the global backlog)
// @route   GET /api/tasks
export const getAllTasks = async (req, res) => {
  try {
    // Find all tasks where this user is assigned
    const tasks = await Task.find({ assignedTo: req.user })
      .populate('project', 'title') // TasksPage needs this to display the project title!
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all tasks', error: error.message });
  }
};

// @desc    Get all tasks for a specific project
// @route   GET /api/tasks/:id
export const getTasks = async (req, res) => {
  try {
    // Fixed: req.params.id (lowercase 'i')
    const tasks = await Task.find({ project: req.params.id })
      .populate('assignedTo', 'name email')
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
     { returnDocument: 'after' } // Returns the newly updated task
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};