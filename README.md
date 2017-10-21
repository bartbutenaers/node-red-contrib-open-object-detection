# node-red-contrib-opencv-js
Node-Red node for exposing OpenCv functionality in Node-Red

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


