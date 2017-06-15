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
        $get: function () {
            return {
                setSelectedCluster: function (clusterName) {
                    if (angular.isUndefined(clusterName)) {
                        selectedCluster = clusterArray[0];
                    } else {
                        var filteredArray = clusterArray.filter(function (el) { return el.NAME === clusterName });
                        selectedCluster = filteredArray.length === 1 ? filteredArray[0] : clusterArray[0]
                    }
                },
                getSelectedCluster: function () { return selectedCluster; },
                getClusters: function () { return clusterArray },
                hasClusters: function () {
                    return (clusterArray && clusterArray.length);
                },

                SCHEMA_REGISTRY: function () { return selectedCluster.SCHEMA_REGISTRY; },
                AVRO4S: 'https://platform.landoop.com/avro4s/avro4s', // Not currently used, will be used for converting Avro -> Scala Case classes
                COLOR: function () { return selectedCluster.COLOR; },
                allowGlobalConfigChanges: function () { return selectedCluster.allowGlobalConfigChanges; },
                allowTransitiveCompatibilities: function () { return selectedCluster.allowTransitiveCompatibilities; }
            };

        }
    }
};

//EnvFactory.$inject = [];

module.exports = EnvProvider;