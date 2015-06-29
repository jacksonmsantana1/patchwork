(function() {
    'use strict';

    angular.module('app.directives')
        .directive('drChooseType', drChooseType);

    drChooseType.$inject = ['Scopes'];

    function drChooseType(Scopes) {
        return {
            templateUrl: 'src/client/app/directives/choose-type/dr-choose-type.html',
            restrict: 'E',
            controller: 'ChooseTypeCtrl',
            scope: true,
            link: function($scope, elem, attrs) {
                Scopes.store('ChooseType', $scope);
                $scope.init();
                $scope.$on('$destroy', function () {
                    Scopes.remove('ChooseType');
                });
            }
        };
    }

})();
