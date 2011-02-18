/* A simple script to test whether some urls are expanded correctly */

var assert = require('assert'),
    UrlExpander = require('./lib/url_expander');

var urlsToExpand = ['http://github.com', 'http://4sq.com/ijRlR4'];
var expectedUrls = ['https://github.com/',
                    'http://foursquare.com/simonashley/checkin/4d4f9dddc5ff6ea80f619207?s=8WGpW3i5eHCKZgabNZiYEKy4Wbo'];

var expander = new UrlExpander(urlsToExpand);

expander.on('expanded', function (originalUrls, expandedUrls) {
    var i;

    for (i = 0; i < urlsToExpand.length; i++) {
        assert.strictEqual(expectedUrls[i], expandedUrls[originalUrls.indexOf(urlsToExpand[i])]);
    }
});

expander.expand();
