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

var precacheConfig = [["idle-chopper/assets/fonts/cousine-regular-webfont.ttf","45251aecab170d09eeb51facc68d7b94"],["idle-chopper/assets/fonts/cousine-regular-webfont.woff","8f2753a6d0880767d70e7578ddef4d19"],["idle-chopper/assets/fonts/roboto-thin-webfont.woff","4b768a761cc65765f865a4eace3a8754"],["idle-chopper/assets/fonts/robotomono-thin-webfont.ttf","a0421704f93fee6f97bd7d4ab1e4655e"],["idle-chopper/assets/fonts/robotomono-thin-webfont.woff","78f7bd146a74033b563be25bce2e205e"],["idle-chopper/assets/img/icon/icon128.png","02248dce022d229e5feb8cea4b3dcc4d"],["idle-chopper/assets/img/icon/icon168.png","db5819269dc489bc873f3fddafe616c6"],["idle-chopper/assets/img/icon/icon192.png","b06d201872eeb271c0aef7e1494d031e"],["idle-chopper/assets/img/icon/icon256.png","cd293b5118b1c2bff27efb2c3919984e"],["idle-chopper/assets/img/icon/icon32.png","1db47ff5d4442a345fc278ddd4e8d4f5"],["idle-chopper/assets/img/icon/icon512.png","d2a45bb220683849be94b719b4e8763d"],["idle-chopper/assets/img/icon/icon64.png","5f43042c076b794fe1bf4b180bcb8543"],["idle-chopper/assets/img/icon/icon96.png","03b76f62c9840b8d4e740a5494daf260"],["idle-chopper/assets/img/ingame.json","a0d7271cd28cd5147863f1637dd29ef5"],["idle-chopper/assets/img/ingame.png","4c3c027d69cc4fdc929bfc3c48e1f841"],["idle-chopper/assets/img/ui.json","700bce0d1ee1b183106040c6900a805e"],["idle-chopper/assets/img/ui.png","d30c77d774ab899269e25886c1370933"],["idle-chopper/assets/sounds/1.m4a","282447c1c1988496e0dc74f36c95cf62"],["idle-chopper/assets/sounds/1.ogg","84157480519c551ede5d099cd17219ab"],["idle-chopper/assets/sounds/10.m4a","6baab00361a8873dc68961e9dfee74b1"],["idle-chopper/assets/sounds/10.ogg","8adc7782c1d9dcbb5a489621374b7f79"],["idle-chopper/assets/sounds/11.m4a","3caac7c7f4bebf2779393f73da886480"],["idle-chopper/assets/sounds/11.ogg","f649d7d0f42c5df0fa25c9a73bfb9879"],["idle-chopper/assets/sounds/12.m4a","5526680c0dfc1685bd63d288b2248f4c"],["idle-chopper/assets/sounds/12.ogg","6d62508142591a05a7d30c126828e290"],["idle-chopper/assets/sounds/13.m4a","bf4d16bd0273b4a78a93d9737174460f"],["idle-chopper/assets/sounds/13.ogg","ab88c4ee58a5a39ba2f57b38ec982f4f"],["idle-chopper/assets/sounds/2.m4a","bc135f035f568d1891f46a660ba04ae2"],["idle-chopper/assets/sounds/2.ogg","36858b43aaebf193513956bac82d151a"],["idle-chopper/assets/sounds/3.m4a","8055899ea3df7c057718bd9189fd3b21"],["idle-chopper/assets/sounds/3.ogg","baa3d7fbf876d4f034902eed40704bc0"],["idle-chopper/assets/sounds/4.m4a","7ded89b38435a00b79140d994956e9d3"],["idle-chopper/assets/sounds/4.ogg","21de2b151cebf63fc2ea8de95c3b2a85"],["idle-chopper/assets/sounds/5.m4a","0b4af524b06bfbca7b811df81eceddf2"],["idle-chopper/assets/sounds/5.ogg","6591f0a0f3978e647f92f24f720cd78e"],["idle-chopper/assets/sounds/6.m4a","700143e5c7e007b524aeb419e57c4435"],["idle-chopper/assets/sounds/6.ogg","ad9ed914a91b71ed3911cfd16da0ace6"],["idle-chopper/assets/sounds/7.m4a","cdfdecff951d9ff90851f8db50ba2509"],["idle-chopper/assets/sounds/7.ogg","0d3271dea070d3023c3375c711fc7764"],["idle-chopper/assets/sounds/8.m4a","222570395d1ae9ef7282051c78c53f46"],["idle-chopper/assets/sounds/8.ogg","42970a70103abaee2dc40904fe129f6d"],["idle-chopper/assets/sounds/9.m4a","1e284863db29cf77b579026539205680"],["idle-chopper/assets/sounds/9.ogg","4211f725579b28e534e212083ac6fd64"],["idle-chopper/assets/sounds/bird1.m4a","67a770fed6f59a19a5ee3f2b3d310b63"],["idle-chopper/assets/sounds/bird1.ogg","7f86b9233d456eabb036a0e8b7e957b4"],["idle-chopper/assets/sounds/bird2.m4a","0c43288a52e0fadd84b6d8aebbc3bb5c"],["idle-chopper/assets/sounds/bird2.ogg","6d3fd97b8bfae5c99a6e25f4f33d08e2"],["idle-chopper/assets/sounds/button.m4a","c68f7747d5db7bfead2d1d66a4294373"],["idle-chopper/assets/sounds/button.ogg","8abde0bd8c11f8867f5b81a46ed2a98d"],["idle-chopper/assets/sounds/crow1.m4a","2f4525ac923d5d16bdcdf1886a98f4d8"],["idle-chopper/assets/sounds/crow1.ogg","bab698e850b2efdccc3531c2b2f5de1c"],["idle-chopper/assets/sounds/crow2.m4a","26050b77d37f324db2957868c7a8f288"],["idle-chopper/assets/sounds/crow2.ogg","434836270fb8c55244665bc8baf0c01d"],["idle-chopper/assets/sounds/desertwind.m4a","001aeec1b1ae7c23885b21125c7065b2"],["idle-chopper/assets/sounds/desertwind.ogg","58bf6f635706c575cb368fafb2079755"],["idle-chopper/assets/sounds/eagle.m4a","7622b7de910191ac4e42666689792170"],["idle-chopper/assets/sounds/eagle.ogg","4943e0db58cdc80fc37cfba7174a0b39"],["idle-chopper/assets/sounds/fall.m4a","56ca9673312f02afc3a80f69f47395b4"],["idle-chopper/assets/sounds/fall.ogg","753c261f725a58229a72c0c2a1adc942"],["idle-chopper/assets/sounds/get.m4a","fd5e2379ede61f9b9a9a7354d7c91dd7"],["idle-chopper/assets/sounds/get.ogg","13931bc33d4789f56ee56e98405bea96"],["idle-chopper/assets/sounds/insects.m4a","330aed02d159855f74efd1856d41ecba"],["idle-chopper/assets/sounds/insects.ogg","b52bfa1aec95d6cb5daed24cb8fc562b"],["idle-chopper/assets/sounds/insects2.m4a","cecddb0ccad9264d77dc60ca9b0c0a64"],["idle-chopper/assets/sounds/insects2.ogg","57f8bc287b1977bcad698bbf6e30e643"],["idle-chopper/assets/sounds/levelup.m4a","393c3b0123a79ddf04b1133e9221bc33"],["idle-chopper/assets/sounds/levelup.ogg","3a243072a65ae8e9fd11d9a77e2b0587"],["idle-chopper/assets/sounds/monkey1.m4a","0503ab2483d20f793b54d7100d0ae88e"],["idle-chopper/assets/sounds/monkey1.ogg","b56aba9d30add0967374afba1410efeb"],["idle-chopper/assets/sounds/monkey2.m4a","188f08ae7478da53cf8687e9f5fd057c"],["idle-chopper/assets/sounds/monkey2.ogg","d808702198b8adae8613677bed9b2f29"],["idle-chopper/assets/sounds/snake.m4a","f32bbde46742b75faa478df93cf0002e"],["idle-chopper/assets/sounds/snake.ogg","e6155bf393bba0474bac408fef61e817"],["idle-chopper/assets/sounds/step.m4a","55b0a273b54af09459666d624948dfb0"],["idle-chopper/assets/sounds/step.ogg","caf322858081e01f9049bfa22dabe5d6"],["idle-chopper/assets/sounds/success.m4a","a8c482facff4b9f82cac29b6941bc3aa"],["idle-chopper/assets/sounds/success.ogg","d2668aad7331f1c53099e9f177c80c61"],["idle-chopper/assets/sounds/wind.m4a","60d005bfebc4b262dc2f45822eab875b"],["idle-chopper/assets/sounds/wind.ogg","7bb38dedeb46021f18f9bc713bda6322"],["idle-chopper/data/config.json","750968aa6df929bdf2d94d1fedd8be84"],["idle-chopper/data/preload.json","c5e106f3337dd18010ef5e8fec0eefbd"],["idle-chopper/data/text.json","8ebeb9d8bcbb46895fe72c688a2d5c5b"],["idle-chopper/index.html","5b0deed838e76af4ada7a00341e76806"],["idle-chopper/js/app.js","2b07d38aaf1e1ddccf0487f76a0d17ca"],["idle-chopper/manifest.json","2f04e123fa8e84ddeacfe08cee88b98e"]];
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







