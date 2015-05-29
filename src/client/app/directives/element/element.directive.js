(function () {
    'use strict';

    angular.module('app.directives')
        .directive('element', function ($window, Element) {
            return {
                restrict: 'E',
                replace: false,
                scope: {
                    id: '=',
                    pX: '=',
                    pY: '=',
                    coordenates: '=',
                    img: '='
                },
                link: function ($scope, element, attrs, controller) {
                    init($scope, element)
                }
            }

            /////////////////////////////////////////////////////////

            function init($scope, element) {
                var pInit = [$scope.pX, $scope.pY];
                $scope.element = Element.createElement($scope.id, pInit,
                $scope.coordenates, $scope.img);
            }
        });
})();
