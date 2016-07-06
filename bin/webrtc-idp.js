#!/usr/bin/env node
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*
 * Runs an OAuth-authenticted proxy API to a basket server.
 */

var config = require('../lib/config');
var logger = require('../lib/logging')('server');

var app = require('../lib/app.js');

function listen(app) {
  app.listen(config.get('listen.port'), config.get('listen.host'));
  logger.info('FxA WebRTC IdP listening on port', config.get('listen.port'));
  return true;
}

listen(app());
