// This is the controller for the routines route. The controller is responsible for handling the request and response.
import knex from './../db.js';
// Retrieve all exercises
const exercisesAll = (req, res) => {
    // Get all exercises from database
    knex
        .select('*') // select all exercises
        .from('exercise_history') // from 'exercise_history' table
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
        .select('exercise_history.name', 'exercise_history.date', 'exercise_history.sets', 'exercise_history.reps', 'exercise_history.weight', 'exercise_history.score', 'exercises.muscle_group')
        .from('exercise_history')
        .where('name', name)
        .where('date', date)
        .where('sets', sets)
        // Join with exercises table to get muscle group
        .join('exercises', 'exercise_history.name', 'exercises.name')

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
