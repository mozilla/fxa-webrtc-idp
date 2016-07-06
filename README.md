# Firefox Accounts WebRTC IdP

This is an experiment in building a WebRTC Identity Provider:

  http://w3c.github.io/webrtc-pc/#sec.identity-proxy

on top of the Firefox Accounts OAuth flow:

  https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Firefox_Accounts/Introduction#Authenticating_with_Firefox_Accounts

It's a bare-bones expressjs app that doesn't actually
do anything much yet.

To get up and running:

    npm install
    ./bin/gen_keys.js
    npm test
    npm start

To customize the configuration, either use environment variables:

    PORT=8080 npm start

Or create a JSON file and load it like this:

    cp config/local.json-dist ./config/local.json
    vim ./config/local.json
    CONFIG_FILES=./config/local.json npm start

## License

MPL 2.0
