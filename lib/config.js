/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*eslint-disable camelcase */
var convict = require('convict');
var fs = require('fs');
var path = require('path');

var conf = module.exports = convict({
  env: {
    doc: 'What environment are we running in?  Note: all hosted environments are \'production\'.',
    format: ['production', 'development'],
    default: 'production',
    env: 'NODE_ENV'
  },
  log: {
    level: {
      default: 'info',
      env: 'LOG_LEVEL'
    },
    format: {
      default: 'pretty',
      format: ['heka', 'pretty'],
      env: 'LOG_FORMAT'
    },
    app: {
      default: 'fxa-webrtc-idp',
      env: 'LOG_APP_NAME'
    }
  },
  listen: {
    host: {
      doc: 'The ip address the server should bind',
      default: '127.0.0.1',
      format: 'ipaddress',
      env: 'IP_ADDRESS'
    },
    port: {
      doc: 'The port the server should bind',
      default: 9012,
      format: 'port',
      env: 'PORT'
    }
  },
  publicUrl: {
    doc: 'Public-facing URL for the application',
    default: 'http://127.0.0.1:9012',
    format: 'url',
    env: 'PUBLIC_URL'
  },
  fxa: {
    issuer: {
      doc: 'The url of the Firefox Account server',
      default: 'https://stable.dev.lcip.org/',
      format: 'url',
      env: 'FXA_ISSUER'
    },
    client_id: {
      doc: 'The OAuth client_id to use with FxA',
      default: 'https://stable.dev.lcip.org/',
      env: 'FXA_CLIENT_ID'
    },
    client_secret: {
      doc: 'The OAuth client_secret to use with FxA',
      default: 'https://stable.dev.lcip.org/',
      env: 'FXA_CLIENT_SECRET'
    }
  },
  cors_origin: {
    doc: 'Origin to allow in CORS headers',
    default: '*',
    env: 'CORS_ORIGIN'
  },
  secretKeyFile: {
    doc: 'Path to file containing the server\'s signing secret key',
    default: path.resolve(__dirname, '../config/secret-key.json'),
    format: String,
    env: 'SECRET_KEY_FILE'
  },
  publicKeyFile: {
    doc: 'Path to file containing the server\'s signing public key',
    default: path.resolve(__dirname, '../config/public-key.json'),
    format: String,
    env: 'PUBLIC_KEY_FILE'
  },
  oldPublicKeyFile: {
    doc: 'Path to file containing the server\'s previous signing public key' +
         ' (used when doing key rotation)',
    format: String,
    default: undefined,
    env: 'OLD_PUBLIC_KEY_FILE'
  }
});


var DEV_CONFIG_PATH = path.join(__dirname, '..', 'config', 'local.json');
var files;

// Handle configuration files.
// You can specify a CSV list of configuration files to process in the
// CONFIG_FILES environment variable.  They will be overlaid on the default
// config in order.
if (process.env.CONFIG_FILES && process.env.CONFIG_FILES.trim() !== '') {
  files = process.env.CONFIG_FILES.split(',');
} else if (fs.existsSync(DEV_CONFIG_PATH)) {
  files = [ DEV_CONFIG_PATH ];
}

if (files) {
  conf.loadFile(files);
}

if (! process.env.NODE_ENV) {
  process.env.NODE_ENV = conf.get('env');
}

conf.validate({
  strict: true
});
