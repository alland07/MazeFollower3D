import * as THREE from 'three'
import * as CANNON from 'cannon';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import {gyroValues} from "./gyro"

//Physics
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

//Materials
const concreteMaterial = new CANNON.Material('concrete');
const plasticMaterial = new CANNON.Material('plastic');

const concretePlasticContactMaterial = new CANNON.ContactMaterial(
  concreteMaterial,
  plasticMaterial,
  {
    friction: 0.1,
    restitution: 1,
  }
)

world.addContactMaterial(concretePlasticContactMaterial);

const sphereShape = new CANNON.Sphere(0.5);
const sphereBody = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(0,10,10),
  shape: sphereShape
})

world.addBody(sphereBody);

//End physics section

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


// let sphereBody = new CANNON.Body({
//   mass: 5, // kg
//   position: new CANNON.Vec3(0, 17, 0), // m
//   shape: new CANNON.Sphere(1)
// });

//Add sphere in canon world
// world.addBody(sphereBody);

//End sphere in canon world
//sphere.position.z = 17;

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
const maze1 = 'maze.stl';
const maze2 = 'ballmazefirst.stl';
let mazeUrl = maze1;

const loadMaze = (maze) => {
  const loader = new STLLoader()
  loader.load(
      maze,
      function (geometry) {
        mazeMesh = new THREE.Mesh(geometry, material);
        mazeMesh.rotateX(150);
        scene.add(mazeMesh);
      },
      (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
          console.log(error)
      }
  )
}
loadMaze(mazeUrl);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(0,10,10),
  shape: mazeMesh
});
floorBody.mass = 0;
floorBody.addShape(floorShape);
floorBody.quaternion.setFromAxisAngle(
  new CANNON.Vec3(- 1, 0, 0),
  Math.PI * 0.5,
)

world.addBody(floorBody);

const stats = new Stats()

const clock = new THREE.Clock();
let oldElapsedTime = 0;

function animate() {

    //Physics
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    sphereBody.applyForce(new CANNON.Vec3(0, 0, 0), sphereBody.position)

    world.step(1 / 60, deltaTime, 3);
    sphere.position.copy(sphereBody.position);
    // mazeMesh.position.copy(floorBody.position);


    //End Physics Section

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
  if (mazeMesh && (x > 0 || y > 0 || z > 0)) {

    mazeMesh.rotateX(convertDegInRad(x))
    mazeMesh.rotateY(convertDegInRad(y))
    mazeMesh.rotateZ(convertDegInRad(z))

    /*
    sphere.position.x += x;
    sphere.position.y += y;
    sphere.position.z += z;
    */
  }
}

function render() {
  renderer.render(scene, camera)
}

export const changeMesh = (x,y,z) => {
  const absoluteX = Math.abs(x);
  const absoluteY = Math.abs(y);
  const absoluteZ = Math.abs(z);
  if (absoluteX > 2 || absoluteY > 2 || absoluteZ > 2) {
    alert('getAbsolute');
    scene.remove(mazeMesh);
      if (mazeUrl = maze1){
        mazeUrl = maze2;
      } else {
        mazeUrl = maze1;
      }
      loadMaze(mazeUrl);
  }
}

animate()


export default renderer
