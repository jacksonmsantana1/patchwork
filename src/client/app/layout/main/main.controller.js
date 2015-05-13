(function () {
'use strict';
	
	angular
		.module('app.layout')
			.controller('Main', Main);

	 /* @ngInject */		
	function Main($scope) {
		$scope.name = "Jackson";
	}

})();