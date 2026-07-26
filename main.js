import * as THREE from 'three';

// Add ?fogOnly=1 to the URL to display only the fog bands.
const FOG_DEBUG_ONLY =
  new URLSearchParams(window.location.search)
    .get('fogOnly') === '1';
const SHOW_SCENE_CONTROLS =
  new URLSearchParams(window.location.search)
    .get('controls') === '1';

const CONFIG = {
  // Number of physical planes forming the terrain strip.
  // It may be larger than the number of available textures.
  horizonPlaneCount: 20,

  planeWidth: 4000,
  planeLength: 700,
  planeOverlap: 0,

  flightSpeed: 15,
  minSpeed: 8,
  maxSpeed: 72,

  cameraFov: 48,
  cameraY: 56,
  cameraZ: 86,
  lookAtY: -16,
  lookAtZ: -320,

  shipHeight: 0.74,
  mobilePortraitShipScale: 0.60,
  engineFlareColor: '#ffffff',
  engineFlareOpacity: 0.72,
  engineFlareSize: 0.22,
  engineFlare1X: -0.355,
  engineFlare1Y: -0.085,
  engineFlare2X: -0.235,
  engineFlare2Y: -0.105,
  engineFlare3X: 0.100,
  engineFlare3Y: -0.180,
  engineFlare4X: 0.235,
  engineFlare4Y: -0.195,
  navigationLight1X: -0.380,
  navigationLight1Y: 0.440,
  navigationLight2X: -0.370,
  navigationLight2Y: -0.390,
  navigationLight3X: 0.410,
  navigationLight3Y: 0.260,
  navigationLight4X: 0.330,
  navigationLight4Y: -0.470,

  skyParticleColor: '#894010',
  skyParticleOpacity: 0.74,
  skyParticleSize: 0.14,
  skyParticleSpeed: 0.09,
  skyParticleOriginX: 0.20,
  skyParticleOriginY: 0.26,
  skyParticleOriginZ: -3.0,
  skyParticleSpawnWidth: 2.40,
  skyParticleSpawnHeight: 0.20,
  skyParticleDirectionX: -2.07,
  skyParticleDirectionY: -2.60,
  skyParticleSpreadX: 1.00,
  skyParticleSpreadY: 0.35,

  fallingParticleColor: '#4c2f06',
  fallingParticleOpacity: 1,
  fallingParticleSize: 0.15,
  fallingParticleSpeed: 0.28,
  fallingParticleOriginX: 0.39,
  fallingParticleOriginY: 0.13,
  fallingParticleOriginZ: -15,
  fallingParticleSpawnWidth: 3.45,
  fallingParticleSpawnHeight: 2,
  fallingParticleDirectionX: 3,
  fallingParticleDirectionY: -2.6,
  fallingParticleSpreadX: 1,
  fallingParticleSpreadY: 0.35,

  cloudEnabled: true,
  cloudMode: 'dust',
  cloudGroupCount: 18,
  cloudLobeCount: 16,
  cloudColor: '#4e2015',
  cloudOpacity: 0.17,
  cloudSizeMin: 0.18,
  cloudSizeMax: 1.23,
  cloudStretch: 1.55,
  cloudSoftness: 1,
  cloudSpeed: 0.06,
  cloudLifetime: 1.85,
  cloudTurbulence: 0.12,
  cloudRotationSpeed: 0.02,
  cloudOriginX: 0,
  cloudOriginY: 0.25,
  cloudOriginZ: -14,
  cloudSpawnWidth: 2.8,
  cloudSpawnHeight: 1.2,
  cloudDirectionX: -1.22,
  cloudDirectionY: -0.65,
  cloudSpreadX: 1.8,
  cloudSpreadY: 0.35,
  cloudFrontRatio: 0.75,

  // Global position of the terrain group.
  terrainPositionX: -140,
  terrainPositionY: -34,
  terrainPositionZ: 0,

  // Global rotation of the terrain group, expressed in degrees.
  terrainRotationX: 12.5,  // rotation in x
  terrainRotationY: -16.5,
  terrainRotationZ: -2, // rotation z

  // Subtle lateral drift during flight.
  terrainDriftAmount: 5,
  terrainDriftSpeed: 0.1,

  // Simulated visual curvature of Mars.
  // Distant planes progressively descend.
  planetCurveStrength: 0.000025,
  terrainElevation: 4,
  terrainNoiseScale: 0.035,
  terrainNoiseMode: 'billow',
  terrainNoiseOctaves: 4,
  terrainNoiseLacunarity: 2,
  terrainNoiseGain: 0.5,
  terrainNoiseSharpness: 0.25,
  terrainNoiseSeed: 7,
  terrainNoiseOffset: 1,
  terrainBaseElevation: 1.75,
  terrainFadeEdges: true,
  terrainEdgeFadePower: 1.15,

  // Scene fog.
  fogColor: 0x6a2118,
  fogNear: 390,
  fogFar: 940,

  // Banda atmosférica del horizonte.
  fogBandWidth: 2000,
  fogBandHeight: 90,
  fogBandX: -290,
  fogBandY: 160,
  fogBandZ: -530,
  fogBandRotationX: 0,
  fogBandRotationY: 0,
  fogBandRotationZ: -3.5,
  fogBandColor: '#f0aba3',
  fogBandOpacity: 0.5,

  fogBand2Width: 2000,
  fogBand2Height: 35,
  fogBand2X: 25,
  fogBand2Y: 145,
  fogBand2Z: -510,
  fogBand2RotationX: 0,
  fogBand2RotationY: 0,
  fogBand2RotationZ: -3,
  fogBand2Color: '#bb3535',
  fogBand2Opacity: 0.35,

  terrainTextureRepeatX: 12,
  terrainTextureRepeatY: 1,
  terrainTextureOffsetX: -0.74,
  terrainTextureOffsetY: 0,

  terrainDetailEnabled: true,
  terrainDetailColor: '#170608',
  terrainDetailOpacity: 0.54,
  terrainDetailBlendMode: 'multiply',
  terrainDetailScale: 6.75,
  terrainDetailThreshold: 0.41,
  terrainDetailContrast: 1.85,
  terrainDetailSeed: 33,
  terrainDetailRepeatX: 2.25,
  terrainDetailRepeatY: 1,
  terrainDetailOffsetX: 0,
  terrainDetailOffsetY: 0,

  youtubeProjectionWidth: 120,
  youtubeProjectionOpacity: 0.82,
  youtubeProjectionX: 38,
  youtubeProjectionY: 16,
  youtubeProjectionPerspective: 1800,
  youtubeProjectionScale: 3,
  youtubeProjectionRotationX: 59,
  youtubeProjectionRotationY: 1.5,
  youtubeProjectionRotationZ: 16.5,
};

CONFIG.planeSpacing =
  CONFIG.planeLength -
  CONFIG.planeOverlap;

const TERRAIN_FILES = [
  './assets/mars_tile_02.jpg',
  // './assets/mars_tile_02.png',
  // './assets/mars_tile_03.png',
];

const canvas = document.querySelector('#scene');
const overlayCanvas =
  document.querySelector(
    '#overlay-scene',
  );
const loading = document.querySelector('#loading');
const debugPanel = document.querySelector('#debug');
const debugSpeed = document.querySelector('#debug-speed');
const debugFps = document.querySelector('#debug-fps');
const sceneControls = document.querySelector('#scene-controls');
const youtubeProjection =
  document.querySelector(
    '#terrain-video-projection',
  );
const wireframeToggle =
  document.querySelector(
    '#wireframe-toggle',
  );

if (sceneControls) {
  sceneControls.hidden =
    !SHOW_SCENE_CONTROLS;
}

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error('The main canvas was not found.');
}

if (
  !(
    overlayCanvas instanceof
    HTMLCanvasElement
  )
) {
  throw new Error(
    'The overlay canvas was not found.',
  );
}

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.setClearColor(0x000000, 0);
renderer.autoClear = false;

const overlayRenderer =
  new THREE.WebGLRenderer({
    canvas: overlayCanvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });

overlayRenderer.outputColorSpace =
  THREE.SRGBColorSpace;
overlayRenderer.toneMapping =
  THREE.ACESFilmicToneMapping;
overlayRenderer.toneMappingExposure =
  1.02;
overlayRenderer.setClearColor(
  0x000000,
  0,
);

const terrainScene = new THREE.Scene();

