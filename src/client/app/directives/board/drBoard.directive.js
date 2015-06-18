(function () {
    'use strict';

    angular.module('app.directives')
        .directive('board', BoardDrct);

    BoardDrct.$inject = ['Config', '$compile', 'Board'];
    function BoardDrct(Config, $compile, Board) {
        return {
            restrict: 'E',
            replace: false,
            controller: 'BoardCtrl',
            scope: {
                board: '='
            },
            link: function postLink ($scope, elem, attrs) {
                init($scope, elem);
            }
        };
        /////////////////////////////

        function init($scope, elem){
            $scope.model = new Board('main', $scope.board.pInit[0], $scope.board.pInit[1],
                                     $scope.board.i, $scope.board.j, $scope.board.size, $scope.board.name);
            $scope.html = elem[0];

            if (!$scope.board.name) {
                _.each($scope.model.lines, function (line, lindex) {
                    _.each(line, function (block, bindex) {
                        var el = $compile('<block block="model.lines['+lindex+']['+bindex+']"></block>')($scope);
                        elem.append(el);
                    });
                });
            }

            var svg = window.document.getElementsByTagName('svg')[0];
            svg.removeAttribute('height');
            svg.removeAttribute('width');
            svg.setAttribute('viewBox', '0 0 1200 800');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            window.document.getElementById('content').appendChild(svg);

        }
    }
})();
