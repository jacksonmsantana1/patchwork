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
                init($scope, elem);
            }
        };
        /////////////////////////////

        function init($scope, elem){
            $scope.element = new Path($scope.element.id, $scope.element.pInit[0],'',
                                      $scope.element.pInit[1], $scope.element.path);
            $scope.html = elem[0];

            onClick($scope.svg, $scope.html, $scope);
        }

        function onClick(element, html, $scope) {
            element.path.click(function () {
                $scope.removeElement(element, html);
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
