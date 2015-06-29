(function () {
    'use strict';

    angular.module('app.services')
        .factory('Scopes', Scopes);

    Scopes.$inject = ['$rootScope'];
    function Scopes($rootScope) {
        var mem = {};

        return {
            store: function (key, value) {
                $rootScope.$emit('scope.stored', key);
                mem[key] = value;
            },
            get: function (key) {
                return mem[key];
            },
            remove: function (key) {
                mem[key] = null;
            }
        };
    }
})();
