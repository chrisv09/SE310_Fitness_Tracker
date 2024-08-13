// The routes for exercises
import express from 'express';
import { exercisesAll, exercisesAllHistory, exercisesDay, exerciseByNameDateAndSets } from '../controllers/exercises-controller.js';

const router = express.Router()

// Get all exercises
router.get('/all', exercisesAll)

// Get all exercises in history
router.get('/history', exercisesAllHistory)

// Get all exercises in one day
router.get('/:date', exercisesDay)

// Get exercise by name, date and sets
router.get('/:name/:date/:sets', exerciseByNameDateAndSets)

export default router;