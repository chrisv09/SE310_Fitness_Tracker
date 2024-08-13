// This is the controller for the routines route. The controller is responsible for handling the request and response.
import knex from './../db.js';

// Retrieve all exercises
const exercisesAll = (req, res) => {
    // Get all exercises from database
    knex
        .select('*') // select all exercises
        .from('exercises_history') // from 'exercises_history' table
        .then(userData => {
            // Send exercises extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving exercises: ${err}` })
        }
        )
}

// Retrieve one exercise by name, date and sets
const exerciseByNameDateAndSets = (req, res) => {

    const name = req.params.name
    const date = req.params.date
    const sets = req.params.sets

    knex
        .select('exercises_history.name', 'exercises_history.date', 'exercises_history.sets', 'exercises_history.reps', 'exercises_history.weight', 'exercises_history.score', 'exercises.muscle_group')
        .from('exercises_history')
        .where('name', name)
        .where('date', date)
        .where('sets', sets)
        // Join with exercises table to get muscle group
        .join('exercises', 'exercises_history.name', 'exercises.name')

        .then(userData => {
            if (userData.length > 0) {
                res.json(userData)
            } else {
                res.status(404).json({ message: `Exercise with name ${name} and date ${date} not found.` })
            }
        })

        .catch(err => {
            res.status(500).json({ message: `There was an error retrieving exercise: ${err}` })
        }
        )

}

export {
    exercisesAll,
    exerciseByNameDateAndSets
}
