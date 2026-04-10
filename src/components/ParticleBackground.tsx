import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface Props {
  onLoaded?: () => void;
  isDark: boolean;
}

export const ParticleBackground: React.FC<Props> = ({ onLoaded, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skyUniformsRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    el.appendChild(canvas);

    /* ── Scene ── */
    const scene = new THREE.Scene();

    /* ── Sky ── */
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const uniforms = sky.material.uniforms;
    skyUniformsRef.current = uniforms;
    uniforms['turbidity'].value = 0;
    uniforms['rayleigh'].value = isDark ? 3 : 1;
    uniforms['mieDirectionalG'].value = 0.7;
    uniforms['cloudElevation'].value = 1;
    uniforms['sunPosition'].value.set(-0.8, isDark ? 0.19 : 0.4, 0.56);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environment = pmremGenerator.fromScene(sky as unknown as THREE.Scene).texture;
    scene.environment = environment;
    pmremGenerator.dispose();

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(-3, 2, 8);

    const updateViewOffset = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const shiftX = w > 768 ? -w * 0.25 : 0;
      camera.setViewOffset(w, h, shiftX, 0, w, h);
    };
    updateViewOffset();

    /* ── OrbitControls ── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0.7, 0);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.update();

    /* ── DRACO + GLTF loader ── */
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let mixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();

    loader.load(
      '/LittlestTokyo.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        onLoaded?.();
      },
      undefined,
      (e) => console.error('GLTF error:', e)
    );

    /* ── Animation loop ── */
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer?.update(delta);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      updateViewOffset();
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      dracoLoader.dispose();
      if (el.contains(canvas)) el.removeChild(canvas);
      scene.clear();
    };
  }, []);

  useEffect(() => {
    if (skyUniformsRef.current) {
      skyUniformsRef.current['rayleigh'].value = isDark ? 3 : 1;
      skyUniformsRef.current['sunPosition'].value.set(-0.8, isDark ? 0.19 : 0.4, 0.56);
    }
  }, [isDark]);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

