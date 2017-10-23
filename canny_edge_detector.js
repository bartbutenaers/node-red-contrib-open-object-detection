module.exports = function(RED) {
    "use strict";
    var cv   = require('opencv.js');
    var jpeg = require('jpeg-js');
    var fs   = require('fs');

    function CannyEdgeDetectorNode(config) {
        RED.nodes.createNode(this,config);

        var busy = false;
         
        var node = this;
                 
        this.on("input",function(msg) {        
            var buffer = msg.payload;
            
            
            var startTimestamp = Date.now();
            
            // TODO create encoder en decoder node
            // TODO check performance of Canny on other platforms
            // TODO try catch toevoegen (anders blijf de busy variable hangen)
            // TODO controleren of we best een raw image ofwel een matrix doorgeven.  Wordt de rawimage nog voor andere zaken gebruikt ??
            // TODO waarom eerst traag ???  8631 1333  1103  591 568 (zie screenshot) voor een resolutie van 400x400
            // Op deze site krijgen ze veel meer througput bij hogere resolutie: https://www.raspberrypi.org/forums/viewtopic.php?t=176697#p1127148
            // Bij hun wordt er wel meer cpu verbruikt ??
           
            // Don't process multiple images simultaneously, to avoid segmentation errors
            if (busy) {
                return;
            }
            
            node.status({fill:"blue",shape:"ring",text:"started"});
            
            busy = true;
            
            if (!Buffer.isBuffer(buffer)) {
                buffer = Buffer.from(buffer);
            }
 
             // Load an image (into a buffer)
            //var jpeg_data = fs.readFileSync("/home/pi/.node-red/node_modules/node-red-contrib-object-detection/lady.jpg");
            
            // Decode the jpeg image into a raw image 
            var raw_data = jpeg.decode(buffer/*jpeg_data*/);
             
            // Create a matrix from image. input image expected to be in RGBA format
            var inputMatrix = cv.matFromImageData(raw_data);
            cv.cvtColor(inputMatrix, inputMatrix, cv.COLOR_RGBA2GRAY); // Convert to grayscale
             
            var outputMatrix = new cv.Mat();
            cv.Canny(inputMatrix, outputMatrix, 50, 150);
            cv.cvtColor(outputMatrix, outputMatrix, cv.COLOR_GRAY2RGBA); // Convert back to RGBA to display
            
            // Convert the matrix back to a raw image
            raw_data = {
              data: outputMatrix.data,
              width: outputMatrix.size().width,
              height: outputMatrix.size().height
            };
            
            // Encode the raw image back to a jpeg image
            var jpeg_data = jpeg.encode(raw_data, 50);
            
            var duration = Date.now() - startTimestamp;
            var statusText = "ended (" + duration + "msec)";
            node.status({fill:"blue",shape:"ring",text:statusText});
            
            node.send( {payload: jpeg_data.data} );
            
            busy = false;
            
            // Save the jpeg image
            //fs.writeFileSync("/home/pi/.node-red/node_modules/node-red-contrib-object-detection/out_img.jpg", jpeg_data.data);
        });
    }

    RED.nodes.registerType("canny-edge-detector", CannyEdgeDetectorNode);
}
