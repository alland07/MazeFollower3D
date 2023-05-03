let gyroscope = {x : 0, y: 0, z: 0}

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (event) {
       // tilt([event.beta, event.gamma]);
    }, true);
} else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function (event) {
      //  tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
    }, true);
} else {
    window.addEventListener("MozOrientation", function (orientation) {
        gyroscope.x = orientation.x
        gyroscope.y = orientation.y
        gyroscope.y = orientation.z
    }, true);
}


export default gyroscope


