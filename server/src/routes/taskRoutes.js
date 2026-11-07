import express from 'express';
// Added getAllTasks to the import list
import { createTask, getTasks, updateTask, deleteTask, getAllTasks } from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// Now handles both creating a new task AND fetching the global task backlog
router.route('/')
  .post(createTask)
  .get(getAllTasks);

// Handle ALL dynamic ID routes in one block to prevent collisions
// GET uses the ID as a ProjectID. PATCH and DELETE use it as a TaskID.
router.route('/:id')
  .get(getTasks)
  .patch(updateTask)
  .delete(deleteTask);

export default router;