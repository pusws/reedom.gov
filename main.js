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
    panel2Body: '公民权利的价值，在于它能够被积极、理性地行使：参与公共讨论、尊重事实、维护他人尊严。责任感让"我的自由"与"我们的未来"不再冲突。',
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

/* ─────────────────────────────────────────────
   THREE.JS  –  Civic Cosmos Scene
───────────────────────────────────────────── */
const canvas = document.querySelector('#cosmos');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0.5, 11);

const root = new THREE.Group();
scene.add(root);

/* Lighting */
scene.add(new THREE.AmbientLight('#6a8fff', 0.45));
const keyLight = new THREE.PointLight('#f9d98f', 2.2, 120);
keyLight.position.set(6, 5, 8);
scene.add(keyLight);
const fillLight = new THREE.PointLight('#4a7aff', 1.4, 100);
fillLight.position.set(-7, -3, 5);
scene.add(fillLight);
const rimLight = new THREE.PointLight('#c8d8ff', 0.9, 80);
rimLight.position.set(0, 8, -4);
scene.add(rimLight);
const groundLight = new THREE.PointLight('#ff9f6a', 0.6, 60);
groundLight.position.set(2, -5, 3);
scene.add(groundLight);

/* ── 1. AURORA BACKGROUND ── */
const auroraMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.18;

      float n1 = smoothNoise(uv * 3.2 + vec2(t * 0.7, t * 0.4));
      float n2 = smoothNoise(uv * 5.8 - vec2(t * 0.5, t * 0.9));
      float curtain = smoothstep(0.35, 0.65, uv.y + (n1 - 0.5) * 0.45);
      curtain *= (1.0 - smoothstep(0.5, 1.0, uv.y));

      vec3 col1 = vec3(0.1, 0.28, 0.82);
      vec3 col2 = vec3(0.48, 0.14, 0.76);
      vec3 col3 = vec3(0.0, 0.72, 0.62);
      float blend = sin(uv.x * 4.0 + t * 1.4) * 0.5 + 0.5;
      float blend2 = cos(uv.x * 3.2 - t * 0.8) * 0.5 + 0.5;
      vec3 aurora = mix(mix(col1, col2, blend), col3, blend2 * 0.5);

      float streak = smoothstep(0.3, 0.5, n2) * smoothstep(0.8, 0.5, n2);
      aurora += streak * vec3(0.6, 0.9, 1.0) * 0.4;

      gl_FragColor = vec4(aurora, curtain * 0.38);
    }
  `,
});
const aurora = new THREE.Mesh(new THREE.SphereGeometry(80, 48, 48), auroraMat);
scene.add(aurora);

/* ── 2. STARFIELD ── */
const starCount = 2800;
const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(starCount * 3);
const starSize = new Float32Array(starCount);
for (let i = 0; i < starCount; i++) {
  starPos[i * 3] = (Math.random() - 0.5) * 130;
  starPos[i * 3 + 1] = (Math.random() - 0.5) * 90;
  starPos[i * 3 + 2] = -Math.random() * 70 - 10;
  starSize[i] = Math.random();
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
starGeo.setAttribute('aSize', new THREE.BufferAttribute(starSize, 1));

const starMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    attribute float aSize;
    uniform float uTime;
    varying float vSize;
    void main() {
      vSize = aSize;
      float twinkle = 0.75 + sin(uTime * 2.4 + aSize * 12.0) * 0.25;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = (0.8 + aSize * 2.2) * twinkle * (280.0 / -mv.z);
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    varying float vSize;
    void main() {
      float d = distance(gl_PointCoord, vec2(0.5));
      float a = smoothstep(0.5, 0.05, d);
      vec3 col = mix(vec3(0.75, 0.85, 1.0), vec3(1.0, 0.95, 0.8), vSize);
      gl_FragColor = vec4(col, a * 0.9);
    }
  `,
});
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

