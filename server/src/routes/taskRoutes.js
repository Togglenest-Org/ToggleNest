import express from 'express';
import { createTask, getTasks, updateTask } from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Apply the protect middleware to ALL task routes
router.use(protect);

router.route('/')
  .post(createTask);

router.route('/:projectId')
  .get(getTasks);

// We use PATCH instead of PUT because we usually only update one field (like status) when dragging and dropping
router.route('/:id')
  .patch(updateTask); 

export default router;