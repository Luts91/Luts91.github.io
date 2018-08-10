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

var precacheConfig = [["/assets/fonts/cousine-regular-webfont.ttf","45251aecab170d09eeb51facc68d7b94"],["/assets/fonts/cousine-regular-webfont.woff","8f2753a6d0880767d70e7578ddef4d19"],["/assets/fonts/roboto-thin-webfont.woff","4b768a761cc65765f865a4eace3a8754"],["/assets/fonts/robotomono-thin-webfont.ttf","a0421704f93fee6f97bd7d4ab1e4655e"],["/assets/fonts/robotomono-thin-webfont.woff","78f7bd146a74033b563be25bce2e205e"],["/assets/img/icon/icon128.png","a27dbafc6d95cd8b835ee065877d6ad9"],["/assets/img/icon/icon168.png","bda975e4d38b0019a5cebcc2a14db722"],["/assets/img/icon/icon192.png","531a8cec70a154d36317ff9d7f2430d9"],["/assets/img/icon/icon256.png","e9a011a94e7eb6fb0a0814f18f3ba83e"],["/assets/img/icon/icon32.png","7bdef111f2f702444448cf864b7994cd"],["/assets/img/icon/icon512.png","2e3e86f444b33676bb912637d6c54773"],["/assets/img/icon/icon64.png","f570d704a2d41f1938640e4dc50365b4"],["/assets/img/icon/icon96.png","f1d197b775ed5bf4dad929a33f4ce9a4"],["/assets/img/ingame.json","a0d7271cd28cd5147863f1637dd29ef5"],["/assets/img/ingame.png","bd8c530bd53957b02beba2290c8e15b3"],["/assets/img/ui.json","700bce0d1ee1b183106040c6900a805e"],["/assets/img/ui.png","c1e74d38e2a7fecb28ab287e5b6827ad"],["/assets/sounds/1.m4a","282447c1c1988496e0dc74f36c95cf62"],["/assets/sounds/1.ogg","84157480519c551ede5d099cd17219ab"],["/assets/sounds/10.m4a","6baab00361a8873dc68961e9dfee74b1"],["/assets/sounds/10.ogg","8adc7782c1d9dcbb5a489621374b7f79"],["/assets/sounds/11.m4a","3caac7c7f4bebf2779393f73da886480"],["/assets/sounds/11.ogg","f649d7d0f42c5df0fa25c9a73bfb9879"],["/assets/sounds/12.m4a","5526680c0dfc1685bd63d288b2248f4c"],["/assets/sounds/12.ogg","6d62508142591a05a7d30c126828e290"],["/assets/sounds/13.m4a","bf4d16bd0273b4a78a93d9737174460f"],["/assets/sounds/13.ogg","ab88c4ee58a5a39ba2f57b38ec982f4f"],["/assets/sounds/2.m4a","bc135f035f568d1891f46a660ba04ae2"],["/assets/sounds/2.ogg","36858b43aaebf193513956bac82d151a"],["/assets/sounds/3.m4a","8055899ea3df7c057718bd9189fd3b21"],["/assets/sounds/3.ogg","baa3d7fbf876d4f034902eed40704bc0"],["/assets/sounds/4.m4a","7ded89b38435a00b79140d994956e9d3"],["/assets/sounds/4.ogg","21de2b151cebf63fc2ea8de95c3b2a85"],["/assets/sounds/5.m4a","0b4af524b06bfbca7b811df81eceddf2"],["/assets/sounds/5.ogg","6591f0a0f3978e647f92f24f720cd78e"],["/assets/sounds/6.m4a","700143e5c7e007b524aeb419e57c4435"],["/assets/sounds/6.ogg","ad9ed914a91b71ed3911cfd16da0ace6"],["/assets/sounds/7.m4a","cdfdecff951d9ff90851f8db50ba2509"],["/assets/sounds/7.ogg","0d3271dea070d3023c3375c711fc7764"],["/assets/sounds/8.m4a","222570395d1ae9ef7282051c78c53f46"],["/assets/sounds/8.ogg","42970a70103abaee2dc40904fe129f6d"],["/assets/sounds/9.m4a","1e284863db29cf77b579026539205680"],["/assets/sounds/9.ogg","4211f725579b28e534e212083ac6fd64"],["/assets/sounds/bird1.m4a","67a770fed6f59a19a5ee3f2b3d310b63"],["/assets/sounds/bird1.ogg","7f86b9233d456eabb036a0e8b7e957b4"],["/assets/sounds/bird2.m4a","0c43288a52e0fadd84b6d8aebbc3bb5c"],["/assets/sounds/bird2.ogg","6d3fd97b8bfae5c99a6e25f4f33d08e2"],["/assets/sounds/button.m4a","c68f7747d5db7bfead2d1d66a4294373"],["/assets/sounds/button.ogg","8abde0bd8c11f8867f5b81a46ed2a98d"],["/assets/sounds/crow1.m4a","2f4525ac923d5d16bdcdf1886a98f4d8"],["/assets/sounds/crow1.ogg","bab698e850b2efdccc3531c2b2f5de1c"],["/assets/sounds/crow2.m4a","26050b77d37f324db2957868c7a8f288"],["/assets/sounds/crow2.ogg","434836270fb8c55244665bc8baf0c01d"],["/assets/sounds/desertwind.m4a","001aeec1b1ae7c23885b21125c7065b2"],["/assets/sounds/desertwind.ogg","58bf6f635706c575cb368fafb2079755"],["/assets/sounds/eagle.m4a","7622b7de910191ac4e42666689792170"],["/assets/sounds/eagle.ogg","4943e0db58cdc80fc37cfba7174a0b39"],["/assets/sounds/fall.m4a","56ca9673312f02afc3a80f69f47395b4"],["/assets/sounds/fall.ogg","753c261f725a58229a72c0c2a1adc942"],["/assets/sounds/get.m4a","fd5e2379ede61f9b9a9a7354d7c91dd7"],["/assets/sounds/get.ogg","13931bc33d4789f56ee56e98405bea96"],["/assets/sounds/insects.m4a","330aed02d159855f74efd1856d41ecba"],["/assets/sounds/insects.ogg","b52bfa1aec95d6cb5daed24cb8fc562b"],["/assets/sounds/insects2.m4a","cecddb0ccad9264d77dc60ca9b0c0a64"],["/assets/sounds/insects2.ogg","57f8bc287b1977bcad698bbf6e30e643"],["/assets/sounds/levelup.m4a","393c3b0123a79ddf04b1133e9221bc33"],["/assets/sounds/levelup.ogg","3a243072a65ae8e9fd11d9a77e2b0587"],["/assets/sounds/monkey1.m4a","0503ab2483d20f793b54d7100d0ae88e"],["/assets/sounds/monkey1.ogg","b56aba9d30add0967374afba1410efeb"],["/assets/sounds/monkey2.m4a","188f08ae7478da53cf8687e9f5fd057c"],["/assets/sounds/monkey2.ogg","d808702198b8adae8613677bed9b2f29"],["/assets/sounds/snake.m4a","f32bbde46742b75faa478df93cf0002e"],["/assets/sounds/snake.ogg","e6155bf393bba0474bac408fef61e817"],["/assets/sounds/step.m4a","55b0a273b54af09459666d624948dfb0"],["/assets/sounds/step.ogg","caf322858081e01f9049bfa22dabe5d6"],["/assets/sounds/success.m4a","a8c482facff4b9f82cac29b6941bc3aa"],["/assets/sounds/success.ogg","d2668aad7331f1c53099e9f177c80c61"],["/assets/sounds/wind.m4a","60d005bfebc4b262dc2f45822eab875b"],["/assets/sounds/wind.ogg","7bb38dedeb46021f18f9bc713bda6322"],["/data/config.json","fd9d192920461bcc995320ff701e7e61"],["/data/preload.json","c5e106f3337dd18010ef5e8fec0eefbd"],["/data/text.json","8ebeb9d8bcbb46895fe72c688a2d5c5b"],["/index.html","8ebf0f1bad7368ce85d791c80c370ec6"],["/js/init.js","75ba7f0c9128997a4fa8edc345281c63"],["/js/lib/HackTimer.js","e12a9256b25f3f69b46af0503a44f42b"],["/js/lib/HackTimerWorker.js","440afe561d9c5c5253bbef826ce4a4ce"],["/js/lib/PlayFabClientApi.js","e765190db94df86dfbffdea645919e97"],["/js/lib/aes.js","11c5114e2a1face42de239b2b17943fb"],["/js/lib/kongregate_api.js","b5a7bae95acaf6ae1ddac119e73b5d8e"],["/js/object/AchievementLabel.js","cd3965257086855e5e9ac6bbb4e814f6"],["/js/object/AchievementUnlockedLabel.js","1eac45885a5efcc4b9b1d497fe3fee5d"],["/js/object/AchievementsHandler.js","18af2ee994b40be8250f9571b9305b66"],["/js/object/Bar.js","dae6cac5802a4a70d938db3336d47d57"],["/js/object/Button.js","527e857bb87a8b7c0446948ef73895d6"],["/js/object/Character.js","5b2ffafc921965c7c1d3a4cdb7a1677e"],["/js/object/FloatingText.js","3d0739e61a5b25187aa7d1c4ec86bc67"],["/js/object/Grasshalms.js","d06be8cc9b67b0f2d4191964ad147751"],["/js/object/HighscoreHandler.js","916b149953917afc13acda5131b61796"],["/js/object/Map.js","0987beb2d283c0e99d3058a1827ba82b"],["/js/object/MapLabel.js","5a17bb39510410eb03b8e32a491b1643"],["/js/object/MapObject.js","30452d073de96b11d445e6b86cda70c8"],["/js/object/Person.js","6659295e9f3e3c6d7870a2b1e9fe7d1b"],["/js/object/Popup.js","23eadb1885b3ee9bd63b380a751cb2e0"],["/js/object/SampleObject.js","255c484f599b3f5a0779a78cfd4fbe95"],["/js/object/Scrollable.js","1e09c3e01f1cfa59193e93c24c59bda8"],["/js/object/SkillsHandler.js","edc07c361206e03a03b856e0878fd70d"],["/js/object/SoundHandler.js","268907525122937f060f0b55a5d4108b"],["/js/object/Tab.js","e199b912b78d51509602a27b3f84afff"],["/js/object/TabManager.js","40f12d77ec1a51522630fb0f7a98d21c"],["/js/object/Text.js","48fde0e80a7388afd391337441c08e2e"],["/js/object/Tile.js","84d3fcb23e45e10bfd58deed0f52d7b7"],["/js/object/TileSelector.js","d1e9c18d427be20fc70b1ade49340e81"],["/js/object/Tooltip.js","e0529e418111d6ff586c18ddd048bd71"],["/js/object/Tree.js","459fe02b8dbbfad1e864403061508aa2"],["/js/object/UpgradeButton.js","3116eb1228997f77ae1efb56a82c702f"],["/js/state/BaseState.js","27b3903c7febb368b938212009a598ab"],["/js/state/Boot.js","8578e2f61d0bd60a0f1a1cc337323f0b"],["/js/state/Credits.js","cc3449aa6c5f5459468791d9ae1498c4"],["/js/state/Game.js","3bf66538949ae37febff83d25a8c5c17"],["/js/state/LevelSelection.js","df650ea876155202233f6f985cea58af"],["/js/state/Menu.js","78c60712d5de274882cc1d5fc0ff28da"],["/js/state/Preloader.js","5b8e1465d965d6c323ff0336a7eac815"],["/js/state/Settings.js","a03d823f48011a7ec2774c51ca1a33b6"],["/js/tabs/AchievementsWindow.js","7ac36bc3cebb91fd4460af34260fae01"],["/js/tabs/BotsTab.js","a3b2e688b34f9ed0ca1483c223516368"],["/js/tabs/CharacterWindow.js","9eef17b37c22645c98d6496a92b83e09"],["/js/tabs/CreditsWindow.js","6f41200f6d9de257bdb1b77e48500763"],["/js/tabs/InfoWindow.js","6a511ed694a316ea2f649dd505638190"],["/js/tabs/MapsWindow.js","144559d172b1d4d0d088ca97d63ec3a5"],["/js/tabs/SettingsWindow.js","788d40737d2bf45515ecf49d816d84d9"],["/js/tabs/ShopWindow.js","617908b2df9e8a43f420e80a66232f0e"],["/js/tabs/SkillTab.js","b4273b76fbe0d9d947629c9be57ddd50"],["/js/tabs/TerraformTab.js","3c616e12f206d4e357eeca042caec3cc"],["/js/tabs/UpgradeTab.js","0a1d6ebe13c5453dca6132a6177eb67c"],["/js/tabs/Window.js","5ef26910fb6659ec6faaea819618c21f"],["/js/util/Achievements.js","9cee4e966dd96ec832f8ccd6ac1f48a9"],["/js/util/Analytics.js","cb1813c5f657c8f012f07c0c67a5e445"],["/js/util/Camera.js","9f22a0b7ef1d6ec96e031198385092dc"],["/js/util/Connect.js","dfa078408745f4df5e1b69ce67fc565c"],["/js/util/Format.js","1731033b52b68353b968745094595f64"],["/js/util/GameData.js","212ee45eb43dacf1041a1351798278f0"],["/js/util/Highscore.js","d01e084f4387de776b9f10d1888a2b48"],["/js/util/Levelable.js","2ef55cfe36cdd8a5e4dc14a0ff5d1126"],["/js/util/Lock.js","d498b58e739173506556905094942e11"],["/js/util/Pathfinding.js","b343c1045f6e613d07072ed01ec44991"],["/js/util/Save.js","7775c087881e5ec2aaa1732f816ff562"],["/js/util/Setting.js","8207a9ab227f2e5a294939f1d862a886"],["/js/util/Shop.js","d76119182dea8c4ccdf00a41ee377c75"],["/js/util/Skills.js","c3a800f57295044a967f9f7efa98ff52"],["/js/util/Sound.js","4f81d07c0a3d9e29bb7e5a68004fc69d"],["/js/util/Store.js","8dacbe86eb8ed65e004926b3e3e6ca96"],["/js/util/Time.js","430421443e2a573e19a91b582f731913"],["/js/util/Upgrades.js","65084fd62d113d1384cd50d34651c047"],["/js/util/Util.js","3185ea8e6b36830aed797a91d0f51186"],["/js/util/Value.js","a6a3408509f9ac57d411425cd5cb7f87"],["/manifest.json","dd03c54d68d436f9e182ce8d25f84faf"]];
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