terrainScene.fog = new THREE.Fog(
  CONFIG.fogColor,
  CONFIG.fogNear,
  CONFIG.fogFar,
);

const terrainGroup = new THREE.Group();
terrainGroup.name = 'MarsTerrainGroup';

terrainScene.add(terrainGroup);
applyTerrainGroupTransform();

const camera = new THREE.PerspectiveCamera(
  CONFIG.cameraFov,
  window.innerWidth / window.innerHeight,
  0.1,
  2000,
);

camera.position.set(
  0,
  CONFIG.cameraY,
  CONFIG.cameraZ,
);

camera.lookAt(
  0,
  CONFIG.lookAtY,
  CONFIG.lookAtZ,
);

const overlayScene = new THREE.Scene();

const overlayCamera = new THREE.OrthographicCamera(
  -1,
  1,
  1,
  -1,
  -10,
  10,
);

overlayCamera.position.z = 5;

const textureLoader = new THREE.TextureLoader();
const clock = new THREE.Clock();
const glowTexture = createGlowTexture();

let flightSpeed = CONFIG.flightSpeed;
let paused = false;
let terrainTextures = [];
let shipReady = false;
let terrainReady = false;
let frameCounter = 0;
let fpsElapsed = 0;
let fpsValue = 0;
let lastTime = 0;
let engineFlareIntensity = 0.7;
let engineFlareTarget = 0.7;
let engineFlareFlickerTimer = 0;
let wireframeEnabled = false;

const planes = [];
const skyParticles = [];
const skyParticleMaterials = [];
const fallingParticles = [];
const fallingParticleMaterials = [];
const cloudGroups = [];
const cloudMaterials = [];
let cloudTexture = null;

boot().catch((error) => {
  console.error(error);

  if (loading) {
    loading.textContent =
      'The scene could not be prepared';
  }
});

async function boot() {
  const [
    shipTexture,
    ...tileTextures
  ] = await Promise.all([
    loadTexture('./assets/spaceship11_ver2.png'),
    ...TERRAIN_FILES.map(loadTexture),
  ]);

  terrainTextures = tileTextures;

  for (const texture of terrainTextures) {
    texture.colorSpace =
      THREE.SRGBColorSpace;

    texture.anisotropy = Math.min(
      8,
      renderer.capabilities.getMaxAnisotropy(),
    );

    texture.minFilter =
      THREE.LinearMipmapLinearFilter;

    texture.magFilter =
      THREE.LinearFilter;

    texture.wrapS =
      THREE.MirroredRepeatWrapping;

    texture.wrapT =
      THREE.MirroredRepeatWrapping;

    texture.repeat.set(
      CONFIG.terrainTextureRepeatX,
      CONFIG.terrainTextureRepeatY,
    );
    texture.offset.set(
      CONFIG.terrainTextureOffsetX,
      CONFIG.terrainTextureOffsetY,
    );
  }

  createStars();
  createHorizonFogBand(
    'HorizonFogBand',
    'fogBand',
    100,
  );
  createHorizonFogBand(
    'HorizonFogBand2',
    'fogBand2',
    101,
  );
  createTerrainPlanes();
  alignTerrainPlaneChain();

  terrainReady = true;

  createShipOverlay(shipTexture);
  createSkyParticles();
  createFallingSpaceParticles();
  createCloudParticles();

  shipReady = true;

  applyFogDebugMode();
  setupSceneControls();
  setupWireframeControl();
  setupEvents();
  resize();
  revealExperienceWhenReady();

  renderer.setAnimationLoop(animate);
}

function applyTerrainGroupTransform() {
  terrainGroup.position.set(
    CONFIG.terrainPositionX,
    CONFIG.terrainPositionY,
    CONFIG.terrainPositionZ,
  );

  terrainGroup.rotation.set(
    THREE.MathUtils.degToRad(
      CONFIG.terrainRotationX,
    ),
    THREE.MathUtils.degToRad(
      CONFIG.terrainRotationY,
    ),
    THREE.MathUtils.degToRad(
      CONFIG.terrainRotationZ,
    ),
  );
}

function createFogTexture(
  colorValue,
  opacity,
) {
  const width = 1024;
  const height = 256;
  const fogCanvas =
    document.createElement('canvas');
  fogCanvas.width = width;
  fogCanvas.height = height;
  const context =
    fogCanvas.getContext('2d');

  if (!context) {
    throw new Error(
      'The horizon fog could not be created.',
    );
  }

  const hex =
    Number.parseInt(
      colorValue.replace('#', ''),
      16,
    );
  const red = (hex >> 16) & 255;
  const green = (hex >> 8) & 255;
  const blue = hex & 255;
  const gradient =
    context.createLinearGradient(
      0,
      0,
      0,
      height,
    );

  gradient.addColorStop(
    0,
    `rgba(${red}, ${green}, ${blue}, 0)`,
  );
  gradient.addColorStop(
    0.35,
    `rgba(${red}, ${green}, ${blue}, ${opacity * 0.64})`,
  );
  gradient.addColorStop(
    0.62,
    `rgba(${red}, ${green}, ${blue}, ${opacity})`,
  );
  gradient.addColorStop(
    1,
    `rgba(${red}, ${green}, ${blue}, 0)`,
  );
  context.fillStyle = gradient;
  context.fillRect(
    0,
    0,
    width,
    height,
  );

  const texture =
    new THREE.CanvasTexture(
      fogCanvas,
    );
  texture.colorSpace =
    THREE.SRGBColorSpace;

  return texture;
}

function createHorizonFogBand(
  name,
  configPrefix,
  renderOrder,
) {
  const texture =
    createFogTexture(
      CONFIG[`${configPrefix}Color`],
      CONFIG[`${configPrefix}Opacity`],
    );

  const material =
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
      fog: false,
    });

  const fogBand =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        CONFIG[`${configPrefix}Width`],
        CONFIG[`${configPrefix}Height`],
      ),
      material,
    );

  fogBand.name = name;
  fogBand.userData.configPrefix =
    configPrefix;
  fogBand.renderOrder = renderOrder;

  terrainScene.add(fogBand);
  updateFogBand(fogBand);
}

function applyFogDebugMode() {
  if (!FOG_DEBUG_ONLY) {
    return;
  }

  document
    .querySelector('#app')
    ?.classList.add('fog-debug-only');

  for (const object of terrainScene.children) {
    object.visible =
      object.name.startsWith(
        'HorizonFogBand',
      );
  }

  for (const object of overlayScene.children) {
    object.visible = false;
  }
}

function updateFogBand(fogBand) {
  const prefix =
    fogBand.userData.configPrefix;

  fogBand.position.set(
    CONFIG[`${prefix}X`],
    CONFIG[`${prefix}Y`],
    CONFIG[`${prefix}Z`],
  );

  fogBand.rotation.set(
    THREE.MathUtils.degToRad(
      CONFIG[`${prefix}RotationX`],
    ),
    THREE.MathUtils.degToRad(
      CONFIG[`${prefix}RotationY`],
    ),
    THREE.MathUtils.degToRad(
      CONFIG[`${prefix}RotationZ`],
    ),
  );

  fogBand.geometry.dispose();
  fogBand.geometry =
    new THREE.PlaneGeometry(
      CONFIG[`${prefix}Width`],
      CONFIG[`${prefix}Height`],
    );

  fogBand.material.map.dispose();
  fogBand.material.map =
    createFogTexture(
      CONFIG[`${prefix}Color`],
      CONFIG[`${prefix}Opacity`],
    );
  fogBand.material.needsUpdate = true;
}

function updateFogBands() {
  for (
    const name of [
      'HorizonFogBand',
      'HorizonFogBand2',
    ]
  ) {
    const fogBand =
      terrainScene.getObjectByName(name);

    if (fogBand) {
      updateFogBand(fogBand);
    }
  }
}

function updateTerrainTextureRepeat() {
  for (const texture of terrainTextures) {
    texture.repeat.set(
      CONFIG.terrainTextureRepeatX,
      CONFIG.terrainTextureRepeatY,
    );
    texture.offset.set(
      CONFIG.terrainTextureOffsetX,
      CONFIG.terrainTextureOffsetY,
    );
    texture.needsUpdate = true;
  }
}

