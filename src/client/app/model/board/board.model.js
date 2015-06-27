(function () {
    'use strict';

    angular.module('app.models')
        .factory('Board', Board);

    Board.$inject = ['Config', 'Evaluator', 'Element'];
    function Board(Config, Evaluator, Element) {
        return function Board(newId, newPx, newPy, img, lines, size) {
            //super()
            Config.extend(Board, Element);

            //init()
            Element.call(this, newId, newPx, newPy);
            var that = this;

            //public properties
            this.descriptionImg = img;
            this.lines = lines;
            this.size = Evaluator.evalateCoordenates(
                [0, 0], size, Config.size, 0, 0)[0];

            //getters and setters

        };
    }

})();
