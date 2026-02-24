const translations = {
  en: {
    brand: 'Civic Atlas',
    navAction: 'Public Action',
    eyebrow: 'Inspired by freedom theme',
    heroTitle: 'Freedom endures when institutions and citizens safeguard it together.',
    heroSubtitle:
      'Sustainable liberty belongs not only to personal expression, but also to rule-of-law boundaries, transparency, and civic participation. We are both rights-holders and builders of our shared future.',
    heroCta: 'Explore Core Principles',
    valueOrbit: 'Rule of Law · Responsibility · Participation ·',
    panel1Title: '01 · Freedom Needs Rule of Law',
    panel1Body:
      'Freedom is not boundaryless impulse, but equal protection and fair treatment for everyone within a legal framework. When rules are public and traceable, trust can grow and society can move forward steadily.',
    panel2Title: '02 · Rights Grow with Responsibility',
    panel2Body:
      'Civic rights matter most when exercised actively and rationally: joining public dialogue, respecting facts, and upholding others\' dignity. Responsibility aligns "my freedom" with "our future."',
    panel3Title: '03 · Participation Shapes the Future',
    panel3Body:
      'Public life is not a spectator seat. Every vote, every community action, and every insistence on transparent governance turns abstract values into real institutional outcomes.',
    footer: 'Freedom · Responsibility · Participation · Shared Future',
    toggleLabel: '中文',
    toggleAria: 'Switch to Chinese',
  },
  zh: {
    brand: '公民图谱',
    navAction: '公共行动',
    eyebrow: '源于自由主题',
    heroTitle: '自由的意义，\n在制度与公民之间被共同守护。',
    heroSubtitle:
      '真正可持续的自由，不只属于个体表达，也来自法治边界、公开透明与社会参与。我们既是权利的拥有者，也是共同体未来的塑造者。',
    heroCta: '探索核心原则',
    valueOrbit: '法治 · 责任 · 参与 ·',
    panel1Title: '01 · 自由需要法治护航',
    panel1Body: '自由不是无边界的冲动，而是在法律框架下每个人都能被平等保护、被公平对待。当规则公开且可追溯，信任才会成长，社会才会稳健前行。',
    panel2Title: '02 · 权利与责任共同成长',
    panel2Body: '公民权利的价值，在于它能够被积极、理性地行使：参与公共讨论、尊重事实、维护他人尊严。责任感让“我的自由”与“我们的未来”不再冲突。',
    panel3Title: '03 · 参与塑造共同未来',
    panel3Body: '公共生活不是旁观席。每一次投票、每一次社区行动、每一次对透明治理的坚持，都在将抽象的价值转化为现实的制度成果。',
    footer: '自由 · 责任 · 参与 · 共同未来',
    toggleLabel: 'EN',
    toggleAria: '切换到英文',
  },
};

const langToggle = document.querySelector('#lang-toggle');
let currentLang = 'en';

function applyLanguage(lang) {
  const pack = translations[lang];
  if (!pack) return;

  currentLang = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (!pack[key]) return;
    if (key === 'heroTitle') {
      element.innerHTML = pack[key].replace('\n', '<br />');
      return;
    }
    element.textContent = pack[key];
  });

  langToggle.textContent = pack.toggleLabel;
  langToggle.setAttribute('aria-label', pack.toggleAria);
}

langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'en' ? 'zh' : 'en');
});

applyLanguage('en');
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

