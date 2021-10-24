// let container , camera , house, scene ;

// function init() { 
//   container = document.getElementById("scene");  
//   scene = new THREE.Scene();
//   const fov = 35, aspect = container.innerWidth/container.innerHeight, near = 0.1, far = 1000;

  
//   camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//   camera.position.set(-10, -400, 350);
//   const ambient = new THREE.AmbientLight(0xA49966, 22);
//   scene.add(ambient);  

  
//   console.log(container.clientWidth, container.clientHeight)


//   renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//   renderer.setSize(container.clientHeight, container.clientWidth);
//   renderer.setPixelRatio(window.devicePixelRatio);

//   let controls = new THREE.OrbitControls(camera , renderer.domElement );
//   controls.addEventListener('change', renderer);

//   container.appendChild(renderer.domElement);
  
//   let loader = new THREE.GLTFLoader();
//   loader.load("../3dIcons/robot/scene.gltf", function(gltf) {
//     scene.add(gltf.scene);
//     house = gltf.scene.children[0];   
//     house.scale.set(0.3515, 0.3515, 0.3515)
//     animate();
//   });
// }
// function animate( ) {
//   requestAnimationFrame(animate); 
//   renderer.render(scene, camera); 
// }
// init();

// function onWindowResize() {
//   camera.aspect = container.innerWidth / container.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(container.innerWidth, container.innerHeight);
// }

// window.addEventListener("resize", onWindowResize);



let container , camera , house, scene ;

function init() { 
  container = document.querySelector(".scene"); 
  scene = new THREE.Scene();
  const fov = 44, aspect = container.clientWidth / container.clientHeight, near = 0.1, far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(100, -100, 320);
  const ambient = new THREE.AmbientLight(0xA49966, 22);
  scene.add(ambient);
   
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  let controls = new THREE.OrbitControls(camera , renderer.domElement );
  controls.addEventListener('change', renderer);

  container.appendChild(renderer.domElement);
  
  let loader = new THREE.GLTFLoader();
  loader.load("../3dIcons/robot/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0]; 
    house.position.set(-30, -75, 70)
    house.scale.set(0.3, 0.443, 0.3)
    animate();
  });
}
function animate( ) {
  requestAnimationFrame(animate); 
  renderer.render(scene, camera); 
}
init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
