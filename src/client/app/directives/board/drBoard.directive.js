(function() {
    'use strict';

    angular.module('app.directives')
        .directive('board', BoardDrct);

    BoardDrct.$inject = ['Config', '$compile', 'Board'];

    function BoardDrct(Config, Patchwork) {
        return {
            restrict: 'E',
            replace: false,
            controller: 'BoardCtrl',
            scope: {
                board: '='
            },
            link: function postLink($scope, elem, attrs) {
                $scope.$watch('board', function () {
                    $scope.init(function() {
                        angular.forEach($scope.lines, function(line) {
                            angular.forEach(line, function(element) {
                                elem.append(element);
                            });
                        });
                    });
                    initializeDOM();
                });

                //Methods
                function initializeDOM() {
                    var svg = window.document.getElementsByTagName('svg')[0];
                    svg.removeAttribute('height');
                    svg.removeAttribute('width');
                    svg.setAttribute('viewBox', '0 0 1200 800');
                    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                    window.document.getElementById('content').appendChild(svg);
                }
            }

        };
        /////////////////////////////

    }
})();
