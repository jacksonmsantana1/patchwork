(function () {
    'use strict';

    angular.module('app.directives')
        .controller('BlockCtrl', BlockCtrl);

    BlockCtrl.$inject = ['$scope', 'Drawer', 'Config'];
    function BlockCtrl ($scope, Drawer, Config) {
        var vm = this;
        var pattern, polygon;

        $scope.svg = [/*{id: id, pattern: pattern, polygon: polygon}*/];
        $scope.model = {
            id: '',
            pInit: [],
            name: '',
            size: Config.size
        };
        $scope.html = '';

        init();

        //getters and setters


        //methods
        function init() {

        }

    }
})();
