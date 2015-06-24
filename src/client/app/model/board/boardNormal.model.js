(function () {
    'use strict';

    angular.module('app.models')
        .factory('BoardNormal', BoardNormal);

    BoardNormal.$inject = ['Config', 'Evaluator', 'Board', 'Block'];
    function BoardNormal(Config, Evaluator, Board, Block) {
        return function BoardNormal(newId, newPx, newPy, img, i, j, size) {
            //super()
            Config.extend(Board, Element);

            //init()
            Board.call(this, newId, newPx, newPy, img, [], size);
            var that = this;

            //public properties
            this.i = i;
            this.j = j;
            this.lines = getNormalBoard(i, j, size);

            //getters and setters
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
        };
    }

})();
