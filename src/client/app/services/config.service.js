(function () {
    'use strict';

    angular.module('app.services')
        .factory('Config', Config);

    Config.$inject = [];

    function Config() {
        var image = 'http://localhost:3000/src/client/images/background/background1.png';
        return {
            width: 1200,    //Svg total width
            height: 700,    //Svg total height
            size: 200,       //Pattern
            imgSize: 200,    //images pattern size
            imgX: 0,
            imgY: 0,
            img: [image],
            px: 50,
            py: 50,
            extend: function (child, parent) {
                var F = function () {};
                F.prototype = parent.prototype;
                child.prototype = new F();
                child.prototype.constructor = child;
                child.uber = parent.prototype;
            }
        };
    }
})();
