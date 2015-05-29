(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Board', Board);

    Board.$inject = ['Drawer', 'Block', 'Retangule', 'Element'];

    function Board(Drawer, Block, Retangule, Element) {
        var vm = this;
        var svg = Drawer.svg;
        var x = Drawer.size;
        var pInit = Drawer.pInit;
        var border = Drawer.border;

        var Board = {
            create: create,
            createBlocks: createBlocks,
            getElement: getElement,
            totalSize: totalSize,
            getBoardLayout: getBoardLayout
        }
        return Board;
        //////////////////

        /**
         Create the object Board which contains the blocks informations
         * @param  {String} layout Name of the Board s layout
         * @return {Object}       Object Board
         */
        function create(layout) {
            var boardInfo = getBoardLayout(layout);
            var board = {};
            board.lines = [];
            for (var i = 0; i < boardInfo.lines.length; i++) {
                board.lines[i] = [];
                for (var j = 0; j < boardInfo.lines.length; j++) {
                    var id = 'e' + i + '' + j
                    switch (boardInfo.lines[i][j].shape) {
                        case'retangule':
                            board.lines[i].push(
                                Retangule.createRetangule(id,
                                    boardInfo.lines[i][j].pInit,
                                        boardInfo.lines[i][j].a,
                                            boardInfo.lines[i][j].b));
                            break;
                        case 'block':
                            board.lines[i].push(
                                Block.createBlock(id,
                                    boardInfo.lines[i][j].pInit, '', boardInfo.orientation));
                            break;
                        case 'triangule':
                            board.lines[i].push(
                                Element.createElement(id,
                                    boardInfo.lines[i][j].pInit, points, '', true));

                    }
                }
            }
            return board;
        };

        /**
         * Get the board layout s info from the server
         * @param  {Object} layout Informations about the board layout
         * @return {[type]}        Board layout s info
         */
        function getBoardLayout(layout) {
            //TODO
            return evaluateExpression({
                orientation: true, //or losango
                lines: [
                    [
                        {shape: 'retangule', pInit: ['Px', 'Py'], a: 'b', b: 'b'},
                            {shape: 'retangule', pInit: ['Px + b', 'Py'], a: 'x', b: 'b'},
                                {shape: 'retangule', pInit: ['Px + b + x', 'Py'], a: 'x', b: 'b'},
                                    {shape: 'retangule', pInit: ['Px + b + (2 * x)', 'Py'],
                                         a: 'x', b: 'b'},
                                        {shape: 'retangule', pInit: ['Px + b + (3 * x)', 'Py'],
                                             a: 'b', b: 'b'}
                    ],
                    [
                        {shape: 'retangule', pInit: ['Px', 'Py + b'], a: 'b', b: 'x'},
                            {shape: 'block', pInit: ['Px + b', 'Py + b']},
                                {shape: 'block', pInit: ['Px + b + x', 'Py + b']},
                                    {shape: 'block', pInit: ['Px + b + (2 * x)', 'Py + b']},
                                        {shape: 'retangule', pInit: ['Px + b + (3 * x)', 'Py + b'],
                                            a: 'b', b: 'x'}
                    ],
                    [
                        {shape: 'retangule', pInit: ['Px', 'Py + b + x'], a: 'b', b: 'x'},
                            {shape: 'block', pInit: ['Px + b', 'Py + b + x']},
                                {shape: 'block', pInit: ['Px + b + x', 'Py + b + x']},
                                    {shape: 'block', pInit: ['Px + b + (2 * x)', 'Py + b + x']},
                                            {shape: 'retangule',
                                                pInit: ['Px + b + (3 * x)', 'Py + b + x'],
                                                     a: 'b', b: 'x'}
                    ],
                    [
                        {shape: 'retangule', pInit: ['Px', 'Py + b + (2 * x)'], a: 'b', b: 'x'},
                            {shape: 'block', pInit: ['Px + b', 'Py + b + (2 * x)']},
                                {shape: 'block', pInit: ['Px + b + x', 'Py + b + (2 * x)']},
                                    {shape: 'block', pInit: ['Px + b + (2 * x)', 'Py + b + (2 * x)']},
                                            {shape: 'retangule',
                                                pInit: ['Px + b + (3 * x)', 'Py + b + (2 * x)'],
                                                     a: 'b', b: 'x'}
                    ],
                    [
                        {shape: 'retangule', pInit: ['Px', 'Py + b + (3 * x)'],
                             a: 'b', b: 'b'},
                            {shape: 'retangule', pInit: ['Px + b', 'Py + b + (3 * x)'],
                                 a: 'x', b: 'b'},
                                {shape: 'retangule', pInit: ['Px + b + x', 'Py + b + (3 * x)'],
                                     a: 'x', b: 'b'},
                                    {shape: 'retangule',
                                        pInit: ['Px + b + (2 * x)', 'Py + b + (3 * x)'],
                                             a: 'x', b: 'b'},
                                        {shape: 'retangule',
                                            pInit: ['Px + b + (3 * x)', 'Py + b + (3 * x)'],
                                                a: 'b', b: 'b'}
                    ]]
            }, pInit , border, x);
        }

        /**
         * Transform the layout s info into numbers acording to the given parameter(pInit, x, border)
         * @param  {Object} layout Layout
         * @return {Object}        Layout s info
         */
        function evaluateExpression (layout) {
            var obj = layout;
            for (var i = 0; i < obj.lines.length; i++) {
                for (var j = 0; j < obj.lines.length; j++) {
                    switch (obj.lines[i][j].shape) {
                        case 'retangule':
                            obj.lines[i][j] = evaluateRtgl(obj.lines[i][j], pInit, border, x);
                            break;
                        case 'block':
                            obj.lines[i][j] = evaluateBlock(obj.lines[i][j], pInit, border, x);
                            break;
                        case 'triangule':
                            obj.lines[i][j] = evaluateTrgl(obj.lines[i][j], pInit, border, x);
                            break;
                    }
                }
            }
            return obj;
        }

        //////////////////////Evaluated functions acording to the objects

        function evaluateRtgl(retangule) {
            return {
                shape: 'retangule',
                pInit: [exprValue(retangule.pInit[0], pInit, border, x),
                             exprValue(retangule.pInit[1], pInit, border, x)],
                a: exprValue(retangule.a, pInit, border, x),
                b: exprValue(retangule.b, pInit, border, x)
            }
        }

        function evaluateBlock(block) {
            return {
                shape: 'block',
                pInit: [exprValue(block.pInit[0], pInit, border, x),
                             exprValue(block.pInit[1], pInit, border, x)],
            }
        }

        function evaluateTrgl(triangule) {
            var points = '';
            _.each(triangule.points, function (point) {
                points += exprValue(point, border, x);
            });
            return {
                shape: 'triangule',
                pInit: [exprValue(triangule.pInit[0], pInit, border, x),
                             exprValue(triangule.pInit[1], pInit, border, x)],
                points: points_
            }
        }

        ///////////////////////////////////////////////////////////

        /**
         * Return a function, formed acording to the layout s info, to be evaluated
         * @param  {String} expression      Expression
         * @return {Function}               function to be evaluated
         */
        function exprValue (expression) {
            if (expression === '0') {
                return 0;
            }
            var func = new Function ('Px', 'Py', 'x', 'b', 'return ' + expression);
            return func(pInit[0], pInit[1], x, border);
        }

        ///////////////////////////////OPCIONAIS///////////////////////////////////



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
         * Return the element
         * @param  {[type]} id     ID
         * @param  {[type]} board The board who contains the conteiners blocks
         * @return {[type]}       Container Block
         */
        function getElement(id, board) {
            var id = id.replace(/\D+/g, '').split('');
            if (id.length  === 2) {
                return board.lines[parseInt(id[0])][parseInt(id[1])];
            } else {
                return board.lines[parseInt(id[0])][parseInt(id[1])][parseInt(id[2])].elements[parseInt(id[3])];
            }
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
