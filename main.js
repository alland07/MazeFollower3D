import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import gyro from "./gyro.js"

document.querySelector('#app').innerHTML = `
  <div>
    ${gyro.x}
    <br>
    ${gyro.y}
    <br>
    ${gyro.z}
  </div>
`

setupCounter(document.querySelector('#counter'))
