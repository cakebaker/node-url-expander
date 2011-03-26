var testCase = require('nodeunit').testCase,
    SingleUrlExpanderMock = require('../utils/single_url_expander_mock'),
    UrlExpander = require('../../lib/url_expander');

exports['UrlExpander#expand'] = testCase({
    'emits "expanded" event if the url expansion is finished': function (test) {
        test.expect(4);

        var originalUrl = 'http://example.com';
        var expandedUrl = 'http://example.com/expanded';

        var expander = new UrlExpander([originalUrl]);
        expander.SingleUrlExpander = function () {};
        expander.SingleUrlExpander.prototype = new SingleUrlExpanderMock([originalUrl], [expandedUrl]);
        
        expander.on('expanded', function (originalUrls, expandedUrls) {
            test.equal(1, originalUrls.length);
            test.equal(1, expandedUrls.length);
            test.equal(originalUrl, originalUrls[0]);
            test.equal(expandedUrl, expandedUrls[0]);
        });

        expander.expand();

        test.done();
    },
    'emits "expanded" event after all urls have been expanded': function (test) {
        test.expect(6);

        var originalUrls = ['http://example.com', 'http://example.org'];
        var expandedUrls = ['http://example.com/expanded', 'http://example.org/expanded'];

        var expander = new UrlExpander(originalUrls);
        expander.SingleUrlExpander = function () {};
        expander.SingleUrlExpander.prototype = new SingleUrlExpanderMock(originalUrls, expandedUrls);

        expander.on('expanded', function (origUrls, expUrls) {
            test.equal(2, origUrls.length);
            test.equal(2, expUrls.length);
            test.equal(originalUrls[0], origUrls[0]);
            test.equal(originalUrls[1], origUrls[1]);
            test.equal(expandedUrls[0], expUrls[0]);
            test.equal(expandedUrls[1], expUrls[1]);
        });

        expander.expand();

        test.done();
    },
    'emits "singleUrlExpanded" event after a single url has been expanded': function (test) {
        test.expect(2);

        var originalUrl = 'http://example.com';
        var expandedUrl = 'http://example.com/expanded';

        var expander = new UrlExpander([originalUrl]);
        expander.SingleUrlExpander = function () {};
        expander.SingleUrlExpander.prototype = new SingleUrlExpanderMock([originalUrl], [expandedUrl]);

        expander.on('singleUrlExpanded', function (origUrl, expUrl) {
            test.equal(originalUrl, origUrl);
            test.equal(expandedUrl, expUrl);
        });

        expander.expand();

        test.done();
    },
    'emits "singleUrlExpanded" event after each url has been expanded': function (test) {
        test.expect(4);

        var originalUrls = ['http://example.com', 'http://example.org'];
        var expandedUrls = ['http://example.com/expanded', 'http://example.org/expanded'];
        var eventCounter = 0;

        var expander = new UrlExpander(originalUrls);
        expander.SingleUrlExpander = function () {};
        expander.SingleUrlExpander.prototype = new SingleUrlExpanderMock(originalUrls, expandedUrls);

        expander.on('singleUrlExpanded', function (originalUrl, expandedUrl) {
            test.equal(originalUrls[eventCounter], originalUrl);
            test.equal(expandedUrls[eventCounter], expandedUrl);
            eventCounter++;
        });

        expander.expand();

        test.done();
    }
});
