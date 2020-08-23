exports.get = (req, res) => {
  res.render("home", {
    signedIn: req.cookies.access_token,
    username: req.cookies.access_token,
    activePage: { home: true },
  });
};
