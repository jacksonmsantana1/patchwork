(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Block', Block);

    Block.$inject = ['Drawer', 'Element'];

    function Block(Drawer, Element) {
        var vm = this;
        var svg = Drawer.svg;
        var x = Drawer.size;

        return {
            createBlock: createBlock,
            createEmptyBlock:createEmptyBlock,
            changeBlockType:changeBlockType
        };
        //////////////////////

        /**
         * Create the block
         * @param  {Number} id            Id
         * @param  {Array} pInit          Coordenates of the initial points to draw
         * @param  {String} type          Block's name
         * @param  {Boolean} orientation  Flag to sinalize if the block will be in vertical|horizontal
         * @return {Array}                Block, an array of elements divided into groups with the
         * same image
         */
        function createBlock(id, pInit, type, orientation) {
            var arrayGroup = [], block;
            if (!type) {
                arrayGroup.push({
                        img: '',
                        imgHeight: 0,
                        imgWidth: 0,
                        elements: []
                    });
                arrayGroup[0].elements.push(
                    createEmptyBlock(id, pInit, orientation));
            } else {
                var infoBlock = getBlockFromType(type, orientation);
                for (var i = 0; i < infoBlock.length; i++) {
                    arrayGroup.push({
                        img: infoBlock[i].img,
                        imgHeight: x,
                        imgWidth: x,
                        elements: []
                    });
                    for (var j = 0; j < infoBlock[i].coordenates.length; j++) {
                        var elementId = id + 'b' + i + '' + j;
                        arrayGroup[i].elements.push(Element.createElement(elementId, pInit,
                            infoBlock[i].coordenates[j], infoBlock[i].img));
                    }
                }
            }

            //img & polygon = arrayGroup
            block = {
                'id': id,
                'pInit': pInit,
                'orientation': orientation,
                'arrayGroup': arrayGroup
            };

            return block;
        }

        /**
         * Creates a block without elements inside
         * @param  {Number} id              ID
         * @param  {Array} pInit            Flag to sinalize if the block will be in vertical|horizontal
         * @param  {Boolean} orientation    Coordenates of the initial points to draw
         * @return {Block}             Block
         */
        function createEmptyBlock(id, pInit, orientation) {
            var polygon, coordenates, block;
            if (orientation) {
                coordenates = '(Px) (Py) (Px+x) (Py) (Px+x) (Py+x) (Px) (Py+x)';
            }else {
                coordenates =
'(Px) (Py) (Px+(0.7071*x)) (Py-(0.7041*x)) (Px+(1.4142*x)) (Py) (Px+(0.7071*x)) (Py+(0.7071*x))';
            }
            polygon = Element.drawShape(id, pInit, coordenates);

            //arrayGroup = polygon & img
            block = {
                'id': id,
                'img': '',
                'polygon': polygon,
                'pInit': pInit,
                'orientation': orientation,
            };

            return block;
        }

        /**
         * Change the Block type
         * @param  {Block} block  Actual block
         * @param  {String} type  Block s type
         * @return                none
         */
        function changeBlockType(block, type) {
            //Remove Block elements
            removeBlock(block);
            if (!type) {
                block.arrayGroup = createEmptyBlock(block.id, block.pInit, block.orientation);
            } else {
                block.arrayGroup = createBlock(block.id, block.pInit, type, block.orientation);
            }
        }

        /**
         * Clean from the browser the block elements
         * @param  {Block} block Block
         * @return       none
         */
        function removeBlock(block) {
            if (block.arrayGroup) {
                _.each(block.arrayGroup, function (block) {
                    _.each(block.elements, function (element) {
                        element.img.remove();
                        element.polygon.unclick();
                        element.polygon.remove();
                    });
                });
            } else {
                block.polygon.unclick();
                block.polygon.remove();
                block.polygon = null;
            }
        }

        /**
         * Get from the database the block's information
         * @param  {String} type            The block's name
         * @param  {Boolean} orientation    Flag to sinalize if the block will be in vertical|horizontal
         * @return {Array}                  Array of array of informations to draw the block
         */
        function getBlockFromType(type, orientation) {
            //Retorna um array duplo, dividindo os elementos com as mesmas imagens
            //TODO
            return [
                {
                    coordenates: [
                        '(Px) (Py) (Px+x) (Py) (Px) (Py+(x*0.333333333))',
                        '(Px) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.333333333))' +
                            ' (Px) (Py+(x*0.666666667))',
                        '(Px) (Py+(x*0.666666667)) (Px+x) (Py+(x*0.666666667)) (Px) (Py+x)'
                    ],
                    img: 'http://mlb-s1-p.mlstatic.com/' +
                            'corte-tecido-importado-patchwork-pink-rosas-quilting' +
                                '-fantasy-14178-MLB3238135558_102012-F.jpg'
                }, {
                    coordenates: [
                        '(Px+x) (Py) (Px) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.333333333))',
                        '(Px+x) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.666666667)) (Px)' +
                            ' (Py+(x*0.666666667))',
                        '(Px+x) (Py+(x*0.666666667)) (Px+x) (Py+x) (Px) (Py+x)'
                    ],
                    img: 'http://mlb-s2-p.mlstatic.com/' +
                            'corte-tecido-importado-patchwork-vinho-trelica-flor-quilting-' +
                            '14259-MLB195704781_1434-F.jpg'
                }
            ];
        }
    }

})();
