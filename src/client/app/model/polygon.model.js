(function () {
    'use strict';

    angular.module('app.models')
        .factory('Polygon', Polygon);

    Polygon.$inject = ['Element', 'Config'];
    function Polygon(Element, Config) {
        return function Polygon(newId, newImg, newCoord) {
            //super()
            Config.extend(Polygon, Element);

            //init()
            Element.call(this, newId, newCoord[0], newCoord[1], newImg);

            //public properties
            this.coordenates = newCoord;
        };

    }

})();
