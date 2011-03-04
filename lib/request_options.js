/**
 * A helper module to create an options object for http.get().
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var url = require('url');

const USER_AGENT = 'Mozilla/5.0';

function createRequestOptions(requestUrl) {
    var urlObj = url.parse(requestUrl);
    var queryString = (urlObj.hasOwnProperty('search')) ? encodeURIComponent(urlObj.search) : '';
    var pathname = (urlObj.hasOwnProperty('pathname')) ? urlObj.pathname : '';

    return { host: urlObj.hostname,
             port: 80,
             path: pathname + queryString,
             headers: { 'user-agent': USER_AGENT } };
}

exports.create = createRequestOptions;
