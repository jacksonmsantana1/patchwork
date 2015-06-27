(function () {
    'use strict';

    angular.module('app.directives')
        .directive('drChooseType', drChooseType);

    drChooseType.$inject = [];
    function drChooseType() {
        return {
            templateUrl: 'src/client/app/directives/choose-type/dr-choose-type.html',
            restrict: 'E',
            controller: 'ChooseTypeCtrl',
            scope: {
                active: '@'
            },
            link: function ($scope, elem, attrs) {
                if ($scope.active === 'false') {
                    elem.hide();
                }
                $scope.$watch('active', function() {
                    if ($scope.active === 'true') {
                        elem.show();
                        $scope.init();
                    } else {
                        elem.hide();
                    }
                });
            }
        };
    }

})();
