(function () {
    'use strict';

    angular.module('app.models')
        .factory('Block', Block);

    Block.$inject = ['Element', 'Polygon', 'Retangule', 'Circle', 'Path', 'Config', 'Drawer', 'Evaluator', 'BlockDao'];
    function Block(Element, Polygon, Retangule, Circle, Path, Config, Drawer, Evaluator, BlockDao) {
        return function Block(newId, newPx, newPy, newImg, newName) {
            //super()
            Config.extend(Block, Element);

            //init()
            Element.call(this, newId, newPx, newPy, newImg);
            var that = this;

            //private properties
            var pattern = setPattern(newImg);
            var elements = newName ? setComplexBlock(newName) : setNormalBlock(newPx, newPy);

            //public properties
            this.name = newName;
            this.html = '';
            this.elements = elements;

            //getters and setters
            this.setComplexBlock = setComplexBlock;
            this.setNormalBlock = setNormalBlock;
            this.setPattern = setPattern;

            //methods
            function setComplexBlock(px, py, name) {
                var elements = BlockDao.getBlock(name);
                return _.map(elements, function (element, index) {
                    var id = 'b' + 'newId' + 'e' + index;
                    switch (element.elementType) {
                        case 'Polygon':
                            return new Polygon(
                                id, element.img, Evaluator.evalateCoordenates([px, py], element.coordenates));
                        case 'Retangule':
                            return new Retangule(
                                id, px, py, element.img, Evaluator.evalateCoordenates(0, 0, element.width),
                                    Evaluator.evalateCoordenates(0, 0, element.height));
                        case 'Circle':
                            return new Circle(
                                id, px, py, element.img , Evaluator.evalateCoordenates(0, 0, element.radio));
                        case 'Path':
                            //TODO: See how to make the path resizeble [Px, Py, x]
                            return new Path(id, px, py, element.img, element.path);
                    }
                });
            }

            function setNormalBlock(px, py) {
                var elements = [];
                var retangule = Drawer.svg.rect(px, py, Config.size, Config.size).attr('fill', pattern);
                elements.push({pattern: pattern, retangule: retangule});
                return elements;
            }

            function setPattern(img) {
                pattern =  Drawer.svg
                    .image(img || that.img, Config.imgX, Config.imgY, Config.imgSize, Config.imgSize)
                    .pattern(Config.imgX, Config.imgY, Config.imgSize, Config.imgSize);
                return pattern;
            }
        };

    }

})();
