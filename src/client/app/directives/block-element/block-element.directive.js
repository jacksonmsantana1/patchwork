(function () {
    'use strict';

    angular.module('app.directives')
        .directive('blockElem', function ($compile, Board) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    id: '=',
                    width: '=',
                    height: '=',
                    img: '='
                },
                templateUrl: '/src/client/app/directives/block-element/block-element.html',
                link: function (scope, el, attrs, ctrl) {
                    /*var svg = Snap(scope.width, scope.height);
                    svg.id = scope.id;

                    var polygon1 = svg.polygon('0 50 100 0 100 100 0 150')
                        .attr({fill: 'silver'});

                    var polygon2 = svg.polygon('100 0 200 50 200 150 100 100')
                        .attr({fill: 'silver'});

                    var polygon3 = svg.polygon('0 150 100 100 200 150 100 200')
                        .attr({fill: 'silver'});

                    var img1 = svg.image(scope.img, 0, 0, scope.width, scope.height);
                    var g1 = svg.group(polygon1);
                    img1.attr({mask: g1});

                    var img2 = svg
                        .image('http://www.tecidospatchwork.com.br/wp-content/uploads/2011/04/colecao-importada-FLOWER-DOLLS-FLD7128-CRE.jpg',
                                 0, 0, scope.width, scope.height);
                    var g2 = svg.group(polygon2);
                    img2.attr({mask: g2});

                    var img3 = svg.image('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQTcohScFo1-9y09nkaxwuFX0Y8dQD_dIoJDutOAiMXDMb_Z0xm', 0, 0, scope.width, scope.height);
                    var g3 = svg.group(polygon3);
                    img3.attr({mask: g3});*/
                    var board = Board.create([0, 0], 20, 500, 2, 2);
                    $compile(el)(scope);
                }
            }
        });
})();
