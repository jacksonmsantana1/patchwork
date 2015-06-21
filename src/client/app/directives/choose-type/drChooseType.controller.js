(function () {
    'use strict';

    angular.module('app.directives')
        .controller('ChooseTypeCtrl', ChooseTypeCtrl);

	ChooseTypeCtrl.$inject = ['$scope', 'Types', 'logger'];
    function ChooseTypeCtrl($scope, Types, logger) {
        var vm = this;

        $scope.types = [];

        $scope.init = init;
        $scope.pop = pop;
        $scope.push = push;
        $scope.next = next;
		$scope.getTypes = getTypes;

		//methods
		function init() {
			return getTypes().then(function() {
				logger.info('Activated Types View');
			});
		}

		function getTypes() {
			return Types.getTypes().then(function(data) {
				if (data.ok) {
					$scope.types = data.types;
					return $scope.types;
				} else {
					logger.error(data.message);
				}

			});
		}

        function pop() {
            var last = $scope.types.pop();
			$scope.types.unshift(last);
        }

        function push() {
            var first = $scope.types.shift();
			$scope.types.push(first);
        }

        function next(type) {
			//TODO
        }
    }
})();
