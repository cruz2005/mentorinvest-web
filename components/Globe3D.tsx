"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useAppLocale } from "@/components/LocaleProvider";

const R = 1.5;

// symbol = ticker Yahoo Finance interrogé par /api/indices pour la variation live.
// city/cityEn : nom de ville affiché selon la langue active (city = FR, cityEn = EN).
const MARKETS = [
  { id: 0,  flag: "us", name: "S&P 500",   city: "New York",  cityEn: "New York",  lat:  40.71, lon:  -74.00, symbol: "^GSPC"     },
  { id: 1,  flag: "us", name: "Nasdaq",    city: "New York",  cityEn: "New York",  lat:  40.82, lon:  -73.60, symbol: "^IXIC"     },
  { id: 2,  flag: "gb", name: "FTSE 100",  city: "Londres",   cityEn: "London",    lat:  51.50, lon:   -0.12, symbol: "^FTSE"     },
  { id: 3,  flag: "fr", name: "CAC 40",    city: "Paris",     cityEn: "Paris",     lat:  48.85, lon:    2.35, symbol: "^FCHI"     },
  { id: 4,  flag: "de", name: "DAX",       city: "Francfort", cityEn: "Frankfurt", lat:  50.11, lon:    8.68, symbol: "^GDAXI"    },
  { id: 5,  flag: "ch", name: "SMI",       city: "Zurich",    cityEn: "Zurich",    lat:  47.37, lon:    8.54, symbol: "^SSMI"     },
  { id: 6,  flag: "jp", name: "Nikkei",    city: "Tokyo",     cityEn: "Tokyo",     lat:  35.68, lon:  139.69, symbol: "^N225"     },
  { id: 7,  flag: "cn", name: "Shanghai",  city: "Shanghai",  cityEn: "Shanghai",  lat:  31.22, lon:  121.47, symbol: "000001.SS" },
  { id: 8,  flag: "hk", name: "Hang Seng", city: "Hong Kong", cityEn: "Hong Kong", lat:  22.31, lon:  114.16, symbol: "^HSI"      },
  { id: 9,  flag: "au", name: "ASX 200",   city: "Sydney",    cityEn: "Sydney",    lat: -33.86, lon:  151.20, symbol: "^AXJO"     },
  { id: 10, flag: "br", name: "Bovespa",   city: "São Paulo", cityEn: "São Paulo", lat: -23.55, lon:  -46.63, symbol: "^BVSP"     },
  { id: 11, flag: "ca", name: "TSX",       city: "Toronto",   cityEn: "Toronto",   lat:  43.65, lon:  -79.38, symbol: "^GSPTSE"   },
  { id: 12, flag: "ae", name: "DFM",       city: "Dubaï",     cityEn: "Dubai",     lat:  25.20, lon:   55.27, symbol: "DFMGI.AE"  },
  { id: 13, flag: "in", name: "Nifty 50",  city: "Mumbai",    cityEn: "Mumbai",    lat:  19.07, lon:   72.87, symbol: "^NSEI"     },
];

const REFRESH_MS = 5 * 60_000; // 5 minutes max, comme demandé

