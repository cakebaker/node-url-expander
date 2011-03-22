/**
 * A helper module to create an options object for http.get().
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var url = require('url');

const DEFAULT_PORT = 80;
const USER_AGENT = 'Mozilla/5.0 (Linux x86_64)';

function createRequestOptions(requestUrl) {
    var urlObj = url.parse(requestUrl);
    var queryString = (urlObj.hasOwnProperty('search')) ? urlObj.search : '';
    var requestPort = (urlObj.hasOwnProperty('port')) ? urlObj.port : DEFAULT_PORT;

    return { host: urlObj.hostname,
             port: requestPort,
             path: encodeURI(decodeURIComponent(urlObj.pathname + queryString)),
             headers: { 'User-Agent': USER_AGENT } };
}

exports.create = createRequestOptions;
exports.DEFAULT_PORT = DEFAULT_PORT;
exports.USER_AGENT = USER_AGENT;
