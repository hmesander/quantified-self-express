process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
var knex = require('../db/knex');

chai.use(chaiHttp);

describe('API Meal-Food Endpoints', () => {
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

  describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
    it('should return a 201 response and message if meal-food was created successfully', done => {
      chai.request(server)
      .post('/api/v1/meals/3/foods/1')
      .end((err, response) => {
        response.should.have.status(201);
        response.body.message.should.equal('Successfully added Banana to Lunch');
        done();
      });
    });

    it('should return a 200 response and message if meal-food was deleted', done => {
      chai.request(server)
      .delete('/api/v1/meals/3/foods/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.message.should.equal('Successfully removed Banana from Lunch');
        done();
      });
    });

    it('should return a 404 response if meal or food could not be found', done => {
      chai.request(server)
      .delete('/api/v1/meals/5/foods/1')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });
});
