(function () {
    'use strict';

    angular.module('app.directives')
        .directive('board', function ($window, Drawer, Board) {
            return {
                restrict: 'E',
                replace: true,
                link: function ($scope, element, attrs, controller) {
                    $scope.board = Board.create('bla');
                    var content = $window.document.querySelector('svg');
                    makeResponsible(content);
                    element.append(content);
                }
            }

            ////////////////////////////////////////////////////////

            function makeResponsible(svg) {
                var viewbox = '0 0 ' + svg.getAttribute('width') + ' ' + svg.getAttribute('height');
                svg.removeAttribute('width');
                svg.removeAttribute('height');
                svg.setAttribute('viewBox', viewbox);
            }

            function create(layout, element) {
                var boardInfo = Board.getBoardLayout(layout);
                var board = {};
                board.lines = [];
                for (var i = 0; i < boardInfo.lines.length; i++) {
                    board.lines[i] = [];
                    for (var j = 0; j < boardInfo.lines.length; j++) {
                        var id = 'e' + i + '' + j
                        switch (boardInfo.lines[i][j].shape) {
                            case'retangule':
                                board.lines[i].push({
                                    'id': id,
                                    'pInit': boardInfo.lines[i][j].pInit,
                                    'a': boardInfo.lines[i][j].a,
                                    'b': boardInfo.lines[i][j].b
                                });
                                element
                                    .append('<border id=' + id + ' pInit = ' + boardInfo.lines[i][j].pInit + ' a=' + boardInfo.lines[i][j].a + ' b =' + boardInfo.lines[i][j].b + '></border>');
                                break;
                            case 'block':
                                board.lines[i].push({
                                    'id': id,
                                    'pInit':  boardInfo.lines[i][j].pInit,
                                    'orientation': boardInfo.orientation
                                });
                                element
                                    .append('<block id=' + id + ' pInit=' + boardInfo.lines[i][j].pInit + ' a=' + boardInfo.orientation + '></block>'
                                        );
                                break;
                            case 'triangule':
                                board.lines[i].push({
                                    'id': id,
                                    'pInit': boardInfo.lines[i][j].pInit,
                                    'points': boardInfo.lines[i][j].points,
                                    'img': ''
                                });
                                element.append('<element id=' + id + ' pInit=' + boardInfo.lines[i][j].pInit + ' coordenates=' + boardInfo.lines[i][j].points + ' img=' + boardInfo.lines[i][j].img + '></element>');
                                break;
                        }
                    }
                }
                return board;
            }
        });
})();
