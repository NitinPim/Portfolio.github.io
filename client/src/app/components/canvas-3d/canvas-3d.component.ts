import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-canvas-3d',
  standalone: true,
  template: `
    <div class="canvas-wrapper" #container>
      <canvas #canvas class="webgl-canvas"></canvas>
      <div class="canvas-ambient-flare"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }
    .canvas-wrapper {
      width: 100%;
      height: 100%;
      min-height: 480px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .webgl-canvas {
      width: 100% !important;
      height: 100% !important;
      outline: none;
      display: block;
    }
    .canvas-ambient-flare {
      position: absolute;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 70%);
      filter: blur(40px);
      pointer-events: none;
      z-index: 0;
    }
  `]
})
export class Canvas3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') private containerRef!: ElementRef<HTMLDivElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationFrameId!: number;

  // 3D Objects
  private coreGroup = new THREE.Group();
  private innerSphere!: THREE.Mesh;
  private outerWireframe!: THREE.Mesh;
  private ring1!: THREE.Mesh;
  private ring2!: THREE.Mesh;
  private ring3!: THREE.Mesh;
  private particles!: THREE.Points;

  // Interaction variables
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }

  private initThree(): void {
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 7;

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLightIndigo = new THREE.PointLight(0x6366f1, 4, 50);
    pointLightIndigo.position.set(5, 5, 5);
    this.scene.add(pointLightIndigo);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLightCyan.position.set(-5, -5, 3);
    this.scene.add(pointLightCyan);

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 3, 50);
    pointLightViolet.position.set(0, 4, -3);
    this.scene.add(pointLightViolet);

    // 5. Procedural 3D Quantum Hologram / Cyber Core
    // Inner Luminous Core
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x1e1b4b,
      wireframe: false
    });
    this.innerSphere = new THREE.Mesh(innerGeo, innerMat);
    this.coreGroup.add(this.innerSphere);

    // Outer Geometric Wireframe Lattice
    const outerGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    this.outerWireframe = new THREE.Mesh(outerGeo, outerMat);
    this.coreGroup.add(this.outerWireframe);

    // Gyroscope Orbiting Ring 1
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      emissive: 0x4338ca,
      roughness: 0.2,
      metalness: 0.9
    });
    this.ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.ring1.rotation.x = Math.PI / 3;
    this.coreGroup.add(this.ring1);

    // Gyroscope Orbiting Ring 2
    const ringGeo2 = new THREE.TorusGeometry(2.4, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      roughness: 0.2,
      metalness: 0.9
    });
    this.ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.ring2.rotation.y = Math.PI / 4;
    this.coreGroup.add(this.ring2);

    // Gyroscope Orbiting Ring 3
    const ringGeo3 = new THREE.TorusGeometry(2.7, 0.02, 16, 100);
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x7e22ce,
      roughness: 0.2,
      metalness: 0.9
    });
    this.ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    this.ring3.rotation.z = Math.PI / 6;
    this.coreGroup.add(this.ring3);

    this.scene.add(this.coreGroup);

    // 6. Floating Cosmic Particle Dust Field
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x6366f1);
    const color2 = new THREE.Color(0x06b6d4);
    const color3 = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 14;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 14;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 14;

      const mixedColor = Math.random() < 0.33 ? color1 : (Math.random() < 0.66 ? color2 : color3);
      particleColors[idx] = mixedColor.r;
      particleColors[idx + 1] = mixedColor.g;
      particleColors[idx + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particles);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    this.mouseX = (event.clientX - windowHalfX) * 0.0012;
    this.mouseY = (event.clientY - windowHalfY) * 0.0012;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.containerRef || !this.renderer || !this.camera) return;
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Smooth inertia lerp with mouse
    this.targetX += (this.mouseX - this.targetX) * 0.05;
    this.targetY += (this.mouseY - this.targetY) * 0.05;

    // Rotate core group
    this.coreGroup.rotation.y += 0.006;
    this.coreGroup.rotation.x = this.targetY * 0.8;
    this.coreGroup.rotation.y += this.targetX * 0.8;

    // Independent ring rotations for gyroscope effect
    if (this.ring1) {
      this.ring1.rotation.x += 0.008;
      this.ring1.rotation.y += 0.004;
    }
    if (this.ring2) {
      this.ring2.rotation.y -= 0.007;
      this.ring2.rotation.z += 0.005;
    }
    if (this.ring3) {
      this.ring3.rotation.z += 0.006;
      this.ring3.rotation.x -= 0.004;
    }

    // Outer lattice counter-spin
    if (this.outerWireframe) {
      this.outerWireframe.rotation.y -= 0.005;
      this.outerWireframe.rotation.x -= 0.003;
    }

    // Particle drift
    if (this.particles) {
      this.particles.rotation.y += 0.001;
      this.particles.rotation.x += 0.0005;
    }

    this.renderer.render(this.scene, this.camera);
  };

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
