let gyroscope = new Gyroscope({ frequency: 60 });

gyroscope.addEventListener("reading", (e) => {
    displayHtml();
});

gyroscope.addEventListener("error", (e) => {
  alert('Gyro not working');
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
