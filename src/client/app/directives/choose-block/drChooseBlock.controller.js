(function () {
    'use strict';

    angular.module('app.directives')
        .controller('ChooseBlockCtrl', ChooseBlockCtrl);

    ChooseBlockCtrl.$inject = ['$scope', 'Scopes', 'Patchwork'];
    function ChooseBlockCtrl($scope, Scopes, Patchwork) {
        var vm = this;

        $scope.active = false;
        //Patchwork

        $scope.init = init;
        $scope.next = next;

        //methods
        function init() {
            $scope.patchwork = Patchwork.get();
            $scope.active = true;
        }

        function next(type) {
           //TODO
        }
    }
})();
