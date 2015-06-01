(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Drawer', Drawer);

    Drawer.$inject = [];
    function Drawer() {
        var svg = Snap(1200, 800);
        var x = 200;
        var pInit = [20, 20];
        var border = 20;

        return {
            svg: svg,
            size: x,
            pInit: pInit,
            border: border
        };
        ////////////////GETTERS/SETTERS////

        function setSvg(newX, newY) {
            svg = Snap(newX, newY);
        }

        function setX(newX) {
            x = newX;
        }

        function setPInit(newPInit) {
            pInit = newPInit;
        }

        function setBorder(newBorder) {
            border = newBorder;
        }

    }

})();
