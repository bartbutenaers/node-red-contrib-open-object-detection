# OpenCv

## What is OpenCv
OpenCv is a famous open source computer vision library, written in C++.  The library contains hundreds functions for image processing, video processing, object tracking, machine learning, transformations, matrix mathematics, ...

There exist also a series of small libraries written in Javscript.  But these have limited functionality, have a small community and are not always written for high performance.  As a result, I'm focussing on OpenCv for my image related functionalities in Node-Red.

## OpenCv installation
When searching through the internet, we will come across a lot of information about OpenCv installation procedures.  However we want to avoid that OpenCV needs to be installed manually, since that can become a rather complex process (e.g. on Raspberry Pi).
*Our goal is to install OpenCv automatically, as an NPM dependency.*
In the remaining of this article, both processes will be explained in technical detail.

### Manual installation (Native C++)
OpenCv has been developed in the C++ programming language.  To be able to run OpenCv on a device, the binaries (.exe, .dll, ...) should be build which can be executed on that device.  However OpenCv needs to be ***build on each platform*** that needs to be supported:
+ Windows 32 bit
+ Windows 64 bit
+ Linux 32 bit
+ Linux 64 bit
+ OSX 32 bit
+ OSX 64 bit
+ ...

At some websites, ***prebuild binaries*** will be available for some of those platforms, but obviously not all platforms will be available.  Moreover most of these binaries are obsolete, since they refer to old versions of OpenCv.

Suppose OpenCv needs to be run e.g. on a Raspberry PI, this means it needs to be build on a Raspberry PI.  And this might become a ***complex process*** (with lots of errors), especially with large C++ projects like OpenCv.  

Once the binaries have been build and installed, we need to be able to call the OpenCv functionality in our Node-Red node.  To avoid having to call the binaries directly from our node, it is easier to use ***Javascript bindings*** like for example [node-opencv](https://github.com/peterbraden/node-opencv).  These bindings offer a Javascript interface (classes, methods, ...) as a wrapper for the native binaries.  However they only provide a ***subset*** of the functionality of the OpenCv program.

### Automatic installation (Javascript)
As a result, the manual installation process is not very useful for a Node-Red contribution.  We need to be able to install OpenCv automatically, without asking our users to build C++ libraries manually.

The OpenCv community (supported by Intel) has recently developed a solution for this issue: the [OpenCv.js](https://docs.opencv.org/trunk/d5/d10/tutorial_js_root.html) project.  Summarized the ***C++ code is compiled once to Javascript***, which can be installed as dependency for our node and runs on every platform.  Our Node-Red users won't have to build anything, since the compilation is done in advance (e.g. by the OpenCv team).  The main goal of the OpenCv.js project is to run OpenCv in a browser, to make it available for web applications.

Let's analyse the compilation process in more detail: 
+ The C++ code is compiled to LLVM bitcode using Clang.
+ This LLVM bitcode is compiled to [asm.js](http://asmjs.org/) (or optionally to wasm) using Emscripten.  Asm.js is a subset of Javascript (see below).  *The result is a large opencv.js file of several Mbytes*.  Wasm (= WebAssembly) runs in the webasm runtime of the browser.  Wasm is currently an experimental technology, but it is being designed as an open standard by W3C.
+ The opencv.js file has been published on NPM via the [opencv.js node](https://www.npmjs.com/package/opencv.js).
+ That node can be added as a dependency to our Node-Red node, so the opencv.js file will be installed automatically.
+ The Node-Red node can now call all functionality from the opencv.js file.

If the opencv.js file on the NPM node should be outdated in the future, it might be required to execute the [compilation](https://docs.opencv.org/master/d4/da1/tutorial_js_setup.html) ourselves.  All (Python) scripts for this compilation are available on the [github project](https://github.com/ucisysarch/opencvjs) of the same team.  [Here](http://videocortex.io/2017/opencv-web-app/) is an other compilation process, based on the original OpenCv CMake scripts instead of the new Python scripts.

Note that OpenCv.js is only a ***subset of OpenCv***, which means it doesn't include all of the available OpenCv functionality: at the time of writing, OpenCv.js is based on OpenCV 3.3 and contains more than 50 classes and 800 functions (from core, image processing, vidoe processing, image codecs and machine learning).

The compiled Javascript code looks very similar to the orginal C++ code, as in this [example](http://www.ics.uci.edu/~sysarch/projects/snippets.html).

## Performance of Opencv.js
Since a lot of mathematics is involved in video processing, performance will be an issue.  Obviously the best performance will be achieved by calling the original native C++ libraries.  However the OpenCv team has put a lot of effort in optimizing the javascript code that will be generated by OpenCv.js.

***Asm.js*** enables ahead-of-time compilation and optimization in the JavaScript engine, to get an execution speed near to the native C++ binaries.  Asm.js is a [subset](https://www.sitepoint.com/understanding-asm-js/) of Javascript, which contains only the *highly optimizable* instructions: basically you can declare the type (int, float) and the js engine (in the browser and in NodeJs) will execute the instructions faster. This has benefits since OpenCv does a lot of calculations and graphics. Asm.js is regular javascript code, which will be normally compiled into bytecode by the JS interpreter. However when the Javascript interpreter has asm support, it will do ahead-of-time compilation (to generate more efficient code representation because of the static typing). 

***WebAssembly*** is a new size- and load-time-efficient binary format, suitable for compilation to the web. WebAssembly aims to execute at native speed. Wasm is supposed to be backwards-compatible, which means compilable to asm. It might however be extended with more features (compared to asm) in the future. 

The WebSight project has provided a [benchmark](https://websightjs.com/) to compare the performance of OpenCv.js in Javascript, asm and wasm.  From this comparison it becomes very obvious that *asm and wasm are much (around 10x) faster that standard Javascript*. The result has been analyzed in [detail](https://hacks.mozilla.org/2017/09/bootcamps-webassembly-and-computer-vision/).

## OpenCv.js history
OpenCV.js was initially created in Parallel Architectures and Systems Group at University of California Irvine (UCI), as a research project funded by Intel Corporation. OpenCV.js was further improved and integrated into the OpenCV project as part of Google Summer of Code 2017 program.
