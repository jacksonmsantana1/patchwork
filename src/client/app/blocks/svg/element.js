(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Element', Element);

    Element.$inject = [];

    function Element() {
        var Element = {
            createElement: createElement,
            drawShape: drawShape
        }

        return Element;
        //////////////////////////

        /**
         * Create the geometry element which composes the block
         * @param  {String} id          DOM Iddentification of the element
         * @param  {Array} pInit             Coordenates of the initial point, where start the draw
         * @param  {Number} x                Block's size
         * @param  {String} coordenateString Concatenated string with the coordenates of the element
         * @param  {String} img              Path to the image which composes the element
         * @return {Object}                  Return an object with the  img path, snap element(group)
         */
        function createElement(id, pInit, x, coordenateString, img) {
            var svg = Snap(x, x).attr('id', id);
            var polygon, g, image;

            if (coordenateString) {
                g = drawShape(svg, pInit, x, coordenateString);
                if (img) {
                    image = svg.image(img, pInit[0], pInit[1], x, x);
                    image.attr({mask: g});
                }
            }

            return {
                'img': image,
                'group': g
            };
        }

        /**
         * Draws the element on the DOM
         * @param  {HTMLElement} svg         Svg
         * @param  {Array} pInit             Coordenates of the initial point, where start the draw
         * @param  {Number} x                Block's size
         * @param  {String} coordenateString String with the coordenates of the element
         * @return {HTMLElement}             Return the snap element(polygon)
         */
        function drawShape(svg, pInit, x, coordenateString) {
            var coordArray = evaluateCoordenates(pInit, x, coordenateString);
            var coordenates = '';
            _.each (coordArray, function (coord, index) {
                coordenates += ' ' + coord;
            });
            var polygon =  svg.polygon(coordenates).attr({
                fill: '#F6F6F6',
                stroke: 'black',
                strokeWidth: 1
            });
            return svg.group(polygon);
        }

        /**
         * Tranform the array of funtions into an array of coordenates
         * @param  {Array} pInit             Coordenates of the initial point, where start the draw
         * @param  {Number} x                Block's size
         * @param  {String} coordenateString String with the coordenates of the element
         * @return {Array}                   Coordenates
         */
        function evaluateCoordenates(pInit, x, coordenateString) {
            var coordExp = evaluateExpressions(coordenateString);
            var coordenates = [];
            _.each (coordExp, function (coord, index) {
                coordenates.push(coord.apply(this, [pInit[0], pInit[1], x]));
            });
            return coordenates;
        }

        /**
         * Transform the coordenates string into an Array of functions
         * @param  {String} coordenateString String with the coordenates of the element
         * @return {Array}
         */
        function evaluateExpressions(coordenateString) {
            var arrayCoordExp = coordenateString.split(' ');
            var coordenatesExp = _.map(arrayCoordExp, function (coord) {
                return new Function ('Px', 'Py', 'x', 'return ' + coord);
            });
            return coordenatesExp;
        }
    };

})();
