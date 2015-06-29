(function () {
    'use strict';

    angular.module('app.services')
        .factory('Cache', Cache);

    Cache.$inject = ['$window'];
    function Cache($window) {
        var storage = $window.localStorage;
        return {
            cacheTypes: function (data) {
                storage.setItem('Types', JSON.stringify(data));
            },
            getTypes: function () {
                return JSON.parse(storage.getItem('Types'));
            },
            cacheBoards: function (data) {
                storage.setItem('Boards', JSON.stringify(data));
            },
            getBoards: function () {
                return JSON.parse(storage.getItem('Boards'));
            },
            cacheToken: function (token) {
                storage.setItem('Token', JSON.stringify(token));
            },
            getToken: function () {
                return JSON.parse(storage.getItem('Token'));
            }
        };
    }
})();
