(function () {
    'use strict';

    angular.module('blocks.svg')
        .factory('Element', Element);

    Block.$inject = [];

    function Element() {
        var Element = {
            createElement: createElement
        }

        return Element;
        //////////////////////////

        function createElement(coordenateString) {
            //TODO
        }

        function evaluateExpressions(arrayPoints) {
            //TODO
        }
    };

})();
