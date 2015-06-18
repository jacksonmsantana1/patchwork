(function () {
    'use strict';

    angular.module('app.layout')
        .controller('SequenceBarCtrl', SequenceBarCtrl);

    SequenceBarCtrl.$inject = ['$scope'];
    function SequenceBarCtrl($scope) {
        var vm = this;

        $scope.click = click;

        //methods
        function click(number) {
            //
        }
    }
})();
