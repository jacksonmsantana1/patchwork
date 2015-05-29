(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Retangule', Retangule);

    Retangule.$inject = ['Drawer']
    function Retangule (Drawer) {
        var vm = this;
        var svg = Drawer.svg;
        var x = Drawer.size;

        var Retangule = {
            createRetangule: createRetangule
        }
        return Retangule;
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
            var image;
            var polygon = svg.rect(pInit[0], pInit[1], a, b).attr({
                        id: id,
                        fill: '#F6F6F6',
                        stroke: 'black',
                        strokeWidth: 1
                    }).click(function () {
                        this.attr({
                            fill: 'red'
                        })
                    });

            if (img) {
                image = svg.image(img, pInit[0], pInit[1], a, b)
                        .pattern(pInit[0], pInit[1], a, b);
                polygon.attr({fill: image});
            }

            return {
                'id': id,
                'img': image,
                'polygon': polygon,
                'a': a,
                'b': b,
                'pInit': pInit
            };
        }

         /**
         * Change the background image of the element
         * @param  {Element} element    Element
         * @param  {String} img         Image s path
         * @return none
         */
        function changeImage (element, img) {
            element.img.remove();
            var image = svg.image(img, element.pInit[0], element.pInit[1], element.a, element.b)
                        .pattern(element.pInit[0], element.pInit[1], a, b);
            element.img = image;
            element.polygon.attr({
                id: element.id,
                fill: image
            });
        }
    }

})();
