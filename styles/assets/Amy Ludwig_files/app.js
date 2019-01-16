
//-----

const app = {};
var camera, scene, renderer,
     geometry, material, mesh;

document.addEventListener("DOMContentLoaded", function () {
     init();
     animate();
});

document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault();
});




window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

     sceneWidth = document.querySelector("#body").clientWidth;
     sceneHeight = document.querySelector("#body").clientHeight;

     camera.aspect = sceneWidth / sceneHeight;
     camera.updateProjectionMatrix();

     // console.log(sceneHeight, sceneWidth)
     renderer.setSize(sceneWidth, sceneHeight);
}


function init() {

     const body = document.getElementById('body');

     clock = new THREE.Clock();

     sceneWidth = document.querySelector("#body").clientWidth;
     sceneHeight = document.querySelector("#body").clientHeight;
     // console.log(sceneHeight, sceneWidth)

     renderer = new THREE.WebGLRenderer();
     renderer.setSize(sceneWidth, sceneHeight);


     scene = new THREE.Scene();

     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

     camera.aspect = sceneWidth / sceneHeight;
     camera.updateProjectionMatrix();

     camera.position.z = 1000;
     scene.add(camera);

     geometry = new THREE.CubeGeometry(200, 200, 200);
     material = new THREE.MeshLambertMaterial({ color: 0xaa6666, wireframe: false });
     mesh = new THREE.Mesh(geometry, material);
     // scene.add( mesh );
     cubeSineDriver = 0;

     loader = new THREE.TextureLoader();
     

     const light = new THREE.DirectionalLight(0xffffff, 0.5);
     light.position.set(-1, 0, 1);
     scene.add(light);


     smokeTexture = loader.load("styles/assets/Smoke-Element.png");
     smokeTexture.minFilter = THREE.LinearFilter;
     smokeMaterial = new THREE.MeshLambertMaterial({
       color: 0xffffff,
       map: smokeTexture,
       transparent: true
     });
     smokeGeo = new THREE.PlaneGeometry(200, 200);
     smokeParticles = [];


     for (p = 0; p < 250; p++) {
          var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
          particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 900 - 100);
          particle.rotation.z = Math.random() * 360;
          scene.add(particle);
          smokeParticles.push(particle);
     }
    

     document.body.appendChild(renderer.domElement);
    

}

function animate() {

     delta = clock.getDelta();
     requestAnimationFrame(animate);
     evolveSmoke();
     render();
}

function evolveSmoke() {
     var sp = smokeParticles.length;
     while (sp--) {
          smokeParticles[sp].rotation.z += (delta * 0.2);
     }
}

function render() {
     // console.log("Im rendering")
     mesh.rotation.x += 0.002;
     mesh.rotation.y += 0.002;
     // cubeSineDriver += .002;
     mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
     renderer.render(scene, camera);

}






var galleryElems = document.querySelectorAll('.main-carousel');

for (var i = 0, len = galleryElems.length; i < len; i++) {
     var galleryElem = galleryElems[i];
     new Flickity(galleryElem, {
       cellAlign: "left",
       contain: true,
       wrapAround: true,
       autoPlay: 5000,
       dragThreshold: 1,
       pageDots: false,
       pauseAutoPlayOnHover: true,
       lazyLoad: true,
       setGallerySize: false
     });
}






//___________this works: (uncomment whole thing)


// var RENDER_DIST = 100,
// FOV = 75;

// var WIDTH = window.innerWidth,
// HEIGHT = window.innerHeight;

// // // console.log(RENDER_DIST, WIDTH, HEIGHT);

// var scene = new THREE.Scene();

// var camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, 0.1, RENDER_DIST);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(WIDTH, HEIGHT);

// document.body.appendChild(renderer.domElement)

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: "#ff0000" });
// const cube = new THREE.Mesh(geometry, material);




// scene.add(cube)
// scene.add(camera);
// // var ambientLight = new THREE.AmbientLight(0x666666, 1.0);
// // scene.add(ambientLight);
// camera.position.z = 5;

// console.log(scene, renderer, camera);

// function animate(){
//      renderer.render(scene, camera);
//      cube.rotation.x += 0.05;
//      cube.rotation.y += 0.05;
//      requestAnimationFrame(animate);
// }



// var ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight);
// var pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(25, 50, 25);
// scene.add(pointLight);

// renderer.render(scene, camera)

// animate();




