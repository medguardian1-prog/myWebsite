"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's live surface: a domain-warped noise field ridged into thin
 * incandescent filaments, drifting and heating up under the pointer.
 *
 * Written as a raw WebGL2 fragment shader rather than pulled in through
 * three.js — the whole effect is one full-screen triangle, so a renderer
 * would cost ~600kb to do nothing. It draws at a fraction of native
 * resolution (the field is all soft glow, so upscaling is invisible) which
 * is what keeps it smooth on the mid-range Android phones this site is
 * actually going to be opened on.
 */

const VERT = `#version 300 es
void main() {
  vec2 v[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  gl_Position = vec4(v[gl_VertexID], 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uEnergy;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.038;

  // Squash vertically before sampling so the field stretches sideways and
  // reads as strung wire rather than as clouds.
  vec2 sp = p * vec2(1.15, 2.35);

  // Two rounds of domain warping: this is what turns smooth blobs into
  // something that looks tangled instead of like a lava lamp.
  vec2 q = vec2(fbm(sp + t), fbm(sp + vec2(3.1, 1.7)));
  vec2 r = vec2(fbm(sp + 2.2 * q + vec2(1.7, 9.2) + t * 1.6),
                fbm(sp + 2.2 * q + vec2(8.3, 2.8) - t * 1.2));
  float f = fbm(sp + 2.4 * r);

  // Ridge the field, then raise it to a high power so only the crests
  // survive — those crests are the filaments. The exponent is the whole
  // trick: too low and it fogs over the type, too high and it disappears.
  float ridge = clamp(1.0 - abs(f * 2.0 - 1.0), 0.0, 1.0);
  float thread = pow(ridge, 30.0);
  float halo = pow(ridge, 5.0) * 0.055;

  vec2 m = (uMouse * uRes - 0.5 * uRes) / uRes.y;
  float heat = exp(-dot(p - m, p - m) * 2.2);

  float energy = (thread * 1.15 + halo) * (0.42 + 0.75 * heat) * uEnergy;
  // Fade out top and bottom so the nav and the wordmark sit on clean ink.
  energy *= smoothstep(1.05, 0.32, abs(p.y));

  vec3 hot   = vec3(1.000, 0.240, 0.000);
  vec3 amber = vec3(1.000, 0.478, 0.102);
  vec3 gold  = vec3(1.000, 0.760, 0.294);
  vec3 white = vec3(1.000, 0.914, 0.658);

  vec3 col = mix(hot, amber, smoothstep(0.0, 0.35, energy));
  col = mix(col, gold, smoothstep(0.30, 0.75, energy));
  col = mix(col, white, smoothstep(0.70, 1.30, energy));
  col *= energy;

  col += vec3(0.031, 0.027, 0.043);

  float vig = smoothstep(1.5, 0.3, length(p * vec2(0.7, 1.0)));
  col *= mix(0.45, 1.0, vig);

  // Dither, or the dark falloff bands badly on 8-bit displays.
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

  outColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function FilamentField({
  energy = 1,
  className = "",
}: {
  energy?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      depth: false,
      stencil: false,
    });
    if (!gl) return; // Static CSS gradient underneath carries the design.

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uEnergy = gl.getUniformLocation(prog, "uEnergy");
    gl.uniform1f(uEnergy, energy);

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Soft glow upscales cleanly, so we render well under native resolution.
    const scale = coarse ? 0.45 : 0.62;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer drives a target; the shader reads a smoothed value so the
    // heat trails behind the cursor instead of snapping to it.
    let tx = 0.5;
    let ty = 0.55;
    let mx = 0.5;
    let my = 0.55;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let onScreen = true;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    let last = start;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!onScreen || document.hidden) {
        last = now;
        return;
      }
      // Cap the step so a backgrounded tab doesn't jump the field on return.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      mx += (tx - mx) * Math.min(1, dt * 3.2);
      my += (ty - my) * Math.min(1, dt * 3.2);

      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [energy]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
