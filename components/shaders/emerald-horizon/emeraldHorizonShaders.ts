/**
 * ThreeUI — StructureFlowCollection, variant "emerald-horizon".
 * Registered source, file sha256
 * 763c59aaaeeea0dc59ddb4aa47505d0a89a30ccc6b7747657df74657b1295c57 (verified).
 *
 * The shader maths, motion and uniforms are the registered source, untouched.
 * The ONLY change is the three colour constants, recoloured to the NEXT palette
 * as requested:
 *
 *   base       vec3(0.0, 0.02, 0.0)  emerald tint  -> (0, 0, 0.008), a whisper
 *                                    of Deep Blue over Ink Black
 *   glowColor1 vec3(0.05, 0.8, 0.2)  emerald       -> Signature Teal #3FE0D0
 *   glowColor2 vec3(0.0, 1.0, 0.5)   spring green  -> Deep Blue #010080
 *
 * On the second stop: the mix factor below is `st.x + sin(u_time*0.2)*0.5`,
 * which sweeps -0.5 to 1.5, and GLSL mix() extrapolates instead of clamping. So
 * the two stops are not just sampled between, they are overshot at both ends —
 * the original emerald pair overshoots into cyan, which is why the authored look
 * shimmers. Stops that sit far apart invert a channel under that overshoot and
 * clip: Signature Teal paired with the ramp's violet #A537C8 was measured
 * blowing out to #FF0DFF, a hot magenta nowhere near the brand. Teal -> Deep
 * Blue keeps the whole overshot range inside the ramp's cool half, so the
 * horizon reads teal at one edge and Deep Blue at the other with the authored
 * shimmer intact.
 */

export const LUMINA_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export const LUMINA_FRAGMENT_SHADER = `
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_wave_scale;
uniform float u_variation;
uniform float u_glow;
uniform float u_vignette;
varying vec2 vUv;
float hash(float n) { return fract(sin(n) * 1e4); }
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float yPos = st.y;
  float wave1 = sin(st.x * 3.0 + u_time * 0.5) * 0.1 * u_wave_scale;
  float wave2 = sin(st.x * 5.0 - u_time * 0.3) * 0.05 * u_wave_scale;
  float combinedWave = wave1 + wave2;
  float intensity = smoothstep(0.4, -0.1, yPos + combinedWave);
  float variation = noise(st.x * 2.0 + u_time * 0.1) * 0.5 + 0.5;
  intensity *= variation * 1.5 * u_variation;
  vec3 color = vec3(0.0, 0.0, 0.008);
  vec3 glowColor1 = vec3(0.247, 0.878, 0.816);
  vec3 glowColor2 = vec3(0.004, 0.0, 0.502);
  vec3 finalGlow = mix(glowColor1, glowColor2, st.x + sin(u_time*0.2)*0.5);
  color += finalGlow * pow(intensity, 1.5) * 1.2 * u_glow;
  float vignette = mix(1.0, smoothstep(1.2, 0.5, length(st - vec2(0.5, 0.0))), u_vignette);
  color *= vignette;
  gl_FragColor = vec4(color, 1.0);
}
`;
