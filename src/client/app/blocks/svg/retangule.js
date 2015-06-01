(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Retangule', Retangule);

    Retangule.$inject = ['Drawer'];
    function Retangule (Drawer) {
        var vm = this;
        var svg = Drawer.svg;
        var x = Drawer.size;

        return {
            createRetangule: createRetangule
        };
        //////////////////////

        /**
         * Create a retangule object
         * @param  {Number} id      ID
         * @param  {Array}   pInit  Coordenates of the initial points to draw
         * @param  {Number} a       width
         * @param  {Number} b       height
         * @param  {String} img     image s path
         * @return {Retangule}      Retangule Object
         */
        function createRetangule(id, pInit, a, b, img) {
            var image, retangular;
            var polygon = svg.rect(pInit[0], pInit[1], a, b).attr({
                        id: id,
                        fill: '#F6F6F6',
                        stroke: 'black',
                        strokeWidth: 1
                    });

            if (img) {
                image = svg.image(img, pInit[0], pInit[1], a, b)
                        .pattern(pInit[0], pInit[1], a, b);
                polygon.attr({fill: image});
            }

            retangular = {
                'id': id,
                'img': image,
                'polygon': polygon,
                'a': a,
                'b': b,
                'pInit': pInit
            };

            return retangular;
        }

        /**
         * Change the background image of the element
         * @param  {Element} element    Element
         * @param  {String} img         Image s path
         * @return none
         */
        function changeImage (element, img) {
            if (element.img) {
                element.img.remove();
            }
            var image = svg.image(img, element.pInit[0], element.pInit[1], element.a, element.b)
                        .pattern(element.pInit[0], element.pInit[1], element.a, element.b);
            element.img = image;
            element.polygon.attr({
                id: element.id,
                fill: image
            });
        }

        /**
         * Take away the image as background from the border
         * @param  {Retangule} retangule Retangule clicked
         * @return                       none
         */
        function cleanBorder(retangule) {
            if (retangule.img) {
                retangule.img.remove();
                retangule.polygon.attr({
                    fill:'#FFF'
                });
            }
        }
    }

})();
