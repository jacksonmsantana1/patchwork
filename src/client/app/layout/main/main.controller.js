(function () {

    'use strict';

    angular.module('app.layout')
        .controller('Main', Main);

    Main.$inject = ['$scope', 'Scopes'];

    function Main($scope, Scopes) {

        //fase 1

        //fase 2
        $scope.patchwork = {
            type: '',
            board: {}
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
            Scopes.store('Main', $scope);
            var svg = window.document.getElementsByTagName('svg')[0];
            svg.removeAttribute('height');
            svg.removeAttribute('width');
            svg.setAttribute('viewBox', '0 0 1200 800');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            window.document.getElementById('content').appendChild(svg);
        }
    }

})();
