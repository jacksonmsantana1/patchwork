(function () {
    'use strict';

    angular.module('app.directives')
        .controller('BlockCtrl', BlockCtrl);

    BlockCtrl.$inject = ['$scope', 'Drawer', 'Config', 'Block', '$compile', 'Scopes'];
    function BlockCtrl ($scope, Drawer, Config, Block, $compile, Scopes) {
        var vm = this;

        $scope.model = {
            id: '',
            pInit: [],
            name: '',
            size: Config.size,
            isEmpty: false,
            elements: []
        };
        $scope.elements = [];

        init();

        //Getters and setters
        $scope.init = init;
        $scope.rotateBlock = rotateBlock;
        $scope.removeBlock = removeBlock;
        $scope.rotateBlock = rotateBlock;
        $scope.removeBlock = removeBlock;
        $scope.changeBlock = changeBlock;

        //methods
        function init() {
            if (!Scopes.get($scope.block.id)) {
                Scopes.store($scope.block.id, $scope);
            }

            $scope.model = new Block($scope.block.id, $scope.block.pInit[0],
                                     $scope.block.pInit[1], $scope.block.img, $scope.block.size);

            _.each($scope.model.elements, function(element, index) {
                var el = $compile('<polygon element="model.elements[' + index + ']"></polygon>')($scope);
                $scope.elements.push(el);
            });
        }

        function rotateBlock(degree) {
            //TODO
        }

        function removeBlock() {
            //TODO
        }

        function changeBlock(name){
            //TODO
        }
    }
})();
