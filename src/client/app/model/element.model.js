(function () {
    'use strict';

    angular.module('app.models')
        .factory('Element', Element);

    Element.$inject = ['Config'];
    function Element(Config) {
        return function Element(newId, newPx, newPy, newImg) {
            //private properties

            //public properties
            this.id = newId;
            this.pInit = [newPx, newPy];
            this.img = newImg ? newImg : Config.img[0];

            //getters and setters
            this.setImg = function(newImg) {
                this.img = newImg;
            };
        };

    }

})();
