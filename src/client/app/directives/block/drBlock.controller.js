(function () {
    'use strict';

    angular.module('app.directives')
        .controller('BlockCtrl', BlockCtrl);

    BlockCtrl.$inject = ['$scope', 'Drawer', 'Config'];
    function BlockCtrl ($scope, Drawer, Config) {
        var vm = this;

        $scope.model = {
            id: '',
            pInit: [],
            name: '',
            size: Config.size,
            isEmpty: false,
            elements: []
        };
        $scope.html = '';

        init();

        //Getters and setters
        $scope.init = init;
        $scope.rotateBlock = rotateBlock;
        $scope.removeBlock = removeBlock;

        //methods
        function init() {
            //Initial config
        }

        function rotateBlock (degree) {
            //TODO
        }

        function removeBlock () {
            //TODO
        }

    }
})();
