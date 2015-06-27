(function() {
    'use strict';

    angular.module('app.directives')
    .directive('block', BlockDrct);

    BlockDrct.$inject = ['Config', 'Block', '$compile'];

    function BlockDrct(Config, Block, $compile) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                block: '='
            },
            controller: 'BlockCtrl',
            link: function postLink($scope, elem, attrs) {
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
            function(newClickCount) {});
        }

    }
})();
