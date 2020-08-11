function init() {
  var scene = new THREE.Scene();

  // camera
  var camera = new THREE.PerspectiveCamera(
    45, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane
    1000 // far clipping plane
  );
  camera.position.z = 80;
  camera.position.x = 0;
  camera.position.y = 20;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // var particleGeo = new THREE.Geometry();
  var particleMat = new THREE.PointsMaterial({
    color: "rgb(255, 255, 255",
    size: 0.25,
    map: new THREE.TextureLoader().load("blue.png"),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  var particleMat2 = new THREE.PointsMaterial({
    color: "rgb(255, 255, 255",
    size: 0.15,
    map: new THREE.TextureLoader().load("fire.png"),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  var particleGeo = new THREE.SphereGeometry(10, 100, 100);

  particleGeo.vertices.forEach(function (vertex) {
    vertex.x += Math.random() - 0.5;
    vertex.y += Math.random() - 0.5;
    vertex.z += Math.random() - 0.5;
  });

  var particleGeo2 = new THREE.SphereGeometry(10, 600, 100);

  particleGeo2.vertices.forEach(function (vertex) {
    vertex.x += Math.random() - 0.5;
    vertex.y += Math.random() - 0.5;
    vertex.z += Math.random() - 0.5;
  });

  var particleCount = 200000;
  var particleDistance = 100;

  for (var i = 0; i < particleCount; i++) {
    var posX = (Math.random() - 0.5) * particleDistance;
    var posY = (Math.random() - 0.5) * particleDistance;
    var posZ = (Math.random() - 0.5) * particleDistance;
    var particle = new THREE.Vector3(posX, posY, posZ);

    particleGeo.vertices.push(particle);
  }

  // for(var i =0; i<particleCount; i++ ){
  // 	var posX = (Math.random() - 0.5) * particleDistance;
  // 	var posY = (Math.random() - 0.5) * particleDistance;
  // 	var posZ = (Math.random() - 0.5) * particleDistance;
  // 	var particle = new THREE.Vector3(posX, posY, posZ);

  // 	particleGeo2.vertices.push(particle);
  // }
  var particleSystem = new THREE.Points(
    particleGeo,

    particleMat
  );
  var particleSystem2 = new THREE.Points(particleGeo2, particleMat2);

  particleSystem.name = "particleSystem";
  scene.add(particleSystem);
  particleSystem2.name = "particleSystem2";
  scene.add(particleSystem2);

  // renderer
  var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".diagram canvas"),
  });
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.shadowMap.enabled = true;
  // renderer.setClearColor('rgb(20, 20, 20)');

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.getElementById("webgl").appendChild(renderer.domElement);

  update(renderer, scene, camera, controls);

  return scene;
}

function update(renderer, scene, camera, controls) {
  controls.update();
  renderer.render(scene, camera);

  var particleSystem = scene.getObjectByName("particleSystem");
  var particleSystem2 = scene.getObjectByName("particleSystem2");
  // var particleSystem2 = scene.getObjectByName('particleSystem2');

  // particleSystem.rotation.y += 0.005;
  particleSystem.rotation.x += 0.002;
  particleSystem2.rotation.x += 0.002;
  particleSystem.position.x = 0.2;

  // particleSystem.rotation.z += 0.005;
  // particleSystem.geometry.vertices.forEach(function(particle){
  // 	particle.x += (Math.random() -1) * 0.1;
  // 	particle.y += (Math.random() -0.75) * 0.1;
  // 	particle.z += (Math.random() ) * 0.1;

  // 	if (particle.x < -50) {
  // 		particle.x = 50;
  // 	}
  // 	if (particle.y < -50) {
  // 		particle.y = 50;
  // 	}
  // 	if (particle.z < -50) {
  // 		particle.z = 50;
  // 	}
  // 	if (particle.z > 50) {
  // 		particle.z = -50;
  // 	}
  // });

  // particleSystem.geometry.verticesNeedUpdate = true;

  function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // set render target sizes here
    }
  }
  requestAnimationFrame(function () {
    resizeCanvasToDisplaySize();
    update(renderer, scene, camera, controls);
  });
}

var scene = init();
