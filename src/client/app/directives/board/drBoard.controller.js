(function() {
    'use strict';

    angular.module('app.directives')
        .controller('BoardCtrl', BoardCtrl);

    BoardCtrl.$inject = ['$scope', 'Config', 'Drawer', 'BoardComplex', 'BoardNormal', '$compile'];

    function BoardCtrl($scope, Config, Drawer, BoardComplex, BoardNormal, $compile) {
        var vm = this;

        $scope.html = '';
        $scope.lines = [];

        //Getters and setters
        $scope.init = init;
        $scope.removeBoard = removeBoard;

        //methods
        function init(done) {
            var board = $scope.board;
            if (board.complex) {
                $scope.model = new BoardComplex('main', Config.px, Config.py, '', 'x', board.lines);
            } else {
                $scope.model = new BoardNormal('main', Config.px, Config.py, '',
                    board.i, board.j, 'x');
            }

            //Create the Svg Lawer
            Drawer.draw();

            _.each($scope.model.lines, function(line, lindex) {
                $scope.lines[lindex] = [];
                _.each(line, function(element, bindex) {
                    var el;
                    if (element.constructor.name === 'Block') {
                        el = $compile('<block block="model.lines[' + lindex + '][' + bindex + ']"></block>')($scope);
                        $scope.lines[lindex].push(el);
                    } else if (element.constructor.name === 'Retangule') {
                        el = $compile('<rect element="model.lines[' + lindex + '][' + bindex + ']"></rect>')($scope);
                        $scope.lines[lindex].push(el);
                    } else if (element.constructor.name === 'Circle') {
                        el = $compile('<circle element="model.lines[' + lindex + '][' + bindex + ']"></circle>')($scope);
                        $scope.lines[lindex].push(el);
                    } else if (element.constructor.name === 'Path') {
                        el = $compile('<path element="model.lines[' + lindex + '][' + bindex + ']"></path>')($scope);
                        $scope.lines[lindex].push(el);
                    } else if (element.constructor.name === 'Group') {
                        //TODO Still see how it will work
                        el = $compile('<group group="model.lines[' + lindex + '][' + bindex + ']"></group>')($scope);
                        $scope.lines[lindex].push(el);
                    }
                });
                if (lindex === $scope.model.lines.length - 1) {
                    done($scope.lines);
                }
            });

        }

        function removeBoard() {
            $scope.$broadcast('destroy');
        }
    }
})();
