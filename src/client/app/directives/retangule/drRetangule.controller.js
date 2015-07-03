(function () {
    'use strict';

    angular.module('app.directives')
        .controller('RetanguleCtrl', RetanguleCtrl);

    RetanguleCtrl.$inject = ['$scope', 'Drawer', 'Config'];
    function RetanguleCtrl ($scope, Drawer, Config) {
        var vm = this;
        var pattern, retangule;

        $scope.svg = {
            pattern: pattern,
            polygon: retangule
        };
        $scope.html = '';

        //getters and setters
        $scope.setPolygon = setPolygon;
        $scope.setPattern = setPattern;
        $scope.changeImage = changeImage;
        $scope.removeElement = removeElement;
        $scope.moveImg = moveImg;

        //methods
        function setPolygon(newPx, newPy, width, height) {
            $scope.svg.retangule = Drawer.svg.rect(newPx, newPy, width, height).attr('fill', $scope.svg.pattern);
        }

        function setPattern(img) {
            $scope.svg.pattern = Drawer.svg
            .image(img || Config.img[0], $scope.element.pInit[0], $scope.element.pInit[1], Config.imgSize, Config.imgSize)
            .pattern($scope.element.pInit[0], $scope.element.pInit[1], Config.imgSize, Config.imgSize);
        }

        function changeImage(img) {
            $scope.svg.pattern.remove();
            setPattern(img);
            $scope.svg.retangule.attr('fill', $scope.svg.pattern);
        }

        function removeElement(element, html){
			html.remove();
			element.retangule.unclick();
            element.retangule.remove();
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

