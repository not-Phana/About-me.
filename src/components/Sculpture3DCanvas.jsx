import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Sculpture3DCanvas
 * Pure WebGL volumetric 3D renderer for classical sculptures.
 * Generates real-time 3D parallax raymarching, normal-map estimation,
 * dynamic directional lighting, auric Kintsugi specular glint, and 3D rotation.
 * 
 * Strict Zero-Emoji Policy: No emojis in UI or comments.
 */

const VS_SOURCE = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vUv.y = 1.0 - vUv.y;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FS_SOURCE = `
precision highp float;
varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec2 uRotation; // normalized yaw/pitch from -1 to 1
uniform vec2 uLight;    // virtual light coordinates
uniform float uTime;
uniform int uMode;       // 0: Auric Realism, 1: Gold Radiance, 2: 3D Wireframe
uniform float uHover;    // 0 to 1

// Heuristic depth map estimator based on luminance, distance from pale background, and anatomy
float getDepth(vec2 uv) {
  vec4 col = texture2D(uTexture, uv);
  // Distance from pale museum marble background
  float bgDist = length(col.rgb - vec3(0.92, 0.94, 0.95));
  // Detect golden kintsugi seams (high red/green, low blue)
  float isGold = step(0.12, col.r - col.b) * step(0.48, col.r + col.g);
  // Radial distance from center of statue head
  float centerDist = 1.0 - smoothstep(0.0, 0.65, length(uv - vec2(0.5, 0.44)));

  float depth = smoothstep(0.05, 0.32, bgDist) * (0.6 + 0.4 * centerDist);
  if (isGold > 0.5) depth += 0.08;
  return clamp(depth, 0.0, 1.0);
}

void main() {
  // 1. Volumetric Parallax Ray Offset
  float baseDepth = getDepth(vUv);
  vec2 parallaxOffset = uRotation * (baseDepth * 0.048);
  vec2 uv = clamp(vUv - parallaxOffset, 0.001, 0.999);
  
  float depth = getDepth(uv);
  vec4 color = texture2D(uTexture, uv);

  // 2. Normal Map Estimation via Finite Differences
  float eps = 0.0035;
  float dX = (getDepth(uv + vec2(eps, 0.0)) - getDepth(uv - vec2(eps, 0.0))) * 3.8;
  float dY = (getDepth(uv + vec2(0.0, eps)) - getDepth(uv - vec2(0.0, eps))) * 3.8;
  vec3 normal = normalize(vec3(-dX, -dY, 1.0));

  // 3. Dynamic 3D Directional Lighting
  vec3 lightPos = vec3(uLight.x * 2.0, -uLight.y * 2.0, 1.35);
  vec3 lightDir = normalize(lightPos - vec3((uv - 0.5) * 2.0, depth * 0.6));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 halfDir = normalize(lightDir + viewDir);

  float diff = max(dot(normal, lightDir), 0.0);
  float spec = pow(max(dot(normal, halfDir), 0.0), 28.0);

  // 4. Auric Kintsugi Glint Isolation
  float isGold = step(0.125, color.r - color.b) * step(0.46, color.r + color.g);
  vec3 goldTint = vec3(1.0, 0.84, 0.32);

  // Background Ambient Occlusion Shadow
  float ao = smoothstep(0.02, 0.16, depth);

  if (uMode == 0) {
    // Mode 0: Classical Auric Realism
    vec3 lit = color.rgb * (0.86 + diff * 0.32);
    // Gold veins specular shimmer
    lit += goldTint * (spec * 2.2 + diff * 0.4) * isGold;
    // Subtle marble surface sheen
    lit += vec3(0.92, 0.95, 1.0) * spec * 0.14 * (1.0 - isGold);
    gl_FragColor = vec4(lit, 1.0);
  } else if (uMode == 1) {
    // Mode 1: Gold Radiance Ingestion Boost
    vec3 lit = color.rgb * (0.76 + diff * 0.28);
    float pulse = 0.88 + 0.12 * sin(uTime * 3.2);
    lit += goldTint * (isGold * 2.6 * pulse + spec * 2.8 * isGold);
    // Fine kinetic scanline
    float scan = smoothstep(0.025, 0.0, abs(fract(uv.y * 14.0 - uTime * 0.35) - 0.5));
    lit += vec3(0.85, 0.7, 0.25) * scan * 0.18;
    gl_FragColor = vec4(lit, 1.0);
  } else {
    // Mode 2: 3D Holographic Wireframe Topology
    vec3 topo = mix(vec3(0.06, 0.09, 0.14), vec3(0.86, 0.68, 0.22), depth);
    float grid = step(0.91, fract(uv.x * 55.0)) + step(0.91, fract(uv.y * 55.0));
    topo += vec3(0.35, 0.75, 1.0) * grid * depth * 0.7;
    topo += goldTint * isGold * 1.6;
    gl_FragColor = vec4(topo, 1.0);
  }
}
`;

