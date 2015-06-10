(function () {
    'use strict';

    angular.module('app.services')
        .factory('Evaluator', Evaluator);

    Evaluator.$inject = ['Config'];

    function Evaluator(Config) {
        return {
            evalateCoordenates: function (pInit, coordString, size) {
                return evaluateCoordenates(pInit, coordString, size);
            }
        };
        /////////////////////////////////

        /**
         * Tranform the array of funtions into an array of coordenates
         * @param  {Array} pInit             Coordenates of the initial points to draw
         * @param  {String} coordenateString String with the coordenates of the element
         * @return {Array}                   Coordenates
         */
        function evaluateCoordenates(pInit, coordenateString, size) {
            var coordExp = evaluateExpressions(coordenateString);
            var coordenates = [];
            _.each (coordExp, function (coord, index) {
                coordenates.push(coord.apply(this, [pInit[0], pInit[1], size]));
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
                return new Function ('Px', 'Py', 'x', 'return ' + coord);
            });
            return coordenatesExp;
        }
    }
})();
