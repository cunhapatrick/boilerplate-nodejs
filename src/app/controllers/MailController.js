const User = require('../models/User')
const MailJob = require('../jobs/MailJob')
const Queue = require('../services/Queue')

class MailController {
  async store (req, res) {
    const user = await User.findById(req.userId)

    Queue.create(MailJob.key, {
      user
    }).save()

    return res.send(`Success email send`)
  }
}

module.exports = new MailController()
