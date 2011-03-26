# node-url-expander

node-url-expander is an url expander for [node.js](http://nodejs.org).

## Requirements

- node.js v0.4.x

## Installation

    $ npm install url-expander

## Examples

    var UrlExpander = require('url-expander');

    var expander = new UrlExpander(['http://example.com', 'http://example.net']);
    // the "expanded" event is emitted once after all urls have been expanded
    expander.on('expanded', function (originalUrls, expandedUrls) {
        // do something
    });
    // the "singleUrlExpanded" event is emitted for each expanded url
    expander.on('singleUrlExpanded', function (originalUrl, expandedUrl) {
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

## Tests

Running the unit tests:

    $ nodeunit test/tests/*

Running the integration tests:

    $ node integration-test.js

## License

node-url-expander is licensed under the MIT license.
