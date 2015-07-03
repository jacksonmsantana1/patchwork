(function() {
    'use strict';

    angular.module('app.services')
        .factory('ReactFactory', ReactFactory);

    ReactFactory.$inject = ['React', '$window'];

    function ReactFactory(React, $window) {
        return {
            render: function(namespace, component, element, scope, attrs, scopes) {
                if (namespace) {
                    React.render(React.createElement($window[namespace][component], {
                        scope: scope,
                        attrs: attrs,
						scopes: scopes
                    }), element[0]);
                }
            },
            unmount: function(element) {
                React.unmountComponentAtNode(element[0]);
            }
        };
    }
})();
