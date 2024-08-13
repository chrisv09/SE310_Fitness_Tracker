// knexfile.js

const path = require('path');

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, 'db', 'database.sqlite')
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, 'migrations')
        },
        seeds: {
            directory: path.join(__dirname, 'seeds')
        }
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, 'db', 'test_database.sqlite')
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, 'migrations')
        },
        seeds: {
            directory: path.join(__dirname, 'seeds')
        }
    },

    production: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, 'db', 'database.sqlite')
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, 'migrations')
        },
        seeds: {
            directory: path.join(__dirname, 'seeds')
        }
    }
};
