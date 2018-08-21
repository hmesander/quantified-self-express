// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/foods_tracker',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/foods_tracker_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'postgres://ofavphefdekxcv:f609aa547b141cac3727f10bb8a87b5da92bf14e9aae1d6254854c361b9c3998@ec2-174-129-
236-147.compute-1.amazonaws.com:5432/d4q074bk9m6eu'
    }
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }
};
