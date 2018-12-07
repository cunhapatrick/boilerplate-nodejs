const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    // use and create associate a alias to the constant destructor file from the request file
    const { filename: avatar } = req.file || { filename: '' }
    await User.create({ ...req.body, avatar })
    return res.redirect('/')
  }
}

module.exports = new UserController()