/* ── 3. NEBULA CLOUD ── */
const nebulaMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  side: THREE.DoubleSide,
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(113.1, 217.3))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      f = f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
    }
    float fbm(vec2 p) {
      float v = 0.0; float a = 0.5;
      for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.1; a*=0.5; }
      return v;
    }

    void main() {
      vec2 uv = (vUv - 0.5) * 2.8;
      float t = uTime * 0.07;
      float f = fbm(uv + fbm(uv + fbm(uv + t)));
      float mask = smoothstep(0.9, 0.0, length(uv));
      vec3 c1 = vec3(0.08, 0.15, 0.55);
      vec3 c2 = vec3(0.45, 0.12, 0.65);
      vec3 c3 = vec3(0.0, 0.5, 0.75);
      vec3 col = mix(c1, mix(c2, c3, f * 1.4), f);
      gl_FragColor = vec4(col, f * mask * 0.28);
    }
  `,
});
const nebula = new THREE.Mesh(new THREE.PlaneGeometry(26, 18), nebulaMat);
nebula.position.z = -6;
scene.add(nebula);

/* ── 4. DNA DOUBLE HELIX – Rights & Responsibilities intertwined ── */
const helixGroup = new THREE.Group();
root.add(helixGroup);

const helixStrandA = [];
const helixStrandB = [];
const helixRungsGroup = new THREE.Group();
helixGroup.add(helixRungsGroup);

const HELIX_TURNS = 3.5;
const HELIX_HEIGHT = 5.5;
const HELIX_RADIUS = 0.78;
const HELIX_STEPS = 120;

for (let i = 0; i <= HELIX_STEPS; i++) {
  const t = i / HELIX_STEPS;
  const angle = t * Math.PI * 2 * HELIX_TURNS;
  const y = -HELIX_HEIGHT / 2 + t * HELIX_HEIGHT;
  helixStrandA.push(new THREE.Vector3(Math.cos(angle) * HELIX_RADIUS, y, Math.sin(angle) * HELIX_RADIUS));
  helixStrandB.push(new THREE.Vector3(Math.cos(angle + Math.PI) * HELIX_RADIUS, y, Math.sin(angle + Math.PI) * HELIX_RADIUS));
}

function makeHelixStrand(points, color) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, 200, 0.028, 8, false);
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.55,
    roughness: 0.3,
    metalness: 0.5,
    transparent: true,
    opacity: 0.85,
  });
  return new THREE.Mesh(geo, mat);
}

helixGroup.add(makeHelixStrand(helixStrandA, '#f4c57b'));
helixGroup.add(makeHelixStrand(helixStrandB, '#7da3ff'));

for (let i = 0; i < HELIX_STEPS; i += 5) {
  const a = helixStrandA[i];
  const b = helixStrandB[i];
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const rungGeo = new THREE.CylinderGeometry(0.012, 0.012, len, 6);
  const rungMat = new THREE.MeshBasicMaterial({
    color: i % 10 === 0 ? '#ffe0a0' : '#9ab8ff',
    transparent: true,
    opacity: 0.55,
  });
  const rung = new THREE.Mesh(rungGeo, rungMat);
  rung.position.copy(mid);
  rung.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  helixRungsGroup.add(rung);
}

helixGroup.position.set(-3.2, 0, 0);
helixGroup.rotation.z = 0.18;

/* ── 5. LIBERTY TORCH – Central flame beacon ── */
const torchGroup = new THREE.Group();
root.add(torchGroup);

const torchHandleGeo = new THREE.CylinderGeometry(0.07, 0.11, 1.4, 16);
const torchHandleMat = new THREE.MeshStandardMaterial({
  color: '#c8a060',
  emissive: '#7a5520',
  roughness: 0.4,
  metalness: 0.7,
});
const torchHandle = new THREE.Mesh(torchHandleGeo, torchHandleMat);
torchHandle.position.y = -0.7;
torchGroup.add(torchHandle);

const torchCupGeo = new THREE.CylinderGeometry(0.24, 0.08, 0.34, 20);
const torchCup = new THREE.Mesh(torchCupGeo, torchHandleMat);
torchCup.position.y = 0.04;
torchGroup.add(torchCup);

const flameMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  side: THREE.DoubleSide,
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      float flicker = sin(uTime * 8.0 + position.y * 5.0) * 0.04
                    + cos(uTime * 5.3 + position.x * 7.0) * 0.03;
      pos.x += flicker * (1.0 - uv.y);
      pos.z += flicker * 0.7 * (1.0 - uv.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      float core = smoothstep(0.5, 0.0, distance(vUv, vec2(0.5, 0.15)));
      float outer = smoothstep(1.0, 0.0, length(vec2((vUv.x-0.5)*2.0, vUv.y * 0.9 - 0.1)));
      float flicker = 0.82 + sin(uTime * 7.2) * 0.18;
      vec3 innerCol = vec3(1.0, 0.97, 0.82);
      vec3 midCol = vec3(1.0, 0.62, 0.08);
      vec3 outerCol = vec3(0.9, 0.18, 0.02);
      vec3 col = mix(outerCol, mix(midCol, innerCol, core * 1.5), outer);
      float alpha = outer * flicker * (0.85 - vUv.y * 0.3);
      gl_FragColor = vec4(col, alpha);
    }
  `,
});

