/**
 * A helper module to extract the redirection url from a response.
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var url = require('url');

function getRedirectUrl(currentUrl, response) {
    var header = JSON.parse(JSON.stringify(response.headers));
    var redirectUrl = '';

    if (header.location) {
        if (isAbsoluteUrl(header.location)) {
            redirectUrl = header.location;
        } else {
            redirectUrl = createAbsoluteUrl(currentUrl, header.location);
        }
    }

    return redirectUrl;
}

exports.getRedirectUrl = getRedirectUrl;

function createAbsoluteUrl(previousUrl, relativeUrl) {
    var urlObj = url.parse(previousUrl);
    var path = relativeUrl;
    if (path[0] !== '/') { path = '/' + path; }

    return urlObj.protocol + '//' + urlObj.hostname + path;
}

function isAbsoluteUrl(url) {
    return /^https?:\/\//.test(url);
}
