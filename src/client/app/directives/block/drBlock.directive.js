(function() {
    'use strict';

    angular.module('app.directives')
    .directive('block', BlockDrct);

    BlockDrct.$inject = ['Scopes', 'Block'];

    function BlockDrct(Scopes, Block) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                block: '='
            },
            controller: 'BlockCtrl',
            link: function postLink($scope, elem, attrs) {
                init();
				onChange();
                onDestroy();

                //Methods
                function init() {
                    Scopes.store($scope.block.id, $scope);
                    onLoad();
                }

				function onLoad() {
					$scope.init($scope.block, function (elements) {
						_.each(elements, function (element) {
							elem.append(element);
						});
					});
				}

                function onDestroy() {
                    $scope.$on('destroy', function () {
                        console.log('Block id:'+ $scope.block.id + 'destroyed');
                        $scope.removeBlock(elem);
                    });
                }

				function onClick(element) {
					//TODO
				}

                function onChange() {
					var size = null; //Deopis ver se utilizarei
                    $scope.$on($scope.block.id, function (evt, data) {
						$scope.$broadcast('$destroy');
						$scope.block = new Block($scope.block.id, $scope.block.pInit[0], $scope.block.pInit[1],'',size,
							data.block.elements);
						onLoad();
					});
                }

                function onRotate() {
                    //TODO
                }
            }
        };
    }
})();