const flameGeo = new THREE.ConeGeometry(0.28, 0.85, 20, 8, true);
const flame = new THREE.Mesh(flameGeo, flameMat);
flame.position.y = 0.64;
torchGroup.add(flame);

const flameGlow = new THREE.Mesh(
  new THREE.SphereGeometry(0.45, 16, 16),
  new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec3 vPos; void main(){ vPos=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uTime;
      varying vec3 vPos;
      void main(){
        float r = length(vPos) / 0.45;
        float glow = smoothstep(1.0, 0.0, r);
        float flicker = 0.7 + sin(uTime*6.4)*0.3;
        vec3 col = mix(vec3(1.0,0.55,0.05), vec3(1.0,0.92,0.5), glow);
        gl_FragColor = vec4(col, glow*glow*0.6*flicker);
      }
    `,
  })
);
flameGlow.position.y = 0.55;
torchGroup.add(flameGlow);

const fireParticleCount = 280;
const firePosArr = new Float32Array(fireParticleCount * 3);
const fireLife = new Float32Array(fireParticleCount);
const fireVelArr = new Float32Array(fireParticleCount * 3);
for (let i = 0; i < fireParticleCount; i++) {
  fireLife[i] = Math.random();
  firePosArr[i * 3] = (Math.random() - 0.5) * 0.2;
  firePosArr[i * 3 + 1] = Math.random() * 0.6 + 0.3;
  firePosArr[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  fireVelArr[i * 3] = (Math.random() - 0.5) * 0.008;
  fireVelArr[i * 3 + 1] = 0.012 + Math.random() * 0.018;
  fireVelArr[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
}
const fireGeo = new THREE.BufferGeometry();
fireGeo.setAttribute('position', new THREE.BufferAttribute(firePosArr, 3));
fireGeo.setAttribute('aLife', new THREE.BufferAttribute(fireLife, 1));
const fireMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    attribute float aLife;
    uniform float uTime;
    varying float vLife;
    void main() {
      vLife = aLife;
      float t = mod(aLife + uTime * 0.55, 1.0);
      vec3 pos = position;
      pos.y += t * 0.9;
      pos.x += sin(t * 12.0 + aLife * 6.28) * 0.08 * (1.0 - t);
      pos.z += cos(t * 10.0 + aLife * 6.28) * 0.08 * (1.0 - t);
      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (1.0 - t) * 14.0 * (200.0 / -mv.z);
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    varying float vLife;
    void main() {
      float d = distance(gl_PointCoord, vec2(0.5));
      float a = smoothstep(0.5, 0.0, d);
      float t = mod(vLife, 1.0);
      vec3 col = mix(vec3(1.0, 0.9, 0.3), vec3(1.0, 0.15, 0.0), t * 1.2);
      gl_FragColor = vec4(col, a * (1.0 - t * 1.1));
    }
  `,
});
const fireParticles = new THREE.Points(fireGeo, fireMat);
torchGroup.add(fireParticles);

