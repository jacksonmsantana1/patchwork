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
				onDestroy();

				//Methods
                function init() {
                    Scopes.store($scope.block.id, $scope);
					$scope.htmlElem = elem;
					$scope.appendElements();
                }

                function onDestroy() {
                    var unbinder =  $scope.$on('$destroy', function () {
                        console.log('Block id:'+ $scope.block.id + 'destroyed');
                        $scope.removeBlock(elem);
						unbinder();
						unbinder = null;
                    });
                }
            }
        };
    }
})();
