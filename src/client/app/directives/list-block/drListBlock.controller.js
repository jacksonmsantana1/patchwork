(function() {
	'use strict';

	angular.module('app.directives')
		.controller('ListBlockCtrl', ListBlockCtrl);

	ListBlockCtrl.$inject = ['$scope', 'BlockDao'];

	function ListBlockCtrl($scope, BlockDao) {
		var vm = this;

		$scope.blocks = [];

		$scope.getBlocks = getBlocks;
		$scope.next = next;
		$scope.init = init;

		//methods
		function init() {
			return getBlocks().then(function() {
				logger.info('Activated Types View');
			});
		}

		function getBlocks() {
			return BlockDao.getBlocks().then(function(data) {
				if (data.ok) {
					$scope.blocks = data.blocks;
					return $scope.blocks;
				} else {
					logger.error(data.message);
				}
			});
		}

		function next(type) {
			//TODO
		}
	}
})();
