import DataPoint from "./dataPoint";

let gyroscope = new Gyroscope({ frequency: 60 });
const dataPoint = new DataPoint();

gyroscope.addEventListener("reading", (e) => {
    displayHtml();
});

gyroscope.addEventListener("error", (e) => {
  // alert('Gyro not working');
});

gyroscope.start();

const displayHtml = () => {
  document.querySelector('#app').innerHTML = `
  <div>
    ${gyroscope.x ? gyroscope.x : 0}
    <br>
    ${gyroscope.y ? gyroscope.y : 0}
    <br>
    ${gyroscope.z ? gyroscope.z : 0}
  </div>`
};

export const gyroValues = () => {
  return {
    x: gyroscope.x ? gyroscope.x : 0.1,
    y: gyroscope.y ? gyroscope.y : 0.1,
    z: gyroscope.z ? gyroscope.z : 0.1
  }
}
