function HttpMock(response) {
    this.response = response;
}

HttpMock.prototype.get = function (options, callback) {
    if (this.response) {
        callback(this.response());
        return { on: function () {} };
    }

    return { on: function (type, errorCallback) { errorCallback() } };
}

module.exports = HttpMock;
