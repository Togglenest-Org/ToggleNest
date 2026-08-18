import express from 'express';
import { createProject, getProjects, getProjectById } from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Apply the protect middleware to ALL project routes
router.use(protect); 

router.route('/')
  .post(createProject)
  .get(getProjects);

router.route('/:id')
  .get(getProjectById);

export default router;