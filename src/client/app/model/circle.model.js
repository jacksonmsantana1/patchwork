(function () {
    'use strict';

    angular.module('app.models')
        .factory('Circle', Circle);

    Circle.$inject = ['Element', 'Config', 'Drawer'];
    function Circle(Element, Config, Drawer) {
        return function Circle(newId, cx, cy, newImg, radio) {
            //cx = pX and cy = pY
            //super()
            Config.extend(Circle, Element);

            //init()
            Element.call(this, newId, cx, cy, newImg);
            var that = this;

            //private properties
            var pattern = setPattern(newImg);
            var circle = setCircle(cx, cy, radio);

            //public properties
            this.radio = radio;
            this.html = '';
            this.svg = {
                pattern: circle,
                polygon: pattern
            };

            //getters and setters
            this.setCircle = setCircle;
            this.setPattern = setPattern;

            //methods
            function setCircle(cx, cy, radio) {
                circle = Drawer.svg.circle(cx, cy, radio).attr('fill', pattern);
                return circle;
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
