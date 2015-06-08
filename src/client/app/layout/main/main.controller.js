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
        $scope.element = new Element('163u9', 0, 0);
        $scope.element.setImg($scope.img[0]);

        $scope.element2 = new Polygon('23432u4', 0, 0, '200 100 200 200 100 200');
        $scope.element2.setImg($scope.img[1]);
    }

})();
