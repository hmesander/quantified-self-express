process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
var knex = require('../db/knex');

chai.use(chaiHttp);

describe('API Favorite Food Endpoint', () => {
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

  describe('GET /api/v1/favorite_foods', () => {
    it('should return foods added to more than one meal', done => {
      chai.request(server)
      .get('/api/v1/favorite_foods')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].foods.should.be.a('array');
        response.body[0].timeseaten.should.equal('4');
        response.body[0].foods.length.should.equal(2);
        response.body[0].foods.mealsWhenEaten.should.be.a('array');
        response.body[0].foods.mealsWhenEaten.length.should.equal(4);
        response.body[0].foods.mealsWhenEaten[0].should.equal('Breakfast');
        response.body[0].foods.mealsWhenEaten[1].should.equal('Snack');

        response.body[1].timeseaten.should.equal('3');
        response.body[1].foods.length.should.equal(1);
        response.body[1].foods.mealsWhenEaten.length.should.equal(3);
        response.body[1].foods.mealsWhenEaten[2].should.equal('Lunch');

        response.body[2].timeseaten.should.equal('2');
        response.body[2].foods.length.should.equal(2);
        done();
      });
    });
  });
});