function fmtChangePercent(v: number): string {
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function latLon(lat: number, lon: number, r = R): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

/* ── Shader lumières de villes (second mesh uniquement) ── */
const CITY_VERT = /* glsl */`
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  void main() {
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vUv          = uv;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CITY_FRAG = /* glsl */`
  uniform sampler2D cityTexture;
  uniform vec3      sunDir;
  varying vec3      vWorldNormal;
  varying vec2      vUv;
  void main() {
    vec3  city       = texture2D(cityTexture, vUv).rgb;
    float cosTheta   = dot(normalize(vWorldNormal), normalize(sunDir));
    // Jour → 0, Nuit → 0.8, transition douce sur ~10°
    float nightBlend = smoothstep(0.10, -0.10, cosTheta) * 0.8;
    gl_FragColor     = vec4(city, nightBlend);
  }
`;

export default function Globe3D() {
  const { locale } = useAppLocale();
  const mountRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(MARKETS.length).fill(null));
  const sizeRef  = useRef({ w: 0, h: 0 });
  const [changePercents, setChangePercents] = useState<Record<string, number>>({});

  /* live data — poll /api/indices, 5 min max */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/indices", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { indices }: { indices: { symbol: string; changePercent: number | null }[] } =
          await res.json();
        if (cancelled) return;
        setChangePercents((prev) => {
          const next = { ...prev };
          indices.forEach((q) => {
            if (q.changePercent !== null) next[q.symbol] = q.changePercent;
          });
          return next;
        });
      } catch {
        // échec réseau : on garde les dernières valeurs connues (pas de placeholder fictif)
      }
    }

    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth  || 600;
    const H = el.clientHeight || 500;
    sizeRef.current = { w: W, h: H };

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Scene + Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 0.4, 5.0);
    camera.lookAt(0, 0, 0);

    /* ── OrbitControls ── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom      = false;
    controls.enablePan       = false;
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableDamping   = true;
    controls.dampingFactor   = 0.05;

    /* ── Auto-rotate resume ── */
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;
    let resumeStartTime: number | null = null;

    function onPointerDown() {
      controls.autoRotate      = false;
      controls.autoRotateSpeed = 0;
      resumeStartTime = null;
      if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
    }
    function onPointerUp() {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        controls.autoRotate      = true;
        controls.autoRotateSpeed = 0;
        resumeStartTime          = performance.now();
      }, 1500);
    }

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    /* ── Éclairage ── */
    scene.add(new THREE.AmbientLight(0x8899ff, 0.18));
    const sun = new THREE.DirectionalLight(0xfff5e0, 1.8);
    scene.add(sun);

    /* ── Terre — MeshPhongMaterial (look original) ── */
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const earthMat = new THREE.MeshPhongMaterial({
      color:     new THREE.Color(0x1a2a4a),
      specular:  new THREE.Color(0x112244),
      shininess: 35,
    });
    earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), earthMat));

    /* Texture jour avec filtre canvas */
    const loader  = new THREE.TextureLoader();
    const DAY_URL = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/land_ocean_ice_cloud_2048.jpg";

    loader.load(DAY_URL, (tex) => {
      const img      = tex.image as HTMLImageElement;
      const naturalW = img.naturalWidth  || img.width  || 2048;
      const naturalH = img.naturalHeight || img.height || 1024;
      // Texture réduite sur mobile (max 1024px) pour éviter un freeze du filtre
      // canvas au premier affichage sur des GPU/CPU moins puissants.
      const maxDim = window.innerWidth < 768 ? 1024 : 2048;
      const scale  = Math.min(1, maxDim / naturalW);

      const canvas = document.createElement("canvas");
      canvas.width  = Math.round(naturalW * scale);
      canvas.height = Math.round(naturalH * scale);
      const ctx = canvas.getContext("2d")!;
      ctx.filter = "brightness(1.15) contrast(1.12) saturate(1.30)";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const processed      = new THREE.CanvasTexture(canvas);
      processed.anisotropy = renderer.capabilities.getMaxAnisotropy();
      earthMat.map   = processed;
      earthMat.color = new THREE.Color(0x999999);
      earthMat.needsUpdate = true;
    });

    /* ── Lumières de villes (second mesh, AdditiveBlending) ── */
    const cityMat = new THREE.ShaderMaterial({
      uniforms: {
        cityTexture: { value: null },
        sunDir:      { value: new THREE.Vector3(1, 0, 0) },
      },
      vertexShader:   CITY_VERT,
      fragmentShader: CITY_FRAG,
      transparent:    true,
      blending:       THREE.AdditiveBlending,
      depthWrite:     false,
    });
    earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.001, 64, 64), cityMat));

    const NIGHT_URLS = [
      "https://unpkg.com/three-globe/example/img/earth-night.jpg",
      "https://cdn.jsdelivr.net/gh/turban/webgl-earth@master/images/earth-dark.jpg",
    ];
    function tryLoadNight(urls: string[], i = 0) {
      if (i >= urls.length) return;
      loader.load(
        urls[i],
        (tex) => {
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          cityMat.uniforms.cityTexture.value = tex;
        },
        undefined,
        () => tryLoadNight(urls, i + 1),
      );
    }
    tryLoadNight(NIGHT_URLS);

    /* ── Atmosphère ── */
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.028, 48, 48),
      new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x2244cc),
        transparent: true, opacity: 0.07,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    ));

    /* ── Marqueurs ── */
    const dotGeo  = new THREE.SphereGeometry(0.020, 10, 10);
    const glowGeo = new THREE.SphereGeometry(0.055, 10, 10);

    const glowMeshes:   THREE.Mesh[] = [];
    const markerGroups: THREE.Group[] = [];

    MARKETS.forEach((m) => {
      const group = new THREE.Group();
      group.position.copy(latLon(m.lat, m.lon, R));

      const dot  = new THREE.Mesh(dotGeo,  new THREE.MeshBasicMaterial({ color: 0x5b9aff }));
      const glow = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({
        color: 0x2563ff, transparent: true, opacity: 0.28,
        depthWrite: false, blending: THREE.AdditiveBlending,
      }));
      group.add(dot, glow);
      earthGroup.add(group);
      markerGroups.push(group);
      glowMeshes.push(glow);
    });

    /* ── Position soleil UTC (toutes les 60 s) ── */
    function updateSunPosition() {
      const now      = new Date();
      const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;

      const sunLonDeg  = (12 - utcHours) * 15;
      const sunLonRad  = sunLonDeg * (Math.PI / 180);

      const doy         = Math.floor((+now - +new Date(now.getFullYear(), 0, 0)) / 86_400_000);
      const declination = -23.45 * Math.cos((360 / 365) * (doy + 10) * (Math.PI / 180));
      const decRad      = declination * (Math.PI / 180);

      const x = Math.cos(decRad) * Math.cos(sunLonRad) * 5;
      const y = Math.sin(decRad) * 5;
      const z = -Math.cos(decRad) * Math.sin(sunLonRad) * 5;

      sun.position.set(x, y, z);
      cityMat.uniforms.sunDir.value.set(x, y, z).normalize();
    }

    updateSunPosition();
    const sunInterval = setInterval(updateSunPosition, 60_000);

    /* ── Animation ── */
    const clock = new THREE.Clock();
    const wPos  = new THREE.Vector3();
    let animId  = 0;

    function tick() {
      animId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      if (controls.autoRotate && resumeStartTime !== null) {
        const elapsed  = (performance.now() - resumeStartTime) / 1000;
        const progress = Math.min(1, elapsed / 1.0);
        controls.autoRotateSpeed = progress * 0.5;
        if (progress >= 1) resumeStartTime = null;
      }

      controls.update();

      glowMeshes.forEach((g, i) => {
        const p   = Math.sin(t * 1.8 + i * 1.1) * 0.5 + 0.5;
        const mat = g.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.12 + p * 0.24;
        g.scale.setScalar(1 + p * 0.30);
      });

      const { w: cw, h: ch } = sizeRef.current;

      // Une seule carte visible : celle dont le point est le plus face-caméra
      let bestIdx    = -1;
      let bestFacing = -1;
      let bestPx     = 0;
      let bestPy     = 0;

      markerGroups.forEach((group, i) => {
        group.getWorldPosition(wPos);
        const normal = wPos.clone().normalize();
        const toCam  = camera.position.clone().sub(wPos).normalize();
        const facing = normal.dot(toCam);
        if (facing > 0.20 && facing > bestFacing) {
          const proj = wPos.clone().project(camera);
          bestFacing = facing;
          bestIdx    = i;
          bestPx     = (proj.x + 1) / 2 * cw;
          bestPy     = -(proj.y - 1) / 2 * ch;
        }
      });

      markerGroups.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        if (i === bestIdx) {
          const a = Math.min(1, (bestFacing - 0.20) / 0.26);
          card.style.opacity   = a.toFixed(3);
          card.style.transform = `translate(${bestPx + 16}px, ${bestPy - 38}px)`;
        } else {
          card.style.opacity = "0";
        }
      });

      renderer.render(scene, camera);
    }

    /* ── Pause hors viewport (économie CPU/GPU/batterie) ── */
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animId) animId = requestAnimationFrame(tick);
        } else if (animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(el);

    /* ── Resize ── */
    function onResize() {
      const container = mountRef.current;
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      sizeRef.current = { w: nw, h: nh };
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();
      clearInterval(sunInterval);
      if (resumeTimer) clearTimeout(resumeTimer);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup",  onPointerUp);
      window.removeEventListener("resize",     onResize);
      controls.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="relative w-full h-full" style={{ cursor: "grab" }}>
      {MARKETS.map((m, i) => (
        <div
          key={m.id}
          ref={(node) => { cardRefs.current[i] = node; }}
          style={{
            position: "absolute",
            top: 0, left: 0,
            opacity: 0,
            transform: "translate(-9999px,-9999px)",
            transition: "opacity 0.30s ease",
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <div style={{
            background: "rgba(8,10,14,0.95)",
            border: "1px solid rgba(37,99,255,0.22)",
            borderRadius: 10,
            padding: "7px 12px",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
            minWidth: 140,
          }}>
            <p style={{ color: "#f0f4ff", fontSize: 12, fontWeight: 700, margin: 0, letterSpacing: "0.01em", display: "flex", alignItems: "center", gap: 6 }}>
              <img
                src={`https://flagcdn.com/w20/${m.flag}.png`}
                alt={m.flag}
                width={16}
                height={12}
                style={{ borderRadius: 2, objectFit: "cover", flexShrink: 0 }}
              />
              {m.name}
            </p>
            <p style={{ color: "#4a5568", fontSize: 9.5, margin: "2px 0 0" }}>{locale === "en" ? m.cityEn : m.city}</p>
            {changePercents[m.symbol] !== undefined && (
              <p style={{
                color: changePercents[m.symbol] >= 0 ? "#089981" : "#F23645",
                fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 400,
                margin: "4px 0 0",
              }}>
                {fmtChangePercent(changePercents[m.symbol])}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
