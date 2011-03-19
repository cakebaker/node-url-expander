var testCase = require('nodeunit').testCase,
    factory = require('../utils/response_factory'),
    responseHandler = require('../../lib/response_handler');

const CURRENT_URL = 'http://example.com';

exports['getRedirectUrl()'] = testCase({
    'returns an empty string for an HTTP 200 response': function (test) {
        test.equal('', responseHandler.getRedirectUrl(CURRENT_URL, factory.createOkResponse()));
        test.done();
    },
    'returns the redirection url for an HTTP 301 response': function (test) {
        var redirectionUrl = 'http://example.org';
        test.equal(redirectionUrl, responseHandler.getRedirectUrl(CURRENT_URL, factory.createRedirectionResponse(redirectionUrl)));
        test.done();
    },
    'returns the absolute redirection url for an HTTP 301 response with a relative url': function (test) {
        var path = '/some/path';
        test.equal(CURRENT_URL + path, responseHandler.getRedirectUrl(CURRENT_URL, factory.createRedirectionResponse(path)));
        test.done();
    },
    'returns the absolute redirection url for an HTTP 301 response with just a filename': function (test) {
        var filename = 'error.html';
        test.equal(CURRENT_URL + '/' + filename, responseHandler.getRedirectUrl(CURRENT_URL, factory.createRedirectionResponse(filename)));
        test.done();
    }
});
