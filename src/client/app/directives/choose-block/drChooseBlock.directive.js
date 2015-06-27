(function() {
    'use strict';

    angular.module('app.directives')
        .directive('drChooseBlock', drChooseBlock);

    drChooseBlock.$inject = ['Scopes'];

    function drChooseBlock(Scopes) {
        return {
            templateUrl: 'src/client/app/directives/choose-block/dr-choose-block.html',
            restrict: 'E',
            controller: 'ChooseBlockCtrl',
            scope: {
                active: '@'
            },
            link: function($scope, elem, attrs) {
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
