import DataPoint from "./dataPoint";

let gyroscope = new Gyroscope({ frequency: 60 });


gyroscope.addEventListener("reading", (e) => {
    //
});

gyroscope.addEventListener("error", (e) => {
  // alert('Gyro not working');
});

gyroscope.start();

export const gyroValues = () => {
  const dataPoint = new DataPoint();
  return {
    x: gyroscope.x,
    y: gyroscope.y,
    z: gyroscope.z
  }
}
