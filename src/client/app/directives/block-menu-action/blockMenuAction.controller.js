(function () {
	'use strict';

	angular.module('app.directives')
		.controller('BlockMenuActionCtrl', BlockMenuActionCtrl);

	BlockMenuActionCtrl.$inject = ['$scope', 'Drawer', 'Scopes'];
	function BlockMenuActionCtrl ($scope, Drawer, Scopes) {
		var vm = this;

		$scope.active = false;

		//Getters and setters
		$scope.init = init;
		$scope.remove = remove;

		//methods
		function init() {
			$scope.active = true;

			var menu = {
				coordenates: $scope.block.elements[0].pInit[0] + ' ' + $scope.block.elements[0].pInit[1] +
				' ' +  ($scope.block.elements[0].pInit[0] + $scope.block.size) + ' ' +  $scope.block.elements[0].pInit[1] +
				' ' +  ($scope.block.elements[0].pInit[0] + $scope.block.size) + ' ' +  ($scope.block.elements[0].pInit[1] + $scope.block.size) +
				' ' +  $scope.block.elements[0].pInit[0] + ' ' +  ($scope.block.elements[0].pInit[1] + $scope.block.size)
			};
			var addbutton = {
			 	cx: $scope.block.elements[0].pInit[0] + ($scope.block.size/2),
				cy: $scope.block.elements[0].pInit[1] + ($scope.block.size/3),
				radio: $scope.block.size/7
			};
			var removebutton = {
				cx: $scope.block.elements[0].pInit[0] + (($scope.block.size*1)/3),
				cy: $scope.block.elements[0].pInit[1] + (($scope.block.size*2)/3),
				radio: $scope.block.size/7
			};
			var rotatebutton = {
				cx: $scope.block.elements[0].pInit[0] + (($scope.block.size*2)/3),
				cy: $scope.block.elements[0].pInit[1] + (($scope.block.size*2)/3),
				radio: $scope.block.size/7
			};

			$scope.menu = {
				layout: Drawer.svg.polygon(menu.coordenates).attr('fill', '#ccc'),
				addbutton: Drawer.svg.circle(addbutton.cx, addbutton.cy, addbutton.radio).attr('fill', 'green'),
				removebutton: Drawer.svg.circle(removebutton.cx, removebutton.cy, removebutton.radio).attr('fill', 'red'),
				rotatebutton: Drawer.svg.circle(rotatebutton.cx, rotatebutton.cy, rotatebutton.radio).attr('fill', 'yellow')
			};

			$scope.menu.layout.mouseout(function () {
				$scope.remove();
			});

			$scope.menu.addbutton.click(function (evt) {
				Scopes.get('ListBlock').$broadcast('BlockClicked',
					{
						id: $scope.block.id,
						x: evt.clientX + document.body.scrollLeft,
						y: evt.clientY + document.body.scrollTop
					});
			});

			$scope.menu.removebutton.click(function () {
				$scope.remove();
				Scopes.get($scope.block.id).$broadcast($scope.block.id + '-RestartBlock');
			});

			$scope.menu.rotatebutton.click(function () {
				$scope.remove();
				Scopes.get($scope.block.id).$broadcast($scope.block.id + '-RotateBlock');
			});
		}

		function remove() {
			$scope.active = false;
			$scope.menu.rotatebutton.remove();
			$scope.menu.removebutton.remove();
			$scope.menu.addbutton.remove();
			$scope.menu.layout.unmouseout();
			$scope.menu.addbutton.unclick();
			$scope.menu.removebutton.unclick();
			$scope.menu.layout.remove();
		}
	}
})();
