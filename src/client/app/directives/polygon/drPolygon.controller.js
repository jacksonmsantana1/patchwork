(function () {
    'use strict';

    angular.module('app.directives')
        .controller('PolygonCtrl', PolygonCtrl);

    PolygonCtrl.$inject = ['$scope', 'Drawer', 'Config'];
    function PolygonCtrl ($scope, Drawer, Config) {
        var vm = this;
        var pattern, polygon;

        $scope.svg = {
            pattern: pattern,
            polygon: polygon
        };
        $scope.model = {};
        $scope.html = '';

        init();

        //getters and setters
        $scope.setPolygon = setPolygon;
        $scope.setPattern = setPattern;
        $scope.changeImage = changeImage;
        $scope.removeElement = removeElement;

        //methods
        function init() {
            setPattern($scope.element.img);
            setPolygon($scope.element.coordenates);
        }

        function setPolygon(coord) {
            $scope.svg.polygon = Drawer.svg.polygon(coord).attr('fill', $scope.svg.pattern);
        }

        function setPattern(img) {
            $scope.svg.pattern = Drawer.svg
            .image(img || Config.img[0], Config.imgX, Config.imgY, Config.imgSize, Config.imgSize)
            .pattern(Config.imgX, Config.imgY, Config.imgSize, Config.imgSize);
        }

        function changeImage(img) {
            $scope.svg.pattern.remove();
            setPattern(img);
            $scope.svg.polygon.attr('fill', $scope.svg.pattern);
            $scope.model.img = img;
        }

        function removeElement(element, html){
            var son = html;
            var parent = son.parentNode;

            parent.removeChild(son);
            element.polygon.remove();
            element.pattern.remove();

            $scope.model = null;
        }
    }
})();
