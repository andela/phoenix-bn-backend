import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../..';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
const endPoint = '/api/v1';

let token;
const seededUser = {
  email: 'chidimma@gmail.com',
  password: process.env.SECRET,
};

before('get user token', (done) => {
  chai.request(app)
    .post(`${endPoint}/auth/signin`)
    .send(seededUser)
    .end((err, res) => {
      token = res.headers.authorization;
      done();
    });
});

describe('POST /api/v1/auth/signin', () => {
  const admin = {
    email: 'abel@gmail.com',
    password: process.env.SECRET
  };
  const user = {
    email: 'igbokwe@gmail.com',
    password: process.env.SECRET
  };
  it('sign in a super admin', (done) => {
    chai.request(app)
      .post(`${endPoint}/auth/signin`)
      .send(admin)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.id % 1).to.be.equal(0);
        process.env.testTokenAdmin = res.get('Authorization');
        done();
      });
  });
  it('sign in a normal user', (done) => {
    chai.request(app)
      .post(`${endPoint}/auth/signin`)
      .send(user)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.id % 1).to.be.equal(0);
        process.env.testTokenUser = res.get('Authorization');
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('should create a new user and return 201', (done) => {
    const user = {
      email: 'example@gmail.com',
    };
    chai.request(app)
      .post(`${endPoint}/auth/signup`)
      .set({ Authentication: `${process.env.testTokenAdmin}` })
      .send(user)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.id % 1).to.be.equal(0);
        done();
      });
  });
  it('should create a new user and return 201', (done) => {
    const user = {
      email: 'example2@gmail.com',
      role: 'Requester'
    };
    chai.request(app)
      .post(`${endPoint}/auth/signup`)
      .set({ Authentication: `${process.env.testTokenAdmin}` })
      .send(user)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.id % 1).to.be.equal(0);
        done();
      });
  });
  it('should not create a new user and return 400', (done) => {
    const user = {
      email: 'example@gmail.com',
      role: 'Requestersss'
    };
    chai.request(app)
      .post(`${endPoint}/auth/signup`)
      .set({ Authentication: `${process.env.testTokenAdmin}` })
      .send(user)
      .end((_err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should return 409 if user already exists', (done) => {
    const user = {
      email: 'example@gmail.com',
    };
    chai
      .request(app)
      .post(`${endPoint}/auth/signup`)
      .set({ authentication: `${process.env.testTokenAdmin}` })
      .send(user)
      .end((_err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.equal('error');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.include('already exists');
        done();
      });
  });
  it('invalid input', (done) => {
    const user = {
      email: 'vic./\tor@gmail.com',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set({ authentication: `${process.env.testTokenAdmin}` })
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.status).to.be.equal('error');
        done();
      });
  });
});

describe('POST /api/v1/auth/signin', () => {
  it('should signin user and return 200', (done) => {
    const user = {
      email: 'example@gmail.com',
      password: process.env.SECRET
    };
    chai.request(app)
      .post(`${endPoint}/auth/signin`)
      .send(user)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should not signin user and return 401', (done) => {
    const invalidUser = {
      email: 'example@gmail.com',
      password: 'passwordno'
    };
    chai.request(app)
      .post(`${endPoint}/auth/signin`)
      .send(invalidUser)
      .end((_err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should not signin user and return 404', (done) => {
    const invalidUser2 = {
      email: 'example@gmail.commm',
      password: 'passwordno'
    };
    chai.request(app)
      .post(`${endPoint}/auth/signin`)
      .send(invalidUser2)
      .end((_err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should not signin user and return 422', (done) => {
    const invalidUser2 = {
      email: '',
      password: 'passwordno'
    };
    chai.request(app)
      .post(`${endPoint}/auth/signin`)
      .send(invalidUser2)
      .end((_err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('GET /api/v1/user/google/signin', () => {
  it('should create an authentication url and return 200', (done) => {
    chai
      .request(app)
      .get(`${endPoint}/auth/user/google/signin`)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
describe('GET /api/v1/user/linkedin/signin', () => {
  it('should create an authentication url and return 200', (done) => {
    chai
      .request(app)
      .get(`${endPoint}/auth/user/google/signin`)
      .end((_err, res) => {
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
describe('/PATCH api/v1/user/update-profile', () => {
  const userDetails = {
    firstName: 'john',
    lastName: 'doe',
    password: 'newpassword',
    phoneNumber: 1234567798,
    gender: 'male',
    preferredLanguage: 'engliish',
    preferredCurrency: '$',
    department: 'IT',
    birthDate: '22-08-1893',
    residenceAddress: 'jeremiah Ugwu, Lekki'
  };
  it('it should return a 201 response upon authorization', (done) => {
    chai
      .request(app)
      .patch(`${endPoint}/auth/user/update-profile`)
      .set('Authorization', token)
      .send(userDetails)
      .end((_err, res) => {
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data.firstName).to.be.equal('john');
        expect(res.body.data).to.have.property('lastName');
        expect(res.body.data.lastName).to.be.equal('doe');
        expect(res.body.data).to.have.property('gender');
        expect(res.body.data.gender).to.be.equal('male');
        expect(res.body.data).to.have.property('department');
        expect(res.body.data.department).to.be.equal('IT');
        expect(res.body.data).to.have.property('phoneNumber');
        expect(res.body.data.phoneNumber).to.be.equal('1234567798');
        done();
      });
  });
  it('it should return a 401 response without authorization', (done) => {
    chai
      .request(app)
      .patch(`${endPoint}/auth/user/update-profile`)
      .send(userDetails)
      .end((_err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal('error');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.include('No Authentication token');
        done();
      });
  });
  it('it should return error for an invalid token', (done) => {
    const invalidToken = 'Bearer eyJhbGciOib20iLCJpYXQiOjE1NjgzOTA3gJ8KbmH4eJwNQiAHdYH-wlyU';
    chai.request(app)
      .patch(`${endPoint}/auth/user/update-profile`)
      .set('Authorization', invalidToken)
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.status).to.be.equal('error');
        done();
      });
  });
});
describe('/GET api/v1/user/get-profile', () => {
  it('it should return a 201 response upon authorization', (done) => {
    chai
      .request(app)
      .get(`${endPoint}/auth/user/get-profile`)
      .set('Authorization', token)
      .end((_err, res) => {
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data).to.have.property('lastName');
        expect(res.body.data).to.have.property('gender');
        expect(res.body.data).to.have.property('department');
        expect(res.body.data).to.have.property('phoneNumber');
        done();
      });
  });
  it('it should return a 401 response without authorization', (done) => {
    chai
      .request(app)
      .get(`${endPoint}/auth/user/get-profile`)
      .end((_err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal('error');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.include('No Authentication token');
        done();
      });
  });
  it('it should return error for an invalid token', (done) => {
    const invalidToken = 'Bearer eyJhbGciOib20iLCJpYXQiOjE1NjgzOTA3gJ8KbmH4eJwNQiAHdYH-wlyU';
    chai.request(app)
      .get(`${endPoint}/auth/user/get-profile`)
      .set('Authorization', invalidToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.status).to.be.equal('error');
        done();
      });
  });
});
describe('PATCH /api/v1/auth/remember-info', () => {
  it('should allow a user opt for saving profile information for future requests', (done) => {
    const data = {
      rememberInfo: false,
    };
    chai
      .request(app)
      .patch(`${endPoint}/auth/remember-info`)
      .set('Authorization', token)
      .send(data)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal('success');
        done();
      });
  });
});
