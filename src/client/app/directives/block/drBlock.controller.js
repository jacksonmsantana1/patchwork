(function () {
    'use strict';

    angular.module('app.directives')
        .controller('BlockCtrl', BlockCtrl);

    BlockCtrl.$inject = ['$scope', 'Config', 'Block', '$compile', 'Scopes'];
    function BlockCtrl ($scope, Config, Block, $compile, Scopes) {
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

        //Getters and setters
        $scope.init = init;
        $scope.rotateBlock = rotateBlock;
        $scope.removeBlock = removeBlock;
        $scope.rotateBlock = rotateBlock;
        $scope.removeBlock = removeBlock;
        $scope.changeBlock = changeBlock;

        //methods
        function init(done) {
            $scope.model = new Block($scope.block.id, $scope.block.pInit[0],
                                     $scope.block.pInit[1], $scope.block.img, $scope.block.size);

            $scope.elements = _.map($scope.model.elements, function(element, index) {
                var el = $compile('<polygon element="model.elements[' + index + ']"></polygon>')($scope);
                return el;
            });
            done($scope.elements);
        }

        function rotateBlock(degree) {
            //TODO
        }

        function removeBlock(element) {
            element.remove();
            Scopes.remove($scope.model.id);
        }

        function changeBlock(name){
            //TODO
        }
    }
})();