function updateShipControls() {
  const shipGroup =
    overlayScene.getObjectByName(
      'Bebop',
    );

  if (!shipGroup) {
    return;
  }

  const isMobilePortrait =
    window.matchMedia(
      '(max-width: 600px) and (orientation: portrait)',
    ).matches;
  const responsiveShipScale =
    isMobilePortrait
      ? CONFIG.mobilePortraitShipScale
      : 1;

  shipGroup.scale.setScalar(
    CONFIG.shipHeight *
    responsiveShipScale,
  );

  const aspect =
    shipGroup.userData.shipAspect;

  for (
    let index = 1;
    index <= 4;
    index += 1
  ) {
    const flare =
      shipGroup.getObjectByName(
        `EngineFlare${index}`,
      );

    if (!flare) {
      continue;
    }

    flare.position.x =
      CONFIG[`engineFlare${index}X`] *
      aspect;
    flare.position.y =
      CONFIG[`engineFlare${index}Y`];
    flare.scale.set(
      CONFIG.engineFlareSize,
      CONFIG.engineFlareSize,
      1,
    );
    flare.material.color.set(
      CONFIG.engineFlareColor,
    );
    flare.material.opacity =
      CONFIG.engineFlareOpacity;
    flare.userData.baseOpacity =
      CONFIG.engineFlareOpacity;
  }

  for (
    let index = 1;
    index <= 4;
    index += 1
  ) {
    const light =
      shipGroup.getObjectByName(
        `NavigationLight${index}`,
      );

    if (!light) {
      continue;
    }

    light.position.x =
      CONFIG[`navigationLight${index}X`] *
      aspect;
    light.position.y =
      CONFIG[`navigationLight${index}Y`];
  }
}

function updateYoutubeProjectionControls() {
  if (!youtubeProjection) {
    return;
  }

  youtubeProjection.style.setProperty(
    '--projection-width',
    `${CONFIG.youtubeProjectionWidth}vw`,
  );
  youtubeProjection.style.setProperty(
    '--projection-opacity',
    CONFIG.youtubeProjectionOpacity,
  );
  youtubeProjection.style.setProperty(
    '--projection-x',
    `${CONFIG.youtubeProjectionX}%`,
  );
  youtubeProjection.style.setProperty(
    '--projection-y',
    `${CONFIG.youtubeProjectionY}%`,
  );
  youtubeProjection.style.setProperty(
    '--projection-perspective',
    `${CONFIG.youtubeProjectionPerspective}px`,
  );
  youtubeProjection.style.setProperty(
    '--projection-scale',
    CONFIG.youtubeProjectionScale,
  );
  youtubeProjection.style.setProperty(
    '--projection-rotation-x',
    `${CONFIG.youtubeProjectionRotationX}deg`,
  );
  youtubeProjection.style.setProperty(
    '--projection-rotation-y',
    `${CONFIG.youtubeProjectionRotationY}deg`,
  );
  youtubeProjection.style.setProperty(
    '--projection-rotation-z',
    `${CONFIG.youtubeProjectionRotationZ}deg`,
  );
}

function setupSceneControls() {
  if (!sceneControls) {
    return;
  }

  const inputs =
    sceneControls.querySelectorAll(
      '[data-config]',
    );

  const initialValues = {};

  const applyControl = (input) => {
    const key = input.dataset.config;
    const value =
      input.type === 'checkbox'
        ? input.checked
        : input.type === 'color' ||
            input instanceof
              HTMLSelectElement
        ? input.value
        : Number(input.value);

    CONFIG[key] = value;
    const output =
      input.nextElementSibling;

    if (output instanceof HTMLOutputElement) {
      output.textContent =
        input.type === 'checkbox'
          ? input.checked
            ? 'Sí'
            : 'No'
          : input.type === 'color' ||
              input instanceof
                HTMLSelectElement
          ? value
          : value.toFixed(
              input.step.includes('.')
                ? input.step.split('.')[1].length
                : 0,
            );
    }

    if (
      key.startsWith('terrainRotation') ||
      key.startsWith('terrainPosition')
    ) {
      applyTerrainGroupTransform();
    } else if (
      key.startsWith('terrainTexture')
    ) {
      updateTerrainTextureRepeat();
    } else if (
      key === 'terrainElevation' ||
      key === 'terrainBaseElevation' ||
      key === 'terrainFadeEdges' ||
      key.startsWith('terrainNoise') ||
      key.startsWith('terrainEdgeFade')
    ) {
      updateTerrainElevation();
    } else if (
      key.startsWith('terrainDetail')
    ) {
      updateTerrainDetailLayers(key);
    } else if (
      key === 'shipHeight' ||
      key === 'mobilePortraitShipScale' ||
      key.startsWith('engineFlare') ||
      key.startsWith('navigationLight')
    ) {
      updateShipControls();
    } else if (
      key.startsWith('skyParticle')
    ) {
      updateSkyParticleAppearance();
    } else if (
      key.startsWith('fallingParticle')
    ) {
      updateFallingParticleAppearance();
    } else if (
      key.startsWith('cloud')
    ) {
      updateCloudControls(key);
    } else if (
      key.startsWith('youtubeProjection')
    ) {
      updateYoutubeProjectionControls();
    } else {
      updateFogBands();
    }
  };

  for (const input of inputs) {
    const key = input.dataset.config;

    initialValues[key] = CONFIG[key];

    if (input.type === 'checkbox') {
      input.checked = CONFIG[key];
    } else {
      input.value = CONFIG[key];
    }

    applyControl(input);

    input.addEventListener(
      'input',
      () => applyControl(input),
    );
  }

  sceneControls
    .querySelector('#reset-scene-controls')
    ?.addEventListener('click', () => {
      for (const input of inputs) {
        const initialValue =
          initialValues[input.dataset.config];

        if (input.type === 'checkbox') {
          input.checked = initialValue;
        } else {
          input.value = initialValue;
        }

        applyControl(input);
      }
    });
}

function createTerrainPlanes() {
  for (
    let rank = 0;
    rank < CONFIG.horizonPlaneCount;
    rank += 1
  ) {
    const tileIndex =
      rank %
      terrainTextures.length;
    const geometry =
      createTerrainGeometry(rank);

    const material =
      new THREE.MeshBasicMaterial({
        map:
          terrainTextures[
            tileIndex
          ],
        fog: true,
        toneMapped: false,
        depthWrite: true,
        depthTest: true,
      });

    const plane =
      new THREE.Mesh(
        geometry,
        material,
      );

    plane.position.z =
      20 -
      (
        CONFIG.horizonPlaneCount -
        1 -
        rank
      ) *
      CONFIG.planeSpacing;

    plane.position.y = 0;

    plane.position.x =
      Math.sin(
        rank * 0.72,
      ) * 8;

    plane.userData.tileIndex =
      tileIndex;

    plane.userData.lateralSeed =
      rank * 0.72;

    addTerrainDetailLayer(
      plane,
      rank,
    );
    addTerrainWireframeLayer(
      plane,
    );

    planes.push(plane);

    terrainGroup.add(plane);
  }
}

function createTerrainGeometry(seed) {
  const geometry =
    new THREE.PlaneGeometry(
      CONFIG.planeWidth,
      CONFIG.planeLength,
      24,
      36,
    );

  geometry.rotateX(
    -Math.PI / 2,
  );
  geometry.userData.noiseSeed =
    seed;

  applyTerrainElevation(
    geometry,
  );

  return geometry;
}

function terrainHash(x, z, seed) {
  const value =
    Math.sin(
      x * 127.1 +
      z * 311.7 +
      seed * 74.7,
    ) *
    43758.5453123;

  return (
    value -
    Math.floor(value)
  ) * 2 - 1;
}

function terrainValueNoise(
  x,
  z,
  seed,
) {
  const x0 = Math.floor(x);
  const z0 = Math.floor(z);
  const tx = x - x0;
  const tz = z - z0;
  const smoothX =
    tx * tx * (3 - 2 * tx);
  const smoothZ =
    tz * tz * (3 - 2 * tz);
  const near =
    THREE.MathUtils.lerp(
      terrainHash(x0, z0, seed),
      terrainHash(x0 + 1, z0, seed),
      smoothX,
    );
  const far =
    THREE.MathUtils.lerp(
      terrainHash(x0, z0 + 1, seed),
      terrainHash(
        x0 + 1,
        z0 + 1,
        seed,
      ),
      smoothX,
    );

  return THREE.MathUtils.lerp(
    near,
    far,
    smoothZ,
  );
}

