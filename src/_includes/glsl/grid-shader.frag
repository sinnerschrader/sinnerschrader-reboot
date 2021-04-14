precision highp float;
uniform vec2 resolution;
uniform sampler2D texture;
varying vec4 vPosition;
varying vec2 vUv;
varying float vNoise;
uniform float time;
uniform float cellSize;
uniform float edge;
uniform vec2 pointer;
uniform vec4 bg;
uniform vec4 fg;

// Repeat by Inigo Quilez
vec2 repeat(in vec2 p, in vec2 c) {
  return mod(p, c) - 0.5 * c;
}

// SDF Circle by Inigo Quilez
float sdCircle(in vec2 p, in float r) {
  return length(p) - r;
}

// Pixellate by Lea <3
vec2 pixellate(in vec2 p, in vec2 r) {
  return floor(p * 100. / r) * (r / 100.);
}

// the texture used in this shader is for tracking pointer motion and it stores timestamps
float decodeTimestamp(vec4 color) {
  float a = floor(color.a * 255.);
  float b = floor(color.b * 255.);
  float g = floor(color.g * 255.);
  float r = floor(color.r * 255.);
  return a + b * 256. + g * 65536. + r * 16777216.;
}

void main() {
  float aspect = resolution.x / resolution.y;
  vec2 p0 = vPosition.xy; 
  p0.x *= aspect;
  float zoomLevel = 50.;
  vec2 cell = vec2(cellSize * 2. * zoomLevel / resolution.x * aspect, cellSize * 2. * zoomLevel / resolution.y);
  vec2 p = mod(p0 * zoomLevel, cell);
  float strength = max(0., .4 - 2. * pow(distance(pointer, p0), 2.));
  float d = sdCircle(p - cell * .5, .01 + strength);
  float dStep = smoothstep(0., .2, d);
  
  float nStep = smoothstep(edge - .1, edge, vNoise);
  vec4 color = mix(mix(bg, fg, nStep), bg, dStep);
  gl_FragColor = color;
}
