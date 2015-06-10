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
            var that = this;

            //private properties
            var path = 'M' + newPx + ',' + newPy + newPath;
            var pattern = setPattern(newImg);
            var element = setPath(path);

            //public properties
            this.path = path;
            this.html = '';
            this.svg = {
                pattern: pattern,
                polygon: element
            };

            //getters and setters
            this.setPath = setPath;
            this.setPattern = setPattern;

            //methods
            function setPath(path) {
                element =  Drawer.svg.path('M' + newPx + ',' + newPy + newPath + path).attr('fill', pattern);
                return element;
            }

            function setPattern(img) {
                pattern = Drawer.svg
                    .image(img || that.img, Config.imgX, Config.imgY, Config.imgSize, Config.imgSize)
                    .pattern(Config.imgX, Config.imgY, Config.imgSize, Config.imgSize);
                return pattern;
            }
        };

    }

})();
