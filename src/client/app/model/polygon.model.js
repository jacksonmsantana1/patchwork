(function () {
    'use strict';

    angular.module('app.models')
        .factory('Polygon', Polygon);

    Polygon.$inject = ['Element', 'Config'];
    function Polygon(Element, Config) {
        return function Polygon(newId, newPx, newPy, newCoord) {
            Config.extend(Polygon, Element);

            Element.call(this, newId, newPx, newPy);
            this.coordenates = newCoord;
        };

    }

})();
