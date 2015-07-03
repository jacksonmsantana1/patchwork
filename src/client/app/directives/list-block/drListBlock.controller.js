(function() {
	'use strict';

	angular.module('app.directives')
		.controller('ListBlockCtrl', ListBlockCtrl);

	ListBlockCtrl.$inject = ['$scope', 'BlockDao', 'logger'];

	function ListBlockCtrl($scope, BlockDao, logger) {
		var vm = this;

		$scope.blocks = [];
		$scope.showListBlock = false;


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
				var data = data.data;
				if (data.ok) {
					$scope.blocks = data.blocks;
					return $scope.blocks;
				} else {
					logger.error(data.message);
				}
			});
		}

		function next() {
			//TODO
		}
	}
})();
