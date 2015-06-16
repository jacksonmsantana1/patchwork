(function() {
    'use strict';

    angular.module('app.directives')
        .controller('BoardCtrl', BoardCtrl);

    BoardCtrl.$inject = ['Config'];
    function BoardCtrl($scope, Config) {
        var vm = this;

        $scope.model = {
            pInit: [0, 0],
            i: 0,
            j: 0,
            size: 'x',
            name: ''
        };
        $scope.html = '';

        init();

        //Getters and setters
        $scope.init = init;

        //methods
        function init() {
            //initial config
        }

    }
})();
