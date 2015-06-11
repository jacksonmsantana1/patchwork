(function () {
    'use strict';

    angular.module('app.models')
        .factory('BlockDao', BlockDao);

    BlockDao.$inject = ['$http'];
    function BlockDao($http) {
        return {
            getBlock: function (name) {
                //Provisorio
                return [
                    {
                        coordenates: '(Px) (Py) (Px+x) (Py) (Px) (Py+(x*0.333333333))',
                        img: 'http://mlb-s1-p.mlstatic.com/' +
                        'corte-tecido-importado-patchwork-pink-rosas-quilting' +
                        '-fantasy-14178-MLB3238135558_102012-F.jpg',
                        group: 1,
                        elementType: 'Polygon'
                    },
                    {
                        coordenates: '(Px) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.333333333)) (Px) (Py+(x*0.666666667))',
                        img: 'http://mlb-s1-p.mlstatic.com/' +
                        'corte-tecido-importado-patchwork-pink-rosas-quilting' +
                        '-fantasy-14178-MLB3238135558_102012-F.jpg',
                        group: 1,
                        elementType: 'Polygon'
                    },
                    {
                        coordenates: '(Px) (Py+(x*0.666666667)) (Px+x) (Py+(x*0.666666667)) (Px) (Py+x)',
                        img: 'http://mlb-s1-p.mlstatic.com/' +
                        'corte-tecido-importado-patchwork-pink-rosas-quilting' +
                        '-fantasy-14178-MLB3238135558_102012-F.jpg',
                        group: 1,
                        elementType: 'Polygon'
                    },
                    {
                        coordenates: '(Px+x) (Py) (Px) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.333333333))',
                        img: 'http://mlb-s2-p.mlstatic.com/' +
                        'corte-tecido-importado-patchwork-vinho-trelica-flor-quilting-' +
                        '14259-MLB195704781_1434-F.jpg',
                        group: 2,
                        elementType: 'Polygon'
                    },
                    {
                        coordenates: '(Px+x) (Py+(x*0.333333333)) (Px+x) (Py+(x*0.666666667))' +
                                        ' (Px) (Py+(x*0.666666667))',
                        img: 'http://mlb-s2-p.mlstatic.com/' +
                        'corte-tecido-importado-patchwork-vinho-trelica-flor-quilting-' +
                        '14259-MLB195704781_1434-F.jpg',
                        group: 2,
                        elementType: 'Polygon'
                    },
                    {
                        coordenates: '(Px+x) (Py+(x*0.666666667)) (Px+x) (Py+x) (Px) (Py+x)',
                        img: 'http://mlb-s2-p.mlstatic.com/' +
                        'corte-tecido-importado-patchwork-vinho-trelica-flor-quilting-' +
                        '14259-MLB195704781_1434-F.jpg',
                        group: 2,
                        elementType: 'Polygon'
                    },
                ];
            }
        };
    }

})();
