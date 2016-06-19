var browserify = require('browserify');
var babelify = require('babelify');

module.exports = function () {
    return browserify({ debug: true })
        .transform(babelify)
        .require(require.resolve('../index.jsx'), { entry: true });
};
