import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';

chai.use(chaiHttp);
const { expect } = chai;
let token;
const seededUser = {
  email: 'chidimma@gmail.com',
  password: process.env.SECRET,
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

describe('POST /api/v1/trip', () => {
  it('It should create a one way trip', (done) => {
    const trip = {
      accommodation: '1',
      origin: 'Lagos',
      destination: 'Benin',
      travelDate: '2019-11-08',
      travelReasons: '7866'
    };
    chai.request(app)
      .post('/api/v1/trip')
      .set('Authorization', token)
      .send(trip)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('Invalid token for trip', (done) => {
    const trip = {
      accommodation: '1',
      origin: 'Lagos',
      destination: 'Benin',
      travelDate: '2019-11-08',
      travelReasons: '7866'
    };
    chai.request(app)
      .post('/api/v1/trip')
      .send(trip)
      .end((_err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.status).to.be.equal('error');
        done();
      });
  });
});

describe('POST /api/trip/:id/reject', () => {
  it('It should reject a trip request', (done) => {
    chai.request(app)
      .patch('/api/v1/trip/1/reject')
      .set('Authorization', token)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('userId');
        expect(res.body.data).to.have.property('status');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data.status).to.be.equal('rejected');
        done();
      });
  });
  it('It should fail if the trip doesn\'t exist', (done) => {
    chai.request(app)
      .patch('/api/v1/trip/10/reject')
      .set('Authorization', token)
      .end((_err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.status).to.be.equal('error');
        expect(res.body.error).be.a('string');
        expect(res.body.error).to.include('no trip found');
        done();
      });
  });
  
});
