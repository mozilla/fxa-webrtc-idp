/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var config = require('../config');
var logger = require('../logging')('routes.oauthBegin');

var OAUTH_ISSUER = config.get('fxa.issuer');
var OAUTH_CLIENT_ID = config.get('fxa.client_id');
var OAUTH_CLIENT_SECRET = config.get('fxa.client_secret');

module.exports = function oauthComplete(req, res) {
  // This is an endpoint
  // that will be redirected to
  // at the completion of the OAuth flow with FxA.
  // It will have to set up e.g. a session cookie
  // store the authenticated user.
  logger.info('completed oauth flow', {
    params: req.body,
    issuer: OAUTH_ISSUER,
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET // probably don't log this in real life...
  });
  res.send('not implemented');
};
