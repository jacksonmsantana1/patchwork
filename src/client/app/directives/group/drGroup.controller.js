(function () {
    'use strict';

    angular.module('app.directives')
        .controller('GroupCtrl', GroupCtrl);

    GroupCtrl.$inject = ['$scope','$compile', 'Scopes'];
    function GroupCtrl ($scope, $compile, Scopes) {
        var vm = this;

        init();

        //Getters and setters
        $scope.init = init;
		$scope.removeGroup = removeGroup;

        //methods
        function init(done) {
			var elements = [];
			_.each($scope.group.elements, function (element, index) {
                var el;
                if (element.constructor.name === 'Polygon') {
                    el = $compile('<polygon element="group.elements['+index+']"></polygon>')($scope);
                    elements.push(el);
                } else if (element.constructor.name === 'Block') {
                    el = $compile('<block block="group.elements['+index+']"></block>')($scope);
                    elements.push(el);
                } else if (element.constructor.name === 'Retangule') {
                    el = $compile('<rect element="group.elements['+index+']"></rect>')($scope);
                    elements.push(el);
                } else if (element.constructor.name === 'Circle') {
                    el = $compile('<circle element="group.elements['+index+']"></circle>')($scope);
                    elements.push(el);
                } else if (element.constructor.name === 'Path') {
                    el = $compile('<path element="group.elements['+index+']"></path>')($scope);
                    elements.push(el);
                }
                if ($scope.group.elements.length === index +1) {
                    done(elements);
                }
            });
        }

        function removeGroup(element) {
            element.remove();
            Scopes.remove($scope.group.id);
        }

    }
})();
