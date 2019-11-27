const request = require('supertest');
const { expect } = require('chai');

const token = 'yourJWTokenHere';

describe('getFieldExperiment', function getFieldExperiment() {
  const url = 'http://localhost:8181';
  let headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'x-api-key': 'd41d8cd98f00b204e9800998ecf8427e',
    'x-site-id': 'wyp',
    'Content-Type': 'application/json',
  };
  const body = {
    extra_data: {
      otherData: 'hi',
    },
    inputs: {
      id: 1,
    },
    name: 'my_experiment',
    params: {
      formType: 'testForm2',
    },
    salt: 'my_experiment',
    time: 1566430102.227,
  };

  it('should post request with correct headers and body', done => {
    request(url)
      .post(`/`)
      .set(headers)
      .send(body)
      .expect(200)
      // eslint-disable-next-line
      .end(function(error, result) {
        if (error) {
          console.log(result);
          return done(error);
        }

        // eslint-disable-next-line
        expect(result.res.text).to.include('{"status":"success"');
        done();
      });
  });

  it('should not pass post request with expired token', done => {
    const expiredToken = 'yourExpiredJWTokenHere';
    headers = { ...headers, Authorization: `Bearer ${expiredToken}` };

    request(url)
      .post(`/`)
      .set(headers)
      .send(body)
      .expect(401)
      // eslint-disable-next-line
      .end(function(error, result) {
        if (error) {
          console.log(result);
          return done(error);
        }

        // eslint-disable-next-line
        expect(result.res.text).to.include(
          '{"statusCode":401,"error":"Unauthorized","message":"Unauthorized"}'
        );
        done();
      });
  });

  it('should not pass post request with invalid Authorization requests', done => {
    const whateverToken = 'whateverkeyshere';
    headers = { ...headers, Authorization: `Bearer ${whateverToken}` };

    request(url)
      .post(`/`)
      .set(headers)
      .send(body)
      .expect(401)
      // eslint-disable-next-line
      .end(function(error, result) {
        if (error) {
          console.log(result);
          return done(error);
        }

        // eslint-disable-next-line
        expect(result.res.text).to.include(
          '{"statusCode":401,"error":"Unauthorized","message":"Unauthorized"}'
        );
        done();
      });
  });

  it('should not pass post request if no site id', done => {
    headers = { ...headers, 'x-site-id': '' };

    request(url)
      .post(`/`)
      .set(headers)
      .send(body)
      .expect(401)
      // eslint-disable-next-line
      .end(function(error, result) {
        if (error) {
          console.log(result);
          return done(error);
        }

        // eslint-disable-next-line
        expect(result.res.text).to.include(
          '{"statusCode":401,"error":"Unauthorized","message":"Unauthorized"}'
        );
        done();
      });
  });

  it('should not pass post request if no api key', done => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
      'x-site-id': 'wyp',
      'x-api-key': '',
    };

    request(url)
      .post(`/`)
      .set(headers)
      .send(body)
      .expect(403)
      // eslint-disable-next-line
      .end(function(error, result) {
        if (error) {
          console.log(result);
          return done(error);
        }

        // eslint-disable-next-line
        expect(result.res.text).to.include('{"message":"Forbidden"}');
        done();
      });
  });
});

describe('getFieldExperimentOnDev', function getFieldExperiment() {
  const url = 'https://l83rs7irb8.execute-api.us-west-1.amazonaws.com/';
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'x-api-key': 'MMOtKjFekQ67oBzB1LpOl7dertPQwwaR18mDJLKD',
    'x-site-id': 'wyp',
    'Content-Type': 'application/json',
  };
  const body = {
    event: 'my_experiment',
    extra_data: {
      otherData: 'hi',
    },
    inputs: {
      id: 1,
    },
    name: 'my_experiment',
    params: {
      formType: 'testForm1',
    },
    salt: 'my_experiment',
    time: 1566430102.227,
  };

  it('should post request with correct headers and body', done => {
    request(url)
      .post(`dev/`)
      .set(headers)
      .send(body)
      .expect(200)
      // eslint-disable-next-line
      .end(function(error, result) {
        if (error) {
          console.log(result);
          return done(error);
        }

        // eslint-disable-next-line
        expect(result.res.text).to.include('{"status":"success"');
        done();
      });
  });

  it('should pass post request with missing not required body data (extra_data)', done => {
    delete body.extra_data;

    request(url)
      .post(`dev/`)
      .set(headers)
      .send(body)
      .expect(200)
      // eslint-disable-next-line
      .end(function(error, result) {
        if (error) {
          console.log(result);
          return done(error);
        }

        // eslint-disable-next-line
        expect(result.res.text).to.include('{"status":"success"');
        done();
      });
  });

  it('should not pass post request with missing required body data (event)', done => {
    delete body.event;

    request(url)
      .post(`dev/`)
      .set(headers)
      .send(body)
      .expect(400)
      // eslint-disable-next-line
      .end(function(error, result) {
        if (error) {
          console.log(result);
          return done(error);
        }

        // eslint-disable-next-line
        expect(result.text).to.include('{"message": "Invalid request body"}');
        // eslint-disable-next-line
        expect(result.body).to.include({ message: 'Invalid request body' });
        done();
      });
  });
});
