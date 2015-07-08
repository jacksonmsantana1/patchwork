(function () {
    'use strict';

    angular.module('app.directives')
        .controller('ChooseBlockCtrl', ChooseBlockCtrl);

    ChooseBlockCtrl.$inject = ['$scope', '$compile', 'Patchwork'];
    function ChooseBlockCtrl($scope, $compile, Patchwork) {
        var vm = this;

        $scope.active = false;

        $scope.init = init;
        $scope.next = next;

        //methods
        function init() {
            $scope.patchwork = Patchwork.get();
            $scope.active = true;
			//Menu for block actions
			$compile('<block-menu-action></block-menu-action>')($scope);
        }

        function next(type) {
           //TODO
        }
    }
})();
