(function () {
    'use strict';

    angular.module('app.directives')
        .controller('PathCtrl', PathCtrl);

    PathCtrl.$inject = ['$scope', 'Drawer', 'Config'];
    function PathCtrl ($scope, Drawer, Config) {
        var vm = this;
        var pattern, path;

        $scope.svg = {
            pattern: pattern,
            polygon: path
        };
        $scope.html = '';

        init();

        //getters and setters
        $scope.setPath = setPath;
        $scope.setPattern = setPattern;
        $scope.changeImage = changeImage;
        $scope.removeElement = removeElement;
        $scope.moveImg  = moveImg;
        $scope.resizeElement = resizeElement;

        //methods
        function setPath(px, py, path) {
            $scope.svg.path =  Drawer.svg.path('M' + px + ',' + py + path).attr('fill', $scope.svg.pattern);
        }

        function setPattern(img) {
            $scope.svg.pattern = Drawer.svg
            .image(img || Config.img[0], Config.imgX, Config.imgY, Config.imgSize, Config.imgSize)
            .pattern(Config.imgX, Config.imgY, Config.imgSize, Config.imgSize);
        }

        function changeImage(img) {
            $scope.svg.pattern.remove();
            setPattern(img);
            $scope.svg.path.attr('fill', $scope.svg.pattern);
        }

        function removeElement(element, html){
            html.remove();
			element.path.unclick();
            element.path.remove();
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

