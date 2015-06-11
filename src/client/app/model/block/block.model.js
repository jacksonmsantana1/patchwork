(function () {
    'use strict';

    angular.module('app.models')
        .factory('Block', Block);

    Block.$inject = ['Config', 'Evaluator', 'BlockDao', 'Element', 'Polygon'];
    function Block(Config, Evaluator, BlockDao, Element, Polygon) {
        return function Block(newId, newPx, newPy, newName, size) {
            //super()
            Config.extend(Block, Element);

            //init()
            Element.call(this, newId, newPx, newPy);
            var that = this;

            //public properties
            this.name = newName;
            this.elements = newName ? fullBlock(newName) : emptyBlock();
            this.size = size ? size : Config.size;

            //public methods
            this.fullBlock = fullBlock;
            this.emptyBlock = emptyBlock;
            this.cleanBlock = cleanBlock;

            //methods
            function fullBlock(name) {
                var blockSize = that.size || Config.size;
                return _.map(BlockDao.getBlock(name), function (element, index) {
                    var id = 'b' + 'newId' + 'e' + index;
                    return new Polygon(
                        id, element.img, Evaluator.evalateCoordenates(
                            [that.pInit[0], that.pInit[1]], element.coordenates, blockSize));
                });
            }

            function emptyBlock() {
                var blockSize = that.size || Config.size;
                var coordenates = [that.pInit[0], that.pInit[1],
                                   that.pInit[0] + blockSize, that.pInit[1],
                                   that.pInit[0] + blockSize, that.pInit[1] + blockSize,
                                   that.pInit[0] , that.pInit[1] + blockSize];
                var id = 'b' + that.id + 'e' + 1;
                return [new Polygon(id, that.image, coordenates)];
            }

            function cleanBlock() {
                that.elements = [];
                that.elements.push(emptyBlock());
            }
        };

    }

})();
