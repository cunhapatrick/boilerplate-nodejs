const express = require('express')
const session = require('express-session')
const Youch = require('youch')
const Sentry = require('@sentry/node')
const validate = require('express-validation')
// module to store on fisical json
const FileStore = require('session-file-store')(session)
// module to treat paths from diferent SO's
const path = require('path')
const flash = require('connect-flash')

// express server configuration as class structure
class App {
  constructor () {
    this.express = express()
    // verify if is dev enviromnent
    this.isDev = process.env.NODE_ENV !== 'production'

    // load internal class methods on instance app class
    this.sentry()
    this.middleware()
    this.views()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init({
      dns: process.env.SENTRY_DNS
    })
  }
  // method to treat middlewares
  middleware () {
    // active body from requisition
    this.express.use(
      express.urlencoded({
        extended: false
      })
    )
    this.express.use(flash())
    // configure session to register on request session and inside a json file
    this.express.use(
      session({
        name: 'root',
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        secret: 'MyAppSecret',
        resave: true,
        saveUninitialized: true
      })
    )
  }

  // method to treat views
  views () {
    // make the public directory visible to express
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    // declare the engine to render the views
    this.express.set('view engine', 'ejs')
  }

  // method to treat routes
  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    // On production enviromnent active the sentry watch handler
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }
    // check if error is a validation Object
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      // if not production use Youch error treatment
      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)

        return res.json(await youch.toJSON())
      }

      // general error handler
      return res.status(err.status || 500).json({
        error: 'Internal Server Error'
      })
    })
  }
}

// export a already class instance of app
module.exports = new App().express
