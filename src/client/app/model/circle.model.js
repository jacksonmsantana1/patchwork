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

            //public properties
            this.radio = radio;
        };

    }

})();
