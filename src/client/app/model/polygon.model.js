(function () {
    'use strict';

    angular.module('app.models')
        .factory('Polygon', Polygon);

    Polygon.$inject = ['Element', 'Config', 'Drawer'];
    function Polygon(Element, Config, Drawer) {
        return function Polygon(newId, newImg, newCoord) {
            //super()
            Config.extend(Polygon, Element);

            //init()
            Element.call(this, newId, newCoord[0], newCoord[1], newImg);
            var that = this;

            //private properties
            var pattern = setPattern(newImg);
            var polygon = setPolygon(newCoord);

            //public properties
            this.coordenates = newCoord;
            this.html = '';
            this.svg = {
                pattern: pattern,
                polygon: polygon
            };

            //getters and setters
            this.setPolygon = setPolygon;
            this.setPattern = setPattern;

            //methods
            function setPolygon(coord) {
                polygon = Drawer.svg.polygon(coord).attr('fill', pattern);
                return polygon;
            }

            function setPattern(img) {
                pattern = Drawer.svg
                    .image(img || that.img, Config.imgX, Config.imgY, Config.imgSize, Config.imgSize)
                    .pattern(Config.imgX, Config.imgY, Config.imgSize, Config.imgSize);
                return pattern;
            }
        };

    }

})();