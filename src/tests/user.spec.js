import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '..';

chai.use(chaiHttp);
const { expect } = chai;

const endPoint = '/api/v1';

describe('POST /api/v1/auth/signup', () => {
  it('should create a new user and return 201', (done) => {
    const user = {
      firstName: 'victor',
      lastName: 'nach',
      userName: 'lazydev',
      email: 'myemail@gmail.com',
      password: 'password',
      phoneNumber: '09034343434',
      isAdmin: false,
    };
    chai.request(app)
      .post(`${endPoint}/auth/signup`)
      .send(user)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.id % 1).to.be.equal(0);
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data.firstName).to.be.a('string');
        expect(res.body.data).to.have.property('lastName');
        expect(res.body.data.lastName).to.be.a('string');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data.email).to.be.a('string');
        done();
      });
  });
  it('should return 409 if user already exists', (done) => {
    const user = {
      firstName: 'victor',
      lastName: 'nach',
      userName: 'lazydev',
      email: 'myemail@gmail.com',
      password: 'password',
      phoneNumber: '09034343434',
      isAdmin: false,
    };
    chai.request(app)
      .post(`${endPoint}/auth/signup`)
      .send(user)
      .end((_err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.equal(409);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.include('already exists');
        done();
      });
  });
});

describe('POST /api/v1/auth/signin', () => {
  it('should signin user and return 200', (done) => {
    const user = {
      email: 'myemail@gmail.com',
      password: 'password'
    };
    chai.request(app)
      .post(`${endPoint}/auth/signin`)
      .send(user)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should not signin user and return 400', (done) => {
    const invalidUser = {
      email: 'myemail@gmail.com',
      password: 'passwordno'
    };
    chai.request(app)
      .post(`${endPoint}/auth/signin`)
      .send(invalidUser)
      .end((_err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should not signin user and return 400', (done) => {
    const invalidUser2 = {
      email: 'myemail@gmail.commm',
      password: 'passwordno'
    };
    chai.request(app)
      .post(`${endPoint}/auth/signin`)
      .send(invalidUser2)
      .end((_err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
