function UrlExpansionMock(options) {
    this.resultForHasNext = options.hasOwnProperty('hasNext') ? options.hasNext : false;
    this.currentUrl = options.hasOwnProperty('currentUrl') ? options.currentUrl : '';
    this.requestCount = options.hasOwnProperty('requestCount') ? options.requestCount : 1;
}

UrlExpansionMock.prototype.getCurrentUrl = function () {
    return this.currentUrl;
}

UrlExpansionMock.prototype.getRequestCount = function () {
    return this.requestCount;
}

UrlExpansionMock.prototype.hasNext = function () {
    return this.resultForHasNext;
}

UrlExpansionMock.prototype.next = function () {
    // empty
}

UrlExpansionMock.prototype.on = function (type, callback) {
    callback();

    return { on: function () {} };
}

UrlExpansionMock.prototype.start = function () {
    // empty
}

module.exports = UrlExpansionMock;
