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
        $scope.model = {};
        $scope.html = '';

        init();

        //getters and setters
        $scope.init = init;
        $scope.setPolygon = setPolygon;
        $scope.setPattern = setPattern;
        $scope.changeImage = changeImage;
        $scope.removeElement = removeElement;
        $scope.moveImg = moveImg;

        //methods
        function init() {
            setPattern();
            setPolygon($scope.element.pInit[0], $scope.element.pInit[1], $scope.element.width, $scope.element.height);
        }

        function setPolygon(newPx, newPy, width, height) {
            $scope.svg.retangule = Drawer.svg.rect(newPx, newPy, width, height).attr('fill', $scope.svg.pattern);
        }

        function setPattern(img) {
            $scope.svg.pattern = Drawer.svg
            .image(img || Config.img[0], Config.imgX, Config.imgY, Config.imgSize, Config.imgSize)
            .pattern(Config.imgX, Config.imgY, Config.imgSize, Config.imgSize);
        }

        function changeImage(img) {
            $scope.svg.pattern.remove();
            setPattern(img);
            $scope.svg.retangule.attr('fill', $scope.svg.pattern);
        }

        function removeElement(element, html){
            var son = html;
            var parent = son.parentNode;

            parent.removeChild(son);
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

