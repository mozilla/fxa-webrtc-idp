/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var config = require('../config');
var logger = require('../logging')('routes.oauthBegin');

var OAUTH_ISSUER = config.get('fxa.issuer');
var OAUTH_CLIENT_ID = config.get('fxa.client_id');

module.exports = function oauthBegin(req, res) {
  // This is an endpoint
  // that can be loaded into a popup window
  // to begin the OAuth flow with FxA, as described at
  // https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Firefox_Accounts/Introduction#Authenticating_with_Firefox_Accounts
  //
  // There's likely to be an OAuth2 or OpenID Connect
  // plugin for expressjs that can take care
  // of all the details.
  logger.info('starting oauth flow', {
    params: req.body,
    issuer: OAUTH_ISSUER,
    clientId: OAUTH_CLIENT_ID
  });
  res.send('not implemented');
};
