(function () {
    'use strict';

    angular.module('app.directives')
        .directive('group', GroupDrct);

    GroupDrct.$inject = ['Scopes'];
    function GroupDrct(Scopes) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                group: '='
            },
            controller: 'GroupCtrl',
            link: function postLink ($scope, elem, attrs) {
                init();
				onDestroy();

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
                    var unbinder = $scope.$on('destroy', function () {
                        console.log('Group id:'+ $scope.group.id + 'destroyed');
                        $scope.removeGroup(elem);
						unbinder();
						unbinder = null;
                    });
                }
            }
        };
    }
})();
