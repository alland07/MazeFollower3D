import DataPoint from "./dataPoint";
let gyroscope = new Gyroscope({ frequency: 60 });
const dataPoint = new DataPoint();

gyroscope.addEventListener("reading", (e) => {
    dataPoint.push({x: gyroscope.x, y: gyroscope.y, z: gyroscope.z});
});

gyroscope.addEventListener("error", (e) => {
  // alert('Gyro not working');
});

gyroscope.start();

export const gyroValues = () => {
  const {x, y, z} = dataPoint.getDataFilter();
  alert(x,y,z);
  return {x,y,z}
}
