(function() {
    'use strict';

    angular.module('app.directives')
        .directive('board', BoardDrct);

    BoardDrct.$inject = ['Config'];

    function BoardDrct(Config) {
        return {
            restrict: 'E',
            replace: false,
            controller: 'BoardCtrl',
            scope: {
                board: '='
            },
            link: function postLink($scope, elem, attrs) {
                init();
                onDestroy();

                //Methods
                function init() {
                    $scope.init(function(lines) {
                        angular.forEach(lines, function(line, lindex) {
                            angular.forEach(line, function(element) {
                                elem.append(element);
                            });
                        });
                    });
                }

                function onDestroy() {
                    $scope.$on('$destroy', function () {
                        $scope.removeBoard();
                    });
                }
            }

        };
    }
})();