function terrainFbm(x, z, seed) {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let amplitudeTotal = 0;

  for (
    let octave = 0;
    octave <
      CONFIG.terrainNoiseOctaves;
    octave += 1
  ) {
    value +=
      terrainValueNoise(
        x * frequency,
        z * frequency,
        seed + octave * 17.17,
      ) *
      amplitude;
    amplitudeTotal += amplitude;
    frequency *=
      CONFIG.terrainNoiseLacunarity;
    amplitude *=
      CONFIG.terrainNoiseGain;
  }

  return value / amplitudeTotal;
}

function sampleTerrainNoise(
  x,
  z,
  seed,
) {
  const px =
    x * CONFIG.terrainNoiseScale;
  const pz =
    z * CONFIG.terrainNoiseScale;
  const fbm =
    terrainFbm(px, pz, seed);

  switch (CONFIG.terrainNoiseMode) {
    case 'ridged':
      return (
        1 -
        Math.abs(fbm)
      ) * 2 - 1;

    case 'billow':
      return Math.abs(fbm) * 2 - 1;

    case 'dunes':
      return (
        Math.sin(
          px * 2.2 +
          Math.sin(
            pz * 1.3 +
            seed,
          ) *
          1.1,
        ) *
        0.72 +
        fbm * 0.28
      );

    case 'waves':
      return (
        Math.sin(
          px + seed * 1.73,
        ) *
        Math.sin(
          pz * 0.72 +
          seed * 0.91,
        ) +
        0.5 *
        Math.sin(
          px * 2.31 -
          pz * 1.43 +
          seed * 2.37,
        )
      ) / 1.5;

    case 'terraces': {
      const levels = 6;
      const normalized =
        THREE.MathUtils.clamp(
          fbm * 0.5 + 0.5,
          0,
          1,
        );

      return (
        Math.floor(
          normalized * levels,
        ) /
        levels
      ) * 2 - 1;
    }

    default:
      return fbm;
  }
}

function applyTerrainElevation(
  geometry,
) {
  const positions =
    geometry.attributes.position;
  const seed =
    geometry.userData.noiseSeed;
  const halfWidth =
    CONFIG.planeWidth * 0.5;
  const halfLength =
    CONFIG.planeLength * 0.5;
  const noiseSeed =
    seed +
    CONFIG.terrainNoiseSeed;

  for (
    let index = 0;
    index < positions.count;
    index += 1
  ) {
    const x = positions.getX(index);
    const z = positions.getZ(index);
    const normalizedX =
      x / halfWidth;
    const normalizedZ =
      z / halfLength;

    const edgeFadeX =
      Math.pow(
        Math.max(
          0,
          Math.cos(
            normalizedX *
            Math.PI * 0.5,
          ),
        ),
        CONFIG.terrainEdgeFadePower *
        0.65,
      );
    const edgeFadeZ =
      Math.pow(
        Math.max(
          0,
          Math.cos(
            normalizedZ *
            Math.PI * 0.5,
          ),
        ),
        CONFIG.terrainEdgeFadePower,
      );

    const noise =
      sampleTerrainNoise(
        x,
        z,
        noiseSeed,
      );

    const mountain =
      Math.pow(
        Math.max(
          0,
          (
            noise +
            CONFIG.terrainNoiseOffset
          ) /
          (
            1 +
            Math.abs(
              CONFIG.terrainNoiseOffset,
            )
          ),
        ),
        CONFIG.terrainNoiseSharpness,
      );
    const edgeFade =
      CONFIG.terrainFadeEdges
        ? edgeFadeX * edgeFadeZ
        : 1;

    positions.setY(
      index,
      (
        CONFIG.terrainBaseElevation +
        CONFIG.terrainElevation *
        mountain
      ) *
      edgeFade,
    );
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
}

function updateTerrainElevation() {
  for (const plane of planes) {
    applyTerrainElevation(
      plane.geometry,
    );
  }
}

function smoothStep(
  edge0,
  edge1,
  value,
) {
  const amount =
    THREE.MathUtils.clamp(
      (value - edge0) /
      (edge1 - edge0),
      0,
      1,
    );

  return (
    amount *
    amount *
    (3 - 2 * amount)
  );
}

function createTerrainDetailTexture(
  planeSeed,
) {
  const size = 128;
  const detailCanvas =
    document.createElement('canvas');
  detailCanvas.width = size;
  detailCanvas.height = size;

  const context =
    detailCanvas.getContext('2d');

  if (!context) {
    throw new Error(
      'The basin texture could not be created.',
    );
  }

  const image =
    context.createImageData(
      size,
      size,
    );
  const seed =
    CONFIG.terrainDetailSeed +
    planeSeed * 13.71;
  const scale =
    CONFIG.terrainDetailScale;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const v = y / size;
      const px = u * scale;
      const py = v * scale;
      const noise =
        (
          Math.sin(
            px * 1.31 +
            seed,
          ) *
          Math.sin(
            py * 0.93 -
            seed * 0.7,
          ) +
          0.55 *
          Math.sin(
            px * 2.73 -
            py * 1.87 +
            seed * 1.9,
          ) +
          0.28 *
          Math.sin(
            px * 5.17 +
            py * 3.11 -
            seed * 0.43,
          )
        ) / 1.83;
      const normalized =
        noise * 0.5 + 0.5;
      const basin =
        Math.pow(
          smoothStep(
            CONFIG.terrainDetailThreshold,
            1,
            normalized,
          ),
          CONFIG.terrainDetailContrast,
        );
      const pixelIndex =
        (y * size + x) * 4;

      image.data[pixelIndex] = 255;
      image.data[pixelIndex + 1] = 255;
      image.data[pixelIndex + 2] = 255;
      image.data[pixelIndex + 3] =
        Math.round(basin * 255);
    }
  }

  context.putImageData(
    image,
    0,
    0,
  );

  const texture =
    new THREE.CanvasTexture(
      detailCanvas,
    );
  texture.colorSpace =
    THREE.SRGBColorSpace;
  texture.wrapS =
    THREE.MirroredRepeatWrapping;
  texture.wrapT =
    THREE.MirroredRepeatWrapping;
  updateTerrainDetailTextureTransform(
    texture,
  );

  return texture;
}

function updateTerrainDetailTextureTransform(
  texture,
) {
  texture.repeat.set(
    CONFIG.terrainDetailRepeatX,
    CONFIG.terrainDetailRepeatY,
  );
  texture.offset.set(
    CONFIG.terrainDetailOffsetX,
    CONFIG.terrainDetailOffsetY,
  );
  texture.needsUpdate = true;
}

function applyTerrainDetailBlending(
  material,
) {
  material.premultipliedAlpha = false;

  if (
    CONFIG.terrainDetailBlendMode ===
    'multiply'
  ) {
    material.blending =
      THREE.CustomBlending;
    material.blendEquation =
      THREE.AddEquation;
    material.blendSrc =
      THREE.DstColorFactor;
    material.blendDst =
      THREE.OneMinusSrcAlphaFactor;
    material.premultipliedAlpha = true;
  } else if (
    CONFIG.terrainDetailBlendMode ===
    'subtract'
  ) {
    material.blending =
      THREE.CustomBlending;
    material.blendEquation =
      THREE.ReverseSubtractEquation;
    material.blendSrc =
      THREE.SrcAlphaFactor;
    material.blendDst =
      THREE.OneFactor;
  } else {
    material.blending =
      THREE.NormalBlending;
  }

  material.needsUpdate = true;
}

function addTerrainDetailLayer(
  plane,
  seed,
) {
  const material =
    new THREE.MeshBasicMaterial({
      map:
        createTerrainDetailTexture(
          seed,
        ),
      color: CONFIG.terrainDetailColor,
      transparent: true,
      opacity:
        CONFIG.terrainDetailOpacity,
      blending: THREE.NormalBlending,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
      toneMapped: false,
      fog: true,
    });
  applyTerrainDetailBlending(
    material,
  );
  const detailLayer =
    new THREE.Mesh(
      plane.geometry,
      material,
    );

  detailLayer.name =
    'TerrainDetailLayer';
  detailLayer.renderOrder = 2;
  detailLayer.visible =
    CONFIG.terrainDetailEnabled;
  detailLayer.userData.detailSeed =
    seed;

  plane.add(detailLayer);
}

