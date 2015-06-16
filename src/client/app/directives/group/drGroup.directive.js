(function () {
    'use strict';

    angular.module('app.directives')
        .directive('group', GroupDrct);

    GroupDrct.$inject = ['Config', 'Group', '$compile', 'Polygon'];
    function GroupDrct(Config, Group, $compile, Polygon) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                group: '='
            },
            controller: 'GroupCtrl',
            link: function postLink ($scope, elem, attrs) {
                init($scope, elem);
            }
        };
        /////////////////////////////

        function init($scope, elem){
            $scope.model = new Group($scope.group.id,
                                    $scope.group.pInit[0],
                                    $scope.group.pInit[1],
                                    $scope.group.width,
                                    $scope.group.height, $scope.group.name);
            $scope.html = elem[0];

            _.each($scope.model.elements, function (element, index) {
                var el;
                if (element.constructor.name === 'Polygon') {
                    el = $compile('<polygon element="model.elements['+index+']"></polygon>')($scope);
                    elem.append(el);
                } else if (element.constructor.name === 'Block') {
                    el = $compile('<block block="model.elements['+index+']"></block>')($scope);
                    elem.append(el);
                } else if (element.constructor.name === 'Retangule') {
                    el = $compile('<rect element="model.elements['+index+']"></rect>')($scope);
                    elem.append(el);
                } else if (element instanceof Circle) {
                    //TODO
                } else if (element instanceof Path) {
                    //TODO
                }
            });

        }

        //?
        function unbindWatcher($scope) {
            return $scope.$watch(
                'element',
                function( newClickCount ) {});
        }

    }
})();
