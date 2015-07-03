(function () {
    'use strict';

    angular.module('app.directives')
        .directive('rect', RetanguleDrct);

    RetanguleDrct.$inject = ['Retangule', 'Scopes'];
    function RetanguleDrct(Retangule, Scopes) {
        return {
            restrict: 'E',
            replace: false,
            controller: 'RetanguleCtrl',
            scope: {
                element: '='
            },
            link: function postLink ($scope, elem, attrs, ctrl) {
                init();
                onClick();
                onDestroy();

                //Methods
                function init(){
					Scopes.store($scope.element.id, $scope);
					$scope.setPattern();
					$scope.setPolygon($scope.element.pInit[0], $scope.element.pInit[1], $scope.element.width, $scope.element.height);

                    $scope.html = elem;
                }

                function onClick() {
                    $scope.svg.retangule.click(function () {
                        //TODO
                    });
                }

                function onDestroy() {
                    $scope.$on('destroy', function () {
                        console.log('Retangule id:' + $scope.element.id + ' destroyed');
                        $scope.removeElement($scope.svg, $scope.html);
                    });
                }
            }
        };
    }
})();
