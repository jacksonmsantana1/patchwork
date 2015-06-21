(function () {
    'use strict';

    angular.module('app.directives')
        .directive('drChooseType', function () {
        return {
            templateUrl: 'src/client/app/directives/choose-type/dr-choose-type-type.html',
            restrict: 'E',
            controller: 'ChooseTypeCtrl',
            scope: true,
            link: function ($scope, elem, attrs) {
				$scope.init();
            }
        };
    });

})();
