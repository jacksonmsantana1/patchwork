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
            scope: true,
            link: function($scope, elem, attrs) {
                Scopes.store('ChooseBlock', $scope);
                $scope.init();
                $scope.$on('$destroy', function () {
                    Scopes.remove('ChooseBlock');
                });
            }
        };
    }

})();
