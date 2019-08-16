import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp)

describe('GET index route', () => {
  it('Displays welcome message when user visit', (done) => {
    chai.request(app)
      .get('/')
      .end((error, res) => {
        if(error) return error;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.status).to.a('string');
        expect(res.body.message).to.a('string');
        done();
      })
  })
})