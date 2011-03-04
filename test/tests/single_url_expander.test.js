var testCase = require('nodeunit').testCase,
    UrlExpansionMock = require('../utils/url_expansion_mock'),
    SingleUrlExpander = require('../../lib/single_url_expander');

exports['SingleUrlExpander#expand'] = testCase({
    'emits "expanded" event if the url expansion is finished': function (test) {
        test.expect(2);

        var startUrl = 'http://example.com';
        var expectedUrl = 'http://example.com/expanded';

        var expander = new SingleUrlExpander(startUrl);
        expander.UrlExpansion = function () {};
        expander.UrlExpansion.prototype = new UrlExpansionMock({ hasNext: false, currentUrl: expectedUrl });

        expander.on('expanded', function (originalUrl, expandedUrl) {
            test.equal(startUrl, originalUrl);
            test.equal(expectedUrl, expandedUrl);
        });

        expander.expand();

        test.done();
    },
    'emits "expanded" event if the maximal amount of requests have been performed': function (test) {
        test.expect(1);

        var expectedUrl = 'http://example.com/expanded';
        
        var expander = new SingleUrlExpander('http://example.com');
        expander.UrlExpansion = function () {};
        expander.UrlExpansion.prototype = new UrlExpansionMock({ hasNext: true, currentUrl: expectedUrl, requestCount: SingleUrlExpander.MAX_REQUESTS });

        expander.on('expanded', function (originalUrl, expandedUrl) {
            test.equal(expectedUrl, expandedUrl);
        });

        expander.expand();

        test.done();
    },
    'emits "expanded" event if there is an error with the url expansion': function (test) {
        test.expect(1);

        var startUrl = 'http://example.com';

        var expander = new SingleUrlExpander(startUrl);
        expander.UrlExpansion = function () {};
        expander.UrlExpansion.prototype = new UrlExpansionMock({});
        expander.UrlExpansion.prototype.on = function (type, callback) { return { on: function (type, errorCallback) { errorCallback(); } } };

        expander.on('expanded', function (originalUrl, expandedUrl) {
            test.equal(startUrl, expandedUrl);
        });

        expander.expand();

        test.done();
    },
    'continues expansion if the url expansion is not finished': function (test) {
        test.expect(1);

        var expander = new SingleUrlExpander('http://example.com');
        expander.UrlExpansion = function () {};
        expander.UrlExpansion.prototype = new UrlExpansionMock({ hasNext: true });
        expander.UrlExpansion.prototype.next = function () { test.ok(true); };

        expander.expand();
        
        test.done();
    }
});
