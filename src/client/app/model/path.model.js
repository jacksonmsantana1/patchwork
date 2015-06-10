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
            var that = this;
            var path = 'M' + newPx + ',' + newPy + newPath;
            setPattern(newImg);
            setPath(path);

            //public properties
            this.path = path;
            this.html = '';
            this.svg = {
                pattern: that.pattern,
                polygon: that.element
            };

            //getters and setters
            this.setPath = setPath;
            this.setPattern = setPattern;

            //methods
            function setPath(path) {
                var element =  Drawer.svg.path('M' + newPx + ',' + newPy + newPath + path).attr('fill', that.pattern);
                that.element = element;
            }

            function setPattern(img) {
                var pattern = Drawer.svg
                                .image(img || that.img, Config.imgX, Config.imgY, Config.imgSize, Config.imgSize)
                                    .pattern(Config.imgX, Config.imgY, Config.imgSize, Config.imgSize);
                that.pattern = pattern;
            }
        };

    }

})();
