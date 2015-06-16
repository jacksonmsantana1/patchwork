(function () {
    'use strict';

    angular.module('app.models')
        .factory('Board', Board);

    Board.$inject = ['Config', 'Evaluator', 'BoardDao', 'Element', 'Block', 'Polygon', 'Group', 'Retangule'];
    function Board(Config, Evaluator, BoardDao, Element, Block, Polygon, Group, Retangule) {
        return function Board(newId, newPx, newPy, i, j, size, name) {
            //super()
            Config.extend(Board, Element);

            //init()
            Element.call(this, newId, newPx, newPy);
            var that = this;

            //public properties
            this.i = i;
            this.j = j;
            this.size = Evaluator.evalateCoordenates(
                [0, 0], size, Config.size, 0, 0)[0];
            this.name = name;
            this.lines = name ? getComplexBoard(name)  : getNormalBoard(i, j, size);

            //getters and setters
            this.getComplexBoard = getComplexBoard;
            this.getNormalBoard = getNormalBoard;

            //methods
            function getNormalBoard(i, j, size) {
                var lines = [];
                var boardSize = that.size || Config.size;
                for(var x = 0; x < i; x++) {
                    lines[x] = [];
                    for (var y = 0; y < j; y++) {
                        var id = 'B' + x + y;
                        var pX = that.pInit[0] + (y * boardSize);
                        var pY = that.pInit[1] + (x * boardSize);
                        lines[x][y] = new Block(id, pX, pY, '', boardSize);
                    }
                }
                return lines;
            }

            function getComplexBoard(name) {
                var board = BoardDao.getBoardByName(name);
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
                                lines[bindex][lindex] = Retangule(id,
                                                     Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.pInit[0], boardSize,
                                    0, 0)[0],
                                                     Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.pInit[1], boardSize,
                                    0, 0)[0],
                                                     element.img,
                                                     Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.width, boardSize,
                                    0, 0)[0],
                                                     Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.height, boardSize,
                                    0, 0)[0]);
                                break;
                            case 'Block':
                                lines[bindex][lindex] = Block(id,
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.pInit[0], boardSize,
                                    0, 0)[0],
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.pInit[1], boardSize,
                                    0, 0)[0],
                                                 element.name,
                                                 Evaluator.evalateCoordenates(
                                    [that.pInit[0], that.pInit[1]], element.size, boardSize,
                                    0, 0)[0]);
                                break;
                            case 'Group':
                                lines[bindex][lindex] = Group(id,
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
            }
        };
    }

})();
