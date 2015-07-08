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
		$scope.moveImage = moveImage;
		$scope.bindClickEvent = bindClickEvent;
		$scope.unbindClickEvent = unbindClickEvent;
		$scope.bindMouseOverEvent = bindMouseOverEvent;
		$scope.unbindMouseOverEvent = unbindMouseOverEvent;
        $scope.removeElement = removeElement;
		$scope.rotateElement = rotateElement;

        //methods
        function setPolygon(coord) {
            $scope.svg.polygon = Drawer.svg.polygon(coord).attr('fill', $scope.svg.pattern);
        }

        function setPattern(img) {
            $scope.svg.pattern = Drawer.svg
            .image(img || Config.img[0], $scope.element.coordenates[0], $scope.element.coordenates[1], Config.imgSize, Config.imgSize)
            .pattern($scope.element.coordenates[0], $scope.element.coordenates[1], Config.imgSize, Config.imgSize);
        }

		//Bind Events Methods
		function bindClickEvent(fn) {
			$scope.svg.polygon.click(fn);
		}

		function unbindClickEvent() {
			$scope.svg.polygon.unclick();
		}

		function bindMouseOverEvent(fn) {
			$scope.svg.polygon.mouseover(fn);
		}

		function unbindMouseOverEvent() {
			$scope.svg.polygon.unmouseover();
		}

		//Image Methods
        function changeImage(img) {
            $scope.svg.pattern.remove();
            setPattern(img);
            $scope.svg.polygon.attr('fill', $scope.svg.pattern);
            $scope.element.img = img;
        }

		function moveImage() {
			//TODO
		}

		//Element Methods
        function removeElement(element, html){
            html.remove();
			unbindClickEvent();
			unbindMouseOverEvent();
            element.polygon.remove();
            element.pattern.remove();
        }

        function rotateElement(mediumPoint) {
			$scope.element.rotateAngle += 90;
			$scope.svg.polygon.animate( { transform: "r" + $scope.element.rotateAngle + ", " + mediumPoint[0] + ", " + mediumPoint[1] + ""}, 100);
		}
    }
})();
