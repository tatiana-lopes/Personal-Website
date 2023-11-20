
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
camera.position.set(0, 3, 6)
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


// Load the 3D model
loader.load('./Assets/Earth_WIP_1.gltf', function (gltf) {
    earth = gltf.scene;
    scene.add(earth);
  

    //adjust the scale  and the position of the earth if it is on a mobile device
    if (window.innerWidth < 600) {
        earth.scale.set(1.9, 1.9, 1.9);
        earth.position.set(0, 0, 0);
    }

    //adjust the scale and the position of the earth if it is on a an ipad
    else if (window.innerWidth < 1025) {
        earth.scale.set(2.5, 2.5, 2.5);
        earth.position.set(0, -1, 0);
    }
    else{
        earth.scale.set(4, 4, 4); 
        earth.position.set(0, -1, 0);
    }

   


    animate();
}, undefined, function (error) {
    console.error(error);
});



// Create an animate function
function animate() {
    requestAnimationFrame(animate);

    //rotate the earth based on the scroll position
    currentTimeline += (aimTimeline - currentTimeline) * 0.1;
    const rotationX = currentTimeline * Math.PI * 2;
    earth.rotation.set(rotationX,0,0);
    console.log(currentTimeline);

    //change the class of the text from visible to hidden as the user scrolls down
    if(currentTimeline < 0.03){
        console.log("earthRotation 1:" + rotationX );
        document.getElementById("text1").className = "text visible";
        document.getElementById("text2").className = "text hidden";
        document.getElementById("text3").className = "text hidden";
        document.getElementById("text4").className = "text hidden";
        document.getElementById("text5").className = "text hidden";
        document.getElementById("text6").className = "text hidden";
        document.getElementById("text7").className = "text hidden";
    }

    if(currentTimeline > 0.03 && currentTimeline < 0.16){
        console.log("earthRotation 2:" + rotationX );
        document.getElementById("text1").className = "text hidden";
        document.getElementById("text2").className = "text visible";
        document.getElementById("text3").className = "text hidden";
        document.getElementById("text4").className = "text hidden";
        document.getElementById("text5").className = "text hidden";
        document.getElementById("text6").className = "text hidden";
        document.getElementById("text7").className = "text hidden";
        document.getElementById("text8").className = "text hidden";
    }
    
    if (currentTimeline > 0.16 && currentTimeline < 0.32){
        console.log("earthRotation 3:" + rotationX );
        document.getElementById("text2").className = "text hidden";
        document.getElementById("text3").className = "text visible";
        document.getElementById("text4").className = "text hidden";
        document.getElementById("text5").className = "text hidden";
        document.getElementById("text6").className = "text hidden";
        document.getElementById("text7").className = "text hidden";
        document.getElementById("text8").className = "text hidden";

    }

    if (currentTimeline > 0.32 && currentTimeline < 0.48){
        console.log("earthRotation 4:" + rotationX );
        document.getElementById("text2").className = "text hidden";
        document.getElementById("text3").className = "text hidden";
        document.getElementById("text4").className = "text visible";
        document.getElementById("text5").className = "text hidden";
        document.getElementById("text6").className = "text hidden";
        document.getElementById("text7").className = "text hidden";
        document.getElementById("text8").className = "text hidden";
    }

    if (currentTimeline > 0.48 && currentTimeline < 0.64){
        console.log("earthRotation 5:" + rotationX );
        document.getElementById("text2").className = "text hidden";
        document.getElementById("text3").className = "text hidden";
        document.getElementById("text4").className = "text hidden";
        document.getElementById("text5").className = "text visible";
        document.getElementById("text6").className = "text hidden";
        document.getElementById("text7").className = "text hidden";
        document.getElementById("text8").className = "text hidden";
    }

    if (currentTimeline > 0.64 && currentTimeline < 0.8){
        console.log("earthRotation 6:" + rotationX );
        document.getElementById("text2").className = "text hidden";
        document.getElementById("text3").className = "text hidden";
        document.getElementById("text4").className = "text hidden";
        document.getElementById("text5").className = "text hidden";
        document.getElementById("text6").className = "text visible";
        document.getElementById("text7").className = "text hidden";
        document.getElementById("text8").className = "text hidden";
    }

    if (currentTimeline > 0.8 && currentTimeline < 0.96){
        console.log("earthRotation 7:" + rotationX );
        document.getElementById("text2").className = "text hidden";
        document.getElementById("text3").className = "text hidden";
        document.getElementById("text4").className = "text hidden";
        document.getElementById("text5").className = "text hidden";
        document.getElementById("text6").className = "text hidden";
        document.getElementById("text7").className = "text visible";
        document.getElementById("text8").className = "text hidden";
    }

    if (currentTimeline > 0.96){
        console.log("earthRotation 8:" + rotationX );
        document.getElementById("text2").className = "text hidden";
        document.getElementById("text3").className = "text hidden";
        document.getElementById("text4").className = "text hidden";
        document.getElementById("text5").className = "text hidden";
        document.getElementById("text6").className = "text hidden";
        document.getElementById("text7").className = "text hidden";
        document.getElementById("text8").className = "text visible";
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


// position the earth always to the center of the screen when the window is resized
window.addEventListener("resize", function () {
    //adjust the scale  and the position of the earth if it is on a mobile device
    if (window.innerWidth < 600) {
        earth.scale.set(1.9, 1.9, 1.9);
        earth.position.set(0, 0, 0);
    }

    //adjust the scale and the position of the earth if it is on a an ipad
    else if (window.innerWidth < 1025) {
        earth.scale.set(2.5, 2.5, 2.5);
        earth.position.set(0, -1, 0);
    }
    else{
        earth.scale.set(4, 4, 4); 
        earth.position.set(0, -1, 0);
    }
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}, false);
