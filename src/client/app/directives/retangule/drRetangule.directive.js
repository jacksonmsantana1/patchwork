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
                init();
                onClick();
                onDestroy();

                //Methods
                function init(){
                    $scope.model = new Retangule($scope.element.id, $scope.element.pInit[0],
                                                 $scope.element.pInit[1], $scope.element.img,
                                                 $scope.element.width, $scope.element.height);
                    $scope.html = elem[0];
                }

                function onClick() {
                    $scope.svg.retangule.click(function () {
                        //TODO
                    });
                }

                function onDestroy() {
                    $scope.$on('destroy', function () {
                        console.log('Retangule id:' + $scope.model.id + ' destroyed');
                        $scope.removeElement($scope.svg, $scope.html);
                    });
                }
            }
        };
    }
})();
