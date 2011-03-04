/**
 * SingleUrlExpander - A module to expand a single url.
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var util = require('util'),
    events = require('events'),
    UrlExpansion = require('./url_expansion');

SingleUrlExpander.MAX_REQUESTS = 10;

function SingleUrlExpander(startUrl) {
    this.startUrl = startUrl;
    this.UrlExpansion = UrlExpansion;
    events.EventEmitter.call(this);
}

util.inherits(SingleUrlExpander, events.EventEmitter);

SingleUrlExpander.prototype.expand = function () {
    var that = this;
    var urlExpansion = new this.UrlExpansion(this.startUrl);

    urlExpansion.on('expanded', function () {
        if (urlExpansion.hasNext() && urlExpansion.getRequestCount() < SingleUrlExpander.MAX_REQUESTS) {
            urlExpansion.next();
        } else {
            that.emit('expanded', that.startUrl, encodeURI(urlExpansion.getCurrentUrl()));
        }
    }).on('error', function (e) {
        that.emit('expanded', that.startUrl, that.startUrl);
    });

    urlExpansion.start();
}

module.exports = SingleUrlExpander;
