// error.js
'use strict';

setTimeout(function a() {
  new URL('foo', '$$$asdf/dsf/...');
}, 10);
