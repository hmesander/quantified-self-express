process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
var knex = require('../db/knex');

chai.use(chaiHttp);

describe('API Meal Endpoints', () => {
  beforeEach((done) => {
    knex.migrate.latest()
    .then(() => {
      knex.seed.run()
      .then(() => {
        done();
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe('GET /api/v1/meals', () => {
    it('should return all meals in the database', (done) => {
      chai.request(server)
      .get('/api/v1/meals')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(4);
        response.body[0].name.should.equal('Breakfast');
        response.body[1].name.should.equal('Snack');
        response.body[2].name.should.equal('Lunch');
        response.body[3].name.should.equal('Dinner');
        done();
      });
    });
  });

  describe('GET /api/v1/meals/:id/foods', () => {
    it('should return a single meal with associated foods if meal is found in database', done => {
      chai.request(server)
      .get('/api/v1/meals/1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].id.should.equal(1);
        response.body[0].name.should.equal('Breakfast');
        done();
      });
    });

    it('should return a 404 response if meal is not found in database', done => {
      chai.request(server)
      .get('/api/v1/meals/5/foods')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });
});
