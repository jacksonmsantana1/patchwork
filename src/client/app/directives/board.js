(function () {
    'use strict';

    angular.module('app.directives')
        .directive('board', function ($window, Drawer, Board) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    layout: '='
                },
                controller: function ($scope) {
                    $scope.init = init;
                },
                link: function ($scope, element, attrs, controller) {
                    $scope.init($scope, element)
                }
            }

            /////////////////////////////////////////////////////////

            function init($scope, element) {
                $scope.element = Board.create($scope.layout);
            }
        });
})();
