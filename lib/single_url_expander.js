/**
 * SingleUrlExpander - A module to expand a single url.
 *
 * Requires node.js 0.4.0
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var util = require('util'),
    url = require('url'),
    http = require('http'),
    events = require('events');

function SingleUrlExpander(url) {
    this.MAX_REDIRECTS = 10;
    this.redirectCount = 0;
    this.startUrl = url;
    this.url = url;
    events.EventEmitter.call(this);
}

util.inherits(SingleUrlExpander, events.EventEmitter);

SingleUrlExpander.prototype.expand = function () {
    var that = this;
    var urlObj = url.parse(this.url);
    var queryString = (urlObj.hasOwnProperty('search')) ? urlObj.search : '';
    var pathname = (urlObj.hasOwnProperty('pathname')) ? urlObj.pathname : '';
    var options = { host: urlObj.hostname,
                    port: 80,
                    path: pathname + queryString };

    http.get(options, function (response) {
        that._handleResponse(response);
    });
}

SingleUrlExpander.prototype._handleResponse = function (response) {
    var header = JSON.parse(JSON.stringify(response.headers));
    var location;

    if (header.location) {
        location = header.location;

        if (this._isRelativeUrl(location)) {
            location = this._createAbsoluteUrl(location);
        }

        if (location != this.url && this.redirectCount < this.MAX_REDIRECTS) {
            this._redirectTo(location);
        } else {
            this._emitExpanded(location);
        }
    } else {
        this._emitExpanded(this.url);
    }
}

SingleUrlExpander.prototype._createAbsoluteUrl = function (relativeUrl) {
    var urlObj = url.parse(this.url);
    return urlObj.protocol + '//' + urlObj.hostname + relativeUrl;
}

SingleUrlExpander.prototype._isRelativeUrl = function (url) {
    return (url.indexOf('/') === 0);
}

SingleUrlExpander.prototype._emitExpanded = function (expandedUrl) {
    this.emit('expanded', this.startUrl, expandedUrl);
}

SingleUrlExpander.prototype._redirectTo = function (targetUrl) {
    this.url = targetUrl;
    this.redirectCount++;
    this.expand();
}

module.exports = SingleUrlExpander;
