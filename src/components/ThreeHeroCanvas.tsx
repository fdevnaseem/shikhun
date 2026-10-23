import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    // Scene & Camera (Full viewport setup)
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

    // Pupil Specular Highlights (Cute glints)
    const glintGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const leftGlint = new THREE.Mesh(glintGeo, glintMat);
    leftGlint.position.set(-0.31, 0.26, 1.16);
    mascotGroup.add(leftGlint);

    const rightGlint = new THREE.Mesh(glintGeo, glintMat);
    rightGlint.position.set(0.39, 0.26, 1.16);
    mascotGroup.add(rightGlint);

    // Cute Cheeks (Blushing pink)
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

    // 4. Orbiting Skill Satellites
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

    // Initial position on the right (Hero view)
    mascotGroup.position.set(2.4, 0.2, 0);

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
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation & Waypoint Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX = THREE.MathUtils.damp(mouseX, targetMouseX, 5, delta);
      mouseY = THREE.MathUtils.damp(mouseY, targetMouseY, 5, delta);

      // Scroll fraction calculation across entire page
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollRatio = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      // Continuous Waypoint Interpolation:
      // Hero (0 - 20%): Right Flank (x: +2.4, y: 0.2)
      // About (25 - 45%): Glides to Left Flank (x: -2.6, y: -0.1)
      // Steps (50 - 70%): Glides to Right Flank (x: +2.3, y: 0.1)
      // Tracks (75 - 90%): Glides to Top Center (x: 0, y: 2.0, z: -1.2)
      // CTA (92 - 100%): Centers down (x: 0, y: -0.2, z: 0)

      let targetX = 2.4;
      let targetY = 0.2;
      let targetZ = 0;
      let targetScale = 1.0;

      // On mobile screens, scale mascot down and keep centered or softly offset
      const isMobile = window.innerWidth < 1024;

      if (isMobile) {
        targetScale = 0.65;
        targetX = Math.sin(scrollRatio * Math.PI * 3) * 0.8;
        targetY = Math.cos(scrollRatio * Math.PI * 2) * 0.8;
      } else {
        if (scrollRatio < 0.22) {
          // Hero: Right flank
          const t = scrollRatio / 0.22;
          targetX = 2.4 + Math.sin(t * Math.PI) * 0.2;
          targetY = 0.2;
          targetScale = 1.05;
        } else if (scrollRatio < 0.48) {
          // Transition across screen from Right (+2.4) to Left (-2.6)
          const t = (scrollRatio - 0.22) / 0.26;
          // Smooth cosine curve
          const ease = (1 - Math.cos(t * Math.PI)) / 2;
          targetX = 2.4 - ease * 5.0; // from +2.4 to -2.6
          targetY = 0.2 - ease * 0.3;
          targetScale = 1.0;
        } else if (scrollRatio < 0.72) {
          // Transition back across from Left (-2.6) to Right (+2.3)
          const t = (scrollRatio - 0.48) / 0.24;
          const ease = (1 - Math.cos(t * Math.PI)) / 2;
          targetX = -2.6 + ease * 4.9; // from -2.6 to +2.3
          targetY = -0.1 + ease * 0.2;
          targetScale = 1.02;
        } else if (scrollRatio < 0.90) {
          // Glides to Top Center above tracks
          const t = (scrollRatio - 0.72) / 0.18;
          const ease = (1 - Math.cos(t * Math.PI)) / 2;
          targetX = 2.3 - ease * 2.3; // to 0
          targetY = 0.1 + ease * 1.8; // to +1.9
          targetZ = -ease * 1.2;
          targetScale = 0.85;
        } else {
          // CTA: Lands at center
          const t = (scrollRatio - 0.90) / 0.10;
          const ease = (1 - Math.cos(t * Math.PI)) / 2;
          targetX = 0;
          targetY = 1.9 - ease * 2.1; // to -0.2
          targetZ = -1.2 + ease * 1.2;
          targetScale = 1.15;
        }
      }

      // Add gentle breathing bob + subtle mouse parallax
      const breathingBob = Math.sin(elapsed * 2) * 0.08;
      const finalX = targetX + mouseX * 0.5;
      const finalY = targetY + breathingBob - mouseY * 0.5;

      mascotGroup.position.x = THREE.MathUtils.damp(mascotGroup.position.x, finalX, 3.5, delta);
      mascotGroup.position.y = THREE.MathUtils.damp(mascotGroup.position.y, finalY, 3.5, delta);
      mascotGroup.position.z = THREE.MathUtils.damp(mascotGroup.position.z, targetZ, 3.5, delta);

      const currentScale = mascotGroup.scale.x;
      const newScale = THREE.MathUtils.damp(currentScale, targetScale, 3.5, delta);
      mascotGroup.scale.set(newScale, newScale, newScale);

      // Mascot gentle body rotation (looks towards mouse + soft tilt)
      const targetRotY = mouseX * 0.6 + Math.sin(elapsed * 0.8) * 0.15;
      const targetRotX = -mouseY * 0.4 + Math.cos(elapsed * 0.6) * 0.08;
      mascotGroup.rotation.y = THREE.MathUtils.damp(mascotGroup.rotation.y, targetRotY, 4, delta);
      mascotGroup.rotation.x = THREE.MathUtils.damp(mascotGroup.rotation.x, targetRotX, 4, delta);

      // Orbiting Satellites Speed & Position
      const orbitSpeed = 1.2 + scrollRatio * 2.5;

      // React Code Cube
      const angle1 = elapsed * orbitSpeed;
      cubeNode.position.set(
        Math.cos(angle1) * 2.1,
        Math.sin(angle1) * 0.9,
        Math.sin(angle1) * 1.6
      );
      cubeNode.rotation.x += 2 * delta;
      cubeNode.rotation.y += 1.5 * delta;

      // Figma Design Diamond
      const angle2 = elapsed * (orbitSpeed * 0.85) + Math.PI * 0.66;
      octaNode.position.set(
        Math.sin(angle2) * 2.2,
        Math.cos(angle2) * 1.1,
        Math.cos(angle2) * 1.5
      );
      octaNode.rotation.y += 2.5 * delta;

      // Freelancing Coin
      const angle3 = elapsed * (orbitSpeed * 0.7) + Math.PI * 1.33;
      coinNode.position.set(
        Math.cos(angle3) * 2.3,
        -Math.sin(angle3) * 0.9,
        Math.sin(angle3) * 1.8
      );
      coinNode.rotation.x += 2 * delta;

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
      className="fixed inset-0 pointer-events-none z-10 select-none overflow-hidden" 
      aria-hidden="true"
    />
  );
};