function updateTerrainDetailLayers(
  changedKey,
) {
  const regenerateTexture =
    [
      'terrainDetailScale',
      'terrainDetailThreshold',
      'terrainDetailContrast',
      'terrainDetailSeed',
    ].includes(changedKey);

  for (const plane of planes) {
    const detailLayer =
      plane.getObjectByName(
        'TerrainDetailLayer',
      );

    if (!detailLayer) {
      continue;
    }

    detailLayer.visible =
      CONFIG.terrainDetailEnabled &&
      !wireframeEnabled;
    detailLayer.material.color.set(
      CONFIG.terrainDetailColor,
    );
    detailLayer.material.opacity =
      CONFIG.terrainDetailOpacity;
    applyTerrainDetailBlending(
      detailLayer.material,
    );

    if (regenerateTexture) {
      detailLayer.material.map.dispose();
      detailLayer.material.map =
        createTerrainDetailTexture(
          detailLayer.userData.detailSeed,
        );
    } else {
      updateTerrainDetailTextureTransform(
        detailLayer.material.map,
      );
    }

    detailLayer.material.needsUpdate =
      true;
  }
}

function addTerrainWireframeLayer(
  plane,
) {
  const material =
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.82,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
      toneMapped: false,
      fog: true,
    });
  const wireframeLayer =
    new THREE.Mesh(
      plane.geometry,
      material,
    );

  wireframeLayer.name =
    'TerrainWireframeLayer';
  wireframeLayer.renderOrder = 3;
  wireframeLayer.visible = false;
  plane.add(wireframeLayer);
}

function setWireframeMode(enabled) {
  wireframeEnabled = enabled;

  for (const plane of planes) {
    plane.material.visible =
      !enabled;

    const detailLayer =
      plane.getObjectByName(
        'TerrainDetailLayer',
      );
    const wireframeLayer =
      plane.getObjectByName(
        'TerrainWireframeLayer',
      );

    if (detailLayer) {
      detailLayer.visible =
        !enabled &&
        CONFIG.terrainDetailEnabled;
    }

    if (wireframeLayer) {
      wireframeLayer.visible =
        enabled;
    }
  }
}

function setupWireframeControl() {
  if (
    !(
      wireframeToggle instanceof
      HTMLInputElement
    )
  ) {
    return;
  }

  wireframeToggle.addEventListener(
    'change',
    () => {
      setWireframeMode(
        wireframeToggle.checked,
      );
    },
  );
}

function createShipOverlay(
  shipTexture,
) {
  shipTexture.colorSpace =
    THREE.SRGBColorSpace;

  shipTexture.anisotropy =
    Math.min(
      8,
      renderer.capabilities
        .getMaxAnisotropy(),
    );

  const aspect =
    shipTexture.image.width /
    shipTexture.image.height;

  const shipMaterial =
    new THREE.MeshBasicMaterial({
      map: shipTexture,
      transparent: true,
      alphaTest: 0.018,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });

  const ship =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        aspect,
        1,
      ),
      shipMaterial,
    );

  ship.renderOrder = 10;

  const shipGroup =
    new THREE.Group();

  shipGroup.name = 'Bebop';
  shipGroup.userData.shipAspect =
    aspect;

  shipGroup.position.set(
    -0.12,
    -0.18,
    0,
  );

  shipGroup.scale.setScalar(
    CONFIG.shipHeight,
  );

  shipGroup.add(ship);

  addShipGlows(
    shipGroup,
    aspect,
  );

  overlayScene.add(shipGroup);
}

function addShipGlows(
  shipGroup,
  aspect,
) {
  for (
    let index = 1;
    index <= 4;
    index += 1
  ) {
    const material =
      new THREE.SpriteMaterial({
        map: glowTexture,
        color:
          CONFIG.engineFlareColor,
        transparent: true,
        opacity:
          CONFIG.engineFlareOpacity,
        depthTest: false,
        depthWrite: false,
        blending:
          THREE.AdditiveBlending,
        toneMapped: false,
      });

    const glow =
      new THREE.Sprite(
        material,
      );

    glow.name =
      `EngineFlare${index}`;
    glow.renderOrder = 20;

    glow.position.set(
      CONFIG[`engineFlare${index}X`] *
        aspect,
      CONFIG[`engineFlare${index}Y`],
      0.03,
    );

    glow.scale.set(
      CONFIG.engineFlareSize,
      CONFIG.engineFlareSize,
      1,
    );

    glow.userData.engineFlare =
      true;
    glow.userData.baseOpacity =
      material.opacity;

    shipGroup.add(glow);
  }

  const navigationLights = [
    {
      color: 0xff1c16,
    },
    {
      color: 0xff1c16,
    },
    {
      color: 0x2680ff,
    },
    {
      color: 0x2680ff,
    },
  ];

  for (
    const [lightIndex, light]
    of navigationLights.entries()
  ) {
    const configIndex =
      lightIndex + 1;

    const material =
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: light.color,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false,
        blending:
          THREE.AdditiveBlending,
        toneMapped: false,
      });

    const glow =
      new THREE.Sprite(
        material,
      );

    glow.name =
      `NavigationLight${configIndex}`;
    glow.renderOrder = 21;

    glow.position.set(
      CONFIG[
        `navigationLight${configIndex}X`
      ] * aspect,
      CONFIG[
        `navigationLight${configIndex}Y`
      ],
      0.04,
    );

    glow.scale.set(
      0.105,
      0.105,
      1,
    );

    glow.userData.baseOpacity =
      material.opacity;

    glow.userData.navigation =
      true;

    shipGroup.add(glow);
  }
}

function createSkyParticles() {
  const backMaterial =
    new THREE.SpriteMaterial({
      map: glowTexture,
      color: CONFIG.skyParticleColor,
      transparent: true,
      opacity: CONFIG.skyParticleOpacity,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
      toneMapped: false,
    });

  const frontMaterial =
    backMaterial.clone();

  skyParticleMaterials.push(
    backMaterial,
    frontMaterial,
  );

  for (
    let index = 0;
    index < 72;
    index += 1
  ) {
    const inFront =
      index >= 48;
    const particle =
      new THREE.Sprite(
        inFront
          ? frontMaterial
          : backMaterial,
      );

    particle.name =
      `SkyParticle${index + 1}`;
    particle.renderOrder =
      inFront ? 30 : 5;
    particle.userData.progress =
      Math.random();
    particle.userData.speedFactor =
      0.65 + Math.random() * 0.7;
    resetSkyParticle(
      particle,
      false,
    );

    skyParticles.push(particle);
    overlayScene.add(particle);
  }
}

function resetSkyParticle(
  particle,
  resetProgress = true,
) {
  if (resetProgress) {
    particle.userData.progress = 0;
  }

  particle.userData.spreadX =
    Math.random() * 2 - 1;
  particle.userData.spreadY =
    Math.random() * 2 - 1;
  particle.userData.spawnUnitX =
    Math.random() - 0.5;
  particle.userData.spawnUnitY =
    Math.random() - 0.5;
  particle.userData.baseScale =
    0.45 + Math.random() * 0.9;
}

function updateSkyParticles(delta) {
  for (const particle of skyParticles) {
    particle.userData.progress +=
      delta *
      CONFIG.skyParticleSpeed *
      particle.userData.speedFactor;

    if (
      particle.userData.progress >= 1
    ) {
      resetSkyParticle(particle);
    }

    const progress =
      particle.userData.progress;
    const depthExponent =
      THREE.MathUtils.clamp(
        Math.abs(
          CONFIG.skyParticleOriginZ,
        ) * 0.2,
        0.6,
        3,
      );
    const perspective =
      Math.pow(
        progress,
        depthExponent,
      );

    particle.position.x =
      CONFIG.skyParticleOriginX +
      particle.userData.spawnUnitX *
        CONFIG.skyParticleSpawnWidth +
      (
        CONFIG.skyParticleDirectionX +
        particle.userData.spreadX *
          CONFIG.skyParticleSpreadX
      ) *
      perspective;

    particle.position.y =
      CONFIG.skyParticleOriginY +
      particle.userData.spawnUnitY *
        CONFIG.skyParticleSpawnHeight +
      (
        CONFIG.skyParticleDirectionY +
        particle.userData.spreadY *
          CONFIG.skyParticleSpreadY
      ) *
      perspective;

    const scale =
      THREE.MathUtils.lerp(
        0.008,
        CONFIG.skyParticleSize *
          particle.userData.baseScale,
        perspective,
      );

    particle.scale.set(
      scale,
      scale,
      1,
    );
  }
}

