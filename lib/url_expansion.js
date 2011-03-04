/**
 * UrlExpansion - Expands an URL step-by-step, controlled by another module (SingleUrlExpander).
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var util = require('util'),
    http = require('http'),
    events = require('events'),
    requestOptions = require('./request_options'),
    responseHandler = require('./response_handler');

function UrlExpansion(startUrl) {
    this.http = http;
    this.requestCount = 0;
    this.currentUrl = '';
    this.nextUrl = startUrl;
    events.EventEmitter.call(this);
}

util.inherits(UrlExpansion, events.EventEmitter);

UrlExpansion.prototype.getCurrentUrl = function () {
    return this.currentUrl;
}

UrlExpansion.prototype.getRequestCount = function () {
    return this.requestCount;
}

UrlExpansion.prototype.hasNext = function () {
    return (this.nextUrl !== '');
}

UrlExpansion.prototype.next = function () {
    var that = this;

    this.http.get(requestOptions.create(this.nextUrl), function (response) {
        that.requestCount++;
        that.currentUrl = that.nextUrl;
        that.nextUrl = responseHandler.getRedirectUrl(that.currentUrl, response);

        that.emit('expanded');
    }).on('error', function (e) {
        that.emit('error', e);
    });
}

// API sugar ;-)
UrlExpansion.prototype.start = UrlExpansion.prototype.next;

module.exports = UrlExpansion;
