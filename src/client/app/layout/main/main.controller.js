(function () {

    'use strict';

    angular.module('app.layout')
        .controller('Main', Main);

    Main.$inject = ['$scope', 'Element', 'Polygon'];

    function Main($scope, Element, Polygon) {

    //fase 1
    $scope.type = '';

    //fase 2
    $scope.patchwork = {
        type: '',
        boardName: ''
    };

    //Fase 3 e 4
    $scope.board = {
        pInit: [0, 0],
        i: 4,
        j: 3,
        size: 'x',
        name: ''
    };

    init();

    //methods
    function init() {
        $scope.number = 4;
    }


//        $scope.img = [
//            'http://www.lojapatchwork.com.br/produtos/AF6140-2_detp.jpg',
//            'http://www.lojapatchwork.com.br/produtos/AF6138-1_detp.jpg'
//        ];
//        $scope.element1 = {
//            id: '234sdu4',
//            img: '',
//            coordenates: [100, 0, 100, 100, 0, 100]
//        };
//        $scope.element2 = {
//            id: '23432u4',
//            img: '',
//            coordenates: [200, 100, 200, 200, 100, 200]
//        };
//        $scope.circle = {
//            id: 'circle2',
//            img: '',
//            pInit: [100, 100],
//            radio: 20
//        };
//        $scope.rctl = {
//            id: 'rect1',
//            img: '',
//            pInit: [100, 100],
//            width: 100,
//            height: 50
//        };
//        $scope.path = {
//            id: 'pathsld',
//            pInit: [150, 150],
//            img: '',
//            path: 'c127,295,-1,1,282,12l-283,-11'
//        };
//        $scope.block = {
//            id: 'block1',
//            pInit: [200, 200],
//            name: 'bla',
//        };
//        $scope.group = {
//            id: '3123g2',
//            pInit: [300, 300],
//            width: 200,
//            height: 200,
//            name: ''
//        };

    }

})();
