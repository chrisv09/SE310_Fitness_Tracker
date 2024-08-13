// This is the controller for the routines route. The controller is responsible for handling the request and response.
import knex from './../db.js';

// Retrieve all exercises
const exercisesAll = (req, res) => {
    // Get all exercises from database
    knex
        .select('*') // select all exercises
        .from('exercises') // from 'exercises_history' table
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

// Retrieve all exercises in history
const exercisesAllHistory = (req, res) => {
    // Get all exercises from database
    knex
        .select('*') // select all exercises
        .from('exercises_history') // from 'exercises_history' table
        .orderBy('date', 'asc')
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

    const { name, date, sets } = req.params

    knex
        .select('exercises_history.name', 'date', 'sets', 'reps', 'weight', 'score', 'muscle_group')
        .from('exercises_history')
        .where({ name, date, sets })
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
    exercisesAllHistory,
    exerciseByNameDateAndSets
}
