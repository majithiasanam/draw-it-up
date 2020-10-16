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

    
    /**
     * Creates a canvas according to current window size.
     */
    function createCanvas() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
    
    
    /**
     * 
     * @param {Object} p1 First point
     * @param {Object} p2 Second Point
     */
    function midPointBtw(p1, p2) {
        return {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y + (p2.y - p1.y) / 2,
        };
    }

    
    
    /**
     * Function that carries out the painting process within the canvas
     * in accordance with mouse movement.
     *
     * @param {Event} e The mousemove event during paint process
     */
    function draw(e) {
        
        paths[paths.length - 1].points.push({ x: e.clientX, y: e.clientY }); // Push current co-ordinates to active path

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas before re-draw

        // Draw each path afresh
        for (var i = 0; i < paths.length; i++) {

            var p1 = paths[i].points[0];
            var p2 = paths[i].points[1] ? paths[i].points[1] : paths[i].points[0];

            // Set context properties for current path
            ctx.globalAlpha = paths[i].properties.globalAlpha;
            ctx.globalCompositeOperation = paths[i].properties.globalCompositeOperation;
            ctx.lineWidth = paths[i].properties.lineWidth;
            ctx.strokeStyle = paths[i].properties.strokeStyle;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            // Draw current path as connected quadratic curves between points in path
            for (var j = 0; j < paths[i].points.length - 1; j++) {
                var midPoint = midPointBtw(p1, p2);
                ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                p1 = paths[i].points[j];
                p2 = paths[i].points[j + 1];
            }
            // Draw last line as a straight line 
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
        }
    }

    
    
    /**
     * Start the painting process in canvas
     *
     * @param {Event} e Mousedown event that signifies the start of painting process
     */
    function startPainting(e) {
        // TODO: change cursors for pen, highlighter etc. if possible
        ctx.lineJoin = ctx.lineCap = "round";
        
        var tool = DrawingBoardSrvc.getCurrentTool();
        var pathProperties = sketch();

        if (tool === TOOLBOX_CONSTS.TOOLS.PEN.name) {
            pathProperties = sketch();
        } else if (tool === TOOLBOX_CONSTS.TOOLS.HIGHLIGHTER.name) {
            pathProperties = highlight();
        } else if (tool === TOOLBOX_CONSTS.TOOLS.ERASER.name) {
            pathProperties = erase();
        }
        
        // New array for latest path with path properties
        var newPath = {
            'properties': pathProperties,
            'points': []
        };

        paths.push(newPath);
        paths[paths.length - 1].points.push({ x: e.clientX, y: e.clientY });

        // Register event listeners for draw operation
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("touchmove", draw);

        draw(e);
    }

    
    
    /**
     * End the painting process in canvas for current stroke.
     *
     * @param {Event} e Mouseup event that signifies the end of painting process
     */
    function stopPainting(e) {
        // Remove event listeners for draw operation
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("touchmove", draw);
    }


    /**
     * Returns context properties to be set for sketching operation
     */
    function sketch() {
        return {
            globalAlpha: 1,
            globalCompositeOperation: "source-over",
            lineWidth: DrawingBoardSrvc.getLineWidth(),
            strokeStyle: DrawingBoardSrvc.getColor().name
        }
    }


    /**
     * Returns context properties to be set for highlighting operation
     */
    function highlight() {
        return {
            globalAlpha: 0.5,
            lineWidth: "5",
            globalCompositeOperation: "source-over",
            strokeStyle: DrawingBoardSrvc.getColor().name
        }
    }


    /**
     * Returns context properties to be set for erasing operation
     */
    function erase() {
        return {
            globalAlpha: 1,
            globalCompositeOperation: "destination-out",
            lineWidth: `${5 * DrawingBoardSrvc.getLineWidth()}`,
            strokeStyle: DrawingBoardSrvc.getColor().name
        }
    }



    //-------------------------- Initialization ----------------------------------//
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");
    var paths = [];

    createCanvas();

    // Event listeners for user actions
    window.onresize = createCanvas;
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("touchstart", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("touchend", stopPainting);
}




//------------------ Controller Registration -------------------------//
angular
    .module("drawItUp")
    .controller("drawingBoardController", [
        "DrawingBoardSrvc",
        "TOOLBOX_CONSTS",
        DrawingBoardController,
    ]);
