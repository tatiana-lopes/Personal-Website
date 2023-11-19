
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';

// Create a renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("Model3D").appendChild(renderer.domElement);

// Create a scene
let scene = new THREE.Scene();
//add a blue background to the scene
scene.background = new THREE.Color(0x0000ff);

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// Set the camera position
camera.position.set(0, 3, 5)
scene.add(camera);

//how far down have I scrolled down the window
let currentTimeline = window.pageYOffset / 3000;

//smooth movement
let aimTimeline = pageYOffset / 3000;

//create ambient light
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

//create light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(20, 20, 8);
light.rotation.x = 0;
light.rotation.y = 0;
light.rotation.z = 0;
scene.add(light);

let earth = null;

const loader = new GLTFLoader();
//const controls = new OrbitControls(camera, renderer.domElement);

// Load the 3D model
loader.load('./Assets/EarthGrouped.gltf', function (gltf) {
    earth = gltf.scene;
    scene.add(earth);
    earth.position.set(0, -1, 0);
    earth.scale.set(4, 4, 4);

    animate();
}, undefined, function (error) {
    console.error(error);
});

//controls.update();

// Create an animate function
function animate() {
    requestAnimationFrame(animate);

    //rotate the earth based on the scroll position
    currentTimeline += (aimTimeline - currentTimeline) * 0.1;
    const rotationX = currentTimeline * Math.PI * 2;
    earth.rotation.set(rotationX,0,0);
    console.log(currentTimeline);

    //change the class of the text from visible to hidden as the user scrolls down
    if(currentTimeline > 0.03 && currentTimeline < 0.3){
        document.getElementById("text1").className = "text hidden";
        document.getElementById("text2").className = "text visible";
        document.getElementById("text3").className = "text hidden";
    }
    
    if (currentTimeline > 0.3 && currentTimeline < 0.5){
        document.getElementById("text2").className = "hidden";
        document.getElementById("text3").className = "text visible";
        document.getElementById("text4").className = "hidden";
    }

    if (currentTimeline > 0.5 && currentTimeline < 0.7){
        document.getElementById("text2").className = "hidden";
        document.getElementById("text3").className = "hidden";
        document.getElementById("text4").className = "text visible";
    }

    renderer.render(scene, camera);
}

//detect when the user scrolls
window.addEventListener("scroll",function(){
    aimTimeline = pageYOffset / 3000;
})

// set the scroll position to 0 when the page refreshes
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
