(function () {
    'use strict';

    angular.module('app.layout')
        .directive('drChooseType', function () {
        return {
            templateUrl: 'src/client/app/layout/main/chooseType/dr-choose-type.html',
            restrict: 'E',
            controller: 'ChooseTypeCtrl',
            link: function postLink ($scope, elem, attrs) {

            }
        };
    });

})();
