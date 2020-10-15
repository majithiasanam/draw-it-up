function ToolBoxController(DrawingBoardSrvc, TOOLBOX_CONSTS) {

    // Reference to this controller
    var thisController = this;

    thisController.markerSizes = TOOLBOX_CONSTS.MARKER_SIZES;
    thisController.colors = TOOLBOX_CONSTS.COLORS;
    thisController.tools = TOOLBOX_CONSTS.TOOLS;

    thisController.changeToolSelection = function(toolname) {
        DrawingBoardSrvc.setCurrentTool(toolname);
    }

    thisController.changeColor = function(color) {
        DrawingBoardSrvc.setColor(color);
    }

    thisController.changeLineThickness = function(thickness) {
        DrawingBoardSrvc.setLineWidth(thickness);
    }

}

angular
.module('drawItUp')
.controller('toolBoxController', ['DrawingBoardSrvc', 'TOOLBOX_CONSTS', ToolBoxController]);