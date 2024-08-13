// This is the controller for the routines route. The controller is responsible for handling the request and response.
import knex from './../db.js';

const exercisesAll = (req, res) => {

    knex
        .select('*')
        .from('exercises')
        .then(userData => {

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
    knex
        .select('*')
        .from('exercises_history')
        .orderBy('date', 'asc')
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving exercises: ${err}` })
        }
        )
}

// Retrieve all exercises in one day
const exercisesDay = (req, res) => {
    const date = req.params.date

    knex
        .select('*')
        .from('exercises_history')
        .where('date', date)
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving exercises: ${err}` })
        }
        )
}

// Retrieve one exercise by name, date and sets
const exerciseByNameDateAndSets = (req, res) => {

    const { name, date, sets } = req.params

    knex
        .select('name', 'date', 'sets', 'reps', 'weight', 'score')
        .from('exercises_history')
        .where('name', name)
        .where('date', date)
        .where('sets', sets)


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
    exercisesDay,
    exerciseByNameDateAndSets
}
