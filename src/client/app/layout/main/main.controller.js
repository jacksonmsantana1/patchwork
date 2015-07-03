(function () {

    'use strict';

    angular.module('app.layout')
        .controller('Main', Main);

    Main.$inject = ['$scope', 'Scopes', 'BoardDao', 'BlockDao'];

    function Main($scope, Scopes, BoardDao, BlockDao) {

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
			$scope.$watch(function (newValue, oldValue) {

			});
        }

        //Temp
        $scope.saveBoard = function ( type) {
            var board = JSON.parse($scope.board);
            return BoardDao.saveBoard(type, board).then(function(data) {
                if (data.ok) {
                    console.log(data);
                } else {
                    console.log(data.message);
                }

            });
        };

		$scope.saveBlock = function () {
			var block = JSON.parse($scope.block);
			return BlockDao.saveBlock(block).then(function(data) {
				if (data.ok) {
					console.log(data);
				} else {
					console.log(data.message);
				}
			});
		};
    }

})();
