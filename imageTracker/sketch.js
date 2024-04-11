//sketch.js

let video;
let img;
let imageProcessing;

let redThresholdSlider;
let greenThresholdSlider;
let blueThresholdSlider;

let pixelatedSizeSlider;

let snapshot;
let snapshotButton;
let cancelButton;
let saveButton;

//grid setup
let frameW = 300;
let frameH = 200;
let frameX;
let frameY;

function setup(){
    createCanvas(1000, 1200);
    
    //Initialize all modules
    imageProcessing = new ImageProcessing();
    faceDetect = new FaceDetection();
    
    
    //all frame positioned from 0,0
    frameX = 0;
    frameY = 0;
    
    video = createCapture(VIDEO);
    video.hide();
    
    
//step 1 & 3: capture web cam    
    snapshotButton = createButton('Capture');
    snapshotButton.position(frameX, frameY+30);
    snapshotButton.mousePressed(takeSnapshot);
    
    //suppose to remove the snapshot and return webcam  
    cancelButton = createButton('Cancel');
    cancelButton.position(frameX, frameY+60);
    cancelButton.mousePressed(cancelSnapshot);
    
    saveButton = createButton('Save');
    saveButton.position(frameX, frameY + 90);
    saveButton.mousePressed(saveSnapshot);
    
    
    //upload an image from files  
    let input1 = createFileInput(handleFile);
    input1.position(frameX+600, frameY+5);
    
    
    //Step 7: Create sliders for threshold values
    redThresholdSlider = createSlider(0, 255, 50, 0);
    redThresholdSlider.position(frameX, frameY + 730);
    redThresholdSlider.size(300);

    greenThresholdSlider = createSlider(0, 255, 50, 0);
    greenThresholdSlider.position(frameX + frameW + 20, frameY + 730);
    greenThresholdSlider.size(300);
    
    blueThresholdSlider = createSlider(0, 255, 50, 0);
    blueThresholdSlider.position(frameX + 2 * (frameW + 20), frameY + 730);
    blueThresholdSlider.size(300);
    
    pixelatedSizeSlider = createSlider(0, 30, 0);
    pixelatedSizeSlider.position(frameX + frameW + 20, frameY + 1020);
    pixelatedSizeSlider.size(300);
    
    //Extension: Face detection counter
}

//continuously draw the video to frame
function draw(){
    background(255);
    
    //Text Label
    textSize(20);
    stroke(0);
    strokeWeight(5);
    fill(233,150,122);
    
    //Webcam Image
    image(video, frameX, frameY+30, frameW, frameH);
    text("webcam Image", frameX+80, frameY+20);

    
    //printing uploaded images with filter
    if(img){
        //Step 4: greyscale filter & brightness +20% (Display)
        let processedImg1 = imageProcessing.greyscaleFilter(img);
        image(processedImg1, frameX+320, frameY+30, frameW, frameH);
        text("GreyScale Filter", frameX+400, frameY+20);
        
        //step 6: split into three colour channels (R, G, B) 
        let redImg = imageProcessing.redChannel(img);
        image(redImg, frameX, frameY + frameH + 80, frameW, frameH);
        text("Red Filter", frameX+80, frameY+270);
        
        let greenImg = imageProcessing.greenChannel(img);
        image(greenImg, frameX + frameW + 20, frameY + frameH + 80, frameW, frameH);
        text("Green Filter", frameX+430, frameY+270);
        
        let blueImg = imageProcessing.blueChannel(img);
        image(blueImg, frameX + 2 * (frameW + 20), frameY + frameH + 80, frameW, frameH);
        text("Blue Filter", frameX+760, frameY+270);
        
        
        //Step 7: Perform image thresholding with a slider for each channel separately
        // Apply thresholding to each channel
        let redThreshold = redThresholdSlider.value();
        let greenThreshold = greenThresholdSlider.value();
        let blueThreshold = blueThresholdSlider.value();
        
        let redThresholdImg = imageProcessing.redThresholdFilter(redImg, redThreshold);
        image(redThresholdImg, frameX, frameY + frameH*2 + 110, frameW, frameH);
        text("Red Threshold", frameX+80, frameY+500);
        
        let greenThresholdImg = imageProcessing.greenThresholdFilter(greenImg, greenThreshold);
        image(greenThresholdImg, frameX + frameW + 20, frameY + frameH*2 + 110, frameW, frameH);
        text("Green Threshold", frameX+410, frameY+500);
        
        let blueThresholdImg = imageProcessing.blueThresholdFilter(blueImg, blueThreshold);
        image(blueThresholdImg, frameX + 2 * (frameW + 20), frameY + frameH*2 + 110, frameW, frameH);
        text("Blue Threshold", frameX+740, frameY+500);
        
        
        //Step 9: original Image upload
        image(img, 0, frameY + 820, frameW, frameH);
        text("Original copy", frameX+80, frameY+800);
        
        //colour space conversion: algorithm 1 (pixelate)
        let pixelatedSize = 15;//pixelatedSizeSlider.value();
        let pixelatedImg = imageProcessing.pixelateFilter(img, pixelatedSize);
        image(pixelatedImg, frameX + frameW + 20, frameY+820, frameW, frameH);
        text("Pixelated Image", frameX + 410, frameY + 800);
    }
    
    text("GreyScale Filter", frameX+400, frameY+20);
    
    text("Red Filter", frameX+80, frameY+270);
    text("Green Filter", frameX+430, frameY+270);
    text("Blue Filter", frameX+760, frameY+270);
    
    text("Red Threshold", frameX+80, frameY+500);
    text("Green Threshold", frameX+410, frameY+500);
    text("Blue Threshold", frameX+740, frameY+500);
    
    text("Original copy", frameX+80, frameY+800);
    text("Pixelated Image", frameX +410, frameY+800);
}

//captures current frame and display on the same frame
function takeSnapshot(){
    snapshot = video.get();
    image(snapshot, frameX, frameY, frameW, frameH);
}

//removes snapshot but remains on screen
function cancelSnapshot(){
    snapshot = null;
    return;
}

function saveSnapshot(){
    //if snapshot taken, save image
    if(snapshot){
        save(snapshot, 'screenshot.png');
        
    }
    else{
        console.log('take a snapshot first.');
    }
}

function handleFile(file){
    print(file);
    if(file.type === 'image'){
        // Create a new object to load the image data
        img = loadImage(file.data, function() {
            
            //Step 2: scale image
            img.resize(160, 120);

        });
    }
}
