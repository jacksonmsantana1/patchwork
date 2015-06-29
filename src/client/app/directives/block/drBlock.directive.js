(function() {
    'use strict';

    angular.module('app.directives')
    .directive('block', BlockDrct);

    BlockDrct.$inject = ['Config', 'Scopes'];

    function BlockDrct(Config, Scopes) {
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
                    $scope.init(function (elements) {
                        _.each(elements, function (element) {
                            elem.append(element);
                        });
                    });
                }

                function onDestroy() {
                    $scope.$on('destroy', function () {
                        console.log('Block id:'+ $scope.model.id + 'destroyed');
                        $scope.removeBlock(elem);
                    });
                }

                function onChange() {
                    //TODO
                }

                function onRotate() {
                    //TODO
                }
            }
        };
    }
})();
