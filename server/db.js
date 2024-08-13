import path from 'path';
import knexLib from 'knex';

// Determine the database file based on the environment
const dbFileName = process.env.NODE_ENV === 'test' ? 'test_database.sqlite' : 'database.sqlite';

// Get the location of the database file
const dbPath = path.resolve(`db/database.sqlite`);

// Create connection to SQLite database
const knex = knexLib({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "exercises"
knex.schema
  // If there is already a table, work with it
  .hasTable('exercises')
  .then((exists) => {
    if (!exists) {
      // If no "exercises" table exists
      // create new, with "name", "muscle", "equipment",
      // and use "id" as a primary identification
      // and increment "id" with every new record (book)
      return knex.schema.createTable('exercises', (table) => {
        table.string('name').primary()
        table.string('muscle_group')
      })
        .then(() => {
          // Log success message
          console.log('Table \'exercises\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Create a table in the database called "workouts"
knex.schema
  // If there is already a table, work with it
  .hasTable('workouts')
  .then((exists) => {
    if (!exists) {
      // If no "workouts" table exists
      // create new, with only "date" as a column and primary key. this is because we will be storing the exercises in a separate table
      return knex.schema.createTable('workouts', (table) => {
        table.date('date').primary()
      })
        .then(() => {
          // Log success message
          console.log('Table \'workouts\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Create a table in the database called "routines"
knex.schema
  // If there is already a table, work with it
  .hasTable('routines')
  .then((exists) => {
    if (!exists) {
      // If no "routines" table exists
      // create new, with "name" and "date" as columns and primary key. this is because we will be storing the exercises in a separate table
      return knex.schema.createTable('routines', (table) => {
        table.string('name').notNullable()
        table.date('date').notNullable()

        // Define composite primary key
        table.primary(['name', 'date'])
      })
        .then(() => {
          // Log success message
          console.log('Table \'routines\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })


// Create a table in the database called "exercises_history"
knex.schema
  // If there is already a table, work with it
  .hasTable('exercises_history')
  .then((exists) => {
    if (!exists) {
      // If no "exercises_history" table exists
      // create new, with "weight", "set", "rep",
      // and use "id" as a primary identification
      // and increment "id" with every new record (book)
      return knex.schema.createTable('exercises_history', (table) => {
        table.string('name').notNullable();
        table.date('date').notNullable();
        table.integer('set').notNullable();
        table.float('weight');
        table.integer('rep');
        table.integer('score');

        // Define composite primary key
        table.primary(['name', 'date', 'set']);

        // Define foreign keys
        table.foreign('name').references('exercises.name');
        table.foreign('date').references('workouts.date');
      })
        .then(() => {
          // Log success message
          console.log('Table \'exercises_history\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Log all data in "exercises_history" table (for debugging)
knex.select('*').from('exercises_history')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

export default knex;