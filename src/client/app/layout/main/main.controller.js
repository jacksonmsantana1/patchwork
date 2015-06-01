(function () {

    'use strict';

    angular.module('app.layout')
        .controller('Main', Main);

    Main.$inject = ['$scope'];

    function Main($scope) {
        $scope.img = [
            'http://www.lojapatchwork.com.br/produtos/AF6140-2_detp.jpg',
            'http://www.lojapatchwork.com.br/produtos/AF6138-1_detp.jpg'
        ];
        $scope.coordenates = '(Px) (Py) (Px+x) (Py) (Px) (Py+(x*0.333333333))';
        $scope.coordenates2 = '(Px+x) (Py) (Px) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.333333333))';
        $scope.size = 200;
        $scope.pX = '10';
        $scope.pY = '10';
        $scope.layout = 'dfsd';
    }

})();
