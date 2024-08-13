import knexModule from 'knex';
import knexfile from './knexfile.cjs'; // Assuming knexfile.js is using ES module syntax
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

async function populateExercises() {
    try {
        await knex('exercises').del();
        await knex('exercises_history').del();
        await knex('workouts').del();
        await knex('exercises').insert([
            { name: 'Thingimajigs', muscle_group: 'Biceps' },
            { name: 'Pullies', muscle_group: 'Triceps' },
            { name: 'Pushies', muscle_group: 'Quadriceps' },
            { name: 'Workies', muscle_group: 'Quinticeps' }
        ]);
        await knex('workouts').insert([
            { date: '19-08-2021' }]);
        await knex('exercises_history').insert([
            { name: 'Thingimajigs', date: '2021-01-01', set: 3, weight: 20 },
            { name: 'Pullies', date: '2021-01-01', set: 3, weight: 20, rep: 10 },
        ])
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await knex.destroy();
    }
}


describe('Exercise API Endpoint Tests', () => {
    let backup;

    before(async () => {
        await knex.migrate.latest();
        process.env.NODE_ENV = 'test';
    });

    beforeEach(async () => {
        backup = await backupData('exercises');
        await populateExercises()
    });

    afterEach(async () => {

    });

    after(async () => {

    });

    it('should return all exercises', async () => {
        const res = await request(app)
            .get('/exercises/all')
            .expect(200);

        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(4); // Assuming 3 users from the seed data
    });

    it('should return all exercises in history', async () => {
        const res = await request(app)
            .get('/exercises/history')
            .expect(200);

        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2); // Assuming 3 users from the seed data
    });
});