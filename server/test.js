import knexModule from 'knex';
import knexfile from './knexfile.js'; // Assuming knexfile.js is using ES module syntax
import request from 'supertest';
import { expect } from 'chai';
import app from './server.js'; // Adjust the path as needed

const knex = knexModule(knexfile.test);

// This function allows us to backup the data before each test
async function backupData(tableName) {
    const data = await knex.select('*').from(tableName);
    return data;
}

// This allows us to restore the data after each test
async function restoreData(tableName, data) {
    await knex(tableName).del();
    if (data.length > 0) {
        await knex(tableName).insert(data);
    }
}

describe('Exercise API Endpoint Tests', () => {
    let exercisesBackup; // Variable to hold the backup data

    before(async () => {
        await knex.migrate.latest();

        // Backup existing data
        exercisesBackup = await backupData('exercises');
    });

    beforeEach(async () => {
        await knex.seed.run(); // Populate with seed data before each test
    });

    afterEach(async () => {
        // Optionally clean up after each test if needed
    });

    after(async () => {
        // Restore original data
        await restoreData('exercises', exercisesBackup);

        // Rollback migrations and close the connection
        await knex.migrate.rollback();
        await knex.destroy();
    });

    it('should return all exercises', async () => {
        const res = await request(app)
            .get('/users')
            .expect(200);

        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(3); // Assuming 3 users from the seed data
    });

    it('should create a new exercise', async () => {
        const newExercise = {
            name: 'Cornrolls',
            muscle_group: 'quinticeps'
        };

        const res = await request(app)
            .post('/exercises')
            .send(newExercise)
            .expect(201);

        expect(res.body).to.include.keys('name', 'muscle_group');
    });
});