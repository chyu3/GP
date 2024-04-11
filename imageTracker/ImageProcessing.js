//imageProcess.js
class ImageProcessing {
  constructor() {}
    
    //Step 4: Convert image to grayscale and increase the brightness by 20%
    greyscaleFilter(img){
        let imgOut = createImage(img.width, img.height);
        imgOut.loadPixels();
        img.loadPixels();
        
        for (let x = 0; x < imgOut.width; x++){
            for(let y = 0; y < imgOut.height; y++){
                let index = (x + y * imgOut.width) * 4;
                
                let r = img.pixels[index + 0];
                let g = img.pixels[index + 1];
                let b = img.pixels[index + 2];
                
                let gray = (r + g + b) / 3;
                
                //increase brightness by 20%
                let brightness = gray * 1.2;
                //brightness = min(brightness, 255);
                
                
                //Step 5: Clamp brightness value within 0 to 255 range
                brightness = constrain(brightness, 0, 255);
                
                imgOut.pixels[index] = brightness;
                imgOut.pixels[index + 1] = brightness;
                imgOut.pixels[index + 2] = brightness;
                imgOut.pixels[index + 3] = 255;
            }
            
        }
        
        imgOut.updatePixels();
        return imgOut;
    }
    
    
    //Step 6: Convert image to red channel only
      redChannel(img) {
        let redImg = createImage(img.width, img.height);
        redImg.loadPixels();

        img.loadPixels();

        for (let y = 0; y < img.height; y++) {
          for (let x = 0; x < img.width; x++) {
            let pixelIndex = (img.width * y + x) * 4;
            let pixelRed = img.pixels[pixelIndex + 0];

            redImg.pixels[pixelIndex + 0] = pixelRed;
            redImg.pixels[pixelIndex + 1] = 0;
            redImg.pixels[pixelIndex + 2] = 0;
            redImg.pixels[pixelIndex + 3] = 255;
          }
        }

        redImg.updatePixels();
        return redImg;
      }
    
     //Step 6: Convert image to green channel only
      greenChannel(img) {
        let greenImg = createImage(img.width, img.height);
        greenImg.loadPixels();

        img.loadPixels();

        for (let y = 0; y < img.height; y++) {
          for (let x = 0; x < img.width; x++) {
            let pixelIndex = (img.width * y + x) * 4;
            let pixelGreen = img.pixels[pixelIndex + 1];

            greenImg.pixels[pixelIndex + 0] = 0;
            greenImg.pixels[pixelIndex + 1] = pixelGreen;
            greenImg.pixels[pixelIndex + 2] = 0;
            greenImg.pixels[pixelIndex + 3] = 255;
          }
        }

        greenImg.updatePixels();
        return greenImg;
      }

    
    //Step 6: Convert image to blue channel only
      blueChannel(img) {
        let blueImg = createImage(img.width, img.height);
        blueImg.loadPixels();

        img.loadPixels();

        for (let y = 0; y < img.height; y++) {
          for (let x = 0; x < img.width; x++) {
            let pixelIndex = (img.width * y + x) * 4;
            let pixelBlue = img.pixels[pixelIndex + 2];

            blueImg.pixels[pixelIndex + 0] = 0;
            blueImg.pixels[pixelIndex + 1] = 0;
            blueImg.pixels[pixelIndex + 2] = pixelBlue;
            blueImg.pixels[pixelIndex + 3] = 255;
          }
        }

        blueImg.updatePixels();
        return blueImg;
      }
    
    
    //Step 7: thresholding
    // Threshold filter for red channel
      redThresholdFilter(img, threshold) {
        let imgOut = createImage(img.width, img.height);
        imgOut.loadPixels();

        img.loadPixels();

        for (let x = 0; x < imgOut.width; x++) {
          for (let y = 0; y < imgOut.height; y++) {
            let index = (x + y * imgOut.width) * 4;

            let r = img.pixels[index + 0];
            let g = img.pixels[index + 1];
            let b = img.pixels[index + 2];

            // Set the pixel to black if the red channel value is above the threshold
            // Otherwise, set the pixel to the original red channel value
            imgOut.pixels[index + 0] = r > threshold ? 0 : r;
            imgOut.pixels[index + 1] = r > threshold ? 0 : g;
            imgOut.pixels[index + 2] = r > threshold ? 0 : b;
            imgOut.pixels[index + 3] = 255; // Alpha channel

          }
        }
        imgOut.updatePixels();
        return imgOut;
      }
    
    
    // Green threshold filter
    greenThresholdFilter(img, threshold) {
        let imgOut = createImage(img.width, img.height);
        imgOut.loadPixels();

        img.loadPixels();

        for (let x = 0; x < imgOut.width; x++) {
          for (let y = 0; y < imgOut.height; y++) {
            let index = (x + y * imgOut.width) * 4;

            let r = img.pixels[index + 0];
            let g = img.pixels[index + 1];
            let b = img.pixels[index + 2];

            // Set the pixel to black if the green channel value is above the threshold
            // Otherwise, set the pixel to the original green channel value
            imgOut.pixels[index + 0] = g > threshold ? 0 : r;
            imgOut.pixels[index + 1] = g > threshold ? 0 : g;
            imgOut.pixels[index + 2] = g > threshold ? 0 : b;
            imgOut.pixels[index + 3] = 255; // Alpha channel
          }
        }
        imgOut.updatePixels();
        return imgOut;
    }
    
