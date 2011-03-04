function createOkResponse() {
    return {
        headers: {},
        statusCode: 200
    };
}

exports.createOkResponse = createOkResponse;

function createRedirectionResponse(redirectToUrl) {
    return {
        headers:
            { location: (redirectToUrl === undefined) ? 'http://example.com' : redirectToUrl },
        statusCode: 301
    };
}

exports.createRedirectionResponse = createRedirectionResponse;
