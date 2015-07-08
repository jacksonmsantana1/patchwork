(function() {
    'use strict';

    angular.module('app.directives')
        .directive('drListBlock', ListBlock);

    ListBlock.$inject = ['ReactFactory', 'Scopes'];
    function ListBlock(ReactFactory, Scopes) {
        return {
            restrict: 'AE',
            templateUrl: 'src/client/app/directives/list-block/dr-list-block.html',
			controller: 'ListBlockCtrl',
            scope: {
                active: '='
            },
            link: function postLink($scope, elem, attrs) {
				Scopes.store('ListBlock', $scope);
				$scope.init();
                // Collect the elements attrs in a nice usable object
                var attributes = {};
                angular.forEach(elem[0].attributes, function(a) {
                    attributes[a.name.replace('data-','')] = a.value;
                });

                // Render the component when the directive loads
                ReactFactory.render('ReactComponents', attrs.component, elem, $scope, attributes, Scopes);

                // Watch the model and re-render the component
                $scope.$watch('active', function() {
                    ReactFactory.render(attrs.react, elem, $scope, attributes);
                }, true);

                // Unmount the component when the scope is destroyed
                var unbinder = $scope.$on('$destroy', function () {
					Scopes.remove('ListBlock');
                    ReactFactory.unmount(elem);
					unbinder();
					unbinder = null;
                });
            }
        };
    }
})();
