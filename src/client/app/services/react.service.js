(function () {
    'use strict';

    angular.module('app.services')
        .factory('React', React);

    React.$inject = ['$window'];
    function React($window) {

        // Get a local handle on the global lodash reference.
        var react = $window.React;

        //OPTIONAL
        //delete($window.React);


        // Return the [formerly global] reference so that it can be injected
        // into other aspects of the AngularJS application.
        return(react);
    }
})();
