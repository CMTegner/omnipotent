var browserify = require('browserify');
var babelify = require('babelify');

module.exports = function () {
    return browserify({ debug: true })
        .transform(babelify.configure({ stage: 0 }))
        .require(require.resolve('../index.jsx'), { entry: true });
};
