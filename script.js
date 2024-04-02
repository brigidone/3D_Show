import * as THREE from 'three'

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

// Imported Models
const scallop = new GLTFLoader()
scallop.load('assets/pinkscallop.glb', function(glb){
    console.log(glb)
    const mesh = glb.scene;
    mesh.position.set(0, 0, 0)
    mesh.scale.set(1, 1, 1)
    scene.add(mesh);
}, function(xhr){
    console.log( xhr.loaded/xhr.total* 100 ) + "% loaded"
}, function(error){
    console.log('An error occurred.')
})

const oyster = new GLTFLoader()
oyster.load('assets/oyster.glb', function(glb){
    console.log(glb)
    const mesh = glb.scene;
    mesh.position.set(3, 0 , 0)
    scene.add(mesh);
}, function(xhr){
    console.log( xhr.loaded/xhr.total* 100 ) + "% loaded"
}, function(error){
    console.log('An error occurred.')
})

// Lighting
const light1 = new THREE.DirectionalLight(0xffffff, 5)
light1.position.set(2, 2 ,5)
scene.add(light1)

const light2 = new THREE.DirectionalLight(0xffffff, 3)
light2.position.set(7, 5, -7)
scene.add(light2)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1, 2)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0xffffff)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//renderer.shadowMap.enabled = true;
//renderer.gammaOutput = true;
renderer.render(scene, camera)

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.enablePan = true;
controls.minDistance = 2;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 2;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, .5, 0);
controls.update();

function animate(){
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

animate()