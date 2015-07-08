(function() {
    'use strict';

    angular.module('app.directives')
        .directive('drChooseBoard', drChooseBoard);

    drChooseBoard.$inject = ['Scopes', 'Patchwork'];

    function drChooseBoard(Scopes, Patchwork) {
        return {
            templateUrl: 'src/client/app/directives/choose-board/dr-choose-board.html',
            restrict: 'E',
            controller: 'ChooseBoardCtrl',
            scope: true,
            link: function($scope, elem, attrs) {
                Scopes.store('ChooseBoard', $scope);
                var type = Patchwork.get().type;
                $scope.init(type);
                var unbinder = $scope.$on('$destroy', function () {
                    Scopes.remove('ChooseBoard');
					unbinder();
					unbinder = null;
                });
            }
        };
    }

})();
