var testCase = require('nodeunit').testCase,
    SingleUrlExpander = require('../lib/single_url_expander').SingleUrlExpander;

const START_URL = 'http://example.com';
const REDIRECT_URL = 'http://example.org';

exports['_handleResponse'] = testCase({
    setUp: function (callback) {
        this.expander = new SingleUrlExpander(START_URL);
        callback();
    },
    '200 response': function (test) {
        test.expect(2);
        this.expander.on('expanded', function (originalUrl, expandedUrl) {
            test.equals(START_URL, originalUrl);
            test.equals(START_URL, expandedUrl);
        });
        this.expander._handleResponse(createOkResponse());
        test.done();
    },
    '302 response': function (test) {
        test.expect(6);
        var that = this;
        test.equals(START_URL, this.expander.startUrl);
        test.equals(START_URL, this.expander.url);
        test.equals(0, this.expander.redirectCount);
        this.expander.expand = function () {
            test.equals(START_URL, that.expander.startUrl);
            test.equals(REDIRECT_URL, that.expander.url);
            test.equals(1, that.expander.redirectCount);
        }
        this.expander.on('expanded', function (originalUrl, expandedUrl) {
            test.ok(false, 'No event expected when there is a redirect');
        });
        this.expander._handleResponse(createRedirectResponse(REDIRECT_URL));
        test.done();
    },
    '302 response with redirect limit reached': function (test) {
        test.expect(2);
        this.expander.redirectCount = this.expander.MAX_REDIRECTS;
        this.expander.on('expanded', function (originalUrl, expandedUrl) {
            test.equals(START_URL, originalUrl);
            test.equals(REDIRECT_URL, expandedUrl);
        });
        this.expander._handleResponse(createRedirectResponse(REDIRECT_URL));
        test.done();
    },
    '302 response with relative location': function (test) {
        test.expect(1);
        var expectedRedirectUrl = 'http://example.com/expanded/url';
        var expander = new SingleUrlExpander(START_URL);
        expander.expand = function () {
            test.equals(expectedRedirectUrl, expander.url);
        }
        expander._handleResponse(createRedirectResponse('/expanded/url'));
        test.done();
    },
    '302 response with relative location and redirect limit reached': function (test) {
        test.expect(1);
        this.expander.redirectCount = this.expander.MAX_REDIRECTS;
        this.expander.on('expanded', function (originalUrl, expandedUrl) {
            test.equals(START_URL + '/expanded/url', expandedUrl);
        });
        this.expander._handleResponse(createRedirectResponse('/expanded/url'));
        test.done();
    },
    '302 response with same location': function (test) {
        test.expect(1);
        this.expander.on('expanded', function (originalUrl, expandedUrl) {
            test.equals(START_URL, expandedUrl);
        });
        this.expander._handleResponse(createRedirectResponse(START_URL));
        test.done();
    }
});

function createOkResponse() {
    return {
        headers: {},
        statusCode: 200
    };
}

function createRedirectResponse(redirectToUrl) {
    return {
        headers:
            { location: redirectToUrl },
        statusCode: 302
    };
}
