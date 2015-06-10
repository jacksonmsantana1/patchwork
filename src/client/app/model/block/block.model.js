(function () {
    'use strict';

    angular.module('app.models')
        .factory('Block', Block);

    Block.$inject = ['Element', 'Polygon', 'Retangule', 'Circle', 'Path', 'Config', 'Drawer', 'Evaluator', 'BlockDao'];
    function Block(Element, Polygon, Retangule, Circle, Path, Config, Drawer, Evaluator, BlockDao) {
        return function Block(newId, newPx, newPy, newImg, newName, size) {
            //super()
            Config.extend(Block, Element);

            //init()
            Element.call(this, newId, newPx, newPy, newImg);
            var that = this;

            //private properties
            var pattern = setPattern(newImg);
            var elements = newName ? setComplexBlock(newName, size) : setNormalBlock(size);

            //public properties
            this.name = newName;
            this.html = '';
            this.elements = elements;

            //getters and setters
            this.setComplexBlock = setComplexBlock;
            this.setNormalBlock = setNormalBlock;
            this.setPattern = setPattern;
            this.size = size;

            //methods
            function setComplexBlock(name, size) {
                var blockSize = size || Config.size;
                var elements = _.map(BlockDao.getBlock(name), function (element, index) {
                    var id = 'b' + 'newId' + 'e' + index;
                    switch (element.elementType) {
                        case 'Polygon':
                            return new Polygon(
                                id, element.img, Evaluator.evalateCoordenates(
                                    [that.px, that.py], element.coordenates, blockSize));
                        case 'Retangule':
                            return new Retangule(
                                id, that.px, that.py, element.img, Evaluator.evalateCoordenates([0, 0], element.width, blockSize),
                                Evaluator.evalateCoordenates(0, 0, element.height, blockSize));
                        case 'Circle':
                            return new Circle(
                                id, that.px, that.py, element.img , Evaluator.evalateCoordenates(
                                    [0, 0], element.radio, blockSize));
                        case 'Path':
                            //TODO: See how to make the path resizeble [Px, Py, x]
                            return new Path(id, that.px, that.py, element.img, element.path);
                    }
                });
                that.elements = elements;
            }

            function setNormalBlock(size) {
                var elements = [];
                var blockSize = size || Config.size;
                var retangule = Drawer.svg.rect(that.px, that.py, blockSize, blockSize).attr('fill', pattern);
                elements.push({pattern: pattern, retangule: retangule});
                that.elements =  elements;
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
