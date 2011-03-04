var testCase = require('nodeunit').testCase,
    factory = require('../utils/response_factory'),
    HttpMock = require('../utils/http_mock'),
    UrlExpansion = require('../../lib/url_expansion');

exports['UrlExpansion#hasNext'] = testCase({
    setUp: function (callback) {
        this.urlExpansion = new UrlExpansion('http://example.com');
        callback();
    },
    'returns true after an object is instantiated ': function (test) {
        test.strictEqual(true, this.urlExpansion.hasNext());
        test.done();
    },
    'returns true after next() received a redirection response': function (test) {
        test.expect(1);

        var that = this;
        this.urlExpansion.http = new HttpMock(factory.createRedirectionResponse);

        this.urlExpansion.on('expanded', function () {
            test.strictEqual(true, that.urlExpansion.hasNext());
        });

        this.urlExpansion.next();

        test.done();
    },
    'returns false after next() did not receive a redirection response': function (test) {
        test.expect(1);

        var that = this;
        this.urlExpansion.http = new HttpMock(factory.createOkResponse);

        this.urlExpansion.on('expanded', function () {
            test.strictEqual(false, that.urlExpansion.hasNext());
        });

        this.urlExpansion.next();

        test.done();
    }
});

exports['UrlExpansion#next'] = testCase({
    'emits "expanded" event if the request was successful': function (test) {
        test.expect(1);

        var urlExpansion = new UrlExpansion('http://example.com');
        urlExpansion.http = new HttpMock(factory.createOkResponse);

        urlExpansion.on('expanded', function () {
            test.ok(true);
        });

        urlExpansion.next();

        test.done();
    },
    'emits "error" event if the request was not successful': function (test) {
        test.expect(1);

        var urlExpansion = new UrlExpansion('http://example.com');
        urlExpansion.http = new HttpMock();

        urlExpansion.on('error', function (e) {
            test.ok(true);
        });

        urlExpansion.next();

        test.done();
    }
});
