(function () {
    'use strict';

    angular.module('app.services')
        .factory('Evaluator', Evaluator);

    Evaluator.$inject = ['Config'];

    function Evaluator(Config) {
        return {
            evalateCoordenates: function (pInit, coordString, size, width, height) {
                return evaluateCoordenates(pInit, coordString, size, width, height);
            }
        };
        /////////////////////////////////

        /**
         * Tranform the array of funtions into an array of coordenates
         * @param  {Array} pInit             Coordenates of the initial points to draw
         * @param  {String} coordenateString String with the coordenates of the element
         * @return {Array}                   Coordenates
         */
        function evaluateCoordenates(pInit, coordenateString, size, width, height) {
            var coordExp = evaluateExpressions(coordenateString);
            var coordenates = [];
            _.each (coordExp, function (coord, index) {
                coordenates.push(coord.apply(this, [pInit[0], pInit[1], size, width, height]));
            });
            return coordenates;
        }

        /**
         * Transform the coordenates string into an Array of functions
         * @param  {String} coordenateString String with the coordenates of the element
         * @return {Array}
         */
        function evaluateExpressions(coordenateString) {
            var arrayCoordExp = coordenateString.split(' ');
            var coordenatesExp = _.map(arrayCoordExp, function (coord) {
                /*jslint evil: true */
                return new Function ('Px', 'Py', 'x', 'w', 'h', 'return ' + coord);
            });
            return coordenatesExp;
        }
    }
})();
