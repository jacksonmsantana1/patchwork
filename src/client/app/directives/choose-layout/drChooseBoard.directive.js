(function () {
    'use strict';

    angular.module('app.directives')
        .directive('drChooseBoard', function (Scopes) {
            return {
                templateUrl: 'src/client/app/directives/choose-layout/dr-choose-board.html',
                restrict: 'E',
                controller: 'ChooseBoardCtrl',
                scope: true,
                link: function ($scope) {
                    var currentScope = $scope;
                    var Main = Scopes.get('Main');
                    $scope.$on('number', function(event, number) {
                        if (number === 2) {
                            currentScope.init(Main.patchwork.type);
                        }
                    });
                }
            };
        });

})();
