(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-left';
    }

    var config = {
        appErrorPrefix: '[Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Patchwork Project',
        imageBasePath: '/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$compileProvider' , '$logProvider', 'exceptionHandlerProvider',
                         'routerHelperProvider'];
    /* @ngInject */
    function configure ($compileProvider, $logProvider,
                         exceptionHandlerProvider, routerHelperProvider) {

        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        configureStateHelper();

        ////////////////

        function configureStateHelper() {

            /*
            *   After implements the dataService to initialize the app with some initial config
            *   See dataService John Papa
            */
            var resolveAlways = {
                /* @ngInject */
                ready: function() {
                    return {};
                }
            };

            routerHelperProvider.configure({
                docTitle: 'Patchwork: ',
                resolveAlways: resolveAlways
            });
        }
    }
})();
