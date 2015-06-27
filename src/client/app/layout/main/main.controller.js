(function () {

    'use strict';

    angular.module('app.layout')
        .controller('Main', Main);

    Main.$inject = ['$scope', 'Scopes', 'Boards', 'Patchwork'];

    function Main($scope, Scopes, Boards, Patchwork) {

        //fase 1
        $scope.chType = true;

        //fase 2
        $scope.chBoard = false;

        //Fase 3
        $scope.chBlock = false;

        //Fase 4
        $scope.chImg = false;

        //Fase 5
        $scope.chResult = false;

        init();

        //methods
        function init() {
            $scope.number = 1;
            Scopes.store('Main', $scope);
        }

        //Temp
        $scope.saveBoard = function ( type) {
            var board = JSON.parse($scope.board);
            return Boards.saveBoard(type, board).then(function(data) {
                if (data.ok) {
                    console.log(data);
                } else {
                    console.log(data.message);
                }

            });
        };
    }

})();
