(function () {
    'use strict';

    angular.module('app.directives')
        .controller('GroupCtrl', GroupCtrl);

    GroupCtrl.$inject = ['$scope', 'Drawer', 'Config', '$compile', 'Group', 'Scopes'];
    function GroupCtrl ($scope, Drawer, Config, $compile, Group, Scopes) {
        var vm = this;

        $scope.model = {
            id: '',
            pInit: [],
            name: '',
            width: 0,
            height: 0
        };
        $scope.elements = [];

        init();

        //Getters and setters
        $scope.init = init;

        //methods
        function init() {
            //See if we will use it
            //TODO
            //if (!Scopes.get($scope.block.id)) {
            //  Scopes.store($scope.block.id, $scope);
            //}
            $scope.model = new Group($scope.group.id,
                                     $scope.group.pInit[0],
                                     $scope.group.pInit[1],
                                     $scope.group.width,
                                     $scope.group.height, $scope.group.name);

            _.each($scope.model.elements, function (element, index) {
                var el;
                if (element.constructor.name === 'Polygon') {
                    el = $compile('<polygon element="model.elements['+index+']"></polygon>')($scope);
                    $scope.elements.push(el);
                } else if (element.constructor.name === 'Block') {
                    el = $compile('<block block="model.elements['+index+']"></block>')($scope);
                    $scope.elements.push(el);
                } else if (element.constructor.name === 'Retangule') {
                    el = $compile('<rect element="model.elements['+index+']"></rect>')($scope);
                    $scope.elements.push(el);
                } else if (element.constructor.name === 'Circle') {
                    el = $compile('<circle element="model.elements['+index+']"></circle>')($scope);
                    $scope.elements.push(el);
                } else if (element.constructor.name === 'Path') {
                    el = $compile('<path element="model.elements['+index+']"></path>')($scope);
                    $scope.elements.push(el);
                }
            });
        }

    }
})();
