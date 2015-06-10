(function () {
    'use strict';

    angular.module('app.models')
        .factory('Retangule', Retangule);

    Retangule.$inject = ['Element', 'Config', 'Drawer'];
    function Retangule(Element, Config, Drawer) {
        return function Retangule(newId, newPx, newPy, newImg, width, height) {
            //super()
            Config.extend(Retangule, Element);

            //init()
            Element.call(this, newId, newPx, newPy, newImg);
            var that = this;

            //private properties
            var pattern = setPattern(newImg);
            var retangule = setPolygon(newPx, newPy, width, height);

            //public properties
            this.width = width;
            this.height = height;
            this.html = '';
            this.svg = {
                pattern: pattern,
                polygon: retangule
            };

            //getters and setters
            this.setPolygon = setPolygon;
            this.setPattern = setPattern;

            //methods
            function setPolygon(newPx, newPy, width, height) {
                retangule = Drawer.svg.rect(newPx, newPy, width, height).attr('fill', pattern);
                return retangule;
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
