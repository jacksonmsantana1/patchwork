(function () {
    'use strict';

    angular.module('app.directives')
        .directive('polygon', ElementDrct);

    ElementDrct.$inject = ['Polygon', 'Scopes'];
    function ElementDrct(Polygon, Scopes) {
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
				function init() {
					Scopes.store($scope.element.id, $scope);
					$scope.html = elem;
					$scope.setPattern($scope.element.img);
					$scope.setPolygon($scope.element.coordenates);
				}

                function onClick() {
                    $scope.svg.polygon.click(function () {
                        //
                    });
                }

                function onDestroy() {
                    $scope.$on('$destroy', function() {
                        console.log('Polygon id:'+ $scope.element.id + 'destroyed');
                        $scope.removeElement($scope.svg, $scope.html);
                    });
                }
            }
        };
    }
})();
