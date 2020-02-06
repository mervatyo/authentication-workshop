const jwt = require('jsonwebtoken');

exports.get = (req, res) => {
  if (req.cookies.access_token) {
    jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, function(
      err,
      decoded
    ) {
      if (err) {
        return res.render('home', {
          activePage: { home: true },
          error: err.message
        });
      }

      return res.render('home', {
        activePage: { home: true },
        signedIn: true,
        username: decoded
      });
    });
  } else {
    res.render('home', { activePage: { home: true } });
  }
};
