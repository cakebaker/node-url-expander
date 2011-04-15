/* A simple script to test whether some urls are expanded correctly */

var assert = require('assert'),
    UrlExpander = require('./lib/url_expander');

var urlsToExpand = ['http://github.com',
                    'http://4sq.com/ijRlR4',
                    'http://on.fb.me/gkDyBL',
                    'http://google.c',
                    'http://j.mp/fdJAdV',
                    'http://bit.ly/icS2gt',
                    'http://www.trai.gov.in/Feedback.asp'];
var expectedUrls = ['https://github.com/',
                    'https://foursquare.com/simonashley/checkin/4d4f9dddc5ff6ea80f619207?s=8WGpW3i5eHCKZgabNZiYEKy4Wbo',
                    'http://www.facebook.com/reflections.at/posts/123810601024508',
                    'http://google.c',
                    'http://gigaom.com/2011/02/14/silicon-valley-the-land-of-confusion/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:%20OmMalik%20(GigaOM:%20Tech)',
                    'http://www.last.fm/music/Toro%20y%20Moi/_/Elise',
                    'http://www.trai.gov.in/error.asp'];

var expander = new UrlExpander(urlsToExpand);

expander.on('singleUrlExpanded', function (originalUrl, expandedUrl) {
    console.log(originalUrl + ' -> ' + expandedUrl);
    assert.equal(expectedUrls[urlsToExpand.indexOf(originalUrl)], expandedUrl);
});

expander.expand();
