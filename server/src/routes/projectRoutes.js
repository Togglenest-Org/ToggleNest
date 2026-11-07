import express from 'express';
// Added updateProject and deleteProject to the import
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Apply the protect middleware to ALL project routes
router.use(protect); 

router.route('/')
  .post(createProject)
  .get(getProjects);

router.route('/:id')
  .get(getProjectById)
  .put(updateProject)    // <-- Added this for frontend updates
  .delete(deleteProject); // <-- Added this for frontend deletions

export default router;