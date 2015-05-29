(function () {
    'use strict';

    angular.module('app.directives')
        .directive('block', function ($window, Drawer, Block) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    id: '=',
                    pInit: '=',
                    orientation: '='
                },
                link: function ($scope, element, attrs, controller) {
                    init($scope, element)
                }
            }

            /////////////////////////////////////////////////////////

            function init($scope, element) {
                $scope.element = Block.createEmptyBlock($scope.id,
                    $scope.pInit, $scope.orientation);
            }

            function addBlock(type) {
                $scope.element.polygon.remove();
                $scope.element = Block.createBlock($scope.element.id,
                    $scope.element.pInit, type, $scope.element.orientation);
            }
        });
})();

