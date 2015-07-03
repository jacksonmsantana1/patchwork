(function () {
    'use strict';

    angular.module('app.directives')
        .controller('BlockCtrl', BlockCtrl);

    BlockCtrl.$inject = ['$scope','$compile', 'Scopes', '$rootScope'];
    function BlockCtrl ($scope, $compile, Scopes, $rootScope) {
        var vm = this;

        //Getters and setters
        $scope.init = init;
        $scope.rotateBlock = rotateBlock;
        $scope.removeBlock = removeBlock;
        $scope.rotateBlock = rotateBlock;
        $scope.removeBlock = removeBlock;
        $scope.changeBlock = changeBlock;

        //methods
        function init(block, done) {
            var htmlElements = _.map(block.elements, function(element, index) {
                var el = $compile('<polygon element="block.elements[' + index + ']"></polygon>')($scope);
                return el;
            });
			addEventListeners();
            done(htmlElements);
        }

		function addEventListeners() {
			if ($scope.block.elements.length === 1) {
				Scopes.get($scope.block.elements[0].id).bindClickEvent(function () {
					Scopes.get('ListBlock').$broadcast('BlockClicked', {id: $scope.block.id});
				});
			} else {
				_.each($scope.block.elements, function (element) {
					//TODO
				});
			}
		}

        function rotateBlock(degree) {
            //TODO
        }

        function removeBlock(element) {
            element.remove();
            Scopes.remove($scope.block.id);
        }

        function changeBlock(name){
            //TODO
        }
    }
})();
