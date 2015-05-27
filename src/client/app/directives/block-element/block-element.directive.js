(function () {
    'use strict';

    angular.module('app.directives')
        .directive('blockElem', function ($compile, $window, Board, Block, Element) {
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
                    Board.create([500, 200], 20, 50);
                    Element.createElement('1', [500, 500], 50, '(Px) (Py) (Px) (Py+x) (Px+x) (Py+x)');
                    Block.createEmptyBlock('11', [200, 200], 50, false);
                    var svgs = $window.document.getElementsByTagName('svg');
                    _.each(svgs, function (svg) {
                        el[0].appendChild(svg);
                    });
                    $compile(el)(scope);
                }
            }
        });
})();
