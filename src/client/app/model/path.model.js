(function () {
    'use strict';

    angular.module('app.models')
        .factory('Path', Path);

    Path.$inject = ['Element', 'Config', 'Drawer'];
    function Path(Element, Config, Drawer) {
        return function Path(newId, newPx, newPy, newImg, newPath) {
            //super()
            Config.extend(Path, Element);

            //init()
            Element.call(this, newId, newPx, newPy, newImg);

            //private properties
            var path = 'M' + newPx + ',' + newPy + newPath;

            //public properties
            this.path = path;
        };

    }

})();
