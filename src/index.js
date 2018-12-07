require('dotenv').config({ path: 'src/config/env/.env' })
const server = require('./server')

server.listen(process.env.PORT || 3000, () =>
  console.log(`server is active on port ${process.env.PORT || 3000}`)
)
