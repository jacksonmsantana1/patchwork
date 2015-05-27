(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Retangule', Retangule);

    Retangule.$inject = []
    function Retangule () {
        var Retangule = {
            //TODO
        }
        return Retangule;
        //////////////////////

        function createRetangule(id, pInit, x, a, b, img) {
            var svg = Snap(x, x).attr('id', id);
            var image;
            var polygon = svg.rect(pInit[0], pInit[1], x, x).attr({
                        fill: '#F6F6F6',
                        stroke: 'black',
                        strokeWidth: 1
                    });
            var g = svg.group(polygon);
            if (img) {
                image = svg.image(img, pInit[0], pInit[1], a, b);
                image.attr({mask: g});
            }

            return {
                'img': image,
                'group': g
            };
        }
    }

})();
