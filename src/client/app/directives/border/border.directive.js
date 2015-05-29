(function () {
    'use strict';

    angular.module('app.directives')
        .directive('border', function ($window, Drawer, Retangule) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    id: '=',
                    pInit: '=',
                    a: '=',
                    b: '='
                },
                link: function ($scope, element, attrs, controller) {
                    init($scope, element)
                }
            }

            /////////////////////////////////////////////////////////

            function init($scope, element) {
                $scope.element = Retangule.createRetangule($scope.id, $scope.pInit,
                    $scope.a, $scope.b);
            }
        });
})();
