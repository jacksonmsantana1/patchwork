(function () {
    'use strict';

    angular.module('app.models')
        .factory('Element', Element);

    Element.$inject = [];
    function Element() {
        return function Element(idNew, pxNew, pyNew) {
            var px = pxNew, py = pyNew;
            var img = '';
            this.id = idNew;
            this.pInit = [px, py];
            this.setImg = function(newImg) {
                this.img = newImg;
            };
        };

    }

})();
