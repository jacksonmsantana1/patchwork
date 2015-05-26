(function () {

    'use strict';

	angular
        .module('app.layout')
    	  .controller('Main', Main);

    Main.$inject = ['$scope']
	function Main($scope) {
        $scope.img = [
            'http://www.lojapatchwork.com.br/produtos/AF6140-2_detp.jpg',
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQTcohScFo1-9y09nkaxwuFX0Y8dQD_dIoJDutOAiMXDMb_Z0xm',
            'http://www.tecidospatchwork.com.br/wp-content/uploads/2011/04/colecao-importada-FLOWER-DOLLS-FLD7128-CRE.jpg',
            'http://www.lojapatchwork.com.br/produtos/AF6138-1_detp.jpg'
        ];
    	$scope.elem = {
            width: 350,
            height: 350,
            id: 'bla',
            imgSrc: $scope.img[0]
        };
        $scope.elem2 = {
            width: 350,
            height: 350,
            id: 'bla',
            imgSrc: $scope.img[1]
        };
        $scope.points1 = '0 300,300 300,0 0';
        $scope.points2 = '300 0,300 300,0 0';
    };

})();
