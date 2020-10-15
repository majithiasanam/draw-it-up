/**
 * Independent angular component that can be used in HTML
 * to obtain a drawing board canvas. 
 */
function DrawingBoard() {
    return {
        template: '<div><canvas id="board"></canvas></div>',
        controller: 'drawingBoardController',
        controllerAs: 'drawingBoardCtrl',
        restrict: 'AE',
        replace: true,
        bindToController: {}
    };
}

angular
.module('drawItUp')
.directive('drawingBoard', DrawingBoard);