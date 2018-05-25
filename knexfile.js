module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres:///concerts_db'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}