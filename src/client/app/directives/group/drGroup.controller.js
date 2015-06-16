(function () {
    'use strict';

    angular.module('app.directives')
        .controller('GroupCtrl', GroupCtrl);

    GroupCtrl.$inject = ['$scope', 'Drawer', 'Config'];
    function GroupCtrl ($scope, Drawer, Config) {
        var vm = this;

        $scope.model = {
            id: '',
            pInit: [],
            name: '',
            width: 0,
            height: 0
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
