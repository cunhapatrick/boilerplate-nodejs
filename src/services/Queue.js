const kue = require('kue')
const Sentry = require('@sentry/node')
const jobs = require('../jobs')

const Queue = kue.createQueue({
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
})

Queue.process(jobs.MailJob.key, jobs.MailJob.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue
