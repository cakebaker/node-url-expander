/**
 * UrlExpander - A module to expand an array of urls.
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
    this.SingleUrlExpander = SingleUrlExpander;
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

    this.urls.forEach(function (url) {
        expander = new that.SingleUrlExpander(url);
        expander.on('expanded', function (originalUrl, expandedUrl) {
            that.eventCount++;
            that.originalUrls.push(originalUrl);
            that.expandedUrls.push(expandedUrl);

            that.emit('singleUrlExpanded', originalUrl, expandedUrl);

            if (that.eventCount == that.expectedEventCount) {
                that.emit('expanded', that.originalUrls, that.expandedUrls);
            }
        });
        expander.expand();
    });
}

var exports = module.exports = UrlExpander;
exports.SingleUrlExpander = SingleUrlExpander;
