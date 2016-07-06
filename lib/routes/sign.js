/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var jwtool = require('fxa-jwtool');

var config = require('../config');
var logger = require('../logging')('routes.sign');

var SECRET_KEY = jwtool.JWK.fromFile(config.get('secretKeyFile'), {
  iss: config.get('publicUrl')
});


module.exports = function sign(req, res) {
  // Here we check the authentication on the request,
  // and if it's valid then we sign an assertion
  // using our private key.
  // The "fxa-jwtool" module is a helper library
  // that we use in FxA for dealing with JWTs and assertions
  // which might also be useful to you here.
  if (req.headers['authorization'] !== 'whatever') {
    return res.status(401).send('unauthorized');
  }

  logger.info('signing an assertion');
  SECRET_KEY.sign({
    sub: 'not implemented'
  }).then(function (cert) {
    res.json({
      cert: 'not implemented'
    });
  });
};
