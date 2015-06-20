(function () {

    'use strict';

    angular.module('app.layout')
        .controller('Main', Main);

    Main.$inject = ['$scope', 'Element', 'Polygon'];

    function Main($scope, Element, Polygon) {

        //fase 1

        //fase 2
        $scope.patchwork = {
            type: '',
            boardName: ''
        };

        //Fase 3 e 4
        $scope.board = {
            pInit: [0, 0],
            i: 4,
            j: 3,
            size: 'x',
            name: ''
        };

        init();

        //methods
        function init() {
            $scope.number = 1;
            var svg = window.document.getElementsByTagName('svg')[0];
            svg.removeAttribute('height');
            svg.removeAttribute('width');
            svg.setAttribute('viewBox', '0 0 1200 800');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            window.document.getElementById('content').appendChild(svg);
        }
    }

})();
