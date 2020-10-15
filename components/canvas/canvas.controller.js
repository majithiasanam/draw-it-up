/**
 * Controller for the drawing board canvas.
 *
 * This component is responsible for all functionalities available within
 * the drawing board itself:
 *      - Draw
 *      - Write
 *      - Highlight
 *      - Erase
 */
function DrawingBoardController(DrawingBoardSrvc, TOOLBOX_CONSTS) {
    // Reference to this controller function.
    var thisController = this;
    var offsetX = 0;
    var offsetY = 0;

    /**
     * Function that carries out the painting process within the canvas
     * in accordance with mouse movement.
     *
     * @param {Event} e The mousemove event during paint process
     */
    function draw(e) {
        ctx.lineTo(e.clientX - offsetX, e.clientY - offsetY);
        ctx.stroke();
        ctx.beginPath();
		ctx.moveTo(e.clientX - offsetX, e.clientY - offsetY);
    }

    this.highlight = function () {};

    this.erase = function () {};

    /**
     * Creates a canvas according to current window size.
     */
    function createCanvas() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }

    /**
     * Start the painting process in canvas
     *
     * @param {Event} e Mousedown event that signifies the start of painting process
     */
    function startPainting(e) {
        // TODO: change cursors for pen, highlighter etc. if possible
        // canvas.style.cursor = url();
        var pointerThickness = DrawingBoardSrvc.getLineWidth();
        ctx.lineWidth = pointerThickness;
        var tool = DrawingBoardSrvc.getCurrentTool();
        
        ctx.strokeStyle = DrawingBoardSrvc.getColor().name;
        ctx.lineCap = "round";
        
        if (tool === TOOLBOX_CONSTS.TOOLS.PEN.name) {
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation="source-over";
        }
        else if (tool === TOOLBOX_CONSTS.TOOLS.HIGHLIGHTER.name) {
            ctx.globalAlpha = 0.5;
            ctx.lineWidth = '5';
        } 
        else if (tool === TOOLBOX_CONSTS.TOOLS.ERASER.name) {
            ctx.globalCompositeOperation="destination-out";
            ctx.lineWidth = `${5*pointerThickness}`;
        }
        canvas.addEventListener("mousemove", draw);
        draw(e);
    }

    /**
     * End the painting process in canvas for current stroke.
     *
     * @param {Event} e Mouseup event that signifies the end of painting process
     */
    function stopPainting(e) {
        canvas.removeEventListener("mousemove", draw);
        ctx.beginPath();
    }

    //-------------------------- Initialization Logic ----------------------------------//
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");

    createCanvas();

    // Event listeners for user actions
    window.onresize = createCanvas;
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
}

angular
    .module("drawItUp")
    .controller("drawingBoardController", [
        "DrawingBoardSrvc",
        "TOOLBOX_CONSTS",
        DrawingBoardController,
    ]);
