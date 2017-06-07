const swig = require('swig');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require('spotify-web-api-node');
const consolidate = require('consolidate');
const fetch = require('isomorphic-fetch');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');

const dotenv = require('dotenv');
const cors = require('cors');

const config = dotenv.config().parsed;

const appKey = process.env.client_id || config.client_id;
const appSecret = process.env.client_secret || config.client_secret;

const redirect_uri = 'https://earsnakk.herokuapp.com/callback';
const passport = require('passport');

const socket_io = require('socket.io');

const io = socket_io();
const http = require('http');

const PORT = process.env.PORT || 8888;

const express = require('express');

const app = express();

const server = http.createServer(app).listen(PORT, () => {
  console.log(`server listending on port ${PORT}`);
});

io.attach(server);
io.on('connection', (socket) => {
  socket.on('action', (action) => {
    if (action.type === 'app/hello') {
      socket.emit('action', { type: 'message', data: 'boom' });
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected from channel');
  });

  socket.on('song uri', (uri) => {
    io.emit('song uri', uri);
  });

  socket.on('channel', (data) => {
    socket.join(data.room);
  });
});

/** CONFIGURATION ******************************************/

// app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.set('public', `${__dirname}/react-ui/build`);
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/react-ui/build`));

app.engine('html', consolidate.swig);


/** CORS ******************************************/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/** PASSPORT ******************************************/

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const spotifyApi = new SpotifyWebApi({
  clientId: appKey,
  clientSecret: appSecret,
  redirectUri: 'https://earsnakk.herokuapp.com/callback',
});

passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'https://earsnakk.herokuapp.com/callback',
},
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);
      return done(null, profile);
    });
  }));


/** GET ******************************************/

  /** oAuth ******************************************/

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
(req, res) => {
});

app.get('/callback',
passport.authenticate('spotify', { failureRedirect: '/login' }),
(req, res) => {
  res.redirect('https://earsnakk.herokuapp.com/home');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('https://earsnakk.herokuapp.com/');
});

app.get('/', (req, res) => {
  res.render('index.html', { user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account.html', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login.html', { user: req.user });
});

  /** playlist / profile ******************************************/

app.get('/profile', (req, res) => {
  spotifyApi.getMe()
    .then(user => res.json(user.body))
    .catch(error => res.status(500).send(error));
});

app.get('/api/v1/user/playlists/:offset', (req, res) => {
  const offset = req.params.offset;
  fetch(`https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=50`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
    },
  })
    .then(response => response.json())
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send(error));
});

app.get('/api/v1/user/:user_id/playlist/:playlist_id/tracks', (req, res) => {
  const { user_id, playlist_id } = req.params;
  if (!user_id || !playlist_id) {
    res.status(400).send({ error: 'Both a Spotify user ID and a playlist ID are required' });
  } else {
    fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${spotifyApi.getAccessToken()}`,
      },
    })
      .then(response => response.json())
      .then(data => res.status(200).send(data))
      .catch(error => res.status(500).send(error));
  }
});

  /** song search ******************************************/

app.get('/api/v1/:artist/search-tracks', (req, res) => {
  const { artist } = req.params;

  spotifyApi.searchTracks(`artist:${artist}`)
  .then((data) => {
    if (!data.body.length) {
      res.status(404).json({ error: 'We didn\'t find that artist' });
    } else {
      res.status(200).json(data.body);
    }
  })
  .catch(error => res.status(500).json(error));
});

app.get('/api/v1/:artist/:track/search-tracks', (req, res) => {
  const { artist, track } = req.params;
  spotifyApi.searchTracks(`artist:${artist} track:${track}`)
  .then((data) => {
    if (!data.body.length) {
      res.status(404).json({ error: 'Please check your search parameters, nothing found here' });
    } else {
      res.status(200).json(data.body);
    }
  })
  .catch(error => res.status(500).json(error));
});

/** POST ******************************************/

app.post('/api/v1/playlist', (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    res.status(400).send({ error: 'A userID is required to post a playlist.' });
  } else {
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
      body: JSON.stringify({
        name: `earsnakk_${req.body.name}`,
        collaborative: true,
        public: false,
      }),
    })
      .then(response => response.json())
      .then(playlist => res.status(201).send(playlist))
      .catch(error => res.status(500).send(error));
  }
});

app.post('/api/v1/channel/:playlist_id/songs', (req, res) => {
  const playlistID = req.params.playlist_id;
  const userID = req.body.userID;
  const uris = [req.body.uri];
  if (!userID || !uris.length) {
    res.status(400).send({ error: 'A userID and song uri is required to post a song to a playlist.' });
  } else {
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
      body: JSON.stringify({
        uris,
      }),
    })
      .then(response => response.json())
      .then(playlist => res.status(201).send(playlist))
      .catch(error => res.status(500).send(error));
  }
});


/** PUT ******************************************/

app.put('/api/v1/user/:owner_id/channel/:playlist_id/followers', (req, res) => {
  const ownerID = req.params.owner_id;
  const playlistID = req.params.playlist_id;

  if (!ownerID || !playlistID) {
    res.status(400).json({ error: 'Make sure you have an ownerID and playlistID in your request' });
  } else {
    fetch(`https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/followers`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
    })
    .then(res => res.status(200).json(res))
    .catch(error => res.status(500).json(error));
  }
});
