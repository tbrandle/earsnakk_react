// process.env.NODE_ENV = 'test';

const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('Routes', () => {
  it('should allow a user to login with Spotify', () => {

  });

  it('/callback should redirect you to to /home', () => {

  });

  it('should retrieve a users earsnakk_ playlists', () => {

  });

  it('should return a 404 if a user doesnt have playlists', () => {

  });

  it('should return the songs in a users playlist', () => {

  });

  it('should return a 404 if the user doesnt have any songs in the playlist', () => {

  });

  it('should allow user to search for songs by an artist', () => {

  });

  it('should return an error if no artist is found', () => {

  });

  it('should allow a user to search for an artist with a track in mind', () => {

  });

  it('should return an error if no information is found', () => {

  });

  it('should allow a host to post a playlist', () => {

  });

  it('should allow a song to be added to a playlist', () => {

  });

  it('should return an error if insufficient data is passed to song post', () => {

  });
});

