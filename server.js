const swig = require('swig');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require('spotify-web-api-node')
const consolidate = require('consolidate');
const fetch = require('isomorphic-fetch');

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

const socket_io = require('socket.io');

const io = socket_io();
const http = require('http');
const PORT = process.env.PORT || 8888;

const express = require('express');
const app = express();

const server = http.createServer(app).listen(PORT, () => {
  console.log(`server listending on port ${PORT}`)
});

io.attach(server);
io.on('connection', function(socket) {
  console.log('Socket connected: ' + socket.id);
  socket.on('action', (action) => {
    if(action.type === 'app/hello') {
      console.log('Got hello data!', action.data);
      socket.emit('action', {type: 'message', data: 'boom'});
    }
  });

  socket.on('song uri', function(uri){
      io.emit('song uri', uri)
    });
});

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


/*****************************************
                  GET
******************************************/

  /*************** oAuth ************/

app.get('/auth/spotify',
passport.authenticate('spotify', {
  session: false,
  scope: [
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-email',
    'user-read-private',
    'user-library-read',
  ],
  showDialog: true,
}),
function(req, res){
});

app.get('/callback',
passport.authenticate('spotify', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('http://localhost:3000/home');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('http://localhost:3000/');
});

app.get('/', function(req, res){
  res.render('index.html', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account.html', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login.html', { user: req.user });
});

  /*************** playlist / profile ************/

app.get('/profile', (req, res) => {
  spotifyApi.getMe()
    .then(user => res.json(user.body))
    .catch(error => console.log(error))
});


app.get('/api/v1/user/playlists/:offset', (req, res) => {
  const offset = req.params.offset
  fetch(`https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=50`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + spotifyApi.getAccessToken(),
    },
  })
    .then(response => response.json())
    .then(data => res.status(200).send(data))
});

app.get('/api/v1/user/:user_id/playlist/:playlist_id/tracks', (req, res) => {
  fetch(`https://api.spotify.com/v1/users/${req.params.user_id}/playlists/${req.params.playlist_id}/tracks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + spotifyApi.getAccessToken(),
    },
  })
    .then(response => response.json())
    .then(data => res.status(200).send(data))
})

  /*************** song search ************/

app.get('/api/v1/:artist/search-tracks', (req, res) => {

  const { artist } = req.params

  spotifyApi.searchTracks(`artist:${artist}`)
  .then(data => {
    res.json(data.body)
    console.log('Search tracks by "Love" in the artist name', data.body);
  })
  .catch(error => console.log(error))

})

app.get('/api/v1/:artist/:track/search-tracks', (req, res) => {
  const { artist, track } = req.params
  spotifyApi.searchTracks(`artist:${artist} track:${track}`)
  .then(data => {
    res.json(data.body)
    console.log('Search tracks by "Love" in the artist name', data.body);
  })
  .catch(error => console.log(error))
})

/*****************************************
                  POST
******************************************/

app.post('/api/v1/playlist', (req, res) => {
  const { userID } = req.body
  fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + spotifyApi.getAccessToken(),
    },
    body: JSON.stringify({
      name: 'earsnakk_' + req.body.name,
      collaborative: true,
      public: false,
    }),
  })
    .then(response => response.json())
    .then(playlist => res.status(201).send(playlist))
    .catch(error => console.log(error))
})

app.post('/api/v1/channel/:playlist_id/songs', (req, res) => {

  const userID = req.body.userID
  const playlistID = req.params.playlist_id
  const uris = [req.body.uri]

  fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + spotifyApi.getAccessToken(),
    },
    body: JSON.stringify({
      uris,
    }),
  })
    .then(response => response.json())
    .then(playlist => res.status(201).send(playlist))
    .catch(error => console.log(error))
})



// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

/*****************************************
                  PUT
******************************************/

app.put('/api/v1/user/:owner_id/channel/:playlist_id/followers', (req, res) => {

  const ownerID = req.params.owner_id
  const playlistID = req.params.playlist_id

  fetch(`https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/followers`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + spotifyApi.getAccessToken(),
    },
  })
    .then(response => console.log(response))
    .catch(error => console.log(error))
})
