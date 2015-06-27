(function () {
    'use strict';

    angular.module('app.layout')
        .controller('SequenceBarCtrl', SequenceBarCtrl);

    SequenceBarCtrl.$inject = ['$scope', 'Scopes'];
    function SequenceBarCtrl($scope, Scopes) {
        var vm = this;

        $scope.next = next;
        $scope.init = init;

        //methods
        function init() {
            if (!Scopes.get('SequenceBar')) {
                Scopes.store('SequenceBar', $scope);
            }
        }

        function next(step) {
            $scope.chType = $scope.chBoard = $scope.chBlock = $scope.chImg = false;
            if(step === 'Type') {
                $scope.chType = true;
                $scope.number = 1;
            } else if (step === 'Board') {
                $scope.chBoard = true;
                $scope.number = 2;
                //Scopes.get('ChooseBlock').$destroy();
            } else if (step === 'Block') {
                $scope.chBlock = true;
                $scope.number = 3;
            } else if (step === 'Image') {
                $scope.chImg = true;
                $scope.number = 4;
            }
        }
    }
})();
