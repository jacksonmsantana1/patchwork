(function () {
    'use strict';

    angular.module('app.directives')
        .directive('group', GroupDrct);

    GroupDrct.$inject = ['Config', 'Scopes'];
    function GroupDrct(Config, Scopes) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                group: '='
            },
            controller: 'GroupCtrl',
            link: function postLink ($scope, elem, attrs) {
                init();

                //Methods
                function init() {
                    Scopes.store($scope.group.id, $scope);
                    $scope.init(function (elements) {
                        _.each(elements, function (element) {
                            elem.append(element);
                        });
                    });
                }

                function onDestroy() {
                    $scope.$on('destroy', function () {
                        console.log('Group id:'+ $scope.model.id + 'destroyed');
                        $scope.removeGroup(elem);
                    });
                }
            }
        };
    }
})();
