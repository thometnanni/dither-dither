precision mediump float;

uniform sampler2D image;
uniform sampler2D threshold;
uniform vec2 resolution;
uniform vec4 darkColor;
uniform vec4 lightColor;

varying vec2 v_texCoord;

vec4 dither(vec2 position, vec4 color) {
  float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  vec2 uv = mod(position, resolution) / resolution;
  float t = texture2D(threshold, uv).x * 255.0;
  float limit = 1.0 / 255.0 + (t + 0.5) / 256.0 * (254.0 / 255.0);

  float dithered = brightness < limit ? 0.0 : 1.0;
  vec4 tone = mix(darkColor, lightColor, dithered);

  float alpha = tone.a * color.a;
  return vec4(tone.rgb * alpha, alpha);
}

void main() {
  vec4 color = texture2D(image, v_texCoord);
  gl_FragColor = dither(gl_FragCoord.xy, color);
}