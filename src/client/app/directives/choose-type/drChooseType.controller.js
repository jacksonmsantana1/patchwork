(function () {
    'use strict';

    angular.module('app.directives')
        .controller('ChooseTypeCtrl', ChooseTypeCtrl);

    ChooseTypeCtrl.$inject = ['$scope', 'Types', 'logger', 'Scopes', 'Patchwork'];
    function ChooseTypeCtrl($scope, Types, logger, Scopes, Patchwork) {
        var vm = this;

        $scope.types = [];

        $scope.init = init;
        $scope.pop = pop;
        $scope.push = push;
        $scope.next = next;
        $scope.getTypes = getTypes;

        //methods
        function init() {
            if (!Scopes.get('ChooseType')) {
                Scopes.store('ChooseBoard', $scope);
            }
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
            Patchwork.setType(type);
            Scopes.get('Main').chType = false;
            Scopes.get('Main').chBoard = true;
            Scopes.get('Main').number += 1;
        }
    }
})();
