#ifdef GL_ES
precision highp float;
#endif

#define LINES 8

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#include "lygia/math/const.glsl"
#include "lygia/generative/random.glsl"
#include "lygia/space/rotate.glsl"
#include "lygia/color/space/hsv2rgb.glsl"
#include "lygia/generative/cnoise.glsl"
#include "lygia/generative/snoise.glsl"
#include "lygia/draw/rect.glsl"

float shape(vec2 _st){
    vec2 uv = _st;
    float src = cnoise(vec3(uv*1., u_time*0.2)) + snoise(vec3(uv*1., u_time*0.2));
    float res = 0.0;

    float lower = 0.005;
    float diff = 0.005;
    // outer
    res = step(0.0, src);
    // res -= smoothstep(lower, diff, src);

    for(int i = 0; i < LINES; i++){
        float offset = float(i) * (0.005);
        lower += offset;
        res += smoothstep(lower, diff + offset, src);
        res -= smoothstep(lower+ 0.01, diff + lower, src);
    }

    return res;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0, 0.0, 0.0);

    st = fract(st * 1.0);

    vec3 palette = vec3(0.4958, 0.7 + (0.1*sin(u_time*1.)), 0.6+(0.1*cos(u_time*1.)));

    color = vec3(shape(st));

    color = (palette * color);

    float white_black_mask = 1. - step(0.1, dot(color.rgb, vec3(0.3098, 0.7412, 0.4941)));
    color.rgb = mix(color.rgb, vec3(1.0), white_black_mask);

    color = pow(color, vec3(0.8)); // gamma correction

    gl_FragColor = vec4(color,1.);
}