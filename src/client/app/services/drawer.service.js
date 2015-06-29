(function () {
    'use strict';

    angular.module('app.services')
        .service('Drawer', Drawer);

    Drawer.$inject = [];
    function Drawer() {
        var that = this;

        this.svg = null;
        this.x = 200;
        this.pInit = [20, 20];
        this.border = 20;


        ////////////////GETTERS/SETTERS////
        this.draw = function() {
            that.svg = Snap('#svgBoard');
        };

        this.setX = function(newX) {
            that.x = newX;
        };

        this.setPInit = function (newPInit) {
            that.pInit = newPInit;
        };

        this.setBorder = function (newBorder) {
            that.border = newBorder;
        };

    }

})();
