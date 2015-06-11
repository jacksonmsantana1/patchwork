(function () {
    'use strict';

    angular.module('app.directives')
        .controller('CircleCtrl', CircleCtrl);

    CircleCtrl.$inject = ['$scope', 'Drawer', 'Config'];
    function CircleCtrl ($scope, Drawer, Config) {
        var vm = this;
        var pattern, circle;

        $scope.svg = {
            pattern: pattern,
            polygon: circle
        };
        $scope.model = {};
        $scope.html = '';

        init();

        //getters and setters
        $scope.setCircle = setCircle;
        $scope.setPattern = setPattern;
        $scope.changeImage = changeImage;
        $scope.removeElement = removeElement;

        //methods
        function init() {
            setPattern();
            setCircle($scope.element.pInit[0], $scope.element.pInit[1], $scope.element.radio);
        }

        //methods
        function setCircle(cx, cy, radio) {
            $scope.svg.circle = Drawer.svg.circle(cx, cy, radio).attr('fill', $scope.svg.pattern);
        }

        function setPattern(img) {
            $scope.svg.pattern  = Drawer.svg
            .image(img || Config.img[0], Config.imgX, Config.imgY, Config.imgSize, Config.imgSize)
            .pattern(Config.imgX, Config.imgY, Config.imgSize, Config.imgSize);
        }

        function changeImage(img) {
            $scope.svg.pattern.remove();
            setPattern(img);
            $scope.svg.circle.attr('fill', $scope.svg.pattern);
        }

        function removeElement(element, html){
            var son = html;
            var parent = son.parentNode;

            parent.removeChild(son);
            element.circle.remove();
            element.pattern.remove();
        }
    }
})();

