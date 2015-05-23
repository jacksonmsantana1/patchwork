/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('Snap', Snap)
        .constant('API_URL', 'http://localhost:7203');
})();
