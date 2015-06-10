(function () {
    'use strict';

    angular.module('app.directives')
        .directive('element', ElementDrct);

    ElementDrct.$inject = ['Config', 'Drawer', 'Element', 'Polygon'];
    function ElementDrct(Config, Drawer, Element, Polygon) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                element: '=',
                coordenates: '@'
            },
            link: function postLink ($scope, elem, attrs, ctrl) {
                init($scope, Drawer.svg, elem);
            }
        };
        /////////////////////////////

        function init($scope, board, elem){
            $scope.element = new Polygon($scope.element.id, $scope.element.pInit[0],
                                         $scope.element.pInit[1], null, $scope.element.coordenates);

            onClick($scope.element);
        }

        function onClick(element) {
            element.svg.polygon.click(function () {
                removeElement(element);
            });
        }

        function removeElement(element){
            var son = element.html;
            var parent = son.parentNode;

            parent.removeChild(son);
            element.svg.polygon.remove();
            element.svg.pattern.remove();
        }

        function unbindWatcher($scope) {
            return $scope.$watch(
                'element',
                function( newClickCount ) {});
        }

    }
})();
