module.exports = (req, res, next) => {
  console.log('====================');
  console.log('session loggedIn:');
  console.log(req.session.loggedIn);
  console.log('====================');
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect('/login');
    }
  };
  