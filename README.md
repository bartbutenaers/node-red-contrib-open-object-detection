# node-red-contrib-opencv-js
Node-Red node for exposing OpenCv functionality in Node-Red

**THIS IS A TEST FOR USE OF ASM.JS AND WASM.JS IN NODE-RED.  DON'T USE IT YET !!!!!!!!!**

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-opencv-js
```
In contradiction to other OpenCv based nodes, there is **NO** need to install OpenCv manually!
Indeed, OpenCv will be installed automatically.  See [here](https://github.com/bartbutenaers/node-red-contrib-opencv-js/blob/master/OPENCV.MD) for more technical information about this process.

## Object detector
This node detects a specified object type in an input image:

![Object detector flow](https://raw.githubusercontent.com/bartbutenaers/node-red-contrib-opencv-js/master/images/opencv_object_detect.png)

```
[{"id":"c8dc99cf.676248","type":"http request","z":"57188ccd.92d204","name":"","method":"GET","ret":"bin","url":"https://cdn.imotions.com/wp-content/uploads/2013/07/Facial-Emotion-Recognition-Blog-Banner.jpg","tls":"","x":392.8333435058594,"y":640.6666641235352,"wires":[["2247d666.80b46a"]]},{"id":"e65fffc4.6e8b8","type":"inject","z":"57188ccd.92d204","name":"Start","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":236,"y":640,"wires":[["c8dc99cf.676248"]]},{"id":"2247d666.80b46a","type":"object-detector","z":"57188ccd.92d204","display":true,"name":"","x":581,"y":640,"wires":[["a22d53dc.9b837"]]},{"id":"a22d53dc.9b837","type":"file","z":"57188ccd.92d204","name":"","filename":"","appendNewline":true,"createDir":false,"overwriteFile":"false","x":741.76953125,"y":640.24609375,"wires":[]}]
```

In the config screen, specify which type(s) of objects should be detected:
+ eye
+ eye with glasses
+ frontal face
+ full body
+ lower body
+ eye pair big (high resolution)
+ eye pair small (low resolution)
+ left eye
+ mouth
+ nose
+ right eye
+ upper body
+ profile face
+ car side view
+ car front or back view

## Canny edge detector
This node executes canny edge detection in an input image:

![Canny edge detector flow](https://raw.githubusercontent.com/bartbutenaers/node-red-contrib-opencv-js/master/images/opencv_canny_edge_flow.png)

```
[{"id":"91d3cfc3.32c7b","type":"canny-edge-detector","z":"57188ccd.92d204","display":true,"name":"","x":774.5195579528809,"y":716.8476505279541,"wires":[["4b874347.1abe9c"]]},{"id":"22d23d7d.74b7e2","type":"inject","z":"57188ccd.92d204","name":"Start","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":402.01954650878906,"y":717.0039081573486,"wires":[["75d6b8ac.e240f8"]]},{"id":"75d6b8ac.e240f8","type":"file in","z":"57188ccd.92d204","name":"Load jpg file","filename":"/home/pi/.node-red/node_modules/node-red-contrib-object-detection/lady.jpg","format":"","chunk":false,"sendError":false,"x":571.5078430175781,"y":716.2656202316284,"wires":[["91d3cfc3.32c7b"]]},{"id":"4b874347.1abe9c","type":"file","z":"57188ccd.92d204","name":"Save jpg file","filename":"/home/pi/.node-red/node_modules/node-red-contrib-object-detection/out_img.jpg","appendNewline":false,"createDir":false,"overwriteFile":"true","x":982.5078105926514,"y":716.2617206573486,"wires":[]}]
```
The good thing is that it works, without having to install OpenCv on my Raspberry Pi 3.

The bad news is that it is even slower as I expected:
https://github.com/ucisysarch/opencvjs/issues/36  
