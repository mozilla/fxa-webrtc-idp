/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var jwtool = require('fxa-jwtool');

var config = require('../config');
var logger = require('../logging')('routes.sign');

var PUBLIC_KEY = jwtool.JWK.fromFile(config.get('publicKeyFile'));

var OLD_PUBLIC_KEY = config.get('oldPublicKeyFile');
if (OLD_PUBLIC_KEY) {
  OLD_PUBLIC_KEY = jwtool.JWK.fromFile(OLD_PUBLIC_KEY);
}

module.exports = function verify(req, res) {
  // This is an endpoint that the front-end can call
  // to verify a previously generated assertion.
  // An alternative would be to just serve the public keys
  // and let client code to the verification itself,
  // but doing it in the server is probably simpler to start.
  PUBLIC_KEY.verify(req.body.cert).then(function (valid) {
    // To allow for key rotation,
    // fallback to previous public key.
    if (! valid && OLD_PUBLIC_KEY) {
      return OLD_PUBLIC_KEY.verify(req.body.cert);
    }
    return valid;
  }).then(function (valid) {
    if (! valid) {
      logger.warn('invalid assertion', {
        cert: req.body.cert
      });
      res.status(401).send('invalid');
    }
    res.json({
      result: 'goes here'
    });
  });
};
