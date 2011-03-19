var testCase = require('nodeunit').testCase,
    requestOptions = require('../../lib/request_options');

exports['create'] = testCase({
    'returns an options object for an URL': function (test) {
        var options = requestOptions.create('http://example.com');
        test.equals('example.com', options.host);
        test.equals(requestOptions.DEFAULT_PORT, options.port);
        test.equals('/', options.path);
        test.equals(requestOptions.USER_AGENT, options.headers['User-Agent']);
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
    },
    'encodes the path of an URL': function (test) {
        var options = requestOptions.create('http://example.com/path with spaces/');
        test.equals('/path%20with%20spaces/', options.path);
        test.done();
    },
    'encodes querystring': function (test) {
        var options = requestOptions.create('http://example.com?test=value with spaces');
        test.equals('/?test=value%20with%20spaces', options.path);
        test.done();
    },
    'decodes and encodes an already encoded URL': function (test) {
        var options = requestOptions.create('http://example.com?redirectTo=http%3a%2f%2fexample.org%2fa%20space');
        test.equals('/?redirectTo=http://example.org/a%20space', options.path);
        test.done();
    }
});
