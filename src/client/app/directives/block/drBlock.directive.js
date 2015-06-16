(function () {
    'use strict';

    angular.module('app.directives')
        .directive('block', BlockDrct);

    BlockDrct.$inject = ['Config', 'Block', '$compile'];
    function BlockDrct(Config, Block, $compile) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                block: '='
            },
            controller: 'BlockCtrl',
            link: function postLink ($scope, elem, attrs) {
                init($scope, elem);
                $scope.$on("message", function (e, msg) {
                    console.log(msg);
                });
            }
        };
        /////////////////////////////

        function init($scope, elem){
            $scope.model = new Block($scope.block.id, $scope.block.pInit[0],
                                       $scope.block.pInit[1], $scope.block.img, $scope.block.size);
            $scope.html = elem[0];

            _.each($scope.model.elements, function (element, index) {
                var el = $compile('<polygon element="model.elements['+index+']"></polygon>')($scope);
                elem.append(el);
            });

        }

        //?
        function unbindWatcher($scope) {
            return $scope.$watch(
                'element',
                function( newClickCount ) {});
        }

    }
})();
