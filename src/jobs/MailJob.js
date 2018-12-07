const Mail = require('../services/Mail')

class MailJob {
  get key () {
    return 'MailJob'
  }

  async handle (job, done) {
    const {
      user
    } = job.data
    await Mail.sendMail({
      from: `"Patrick Cunha" <${user.email}>`,
      to: `${user.email}`,
      subject: `Teste de email`,
      template: 'default',
      context: {
        user
      }
    })

    return done()
  }
}

module.exports = new MailJob()
