exports.get = (req, res) => {
    if (req.cookies.access_token) {
        return res.render('home', {
            activePage: { home: true },
            signedIn: true,
            username: req.cookies.access_token
        })
    }

    res.render('home', { activePage: { home: true } });
};