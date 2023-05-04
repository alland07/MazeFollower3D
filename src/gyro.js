import DataPoint from "./models/dataPoint";
let gyroscope = new Gyroscope({ frequency: 60 });
const dataPoint = new DataPoint();

gyroscope.addEventListener("reading", (e) => {
    dataPoint.pushValue(gyroscope.x, gyroscope.y, gyroscope.z);
}); 

gyroscope.addEventListener("error", (e) => {
  // alert('Gyro not working');
});

gyroscope.start();

export const gyroValues = () => {
  const {x, y, z} = dataPoint.getDataFilter();
  return {x,y,z}
}
