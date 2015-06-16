(function () {
    'use strict';

    angular.module('app.models')
        .factory('Group', Group);

    Group.$inject = ['Config', 'Evaluator', 'GroupDao', 'Element', 'Polygon', 'Retangule', 'Block'];
    function Group(Config, Evaluator,  GroupDao, Element, Polygon, Retangule, Block) {
        return function Group(newId, newPx, newPy, width, height, name) {
            //super()
            Config.extend(Config, Element);

            //init()
            Element.call(this, newId, newPx, newPy, '');
            var that = this;

            //private properties

            //public properties
            this.width = width || 'x';
            this.height = height || 'x';
            this.name = name;
            this.elements = getElements(name);

            init();

            //methods
            function init() {

            }

            function getElements(name) {
                var elements = GroupDao.getGroupElemByName(name);
                return _.map(elements, function (element, index) {
                    var id = that.id + 'G' + index;
                    switch (element.type) {
                        case 'Polygon':
                            return new Polygon(id, element.img,
                                                    Evaluator.evalateCoordenates(
                                                        [that.pInit[0], that.pInit[1]], element.coord,
                                                        0, that.width, that.height));
                        case 'Retangule':
                            return new Retangule(id,
                                                 Evaluator.evalateCoordenates(
                                                    [that.pInit[0], that.pInit[1]], element.pInit[0], 0,
                                                    that.width, that.height)[0],
                                                 Evaluator.evalateCoordenates(
                                                    [that.pInit[0], that.pInit[1]], element.pInit[1], 0,
                                                    that.width, that.height)[0],
                                                 element.img,
                                                 Evaluator.evalateCoordenates(
                                                    [that.pInit[0], that.pInit[1]], element.width, 0,
                                                    that.width, that.height)[0],
                                                 Evaluator.evalateCoordenates(
                                                    [that.pInit[0], that.pInit[1]], element.height, 0,
                                                    that.width, that.height)[0]);
                        case 'Block':
                            return new Block(id,
                                             Evaluator.evalateCoordenates(
                                                [that.pInit[0], that.pInit[1]], element.pInit[0], 0,
                                                that.width, that.height)[0],
                                             Evaluator.evalateCoordenates(
                                                [that.pInit[0], that.pInit[1]], element.pInit[1], 0,
                                                that.width, that.height)[0],
                                            element.name,
                                             Evaluator.evalateCoordenates(
                                                [that.pInit[0], that.pInit[1]], element.size, 0,
                                                that.width, that.height)[0]);
                        case 'Circle':
                            //TODO
                        case 'Path':
                            //TODO
                    }
                });
            }
        };
    }

})();
