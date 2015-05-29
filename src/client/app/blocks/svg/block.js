(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Block', Block);

    Block.$inject = ['Element'];

    function Block(Element) {
        var vm = this;
        var Block = {
            createBlock: createBlock,
            createEmptyBlock:createEmptyBlock
        };
        return Block;
        //////////////////////

        /**
         * Create the block
         * @param  {Number} id            Id
         * @param  {Array} pInit          Coordenates of the initial point, where start the draw
         * @param  {Number} x             Size of the blocks
         * @param  {String} type          Block's name
         * @param  {Boolean} orientation  Flag to sinalize if the block will be in vertical|horizontal
         * @return {Array}                Block, an array of elements divided into groups with the
         * same image
         */
        function createBlock(id, pInit, x, type, orientation) {
            var arrayGroup = [];
            if (!type) {
                arrayGroup.push({
                        img: '',
                        imgHeight: 0,
                        imgWidth: 0,
                        elements: []
                    });
                arrayGroup[0].elements.push(
                    createEmptyBlock(id, pInit, x, orientation));
            } else {
                var infoBlock = getBlockFromType(type, orientation);
                for (var i = 0; i < infoBlock.length; i++) {
                    arrayGroup.push({
                        img: '',
                        imgHeight: 0,
                        imgWidth: 0,
                        elements: []
                    });
                    for (var j = 0; j < infoBlock[i].coordenates.length; j++) {
                        var elementId = id + 'b' + i + '' + j;
                        arrayGroup[i].elements.push(Element.createElement(elementId, pInit, x,
                            infoBlock[i].coordenates[j], infoBlock[i].img));
                    }
                }
            }

            arrayGroup.id = id;
            return arrayGroup;
        };

        function createEmptyBlock(id, pInit, x, orientation) {
            var svg = Snap(x, x).attr('id', id);
            var g, polygon;
            if (orientation) {
                polygon = svg.rect(pInit[0], pInit[1], x, x).attr({
                    fill: '#F6F6F6',
                    stroke: 'black',
                    strokeWidth: 1
                });
                g = svg.group(polygon);
            }else {
                var coordenates = '(Px) (Py) (Px+(0.7071*x)) (Py-(0.7041*x)) (Px+(1.4142*x)) (Py) (Px+(0.7071*x)) (Py+(0.7071*x))';
                g = Element.drawShape(svg, pInit, x, coordenates);
            }

            return {
                'id': id,
                'img': '',
                'group': g
            };
        }

        /**
         * Get from the database the block's information
         * @param  {String} type  The block's name
         * @param  {Boolean} orientation  Flag to sinalize if the block will be in vertical|horizontal
         * @return {Array}      Array of array of informations to draw the block
         */
        function getBlockFromType(type, orientation) {
            //Retorna um array duplo, dividindo os elementos com as mesmas imagens
            //TODO
            return [
                {
                    coordenates: [
                        '(Px) (Py) (Px+x) (Py) (Px) (Py+(x*0.333333333))',
                        '(Px) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.333333333)) (Px) (Py+(x*0.666666667))',
                        '(Px) (Py+(x*0.666666667)) (Px+x) (Py+(x*0.666666667)) (Px) (Py+x)'
                    ],
                    img: 'http://mlb-s1-p.mlstatic.com/corte-tecido-importado-patchwork-pink-rosas-quilting-fantasy-14178-MLB3238135558_102012-F.jpg'
                }, {
                    coordenates: [
                        '(Px+x) (Py) (Px) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.333333333))',
                        '(Px+x) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.666666667)) (Px) (Py+(x*0.666666667))',
                        '(Px+x) (Py+(x*0.666666667)) (Px+x) (Py+x) (Px) (Py+x)'
                    ],
                    img: 'http://mlb-s2-p.mlstatic.com/corte-tecido-importado-patchwork-vinho-trelica-flor-quilting-14259-MLB195704781_1434-F.jpg'
                }
            ];
        };
    };

})();