    // Blue threshold filter
      blueThresholdFilter(img, threshold) {
        let imgOut = createImage(img.width, img.height);
        imgOut.loadPixels();

        img.loadPixels();

        for (let x = 0; x < imgOut.width; x++) {
          for (let y = 0; y < imgOut.height; y++) {
            let index = (x + y * imgOut.width) * 4;

            let r = img.pixels[index + 0];
            let g = img.pixels[index + 1];
            let b = img.pixels[index + 2];

            // Set the pixel to black if the blue channel value is above the threshold
            // Otherwise, set the pixel to the original blue channel value
            imgOut.pixels[index + 0] = b > threshold ? 0 : r;
            imgOut.pixels[index + 1] = b > threshold ? 0 : g;
            imgOut.pixels[index + 2] = b > threshold ? 0 : b;
            imgOut.pixels[index + 3] = 255; // Alpha channel
          }
        }
        imgOut.updatePixels();
        return imgOut;
      }
    
    
    //Step 9: colour space conversion pixelated
    pixelateFilter(img, pixelatedSize) {
        let imgCopy = img.get(); // Create a copy of the original image
        imgCopy.loadPixels();
        img.loadPixels();

        for (let y = 0; y < imgCopy.height; y += pixelatedSize) {
            for (let x = 0; x < imgCopy.width; x += pixelatedSize) {
                let sumRed = 0;
                let sumGreen = 0;
                let sumBlue = 0;

                // Get the sum of RGB of that block
                for (let i = 0; i < pixelatedSize; i++) {
                    for (let j = 0; j < pixelatedSize; j++) {
                        let pixelIndex = ((imgCopy.width * (y + j)) + (x + i)) * 4;
                        sumRed += imgCopy.pixels[pixelIndex + 0];
                        sumGreen += imgCopy.pixels[pixelIndex + 1];
                        sumBlue += imgCopy.pixels[pixelIndex + 2];
                    }
                }

                // Calculate the average of RGB of that block
                let aveRed = sumRed / (pixelatedSize * pixelatedSize);
                let aveGreen = sumGreen / (pixelatedSize * pixelatedSize);
                let aveBlue = sumBlue / (pixelatedSize * pixelatedSize);

                // Paint the block with the average RGB value
                for (let i = 0; i < pixelatedSize; i++) {
                    for (let j = 0; j < pixelatedSize; j++) {
                        let pixelIndex = ((imgCopy.width * (y + j)) + (x + i)) * 4;
                        imgCopy.pixels[pixelIndex + 0] = aveRed;
                        imgCopy.pixels[pixelIndex + 1] = aveGreen;
                        imgCopy.pixels[pixelIndex + 2] = aveBlue;
                    }
                }
            }
        }
        imgCopy.updatePixels();
        return imgCopy;
    }

}
