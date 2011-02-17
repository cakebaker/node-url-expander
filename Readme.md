# node-url-expander

node-url-expander is an url expander for [node.js](http://nodejs.org).

## Requirements

- node.js v0.4.x

## Installation

    $ npm install url-expander

## Examples

    var UrlExpander = require('url-expander');

    var expander = new UrlExpander(['http://example.com', 'http://example.net']);
    expander.on('expanded', function (originalUrls, expandedUrls) {
        // do something
    });
    expander.expand();

For expanding a single url you can also use:

    var SingleUrlExpander = require('url-expander').SingleUrlExpander;

    var expander = new SingleUrlExpander('http://example.com');
    expander.on('expanded', function (originalUrl, expandedUrl) {
        // do something
    });
    expander.expand();

## License

node-url-expander is licensed under the MIT license.
