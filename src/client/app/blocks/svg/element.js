(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Element', Element);

    Element.$inject = ['Drawer'];
    /*jshint -W004 */
    function Element(Drawer) {
        var vm = this;
        var svg = Drawer.svg;
        var x = Drawer.size;

        return {
            createElement: createElement,
            drawShape: drawShape,
            changeImage: changeImage,
            cleanElement: cleanElement
        };

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
    }

})();
