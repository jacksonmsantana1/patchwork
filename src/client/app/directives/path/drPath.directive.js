(function () {
    'use strict';

    angular.module('app.directives')
        .directive('path', PathDrct);

    PathDrct.$inject = ['Config', 'Path'];
    function PathDrct(Config, Path) {
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
                    $scope.element = new Path($scope.element.id, $scope.element.pInit[0],'',
                                              $scope.element.pInit[1], $scope.element.path);
                    $scope.html = elem[0];
                }

                function onClick() {
                    $scope.svg.path.click(function () {
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
