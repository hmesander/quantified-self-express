process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
var knex = require('../db/knex');

chai.use(chaiHttp);

describe('API Food Recipe Endpoint', function() {
  beforeEach((done) => {
    knex.migrate.latest()
    .then(() => {
      knex.seed.run()
      .then(() => {
        done();
      })
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe("GET /api/v1/foods/:id/recipes", () => {
    it('returns recipes with the given food', (done) => {
      chai.request(server)
      .get('/api/v1/foods/1/recipes')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.recipes.should.be.a('array');
        response.body.recipes.length.should.equal(10);
        response.body.recipes[0].name.should.equal('');
        response.body.recipes[0].url.should.equal('');
        done();
      });
    });
  });
});
