// The routes for exercises
import express from 'express';
import { exercisesAll, exerciseByName } from '../controllers/exercises-controller.js';

const router = express.Router()

// Get all exercises
router.get('/all', exercisesAll)

// Get exercise by name
router.get('/:name', exerciseByName)

export default router;