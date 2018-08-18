process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
var knex = require('../db/knex');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the root page with text', done => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.equal('Welcome to the Quantified Self - Express API!');
      done();
    });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
    .get('/route/does/not/exist')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });
});

describe('API Routes', () => {
  before((done) => {
    knex.migrate.latest()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

  beforeEach((done) => {
    knex.seed.run()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

  describe('GET /api/v1/foods', () => {
    it('should return all of the foods if database contains foods', done => {
      chai.request(server)
      .get('/api/v1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Banana');
        response.body[0].should.have.property('calories');
        response.body[0].calories.should.equal(60);
        response.body[0].should.not.have.property('created_at');
        response.body[0].should.not.have.property('updated_at');
        done();
      });
    });
  });

  describe('GET /api/v1/foods/:id', () => {
    it('should return a single food if food is found in database', done => {
      chai.request(server)
      .get('/api/v1/foods/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].id.should.equal(1);
        response.body[0].name.should.equal('Banana');
        response.body[0].calories.should.equal(60);
        response.body[0].should.not.have.property('created_at');
        response.body[0].should.not.have.property('updated_at');
        done();
      });
    });

    it('should return a 404 response if food is not found in database', done => {
      chai.request(server)
      .get('/api/v1/foods/10')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('POST /api/v1/foods', () => {
    it('should create a new food when required parameters exist', done => {
      chai.request(server)
      .post('/api/v1/foods')
      .send({
        "food": {
          "name": "Pho",
          "calories": 300
        }
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.name.should.equal('Pho');
        response.body.calories.should.equal(300);
        response.body.should.not.have.property('created_at');
        response.body.should.not.have.property('updated_at');
        done();
      });
    });

    it('should return a 400 status when required parameters do not exist', done => {
      chai.request(server)
      .post('/api/v1/foods')
      .send({
        "food": {
          "name": "Pho" //calories field is not given
        }
      })
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
    });
  });
});

describe('API Routes Empty Database', () => {
  before((done) => {
    knex('foods').del()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

  describe('GET /api/v1/foods', () => {
    it('should return 404 response if database does not contain foods', done => {
      chai.request(server)
      .get('/api/v1/foods')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });
})
