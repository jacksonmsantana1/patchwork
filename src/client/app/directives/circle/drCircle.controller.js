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
        $scope.html = '';

        //getters and setters
        $scope.setCircle = setCircle;
        $scope.setPattern = setPattern;
        $scope.changeImage = changeImage;
        $scope.removeElement = removeElement;
        $scope.moveImg = moveImg;
        $scope.resizeElement = resizeElement;


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
           	html.remove();
            element.circle.remove();
            element.pattern.remove();
        }

        function moveImg() {
            //TODO
        }

        function resizeElement(x) {
            //TODO
        }
    }
})();

