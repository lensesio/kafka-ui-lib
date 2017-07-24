var HttpFactory = require('./factories/http-factory');
var SchemaRegistryFactory = require('./factories/schema-registry-factory');
var EnvProvider = require('./factories/env-provider');

const schemaRegistryModule = (function () {

    var angularModule = angular.module('landoop.schemaRegistry', [])
        .factory('HttpFactory', HttpFactory)
        .factory('SchemaRegistryFactory', SchemaRegistryFactory)
        .provider('env', EnvProvider)
        .run(['env',
            function onRun(env) {
                if (!env.hasClusters()) {
                    throw new Error('No clusters defined. Read documentation for additional information.');
                }
            }
        ]);

    return angularModule;
})();

module.exports = schemaRegistryModule;