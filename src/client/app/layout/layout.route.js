(function() {
    'use strict';

    angular
        .module('app.layout')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'main',
                config: {
                    url: '/',
                    templateUrl: 'app/layout/main/main.html',
                    controller: 'Main',
                    title: 'main',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Main'
                    }
                }
            }
        ];
    }
})();
