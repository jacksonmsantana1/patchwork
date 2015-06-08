(function () {
    'use strict';

    angular.module('app.directives')
        .directive('element', ElementDrct);

    ElementDrct.$inject = ['Config', 'Drawer'];
    function ElementDrct(Config, Drawer) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                element: '=',
                coordenates: '@'
            },
            link: function postLink ($scope, elem, attrs, ctrl) {
                init($scope, Drawer.svg, elem);
            }
        };
        /////////////////////////////

        function init($scope, board, elem){
            $scope.element.imgX = $scope.element.imgY = 0;
            var coordenates = $scope.element.coordenates ?
                                $scope.element.coordenates.split(' ') : $scope.coordenates.split(' ');

            var pattern = board
                .image($scope.element.img, $scope.element.imgX, $scope.element.imgY, Config.imgSize, Config.imgSize)
                    .pattern($scope.element.imgX, $scope.element.imgY, Config.imgSize, Config.imgSize);
            var polygon = board.polygon(coordenates).attr('fill', pattern);

            $scope.element =  {
                model: $scope.element,
                html: elem[0],
                svg: {
                    polygon: polygon,
                    pattern: pattern

                }
            };

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

        function unbindWatcher($scope) {
            return $scope.$watch(
                'element',
                function( newClickCount ) {});
        }

    }
})();
