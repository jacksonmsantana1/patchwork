(function () {
    'use strict';

    angular.module('app.directives')
        .directive('polygon', ElementDrct);

    ElementDrct.$inject = ['Config', 'Drawer', 'Element', 'Polygon'];
    function ElementDrct(Config, Drawer, Element, Polygon) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                element: '='
            },
            controller: 'PolygonCtrl',
            link: function postLink ($scope, elem, attrs, ctrl) {
                init($scope, elem);
            }
        };
        /////////////////////////////

        function init($scope, elem){
            $scope.model = new Polygon($scope.element.id,  $scope.element.img, $scope.element.coordenates);
            $scope.html = elem[0];

            onClick($scope.svg, $scope);
        }

        function onClick(element, $scope) {
            element.polygon.click(function () {
                //$scope.removeElement(element);
                //$scope.changeImage('');
                $scope.$emit('message', 'Hello, this is the client!');
            });
        }

        //?
        function unbindWatcher($scope) {
            return $scope.$watch(
                'element',
                function( newClickCount ) {});
        }

    }
})();
