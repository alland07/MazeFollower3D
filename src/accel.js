import DataPoint from "./models/dataPoint";

const accel = new Accelerometer({ frequency: 60 });
const dataPoint = new DataPoint();

accel.addEventListener("reading", (e) => {
  dataPoint.pushValue(accel.x, accel.y, accel.z);
  setInterval(() => {
   alert(accel.x);
  }, 10000)
  //dataPoint.derivate();
  getAccel();
}); 

accel.start();

const getAccel = () => {
  const {x,y,z} = dataPoint.getDataFilter();

  const absoluteX = Math.abs(x);
  const absoluteY = Math.abs(y);
  const absoluteZ = Math.abs(z);
  if (absoluteX > 2 || absoluteY > 2 || absoluteZ > 2) {
    changeMesh(absoluteX,absoluteY,absoluteZ);
  }
  
}