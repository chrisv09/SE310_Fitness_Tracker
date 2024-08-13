// This is the controller for the workouts route. The controller is responsible for handling the request and response.
import knex from './../db.js';

// Retrieve all workouts
const workoutsAll = (req, res) => {
  // Get all workouts from database
  knex
    .select('*') // select all records
    .from('workouts') // from 'workouts' table
    .then(userData => {
      // Send workouts extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving workouts: ${err}` })
    })
}

// Retrieve one workout by date
const workoutByDate = (req, res) => {
  // Get date value from URL
  const date = req.params.date

  // Get workout from database
  knex
    .select('*') // select all records
    .from('workouts') // from 'workouts' table
    .where('date', date) // where date is equal to date
    .then(userData => {
      // Send workout extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving workout: ${err}` })
    })
}

export {
  workoutsAll,
  workoutByDate
}