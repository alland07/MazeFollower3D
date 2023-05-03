let gyroscope = new Gyroscope({ frequency: 60 });

gyroscope.addEventListener("reading", (e) => {
  alert(gyroscope.x);
  displayHtml();
});

gyroscope.addEventListener("error", (e) => {
  alert('Gyro not working');
});

gyroscope.start();

const displayHtml = () => {
    setInterval(function () {  
      document.querySelector('#app').innerHTML = `
      <div>
        ${gyroscope.x ? gyroscope.x : 0}
        <br>
        ${gyroscope.y ? gyroscope.y : 0}
        <br>
        ${gyroscope.z ? gyroscope.z : 0}
      </div>
    `}, 100);
};
