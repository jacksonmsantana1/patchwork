/**
 * Created by jackson on 19/06/15.
 */

(function () {
	'use strict';

	angular.module('app.directives')
		.controller('ChooseLayoutCtrl', ChooseLayoutCtrl);

	ChooseLayoutCtrl.$inject = ['$scope', 'Layouts', 'logger', 'Scopes'];
	function ChooseLayoutCtrl($scope, Layouts, logger, Scopes) {
		var vm = this;

		$scope.layouts = [];
		$scope.type = getType();

		$scope.init = init;
		$scope.pop = pop;
		$scope.push = push;
		$scope.next = next;
		$scope.getLayouts = getLayouts;

		//methods
		function init() {
			return getLayouts($scope.type).then(function() {
				logger.info('Activated Layouts View');
			});
		}

		function getLayouts(type) {
			return Layouts.getLayouts(type).then(function(data) {
				if (data.ok) {
					$scope.layouts = data.layouts;
					return $scope.layouts;
				} else {
					logger.error(data.message);
				}

			});
		}

		function getType() {
			$scope.type =  Scopes.get('Main').type;
		}

		function pop() {
			var last = $scope.layouts.pop();
			$scope.layouts.unshift(last);
		}

		function push() {
			var first = $scope.layouts.shift();
			$scope.layouts.push(first);
		}

		function next(type) {
			//TODO
		}
	}
})();
