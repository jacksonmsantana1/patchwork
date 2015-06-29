(function () {
    'use strict';

    angular.module('app.directives')
        .directive('drSequenceBar', drSequenceBar);

    drSequenceBar.$inject = [];
    function drSequenceBar() {
        return {
            templateUrl: 'src/client/app/directives/sequenceBar/dr-sequence-bar.html',
            restrict: 'E',
            controller: 'SequenceBarCtrl',
            link: function postLink ($scope, elem, attrs) {
                $scope.init();
            }
        };
    }

})();
