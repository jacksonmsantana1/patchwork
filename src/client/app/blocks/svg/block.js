(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Block', Block);

    Block.$inject = ['Element'];

    function Block(Element) {
        var Block = {
            createBlock: createBlock
        };
        return Block;
        //////////////////////

        /**
         * Create the block
         * @param  {[type]} pInit Coordenates of the initial point, where start the draw
         * @param  {[type]} x     Size of the blocks
         * @param  {[type]} type  Block's name
         * @return {Array}       Block, an array of elements divided into groups with the
         * same image
         */
        function createBlock(pInit, x, type) {
            var arrayGroup = [];
            if (false) {
                arrayGroup.push({
                        id: i,
                        img: '',
                        imgHeight: 0,
                        imgWidth: 0,
                        elements: []
                    });
                arrayGroup[0].elements.push(Element.createElement(id, pInit, x));
            } else {
                var infoBlock = getBlockFromType(type);
                for (var i = 0; i < infoBlock.length; i++) {
                    arrayGroup.push({
                        id: i,
                        img: '',
                        imgHeight: 0,
                        imgWidth: 0,
                        elements: []
                    });
                    for (var j = 0; j < infoBlock[i].coordenates.length; j++) {
                        var id = '' + i + '' + j;
                        arrayGroup[i].elements.push(Element.createElement(id, pInit, x, infoBlock[i].coordenates[j], infoBlock[i].img));
                    }
                }
            }

            return arrayGroup;
        };

        /**
         * Get from the database the block's information
         * @param  {String} type  The block's name
         * @return {Array}      Array of array of informations to draw the block
         */
        function getBlockFromType(type) {
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
