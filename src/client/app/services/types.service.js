(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('Types', Types);

    Types.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'API_URL'];
    /* @ngInject */
    function Types($http, $location, $q, exception, logger, API_URL) {
        var readyPromise;

        var service = {
            getType: getType,
            getTypes: getTypes,
            ready: ready
        };

        return service;

        function getType(name) {
            return $http.get(API_URL + '/api/type/' + name)
                .then(getTypeComplete)
                .catch(function(message) {
                exception.catcher('XHR Failed for getType')(message);
                $location.url('/');
            });

            function getTypeComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getTypes() {
            return $http.get(API_URL +'/api/type')
                .then(getTypesComplete)
                .catch(function(message) {
                exception.catcher('XHR Failed for getTypes')(message);
                $location.url('/');
            });

            function getTypesComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function() {
                return promisesArray ? $q.all(promisesArray) : readyPromise;
            })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
