(function () {
    'use strict';

    angular.module('app.directives')
        .directive('group', GroupDrct);

    GroupDrct.$inject = ['Config', 'Group', '$compile'];
    function GroupDrct(Config, Group, $compile) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                group: '='
            },
            controller: 'GroupCtrl',
            link: function postLink ($scope, elem, attrs) {
                $scope.init();
                _.each($scope.elements, function (element) {
                    elem.append(element);
                });
            }
        };

        //?
        function unbindWatcher($scope) {
            return $scope.$watch(
                'element',
                function( newClickCount ) {});
        }

    }
})();
