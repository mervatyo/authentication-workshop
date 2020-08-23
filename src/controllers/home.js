const jwt = require("jsonwebtoken");

exports.get = (req, res) => {
  if (!req.cookies.access_token) {
    console.log(req.cookies);

    return res.render("home", {
      activePage: { home: true },
    });
  }

  jwt.verify(
    req.cookies.access_token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      console.log(decoded);
      if (err)
        return res.render("home", {
          activePage: { home: true },
        });
      console.log(decoded);
      res.render("home", {
        signedIn: true,
        username: decoded.username,
        activePage: { home: true },
      });
    }
  );
};
