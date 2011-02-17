/**
 * UrlExpander - A module to expand an array of urls.
 *
 * Requires node.js 0.4.0
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var util = require('util'),
    events = require('events'),
    SingleUrlExpander = require('./single_url_expander');

function UrlExpander(urls) {
    this.urls = urls;
    this.eventCount = 0;
    this.originalUrls = [];
    this.expandedUrls = [];
    events.EventEmitter.call(this);
}

util.inherits(UrlExpander, events.EventEmitter);

UrlExpander.prototype.expand = function () {
    var that = this;
    var expander;
    this.expectedEventCount = this.urls.length;

    for (var i = 0; i < this.urls.length; i++) {
        expander = new SingleUrlExpander(this.urls[i]);
        expander.on('expanded', function (originalUrl, expandedUrl) {
            that.eventCount++;
            that.originalUrls.push(originalUrl);
            that.expandedUrls.push(expandedUrl);

            if (that.eventCount == that.expectedEventCount) {
                that.emit('expanded', that.originalUrls, that.expandedUrls);
            }
        });
        expander.expand();
    }
}

var exports = module.exports = UrlExpander;
exports.SingleUrlExpander = SingleUrlExpander;
