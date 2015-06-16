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

        //methods
        function init() {

        }

    }
})();