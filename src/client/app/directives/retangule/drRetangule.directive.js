(function () {
    'use strict';

    angular.module('app.directives')
        .directive('rect', RetanguleDrct);

    RetanguleDrct.$inject = ['Config', 'Retangule'];
    function RetanguleDrct(Config, Retangule) {
        return {
            restrict: 'E',
            replace: false,
            controller: 'RetanguleCtrl',
            scope: {
                element: '=',
            },
            link: function postLink ($scope, elem, attrs, ctrl) {
                init($scope, elem);
            }
        };
        /////////////////////////////

        function init($scope, elem){
            $scope.model = new Retangule($scope.element.id, $scope.element.pInit[0],
                                           $scope.element.pInit[1], $scope.element.img,
                                           $scope.element.width, $scope.element.height);
            $scope.html = elem[0];
            onClick($scope.svg, $scope.html, $scope);
        }

        function onClick(element, html, $scope) {
            element.retangule.click(function () {
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
