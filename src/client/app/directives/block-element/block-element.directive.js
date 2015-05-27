(function () {
    'use strict';

    angular.module('app.directives')
        .directive('blockElem', function ($compile, $window, Board, Block) {
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
                    /*Board.create([200, 0], 0, 80, 7, 7)
                    var svgs = $window.document.getElementsByTagName('svg');
                    _.each(svgs, function (svg) {
                        el[0].appendChild(svg);
                    });*/
                    $compile(el)(scope);
                }
            }
        });
})();
