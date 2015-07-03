(function () {
    'use strict';

    angular.module('app.directives')
        .directive('circle', CircleDrct);

    CircleDrct.$inject = ['Scopes'];
    function CircleDrct(Scopes) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                element: '='
            },
            controller: 'CircleCtrl',
            link: function postLink ($scope, elem, attrs, ctrl) {
                init();
                onClick();
                onDestroy();

                //Methods
                function init(){
					Scopes.store($scope.element.id, $scope);
					$scope.setPattern();
					$scope.setCircle($scope.element.pInit[0], $scope.element.pInit[1], $scope.element.radio);
                    $scope.html = elem;
                }

                function onClick() {
                    $scope.svg.circle.click(function () {
                        //
                    });
                }

                function onDestroy() {
                    $scope.$on('destroy', function () {
                        $scope.removeElement($scope.svg, $scope.html);
                    });
                }
            }
        };
    }
})();
