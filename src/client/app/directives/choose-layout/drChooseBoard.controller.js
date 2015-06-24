(function () {
    'use strict';

    angular.module('app.directives')
        .controller('ChooseBoardCtrl', ChooseBoardCtrl);

    ChooseBoardCtrl.$inject = ['$scope', 'Boards', 'logger', 'Scopes'];
    function ChooseBoardCtrl($scope, Boards, logger, Scopes) {
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
                    logger.info('Activated Layouts View');
                });
            }
        }

        function getBoards(type) {
            return Boards.getBoards(type).then(function(data) {
                if (data  && data.ok) {
                    $scope.boards = data.boards;
                    return $scope.boards;
                } else {
                    logger.error('Bad request - 404');
                }

            });
        }

        function pop() {
            var last = $scope.boards.pop();
            $scope.layouts.unshift(last);
        }

        function push() {
            var first = $scope.boards.shift();
            $scope.layouts.push(first);
        }

        function next(board) {
            var Main = Scopes.get('Main');
            Main.patchwork.board = board;
            Main.number += 1;
        }
    }
})();
