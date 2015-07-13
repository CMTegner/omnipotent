var fs = require('fs');
var path = require('path');
var exorcist = require('exorcist');
var createBundle = require('./create-bundle.js');

var dest = path.join(__dirname, '..', 'bundle.js');
var bundle = createBundle();

bundle.bundle()
    .pipe(exorcist(dest + '.map', '/bundle.js.map'))
    .pipe(fs.createWriteStream(dest));
