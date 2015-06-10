(function () {

    'use strict';

    angular.module('app.layout')
        .controller('Main', Main);

    Main.$inject = ['$scope', 'Element', 'Polygon'];

    function Main($scope, Element, Polygon) {
        $scope.img = [
            'http://www.lojapatchwork.com.br/produtos/AF6140-2_detp.jpg',
            'http://www.lojapatchwork.com.br/produtos/AF6138-1_detp.jpg'
        ];

        $scope.element1 = new Polygon('234sdu4', 0, 0, '', '100 0 100 100 0 100');
        $scope.element2 = new Polygon('23432u4', 0, 0, '', '200 100 200 200 100 200');
    }

})();
