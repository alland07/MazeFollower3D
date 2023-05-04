import DataPoint from "./models/dataPoint";

const accel = new Accelerometer({ frequency: 60 });
const dataPoint = new DataPoint();

accel.addEventListener("reading", (e) => {
    dataPoint.pushValue(accel.x, accel.y, accel.z);
    dataPoint.derivate();
    getAccel();
}); 

accel.start();

const getAccel = () => {
  const {x,y,z} = dataPoint.getDataFilter();
  changeMesh(x,y,z);
}