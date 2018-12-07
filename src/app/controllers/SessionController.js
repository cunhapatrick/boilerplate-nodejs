// with the index inside model created by sequelize cli, when used destructor to call the model it automatic find the model
const { User } = require('../models')
class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'usuario nao encontrado')
      return res.redirect('/')
    }

    // method created on user model
    if (!(await user.checkPassword(password))) {
      req.flash('error', 'senha incorreta')
      return res.redirect('/')
    }

    // store user on session request
    req.session.user = user

    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect()
    })
  }
}

module.exports = new SessionController()
