// process.env.NODE_ENV = 'test';
//
// const chai = require('chai');
// const should = chai.should();
// const chaiHttp = require('chai-http');
// const server = require('../server');
// var knex = require('../db/knex');
//
// chai.use(chaiHttp);
//
// describe('Client Routes', () => {
//   it('should return the root page with text', done => {
//     chai.request(server)
//     .get('/')
//     .end((err, response) => {
//       response.should.have.status(200);
//       response.should.be.html;
//       response.res.text.should.equal('Welcome to the Quantified Self - Express API!');
//       done();
//     });
//   });
//
//   it('should return a 404 for a route that does not exist', done => {
//     chai.request(server)
//     .get('/route/does/not/exist')
//     .end((err, response) => {
//       response.should.have.status(404);
//       done();
//     });
//   });
// });
//
// describe('API Routes', () =>
//
//   describe('GET /api/v1/meals/:id/foods', () => {
//     it('should return a single meal with associated foods if meal is found in database', done => {
//       chai.request(server)
//       .get('/api/v1/meals/1/foods')
//       .end((err, response) => {
//         response.should.have.status(200);
//         response.should.be.json;
//         response.body.should.be.a('array');
//         response.body.length.should.equal(1);
//         response.body[0].id.should.equal(1);
//         response.body[0].name.should.equal('Breakfast');
//         done();
//       });
//     });
//
//     it('should return a 404 response if meal is not found in database', done => {
//       chai.request(server)
//       .get('/api/v1/meals/5/foods')
//       .end((err, response) => {
//         response.should.have.status(404);
//         done();
//       });
//     });
//   });
//
//   describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
//     it('should return a 201 response and message if meal-food was created successfully', done => {
//       chai.request(server)
//       .post('/api/v1/meals/3/foods/1')
//       .end((err, response) => {
//         response.should.have.status(201);
//         response.body.message.should.equal('Successfully added Banana to Lunch');
//         done();
//       });
//     });
//
//     it('should return a 200 response and message if meal-food was deleted', done => {
//       chai.request(server)
//       .delete('/api/v1/meals/3/foods/1')
//       .end((err, response) => {
//         response.should.have.status(200);
//         response.body.message.should.equal('Successfully removed Banana from Lunch');
//         done();
//       });
//     });
//
//     it('should return a 404 response if meal or food could not be found', done => {
//       chai.request(server)
//       .delete('/api/v1/meals/5/foods/1')
//       .end((err, response) => {
//         response.should.have.status(404);
//         done();
//       });
//     });
//   });
// });
//
// describe('API Routes Empty Database', () => {
//   before((done) => {
//     knex('meal-foods').del()
//     .then(() => done())
//     .catch(error => {
//       throw error;
//     });
//   });
//
//   before((done) => {
//     knex('foods').del()
//     .then(() => done())
//     .catch(error => {
//       throw error;
//     });
//   });
//
//   before((done) => {
//     knex('meals').del()
//     .then(() => done())
//     .catch(error => {
//       throw error;
//     });
//   });
//
//   describe('GET /api/v1/foods', () => {
//     it('should return 404 response if database does not contain foods', done => {
//       chai.request(server)
//       .get('/api/v1/foods')
//       .end((err, response) => {
//         response.should.have.status(404);
//         done();
//       });
//     });
//   });
//
//   describe('GET /api/v1/meals', () => {
//     it('should return 404 response if database does not contain meals', done => {
//       chai.request(server)
//       .get('/api/v1/meals')
//       .end((err, response) => {
//         response.should.have.status(404);
//         done();
//       });
//     });
//   });
//
//   describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
//     it('should return a 404 status when meal or food do not exist', done => {
//       chai.request(server)
//       .post('/api/v1/meals/1/foods/1')
//       .end((err, response) => {
//         response.should.have.status(404);
//         done();
//       });
//     });
//   });
// })
