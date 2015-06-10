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

            //private properties
            var that = this;
            setPattern(newImg);
            setPolygon(newCoord);

            //public properties
            this.coordenates = newCoord;
            this.html = '';
            this.svg = {
                pattern: that.pattern,
                polygon: that.polygon
            };

            //getters and setters
            this.setPolygon = setPolygon;
            this.setPattern = setPattern;

            //methods
            function setPolygon(coord) {
                var polygon = Drawer.svg.polygon(coord).attr('fill', that.pattern);
                that.polygon = polygon;
            }

            function setPattern(img) {
                var pattern = Drawer.svg
                    .image(img || that.img, Config.imgX, Config.imgY, Config.imgSize, Config.imgSize)
                    .pattern(Config.imgX, Config.imgY, Config.imgSize, Config.imgSize);
                that.pattern = pattern;
            }
        };

    }

})();
