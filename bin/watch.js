var fs = require('fs');
var path = require('path');
var watchify = require('watchify');
var exorcist = require('exorcist');
var moment = require('moment');
var createBundle = require('./create-bundle.js');

var dest = path.join(__dirname, '..', 'bundle.js');
var bundle = createBundle();

console.log('Building...');

bundle.bundle()
    .on('end', function () {
        console.log('Watching...');
    })
    .pipe(exorcist(dest + '.map', '/bundle.js.map'))
    .pipe(fs.createWriteStream(dest));

watchify(bundle)
    .on('update', function () {
        console.log('Updating bundle...');
        bundle.bundle()
            .on('end', function () {
                console.log('Bundle updated at %s', moment().format('HH:mm:ss'));
            })
            .pipe(exorcist(dest + '.map', '/bundle.js.map'))
            .pipe(fs.createWriteStream(dest));
    });
