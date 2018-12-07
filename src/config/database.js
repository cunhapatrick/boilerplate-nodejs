module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  operatorAliases: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
}
