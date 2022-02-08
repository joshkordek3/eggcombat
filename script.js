const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const spotLight = new THREE.SpotLight('blue');
spotLight.position.set(0, 0, 500);
spotLight.castShadow = true;
spotLight.shadowMapWidth = 1024;
spotLight.shadowMapHeight = 1024;
spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 4000;
spotLight.shadowCameraFov = 30;
const sphere = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(100, 32, 16)));
sphere.material.depthTest = false;
sphere.material.opacity = 0.25;
sphere.material.transparent = true;
scene.add(spotLight);
scene.add(sphere);
camera.position.z = 250;
renderer.domElement.addEventListener('click', function () {
  renderer.domElement.requestPointerLock();
});
function zoom (way, int) {
  if (way === 'in') {
    camera.position.z -= int;
  }
  if (way === 'out') {
    camera.position.z += int;
  }
}
function radToDeg (rad) {
  return (rad * 180) / Math.PI;
}
function degToRad (deg) {
  return (deg * Math.PI) / 180;
}
document.addEventListener('mousemove', function (event) {
	camera.rotation.z += event.movementY * -0.01;
	camera.rotation.y += event.movementX * -0.01;
});
let theta = 1;
const orbit = new THREE.Object3D();
orbit.rotation.order = "YXZ";
orbit.position.copy(sphere.position);
scene.add(orbit);
camera.position.z = 1;
orbit.add(camera);
window.addEventListener('keydown', function (event) {
  switch (event.key.toLowerCase()) {
    case '+':
      zoom('in', 10);
      break;
    case '-':
      zoom('out', 10);
      break;
    case 'w':
			camera.position.x += 5 * Math.sin(camera.rotation.y + degToRad(180));
      camera.position.z -= 5 * Math.sin(camera.rotation.y + degToRad(90));
      break;
		case 'a':
			camera.position.x += 5 * Math.sin(camera.rotation.y - degToRad(90));
      camera.position.z -= 5 * Math.sin(camera.rotation.y + degToRad(180));
      break;
    case 's':
      camera.position.x -= 5 * Math.sin(camera.rotation.y + degToRad(180));
      camera.position.z += 5 * Math.sin(camera.rotation.y + degToRad(90));
      break;
		case 'd':
			camera.position.x -= 5 * Math.sin(camera.rotation.y - degToRad(90));
      camera.position.z += 5 * Math.sin(camera.rotation.y + degToRad(180));
      break;
  }
  camera.updateProjectionMatrix();
});
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate()
