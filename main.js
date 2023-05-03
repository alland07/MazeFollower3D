import './style.css'
import gyroscope from './src/gyro'

document.querySelector('#app').innerHTML = 
`
<div>
  ${gyroscope.x ? gyroscope.x : 0}
  <br>
  ${gyroscope.y ? gyroscope.y : 0}
  <br>
  ${gyroscope.z ? gyroscope.z : 0}
</div>
`