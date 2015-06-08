(function () {
    'use strict';

    angular.module('app.directives')
        .directive('board', Board);

    Board.$inject = ['Config'];
    function Board(Config) {
        return {
            restrict: 'E',
            link: function postLink ($scope, elem, attrs) {
                init(elem);
            }
        };
        /////////////////////////////

        function init(elem){
            elem[0].appendChild(window.document.getElementsByTagName('svg')[0]);
        }
    }
})();
