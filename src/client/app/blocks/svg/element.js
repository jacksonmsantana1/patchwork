(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Element', Element);

    Element.$inject = [];

    function Element() {
        var Element = {
            createElement: createElement
        }

        return Element;
        //////////////////////////

        function createElement(id, pInit, x, coordenateString, img) {
            var svg = Snap(x, x).attr('id', id);
            var coordenates = '';
            var polygon;
            var g;

            if (coordenateString) {
                g = drawShape(pInit, x, coordenateString)
                var img = svg.image(img, pInit[0], pInit[1], x, x);
                img.attr({mask: g});
            } else {
                polygon = svg.rect(pInit[0], pInit[1], x, x).attr({
                    fill: '#F6F6F6',
                    stroke: 'black',
                    strokeWidth: 1
                });
                g = svg.group(polygon); 
            }

            return {
                'element': polygon,
                'img': img,
                'group': g
            };
        }

        function drawShape(pInit, x, coordenateString) {
            var coordArray = evaluateCoordenates(pInit, x, coordenateString);
                _.each (coordArray, function (coord, index) {
                    coordenates += ' ' + coord;
                });
                polygon =  svg.polygon(coordenates).attr({
                    fill: '#F6F6F6',
                    stroke: 'black',
                    strokeWidth: 1
                });
                return svg.group(polygon);
        }

        function evaluateCoordenates(pInit, x, coordenateString) {
            var coordExp = evaluateExpressions(pInit, x, coordenateString);
            var coordenates = [];
            _.each (coordExp, function (coord, index) {
                coordenates.push(coord.apply(this, [pInit[0], pInit[1], x]));
            });
            return coordenates;
        }

        function evaluateExpressions(pInit, x, coordenateString) {
            var arrayCoordExp = coordenateString.split(' ');
            var coordenatesExp = _.map(arrayCoordExp, function (coord) {
                return new Function ('Px', 'Py', 'x', 'return ' + coord);
            });
            return coordenatesExp;
        }
    };

})();
