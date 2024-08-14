// This is the controller for the routines route. The controller is responsible for handling the request and response.
import knex from './../db.js';

// Retrieve all exercises
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

//creates a new exercise
const createExercise = (req, res) => {
    const { name, muscleGroup } = req.params


    knex('exercises')
        .insert({
            'name': name,
            'muscle_group': muscleGroup
        })
        //if error occurs then drops insert apon error
        .onConflict('name').ignore()
        .returning('name')
        .then(name => {
            if (name.length > 0) {
                res.status(201).json({ message: 'Exercise added successfully' });
            } else {
                res.status(200).json({ message: 'Exercise already exists, no new entry created' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: `An error occurred while creating a new exercises`, error: error.message });
        });
}

//logs new exercise Set
const logExerciseSet = (req, res) => {
    const { name, date, set, weight, rep, score } = req.params


    knex('exercises_history')
        .insert({
            'name': name,
            'date': date,
            'set': set,
            'weight': weight,
            'rep': rep,
            'score': score
        })
        //if conflict occurs then drops current insert apon error
        .onConflict(['name', 'date', 'set']).ignore()
        .returning('name')
        .then(name => {
            if (name.length > 0) {
                res.status(201).json({ message: 'Exercise set added successfully' });
            } else {
                res.status(200).json({ message: 'Conflicting exercise name, date of completion, or set number. no new entry created' });
            }
        })
        .catch(error => {
            // Error: Something went wrong
            res.status(500).json({ message: `An error occurred while creating a new exercises`, error: error.message });
        });
}

export {
    exercisesAll,
    exercisesAllHistory,
    exercisesDay,
    exerciseByNameDateAndSets,
    createExercise,
    logExerciseSet
}
