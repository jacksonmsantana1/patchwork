(function () {
    'use strict';

    angular.module('app.layout')
        .controller('ChooseTypeCtrl', ChooseTypeCtrl);

    ChooseTypeCtrl.$inject = ['$scope'];
    function ChooseTypeCtrl($scope) {
        var vm = this;

        $scope.type = [
            {
                value: 1,
                img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRL_IJ6y5UyQAMLdQIeNWYEirA9rElexrpWQZk-8UwE5yqBndiiRA',
            },
            {
                value: 2,
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTItZwJV39fFYXO_l6Y9it1FVS9lZog-uXPSFu5Lc-TiZPuQbSB',
            },
            {
                value: 3,
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR5wLmdAmM5v3C1jFIjhrD6S1cN8yHzagRr_Kvi5dAdCjaTcrFRNQ',
            },
            {
                value: 4,
                img: 'http://1.bp.blogspot.com/-vol88PwgjOI/UqHd14q8kGI/AAAAAAAAAGE/LgRvKrfti7w/s1600/molde+de+borboletas.gif',
            }
        ];
        $scope.click = click;
        $scope.pop = pop;
        $scope.push = push;
        $scope.next = next;

        //methods
        function click(number) {
            //
        }

        function pop() {
            var last = $scope.type.pop();
            $scope.type.unshift(last);
        }

        function push() {
            var first = $scope.type.shift();
            $scope.type.push(first);
        }

        function next(type) {
            $scope.$parent.number += 1;
            $scope.$parent.patchwork.type = type;
        }
    }
})();
