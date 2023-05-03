let gyroscope = new Gyroscope({ frequency: 60 });

gyroscope.addEventListener("reading", (e) => {
  console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
  console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
  console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
});

gyroscope.addEventListener("error", (e) => {
  alert('Gyro not working');
});

gyroscope.start();


export default {x : gyroscope.x, y: gyroscope.y, z: gyroscope.z}


