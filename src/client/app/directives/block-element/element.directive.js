(function () {
    'use strict';

    angular.module('app.directives')
        .directive('element', function ($compile, $window, Element) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    id: '=',
                    pInit: '=',
                    x: '=size',
                    coordenates: '=',
                    img: '='
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
                $scope.element = Element.createElement(element[0].id, [20, 20], $scope.x,
                $scope.coordenates, $scope.img);
                var query = 'svg[id=' + $scope.element.id + ']';
                var svg = $window.document.querySelector(query);
                element[0].appendChild(svg);
            }
        });
})();
