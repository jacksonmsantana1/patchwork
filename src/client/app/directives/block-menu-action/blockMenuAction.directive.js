(function () {
	'use strict';

	angular.module('app.directives')
		.directive('blockMenuAction', BlockMenuAction);

	BlockMenuAction.$inject = ['Scopes'];
	function BlockMenuAction(Scopes) {
		return {
			restrict: 'E',
			replace: false,
			scope: true,
			controller: 'BlockMenuActionCtrl',
			link: function postLink ($scope, elem, attrs, ctrl) {
				init();

				//Methods
				function init() {
					Scopes.store('BlockMenuAction', $scope);
				}

				var unbinder =  $scope.$on('$destroy', function () {
					Scopes.remove('BlockMenuAction');
					unbinder();
					unbinder = null;
				});
			}
		};
	}
})();