function updateSkyParticleAppearance() {
  for (
    const material
    of skyParticleMaterials
  ) {
    material.color.set(
      CONFIG.skyParticleColor,
    );
    material.opacity =
      CONFIG.skyParticleOpacity;
  }
}

function createFallingSpaceParticles() {
  const backMaterial =
    new THREE.SpriteMaterial({
      map: glowTexture,
      color:
        CONFIG.fallingParticleColor,
      transparent: true,
      opacity:
        CONFIG.fallingParticleOpacity,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
      toneMapped: false,
    });
  const frontMaterial =
    backMaterial.clone();

  fallingParticleMaterials.push(
    backMaterial,
    frontMaterial,
  );

  for (
    let index = 0;
    index < 72;
    index += 1
  ) {
    const inFront =
      index >= 48;
    const particle =
      new THREE.Sprite(
        inFront
          ? frontMaterial
          : backMaterial,
      );

    particle.name =
      `FallingSpaceParticle${index + 1}`;
    particle.renderOrder =
      inFront ? 31 : 6;
    particle.userData.progress =
      Math.random();
    particle.userData.speedFactor =
      0.65 + Math.random() * 0.7;
    resetFallingParticle(
      particle,
      false,
    );

    fallingParticles.push(
      particle,
    );
    overlayScene.add(particle);
  }
}

function resetFallingParticle(
  particle,
  resetProgress = true,
) {
  if (resetProgress) {
    particle.userData.progress = 0;
  }

  particle.userData.spreadX =
    Math.random() * 2 - 1;
  particle.userData.spreadY =
    Math.random() * 2 - 1;
  particle.userData.spawnUnitX =
    Math.random() - 0.5;
  particle.userData.spawnUnitY =
    Math.random() - 0.5;
  particle.userData.baseScale =
    0.45 + Math.random() * 0.9;
}

function updateFallingSpaceParticles(
  delta,
) {
  for (
    const particle
    of fallingParticles
  ) {
    particle.userData.progress +=
      delta *
      CONFIG.fallingParticleSpeed *
      particle.userData.speedFactor;

    if (
      particle.userData.progress >= 1
    ) {
      resetFallingParticle(particle);
    }

    const progress =
      particle.userData.progress;
    const depthExponent =
      THREE.MathUtils.clamp(
        Math.abs(
          CONFIG.fallingParticleOriginZ,
        ) * 0.2,
        0.6,
        3,
      );
    const perspective =
      Math.pow(
        progress,
        depthExponent,
      );

    particle.position.x =
      CONFIG.fallingParticleOriginX +
      particle.userData.spawnUnitX *
        CONFIG.fallingParticleSpawnWidth +
      (
        CONFIG.fallingParticleDirectionX +
        particle.userData.spreadX *
          CONFIG.fallingParticleSpreadX
      ) *
      perspective;

    particle.position.y =
      CONFIG.fallingParticleOriginY +
      particle.userData.spawnUnitY *
        CONFIG.fallingParticleSpawnHeight +
      (
        CONFIG.fallingParticleDirectionY +
        particle.userData.spreadY *
          CONFIG.fallingParticleSpreadY
      ) *
      perspective;

    const scale =
      THREE.MathUtils.lerp(
        0.008,
        CONFIG.fallingParticleSize *
          particle.userData.baseScale,
        perspective,
      );

    particle.scale.set(
      scale,
      scale,
      1,
    );
  }
}

function updateFallingParticleAppearance() {
  for (
    const material
    of fallingParticleMaterials
  ) {
    material.color.set(
      CONFIG.fallingParticleColor,
    );
    material.opacity =
      CONFIG.fallingParticleOpacity;
  }
}

const MAX_CLOUD_GROUPS = 18;
const MAX_CLOUD_LOBES = 16;

function createCloudTexture() {
  const size = 128;
  const canvas =
    document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context =
    canvas.getContext('2d');

  if (!context) {
    throw new Error(
      'The cloud texture could not be created.',
    );
  }

  const edge =
    THREE.MathUtils.lerp(
      0.42,
      0.92,
      CONFIG.cloudSoftness,
    );
  const gradient =
    context.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.03,
      size / 2,
      size / 2,
      size / 2,
    );

  gradient.addColorStop(
    0,
    'rgba(255,255,255,0.94)',
  );
  gradient.addColorStop(
    Math.max(0.08, 1 - edge),
    'rgba(255,255,255,0.72)',
  );
  gradient.addColorStop(
    Math.min(0.96, 0.45 + edge * 0.42),
    'rgba(255,255,255,0.12)',
  );
  gradient.addColorStop(
    1,
    'rgba(255,255,255,0)',
  );

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture =
    new THREE.CanvasTexture(canvas);
  texture.colorSpace =
    THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function getCloudModeSettings() {
  const settings = {
    soft: {
      scatter: 0.72,
      thickness: 0.7,
      opacity: 1,
    },
    dense: {
      scatter: 0.52,
      thickness: 0.9,
      opacity: 1.35,
    },
    wispy: {
      scatter: 1.25,
      thickness: 0.38,
      opacity: 0.72,
    },
    dust: {
      scatter: 0.95,
      thickness: 0.55,
      opacity: 0.82,
    },
  };

  return (
    settings[CONFIG.cloudMode] ??
    settings.soft
  );
}

function createCloudParticles() {
  cloudTexture = createCloudTexture();

  const backMaterial =
    new THREE.SpriteMaterial({
      map: cloudTexture,
      color: CONFIG.cloudColor,
      transparent: true,
      opacity: CONFIG.cloudOpacity,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
      toneMapped: false,
    });
  const frontMaterial =
    backMaterial.clone();

  cloudMaterials.push(
    backMaterial,
    frontMaterial,
  );

  for (
    let groupIndex = 0;
    groupIndex < MAX_CLOUD_GROUPS;
    groupIndex += 1
  ) {
    const group = new THREE.Group();
    group.name =
      `CloudGroup${groupIndex + 1}`;
    group.userData.index = groupIndex;
    group.userData.progress =
      Math.random();
    group.userData.speedFactor =
      0.72 + Math.random() * 0.56;

    for (
      let lobeIndex = 0;
      lobeIndex < MAX_CLOUD_LOBES;
      lobeIndex += 1
    ) {
      const lobe =
        new THREE.Sprite(backMaterial);
      lobe.name =
        `CloudLobe${lobeIndex + 1}`;
      lobe.userData.index = lobeIndex;
      group.add(lobe);
    }

    resetCloudGroup(group, false);
    cloudGroups.push(group);
    overlayScene.add(group);
  }

  updateCloudControls('cloudMode');
}

function resetCloudGroup(
  group,
  resetProgress = true,
) {
  if (resetProgress) {
    group.userData.progress = 0;
  }

  const mode =
    getCloudModeSettings();

  group.userData.spawnUnitX =
    Math.random() - 0.5;
  group.userData.spawnUnitY =
    Math.random() - 0.5;
  group.userData.spreadX =
    Math.random() * 2 - 1;
  group.userData.spreadY =
    Math.random() * 2 - 1;
  group.userData.baseScale =
    THREE.MathUtils.lerp(
      CONFIG.cloudSizeMin,
      CONFIG.cloudSizeMax,
      Math.random(),
    );
  group.userData.phase =
    Math.random() * Math.PI * 2;
  group.userData.rotationDirection =
    Math.random() < 0.5 ? -1 : 1;

  for (const lobe of group.children) {
    const angle =
      Math.random() * Math.PI * 2;
    const radius =
      Math.pow(Math.random(), 0.62) *
      mode.scatter;
    const lobeScale =
      0.34 + Math.random() * 0.66;

    lobe.position.set(
      Math.cos(angle) *
        radius *
        CONFIG.cloudStretch,
      Math.sin(angle) *
        radius *
        mode.thickness,
      0,
    );
    lobe.scale.set(
      lobeScale *
        (0.85 + Math.random() * 0.4),
      lobeScale,
      1,
    );
    lobe.material.opacity =
      THREE.MathUtils.clamp(
        CONFIG.cloudOpacity *
          mode.opacity,
        0,
        1,
      );
  }
}

