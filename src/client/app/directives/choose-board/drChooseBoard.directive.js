(function () {
    'use strict';

    angular.module('app.directives')
        .directive('drChooseBoard', drChooseBoard);

    drChooseBoard.$inject = ['Scopes', 'Patchwork'];
    function drChooseBoard(Scopes, Patchwork) {
        return {
            templateUrl: 'src/client/app/directives/choose-board/dr-choose-board.html',
            restrict: 'E',
            controller: 'ChooseBoardCtrl',
            scope: {
                active: '@'
            },
            link: function ($scope, elem, attrs) {
                if ($scope.active === 'false') {
                    elem.hide();
                }
                $scope.$watch('active', function() {
                    if (($scope.active === 'true')) {
                        var type = Patchwork.get().type;
                        $scope.init(type);
                        elem.show();
                    } else {
                        elem.hide();
                    }
                });
            }
        };
    }

})();
