var path = require('path')


module.exports = (app, hotels, passport) => {

    app.get('/', function(req, res) {
        res.render('login.ejs', {
            message: req.flash('error')
        })
    })

    app.get("/signup", function(req, res) {
        res.render('signup.ejs', {
            message: req.flash('error')
        })

    })

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: true
    }))

    app.get('/main', isLoggedIn , (req, res) => {
        res.render('main.ejs', {
            user: req.user.firstname + " " + req.user.lastname,
        });

    })


    app.get('/api/hotels', (req, res) => {

        hotels.find({}, 'name city address rating ',{
            sort : {
                rating : -1
            }
        } ,  (err, docs) => {
            res.json(docs)
        })

    })

    app.get('/api/hoteldata', (req, res) => {
        let hotelid = req.url.split("?")[1]

        hotels.findById(hotelid, (err, docs) => {
            res.json(docs)
        })

    })

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile']
        }));

    app.get('/auth/googlecallback', passport.authenticate('google'),
        (req, res) => {
            res.redirect('/main')
        })

}

function isLoggedIn(req, res, next) {
    // console.log(req.isAuthenticated())
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}