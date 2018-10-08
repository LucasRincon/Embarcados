const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', function(done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏' 
      }, done);
  });
});

describe('POST /api/v1/location', () => {
  it('Adds location', function(done) {
    const requestObj = {
       latitude: -90,
       longitude: 180
	};

    const responseObj = {
       ...requestObj,
        _id: '5baacfcc63edbf0d4a93f402',
        date: '2018-09-26T00:16:12.264Z'
	};
    request(app)
      .post('/api/v1/location')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.boby._id = '5baacfcc63edbf0d4a93f402';
        res.body.date = '2018-09-26T00:16:12.264Z';
      })
      .expect(200, responseObj, done);
  });
});
