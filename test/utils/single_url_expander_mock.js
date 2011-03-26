var onMethodCallCounter = 0;

function SingleUrlExpanderMock(urls, expandedUrls) {
    onMethodCallCounter = 0;
    this.urls = urls;
    this.expandedUrls = expandedUrls;
}

SingleUrlExpanderMock.prototype.on = function (type, callback) {
    callback(this.urls[onMethodCallCounter], this.expandedUrls[onMethodCallCounter]);

    onMethodCallCounter++;

    return { on: function () {} };
}

SingleUrlExpanderMock.prototype.expand = function () {
    // empty
}

module.exports = SingleUrlExpanderMock;