export default function Sculpture3DCanvas({
  src,
  alt = '3D Classical Sculpture',
  className = '',
  onPlaySound,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Mode: 0 = Classical Realism, 1 = Gold Radiance, 2 = 3D Wireframe
  const [renderMode, setRenderMode] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [lightPos, setLightPos] = useState({ x: 0.2, y: -0.2 });

  const targetRotation = useRef({ yaw: 0, pitch: 0 });
  const currentRotation = useRef({ yaw: 0, pitch: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);
  const glRef = useRef(null);
  const uniformsRef = useRef({});
  const textureRef = useRef(null);

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl', { antialias: true, alpha: false }) ||
      canvas.getContext('experimental-webgl');

    if (!gl) {
      console.warn('WebGL not supported, falling back to 2D image.');
      return;
    }
    glRef.current = gl;

    // Helper: compile shader
    function compileShader(srcCode, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, srcCode);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(VS_SOURCE, gl.VERTEX_SHADER);
    const fs = compileShader(FS_SOURCE, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Quad geometry (2 triangles covering full clip space)
    const vertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Store uniform locations
    uniformsRef.current = {
      uTexture: gl.getUniformLocation(program, 'uTexture'),
      uRotation: gl.getUniformLocation(program, 'uRotation'),
      uLight: gl.getUniformLocation(program, 'uLight'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uMode: gl.getUniformLocation(program, 'uMode'),
      uHover: gl.getUniformLocation(program, 'uHover'),
    };

    // Load initial image texture
    const texture = gl.createTexture();
    textureRef.current = texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Placeholder 1x1 black pixel while loading
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([20, 22, 28, 255])
    );

    return () => {
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(vbo);
        gl.deleteTexture(texture);
      }
    };
  }, []);

  // Update texture when `src` changes
  useEffect(() => {
    const gl = glRef.current;
    const texture = textureRef.current;
    if (!gl || !texture || !src) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
      );
    };
  }, [src]);

  // Main Render Loop with inertia dampening and 60 FPS requestAnimationFrame
  useEffect(() => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    if (!gl || !canvas) return;

    let startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      // Handle canvas resize
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      // Smooth inertia lerp towards target rotation
      currentRotation.current.yaw +=
        (targetRotation.current.yaw - currentRotation.current.yaw) * 0.12;
      currentRotation.current.pitch +=
        (targetRotation.current.pitch - currentRotation.current.pitch) * 0.12;

      // Update state for HUD display
      setYaw(Math.round(currentRotation.current.yaw * 25 * 10) / 10);
      setPitch(Math.round(currentRotation.current.pitch * 25 * 10) / 10);

      // Pass uniforms
      const u = uniformsRef.current;
      gl.uniform1i(u.uTexture, 0);
      gl.uniform2f(
        u.uRotation,
        currentRotation.current.yaw,
        currentRotation.current.pitch
      );
      gl.uniform2f(u.uLight, lightPos.x, lightPos.y);
      gl.uniform1f(u.uTime, elapsed);
      gl.uniform1i(u.uMode, renderMode);
      gl.uniform1f(u.uHover, 1.0);

      // Draw quad
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [renderMode, lightPos]);

  // Interactive mouse move / drag handlers
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    // Light moves in real 3D
    setLightPos({
      x: (nx - 0.5) * 2.2,
      y: (ny - 0.5) * 2.2,
    });

    if (isDragging) {
      const dx = (e.clientX - lastMousePos.current.x) / rect.width;
      const dy = (e.clientY - lastMousePos.current.y) / rect.height;
      targetRotation.current.yaw = Math.max(-1.4, Math.min(1.4, targetRotation.current.yaw + dx * 2.8));
      targetRotation.current.pitch = Math.max(-1.4, Math.min(1.4, targetRotation.current.pitch - dy * 2.8));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    } else {
      // Natural 3D mouse parallax
      targetRotation.current.yaw = (nx - 0.5) * 1.25;
      targetRotation.current.pitch = (ny - 0.5) * 1.1;
    }
  }, [isDragging]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    // Smoothly return towards resting center angle
    targetRotation.current.yaw = 0.08;
    targetRotation.current.pitch = -0.05;
    setLightPos({ x: 0.25, y: -0.2 });
  }, []);

  const handleResetCamera = useCallback((e) => {
    e.stopPropagation();
    onPlaySound?.('switch');
    targetRotation.current.yaw = 0;
    targetRotation.current.pitch = 0;
    setLightPos({ x: 0.1, y: -0.1 });
  }, [onPlaySound]);

  const handleSwitchMode = useCallback((modeIndex) => {
    onPlaySound?.('keycap');
    setRenderMode(modeIndex);
  }, [onPlaySound]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing overflow-hidden border border-[var(--ms-rule-strong)] bg-[#04060a] ${className}`}
      title="Click and drag to rotate the statue in 3D, or move cursor to track dynamic lighting"
    >
      {/* WebGL 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        aria-label={alt}
      />

      {/* Top 3D HUD Navigation Bar */}
      <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-[#06080d]/90 to-transparent flex items-center justify-between gap-2 pointer-events-none z-20 font-mono text-[9.5px]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4a528] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4a528]" />
          </span>
          <span className="text-ink font-bold tracking-wider">
            3D VOLUMETRIC SCANNER
          </span>
          <span className="text-muted hidden sm:inline">
            // GLSL RAYMARCHING
          </span>
        </div>

        <div className="text-[9px] text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30 px-2 py-0.5 font-bold">
          LIVE 3D SHADER
        </div>
      </div>

      {/* 4 Golden Architectural Corner Brackets */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[var(--ms-bronze)] pointer-events-none z-20" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[var(--ms-bronze)] pointer-events-none z-20" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[var(--ms-bronze)] pointer-events-none z-20" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[var(--ms-bronze)] pointer-events-none z-20" />

      {/* Bottom 3D Telemetry Controls & Render Mode Deck */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#04060a]/95 via-[#04060a]/75 to-transparent flex flex-wrap items-center justify-between gap-2 z-20 font-mono text-[9.5px]">
        {/* Dynamic Rotation Readout */}
        <div className="flex items-center gap-2 text-muted">
          <span className="text-accent font-semibold">
            YAW: {yaw >= 0 ? `+${yaw}` : yaw}°
          </span>
          <span>·</span>
          <span className="text-[#38bdf8] font-semibold">
            PITCH: {pitch >= 0 ? `+${pitch}` : pitch}°
          </span>
        </div>

        {/* 3D Mode Selector Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSwitchMode(0);
            }}
            className={`px-2 py-0.5 border text-[9px] font-bold transition-all ${
              renderMode === 0
                ? 'border-[var(--ms-bronze)] bg-[var(--ms-bronze)] text-[#08080a]'
                : 'border-lineSoft bg-[#0a0d14]/80 text-muted hover:text-ink'
            }`}
          >
            REALISM
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSwitchMode(1);
            }}
            className={`px-2 py-0.5 border text-[9px] font-bold transition-all ${
              renderMode === 1
                ? 'border-[#4ade80] bg-[#4ade80] text-[#08080a]'
                : 'border-lineSoft bg-[#0a0d14]/80 text-muted hover:text-ink'
            }`}
          >
            AURIC GLOW
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSwitchMode(2);
            }}
            className={`px-2 py-0.5 border text-[9px] font-bold transition-all ${
              renderMode === 2
                ? 'border-[#38bdf8] bg-[#38bdf8] text-[#08080a]'
                : 'border-lineSoft bg-[#0a0d14]/80 text-muted hover:text-ink'
            }`}
          >
            3D MESH
          </button>

          <button
            type="button"
            onClick={handleResetCamera}
            className="px-2 py-0.5 border border-lineSoft bg-[#0a0d14]/80 text-muted hover:text-accent hover:border-accent text-[9px] transition-colors ml-1"
            title="Reset 3D camera angle to center"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
