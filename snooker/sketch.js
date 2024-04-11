var pins = [];
var holes = [];
var cur;
var whitePin;

var powerMeter;


// canavs & table
var W=600;
var L=300;

// Max length on the line of the cue
var max_length=230;
//Shrink force of the cur based on line drawn
var STRIKE_FACTOR=10;

// Color of the pins
var colors = {
    ROD: {
        color: [218,165,32],
        stripped: false
    },
    TEAL: {
        color: [0,128,128],
        stripped: false
    },
    RED: {
        color: [178,34,34],
        stripped: false
    },
    ORCHID: {
        color: [153,50,204],
        stripped: false
    },
    KHAKI: {
        color: [240,230,140],
        stripped: false
    },
    SEAGREEN: {
        color: [143,188,143],
        stripped: false
    },
    Cyan: {
        color: [0,255,255],
        stripped: false
    },
    BLACK: {
        color: [0, 0, 0],
        stripped: false
    },
    STRIPPED_ROD: {
        color: [255, 246, 0],
        stripped: true
    },
    STRIPPED_TEAL: {
        color: [0, 29, 255],
        stripped: true
    },
    STRIPPED_RED: {
        color: [178,20,20],
        stripped: true
    },
    STRIPPED_PINK: {
        color: [255, 0, 255],
        stripped: true
    },
    STRIPPED_KHAKI: {
        color: [240,200,120],
        stripped: true
    },
    STRIPPED_GREEN: {
        color: [0, 255, 0],
        stripped: true
    },
    STRIPPED_Cyan: {
        color: [0,150,255],
        stripped: true
    },
    WHITE: {
        color: [255, 255, 255],
        stripped: false
    }
}

function setup() {
    //background(0);
    createCanvas(W, L);
    
    
    // Place white Pin in the initial shape
    pins.push(new Pin(W/4-20, L/2, 11, colors["WHITE"]));

    var rows = 0;
    var col = 0;
    var cnt = 0;
    for (var rows=0; rows<=5; rows++) {
        for (var col=0; col<rows; col++) {
            cnt++;
            var x = (W/2+140 + col*20) - (20*rows*1.0)
            var y = 200 - 20*rows*0.1-40 ;
            var colorKey = Object.keys(colors)[cnt-1]
            var color = colors[colorKey];
            pins.push(new Pin(x, y , cnt, color));
        }
    }

    // Place holes
    holes.push(new Hole(0, 0,   25));
    holes.push(new Hole(W/2, 0, 25));
    holes.push(new Hole(0, L,   25));
    holes.push(new Hole(W, 0,   25));
    holes.push(new Hole(W/2, L, 25));
    holes.push(new Hole(W, L,   25));
    console.log(holes);

    whitePin = pins[0];

    //With helper line
    cur = new Cur(true);
}

function draw() {
    background(21,88,67);
    strokeWeight(1.5);
    frameRate(60);
    
    // Reset pin state
    for (var i=0; i< pins.length; i++) {
        pins[i].collided = false;
    }

    // Check pins collision and react them accordingly
    for (var i=0; i < pins.length - 1; i++) {
        for (var j=i+1; j < pins.length; j++) {
            if (pins[i].isColliding(pins[j])) {
                pins[i].collideWithOtherPin(pins[j]);
            }
        }
    }

    // Move each pin with velocity
    for (var i=pins.length - 1; i>=0 ; i--) {
        pins[i].move();
        // Don't remove the white Pin
        if (i > 0 && pins[i].isPotted(holes)) {
            pins.splice(i, 1);
        } else {
            pins[i].show();
        }
    }

    // Show holes
    for (var i=0; i< holes.length; i++) {
        holes[i].show();
    }

    // Handle cur
    cur.move(whitePin, mouseX, mouseY);
    cur.show();
    

}


function keyPressed() {
    switch (keyCode) {

        case 32: //space : stop white Pin
            whitePin.vel.x = 0;
            whitePin.vel.y = 0;
        break;
        case 53: //s: replace white Pin
            whitePin.vel.x = 0;
            whitePin.vel.y = 0;
            whitePin.pos.x = W/2 - 10;
            whitePin.pos.y = 400;
        default:
            console.log("key code", keyCode);
            break;
    }
}

// Hook for the mouse clicked by the user
function mousePressed() {
    // Strike the white Pin with the cue
    cur.strike(whitePin);
}
