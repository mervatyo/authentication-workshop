exports.get = (req, res) => {
  if (res.locals.error) {
    return res.render('home', {
      activePage: { home: true },
      error: err.message
    });
  }

  if (res.locals.signedIn) {
    return res.render('home', {
      activePage: { home: true },
      signedIn: true,
      username: res.locals.username
    });
  }

  res.render('home', { activePage: { home: true } });
};
