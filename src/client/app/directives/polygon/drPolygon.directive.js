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
                init();
                onClick();
                onDestroy();

                //Methods
                function init(){
                    $scope.model = new Polygon($scope.element.id,  $scope.element.img, $scope.element.coordenates);
                    $scope.html = elem[0];

                    onClick($scope.svg, $scope);
                }

                function onClick() {
                    $scope.svg.polygon.click(function () {
                        //
                    });
                }

                function onDestroy() {
                    $scope.$on('$destroy', function() {
                        console.log('Polygon id:'+ $scope.model.id + 'destroyed');
                        $scope.removeElement($scope.svg, $scope.html);
                    });
                }
            }
        };
    }
})();
