(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Element', Element);

    Element.$inject = ['Drawer'];

    function Element(Drawer) {
        var vm = this;
        var svg = Drawer.svg;
        var x = Drawer.size;

        var Element = {
            createElement: createElement,
            drawShape: drawShape,
            changeImage: changeImage,
            cleanElement: cleanElement
        }

        return Element;
        //////////////////////////

        /**
         * Create the geometry element which composes the block
         * @param  {String} id               DOM Iddentification of the element
         * @param  {Array} pInit             Coordenates of the initial points to draw
         * @param  {String} coordenateString Concatenated string with the coordenates of the element
         * @param  {String} img              Path to the image which composes the element
         * @return {Object}                  Return an object with the  img path, snap element(group)
         */
        function createElement(id, pInit, coordenateString, img) {
            var polygon, image, element;

            if (coordenateString) {
                polygon = drawShape(id, pInit, coordenateString);
                if (img) {
                    image = svg.image(img, pInit[0], pInit[1], x, x)
                        .pattern(pInit[0], pInit[1], x, x);
                    polygon.attr({
                        fill: image
                    });
                }
            }

            element = {
                'id': id,
                'img': image,
                'polygon': polygon,
                'coordenates': coordenateString,
                'pInit': pInit
            };

            return element;
        }

        /**
         * Take away the image as background from the element
         * @param  {Element} element Element clicked
         * @return         none
         */
        function cleanElement(element) {
            if (element.img) {
                element.img.remove();
                element.polygon.attr({
                    fill:'#FFF'
                });
            }
        }

        /**
         * Draws the element on the DOM
         * @param  {Number} id               ID
         * @param  {Array} pInit             Coordenates of the initial points to draw
         * @param  {String} coordenateString String with the coordenates of the element
         * @return {HTMLElement}             Return the snap element(polygon)
         */
        function drawShape(id, pInit, coordenateString) {
            var coordArray = evaluateCoordenates(pInit, coordenateString);
            var coordenates = '';
            _.each (coordArray, function (coord, index) {
                coordenates += ' ' + coord;
            });
            var polygon =  svg.polygon(coordenates).attr({
                id: id,
                stroke: 'black',
                fill: 'white',
                strokeWidth: 1
            })
            return polygon;
        }

        /**
         * Tranform the array of funtions into an array of coordenates
         * @param  {Array} pInit             Coordenates of the initial points to draw
         * @param  {String} coordenateString String with the coordenates of the element
         * @return {Array}                   Coordenates
         */
        function evaluateCoordenates(pInit, coordenateString) {
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

        /**
         * Change the background image of the element
         * @param  {Element} element    Element
         * @param  {String} img         Image s path
         * @return none
         */
        function changeImage (element, img) {
            element.img.remove();
            var image = svg.image(img, element.pInit[0], element.pInit[1], x, x)
                            .pattern(element.pInit[0], element.pInit[1], x, x);
            element.img = image;
            element.polygon.attr({
                id: element.id,
                fill: image
            });
        }
    };

})();
