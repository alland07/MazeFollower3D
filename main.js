import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import gyro from "./src/gyro.js"


document.querySelector('#app').innerHTML = `
  <div>
    ${gyro.x ? gyro.x : 0}
    <br>
    ${gyro.y ? gyro.y : 0}
    <br>
    ${gyro.z ? gyro.z : 0}
  </div>
`

setupCounter(document.querySelector('#counter'))
