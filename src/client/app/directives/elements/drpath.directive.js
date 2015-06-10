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
            link: function postLink ($scope, elem, attrs, ctrl) {
                init($scope, elem);
            }
        };
        /////////////////////////////

        function init($scope, elem){
            $scope.element = new Path($scope.element.id, $scope.element.pInit[0],
                                      $scope.element.pInit[1], $scope.element.img, $scope.element.path);
            $scope.element.html = elem[0];

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

        //?
        function unbindWatcher($scope) {
            return $scope.$watch(
                'element',
                function( newClickCount ) {});
        }

    }
})();
