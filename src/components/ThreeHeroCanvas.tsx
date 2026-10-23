import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Large screens only (>= 1024px)
    if (window.innerWidth < 1024) return;

    const container = mountRef.current;
    if (!container) return;

    // Detect software GL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Scene & Camera setup
    const scene = new THREE.Scene();
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x6366f1, 2.8); // Indigo key
    keyLight.position.set(6, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 2.2); // Emerald rim
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xf59e0b, 1.6, 12); // Amber warm fill
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // Master Mascot Group
    const mascotGroup = new THREE.Group();
    scene.add(mascotGroup);

    // 1. Mascot Body (Smooth, friendly pearl-indigo sphere)
    const bodyGeo = new THREE.SphereGeometry(1.2, 36, 36);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.18,
      metalness: 0.25,
      flatShading: false
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    mascotGroup.add(bodyMesh);

    // 2. Cute Anime / Mascot Eyes
    const eyeGeo = new THREE.SphereGeometry(0.18, 20, 20);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.8
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.scale.set(0.9, 1.3, 0.7);
    leftEye.position.set(-0.35, 0.18, 1.05);
    mascotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.scale.set(0.9, 1.3, 0.7);
    rightEye.position.set(0.35, 0.18, 1.05);
    mascotGroup.add(rightEye);

    // Specular Glints
    const glintGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const leftGlint = new THREE.Mesh(glintGeo, glintMat);
    leftGlint.position.set(-0.31, 0.26, 1.16);
    mascotGroup.add(leftGlint);

    const rightGlint = new THREE.Mesh(glintGeo, glintMat);
    rightGlint.position.set(0.39, 0.26, 1.16);
    mascotGroup.add(rightGlint);

    // Cute Blushing Cheeks
    const blushGeo = new THREE.CircleGeometry(0.16, 16);
    const blushMat = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide
    });

    const leftBlush = new THREE.Mesh(blushGeo, blushMat);
    leftBlush.position.set(-0.55, -0.05, 1.03);
    leftBlush.rotation.y = -Math.PI / 10;
    mascotGroup.add(leftBlush);

    const rightBlush = new THREE.Mesh(blushGeo, blushMat);
    rightBlush.position.set(0.55, -0.05, 1.03);
    rightBlush.rotation.y = Math.PI / 10;
    mascotGroup.add(rightBlush);

    // 3. Cute Graduation Cap (Achievement accessory)
    const capTopGeo = new THREE.BoxGeometry(0.95, 0.05, 0.95);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x312e81,
      roughness: 0.3,
      metalness: 0.2
    });
    const capTop = new THREE.Mesh(capTopGeo, capMat);
    capTop.position.set(0, 1.25, 0);
    capTop.rotation.y = Math.PI / 4;
    capTop.rotation.z = -Math.PI / 32;
    mascotGroup.add(capTop);

    const capBaseGeo = new THREE.CylinderGeometry(0.45, 0.5, 0.2, 24);
    const capBase = new THREE.Mesh(capBaseGeo, capMat);
    capBase.position.set(0, 1.15, 0);
    mascotGroup.add(capBase);

    // Golden Tassel
    const tasselGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8);
    const tasselMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.1,
      metalness: 0.8
    });
    const tassel = new THREE.Mesh(tasselGeo, tasselMat);
    tassel.position.set(0.38, 1.05, 0.38);
    tassel.rotation.z = Math.PI / 6;
    mascotGroup.add(tassel);

    // 4. Orbiting Skill Satellites (Steady calm orbits)
    // Orbit 1: Emerald React Code Cube
    const cubeGeo = new THREE.BoxGeometry(0.36, 0.36, 0.36);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.2,
      metalness: 0.4
    });
    const cubeNode = new THREE.Mesh(cubeGeo, cubeMat);
    mascotGroup.add(cubeNode);

    // Orbit 2: Rose Figma Design Diamond
    const octaGeo = new THREE.OctahedronGeometry(0.28, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.25,
      metalness: 0.35
    });
    const octaNode = new THREE.Mesh(octaGeo, octaMat);
    mascotGroup.add(octaNode);

    // Orbit 3: Amber Freelancing Gold Token
    const coinGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 20);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.15,
      metalness: 0.9
    });
    const coinNode = new THREE.Mesh(coinGeo, coinMat);
    mascotGroup.add(coinNode);

    // Soft Orbital Ring
    const orbitRingGeo = new THREE.TorusGeometry(2.1, 0.015, 16, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xc7d2fe,
      transparent: true,
      opacity: 0.4
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.rotation.y = Math.PI / 10;
    mascotGroup.add(orbitRing);

    // Initial position parked at Hero (Right side)
    mascotGroup.position.set(2.4, 0.15, 0);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      targetMouseX = x * 1.5;
      targetMouseY = y * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Window Resize Handler
    const handleResize = () => {
      if (window.innerWidth < 1024) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Steady Orbit Angle Accumulator (Completely insulated from scroll speed!)
    let orbitPhase = 0;

    // DOM Section Anchors for Exact Spatial Positioning
    const getTargetCoordinatesFromDOM = () => {
      const viewportCenterY = window.innerHeight * 0.45;

      // Section target definitions
      const sections = [
        { id: 'section-hero', x: 2.45, y: 0.15, z: 0, scale: 1.05 },
        { id: 'section-about', x: -2.45, y: -0.1, z: 0, scale: 1.0 },
        { id: 'section-methodology', x: 2.45, y: 0.15, z: 0, scale: 1.05 },
        { id: 'section-tracks', x: 1.9, y: 1.6, z: -0.8, scale: 0.85 },
        { id: 'section-cta', x: 0, y: 0.2, z: 0, scale: 1.15 }
      ];

      // Measure distance of each section's top from viewport center
      const measurements = sections.map((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return { ...sec, dist: 99999, top: 99999 };
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height * 0.35;
        return {
          ...sec,
          dist: Math.abs(centerY - viewportCenterY),
          top: centerY
        };
      });

      // Sort by closest to viewport center
      measurements.sort((a, b) => a.dist - b.dist);
      const closest = measurements[0];
      const secondClosest = measurements[1];

      // Blend smoothly between the two closest sections
      if (!secondClosest || secondClosest.dist > 1500) {
        return { x: closest.x, y: closest.y, z: closest.z, scale: closest.scale };
      }

      const totalDist = closest.dist + secondClosest.dist;
      const weightClosest = 1 - (closest.dist / totalDist);
      const weightSecond = 1 - weightClosest;

      return {
        x: closest.x * weightClosest + secondClosest.x * weightSecond,
        y: closest.y * weightClosest + secondClosest.y * weightSecond,
        z: closest.z * weightClosest + secondClosest.z * weightSecond,
        scale: closest.scale * weightClosest + secondClosest.scale * weightSecond
      };
    };

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // 1. Smooth mouse interpolation
      mouseX = THREE.MathUtils.damp(mouseX, targetMouseX, 4, delta);
      mouseY = THREE.MathUtils.damp(mouseY, targetMouseY, 4, delta);

      // 2. Exact DOM Section Coordinates
      const targetPos = getTargetCoordinatesFromDOM();

      // Breathing idle bob
      const breathingBob = Math.sin(elapsed * 1.8) * 0.06;
      const finalX = targetPos.x + mouseX * 0.4;
      const finalY = targetPos.y + breathingBob - mouseY * 0.4;
      const finalZ = targetPos.z;

      // Smooth position dampening
      mascotGroup.position.x = THREE.MathUtils.damp(mascotGroup.position.x, finalX, 3.2, delta);
      mascotGroup.position.y = THREE.MathUtils.damp(mascotGroup.position.y, finalY, 3.2, delta);
      mascotGroup.position.z = THREE.MathUtils.damp(mascotGroup.position.z, finalZ, 3.2, delta);

      const currentScale = mascotGroup.scale.x;
      const newScale = THREE.MathUtils.damp(currentScale, targetPos.scale, 3.2, delta);
      mascotGroup.scale.set(newScale, newScale, newScale);

      // Mascot head rotation towards cursor
      const targetRotY = mouseX * 0.5 + Math.sin(elapsed * 0.7) * 0.1;
      const targetRotX = -mouseY * 0.35 + Math.cos(elapsed * 0.5) * 0.06;
      mascotGroup.rotation.y = THREE.MathUtils.damp(mascotGroup.rotation.y, targetRotY, 4, delta);
      mascotGroup.rotation.x = THREE.MathUtils.damp(mascotGroup.rotation.x, targetRotX, 4, delta);

      // 3. Steady, Calm Orbiting Satellites (Delta-based, ZERO scroll jump spikes)
      orbitPhase += 0.75 * delta;

      // React Code Cube
      cubeNode.position.set(
        Math.cos(orbitPhase) * 2.1,
        Math.sin(orbitPhase) * 0.85,
        Math.sin(orbitPhase) * 1.6
      );
      cubeNode.rotation.x += 1.2 * delta;
      cubeNode.rotation.y += 1.0 * delta;

      // Figma Design Diamond
      const angle2 = orbitPhase * 0.9 + 2.09;
      octaNode.position.set(
        Math.sin(angle2) * 2.2,
        Math.cos(angle2) * 1.05,
        Math.cos(angle2) * 1.5
      );
      octaNode.rotation.y += 1.5 * delta;

      // Freelancing Coin
      const angle3 = orbitPhase * 0.78 + 4.18;
      coinNode.position.set(
        Math.cos(angle3) * 2.3,
        -Math.sin(angle3) * 0.85,
        Math.sin(angle3) * 1.8
      );
      coinNode.rotation.x += 1.3 * delta;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      bodyGeo.dispose();
      bodyMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      glintGeo.dispose();
      glintMat.dispose();
      blushGeo.dispose();
      blushMat.dispose();
      capTopGeo.dispose();
      capBaseGeo.dispose();
      capMat.dispose();
      tasselGeo.dispose();
      tasselMat.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      coinGeo.dispose();
      coinMat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="hidden lg:block fixed inset-0 pointer-events-none z-10 select-none overflow-hidden" 
      aria-hidden="true"
    />
  );
};
