import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';

chai.use(chaiHttp);
const { expect } = chai;
let token;
let tripId;
const seededUser = {
  email: 'chidimma@gmail.com',
  password: process.env.SECRET,
};
const createTrip = {
  accommodation: '1',
  origin: 'Lagos',
  destination: 'Benin',
  travelDate: '2019-11-08',
  travelReasons: '7866'
};

before('get user token', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send(seededUser)
    .end((err, res) => {
      token = res.headers.authorization;
      done();
    });
});
before('create trip', (done) => {
  chai.request(app)
    .post('/api/v1/trip')
    .set('Authorization', token)
    .send(createTrip)
    .end((err, res) => {
      tripId = res.body.data.id;
      done();
    });
});

describe('POST /api/v1/:tripId/comment', () => {
  it('Post a comment', (done) => {
    const comments = {
      comment: 'bbbfbbc'
    };
    chai.request(app)
      .post(`/api/v1/${tripId}/comment`)
      .set('Authorization', token)
      .send(comments)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