function updateCloudParticles(
  delta,
  time,
) {
  const activeCount =
    Math.min(
      MAX_CLOUD_GROUPS,
      Math.round(CONFIG.cloudGroupCount),
    );

  for (const group of cloudGroups) {
    if (!group.visible) {
      continue;
    }

    group.userData.progress +=
      delta *
      CONFIG.cloudSpeed *
      group.userData.speedFactor;

    if (
      group.userData.progress >=
      CONFIG.cloudLifetime
    ) {
      resetCloudGroup(group);
    }

    const progress =
      group.userData.progress;
    const depthExponent =
      THREE.MathUtils.clamp(
        Math.abs(CONFIG.cloudOriginZ) *
          0.16,
        0.7,
        3,
      );
    const perspective =
      Math.pow(
        progress,
        depthExponent,
      );
    const turbulence =
      Math.sin(
        time * 0.8 +
          group.userData.phase,
      ) *
      CONFIG.cloudTurbulence *
      perspective;

    group.position.x =
      CONFIG.cloudOriginX +
      group.userData.spawnUnitX *
        CONFIG.cloudSpawnWidth +
      (
        CONFIG.cloudDirectionX +
        group.userData.spreadX *
          CONFIG.cloudSpreadX
      ) *
        perspective +
      turbulence;

    group.position.y =
      CONFIG.cloudOriginY +
      group.userData.spawnUnitY *
        CONFIG.cloudSpawnHeight +
      (
        CONFIG.cloudDirectionY +
        group.userData.spreadY *
          CONFIG.cloudSpreadY
      ) *
        perspective +
      turbulence * 0.35;

    const scale =
      THREE.MathUtils.lerp(
        0.012,
        group.userData.baseScale,
        Math.min(perspective, 1.35),
      );
    group.scale.set(scale, scale, 1);
    group.rotation.z +=
      delta *
      CONFIG.cloudRotationSpeed *
      group.userData.rotationDirection;

    group.userData.activeCount =
      activeCount;
  }
}

function updateCloudControls(changedKey) {
  if (changedKey === 'cloudSoftness') {
    const previousTexture =
      cloudTexture;
    cloudTexture =
      createCloudTexture();

    for (const material of cloudMaterials) {
      material.map = cloudTexture;
      material.needsUpdate = true;
    }

    previousTexture?.dispose();
  }

  const activeGroups =
    Math.min(
      MAX_CLOUD_GROUPS,
      Math.round(CONFIG.cloudGroupCount),
    );
  const activeLobes =
    Math.min(
      MAX_CLOUD_LOBES,
      Math.round(CONFIG.cloudLobeCount),
    );
  const frontStart =
    Math.floor(
      activeGroups *
        (1 - CONFIG.cloudFrontRatio),
    );
  const mode =
    getCloudModeSettings();

  for (const material of cloudMaterials) {
    material.color.set(CONFIG.cloudColor);
    material.opacity =
      THREE.MathUtils.clamp(
        CONFIG.cloudOpacity *
          mode.opacity,
        0,
        1,
      );
  }

  for (
    let index = 0;
    index < cloudGroups.length;
    index += 1
  ) {
    const group = cloudGroups[index];
    const inFront =
      index >= frontStart &&
      index < activeGroups;

    group.visible =
      !FOG_DEBUG_ONLY &&
      CONFIG.cloudEnabled &&
      index < activeGroups;

    for (const lobe of group.children) {
      lobe.visible =
        lobe.userData.index <
        activeLobes;
      lobe.material =
        inFront
          ? cloudMaterials[1]
          : cloudMaterials[0];
      lobe.renderOrder =
        inFront ? 32 : 7;
    }

    if (
      changedKey === 'cloudMode' ||
      changedKey === 'cloudLobeCount' ||
      changedKey === 'cloudStretch' ||
      changedKey === 'cloudSizeMin' ||
      changedKey === 'cloudSizeMax'
    ) {
      resetCloudGroup(group, false);
    }
  }
}

function createStars() {
  const rng =
    mulberry32(
      1969 + 404,
    );

  const positions = [];

  for (
    let i = 0;
    i < 220;
    i += 1
  ) {
    positions.push(
      THREE.MathUtils.lerp(
        -780,
        780,
        rng(),
      ),
      THREE.MathUtils.lerp(
        110,
        340,
        Math.pow(
          rng(),
          0.74,
        ),
      ),
      THREE.MathUtils.lerp(
        -1200,
        -520,
        rng(),
      ),
    );
  }

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      positions,
      3,
    ),
  );

  const material =
    new THREE.PointsMaterial({
      color: 0xffeadf,
      size: 1.3,
      transparent: true,
      opacity: 0.42,
      sizeAttenuation: true,
      depthWrite: false,
      toneMapped: false,
      fog: false,
    });

  terrainScene.add(
    new THREE.Points(
      geometry,
      material,
    ),
  );
}

function animate(timeMs) {
  const delta =
    Math.min(
      clock.getDelta(),
      0.05,
    );

  const time =
    timeMs * 0.001;

  lastTime = time;

  if (
    !paused &&
    terrainReady
  ) {
    updatePlanes(
      delta,
      time,
    );

    updateSkyParticles(delta);
    updateFallingSpaceParticles(
      delta,
    );
    updateCloudParticles(
      delta,
      time,
    );
  }

  updateShipPresentation(
    delta,
    time,
  );

  updateDebug(delta);

  render();
}

function updatePlanes(
  delta,
  time,
) {
  let farthestZ =
    Infinity;

  terrainGroup.position.x =
    CONFIG.terrainPositionX +
    Math.sin(
      time *
      CONFIG.terrainDriftSpeed,
    ) *
    CONFIG.terrainDriftAmount;

  for (
    const plane
    of planes
  ) {
    plane.position.z +=
      flightSpeed *
      delta;

    farthestZ =
      Math.min(
        farthestZ,
        plane.position.z,
      );

  }

  const recycleThreshold =
    camera.position.z +
    CONFIG.planeLength *
    0.55;
  const orderedBeforeRecycle =
    [...planes].sort(
      (a, b) =>
        b.position.z -
        a.position.z,
    );
  const firstVisiblePlane =
    orderedBeforeRecycle.find(
      (plane) =>
        plane.position.z <=
        recycleThreshold,
    ) ??
    orderedBeforeRecycle[0];
  const stableAnchor =
    firstVisiblePlane
      ? getPlaneNearEdge(
          firstVisiblePlane,
        )
      : null;

  for (
    const plane
    of planes
  ) {
    if (
      plane.position.z >
      recycleThreshold
    ) {
      const farthestPlane =
        getFarthestPlane(
          plane,
        );

      const newTileIndex =
        modulo(
          farthestPlane
            .userData
            .tileIndex -
          1,
          terrainTextures
            .length,
        );

      plane.position.z =
        farthestZ -
        CONFIG.planeSpacing;

      farthestZ =
        plane.position.z;

      plane.userData.tileIndex =
        newTileIndex;

      plane.material.map =
        terrainTextures[
          newTileIndex
        ];

      plane.material
        .needsUpdate = true;

      plane.userData
        .lateralSeed -=
        0.68;

    }
  }

  alignTerrainPlaneChain(
    stableAnchor,
  );
}

function getPlanetTangentAngle(
  centerZ,
) {
  const distance =
    Math.max(
      0,
      camera.position.z - centerZ,
    );

  return -Math.atan(
    2 *
    CONFIG.planetCurveStrength *
    distance,
  );
}

function getPlaneNearEdge(plane) {
  const halfLength =
    CONFIG.planeLength * 0.5;

  return {
    z:
      plane.position.z +
      halfLength *
      Math.cos(
        plane.rotation.x,
      ),
    y:
      plane.position.y -
      halfLength *
      Math.sin(
        plane.rotation.x,
      ),
  };
}

