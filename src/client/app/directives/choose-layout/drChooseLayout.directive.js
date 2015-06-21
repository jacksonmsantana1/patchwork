(function () {
	'use strict';

	angular.module('app.directives')
		.directive('drChooseLayout', function () {
			return {
				templateUrl: 'src/client/app/directives/choose-layout/dr-choose-layout.html',
				restrict: 'E',
				controller: 'ChooseLayoutCtrl',
				scope: true,
				link: function ($scope, elem, attrs) {
					$scope.init();
				}
			};
		});

})();
