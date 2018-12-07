module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // response.locals is a global instance that exist in all nunjuck templates
    res.locals.user = req.session.user
    return next()
  } else res.redirect('/')
}
