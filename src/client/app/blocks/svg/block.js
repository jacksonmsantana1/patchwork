(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Block', Block);

    Block.$inject = ['Element'];

    function Block() {
        var Block = {
            createBlock: createBlock
        };
        return Block;
        //////////////////////

        function createBlock(point, type) {
            var infoBlock = getBlockFromType(type);
            var arrayGroup = [];
            for (var i = 0; i < infoBlock.length; i++) {
                arrayGroup.push({
                    id: i,
                    img: '',
                    imgHeight: 0,
                    imgWidth: 0,
                    elements: []
                });
                for (var j = 0; j < infoBlock[i].length; j++) {
                    arrayGroup[i].elements.push(Element.createElement(infoBlock[i][j]));
                }
            }
            return arrayGroup;
        };

        function getBlockFromType(type) {
            //Pega do banco as informacoes do bloco
            //Retorna um array duplo, dividindo os elementos com as mesmas imagens
            //TODO
        };
    };

})();
