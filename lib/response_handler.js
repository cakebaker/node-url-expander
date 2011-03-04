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
        if (isRelativeUrl(header.location)) {
            redirectUrl = createAbsoluteUrl(currentUrl, header.location);
        } else {
            redirectUrl = header.location;
        }
    }

    return redirectUrl;
}

exports.getRedirectUrl = getRedirectUrl;

function createAbsoluteUrl(previousUrl, relativeUrl) {
    var urlObj = url.parse(previousUrl);
    return urlObj.protocol + '//' + urlObj.hostname + relativeUrl;
}

function isRelativeUrl(url) {
    return (url.indexOf('/') === 0);
}
