angular
.module('drawItUp')
.constant('TOOLBOX_CONSTS', {
    TOOLS: {
        PEN: {
            name: 'Pen',
            iconClass: 'fa-pen-fancy'
        },
        HIGHLIGHTER: {
            name: 'Highlighter',
            iconClass: 'fa-highlighter'
        },
        ERASER: {
            name: 'Eraser',
            iconClass: 'fa-eraser'
        }
    },
    COLORS: {
        RED: {
            name: 'red',
            rgb: [255, 0, 0]
        },
        GREEN: {
            name: 'green',
            rgb: [0, 255, 0]
        },
        BLUE: {
            name: 'blue',
            rgb: [0, 0, 255]
        },    
        BLACK: {
            name: 'black',
            rgb: [0, 0, 0]
        }
    },
    MARKER_SIZES: {
        ONE_PX: {
            size: '1',
            iconClass: 'one-pixel'
        },
        THREE_PX: {
            size: '3',
            iconClass: 'three-pixel'
        },
        FIVE_PX: {
            size: '5',
            iconClass: 'five-pixel'
        }
    }
})