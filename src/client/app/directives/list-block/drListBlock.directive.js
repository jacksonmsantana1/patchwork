(function() {
    'use strict';

    angular.module('app.directives')
        .directive('drListBlock', ListBlock);

    ListBlock.$inject = ['React', 'ReactFactory'];
    function ListBlock(React, ReactFactory) {
        return {
            restrict: 'AE',
            templateUrl: 'src/client/app/directives/list-block/dr-list-block.html',
            scope: {
                active: '='
            },
            link: function postLink($scope, elem, attrs) {
                // Collect the elements attrs in a nice usable object
                var attributes = {};
                angular.forEach(elem[0].attributes, function(a) {
                    attributes[a.name.replace('data-','')] = a.value;
                });

                // Render the component when the directive loads
                ReactFactory.render('ReactComponents', attrs.component, elem, $scope, attributes);

                // Watch the model and re-render the component
                $scope.$watch('active', function() {
                    ReactFactory.render(attrs.react, elem, $scope, attributes);
                }, true);

                // Unmount the component when the scope is destroyed
                $scope.$on('$destroy', function () {
                    ReactFactory.unmount(elem);
                });
            }
        };
    }
})();
