function DrawingBoardService(TOOLBOX_CONSTS) {

    // Reference to this service
    var thisService = this;
    
    this.currentTool = TOOLBOX_CONSTS.TOOLS.PEN.name;
    this.lineWidth = TOOLBOX_CONSTS.MARKER_SIZES.THREE_PX;
    this.color = TOOLBOX_CONSTS.COLORS.BLACK;

    this.setCurrentTool = function(toolName) {
        thisService.currentTool = toolName;
    }

    this.getCurrentTool = function() {
        return thisService.currentTool;
    }

    this.setLineWidth = function(thickness) {
        thisService.lineWidth = thickness;
    }

    this.getLineWidth = function() {
        return thisService.lineWidth;
    }

    this.setColor = function(color) {
        thisService.color = color;
    }

    this.getColor = function() {
        return thisService.color;
    }
}

angular
.module('drawItUp')
.service('DrawingBoardSrvc', ['TOOLBOX_CONSTS', DrawingBoardService])