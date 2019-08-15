import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp)

describe('User receives JWT on registration', (done) => {
  chai.request(app)
    .get('/')
    .end((error, res) => {
      if(error) return error;
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an(object);
      expect(res.body).to.have.keys('status', 'message');
      expect(res.body.status).to.a('string');
      expect(res.body.message).to.a('string');
    })
})