torchGroup.position.set(2.6, -0.4, 0);

/* ── 6. CONSTITUTION RINGS – Law / Rights / Participation ── */
const ringGroup = new THREE.Group();
root.add(ringGroup);

const ringColors = ['#f4c57b', '#8ab4ff', '#a8ffda'];
const ringLabels = ['LAW', 'RIGHTS', 'PARTICIPATION'];
const ringRadii = [3.8, 3.0, 2.3];
const ringInclinations = [0.28, -0.35, 0.55];
const ringAzimuths = [0, 1.1, 2.3];
const constitutionRings = [];

ringColors.forEach((color, i) => {
  const ringMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uPhase: { value: i * 2.1 },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uPhase;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave = sin(uv.x * 28.0 + uTime * 2.2 + uPhase) * 0.04;
        pos.z += wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uPhase;
      varying vec2 vUv;
      void main() {
        float band = smoothstep(0.3, 0.5, abs(sin(vUv.x * 52.0 + uTime * 1.8 + uPhase)));
        float radial = smoothstep(0.0, 0.35, vUv.y) * (1.0 - smoothstep(0.65, 1.0, vUv.y));
        float glow = sin(vUv.x * 6.28 * 3.0 + uTime * 1.2 + uPhase) * 0.5 + 0.5;
        vec3 col = uColor + vec3(0.3) * glow * 0.4;
        float alpha = radial * (0.35 + band * 0.3) * (0.6 + glow * 0.4);
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });

  const ringGeo = new THREE.RingGeometry(ringRadii[i] - 0.06, ringRadii[i] + 0.06, 180, 3);
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = ringInclinations[i];
  ring.rotation.z = ringAzimuths[i];
  ringGroup.add(ring);
  constitutionRings.push(ring);
});

/* ── 7. SCALE OF JUSTICE orb ── */
const scalesGroup = new THREE.Group();
root.add(scalesGroup);

const beamGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.6, 8);
const beamMat = new THREE.MeshStandardMaterial({ color: '#f0c060', emissive: '#9a7020', roughness: 0.3, metalness: 0.8 });
const beam = new THREE.Mesh(beamGeo, beamMat);
beam.rotation.z = Math.PI / 2;
scalesGroup.add(beam);

const pivotGeo = new THREE.SphereGeometry(0.065, 12, 12);
const pivot = new THREE.Mesh(pivotGeo, beamMat);
scalesGroup.add(pivot);

const plateMat = new THREE.MeshStandardMaterial({ color: '#e8c870', emissive: '#7a5a10', roughness: 0.25, metalness: 0.85 });

function makeScalePlate(side) {
  const g = new THREE.Group();
  const chainGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.36, 6);
  const chain = new THREE.Mesh(chainGeo, beamMat);
  chain.position.y = -0.18;
  g.add(chain);
  const plateGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.028, 24);
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.position.y = -0.38;
  g.add(plate);
  g.position.x = side * 0.8;
  return g;
}

const leftPlate = makeScalePlate(-1);
const rightPlate = makeScalePlate(1);
scalesGroup.add(leftPlate);
scalesGroup.add(rightPlate);

const columnGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.65, 12);
const column = new THREE.Mesh(columnGeo, beamMat);
column.position.y = -0.36;
scalesGroup.add(column);

scalesGroup.position.set(0, 1.4, 1.2);
scalesGroup.scale.setScalar(0.85);

/* ── 8. CIVIC PILLARS – Law / Rights / Participation ── */
const pillarGroup = new THREE.Group();
root.add(pillarGroup);
const pillarColors = ['#f4c57b', '#7da3ff', '#c7d7ff'];
const pillars = [];

