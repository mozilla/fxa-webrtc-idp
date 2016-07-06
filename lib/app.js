/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var config = require('./config');
var logSummary = require('./logging/summary');
var routes = require('./routes');

var CORS_ORIGIN = config.get('cors_origin');

module.exports = function initApp() {
  var app = express();
  app.set('x-powered-by', false);
  app.use(bodyParser.json());
  app.use(logSummary());
  app.use(cors({
    origin: CORS_ORIGIN
  }));

  app.use('/.well-known/idp-proxy', express.static(
    path.resolve(__dirname, 'static', 'idp-proxy')
  ));

  app.get('/', routes.version);
  app.get('/__version__', routes.version);
  app.post('/sign', routes.sign);
  app.post('/verify', routes.verify);
  app.post('/oauth/begin', routes.oauthBegin);
  app.post('/oauth/complete', routes.oauthComplete);

  return app;
};
