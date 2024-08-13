// This is the controller for the routines route. The controller is responsible for handling the request and response.
const knex = require('./../db')

// Retrieve all routines
const routinesAll = (req, res) => {
    // Get all routines from database
    knex
        .select('*') // select all routines
        .from('routines') // from 'routines' table
        .then(userData => {
            // Send routines extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving routines: ${err}` })
        }
        )
}

// Retrieve one routine by name and date
const routineByNameAndDate = (req, res) => {
    // Get name and date values from URL
    const name = req.params.name
    const date = req.params.date

    // Get routine from database
    knex
        .select('*') // select all records
        .from('routines') // from 'routines' table
        .where('name', name) // where name is equal to name
        .where('date', date) // where date is equal to date
        .then(userData => {
            if (userData.length > 0) {
                // Send routine extracted from database in response
                res.json(userData)
            } else {
                // Send a error message in response
                res.status(404).json({ message: `Routine with name ${name} and date ${date} not found.` })
            }
        })
        .catch(err => {
            // Send a error message in response
            res.status(500).json({ message: `There was an error retrieving routine: ${err}` })
        }
        )
}

module.exports = {
    routinesAll,
    routineByNameAndDate
};