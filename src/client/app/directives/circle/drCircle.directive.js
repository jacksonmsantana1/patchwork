(function () {
    'use strict';

    angular.module('app.directives')
        .directive('circle', CircleDrct);

    CircleDrct.$inject = ['Config', 'Circle'];
    function CircleDrct(Config, Circle) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                element: '='
            },
            controller: 'CircleCtrl',
            link: function postLink ($scope, elem, attrs, ctrl) {
                init($scope, elem);
            }
        };
        /////////////////////////////

        function init($scope, elem){
            $scope.element = new Circle($scope.element.id, $scope.element.pInit[0],
                                        $scope.element.pInit[1], $scope.element.img, $scope.element.radio);
            $scope.html = elem[0];

            onClick($scope.svg, $scope.html, $scope);
        }

        function onClick(element, html, $scope) {
            element.circle.click(function () {
                //$scope.changeImage('');
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
