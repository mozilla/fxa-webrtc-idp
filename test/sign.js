/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var request = require('supertest');

var app = require('../lib/app')();


describe('the route /sign', function () {

  it('returns a 401 when the request is not authenticated', function (done) {
    request(app)
      .post('/sign', { data: 'here' })
      .set('authorization', 'something invalid')
      .expect(401)
      .end(done);
  });

  it('returns a signed assertion when the request is authenticated', function (done) {
    request(app)
      .post('/sign', { data: 'here' })
      .set('authorization', 'whatever')
      .expect('Content-Type', /json/)
      .expect(200, {
        cert: 'not implemented',
      })
      .end(done);
  });

});

