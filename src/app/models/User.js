const bcrypt = require('bcryptjs')
// after run the sequelize cli it generate a index inside models that send the two parameters below
module.exports = (sequelize, DataTypes) => {
  // define the model of the entity
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      // this particular field is special, it only exist inside the server, it does not go to the server
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      // methods that run like triggers inside models
      hooks: {
        // use the virtual field password to create a password_hash inside the database
        beforeSave: user => {
          if (user.password) {
            user.password_hash = bcrypt.hashSync(user.password + process.env.APP_SECRET)
          }
        }
      }
    }
  )

  // method inside model to check if password is correct
  User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password + process.env.APP_SECRET, this.password_hash)
  }

  return User
}
