(function() {
    'use strict';

    angular.module('app.directives')
    .directive('block', BlockDrct);

    BlockDrct.$inject = ['Scopes'];

    function BlockDrct(Scopes) {
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
				onRotate();
				onRestart();
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
                    $scope.$on('$destroy', function () {
                        console.log('Block id:'+ $scope.block.id + 'destroyed');
                        $scope.removeBlock(elem);
                    });
                }

                function onChange() {
                    $scope.$on($scope.block.id + '-ChangeBlock', function (evt, data) {
						$scope.changeBlock(data);
						onLoad();
					});
                }

				function onRestart() {
					$scope.$on($scope.block.id + '-RestartBlock', function () {
						$scope.restartBlock();
						onLoad();
					});
				}

				function onRotate() {
					$scope.$on($scope.block.id + '-RotateBlock', function () {
						$scope.rotateBlock();
					});
				}
            }
        };
    }
})();
