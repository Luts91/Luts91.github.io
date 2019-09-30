/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["./assets/fonts/cousine-regular-webfont.ttf","45251aecab170d09eeb51facc68d7b94"],["./assets/fonts/cousine-regular-webfont.woff","8f2753a6d0880767d70e7578ddef4d19"],["./assets/fonts/roboto-thin-webfont.woff","4b768a761cc65765f865a4eace3a8754"],["./assets/fonts/robotomono-thin-webfont.ttf","a0421704f93fee6f97bd7d4ab1e4655e"],["./assets/fonts/robotomono-thin-webfont.woff","78f7bd146a74033b563be25bce2e205e"],["./assets/img/bg/tileable.jpg","236c4426c7b9626731df4cffcd0ceb09"],["./assets/img/crazygames.png","3c6026d1b9e22aa405412948896bd263"],["./assets/img/font/outline_0.png","26d1c6f03b242bdb14445378b77e718a"],["./assets/img/font/regular_0.png","1f4b06ba51de955e03e60e5ece40b02b"],["./assets/img/icon/icon128.png","d5aa042055b7b46f41e06260f64ae266"],["./assets/img/icon/icon168.png","883e7b65d5073a78402630bc9698b52e"],["./assets/img/icon/icon192.png","569dae5984fee5473b7bc6eea50c4edf"],["./assets/img/icon/icon256.png","5acc1aa46c4f79b748e9c423b0186c15"],["./assets/img/icon/icon32.png","17af51c3d7bd875374c2746e30369c99"],["./assets/img/icon/icon512.png","f6d1f6f2214dfc923034fec19836c9c6"],["./assets/img/icon/icon64.png","ab2ea034aeb7f8a8397d5036eb547e8c"],["./assets/img/icon/icon96.png","5a00c5c1ab8c8cfafb3d9897a2e13c3c"],["./assets/img/ingame.json","9d2c92ecc80752ea56d3537a189960a4"],["./assets/img/ingame.png","c00f1dd842910fb6942398d6f9e401ff"],["./assets/img/lutsgameslogo.svg","0e0a982adfcaa7237b587ce53d299468"],["./assets/img/ui.json","700bce0d1ee1b183106040c6900a805e"],["./assets/img/ui.png","d30c77d774ab899269e25886c1370933"],["./assets/img/whiteSquare.png","0a38338cb3758359b78ab9f36f1696a5"],["./css/baseStyle.css","b6432d50880ac634be8d86c7ea3ff000"],["./css/bootstrap-vue.css","7526214f3f0655a7ff9de4066cc63bba"],["./css/bootstrap.min.css","62907ef14a08ac2199b60610b616d0e5"],["./css/fontawesome.css","9d07991936dd830d6dada02ef46af599"],["./css/mdb.min.css","3d551181a4aca69ad51340ac0a7466cd"],["./css/style.css","e76c6ff31215e86122ad0ceda5604200"],["./css/tooltip.css","e5491e482b83f36bb8bbeac726530e50"],["./data/changelog.json","80bda4da004ca327940c6569cc42533f"],["./data/config.json","a2f4cd8bd41f9b7a226a318b183d0d2a"],["./data/preload.json","103003d07cadc1fee1055b6f0de57a58"],["./data/text.json","9ab2b468e61e2a44400f2b5d2a56b7bb"],["./index.html","85cbf4498337b18f26c83e346ed3f046"],["./js/app.js","dcbf0710817b99add50494492a4ef7a0"],["./manifest.json","d39602c0364cf5434c6f09d03937dac7"],["./webfonts/fa-brands-400.eot","ec0716ae8aa1ba781a1a6bcbce833f6c"],["./webfonts/fa-brands-400.svg","226ea55c3d9b36d4388f444c49b513a5"],["./webfonts/fa-brands-400.ttf","b69de69a4ff8ca0abe96ec0b0c180c5b"],["./webfonts/fa-brands-400.woff","8b7a9afd7b95f62e6ee8a72930bfb9ed"],["./webfonts/fa-regular-400.eot","6493321d567eb0f22bd5112fbcf044a8"],["./webfonts/fa-regular-400.svg","6993975cbae77892abc356874c645730"],["./webfonts/fa-regular-400.ttf","b48c48ea8457846a5695b139c377d3d1"],["./webfonts/fa-regular-400.woff","0b5e3a5451fc62d9023ccafc85bc89db"],["./webfonts/fa-solid-900.eot","f29ad0031ad2c1c14b771ce504e2bfa7"],["./webfonts/fa-solid-900.svg","2a803d1830aa624f83dc0a79cfadb782"],["./webfonts/fa-solid-900.ttf","48f54f63d7711d0912a9a10205538fc4"],["./webfonts/fa-solid-900.woff","bcb927a742a8370b76642fd1a9a749c0"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







