
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

//if the webgl version is not supported, show a notice to the user
if (!WebGL.isWebGLAvailable()) {
    document.getElementById('scrollText').innerHTML = "Your browser or device does not support WebGL2. Please use a desktop or a different browser to view this page. Thank you!";
} else {

    let renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("Model3D").appendChild(renderer.domElement);
    let scene = new THREE.Scene();
    scene.background = null
    // make the background transparent
    renderer.setClearColor(0x000000, 0);

    //ensures that the pixels of mobiles have a better resolution
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 3, 6)
    scene.add(camera);

    let currentTimeline = null;
    let aimTimeline = null;
    let totalScrollableHeight = null;

    //ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    //directional light towards the earth 
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    let earth = null;
    const loader = new GLTFLoader();

    //store the text classes in an array
    let textClasses = null;
    textClasses = document.getElementsByClassName("text");

    // Load the 3D model
    loader.load('./Assets/Tatiana_Earth_Final.gltf', function (gltf) {
        earth = gltf.scene;
        scene.add(earth);

        //adjust the scale  and the position of the earth if it is on a mobile device
        if (window.innerWidth < 600) {
            earth.scale.set(1.9, 1.9, 1.9);
            earth.position.set(0, -1, 0);
        }

        //adjust the scale and the position of the earth if it is on a an ipad
        else if (window.innerWidth < 1025) {
            earth.scale.set(2.5, 2.5, 2.5);
            earth.position.set(0, -1, 0);
        }
        else {
            earth.scale.set(4, 4, 4);
            earth.position.set(0, -1.5, 0);
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
        earth.rotation.set(rotationX, 0, 0);
        renderer.render(scene, camera);
    }

    //detect when the user scrolls
    window.addEventListener("scroll", function () {
        const totalScrollableHeight = document.body.scrollHeight - window.innerHeight;
        aimTimeline = window.scrollY / totalScrollableHeight;
        currentTimeline += (aimTimeline - currentTimeline) * 0.1;

        //change the class of the text from visible to hidden as the user scrolls down
        if (currentTimeline < 0.03) {
            textClasses[0].className = "text visible";
            textClasses[1].className = "text hidden";
        } else if (currentTimeline > 0.03 && currentTimeline < 0.16) {
            textClasses[0].className = "text hidden";
            textClasses[1].className = "text visible";
            textClasses[2].className = "text hidden";
        } else if (currentTimeline > 0.16 && currentTimeline < 0.32) {
            textClasses[1].className = "text hidden";
            textClasses[2].className = "text visible";
            textClasses[3].className = " grid-container1 text hidden";
        } else if (currentTimeline > 0.32 && currentTimeline < 0.48) {
            textClasses[2].className = "text hidden";
            textClasses[3].className = "grid-container1 text visible";
            textClasses[4].className = "text hidden";
        } else if (currentTimeline > 0.48 && currentTimeline < 0.64) {
            textClasses[3].className = "grid-container1 text hidden";
            textClasses[4].className = "text visible";
            textClasses[5].className = "grid-container2 text hidden";
        } else if (currentTimeline > 0.64 && currentTimeline < 0.8) {
            textClasses[4].className = "text hidden";
            textClasses[5].className = "grid-container2 text visible";
            textClasses[6].className = "text hidden";
        } else if (currentTimeline > 0.8 && currentTimeline < 0.96) {
            textClasses[5].className = "grid-container2 text hidden";
            textClasses[6].className = "text visible";
            textClasses[7].className = "text hidden";
        } else if (currentTimeline > 0.96) {
            textClasses[6].className = "text hidden";
            textClasses[7].className = "text visible";
        }
    });

    // set the scroll position to 0 when the page refreshes
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.addEventListener('load', function () {
        //get the bodys height and the height of the window
        totalScrollableHeight = document.body.scrollHeight - window.innerHeight;
        const vh = window.innerHeight * 100 / totalScrollableHeight;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

    });

    // position the earth always to the center of the screen when the window is resized
    window.addEventListener("resize", function () {
        totalScrollableHeight = document.body.scrollHeight - window.innerHeight;
        const vh = window.innerHeight * 100 / totalScrollableHeight;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        if (window.innerWidth < 600) {
            earth.scale.set(1.9, 1.9, 1.9);
            earth.position.set(0, -1, 0);
        }
        //adjust the scale and the position of the earth if it is on a an ipad
        else if (window.innerWidth < 1025) {
            earth.scale.set(2.5, 2.5, 2.5);
            earth.position.set(0, -1, 0);
        }
        else {
            earth.scale.set(4, 4, 4);
            earth.position.set(0, -1.5, 0);
        }
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
}