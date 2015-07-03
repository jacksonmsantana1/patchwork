(function () {
    'use strict';

    angular.module('app.models')
        .factory('BoardComplex', BoardComplex);

    BoardComplex.$inject = ['Config', 'Evaluator', 'Board', 'Block', 'Polygon', 'Group', 'Retangule'];
    function BoardComplex(Config, Evaluator, Board, Block, Polygon, Group, Retangule) {
        return function BoardComplex(newId, newPx, newPy, img, size, coordenates) {
            //super()
            Config.extend(BoardComplex, Board);

            //init()
            Board.call(this, newId, newPx, newPy, img, [], size);
            var that = this;

            //public properties
            this.lines = getComplexBoard(coordenates);

            //getters and setters
            this.getComplexBoard = getComplexBoard;

            //methods
            function getComplexBoard(coordenates) {
                var board = coordenates;
                var lines = [];
                var boardSize = that.size || Config.size;
                _.each(board, function (line, bindex) {
                    lines[bindex] = [];
                    _.each(line, function (element, lindex) {
                        var id = 'B' + bindex + lindex;
                        switch (element.type) {
                            case 'Polygon':
                                lines[bindex][lindex] = new Polygon(id, element.img,
                                                   Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.coord,
                                    boardSize, that.width, that.height));
                                break;
                            case 'Retangule':
                                lines[bindex][lindex] = new Retangule(id,
                                                     Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.px, boardSize,
                                    0, 0)[0],
                                                     Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.py, boardSize,
                                    0, 0)[0],
                                                     '',
                                                     Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.width, boardSize,
                                    0, 0)[0],
                                                     Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.height, boardSize,
                                    0, 0)[0]);
                                break;
                            case 'Block':
                                lines[bindex][lindex] = new Block(id,
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.px, boardSize,
                                    0, 0)[0],
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.py, boardSize,
                                    0, 0)[0],
                                                 element.name,
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], 'x', boardSize,
                                    0, 0)[0]);
                                break;
                            case 'Group':
                                lines[bindex][lindex] = new Group(id,
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.pInit[0], boardSize,
                                    0, 0)[0],
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.pInit[1], boardSize,
                                    0, 0)[0],
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.width, boardSize,
                                    0, 0)[0],
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.height, boardSize,
                                    0, 0)[0], 'blockType');
                                break;
                        }
                    });
                });
                return lines;
            }
        };
    }

})();
