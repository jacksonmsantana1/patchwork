(function () {
    'use strict';

    angular.module('app.layout')
        .directive('drSequenceBar', function () {
            return {
                templateUrl: 'src/client/app/layout/main/sequenceBar/dr-sequence-bar.html',
                restrict: 'E',
                controller: 'SequenceBarCtrl',
                scope: {
                    number: '='
                },
                link: function postLink ($scope, elem, attrs) {
                    elem.on('click', function (evt) {
                        var number = Number.parseInt(evt.target.attributes[2].nodeValue);
                        $scope.$apply(function () {
                            $scope.number = number;
                        });
                    });
                }
            };
        });

})();
