(function () {
    'use strict';

    angular.module('app.layout')
        .directive('drSequenceBar', drSequenceBar);

    drSequenceBar.$inject = [];
    function drSequenceBar() {
        return {
            templateUrl: 'src/client/app/layout/main/sequenceBar/dr-sequence-bar.html',
            restrict: 'E',
            controller: 'SequenceBarCtrl',
            link: function postLink ($scope, elem, attrs) {
                $scope.init();
            }
        };
    }

})();