function alignTerrainPlaneChain(
  stableAnchor = null,
) {
  const orderedPlanes =
    [...planes].sort(
      (a, b) =>
        b.position.z -
        a.position.z,
    );

  if (orderedPlanes.length === 0) {
    return;
  }

  const halfLength =
    CONFIG.planeLength * 0.5;
  const firstPlane =
    orderedPlanes[0];
  const firstDistance =
    Math.max(
      0,
      camera.position.z -
      firstPlane.position.z,
    );
  const firstAngle =
    getPlanetTangentAngle(
      firstPlane.position.z,
    );
  const firstCenterY =
    -CONFIG.planetCurveStrength *
    firstDistance *
    firstDistance;

  // During recycling, preserve the edge of the first surviving
  // plane. Without this anchor, the new first segment would
  // abruptly return to the theoretical parabola.
  let edgeZ =
    stableAnchor?.z ??
    (
      firstPlane.position.z +
      halfLength *
      Math.cos(firstAngle)
    );
  let edgeY =
    stableAnchor?.y ??
    (
      firstCenterY -
      halfLength *
      Math.sin(firstAngle)
    );

  for (const plane of orderedPlanes) {
    // Dos aproximaciones bastan para resolver el ángulo y el
    // centro, ya que ambos dependen de la profundidad.
    let angle =
      getPlanetTangentAngle(
        edgeZ - halfLength,
      );
    let centerZ =
      edgeZ -
      halfLength *
      Math.cos(angle);

    angle =
      getPlanetTangentAngle(centerZ);
    centerZ =
      edgeZ -
      halfLength *
      Math.cos(angle);

    const centerY =
      edgeY +
      halfLength *
      Math.sin(angle);

    plane.position.set(
      0,
      centerY,
      centerZ,
    );
    plane.rotation.x = angle;

    // The next segment starts exactly at this edge.
    edgeZ -=
      CONFIG.planeLength *
      Math.cos(angle);
    edgeY +=
      CONFIG.planeLength *
      Math.sin(angle);
  }
}

function getFarthestPlane(
  excludedPlane,
) {
  let farthest = null;

  for (
    const plane
    of planes
  ) {
    if (
      plane ===
      excludedPlane
    ) {
      continue;
    }

    if (
      !farthest ||
      plane.position.z <
      farthest.position.z
    ) {
      farthest = plane;
    }
  }

  return (
    farthest ??
    planes[0]
  );
}

function updateShipPresentation(
  delta,
  time,
) {
  const shipGroup =
    overlayScene.getObjectByName(
      'Bebop',
    );

  if (!shipGroup) {
    return;
  }

  shipGroup.position.y =
    -0.18 +
    Math.sin(
      time * 0.95,
    ) *
    0.014;

  shipGroup.rotation.z =
    Math.sin(
      time * 0.7,
    ) *
    0.016;

  shipGroup.rotation.x =
    Math.sin(
      time * 0.53 +
      0.8,
    ) *
    0.01;

  let navigationIndex = 0;

  engineFlareFlickerTimer -=
    delta;

  if (engineFlareFlickerTimer <= 0) {
    const nearlyOff =
      Math.random() < 0.9;

    engineFlareTarget =
      nearlyOff
        ? 0.03 +
          Math.random() * 0.14
        : 0.45 +
          Math.random() * 0.75;

    engineFlareFlickerTimer =
      0.035 +
      Math.random() * 0.11;
  }

  engineFlareIntensity +=
    (
      engineFlareTarget -
      engineFlareIntensity
    ) *
    (
      1 -
      Math.exp(-delta * 38)
    );

  for (
    const child
    of shipGroup.children
  ) {
    const material =
      child.material;

    if (
      !(
        material instanceof
        THREE.SpriteMaterial
      )
    ) {
      continue;
    }

    const baseOpacity =
      child.userData
        .baseOpacity ??
      0.25;

    if (
      child.userData
        .engineFlare
    ) {
      material.opacity =
        baseOpacity *
        engineFlareIntensity;
    } else if (
      child.userData
        .navigation
    ) {
      material.opacity =
        baseOpacity *
        (
          0.58 +
          0.42 *
          Math.sin(
            time * 2.6 +
            navigationIndex *
            1.7,
          )
        );

      navigationIndex += 1;
    }
  }
}

function render() {
  renderer.clear();

  renderer.render(
    terrainScene,
    camera,
  );

  overlayRenderer.clear();

  overlayRenderer.render(
    overlayScene,
    overlayCamera,
  );
}

function revealExperienceWhenReady() {
  if (
    !shipReady ||
    !terrainReady
  ) {
    return;
  }

  requestAnimationFrame(
    () => {
      loading?.classList.add(
        'is-hidden',
      );

    },
  );
}

function resize() {
  const width =
    window.innerWidth;

  const height =
    window.innerHeight;

  const pixelRatio =
    Math.min(
      window.devicePixelRatio,
      1.5,
    );

  renderer.setPixelRatio(
    pixelRatio,
  );
  overlayRenderer.setPixelRatio(
    pixelRatio,
  );

  renderer.setSize(
    width,
    height,
    false,
  );
  overlayRenderer.setSize(
    width,
    height,
    false,
  );

  camera.aspect =
    width / height;

  camera.updateProjectionMatrix();

  const aspect =
    width / height;

  overlayCamera.left =
    -aspect;

  overlayCamera.right =
    aspect;

  overlayCamera.top = 1;
  overlayCamera.bottom = -1;

  overlayCamera
    .updateProjectionMatrix();

  updateShipControls();
}

function setupEvents() {
  window.addEventListener(
    'resize',
    resize,
    {
      passive: true,
    },
  );

  window.addEventListener(
    'keydown',
    (event) => {
      if (
        event.target instanceof
          HTMLInputElement ||
        event.target instanceof
          HTMLButtonElement
      ) {
        return;
      }

      if (
        event.code ===
        'Space'
      ) {
        event.preventDefault();

        paused =
          !paused;

        return;
      }

      if (
        event.code ===
        'ArrowUp'
      ) {
        flightSpeed =
          Math.min(
            CONFIG.maxSpeed,
            flightSpeed + 4,
          );

        return;
      }

      if (
        event.code ===
        'ArrowDown'
      ) {
        flightSpeed =
          Math.max(
            CONFIG.minSpeed,
            flightSpeed - 4,
          );

        return;
      }

      if (
        event.code ===
        'KeyD'
      ) {
        debugPanel.hidden =
          !debugPanel.hidden;
      }
    },
  );

  document.addEventListener(
    'visibilitychange',
    () => {
      clock.getDelta();
    },
  );
}

function updateDebug(delta) {
  frameCounter += 1;
  fpsElapsed += delta;

  if (
    fpsElapsed >= 0.5
  ) {
    fpsValue =
      Math.round(
        frameCounter /
        fpsElapsed,
      );

    frameCounter = 0;
    fpsElapsed = 0;
  }

  if (
    !debugPanel.hidden
  ) {
    debugSpeed.textContent =
      `Speed: ${flightSpeed.toFixed(0)} u/s${paused ? ' (paused)' : ''}`;

    debugFps.textContent =
      `FPS: ${fpsValue} · t=${lastTime.toFixed(1)}s`;
  }
}

function createGlowTexture() {
  const size = 128;

  const glowCanvas =
    document.createElement(
      'canvas',
    );

  glowCanvas.width = size;
  glowCanvas.height = size;

  const context =
    glowCanvas.getContext(
      '2d',
    );

  if (!context) {
    throw new Error(
      'The glow texture could not be created.',
    );
  }

  const gradient =
    context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );

  gradient.addColorStop(
    0,
    'rgba(255,255,255,1)',
  );

  gradient.addColorStop(
    0.12,
    'rgba(255,255,255,0.95)',
  );

  gradient.addColorStop(
    0.35,
    'rgba(255,255,255,0.35)',
  );

  gradient.addColorStop(
    1,
    'rgba(255,255,255,0)',
  );

  context.fillStyle =
    gradient;

  context.fillRect(
    0,
    0,
    size,
    size,
  );

  const texture =
    new THREE.CanvasTexture(
      glowCanvas,
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  return texture;
}

function loadTexture(url) {
  return new Promise(
    (resolve, reject) => {
      textureLoader.load(
        url,
        resolve,
        undefined,
        reject,
      );
    },
  );
}

function modulo(
  value,
  divisor,
) {
  return (
    (
      value %
      divisor
    ) +
    divisor
  ) % divisor;
}

function mulberry32(seed) {
  return function random() {
    let value =
      seed +=
      0x6d2b79f5;

    value =
      Math.imul(
        value ^
        (
          value >>>
          15
        ),
        value | 1,
      );

    value ^=
      value +
      Math.imul(
        value ^
        (
          value >>>
          7
        ),
        value | 61,
      );

    return (
      (
        value ^
        (
          value >>>
          14
        )
      ) >>>
      0
    ) /
    4294967296;
  };
}
