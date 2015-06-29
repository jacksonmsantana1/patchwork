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
                init();
                onClick();
                onDestroy();

                //Methods
                function init(){
                    $scope.element = new Circle($scope.element.id, $scope.element.pInit[0],
                                                $scope.element.pInit[1], $scope.element.img, $scope.element.radio);
                    $scope.html = elem[0];
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
