(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Board', Board);

    Board.$inject = [];

    function Board() {
        var Board = {
            create: create,
            totalSize: totalSize
        }
        return Board;
    };
    //////////////////

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

    /**
     * Create the object Board which contains the blocks informations
     * @param  {[type]} pInit Coordenates of the initial point, where start the draw
     * @param  {[type]} b     Size of the border
     * @param  {[type]} x     Size of the blocks
     * @param  {[type]} i     Number of the blocks on the y-axis
     * @param  {[type]} j     Number of the blocks on the x-axis
     * @return {[type]}       Object Board
     */
    function create(pInit, b, x, i, j) {
        var Board = Snap(boardWidth(x, i), boardHeight(x, j));
        Board.containerBlocks = [];
        Board.containerBlocks = createBlocks(pInit, b, x, i, j);
        return Board;
    };

    /**
     * Create an Array containing the Board's blocks info  (initial point, type of block)
     * @param  {[type]} pInit Coordenates of the initial point, where start the draw
     * @param  {[type]} b     Size of the border
     * @param  {[type]} x     Size of the blocks
     * @param  {[type]} i     Number of the blocks on the y-axis
     * @param  {[type]} j     Number of the blocks on the x-axis
     * @return {[type]}       Array Containers of Blocks
     */
    function createBlocks(pInit, b, x, i, j) {
        var containerBlocks = [];
        for (var countY = 1; countY <= i; countY++) {
            containerBlocks[countY] = [];
            for (var countX = 1; countX <= j; countX++) {
                var point = [];
                point[0] = pInit[0] + b + ((countX - 1) * x); //pX
                point[1] = pInit[1] + b + ((countY - 1) * x); //pY
                var element = drawContainerBlock(x, point, i, j);
                containerBlocks[countY][countX] = {
                    'point': point,
                    'type': '',
                    'element': element,
                    'block': {}
                };
            }
        }
        return containerBlocks;
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
        var polygon =  svg.polygon(coordenates).attr({fill: 'silver'});
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

})();
