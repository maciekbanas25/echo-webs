import { useEffect, useRef } from "react";

/**
 * Raw WebGL shader — zero dependencies. ONE system everywhere: domain-warped
 * fbm ribbons of brand blue (#1A6FD4) and cyan (#00CFFF). The only thing that
 * changes per section is `intensity` (0–1): the hero runs hot at 1, the closer
 * calm at ~0.5. Same gradient, same wave maths, just dialled up or down.
 * Renders one static frame under prefers-reduced-motion; pauses offscreen.
 */

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_int;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.04;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  // Lower intensity also slows the drift, so the closer breathes rather than storms.
  float t = u_time * 0.045 * (0.65 + 0.35 * u_int);
  vec2 m = (u_mouse - 0.5) * 0.25;

  // Domain-warped flow: one field feeds the next for silky movement.
  float f1 = fbm(p * 1.3 + vec2(t * 0.8, -t * 0.45) + m);
  float f2 = fbm(p * 2.1 - vec2(t * 0.55, t * 0.35) + f1 * 1.7);
  float band = fbm(p * 1.05 + vec2(f2 * 1.9, t * 0.9));

  vec3 base = vec3(0.031, 0.039, 0.059);  /* #080A0F */
  vec3 blue = vec3(0.102, 0.435, 0.831);  /* #1A6FD4 */
  vec3 cyan = vec3(0.0, 0.812, 1.0);      /* #00CFFF */

  // Ribbon lives in the upper two thirds and dissolves at the edges.
  float ribbon = smoothstep(0.18, 0.85, band)
    * smoothstep(0.98, 0.30, uv.y)
    * smoothstep(-0.12, 0.30, uv.y);

  vec3 col = base;
  col += blue * ribbon * 0.50 * u_int;
  col += cyan * pow(ribbon, 2.4) * 0.85 * u_int;

  // Soft pool of blue light rising from the bottom edge.
  col += blue * smoothstep(0.55, 0.0, uv.y) * 0.10 * (0.6 + 0.4 * f2) * u_int;

  // Vignette keeps the corners quiet so type stays readable.
  float vig = smoothstep(1.25, 0.35, length(uv - vec2(0.5, 0.45)));
  col *= mix(0.78, 1.0, vig);

  // Fine grain so the gradient never bands.
  col += (hash(gl_FragCoord.xy + mod(u_time, 100.0)) - 0.5) * 0.016;

  gl_FragColor = vec4(col, 1.0);
}
`;

const AuroraShader = ({
  className = "",
  intensity = 1,
}: {
  className?: string;
  /** 0–1 strength of the ribbons. 1 = hero storm, ~0.5 = calm closer. */
  intensity?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return; // No WebGL: the CSS background colour stands in.

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One triangle that covers the whole clip space.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uInt = gl.getUniformLocation(program, "u_int");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse drifts toward the cursor slowly — parallax, not tracking.
    const mouse = { x: 0.5, y: 0.5 };
    let target = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      target = { x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const draw = (time: number) => {
      mouse.x += (target.x - mouse.x) * 0.03;
      mouse.y += (target.y - mouse.y) * 0.03;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uInt, intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let visible = true;
    const start = performance.now();

    if (reduced) {
      draw(14); // one elegant still frame
    } else {
      const loop = () => {
        if (visible && !document.hidden) draw((performance.now() - start) / 1000);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default AuroraShader;
