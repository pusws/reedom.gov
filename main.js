import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('#cosmos');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 160);
camera.position.set(0, 0.25, 10);

const root = new THREE.Group();
scene.add(root);

const ambient = new THREE.AmbientLight('#8da7ff', 0.55);
scene.add(ambient);

const keyLight = new THREE.PointLight('#f7cc86', 1.6, 120);
keyLight.position.set(5.5, 4, 8);
scene.add(keyLight);

const fillLight = new THREE.PointLight('#5c8dff', 1.1, 100);
fillLight.position.set(-6, -2, 6);
scene.add(fillLight);

const rimLight = new THREE.PointLight('#a6bdff', 0.7, 80);
rimLight.position.set(0, 6, -3);
scene.add(rimLight);

const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1.75, 36, 36),
  new THREE.MeshStandardMaterial({
    color: '#8ca7ff',
    emissive: '#243a78',
    roughness: 0.42,
    metalness: 0.35,
    wireframe: true,
  })
);
root.add(globe);

const haloInner = new THREE.Mesh(
  new THREE.TorusGeometry(2.35, 0.05, 20, 180),
  new THREE.MeshBasicMaterial({ color: '#f4c57b', transparent: true, opacity: 0.82 })
);
haloInner.rotation.x = Math.PI * 0.33;
root.add(haloInner);

const haloOuter = new THREE.Mesh(
  new THREE.TorusGeometry(2.95, 0.03, 18, 180),
  new THREE.MeshBasicMaterial({ color: '#90adff', transparent: true, opacity: 0.52 })
);
haloOuter.rotation.y = Math.PI * 0.31;
haloOuter.rotation.x = Math.PI * 0.16;
root.add(haloOuter);

// 三根“公民支柱”：法治 / 责任 / 参与
const pillarGroup = new THREE.Group();
root.add(pillarGroup);
const pillarGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.6, 14);
const pillarColors = ['#f4c57b', '#7da3ff', '#c7d7ff'];
const pillars = [];

for (let i = 0; i < 3; i += 1) {
  const mat = new THREE.MeshBasicMaterial({ color: pillarColors[i], transparent: true, opacity: 0.65 });
  const pillar = new THREE.Mesh(pillarGeo, mat);
  const angle = (Math.PI * 2 * i) / 3;
  pillar.position.set(Math.cos(angle) * 1.3, -0.2, Math.sin(angle) * 1.3);
  pillar.rotation.z = 0.12;
  pillarGroup.add(pillar);
  pillars.push(pillar);
}

// 象征“公共脉络”的螺旋流线
const streamPoints = [];
for (let i = 0; i <= 220; i += 1) {
  const t = i / 220;
  const angle = t * Math.PI * 5.8;
  const radius = 0.9 + t * 2.8;
  streamPoints.push(new THREE.Vector3(Math.cos(angle) * radius, -1.6 + t * 3.3, Math.sin(angle) * radius));
}
const streamCurve = new THREE.CatmullRomCurve3(streamPoints);
const streamGeo = new THREE.TubeGeometry(streamCurve, 380, 0.018, 8, false);
const streamMat = new THREE.MeshBasicMaterial({ color: '#f6d59b', transparent: true, opacity: 0.42 });
const stream = new THREE.Mesh(streamGeo, streamMat);
root.add(stream);

// 背景星点
const starsGeo = new THREE.BufferGeometry();
const starCount = 2200;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i += 1) {
  const i3 = i * 3;
  positions[i3] = (Math.random() - 0.5) * 72;
  positions[i3 + 1] = (Math.random() - 0.5) * 46;
  positions[i3 + 2] = -Math.random() * 55;
}

starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const stars = new THREE.Points(
  starsGeo,
  new THREE.PointsMaterial({ color: '#c2d5ff', size: 0.036, transparent: true, opacity: 0.88 })
);
scene.add(stars);

let pointerX = 0;
let pointerY = 0;

window.addEventListener('pointermove', (event) => {
  pointerX = (event.clientX / window.innerWidth) * 2 - 1;
  pointerY = (event.clientY / window.innerHeight) * 2 - 1;
});

const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();

  globe.rotation.x = t * 0.17;
  globe.rotation.y = t * 0.26;

  haloInner.rotation.z = t * 0.31;
  haloOuter.rotation.z = -t * 0.24;

  const pulse = 1 + Math.sin(t * 1.3) * 0.06;
  haloInner.scale.setScalar(pulse);

  pillarGroup.rotation.y = t * 0.18;
  pillars.forEach((pillar, i) => {
    const wave = Math.sin(t * 2 + i * 1.2) * 0.24;
    pillar.scale.y = 0.85 + wave * 0.25;
    pillar.position.y = -0.25 + wave * 0.22;
    pillar.material.opacity = 0.45 + (wave + 0.24) * 0.55;
  });

  stream.rotation.y = t * 0.12;
  stream.material.opacity = 0.28 + Math.sin(t * 1.9) * 0.1;

  root.rotation.y += (pointerX * 0.23 - root.rotation.y) * 0.03;
  root.rotation.x += (-pointerY * 0.12 - root.rotation.x) * 0.03;

  stars.rotation.y = t * 0.015;
  stars.rotation.x = Math.sin(t * 0.1) * 0.06;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
