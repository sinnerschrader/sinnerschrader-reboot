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
uniform vec4 gridBoundingRect;
uniform float dpr;

#define PI 3.141592654

// SDF Circle by Inigo Quilez
float sdCircle(in vec2 p, in float r) {
  return length(p) - r;
}

// SDF sub operation
float sub(float a, float b) {
  return max(-b, a);
}

// SDF add operation
float add(float a, float b) {
  return min(a, b);
}

// Pixellate
vec2 pixellate(vec2 p, float r) {
  return floor(p * 100. / r) * (r / 100.);
}

// just a bunch of sin & cos to generate an interesting pattern
float cheapNoise(vec3 stp) {
  vec3 p = vec3(stp.st * .0005, stp.p);
  return .7 * sin(p.z + p.x * 20. + cos(p.y * 20. - p.z)) * 
    cos(p.y * 10. + p.z + cos(p.y * 20. + p.z)) + 
    .3 * sin(2. + p.x * 16. + p.z) * cos(2. + p.y*17. + p.z + cos(p.x * 20. + p.z));
}

// by Inigo Quilez https://youtu.be/PMltMdi1Wzg
float sdPillVertical(vec2 p, float l, float r) {
  float h = min(1., max(0., p.y/l));
  return length(p - vec2(0, l * h)) - r;
}

float sdPillHorizontal(vec2 p, float l, float r) {
  float w = min(1., max(0., p.x/l));
  return length(p - vec2(l * w, 0)) - r;
}

void main() {
  vec2 size = gridBoundingRect.zw;
  vec2 p0 = (vPosition.xy + 1.) * size / 2.;
  vec2 p1 = mod(p0, cellSize);
  
  // pointer distance
  float minView = min(size.x, size.y);
  float pDist = 3. / minView * max(0., minView * .5 - distance(pointer, p0));

  // Calculating the border (don't draw squares that are cut off)
  vec2 borderTL = smoothstep(0.,1., p0);
  vec2 marginRight = mod(size, vec2(cellSize)) - 1.;
  marginRight += (1. - smoothstep(0.,1., marginRight)) * (cellSize - 1.);
  vec2 borderBR = 1. - smoothstep(0.,1., p0 - size + marginRight);
  float border = borderTL.x * borderTL.y * borderBR.x * borderBR.y;
  
  // choose a decent grid color and draw the grid
  vec4 gridColor = mix(bg, fg, max(.1, .25 ));
  vec2 grid = 1. - smoothstep(0.,1., abs(p1) - 1.);
  vec4 color = mix(bg, gridColor, min(1., grid.x + grid.y) * border);
  
  // choose a decent circle color, calculate the radius, draw the circle
  float circleRadius = max(.01, pDist + 2. * smoothstep(edge - .1, edge, vNoise));
  float intensity = max(.1, 1. - circleRadius * .25);
  float sdf = sdCircle(p1 - cellSize * .5, circleRadius);  
  color = mix(color, mix(bg, fg, intensity), (1. - smoothstep(0., 1., sdf)) * border);
  
  // second layer with bigger and fewer circles
  float bigCellSize = cellSize * 3.;
  vec2 p2 = mod(p0, vec2(bigCellSize));
  vec2 p3 = floor(p0 / bigCellSize) * bigCellSize;
  float n = .5 + .5 * cheapNoise(vec3(p3 * 1000. , time * .125));
  circleRadius = bigCellSize * n * .5;
  float circleStrokeWidth = 2.5;
  sdf = sdCircle(p2 - bigCellSize * .5, circleRadius);
  sdf = sub(sdf, sdCircle(p2 - bigCellSize * .5, circleRadius - circleStrokeWidth));
  vec4 ringColor = vec4(.5 + sin(p3.x), .5 + .5 * sin(p3.y + 1.), .5 + .5 * sin(p3.x + 2.), 1.);
  
  color = mix(color, ringColor, (1. - smoothstep(0., 1., sdf)) * border * smoothstep(.85, .99, n));

  // another layer with a few hardcoded pills
  float l = bigCellSize / 2.;
  float r = bigCellSize / 2.;
  sdf = sdPillHorizontal(p0 - vec2(bigCellSize), l, r);
  sdf = sub(sdf, sdPillHorizontal(p0 - vec2(bigCellSize), l, r - 3.));
  vec4 pillColor = vec4(.2, .8, .3,1.);
  color = mix(color, pillColor, (1. - smoothstep(0., 1., sdf)) * border);

  
  sdf = sdPillVertical(p0 - (size - bigCellSize - marginRight - vec2(0, cellSize * 2.)), l, r);
  sdf = sub(sdf, sdPillVertical(p0 - (size - bigCellSize - marginRight - vec2(0, cellSize * 2.)), l, r - 3.));
  pillColor = vec4(.8, .2, .4,1.);
  color = mix(color, pillColor, (1. - smoothstep(0., 1., sdf)) * border);

  // gl_FragColor = vec4(1.,0,0,1.);

  gl_FragColor = color; // mix(vec4(1.,0,0,1.), color, .5);
}
