(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("landoopuicore", [], factory);
	else if(typeof exports === 'object')
		exports["landoopuicore"] = factory();
	else
		root["landoopuicore"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HttpFactory = __webpack_require__(3);
var SchemaRegistryFactory = __webpack_require__(4);
var EnvProvider = __webpack_require__(2);

var schemaRegistryModule = function () {

    var angularModule = angular.module('landoop.schemaRegistry', []).factory('HttpFactory', HttpFactory).factory('SchemaRegistryFactory', SchemaRegistryFactory).provider('env', EnvProvider).run(['env', function onRun(env) {
        if (!env.hasClusters()) {
            throw new Error('No clusters defined. Read documentation for additional information.');
        }
    }]);

    return angularModule;
}();

module.exports = schemaRegistryModule;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var schemaRegistryModule = __webpack_require__(0);

var angularModules = {
    schemaRegistryModule: schemaRegistryModule
};

module.exports = angularModules;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function EnvProvider() {
    var selectedCluster = null;
    var clusterArray = [];

    function setClusters(cls) {
        if (cls && cls.length) {
            clusterArray = angular.copy(cls);
            selectedCluster = clusterArray[0];
        }
    }

    //Try to read global property, if it exists.
    if (typeof clusters !== 'undefined') {
        setClusters(clusters);
    }

    return {
        /**
         * To be called in config lifecycle
         */
        setClusters: setClusters,
        $get: function $get() {
            return {
                setSelectedCluster: function setSelectedCluster(clusterName) {
                    if (angular.isUndefined(clusterName)) {
                        selectedCluster = clusterArray[0];
                    } else {
                        var filteredArray = clusterArray.filter(function (el) {
                            return el.NAME === clusterName;
                        });
                        selectedCluster = filteredArray.length === 1 ? filteredArray[0] : clusterArray[0];
                    }
                },
                getSelectedCluster: function getSelectedCluster() {
                    return selectedCluster;
                },
                getClusters: function getClusters() {
                    return clusterArray;
                },
                hasClusters: function hasClusters() {
                    return clusterArray && clusterArray.length;
                },

                SCHEMA_REGISTRY: function SCHEMA_REGISTRY() {
                    return selectedCluster.SCHEMA_REGISTRY;
                },
                AVRO4S: 'https://platform.landoop.com/avro4s/avro4s', // Not currently used, will be used for converting Avro -> Scala Case classes
                COLOR: function COLOR() {
                    return selectedCluster.COLOR;
                },
                allowGlobalConfigChanges: function allowGlobalConfigChanges() {
                    return selectedCluster.allowGlobalConfigChanges;
                },
                allowTransitiveCompatibilities: function allowTransitiveCompatibilities() {
                    return selectedCluster.allowTransitiveCompatibilities;
                }
            };
        }
    };
};

//EnvFactory.$inject = [];

module.exports = EnvProvider;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(5);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HttpFactory($http, $q, $log) {

    return {
        req: function req(method, url, data) {

            var deferred = $q.defer();
            var request = {
                method: method,
                url: url,
                data: data,
                dataType: 'json',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain' }
            };

            $http(request).then(function (response) {
                deferred.resolve(response);
            }, function (responseError) {
                var msg = "Failed at method [" + method + "] [" + url + "] with error: \n" + (0, _stringify2.default)(responseError);
                $log.error(msg);
                deferred.reject(responseError);
            });

            return deferred.promise;
        }

    };
}

HttpFactory.$inject = ['$http', '$q', '$log'];

module.exports = HttpFactory;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Schema-Registry angularJS Factory
 *
 * Landoop - version 0.9.x (May.2017)
 */
function SchemaRegistryFactory($rootScope, $http, $location, $q, $log, HttpFactory, env) {

    var prefix = env.SCHEMA_REGISTRY();
    console.log('Lib SchemaRegistryFactory Factory');

    return {

        subjects: function subjects() {
            return HttpFactory.req('GET', prefix + '/subjects');
        },
        subject: function subject(_subject, version) {
            return HttpFactory.req('GET', prefix + '/subjects/' + _subject + '/versions/' + version);
        },
        subjectVersions: function subjectVersions(subject) {
            return HttpFactory.req('GET', prefix + '/subjects/' + subject + '/versions');
        },
        createSchema: function createSchema(data) {
            return HttpFactory.req('POST', prefix);
        },
        globalConfig: function globalConfig() {
            return HttpFactory.req('GET', prefix + '/config');
        },
        subjectConfig: function subjectConfig(subject) {
            return HttpFactory.req('GET', prefix + '/config/' + subject);
        }
    };
};

SchemaRegistryFactory.$inject = ['$rootScope', '$http', '$location', '$q', '$log', 'HttpFactory', 'env'];

module.exports = SchemaRegistryFactory;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(7)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ })
/******/ ]);
});
//# sourceMappingURL=landoopuicore.js.map