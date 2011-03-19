0.0.7
=====

  * Bugfix: Fix issue with recognizing relative URLs in the location header

0.0.6
=====

  * Bugfix: Fix issue with encoding an already encoded URL

0.0.5
=====

  * Bugfix: Encode entire path, not only the querystring

0.0.4
=====

  * Requiring node.js v0.4.2
  * Bugfix: Fix encoding issue introduced in v0.0.3
  * Bugfix: Support for urls containing a port

0.0.3
=====

  * Bugfix: Encode request querystring and the expanded url

0.0.2
=====

  * Added integration-test.js
  * Bugfix: Set user agent when expanding to avoid getting the "unsupported browser" page on Facebook
  * Bugfix: Return the original URL if a problem happens during the URL expansion

0.0.1
=====

  * Initial release
