#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* ./bin/gen_keys.js creates public and private keys suitable for
   signing identity assertins.

   Usage:
   ./bin/gen_keys.js

   Will create these files

       ./config/public-key.json
       ./config/secret-key.json

   If these files already exist, this script will show an error message
   and exit. You must remove both keys if you want to generate a new
   keypair.
*/

var fs = require('fs');
var cp = require('child_process');
var assert = require('assert');
var config = require('../lib/config');

var pubKeyFile = config.get('publicKeyFile');
var secretKeyFile = config.get('secretKeyFile');

try {
  var keysExist = fs.existsSync(pubKeyFile) && fs.existsSync(secretKeyFile);
  assert(!keysExist, 'keys already exists');
} catch(e) {
  process.exit();
}

console.error('Generating keypair');

cp.exec(
  'openssl genrsa 2048 | ../node_modules/fxa-jwtool/node_modules/pem-jwk/bin/pem-jwk.js',
  {
    cwd: __dirname
  },
  function (err, stdout, stderr) {
    var secret = stdout;
    fs.writeFileSync(secretKeyFile, secret);
    console.error('Secret Key saved:', secretKeyFile);
    var s = JSON.parse(secret);
    var pub = {
      kid: 'dev-1',
      kty: 'RSA',
      n: s.n,
      e: s.e
    };
    fs.writeFileSync(pubKeyFile, JSON.stringify(pub));
    console.error('Public Key saved:', pubKeyFile);
  }
);
