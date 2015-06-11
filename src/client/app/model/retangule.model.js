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

            //private properties

            //public properties
            this.width = width;
            this.height = height;
        };

    }

})();
