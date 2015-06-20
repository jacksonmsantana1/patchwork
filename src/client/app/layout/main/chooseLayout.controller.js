(function () {

    'use strict';

    angular.module('app.layout')
        .controller('ChooseLayoutCtrl', ChooseLayoutCtrl);

    ChooseLayoutCtrl.$inject = ['$scope'];

    function ChooseLayoutCtrl($scope) {
        var vm = this;

        $scope.layout = [];

        init();

        //methsods
        function init() {

        }
    }

})();
