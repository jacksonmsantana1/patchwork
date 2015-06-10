(function () {
    'use strict';

    angular.module('app.directives')
        .directive('element', ElementDrct);

    BlockDrct.$inject = ['Config', 'Block', 'Element', 'Polygon'];
    function BlockDrct(Config, Block, Element, Polygon) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                pInit: '@',
            },
            link: function postLink ($scope, elem, attrs) {
                init($scope, elem);
            }
        };
        /////////////////////////////

        function init($scope, elem){
            $scope.element = new Block($scope.element.id, );
            $scope.element.html = elem[0];

            onClick($scope.element);
        }

        function onClick(element) {
            element.svg.polygon.click(function () {
                //TODO
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
