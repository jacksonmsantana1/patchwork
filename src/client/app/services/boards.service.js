(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('Boards', Boards);

    Boards.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'API_URL'];
    /* @ngInject */
    function Boards($http, $location, $q, exception, logger, API_URL) {
        var readyPromise;

        var service = {
            getBoards: getBoards,
            saveBoard: saveBoard,
            ready: ready
        };

        return service;

        function getBoards(type) {
            return $http.get(API_URL +'/api/board/' + type)
                .then(getBoardsComplete)
                .catch(function(message) {
                exception.catcher('XHR Failed for getTypes')(message);
                $location.url('/');
            });

            function getBoardsComplete(data, status, headers, config) {
                return data;
            }
        }

        function saveBoard(name, type) {
            return $http.post(API_URL + '/api/board/'+ type + '/' + name)
                .then(saveBoardComplete)
                .catch(function(message) {
                exception.catcher('XHR Failed for getTypes')(message);
                $location.url('/');
            });

            function saveBoardComplete(data, status, headers, config) {
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
