
//-----

const app = {};
var camera, scene, renderer,
     geometry, material, mesh;

init();
animate();

function init() {

     // const body = document.getElementById('body');

     clock = new THREE.Clock();

     renderer = new THREE.WebGLRenderer();
     renderer.setSize(window.innerWidth, window.innerHeight);

     console.log(window.innerHeight)

     scene = new THREE.Scene();

     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
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


     smokeTexture = loader.load("script/Smoke-Element.png");
     // console.log(smokeTexture)
     smokeTexture.minFilter = THREE.LinearFilter;
     smokeMaterial = new THREE.MeshLambertMaterial({
       color: 0xffffff,
       map: smokeTexture,
       transparent: true
     });
     smokeGeo = new THREE.PlaneGeometry(300, 300);
     smokeParticles = [];


     for (p = 0; p < 200; p++) {
          var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
          particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 900 - 100);
          particle.rotation.z = Math.random() * 360;
          scene.add(particle);
          smokeParticles.push(particle);
     }
     // console.log(smokeParticles);
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
     mesh.rotation.x += 0.001;
     mesh.rotation.y += 0.01;
     cubeSineDriver += .01;
     mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
     renderer.render(scene, camera);

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




