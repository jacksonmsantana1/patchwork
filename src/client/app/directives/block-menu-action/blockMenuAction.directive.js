(function () {
	'use strict';

	angular.module('app.directives')
		.directive('blockMenuAction', BlockMenuAction);

	BlockMenuAction.$inject = ['Scopes'];
	function BlockMenuAction(Scopes) {
		return {
			restrict: 'E',
			replace: false,
			scope: {
				block: '='
			},
			controller: 'BlockMenuActionCtrl',
			link: function postLink ($scope, elem, attrs, ctrl) {
				Scopes.store('BlockMenuAction-' + $scope.block.id, $scope);
				onChange();

				//Methods
				function onChange() {
					$scope.$on($scope.block.id, function () {
						if (!$scope.active) {
							$scope.init();
						}
					});
				}
			}
		};
	}
})();
