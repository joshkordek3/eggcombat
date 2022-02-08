// import cameraControls from "https://cdn.skypack.dev/camera-controls@1.34.1";
// const CameraControls = cameraControls;
// CameraControls.install({THREE: THREE});
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
document.addEventListener('mousemove', function (event) {
    let scale = -0.01;
    orbit.rotateY(event.movementX * -0.01);
    orbit.rotateX(event.movementY * -0.01); 
    orbit.rotation.z = 0;
});
const orbit = new THREE.Object3D();
orbit.rotation.order = "YXZ";
orbit.position.copy(sphere.position);
scene.add(orbit);
camera.position.z = 1;
orbit.add(camera);
window.addEventListener('keydown', function (event) {
  if (event.key === '+') zoom('in', 10);
  if (event.key === '-') zoom('out', 10);
});
function animate () {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
};
animate();
