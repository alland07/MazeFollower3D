import DataPoint from "./models/dataPoint";
import { changeMesh } from "./threeScene";

const accel = new Accelerometer({ frequency: 60 });
const dataPoint = new DataPoint();

accel.addEventListener("reading", (e) => {
  dataPoint.pushValue(accel.x, accel.y, accel.z);
  //dataPoint.derivate();
  getAccel();
}); 

accel.start();

const getAccel = () => {
  // const {x,y,z} = dataPoint.getDataFilter();

  const absoluteX = Math.abs(accel.x);
  const absoluteY = Math.abs(accel.y);
  const absoluteZ = Math.abs(accel.z);

  changeMesh(absoluteX,absoluteY,absoluteZ);

  if (absoluteX > 20 || absoluteY > 20 || absoluteZ > 20) {
//    changeMesh(absoluteX,absoluteY,absoluteZ);
  }
}