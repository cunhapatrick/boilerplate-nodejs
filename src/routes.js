const express = require('express')
// module to treat upload files
const multerConfig = require('./config/multer')
// instance multer and load it's configuration
const upload = require('multer')(multerConfig)
const validate = require('express-validation')
const handle = require('express-async-handle')
const routes = express.Router()

const controllers = require('./app/controllers')
const validators = require('./app/validators')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})
// the second parameter of router methods is a callback of (req,res) so if a method without parameters is called
// it assume the request and response parameter as it's own parameters
routes.get('/', guestMiddleware, handle(controllers.SessionController.create))
routes.post('/signin', handle(controllers.SessionController.store))

routes.get('/files/:file', handle(controllers.FileController.show))

routes.get('/signup', guestMiddleware, validate(validators.Session), handle(controllers.UserController.create))
routes.post('/signup', upload.single('avatar'), validate(validators.User), handle(controllers.UserController.store))

routes.use('/app', authMiddleware)

routes.get('/app/logout', handle(controllers.SessionController.destroy))

routes.post('/app/mail', handle(controllers.MailController.store))

module.exports = routes
