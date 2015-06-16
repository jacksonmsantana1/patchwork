(function () {
    'use strict';

    angular.module('app.models')
        .factory('GroupDao', GroupDao);

    GroupDao.$inject = ['$http'];
    function GroupDao($http) {
        return {
            getGroupElemByName: function (name) {
                //Provisorio
                return [
                        {
                            coord:  '(Px) (Py) ' +
                                    '(Px+(w/2)) (Py) ' +
                                    '(Px+(w/2)) (Py+h) ' +
                                    '(Px) (Py+h)',
                            img: '',
                            type: 'Polygon'
                        },
                        {
                            pInit: ['(Px+(w/2))', '(Py+(h/4))'],
                            width: 'w/4',
                            height: '(3*(h/4))',
                            type: 'Retangule'
                        },
                        {
                            pInit: ['(Px+(3*(w/4)))', '(Py)'],
                            width: 'w/4',
                            height: 'h',
                            type: 'Retangule'
                        },
                        {
                            pInit: ['(Px+(w/2))', '(Py)'],
                            name: '',
                            size: 'w/4',
                            type: 'Block'
                        }
                ];
            }
        };
    }

})();
