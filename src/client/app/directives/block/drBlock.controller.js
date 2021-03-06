(function () {
    'use strict';

    angular.module('app.directives')
        .controller('BlockCtrl', BlockCtrl);

    BlockCtrl.$inject = ['$scope','$compile', 'Scopes', 'Block'];
    function BlockCtrl ($scope, $compile, Scopes, Block) {
        var vm = this;

		$scope.size = $scope.block.size || 200;

        //Getters and setters
        $scope.init = init;
        $scope.removeBlock = removeBlock;
		$scope.restartBlock = restartBlock;
		$scope.changeBlock = changeBlock;
		$scope.rotateBlock = rotateBlock;
		$scope.appendElements = appendElements;

        //Methods
        function init(done) {
            var htmlElements = _.map($scope.block.elements, function(element, index) {
                var el = $compile('<polygon element="block.elements[' + index + ']"></polygon>')($scope);
                return el;
            });
			addEventListeners();
            done(htmlElements);
        }

        function removeBlock(element) {
            element.remove();
            Scopes.remove($scope.block.id);
        }

		function restartBlock() {
			if ($scope.block.elements.length > 1) {
				$scope.block.elements.forEach(function (element) {
					Scopes.get(element.id).$broadcast('$destroy');
				});
				$scope.block = new Block($scope.block.id, $scope.block.pInit[0], $scope.block.pInit[1], '', $scope.size);
				$scope.appendElements();
			}
		}

		function changeBlock(block) {
			$scope.block.elements.forEach(function (element) {
				Scopes.get(element.id).$broadcast('$destroy');
			});
			$scope.block = new Block($scope.block.id, $scope.block.pInit[0], $scope.block.pInit[1], '', $scope.size,
				block.elements);
			$scope.appendElements();
		}

		function rotateBlock() {
			var mediumPoint = [$scope.block.pInit[0] + ($scope.size/2), $scope.block.pInit[1] + ($scope.size/2)];
			$scope.block.elements.forEach(function (element) {
				Scopes.get(element.id).rotateElement(mediumPoint);
			});
		}

		//Aux Methods
		function addEventListeners() {
			$scope.block.elements.forEach(function (element) {
				Scopes.get(element.id).bindMouseOverEvent(function () {
					Scopes.get('BlockMenuAction').init($scope.block);
				});
			});
		}

		function appendElements() {
			$scope.init(function (elements) {
				_.each(elements, function (element) {
					$scope.htmlElem.append(element);
				});
			});
		}
    }
})();
