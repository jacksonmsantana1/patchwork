(function () {
    'use strict';

    angular.module('app.services')
        .factory('Patchwork', Patchwork);

    Patchwork.$inject = [];

    function Patchwork() {
        var patchwork = {
            type: '',
            board: {},
            border: []
        };
        return {
            get: get,
            setType: setType,
            setBoard: setBoard,
            setBorder: setBorder
        };

        //Setters and getters
        function get() {
            return patchwork;
        }

        function setType(type) {
            patchwork.type = type;
        }

        function setBoard(board) {
            patchwork.board = board;
        }

        function setBorder(border) {
            patchwork.border = border;
        }

        function setBlock(i, j, block) {
            //TODO
        }

        function setImage(i, j, image) {
            //TODO
        }
    }
})();
