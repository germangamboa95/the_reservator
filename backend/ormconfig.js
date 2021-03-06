module.exports = [
    {
        "name": "dev",
        "type": "mysql",
        host: process.env.DB_HOST,
        database: process.env.DATABASE,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,

        "synchronize": true,
        "logging": false,
        "entities": ["src/**/*.ts"],
        "migrations": ["src/migration/**/*.ts"],
        "subscribers": ["src/subscriber/**/*.ts"],
        "cli": {
            "entitiesDir": "src/entity",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    },

]