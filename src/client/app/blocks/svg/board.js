(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Board', Board);

    Board.$inject = ['Block', 'Retangule', 'Element'];

    function Board(Block, Retangule, Element) {
        var Board = {
            create: create,
            createBlocks: createBlocks,
            totalSize: totalSize
        }
        return Board;
        //////////////////

        /**
         Create the object Board which contains the blocks informations
         * @param  {Array}  pInit Coordenates of the initial point, where start the draw
         * @param  {Number} b     Size of the border
         * @param  {Number} x     Size of the blocks
         * @param  {Number} i     Number of the blocks on the y-axis
         * @param  {Number} j     Number of the blocks on the x-axis
         * @param  {String} layout Name of the Board s layout
         * @return {Object}       Object Board
         */
        function create(pInit, b, x, i, j, layout) {
            var boardInfo = getBoardLayout(layout);
            var board = {};
            board.lines = [];
            for (var i = 1; i < boardInfo.lines.length; i++) {
                board.lines[i] = [];
                for (var j = 1; j < boardInfo.lines.length; j++) {
                    var id = '' + i + '' + j
                    switch (boardInfo.lines[i][j].shape) {
                        case'retangule':
                            board.lines[i].push(id, Retangule.createRetangule(id, boardInfo.lines[i][j].pInit, x, a, b));
                            break;
                        case 'block':
                            board.lines[i].push(Block.createBlock(id, boardInfo.lines[i][j].pInit, x, '', boardInfo.orientation));
                            break;
                        case 'triangule':
                            board.lines[i].push(Element.createElement(id, boardInfo.lines[i][j].pInit, x, points, '', true));

                    }
                }
            }
            return board;
        };

        function getBoardLayout(layout) {
            //TODO
            return {
                orientation: true, //or losango
                lines: [
                    [], //Empty array because its start on 1
                    [
                        {shape: 'retangule', pInit: ['0', '0'], a: 'b', b: 'b'},
                            {shape: 'retangule', pInit: ['b', '0'], a: 'x', b: 'b'},
                                {shape: 'retangule', pInit: ['b + x', '0'], a: 'x', b: 'b'},
                                    {shape: 'retangule', pInit: ['b + (2 * x)', '0'], a: 'x', b: 'b'},
                                        {shape: 'retangule', pInit: ['b + (3 * x)', '0'], a: 'b', b: 'b'}
                    ],
                    [
                        {shape: 'retangule', pInit: ['0', 'b'], a: 'b', b: 'x'},
                            {shape: 'block', pInit: ['b', 'b']},
                                {shape: 'block', pInit: ['b + x', 'b']},
                                    {shape: 'block', pInit: ['b + (2 * x)', 'b']},
                                        {shape: 'retangule', pInit: ['b + (3 * x)', 'b'], a: 'b', b: 'x'}
                    ],
                    [
                        {shape: 'retangule', pInit: ['0', 'b + x'], a: 'b', b: 'x'},
                            {shape: 'block', pInit: ['b', 'b + x']},
                                {shape: 'block', pInit: ['b + x', 'b + x']},
                                    {shape: 'block', pInit: ['b + (2 * x)', 'b + x']},
                                        {shape: 'retangule', pInit: ['0', 'b'], a: 'b', b: 'x'},
                                            {shape: 'retangule', pInit: ['b + (3 * x)', 'b + x'], a: 'b', b: 'x'}
                    ],
                    [
                        {shape: 'retangule', pInit: ['0', 'b + (2 * x)'], a: 'b', b: 'x'},
                            {shape: 'block', pInit: ['b', 'b + (2 * x)']},
                                {shape: 'block', pInit: ['b + x', 'b + (2 * x)']},
                                    {shape: 'block', pInit: ['b + (2 * x)', 'b + (2 * x)']},
                                        {shape: 'retangule', pInit: ['0', 'b'], a: 'b', b: 'x'},
                                            {shape: 'retangule', pInit: ['b + (3 * x)', 'b + (2 * x)'], a: 'b', b: 'x'}
                    ],
                    [
                        {shape: 'retangule', pInit: ['0', 'b + (3 * x)'], a: 'b', b: 'b'},
                            {shape: 'retangule', pInit: ['b', 'b + (3 * x)'], a: 'x', b: 'b'},
                                {shape: 'retangule', pInit: ['b + x', 'b + (3 * x)'], a: 'x', b: 'b'},
                                    {shape: 'retangule', pInit: ['b + (2 * x)', 'b + (3 * x)'], a: 'x', b: 'b'},
                                        {shape: 'retangule', pInit: ['b + (3 * x)', 'b + (3 * x)'], a: 'b', b: 'b'}
                    ]]
            }
        }

        /**
         * Create an Array containing the Board's blocks info  (initial point, type of block)
         * @param  {[type]} id    ID
         * @param  {[type]} pInit Coordenates of the initial point, where start the draw
         * @param  {[type]} b     Size of the border
         * @param  {[type]} x     Size of the blocks
         * @param  {[type]} i     Number of the blocks on the y-axis
         * @param  {[type]} j     Number of the blocks on the x-axis
         * @return {[type]}       Array Containers of Blocks
         */
        function createBlocks(id, pInit, b, x, i, j) {
            var blocks = [];
            for (var countY = 1; countY <= i; countY++) {
                blocks[countY] = [];
                for (var countX = 1; countX <= j; countX++) {
                    var point = [];
                    point[0] = pInit[0] + b + ((countX - 1) * x); //pX
                    point[1] = pInit[1] + b + ((countY - 1) * x); //pY
                    var block = Block.createBlock(id, point, x); //drawBlock(x, point, i, j);
                    blocks[countY][countX] = {
                        'id' : id,
                        'point': point,
                        'type': '',
                        'block': block
                    };
                }
            }
            return blocks;
        };

        /**
         * Return the conteiner block
         * @param  {[type]} i     The x-axis coordenate of the returned conteiner block
         * @param  {[type]} j     The x-axis coordenate of the returned conteiner block
         * @param  {[type]} board The board who contains the conteiners blocks
         * @return {[type]}       Container Block
         */
        function getBlock(i, j, board) {
            //TODO
        }

        /**
         * Draw the block container
         * @param  {[type]} x     Size of the blocks
         * @param  {[type]} point The initial point to start the draw
         * @param  {[type]} i     Number of blocks on the y-axis
         * @param  {[type]} j     Number of blocks on the x-axis
         * @return {[type]}       Svg-Polygon
         */
        function drawContainerBlock(x, point, i, j) {
            var svg = Snap(j * x, i * x);
            var coordenates = createCoordenates(x, point);
            var polygon =  svg.polygon(coordenates).attr({fill: '#F1F1F1'});
            return polygon;
        };

        /**
         * Create the coordenates to draw the container block
         * @param  {[type]} x     Size of the blocks
         * @param  {[type]} point The initial point to start the draw
         * @return {[type]}       [String
         */
        function createCoordenates(x, point) {
            return '' + point[0] +
                    ' ' + point[1] +
                    ' ' + (point[0] + x) +
                    ' ' + point[1] +
                    ' ' + (point[0] + x) +
                    ' ' + (point[1] + x) +
                    ' ' + point[0] +
                    ' ' + (point[1] + x);
        };

        /**
         * Returns the board width
         * @param  {[type]} x Size of the blocks
         * @param  {[type]} j Number of blocks on the x-axis
         * @return {[type]}   Number
         */
        function boardWidth(x, j) {
            if (!_.isNaN(x) && !_.isNaN(j)) {
                return 2 * x;
            }else {
                Log.error('Invalid blocks-width parameter!', moment(), 'Board Creation');
            }
        };

        /**
         * Returns the board height
         * @param  {[type]} x Size of the blocks
         * @param  {[type]} i Number of blocks on the y-axis
         * @return {[type]}   Number
         */
        function boardHeight(x, i) {
            if (!_.isNaN(x) && !_.isNaN(i)) {
                return 2 * x;
            } else {
                Log.error('Invalid blocks-height parameter!', moment(), 'Board Creation');
            }
        };

        /**
         * Return the total size of the drawing
         * @param  {[type]} b     Size of the border
         * @param  {[type]} x     Size of the blocks
         * @param  {[type]} i     Number of the blocks on the y-axis
         * @param  {[type]} j     Number of the blocks on the x-axis
         * @return {[type]}   Array [Number, Number]
         */
        function totalSize(b, x, i, j) {
            var size = [];
            size[0] = (j * x) + (2 * b);
            size[1] = (i * x) + (2 * b);
            return size;
        }
    }
})();
