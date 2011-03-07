var testCase = require('nodeunit').testCase,
    requestOptions = require('../../lib/request_options');

const DEFAULT_PORT = 80;

exports['create'] = testCase({
    'returns an options object for an URL': function (test) {
        var options = requestOptions.create('http://example.com');
        test.equals('example.com', options.host);
        test.equals(DEFAULT_PORT, options.port);
        test.equals('/', options.path);
        test.done();
    },
    'returns an options object for an URL with a path': function (test) {
        var path = '/some/path';
        var options = requestOptions.create('http://example.com' + path);
        test.equals(path, options.path);
        test.done();
    },
    'returns an options object for an URL with a port': function (test) {
        var port = 8000;
        var options = requestOptions.create('http://example.com:' + port);
        test.equals(port, options.port);
        test.done();
    },
    'returns an options object for an URL with a querystring': function (test) {
        var options = requestOptions.create('http://example.com?test=value');
        test.equals('/?test=value', options.path);
        test.done();
    }
});
