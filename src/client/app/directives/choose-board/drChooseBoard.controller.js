(function () {
    'use strict';

    angular.module('app.directives')
        .controller('ChooseBoardCtrl', ChooseBoardCtrl);

    ChooseBoardCtrl.$inject = ['$scope', 'Boards', 'logger', 'Scopes', 'Patchwork'];
    function ChooseBoardCtrl($scope, Boards, logger, Scopes, Patchwork) {
        var vm = this;

        $scope.boards = [];

        $scope.init = init;
        $scope.pop = pop;
        $scope.push = push;
        $scope.next = next;
        $scope.getLayouts = getBoards;

        //methods
        function init(type) {
            if (!type) {
                Scopes.store('ChooseBoard', $scope);
            } else {
                return getBoards(type).then(function() {
                    logger.info('Activated Boards View');
                });
            }
        }

        function getBoards(type) {
            return Boards.getBoards(type).then(function(data) {
                if (data.data  && data.data.ok) {
                    $scope.boards = data.data.boards;
                    return $scope.boards;
                } else {
                    logger.error('Bad request - 404');
                }

            });
        }

        function pop() {
            var last = $scope.boards.pop();
            $scope.boards.unshift(last);
        }

        function push() {
            var first = $scope.boards.shift();
            $scope.boards.push(first);
        }

        function next(board) {
            Patchwork.setBoard(board);
            Scopes.get('Main').chBoard = false;
            Scopes.get('Main').chBlock = true;
            Scopes.get('Main').number += 1;
        }
    }
})();
