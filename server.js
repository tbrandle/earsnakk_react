const swig = require('swig');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require('spotify-web-api-node')
const consolidate = require('consolidate');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');

const dotenv = require('dotenv');
const cors = require('cors');
const config = dotenv.config().parsed;

const appKey = config.client_id;
const appSecret = config.client_secret;


const redirect_uri = 'http://localhost:8888/callback';
const passport = require('passport')

const express = require('express');
const app = express();


/********************** CONFIGURATION ***********************/

app.set('public', __dirname + '/public');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.engine('html', consolidate.swig);


/********************** CORS ***********************/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
})

/********************** PORT ***********************/

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});


/********************** PASSPORT ***********************/

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const spotifyApi = new SpotifyWebApi({
  clientId: appKey,
  clientSecret: appSecret,
  redirectUri: 'http://localhost:8888/callback',
})

passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://localhost:8888/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      spotifyApi.setAccessToken(accessToken)
      spotifyApi.setRefreshToken(refreshToken)
      return done(null, profile);
    });
  }));



/********************** GET ***********************/


app.get('/profile', (req, res) => {
  spotifyApi.getMe()
    .then(user => res.json(user.body))
    .catch(error => console.log(error))
})

app.get('/new-releases', (req, res) => {
  spotifyApi.getNewReleases({ limit : 5, offset: 0, country: 'SE' })
    .then(data => {
      res.send(data)
     console.log(data.body);
       done();
     }, function(err) {
        console.log("Something went wrong!", err);
     })
})

app.get('/', function(req, res){
  res.render('index.html', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account.html', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login.html', { user: req.user });
});

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get('/auth/spotify',
  passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
});

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('http://localhost:3000/home');
    // maybe make this redirect to /home

  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('http://localhost:3000/');
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