const civicBeacon = new THREE.Mesh(
  new THREE.ConeGeometry(0.46, 6.8, 38, 1, true),
  new THREE.MeshBasicMaterial({
    color: '#ffe2af',
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
);
civicBeacon.position.y = 3.1;
civicBeacon.rotation.x = Math.PI;
root.add(civicBeacon);

const beaconCore = new THREE.Mesh(
  new THREE.CylinderGeometry(0.06, 0.16, 4.5, 24, 1, true),
  new THREE.MeshBasicMaterial({
    color: '#9fc2ff',
    transparent: true,
    opacity: 0.36,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
);
beaconCore.position.y = 1.8;
root.add(beaconCore);

const civicPulseGroup = new THREE.Group();
root.add(civicPulseGroup);
const civicPulses = [];
const pulseGeo = new THREE.RingGeometry(1.95, 2.12, 96, 1);
for (let i = 0; i < 5; i += 1) {
  const pulse = new THREE.Mesh(
    pulseGeo,
    new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? '#ffd9a0' : '#8db0ff',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  pulse.rotation.x = Math.PI / 2;
  pulse.visible = false;
  civicPulseGroup.add(pulse);
  civicPulses.push({ mesh: pulse, birth: -99 });
}
let pulseCursor = 0;
let lastPulseTime = 0;

// “宪政脉冲带”：通过着色器制造随时间起伏的光带
const pulseField = new THREE.Mesh(
  new THREE.RingGeometry(3.2, 4.6, 160, 1),
  new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 displaced = position;
        float wave = sin((uv.x * 14.0) + (uTime * 1.7)) * 0.08;
        wave += cos((uv.x * 8.0) - (uTime * 1.3)) * 0.05;
        displaced.z += wave;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        float radial = smoothstep(0.0, 0.4, vUv.y) * (1.0 - smoothstep(0.62, 1.0, vUv.y));
        float band = smoothstep(0.3, 0.5, abs(sin(vUv.x * 24.0)));
        vec3 base = mix(vec3(0.45, 0.62, 1.0), vec3(0.96, 0.77, 0.49), band);
        gl_FragColor = vec4(base, radial * 0.4);
      }
    `,
  })
);
pulseField.rotation.x = Math.PI / 2.2;
root.add(pulseField);

// “公民卫星”：围绕核心轨道运转的多面体
const satellites = [];
for (let i = 0; i < 4; i += 1) {
  const satellite = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1 + i * 0.015, 1),
    new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? '#ffdca7' : '#9ab6ff',
      emissive: i % 2 === 0 ? '#9e7745' : '#2a4f9e',
      emissiveIntensity: 0.75,
      roughness: 0.24,
      metalness: 0.6,
    })
  );
  root.add(satellite);

  satellites.push({
    mesh: satellite,
    radius: 2.4 + i * 0.46,
    speed: 0.35 + i * 0.09,
    offset: i * (Math.PI / 2),
    lift: -0.45 + i * 0.25,
  });
}

// “共识火花”：从核心向外传播的粒子层
const sparkCount = 1800;
const sparkGeo = new THREE.BufferGeometry();
const sparkPositions = new Float32Array(sparkCount * 3);
const sparkShift = new Float32Array(sparkCount);

for (let i = 0; i < sparkCount; i += 1) {
  const i3 = i * 3;
  const phi = Math.acos(1 - 2 * Math.random());
  const theta = Math.PI * 2 * Math.random();
  const radius = 2 + Math.random() * 2.4;

  sparkPositions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
  sparkPositions[i3 + 1] = Math.cos(phi) * radius;
  sparkPositions[i3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
  sparkShift[i] = Math.random() * Math.PI * 2;
}

sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
sparkGeo.setAttribute('aShift', new THREE.BufferAttribute(sparkShift, 1));

const sparks = new THREE.Points(
  sparkGeo,
  new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      attribute float aShift;
      uniform float uTime;

      void main() {
        vec3 transformed = position;
        float breath = 0.88 + sin(uTime * 1.4 + aShift) * 0.18;
        transformed *= breath;

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        gl_PointSize = (2.8 + sin(aShift + uTime * 2.0) * 1.2) * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        float alpha = smoothstep(0.5, 0.1, d);
        vec3 color = mix(vec3(0.55, 0.7, 1.0), vec3(1.0, 0.86, 0.62), gl_PointCoord.y);
        gl_FragColor = vec4(color, alpha * 0.7);
      }
    `,
  })
);
root.add(sparks);

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

  civicBeacon.material.opacity = 0.12 + Math.sin(t * 1.2) * 0.08;
  civicBeacon.scale.setScalar(1 + Math.sin(t * 1.6) * 0.05);
  beaconCore.material.opacity = 0.24 + Math.sin(t * 2.6) * 0.12;

  if (t - lastPulseTime > 1.12) {
    const pulse = civicPulses[pulseCursor % civicPulses.length];
    pulseCursor += 1;
    pulse.birth = t;
    pulse.mesh.visible = true;
    pulse.mesh.scale.setScalar(1);
    pulse.mesh.position.y = -0.55;
    lastPulseTime = t;
  }

  civicPulses.forEach((pulse, i) => {
    if (!pulse.mesh.visible) return;
    const age = t - pulse.birth;
    if (age > 2.4) {
      pulse.mesh.visible = false;
      return;
    }
    const spread = 1 + age * 1.18;
    pulse.mesh.scale.setScalar(spread);
    pulse.mesh.position.y = -0.55 + age * 0.32;
    pulse.mesh.material.opacity = (1 - age / 2.4) * (0.34 - i * 0.03);
  });

  pulseField.material.uniforms.uTime.value = t;
  pulseField.rotation.z = t * 0.08;

  satellites.forEach((satellite, i) => {
    const angle = t * satellite.speed + satellite.offset;
    satellite.mesh.position.set(
      Math.cos(angle) * satellite.radius,
      satellite.lift + Math.sin(t * 0.8 + i) * 0.25,
      Math.sin(angle) * satellite.radius
    );
    satellite.mesh.rotation.x = t * 0.7;
    satellite.mesh.rotation.y = -t * 0.5;
  });

  sparks.material.uniforms.uTime.value = t;
  sparks.rotation.y = t * 0.09;
  sparks.rotation.x = Math.sin(t * 0.35) * 0.2;

  root.rotation.y += (pointerX * 0.23 - root.rotation.y) * 0.03;
  root.rotation.x += (-pointerY * 0.12 - root.rotation.x) * 0.03;

  stars.rotation.y = t * 0.015;
  stars.rotation.x = Math.sin(t * 0.1) * 0.06;

  camera.position.z = 10 + Math.sin(t * 0.22) * 0.18;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