for (let i = 0; i < 3; i++) {
  const angle = (Math.PI * 2 * i) / 3;
  const px = Math.cos(angle) * 1.6;
  const pz = Math.sin(angle) * 1.6;

  const baseGeo = new THREE.BoxGeometry(0.22, 0.08, 0.22);
  const baseMat = new THREE.MeshStandardMaterial({ color: pillarColors[i], emissive: pillarColors[i], emissiveIntensity: 0.3, roughness: 0.4, metalness: 0.6 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(px, -1.1, pz);

  const shaftGeo = new THREE.CylinderGeometry(0.055, 0.07, 1.4, 12);
  const shaft = new THREE.Mesh(shaftGeo, baseMat);
  shaft.position.set(px, -0.34, pz);

  const capGeo = new THREE.BoxGeometry(0.24, 0.07, 0.24);
  const cap = new THREE.Mesh(capGeo, baseMat);
  cap.position.set(px, 0.37, pz);

  const glowMat = new THREE.MeshBasicMaterial({ color: pillarColors[i], transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false });
  const glowGeo = new THREE.CylinderGeometry(0.12, 0.14, 1.5, 12);
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set(px, -0.34, pz);

  pillarGroup.add(base, shaft, cap, glow);
  pillars.push({ shaft, glow, phase: i * 2.1 });
}

/* ── 9. CONSENSUS SPARKS ── */
const sparkCount = 2400;
const sparkGeo = new THREE.BufferGeometry();
const sparkPositions = new Float32Array(sparkCount * 3);
const sparkData = new Float32Array(sparkCount * 2);

for (let i = 0; i < sparkCount; i++) {
  const phi = Math.acos(1 - 2 * Math.random());
  const theta = Math.PI * 2 * Math.random();
  const r = 2.4 + Math.random() * 3.2;
  sparkPositions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
  sparkPositions[i * 3 + 1] = Math.cos(phi) * r;
  sparkPositions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
  sparkData[i * 2] = Math.random() * Math.PI * 2;
  sparkData[i * 2 + 1] = Math.random();
}
sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
sparkGeo.setAttribute('aData', new THREE.BufferAttribute(sparkData, 2));

const sparks = new THREE.Points(
  sparkGeo,
  new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute vec2 aData;
      uniform float uTime;
      varying float vBrightness;
      void main() {
        float phase = aData.x;
        float kind = aData.y;
        float breath = 0.86 + sin(uTime * 1.6 + phase) * 0.2;
        vec3 pos = position * breath;
        float drift = sin(uTime * 0.8 + phase) * 0.04;
        pos.x += drift;
        pos.y += cos(uTime * 0.6 + phase) * 0.03;
        vBrightness = 0.5 + sin(uTime * 2.8 + phase) * 0.5;
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        float size = (1.8 + kind * 2.5 + sin(phase + uTime * 2.2) * 0.9);
        gl_PointSize = size * (320.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying float vBrightness;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        float core = smoothstep(0.18, 0.0, d);
        float halo = smoothstep(0.5, 0.15, d);
        vec3 cold = vec3(0.45, 0.65, 1.0);
        vec3 warm = vec3(1.0, 0.85, 0.55);
        vec3 col = mix(cold, warm, gl_PointCoord.y);
        float alpha = (halo * 0.5 + core * 0.5) * vBrightness;
        gl_FragColor = vec4(col, alpha * 0.75);
      }
    `,
  })
);
root.add(sparks);

/* ── 10. ORBITING CIVIC SATELLITES ── */
const satellites = [];
const satGeos = [
  new THREE.TetrahedronGeometry(0.14, 0),
  new THREE.OctahedronGeometry(0.12, 0),
  new THREE.IcosahedronGeometry(0.11, 0),
  new THREE.DodecahedronGeometry(0.1, 0),
  new THREE.TorusGeometry(0.1, 0.032, 8, 16),
];
const satColors = ['#ffdca7', '#9ab6ff', '#a8ffda', '#ffb3d1', '#ffe080'];
const satEmissive = ['#9e6020', '#2a4f9e', '#007a54', '#8a1850', '#9a7a00'];

for (let i = 0; i < 5; i++) {
  const mat = new THREE.MeshStandardMaterial({
    color: satColors[i],
    emissive: satEmissive[i],
    emissiveIntensity: 0.9,
    roughness: 0.2,
    metalness: 0.7,
  });
  const mesh = new THREE.Mesh(satGeos[i], mat);

  const trailGeo = new THREE.BufferGeometry();
  const trailPoints = [];
  const trailLen = 32;
  for (let j = 0; j < trailLen; j++) trailPoints.push(new THREE.Vector3());
  trailGeo.setFromPoints(trailPoints);
  const trailMat = new THREE.LineBasicMaterial({ color: satColors[i], transparent: true, opacity: 0.28 });
  const trail = new THREE.Line(trailGeo, trailMat);
  root.add(trail);

  root.add(mesh);
  satellites.push({
    mesh,
    trail,
    trailPoints,
    radius: 2.8 + i * 0.42,
    speed: 0.28 + i * 0.08,
    offset: i * (Math.PI * 2 / 5),
    tilt: (i - 2) * 0.3,
    spin: 0,
  });
}

/* ── 11. ENERGY STREAMS – flowing civic connections ── */
const streamGroup = new THREE.Group();
root.add(streamGroup);

function makeStream(color, turns, heightRange, radiusRange, phase) {
  const pts = [];
  for (let i = 0; i <= 260; i++) {
    const t = i / 260;
    const a = t * Math.PI * 2 * turns + phase;
    const r = radiusRange[0] + t * (radiusRange[1] - radiusRange[0]);
    pts.push(new THREE.Vector3(
      Math.cos(a) * r,
      heightRange[0] + t * (heightRange[1] - heightRange[0]),
      Math.sin(a) * r
    ));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const geo = new THREE.TubeGeometry(curve, 320, 0.015, 6, false);
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.38 });
  return new THREE.Mesh(geo, mat);
}

const stream1 = makeStream('#f6d59b', 4.2, [-2.6, 2.6], [0.6, 2.2], 0);
const stream2 = makeStream('#8ab8ff', 3.8, [-2.2, 2.2], [0.8, 2.5], Math.PI * 0.7);
const stream3 = makeStream('#a8ffd8', 5.1, [-1.8, 1.8], [0.5, 1.8], Math.PI * 1.4);
streamGroup.add(stream1, stream2, stream3);

/* ── 12. CIVIC PULSE RINGS ── */
const civicPulses = [];
for (let i = 0; i < 6; i++) {
  const mat = new THREE.MeshBasicMaterial({
    color: i % 3 === 0 ? '#ffd9a0' : i % 3 === 1 ? '#8db0ff' : '#a8ffd8',
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.RingGeometry(2.0, 2.22, 128, 1), mat);
  mesh.rotation.x = Math.PI / 2;
  mesh.visible = false;
  root.add(mesh);
  civicPulses.push({ mesh, birth: -99 });
}
let pulseCursor = 0;
let lastPulseTime = 0;

/* ── MOUSE ── */
let pointerX = 0;
let pointerY = 0;
window.addEventListener('pointermove', (e) => {
  pointerX = (e.clientX / window.innerWidth) * 2 - 1;
  pointerY = (e.clientY / window.innerHeight) * 2 - 1;
});

/* ── ANIMATE ── */
const clock = new THREE.Clock();
let trailTick = 0;

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  auroraMat.uniforms.uTime.value = t;
  starMat.uniforms.uTime.value = t;
  nebulaMat.uniforms.uTime.value = t;
  stars.rotation.y = t * 0.012;
  stars.rotation.x = Math.sin(t * 0.07) * 0.04;

  helixGroup.rotation.y = t * 0.22;
  helixGroup.rotation.x = Math.sin(t * 0.3) * 0.06;

  torchGroup.rotation.y = Math.sin(t * 0.4) * 0.18;
  flameMat.uniforms.uTime.value = t;
  flameGlow.material.uniforms.uTime.value = t;
  fireMat.uniforms.uTime.value = t;
  const flameScale = 1 + Math.sin(t * 6.8) * 0.05;
  flame.scale.set(flameScale, 1 + Math.sin(t * 5.2) * 0.07, flameScale);

  ringGroup.rotation.y = t * 0.07;
  constitutionRings.forEach((ring, i) => {
    ring.material.uniforms.uTime.value = t;
    ring.rotation.z += 0.003 * (i % 2 === 0 ? 1 : -1);
  });

  const scaleWave = Math.sin(t * 1.1) * 0.08;
  leftPlate.rotation.z = scaleWave;
  rightPlate.rotation.z = -scaleWave;
  leftPlate.position.y = Math.sin(t * 1.1) * 0.06;
  rightPlate.position.y = -Math.sin(t * 1.1) * 0.06;
  scalesGroup.rotation.y = t * 0.15;

  pillarGroup.rotation.y = t * 0.14;
  pillars.forEach((p, i) => {
    const w = Math.sin(t * 1.8 + p.phase) * 0.22;
    p.shaft.scale.y = 0.88 + w * 0.22;
    p.shaft.position.y = -0.34 + w * 0.18;
    p.glow.material.opacity = 0.12 + (w + 0.22) * 0.18;
  });

  stream1.rotation.y = t * 0.11;
  stream2.rotation.y = -t * 0.14;
  stream3.rotation.y = t * 0.09;
  stream1.material.opacity = 0.28 + Math.sin(t * 1.7) * 0.1;
  stream2.material.opacity = 0.28 + Math.sin(t * 2.1 + 1) * 0.1;
  stream3.material.opacity = 0.24 + Math.sin(t * 1.4 + 2) * 0.1;

  if (t - lastPulseTime > 0.95) {
    const p = civicPulses[pulseCursor % civicPulses.length];
    pulseCursor++;
    p.birth = t;
    p.mesh.visible = true;
    p.mesh.scale.setScalar(1);
    p.mesh.position.y = -0.6;
    lastPulseTime = t;
  }
  civicPulses.forEach((p) => {
    if (!p.mesh.visible) return;
    const age = t - p.birth;
    if (age > 2.8) { p.mesh.visible = false; return; }
    p.mesh.scale.setScalar(1 + age * 1.3);
    p.mesh.position.y = -0.6 + age * 0.28;
    p.mesh.material.opacity = (1 - age / 2.8) * 0.32;
  });

  trailTick++;
  satellites.forEach((sat, i) => {
    const angle = t * sat.speed + sat.offset;
    const nx = Math.cos(angle) * sat.radius;
    const ny = sat.tilt * Math.sin(t * 0.55 + i) * 0.7 + Math.sin(t * 0.7 + i * 1.3) * 0.3;
    const nz = Math.sin(angle) * sat.radius;
    sat.mesh.position.set(nx, ny, nz);
    sat.mesh.rotation.x = t * 0.9;
    sat.mesh.rotation.y = -t * 0.6;

    if (trailTick % 2 === 0) {
      sat.trailPoints.unshift(sat.mesh.position.clone());
      if (sat.trailPoints.length > 32) sat.trailPoints.pop();
      sat.trail.geometry.setFromPoints(sat.trailPoints);
      sat.trail.material.opacity = 0.18 + Math.sin(t * 1.2 + i) * 0.1;
    }
  });

  sparks.material.uniforms.uTime.value = t;
  sparks.rotation.y = t * 0.07;
  sparks.rotation.x = Math.sin(t * 0.28) * 0.18;

  root.rotation.y += (pointerX * 0.22 - root.rotation.y) * 0.025;
  root.rotation.x += (-pointerY * 0.1 - root.rotation.x) * 0.025;

  camera.position.y = 0.5 + Math.sin(t * 0.18) * 0.12;
  camera.position.z = 11 + Math.sin(t * 0.22) * 0.22;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
