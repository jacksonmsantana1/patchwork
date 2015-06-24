(function () {
    'use strict';

    angular.module('app.models')
        .factory('BoardComplex', BoardComplex);

    BoardComplex.$inject = ['Config', 'Evaluator', 'Board', 'BoardDao',
                            'Element', 'Block', 'Polygon', 'Group', 'Retangule'];
    function BoardComplex(Config, Evaluator, Board, BoardDao, Element, Block, Polygon, Group, Retangule) {
        return function BoardComplex(newId, newPx, newPy, img, size, name) {
            //super()
            Config.extend(Board, Element);

            //init()
            Board.call(this, newId, newPx, newPy, img, [], size);
            var that = this;

            //public properties

            this.name = name;
            this.lines = getComplexBoard(name);

            //getters and setters
            this.getComplexBoard = getComplexBoard;

            //methods
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
