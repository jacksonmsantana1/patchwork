(function () {
    'use strict';

    angular.module('app.directives')
        .directive('path', PathDrct);

    PathDrct.$inject = ['Scopes'];
    function PathDrct(Scopes) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                element: '='
            },
            controller: 'PathCtrl',
            link: function postLink ($scope, elem, attrs, ctrl) {
                init();
                onClick();
                onDestroy();

                //Methods
                function init(){
					Scopes.store($scope.element.id, $scope);
					$scope.setPattern();
					$scope.setPath($scope.element.pInit[0], $scope.element.pInit[1], $scope.element.path);
                    $scope.html = elem;
                }

                function onClick() {
                    $scope.svg.path.click(function () {
                        //
                    });
                }

                function onDestroy() {
                    var unbinder = $scope.$on('destroy', function () {
                        $scope.removeElement($scope.svg, $scope.html);
						Scopes.remove($scope.element.id);
						unbinder();
						unbinder = null;
                    });
                }
            }
        };
    }
})();
