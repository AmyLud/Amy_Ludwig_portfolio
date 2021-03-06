
//-----

const app = {};
var camera, scene, renderer,
     geometry, material, mesh;

document.addEventListener("DOMContentLoaded", function () {
     init();
     animate();
     document.body.appendChild(renderer.domElement);
});

document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault();
});




window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

     sceneWidth = document.querySelector("#body").clientWidth;
     sceneHeight = document.querySelector("#body").clientHeight;
     headerHeight = document.querySelector('header').clientHeight;
     headerWidth = document.querySelector("header").clientWidth;
     camera.aspect = sceneWidth / sceneHeight;
     camera.updateProjectionMatrix();



     // var maxRender = renderer.context.getParameter(renderer.context.MAX_RENDERBUFFER_SIZE);
     // if (blahsceneHeight > maxRender) {
     //      camera.aspect = headerWidth / headerHeight;
     //      console.log("pixel stuff insufficient, sorry you're getting a rougher version.");
     //      // var rougherVersion
     //      renderer.setSize(headerWidth, headerHeight);
     //      camera.updateProjectionMatrix();
     // } else {
     //   console.log("good to go");
     // }
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


     // var maxRender = renderer.context.getParameter(renderer.context.MAX_RENDERBUFFER_SIZE);
     // // console.log(maxRender);
     // var screenWidth = window.innerWidth;
     // var screenHeight = window.innerHeight;

     // // console.log(sceneHeight);
     // if ( (sceneHeight) > maxRender) {
          
     //      console.log("pixel stuff insufficient")
          
     //      renderer.setSize(screenWidth, screenHeight);
     // } else { console.log("good to go")}


     scene = new THREE.Scene();

     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

     camera.aspect = sceneWidth / sceneHeight;
     camera.position.z = 1000;
     camera.updateProjectionMatrix();

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
     smokeGeo = new THREE.PlaneGeometry(170, 170);
     smokeParticles = [];


     for (p = 0; p < 150; p++) {
          var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
          particle.position.set(Math.random() * 300 - 150, Math.random() * 500 - 250, Math.random() * 900 - 50);
          particle.rotation.z = Math.random() * 360;
          scene.add(particle);
          smokeParticles.push(particle);
     }
    

     




}
// document.body.appendChild(renderer.domElement);

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
     mesh.rotation.x += 0.002;
     mesh.rotation.y += 0.002;
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

