import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import {gyroValues} from "./gyro"

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight( 0xff0000, 121, 100 );
light.position.set(20, 20, 20)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 43;

const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
const materialSphere = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const sphere = new THREE.Mesh( geometry, materialSphere ); scene.add( sphere );

sphere.position.z = 17;

const renderer = new THREE.WebGLRenderer()
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;

const material = new THREE.MeshPhysicalMaterial({
    color: 0xb2ffc8,
    // envMap: envTexture,
    metalness: 0.25,
    roughness: 0.1,
    opacity: 1.0,
    transparent: true,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25
})


let mazeMesh;

const loader = new STLLoader()
loader.load(
    '/maze.stl',
    function (geometry) {
      let mazeMesh = new THREE.Mesh(geometry, material);
      scene.add(mazeMesh);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()

function animate() {
    requestAnimationFrame(animate)
    controls.update();
    updateMesh(mazeMesh);
    render();
    stats.update()
}

const convertDegInRad = (value) => {
  return value * (Math.PI/180);
}

const updateMesh = (mazeMesh) => {
  const {x,y,z} = gyroValues();
  if (mazeMesh) {
    // mazeMesh.rotateX(x) += x * 1000;
    mazeMesh.rotateX(convertDegInRad(x * 500));
    mazeMesh.rotateY(convertDegInRad(y * 500));
    mazeMesh.rotateZ(convertDegInRad(z * 500));
  }
}

function render() {
  renderer.render(scene, camera)
}

animate()


export default renderer
