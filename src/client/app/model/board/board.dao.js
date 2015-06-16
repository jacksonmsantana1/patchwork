(function () {
    'use strict';

    angular.module('app.models')
        .factory('BoardDao', BoardDao);

    BoardDao.$inject = ['$http'];
    function BoardDao($http) {
        return {
            getBoardByName: function (name) {
                //Provisorio
                return [

                ];
            }
        };
    }

})();
