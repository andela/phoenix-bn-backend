import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '..';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
const endPoint = '/api/v1';

describe('POST /api/v1/role', () => {
  const admin = {
    email: 'abel@gmail.com',
    password: process.env.SECRET
  };
  const role = {
    email: 'example@gmail.com',
    role: 'manager'
  };
  const role2 = {
    email: 'example@gmail.com',
    role: 'manager'
  };
  it('should create a ne role', (done) => {
    chai.request(app)
      .post(`${endPoint}/role`)
      .set({ Authentication: process.env.testTokenAdmin })
      .send(role)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.id % 1).to.be.equal(0);
        done();
      });
  });
  it('should create a new role', (done) => {
    chai.request(app)
      .post(`${endPoint}/role`)
      .set({ Authentication: process.env.testTokenAdmin })
      .send(role)
      .end((_err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should create a new role', (done) => {
    chai.request(app)
      .post(`${endPoint}/role`)
      .set({ Authentication: process.env.testTokenUser })
      .send(role2)
      .end((_err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
