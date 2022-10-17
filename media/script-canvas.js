let zzfx,zzfxV,zzfxX
// ZzFXMicro - Zuper Zmall Zound Zynth - v1.1.8 ~ 884 bytes minified
zzfxV=.3    // volume
zzfx=       // play sound
(p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let
M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0
,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+
r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1)
,-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:
-1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/
2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)
+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.createBuffer(1,h,R);p.
getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination
);b.start();return b};zzfxX=new (window.AudioContext||webkitAudioContext) // audio context
const M = Math, a = Math.abs, ac = Math.acos, acs = Math.acosh, as = Math.asin, ass = Math.asinh, at = Math.atan, ats = Math.atanh, at2 = Math.atan2, cbrt = Math.cbrt, ce = Math.ceil, clz = Math.clz32, C = Math.cos, csh = Math.cosh, E = Math.exp, expm1 = Math.expm1, F = Math.floor, fr = Math.fround, H = Math.hypot, imul = Math.imul, L = Math.log, lp1 = Math.log1p, l10 = Math.log10, l2 = Math.log2, max = Math.max, min = Math.min, pow = Math.pow, R = Math.random, ro = Math.round, s = Math.sign, S = Math.sin, sh = Math.sinh, Q = Math.sqrt, T = Math.tan, th = Math.tanh, tr = Math.trunc;
const m = {
    a,
    ac,
    acs,
    as,
    ass,
    at,
    ats,
    at2,
    cbrt,
    ce,
    clz,
    C,
    csh,
    E,
    expm1,
    F,
    fr,
    H,
    imul,
    L,
    lp1,
    l10,
    l2,
    max,
    min,
    pow,
    R,
    ro,
    s,
    S,
    sh,
    Q,
    T,
    th,
    tr,
    M,
};
class tObject {
    x;
    y;
    z;
    w;
    h;
    d;
    rx;
    ry;
    rz;
    sx;
    sy;
    sz;
    color;
    constructor(x, y, z, w, h, d, rx, ry, rz, sx, sy, sz, c) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.h = h;
        this.d = d;
        this.rx = rx;
        this.ry = ry;
        this.rz = rz;
        this.sx = sx;
        this.sy = sy;
        this.sz = sz;
        this.color = c;
    }
}
class tPoint extends tObject {
    constructor(x, y, z, c) {
        super(x, y, z, 0, 0, 0, 0, 0, 0, 0, 0, 0, c);
    }
}
class tLine extends tObject {
    constructor(x1, y1, z1, x2, y2, z2, c) {
        super(x1, y1, z1, x2, y2, z2, 0, 0, 0, 0, 0, 0, c);
    }
}
class tMesh {
    vertices;
    faces;
    uvs;
    constructor(vertices, faces, uvs) {
        this.vertices = vertices; // vertices
        this.faces = faces; // faces
        this.uvs = uvs; // uvs
    }
}
class tMaterial {
    color;
    texture;
    emissive;
    specular;
    shininess;
    reflectivity;
    opacity;
    transparent;
    constructor(color, texture, emissive, specular, shininess, reflectivity, opacity, transparent) {
        this.color = color; // color
        this.texture = texture; // texture
        this.emissive = emissive; // emissive
        this.specular = specular; // specular
        this.shininess = shininess; // shininess
        this.reflectivity = reflectivity; // reflectivity
        this.opacity = opacity; // opacity
        this.transparent = transparent; // transparent
    }
}
class tPlane extends tObject {
    constructor(x, y, z, w, h, c) {
        super(x, y, z, w, h, 0, 0, 0, 0, 0, 0, 0, c);
    }
}
class tSphere extends tObject {
    radius;
    constructor(x, y, z, r, rx, ry, rz, sx, sy, sz, c, radius) {
        super(x, y, z, r, 0, 0, rx, ry, rz, sx, sy, sz, c);
        this.radius = radius;
    }
}
class tCube extends tObject {
    constructor(x, y, z, w, h, d, rx, ry, rz, sx, sy, sz, c) {
        super(x, y, z, w, h, d, rx, ry, rz, sx, sy, sz, c);
    }
}
class tLight extends tObject {
    intensity;
    constructor(x, y, z, color, intensity) {
        super(x, y, z, 0, 0, 0, 0, 0, 0, 0, 0, 0, color);
        this.intensity = intensity;
    }
} // tiny Light class
class tCamera extends tObject {
    fov;
    near;
    far;
    aspect;
    constructor(x, y, z, rx, ry, rz, fov, near, far, aspect) {
        super(x, y, z, 0, 0, 0, rx, ry, rz, 0, 0, 0, 0);
        this.aspect = aspect;
        this.fov = fov; // field of view
        this.near = near; // near plane
        this.far = far; // far plane
        this.aspect = 1; // aspect ratio
    }
}
class tScene {
    objects;
    lights;
    camera;
    constructor(objects, lights, camera) {
        this.objects = objects; // objects
        this.lights = lights; // lights
        this.camera = camera; // camera
    }
    add(o) {
        this.objects.push(o);
    } // add object
    remove(o) {
        this.objects.splice(this.objects.indexOf(o), 1);
    } // remove object
    addLight(l) {
        this.lights.push(l);
    } // add light
    removeLight(l) {
        this.lights.splice(this.lights.indexOf(l), 1);
    } // remove light
} // tiny Scene class
// basic renderer
class tRenderer {
    scene;
    canvas;
    ctx;
    buffers;
    textures;
    shaders;
    constructor(scene, canvas, width, height) {
        this.scene = scene; // scene
        this.canvas = canvas; // canvas
        this.setupCanvas(width, height);
        this.setupContext();
        this.setupBuffers();
        this.setupTextures();
        this.setupShaders();
    }
    setupCanvas(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    } // setup canvas
    setupContext() {
        this.ctx = this.canvas.getContext("2d");
    } // setup context
    setupBuffers() {
        this.buffers = {
            position: this.ctx.createBuffer(),
            normal: this.ctx.createBuffer(),
            uv: this.ctx.createBuffer(),
            index: this.ctx.createBuffer(),
        };
    } // setup buffers
    setupTextures() {
        this.textures = [];
    } // setup textures
    setupShaders() {
        this.shaders = {
            vertex: `
          attribute vec3 aVertexPosition;
          attribute vec3 aVertexNormal;
          attribute vec2 aTextureCoord;
          uniform mat4 uMVMatrix;
          uniform mat4 uPMatrix;
          uniform mat3 uNMatrix;
          uniform vec3 uAmbientColor;
          uniform vec3 uLightingDirection;
          uniform vec3 uDirectionalColor;
          uniform bool uUseLighting;
          varying vec2 vTextureCoord;
          varying vec3 vLightWeighting;
          void main(void) {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
            vTextureCoord = aTextureCoord;
            if (!uUseLighting) {
              vLightWeighting = vec3(1.0, 1.0, 1.0);
            } else {
              vec3 transformedNormal = uNMatrix * aVertexNormal;
              float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
              vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
            }
          }
        `,
            fragment: `
          precision mediump float;
          varying vec2 vTextureCoord;
          varying vec3 vLightWeighting;
          uniform sampler2D uSampler;
          uniform bool uUseTextures;
          void main(void) {
            vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
            gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
          }
        `,
        };
    } // setup shaders
    clearScene() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } // clear scene
    fillScene(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } // fill scene
    renderObject(object) {
        this.ctx.save();
        this.ctx.translate(object.x, object.y);
        this.ctx.rotate(object.rx);
        this.ctx.scale(object.sx, object.sy);
        this.ctx.fillStyle = object.c;
        this.ctx.fillRect(-object.w / 2, -object.h / 2, object.w, object.h);
        this.ctx.restore();
    } // render object
    renderLight(light) {
        this.ctx.save();
        this.ctx.translate(light.x, light.y);
        this.ctx.fillStyle = light.c;
        this.ctx.fillRect(-light.w / 2, -light.h / 2, light.w, light.h);
        this.ctx.restore();
    } // render light
    renderCamera(camera) {
        this.ctx.save();
        this.ctx.translate(camera.x, camera.y);
        this.ctx.fillStyle = camera.c;
        this.ctx.fillRect(-camera.w / 2, -camera.h / 2, camera.w, camera.h);
        this.ctx.restore();
    } // render camera
    render(scene) {
        this.clearScene();
        this.fillScene("#000000");
        // rendering order: objects, lights, camera
        // 1. render objects
        for (let i = 0; i < scene.objects.length; i++) {
            this.renderObject(scene.objects[i]);
        }
        // 2. render lights
        for (let i = 0; i < scene.lights.length; i++) {
            this.renderLight(scene.lights[i]);
        }
        // 3. render camera
        this.renderCamera(scene.camera);
    }
}
const funcs = {
    V3: function V3(x, y, z) {
        return { x, y, z };
    },
    V2: function V2(x, y) {
        return { x, y };
    },
    P: function P(x, y, z, r, c, a) {
        return {
            pos: funcs.V3(x, y, z),
            vel: funcs.V3(0, 0, 0),
            acc: funcs.V3(0, 0, 0),
            r,
            c,
            a,
        };
    },
    M: function M(v) {
        return { v, m: v.length, n: v[0].length };
    },
    R: function R(r, g, b) {
        return `rgba(${r},${g},${b})`;
    },
    F2: function F2(v, d) {
        return Math.sqrt(Math.pow(v.x - d.x, 2) + Math.pow(v.y - d.y, 2));
    },
    A2: function A2(v, d) {
        return Math.atan2(v.y - d.y, v.x - d.x);
    },
    F3: function F3(v, d) {
        return Math.sqrt(Math.pow(v.x - d.x, 2) + Math.pow(v.y - d.y, 2) + Math.pow(v.z - d.z, 2));
    },
    A3: function A3(v, d) {
        return Math.atan2(v.y - d.y, v.x - d.x);
    },
    cwt: function cwt(x, y, t) {
        return funcs.V2(x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t));
    },
    cwt3: function cwt3(x, y, z, t) {
        return funcs.V3(x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t), z);
    },
    // matrix functions - prefix with m
    madd: function madd(a, b) {
        const c = funcs.M(funcs.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < a.n; j++) {
                c.v[i][j] = a.v[i][j] + b.v[i][j];
            }
        }
        return c;
    },
    msub: function msub(a, b) {
        const c = funcs.M(funcs.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < a.n; j++) {
                c.v[i][j] = a.v[i][j] - b.v[i][j];
            }
        }
        return c;
    },
    mmul: function mmul(a, b) {
        const c = funcs.M(funcs.mzeros(a.m, b.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < b.n; j++) {
                for (let k = 0; k < a.n; k++) {
                    c.v[i][j] += a.v[i][k] * b.v[k][j];
                }
            }
        }
        return c;
    },
    mdiv: function mdiv(a, b) {
        const c = funcs.M(funcs.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < a.n; j++) {
                c.v[i][j] = a.v[i][j] / b.v[i][j];
            }
        }
        return c;
    },
    mzeros: function mzeros(m, n) {
        const a = [];
        for (let i = 0; i < m; i++) {
            a[i] = [];
            for (let j = 0; j < n; j++) {
                a[i][j] = 0;
            }
        }
        return a;
    },
    mones: function mones(m, n) {
        const a = [];
        for (let i = 0; i < m; i++) {
            a[i] = [];
            for (let j = 0; j < n; j++) {
                a[i][j] = 1;
            }
        }
        return a;
    },
    mrand: function mrand(m, n) {
        const a = [];
        for (let i = 0; i < m; i++) {
            a[i] = [];
            for (let j = 0; j < n; j++) {
                a[i][j] = Math.random();
            }
        }
        return a;
    },
    mfill: function mfill(m, n, v) {
        const a = [];
        for (let i = 0; i < m; i++) {
            a[i] = [];
            for (let j = 0; j < n; j++) {
                a[i][j] = v;
            }
        }
        return a;
    },
    mcopy: function mcopy(a) {
        const b = funcs.M(funcs.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < a.n; j++) {
                b.v[i][j] = a.v[i][j];
            }
        }
        return b;
    },
    mrow: function mrow(a, i) {
        return a.v[i];
    },
    mcol: function mcol(a, j) {
        const c = [];
        for (let i = 0; i < a.m; i++) {
            c[i] = a.v[i][j];
        }
        return c;
    },
    // vector functions - prefix with v
    vadd: function vadd(a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] + b[i];
        }
        return c;
    },
    vsub: function vsub(a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] - b[i];
        }
        return c;
    },
    vmul: function vmul(a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] * b[i];
        }
        return c;
    },
    vdiv: function vdiv(a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] / b[i];
        }
        return c;
    },
    vdot: function vdot(a, b) {
        let c = 0;
        for (let i = 0; i < a.length; i++) {
            c += a[i] * b[i];
        }
        return c;
    },
    vcross: function vcross(a, b) {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0],
        ];
    },
    vnorm: function vnorm(a) {
        return Math.sqrt(funcs.vdot(a, a));
    },
    vunit: function vunit(a) {
        const c = [];
        const n = funcs.vnorm(a);
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] / n;
        }
        return c;
    },
    vcopy: function vcopy(a) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i];
        }
        return c;
    },
    // physics functions - prefix with p
    pgrav: function pgrav(m1, m2, r) {
        const G = 6.673e-11;
        return (G * m1 * m2) / (r * r);
    },
    electrostatic: function electrostatic(q1, q2, r) {
        const k = 8.99e9;
        return (k * q1 * q2) / (r * r);
    },
    // geometry functions - prefix with g
    gline: function gline(x1, y1, x2, y2) {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        return { m, b };
    },
    gline2: function gline2(x1, y1, m) {
        const b = y1 - m * x1;
        return { m, b };
    },
    gline3: function gline3(x1, y1, x2, y2) {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        return { m, b };
    },
    bounds: function bounds(x, y, w, h) {
        return {
            x1: x,
            y1: y,
            x2: x + w,
            y2: y + h,
        };
    },
    gintersect: function gintersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        const l1 = funcs.gline(x1, y1, x2, y2);
        const l2 = funcs.gline(x3, y3, x4, y4);
        const x = (l2.b - l1.b) / (l1.m - l2.m);
        const y = l1.m * x + l1.b;
        return { x, y };
    },
    // raytrace functions - prefix with r
    rintersect: function rintersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        const l1 = funcs.gline(x1, y1, x2, y2);
        const l2 = funcs.gline(x3, y3, x4, y4);
        const x = (l2.b - l1.b) / (l1.m - l2.m);
        const y = l1.m * x + l1.b;
        if (x >= x3 && x <= x4 && y >= y3 && y <= y4) {
            return { x, y };
        }
        return null;
    },
    raytrace: function raytrace(x1, y1, x2, y2, walls) {
        let x = x2;
        let y = y2;
        let d = 0;
        let i = 0;
        let p = null;
        while (i < walls.length) {
            p = funcs.rintersect(x1, y1, x2, y2, walls[i].x1, walls[i].y1, walls[i].x2, walls[i].y2);
            if (p) {
                x = p.x;
                y = p.y;
                d = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
                break;
            }
            i++;
        }
        return { x, y, d };
    },
    rnd: function rnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    rRr: function rR(max) {
        return Math.floor(Math.random() * (max + 1));
    },
};
class ScriptCanvas extends HTMLCanvasElement {
    // called to inspect which apptributes to listen to
    static get observedAttributes() {
        return ["script", "width", "height", "paused", "active"];
    }
    _scriptInterval = null;
    _context = null;
    _paused = false;
    _active = true;
    _script = null;
    _fps = 60;
    _scriptFunction = null;
    _lastUpdate = 0;
    _startTime = 0;
    // fps meter overlay
    delta;
    coef;
    etn;
    GR;
    GRV;
    stack;
    stackAverage;
    total = 0;
    prev = 0;
    c = this;
    r;
    x;
    y;
    pals;
    palVals;
    di = 0;
    raf;
    totalAverage;
    range;
    overlayVisible = true;
    // webcomponent constructor
    constructor() {
        // Always call super first in constructor
        super();
        // setup the variables
        this.setupVariables();
        // setup the overlay variables
        this.setupOverlayVariables();
        // size the canvas to the width and height of the canvas element
        this._scriptRunner = this._scriptRunner.bind(this);
    }
    connectedCallback() {
    }
    disconnectedCallback() {
        if (this._scriptInterval) {
            clearTimeout(this._scriptInterval);
            this._scriptInterval = undefined;
        }
    }
    attributeChangedCallback(name, _oldValue, newValue) {
        if (name === "script") {
            if (this._scriptInterval) {
                clearTimeout(this._scriptInterval);
                this._scriptInterval = undefined;
                this._context = undefined;
            }
            if (newValue) {
                this.setScript(newValue);
                this._paused = false;
                this._active = true;
                this._context = this.createContext();
                this._startTime = Date.now();
                this.startScriptRunner();
            }
        }
        else if (name == "paused") {
            this._paused = newValue;
        }
        else if (name == "active") {
            this._active = newValue;
        }
        else if (name === 'fps-overlay') {
            this.overlayVisible = newValue;
        }
    }
    startScriptRunner() {
        this._scriptInterval = setTimeout(this._scriptRunner, 0);
    }
    setScript(s) {
        this._script = s;
        if (this._script) {
            this._paused = false;
            this._active = true;
            if (typeof this._script == "function") {
                this._scriptFunction = this._script;
            }
            else {
                this._context = this.createContext();
                this._scriptFunction = new Function(...Object.keys(this._context), this._script);
            }
            this.startScriptRunner();
        }
        else {
            if (this._scriptInterval) {
                clearTimeout(this._scriptInterval);
                this._scriptInterval = undefined;
            }
            if (this._context) {
                this._context = undefined;
            }
        }
    }
    setupVariables() {
        this._active = false; // set the active state to false
        this._paused = false; // set the paused state to false
        this._fps = 60; // set the fps to 60
        this._script = null; // set the script to null
        this._context = undefined;
    }
    setupOverlayVariables() {
        this.delta = 180 / this._fps;
        this.coef = 1.02;
        this.etn = 1000 / this._fps * this.coef;
        this.GR = Math.PI / 180;
        this.GRV = this.GR * this.delta;
        this.stack = new Array(this._fps);
        this.stackAverage = new Array(this._fps);
        this.total = 0;
        this.c = this;
        this.r = this.width > this.height ? this.height / 1.5 : this.width / 1.5;
        this.x = this.width / 10;
        this.y = this.height / 10;
        this.pals = ['this.green', 'yellow', 'red'];
        this.palVals = [this._fps / 100 * 8, this._fps / 100 * 8, this._fps / 100 * 8];
        this.di = 0;
    }
    setupContext() {
        this._context = !this._context ? this.createContext() : this._context;
    }
    pause() {
        this._paused = true;
    }
    resume() {
        this._paused = false;
    }
    stop() {
        this._active = false;
        this._paused = true;
    }
    start() {
        const wasActive = this._active;
        this._active = true;
        this._paused = false;
        if (!wasActive) {
            this.startScriptRunner();
        }
    }
    createContext() {
        const c = this;
        const x = c.getContext("2d");
        if (!x)
            return;
        const classes = {
            tObject,
            tPoint,
            tLine,
            tMesh,
            tMaterial,
            tPlane,
            tSphere,
            tCube,
            tLight,
            tCamera,
            tScene,
            tRenderer,
        };
        const canvasFuncs = {
            bp: x.beginPath,
            cp: x.closePath,
            f: x.fill,
            fs: x.fillStyle,
            fR: x.fillRect,
            lT: x.lineTo,
            mT: x.moveTo,
            st: x.stroke,
            sS: x.strokeStyle,
            sR: x.strokeRect,
            sT: x.strokeText,
            U: (_x, _y, x1, y1, _c) => {
                x.strokeStyle = _c;
                x.beginPath();
                x.moveTo(_x, _y);
                x.lineTo(x1, y1);
                x.stroke();
            }
        };
        return { ...m, ...canvasFuncs, ...classes, ...funcs, c, x, t: 0, zzfx, zzfxV, zzfxX };
    }
    _scriptRunner() {
        // if not active, return after cleaning up interval if needed
        if (!this._active) {
            if (this._scriptInterval) {
                clearTimeout(this._scriptInterval);
                this._scriptInterval = null;
            }
            return;
        }
        // if paused then just exit the render without touching interval
        if (this._paused) {
            return;
        }
        // setup the context
        this.setupContext();
        try {
            // run the script
            const runInContext = () => {
                this._scriptFunction(...Object.values(this._context));
            };
            runInContext.call(this._context);
            //const elapsed = Date.now() - this._startTime;
            if (this.overlayVisible) {
                this.stack.push(new Date().getTime() - this.prev);
                if (this.stack.length > 60)
                    this.stack.shift();
                this.prev = new Date().getTime();
                this.drawOverlay();
            }
            // increment the time
            this._context.t += 0.01; // (new Date().getTime() - this.prev) / 1000
            this._lastUpdate = Date.now();
            setTimeout(() => this._scriptRunner(), this.getPauseAmount());
        }
        catch (e) {
            clearTimeout(this._scriptInterval);
            this._scriptInterval = undefined;
            this._context = undefined;
            throw new Error(`invalid script: ${e.message}`);
        }
    }
    // get the amount of time to pause until the next frame
    getPauseAmount() {
        const now = Date.now();
        const elapsed = now - this._lastUpdate;
        const pause = 1000 / this._fps - elapsed;
        return pause > 0 ? pause / 1000 : 0;
    }
    drawOverlay() {
        var ctx = this.getContext("2d");
        if (!ctx)
            return;
        // draw the sparkline chart
        var path = new Path2D();
        path.rect(this.x + 10, this.y - 15, 160, 25);
        ctx.fillStyle = "#fff";
        ctx.fill(path);
        ctx.strokeStyle = "#000";
        ctx.stroke(path);
        // draw the current fps value
        ctx.font = "10px arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.stack[this.stack.length - 1].toFixed(2) + '', this.x + 130, this.y + 1);
        // draw the sparkline chart
        var path = new Path2D();
        path.moveTo(this.x + 10, this.y + 10);
        if (this.stack.length >= this._fps)
            for (var i = 0; i < this.stack.length; i++) {
                path.lineTo(this.x + 10 + i * (100 / this.stack.length), 10 + this.y + (100 / this.stack.length) - this.stack[i] / 2);
            }
        ctx.strokeStyle = "blue";
        ctx.stroke(path);
    }
}
customElements.define("script-canvas", ScriptCanvas, {
    extends: "canvas",
});