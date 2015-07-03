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
        $scope.html = '';


        //getters and setters
        $scope.setPolygon = setPolygon;
        $scope.setPattern = setPattern;
        $scope.changeImage = changeImage;
		$scope.bindClickEvent = bindClickEvent;
		$scope.unbindClickEvent = unbindClickEvent;
        $scope.removeElement = removeElement;
        $scope.moveImg = moveImg;

        //methods
        function setPolygon(coord) {
            $scope.svg.polygon = Drawer.svg.polygon(coord).attr('fill', $scope.svg.pattern);
        }

        function setPattern(img) {
            $scope.svg.pattern = Drawer.svg
            .image(img || Config.img[0], $scope.element.coordenates[0], $scope.element.coordenates[1], Config.imgSize, Config.imgSize)
            .pattern($scope.element.coordenates[0], $scope.element.coordenates[1], Config.imgSize, Config.imgSize);
        }

		function bindClickEvent(fn) {
			$scope.svg.polygon.click(fn);
		}

		function unbindClickEvent() {
			$scope.svg.polygon.unclick();
		}

        function changeImage(img) {
            $scope.svg.pattern.remove();
            setPattern(img);
            $scope.svg.polygon.attr('fill', $scope.svg.pattern);
            $scope.element.img = img;
        }

        function removeElement(element, html){
            html.remove();
			unbindClickEvent();
            element.polygon.remove();
            element.pattern.remove();
        }

        function moveImg() {
            //TODO
        }
    }
})();
