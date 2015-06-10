(function () {
    'use strict';

    angular.module('app.services')
        .factory('Config', Config);

    Config.$inject = [];

    function Config() {
        return {
            width: 1200,    //Svg total width
            height: 800,    //Svg total height
            size: 20,       //Pattern
            imgSize: 200,    //images pattern size
            imgX: 0,
            imgY: 0,
            img: ['/src/client/images/gulp-tiny.png'],
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
