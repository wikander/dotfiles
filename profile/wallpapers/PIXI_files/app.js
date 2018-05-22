var app =
webpackJsonp_name_([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(59);
	module.exports = __webpack_require__(61);


/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	var Logo = __webpack_require__(66),
	  renderer = new PIXI.WebGLRenderer(1000, 500, { // Or PIXI.autoDetectRenderer.
	    antialias: true
	  }),
	  stage = new PIXI.Container(),
	  backgroundImg = __webpack_require__(70),
	  wallImg = __webpack_require__(71),
	  Stickman = __webpack_require__(72);

	PIXI.loader
	  .add(Logo.logoImgSrc)
	  .add(backgroundImg)
	  .add(wallImg)
	  .add(Stickman.stickmanTextureAtlas)
	  .load(setup);

	function setup() {
	  var logoContainer,
	    background,
	    wall,
	    stickmanAnimation;

	  renderer.backgroundColor = 0xFFFFFF;
	  document.body.appendChild(renderer.view);

	  logoContainer = Logo.initContainer();
	  logoContainer = Logo.createLogo(10, 10);
	  logoContainer = Logo.createDot(990, 490);

	  background = new PIXI.Sprite(
	    PIXI.loader.resources[backgroundImg].texture
	  );

	  wall = new PIXI.Sprite(
	    PIXI.loader.resources[wallImg].texture
	  );
	  wall.position.x = 800;
	  wall.alpha = 0.3;

	  stickmanAnimation = Stickman.initAnimation(500, 500);

	  // Info
	  Logo.info();
	  Stickman.info();

	  stage.addChild(background);
	  stage.addChild(stickmanAnimation);
	  stage.addChild(wall);
	  //stage.addChild(logoContainer);

	  renderer.render(stage);

	  animate();
	}

	function animate() {
	  requestAnimationFrame(animate);

	  Stickman.move();
	  //Logo.logoAnimation();
	  //Logo.dotAnimationStep();

	  renderer.render(stage);
	}


/***/ },

/***/ 62:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	var Logo = (function() {
	  var logoImg = __webpack_require__(67),
	    Bezier = __webpack_require__(68),
	    logo,
	    logoContainer = new PIXI.Container(),
	    logoCenter = new PIXI.Point(100, 38.5),
	    dotFinalPosition = new PIXI.Point(172, 70),
	    dotRadius = 6.7,
	    dasProgress = 0,
	    lasProgress = 0,
	    dotAnimationPositions = [],
	    dot,
	    dotAnimationStarted = false,
	    logoAnimationStarted = false;

	  function info() {
	    console.table(dotAnimationPositions);
	  }

	  function initContainer() {
	    logoContainer.pivot.x = logoCenter.x;
	    logoContainer.pivot.y = logoCenter.y;

	    logoContainer.x = logoCenter.x;
	    logoContainer.y = logoCenter.y;

	    return logoContainer;
	  }

	  function createLogo(positionX, positionY) {
	    logo = new PIXI.Sprite(
	      PIXI.loader.resources[logoImg].texture
	    );
	    logo.position.x = positionX;
	    logo.position.y = positionY;

	    logoContainer.addChild(logo);
	    return logoContainer;
	  }

	  function createDot(positionX, positionY) {
	    dot = new PIXI.Graphics();
	    dot.beginFill(0x000000);

	    dot.position.x = positionX;
	    dot.position.y = positionY;

	    dotAnimationPositions = new Bezier(positionX, positionY, 0, 500, dotFinalPosition.x, dotFinalPosition.y).getLUT(50);

	    dot.drawCircle(0, 0, dotRadius);

	    dot.interactive = true;

	    dot.on('click', onDotClick);
	    dot.on('tap', onDotClick);

	    logoContainer.addChild(dot);
	    return logoContainer;
	  }

	  function onDotClick() {
	    if (!dotAnimationStarted) {
	      dotAnimationStarted = true;
	    } else if (!logoAnimationStarted) {
	      logoAnimationStarted = true;
	    }
	  }
	  
	  function dotAnimationStep() {
	    if (dotAnimationStarted && dasProgress < dotAnimationPositions.length - 1) {
	      dasProgress++;
	      dot.position.x = dotAnimationPositions[dasProgress].x;
	      dot.position.y = dotAnimationPositions[dasProgress].y;
	    }
	  }

	  function logoAnimation() {
	    if (logoAnimationStarted) {
	      var startPosition = new PIXI.Point(0, 0),
	        finalPosition = new PIXI.Point(500 - logoCenter.x, 250 - logoCenter.y),
	        numOfSteps = 100,
	        numOfStepsPercentage = 1 / numOfSteps,
	        deltaX = (finalPosition.x - startPosition.x) * numOfStepsPercentage,
	        deltaY = (finalPosition.y - startPosition.y) * numOfStepsPercentage;

	      if (lasProgress < numOfSteps) {

	        // Move
	        logoContainer.position.x += deltaX;
	        logoContainer.position.y += deltaY;

	        // Rotate
	        logoContainer.rotation += (2 * Math.PI) * numOfStepsPercentage;

	        // Scale
	        logoContainer.scale.x -= numOfStepsPercentage;
	        logoContainer.scale.y -= numOfStepsPercentage;

	        console.info('Logo animation progress ', lasProgress);
	        lasProgress++;
	      }
	    }
	  }

	  return {
	    // Functions
	    createLogo: createLogo,
	    createDot: createDot,
	    dotAnimationStep: dotAnimationStep,
	    info: info,
	    initContainer: initContainer,
	    logoAnimation: logoAnimation,

	    // Variables
	    logoImgSrc: logoImg
	  };
	})();

	module.exports = Logo;


/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "op-logo-black-no-dot.png"

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(69);

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	  A javascript Bezier curve library by Pomax.

	  Based on http://pomax.github.io/bezierinfo

	  This code is MIT licensed.
	**/
	(function() {
	  "use strict";

	  // Math functions. I hate the Math namespace with a passion.
	  var abs = Math.abs,
	      min = Math.min,
	      max = Math.max,
	      cos = Math.cos,
	      sin = Math.sin,
	      acos = Math.acos,
	      asin = Math.asin,
	      atan2 = Math.atan2,
	      sqrt = Math.sqrt,
	      // cube root function yielding real roots
	      crt = function(v) { if(v<0) return -Math.pow(-v,1/3); return Math.pow(v,1/3); },
	      pi = Math.PI,
	      tau = 2*pi,
	      quart = pi/2;

	  // a zero coordinate, which is surprisingly useful
	  var ZERO = {x:0,y:0,z:0};

	  // Bezier utility functions
	  var utils = {
	    // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
	    Tvalues: [
	      -0.0640568928626056260850430826247450385909,
	       0.0640568928626056260850430826247450385909,
	      -0.1911188674736163091586398207570696318404,
	       0.1911188674736163091586398207570696318404,
	      -0.3150426796961633743867932913198102407864,
	       0.3150426796961633743867932913198102407864,
	      -0.4337935076260451384870842319133497124524,
	       0.4337935076260451384870842319133497124524,
	      -0.5454214713888395356583756172183723700107,
	       0.5454214713888395356583756172183723700107,
	      -0.6480936519369755692524957869107476266696,
	       0.6480936519369755692524957869107476266696,
	      -0.7401241915785543642438281030999784255232,
	       0.7401241915785543642438281030999784255232,
	      -0.8200019859739029219539498726697452080761,
	       0.8200019859739029219539498726697452080761,
	      -0.8864155270044010342131543419821967550873,
	       0.8864155270044010342131543419821967550873,
	      -0.9382745520027327585236490017087214496548,
	       0.9382745520027327585236490017087214496548,
	      -0.9747285559713094981983919930081690617411,
	       0.9747285559713094981983919930081690617411,
	      -0.9951872199970213601799974097007368118745,
	       0.9951872199970213601799974097007368118745
	    ],

	    // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
	    Cvalues: [
	      0.1279381953467521569740561652246953718517,
	      0.1279381953467521569740561652246953718517,
	      0.1258374563468282961213753825111836887264,
	      0.1258374563468282961213753825111836887264,
	      0.1216704729278033912044631534762624256070,
	      0.1216704729278033912044631534762624256070,
	      0.1155056680537256013533444839067835598622,
	      0.1155056680537256013533444839067835598622,
	      0.1074442701159656347825773424466062227946,
	      0.1074442701159656347825773424466062227946,
	      0.0976186521041138882698806644642471544279,
	      0.0976186521041138882698806644642471544279,
	      0.0861901615319532759171852029837426671850,
	      0.0861901615319532759171852029837426671850,
	      0.0733464814110803057340336152531165181193,
	      0.0733464814110803057340336152531165181193,
	      0.0592985849154367807463677585001085845412,
	      0.0592985849154367807463677585001085845412,
	      0.0442774388174198061686027482113382288593,
	      0.0442774388174198061686027482113382288593,
	      0.0285313886289336631813078159518782864491,
	      0.0285313886289336631813078159518782864491,
	      0.0123412297999871995468056670700372915759,
	      0.0123412297999871995468056670700372915759
	    ],
	    arcfn: function(t, derivativeFn) {
	      var d = derivativeFn(t);
	      var l = d.x*d.x + d.y*d.y;
	      if(typeof d.z !== "undefined") {
	        l += d.z*d.z;
	      }
	      return sqrt(l);
	    },
	    length: function(derivativeFn) {
	      var z=0.5,sum=0,len=this.Tvalues.length,i,t;
	      for(i=0; i<len; i++) {
	        t = z * this.Tvalues[i] + z;
	        sum += this.Cvalues[i] * this.arcfn(t,derivativeFn);
	      }
	      return z * sum;
	    },
	    map: function(v, ds,de, ts,te) {
	      var d1 = de-ds, d2 = te-ts, v2 =  v-ds, r = v2/d1;
	      return ts + d2*r;
	    },
	    lerp: function(r, v1, v2) {
	      var ret = {
	        x: v1.x + r*(v2.x-v1.x),
	        y: v1.y + r*(v2.y-v1.y)
	      };
	      if(!!v1.z && !!v2.z) {
	        ret.z =  v1.z + r*(v2.z-v1.z);
	      }
	      return ret;
	    },
	    pointToString: function(p) {
	      var s = p.x+"/"+p.y;
	      if(typeof p.z !== "undefined") {
	        s += "/"+p.z;
	      }
	      return s;
	    },
	    pointsToString: function(points) {
	      return "[" + points.map(this.pointToString).join(", ") + "]";
	    },
	    copy: function(obj) {
	      return JSON.parse(JSON.stringify(obj));
	    },
	    angle: function(o,v1,v2) {
	      var dx1 = v1.x - o.x,
	          dy1 = v1.y - o.y,
	          dx2 = v2.x - o.x,
	          dy2 = v2.y - o.y,
	          cross = dx1*dy2 - dy1*dx2,
	          m1 = sqrt(dx1*dx1+dy1*dy1),
	          m2 = sqrt(dx2*dx2+dy2*dy2),
	          dot;
	      dx1/=m1; dy1/=m1; dx2/=m2; dy2/=m2;
	      dot = dx1*dx2 + dy1*dy2;
	      return atan2(cross, dot);
	    },
	    dist: function(p1, p2) {
	      var dx = p1.x - p2.x,
	          dy = p1.y - p2.y;
	      return sqrt(dx*dx+dy*dy);
	    },
	    lli8: function(x1,y1,x2,y2,x3,y3,x4,y4) {
	      var nx=(x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4),
	          ny=(x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4),
	          d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
	      if(d==0) { return false; }
	      return { x: nx/d, y: ny/d };
	    },
	    lli4: function(p1,p2,p3,p4) {
	      var x1 = p1.x, y1 = p1.y,
	          x2 = p2.x, y2 = p2.y,
	          x3 = p3.x, y3 = p3.y,
	          x4 = p4.x, y4 = p4.y;
	      return this.lli8(x1,y1,x2,y2,x3,y3,x4,y4);
	    },
	    lli: function(v1, v2) {
	      return this.lli4(v1,v1.c,v2,v2.c);
	    },
	    makeline: function(p1,p2) {
	      var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, dx = (x2-x1)/3, dy = (y2-y1)/3;
	      return new Bezier(x1, y1, x1+dx, y1+dy, x1+2*dx, y1+2*dy, x2, y2);
	    },
	    findbbox: function(sections) {
	      var mx=99999999,my=mx,MX=-mx,MY=MX;
	      sections.forEach(function(s) {
	        var bbox = s.bbox();
	        if(mx > bbox.x.min) mx = bbox.x.min;
	        if(my > bbox.y.min) my = bbox.y.min;
	        if(MX < bbox.x.max) MX = bbox.x.max;
	        if(MY < bbox.y.max) MY = bbox.y.max;
	      });
	      return {
	        x: { min: mx, mid:(mx+MX)/2, max: MX, size:MX-mx },
	        y: { min: my, mid:(my+MY)/2, max: MY, size:MY-my }
	      }
	    },
	    shapeintersections: function(s1, bbox1, s2, bbox2) {
	      if(!this.bboxoverlap(bbox1, bbox2)) return [];
	      var intersections = [];
	      var a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
	      var a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
	      a1.forEach(function(l1) {
	        if(l1.virtual) return;
	        a2.forEach(function(l2) {
	          if(l2.virtual) return;
	          var iss = l1.intersects(l2);
	          if(iss.length>0) {
	            iss.c1 = l1;
	            iss.c2 = l2;
	            iss.s1 = s1;
	            iss.s2 = s2;
	            intersections.push(iss);
	          }
	        });
	      });
	      return intersections;
	    },
	    makeshape: function(forward, back) {
	      var bpl = back.points.length;
	      var fpl = forward.points.length;
	      var start  = this.makeline(back.points[bpl-1], forward.points[0]);
	      var end    = this.makeline(forward.points[fpl-1], back.points[0]);
	      var shape  = {
	        startcap: start,
	        forward: forward,
	        back: back,
	        endcap: end,
	        bbox: this.findbbox([start, forward, back, end])
	      };
	      var self = this;
	      shape.intersections = function(s2) {
	        return self.shapeintersections(shape,shape.bbox,s2,s2.bbox);
	      };
	      return shape;
	    },
	    getminmax: function(curve, d, list) {
	      if(!list) return { min:0, max:0 };
	      var min=0xFFFFFFFFFFFFFFFF, max=-min,t,c;
	      if(list.indexOf(0)===-1) { list = [0].concat(list); }
	      if(list.indexOf(1)===-1) { list.push(1); }
	      for(var i=0,len=list.length; i<len; i++) {
	        t = list[i];
	        c = curve.get(t);
	        if(c[d] < min) { min = c[d]; }
	        if(c[d] > max) { max = c[d]; }
	      }
	      return { min:min, mid:(min+max)/2, max:max, size:max-min };
	    },
	    align: function(points, line) {
	      var tx = line.p1.x,
	          ty = line.p1.y,
	          a = -atan2(line.p2.y-ty, line.p2.x-tx),
	          d = function(v) {
	            return {
	              x: (v.x-tx)*cos(a) - (v.y-ty)*sin(a),
	              y: (v.x-tx)*sin(a) + (v.y-ty)*cos(a)
	            };
	          };
	      return points.map(d);
	    },
	    roots: function(points, line) {
	      line = line || {p1:{x:0,y:0},p2:{x:1,y:0}};
	      var order = points.length - 1;
	      var p = this.align(points, line);
	      var reduce = function(t) { return 0<=t && t <=1; };

	      if (order === 2) {
	        var a = p[0].y,
	            b = p[1].y,
	            c = p[2].y,
	            d = a - 2*b + c;
	        if(d!==0) {
	          var m1 = -sqrt(b*b-a*c),
	              m2 = -a+b,
	              v1 = -( m1+m2)/d,
	              v2 = -(-m1+m2)/d;
	          return [v1, v2].filter(reduce);
	        }
	        else if(b!==c && d===0) {
	          return [ (2*b-c)/2*(b-c) ].filter(reduce);
	        }
	        return [];
	      }

	      // see http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm
	      var pa = p[0].y,
	          pb = p[1].y,
	          pc = p[2].y,
	          pd = p[3].y,
	          d = (-pa + 3*pb - 3*pc + pd),
	          a = (3*pa - 6*pb + 3*pc) / d,
	          b = (-3*pa + 3*pb) / d,
	          c = pa / d,
	          p = (3*b - a*a)/3,
	          p3 = p/3,
	          q = (2*a*a*a - 9*a*b + 27*c)/27,
	          q2 = q/2,
	          discriminant = q2*q2 + p3*p3*p3,
	          u1,v1,x1,x2,x3;
	       if (discriminant < 0) {
	        var mp3 = -p/3,
	            mp33 = mp3*mp3*mp3,
	            r = sqrt( mp33 ),
	            t = -q/(2*r),
	            cosphi = t<-1 ? -1 : t>1 ? 1 : t,
	            phi = acos(cosphi),
	            crtr = crt(r),
	            t1 = 2*crtr;
	        x1 = t1 * cos(phi/3) - a/3;
	        x2 = t1 * cos((phi+tau)/3) - a/3;
	        x3 = t1 * cos((phi+2*tau)/3) - a/3;
	        return [x1, x2, x3].filter(reduce);
	      } else if(discriminant === 0) {
	        u1 = q2 < 0 ? crt(-q2) : -crt(q2);
	        x1 = 2*u1-a/3;
	        x2 = -u1 - a/3;
	        return [x1,x2].filter(reduce);
	      } else {
	        var sd = sqrt(discriminant);
	        u1 = crt(-q2+sd);
	        v1 = crt(q2+sd);
	        return [u1-v1-a/3].filter(reduce);;
	      }
	    },
	    droots: function(p) {
	      // quadratic roots are easy
	      if(p.length === 3) {
	        var a = p[0],
	            b = p[1],
	            c = p[2],
	            d = a - 2*b + c;
	        if(d!==0) {
	          var m1 = -sqrt(b*b-a*c),
	              m2 = -a+b,
	              v1 = -( m1+m2)/d,
	              v2 = -(-m1+m2)/d;
	          return [v1, v2];
	        }
	        else if(b!==c && d===0) {
	          return [ (2*b-c)/(2*(b-c)) ];
	        }
	        return [];
	      }

	      // linear roots are even easier
	      if(p.length === 2) {
	        var a = p[0], b = p[1];
	        if(a!==b) { return [a/(a-b)]; }
	        return [];
	      }
	    },
	    bboxoverlap: function(b1,b2) {
	      var dims=['x','y'],len=dims.length,i,dim,l,t,d
	      for(i=0; i<len; i++) {
	        dim = dims[i];
	        l = b1[dim].mid;
	        t = b2[dim].mid;
	        d = (b1[dim].size + b2[dim].size)/2;
	        if(abs(l-t) >= d) return false;
	      }
	      return true;
	    },
	    expandbox: function(bbox, _bbox) {
	      if(_bbox.x.min < bbox.x.min) { bbox.x.min = _bbox.x.min; }
	      if(_bbox.y.min < bbox.y.min) { bbox.y.min = _bbox.y.min; }
	      if(_bbox.z && _bbox.z.min < bbox.z.min) { bbox.z.min = _bbox.z.min; }
	      if(_bbox.x.max > bbox.x.max) { bbox.x.max = _bbox.x.max; }
	      if(_bbox.y.max > bbox.y.max) { bbox.y.max = _bbox.y.max; }
	      if(_bbox.z && _bbox.z.max > bbox.z.max) { bbox.z.max = _bbox.z.max; }
	      bbox.x.mid = (bbox.x.min + bbox.x.max)/2;
	      bbox.y.mid = (bbox.y.min + bbox.y.max)/2;
	      if(bbox.z) { bbox.z.mid = (bbox.z.min + bbox.z.max)/2; }
	      bbox.x.size = bbox.x.max - bbox.x.min;
	      bbox.y.size = bbox.y.max - bbox.y.min;
	      if(bbox.z) { bbox.z.size = bbox.z.max - bbox.z.min; }
	    },
	    pairiteration: function(c1,c2) {
	      var c1b = c1.bbox(),
	          c2b = c2.bbox(),
	          r = 100000,
	          threshold = 0.5;
	      if(c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
	        return [ ((r * (c1._t1+c1._t2)/2)|0)/r + "/" + ((r * (c2._t1+c2._t2)/2)|0)/r ];
	      }
	      var cc1 = c1.split(0.5),
	          cc2 = c2.split(0.5),
	          pairs = [
	            {left: cc1.left, right: cc2.left },
	            {left: cc1.left, right: cc2.right },
	            {left: cc1.right, right: cc2.right },
	            {left: cc1.right, right: cc2.left }];
	      pairs = pairs.filter(function(pair) {
	        return utils.bboxoverlap(pair.left.bbox(),pair.right.bbox());
	      });
	      var results = [];
	      if(pairs.length === 0) return results;
	      pairs.forEach(function(pair) {
	        results = results.concat(
	          utils.pairiteration(pair.left, pair.right)
	        );
	      })
	      results = results.filter(function(v,i) {
	        return results.indexOf(v) === i;
	      });
	      return results;
	    },
	    getccenter: function(p1,p2,p3) {
	      var dx1 = (p2.x - p1.x),
	          dy1 = (p2.y - p1.y),
	          dx2 = (p3.x - p2.x),
	          dy2 = (p3.y - p2.y);
	      var dx1p = dx1 * cos(quart) - dy1 * sin(quart),
	          dy1p = dx1 * sin(quart) + dy1 * cos(quart),
	          dx2p = dx2 * cos(quart) - dy2 * sin(quart),
	          dy2p = dx2 * sin(quart) + dy2 * cos(quart);
	      // chord midpoints
	      var mx1 = (p1.x + p2.x)/2,
	          my1 = (p1.y + p2.y)/2,
	          mx2 = (p2.x + p3.x)/2,
	          my2 = (p2.y + p3.y)/2;
	      // midpoint offsets
	      var mx1n = mx1 + dx1p,
	          my1n = my1 + dy1p,
	          mx2n = mx2 + dx2p,
	          my2n = my2 + dy2p;
	      // intersection of these lines:
	      var arc = utils.lli8(mx1,my1,mx1n,my1n, mx2,my2,mx2n,my2n),
	          r = utils.dist(arc,p1),
	          // arc start/end values, over mid point:
	          s = atan2(p1.y - arc.y, p1.x - arc.x),
	          m = atan2(p2.y - arc.y, p2.x - arc.x),
	          e = atan2(p3.y - arc.y, p3.x - arc.x),
	          _;
	      // determine arc direction (cw/ccw correction)
	      if (s<e) {
	        // if s<m<e, arc(s, e)
	        // if m<s<e, arc(e, s + tau)
	        // if s<e<m, arc(e, s + tau)
	        if (s>m || m>e) { s += tau; }
	        if (s>e) { _=e; e=s; s=_; }
	      } else {
	        // if e<m<s, arc(e, s)
	        // if m<e<s, arc(s, e + tau)
	        // if e<s<m, arc(s, e + tau)
	        if (e<m && m<s) { _=e; e=s; s=_; } else { e += tau; }
	      }
	      // assign and done.
	      arc.s = s;
	      arc.e = e;
	      arc.r = r;
	      return arc;
	    }
	  };

	  /**
	   * Poly Bezier
	   * @param {[type]} curves [description]
	   */
	  var PolyBezier = function(curves) {
	    this.curves = [];
	    this._3d = false;
	    if(!!curves) {
	      this.curves = curves;
	      this._3d = this.curves[0]._3d;
	    }
	  }

	  PolyBezier.prototype = {
	    valueOf: function() {
	      return this.toString();
	    },
	    toString: function() {
	      return utils.pointsToString(this.points);
	    },
	    addCurve: function(curve) {
	      this.curves.push(curve);
	      this._3d = this._3d || curve._3d;
	    },
	    length: function() {
	      return this.curves.map(function(v) { return v.length(); }).reduce(function(a,b) { return a+b; });
	    },
	    curve: function(idx) {
	      return this.curves[idx];
	    },
	    bbox: function() {
	      var c = this.curves;
	      var bbox = c[0].bbox();
	      for(var i=1; i<c.length; i++) {
	        utils.expandbox(bbox, c[i].bbox());
	      }
	      return bbox;
	    },
	    offset: function(d) {
	      var offset = [];
	      this.curves.forEach(function(v) {
	        offset = offset.concat(v.offset(d));
	      });
	      return new PolyBezier(offset);
	    }
	  };


	  /**
	   * Bezier curve constructor. The constructor argument can be one of three things:
	   *
	   * 1. array/4 of {x:..., y:..., z:...}, z optional
	   * 2. numerical array/8 ordered x1,y1,x2,y2,x3,y3,x4,y4
	   * 3. numerical array/12 ordered x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4
	   *
	   */
	  var Bezier = function(coords) {
	    var args = (coords && coords.forEach ? coords : arguments);
	    if(typeof args[0] === "object") {
	      args = [];
	      for(var i=0; i<coords.length; i++) {
	        ['x','y','z'].forEach(function(d) {
	          if(typeof coords[i][d] !== "undefined") {
	            args.push(coords[i][d]);
	          }
	        });
	      }
	    }
	    var len = args.length;
	    if(len!==6 && len!==8 && len!==9 && len!==12) {
	      console.log(coords);
	      throw new Error("This Bezier curve library only supports quadratic and cubic curves (in 2d and 3d)");
	    }
	    var _3d = (len === 9 || len === 12);
	    this._3d = _3d;
	    var points = [];
	    for(var idx=0, step=(_3d ? 3 : 2); idx<len; idx+=step) {
	      var point = {
	        x: args[idx],
	        y: args[idx+1]
	      };
	      if(_3d) { point.z = args[idx+2] };
	      points.push(point);
	    }
	    this.order = points.length - 1;
	    this.points = points;
	    var dims = ['x','y'];
	    if(_3d) dims.push('z');
	    this.dims = dims;
	    this.dimlen = dims.length;
	    (function(curve) {
	      var a = utils.align(points, {p1:points[0], p2:points[curve.order]});
	      for(var i=0; i<a.length; i++) {
	        if(abs(a[i].y) > 0.0001) {
	          curve._linear = false;
	          return;
	        }
	      }
	      curve._linear = true;
	    }(this));
	    this._t1 = 0;
	    this._t2 = 1;
	    this.update();
	  };

	  Bezier.fromSVG = function(svgString) {
	    var list = svgString.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g).map(parseFloat);
	    var relative = /[cq]/.test(svgString);
	    if(!relative) return new Bezier(list);
	    list = list.map(function(v,i) {
	      return i < 2 ? v : v + list[i % 2];
	    });
	    return new Bezier(list);
	  };

	  Bezier.utils = utils;

	  Bezier.prototype = {
	    valueOf: function() {
	      return this.toString();
	    },
	    toString: function() {
	      return utils.pointsToString(this.points);
	    },
	    toSVG: function(relative) {
	      if(this._3d) return false;
	      var p = this.points,
	          x = p[0].x,
	          y = p[0].y,
	          s = ["M", x, y, (this.order===2 ? "Q":"C")];
	      for(var i=1, last=p.length; i<last; i++) {
	        s.push(p[i].x);
	        s.push(p[i].y);
	      }
	      return s.join(" ");
	    },
	    update: function() {
	      // one-time compute derivative coordinates
	      this.dpoints = [];
	      for(var p=this.points, d=p.length, c=d-1; d>1; d--, c--) {
	        var list = [];
	        for(var j=0, dpt; j<c; j++) {
	          dpt = {
	            x: c * (p[j+1].x - p[j].x),
	            y: c * (p[j+1].y - p[j].y)
	          };
	          if(this._3d) {
	            dpt.z = c * (p[j+1].z - p[j].z);
	          }
	          list.push(dpt);
	        }
	        this.dpoints.push(list);
	        p = list;
	      };
	      this.computedirection();
	    },
	    computedirection: function() {
	      var points = this.points;
	      var angle = utils.angle(points[0], points[this.order], points[1]);
	      this.clockwise = angle > 0;
	    },
	    length: function() {
	      return utils.length(this.derivative.bind(this));
	    },
	    getLUT: function(steps) {
	      steps = steps || 100;
	      var points = [];
	      for(var t=0; t<=steps; t++) {
	        points.push(this.compute(t/steps));
	      }
	      return points;
	    },
	    get: function(t) {
	      return this.compute(t);
	    },
	    point: function(idx) {
	      return this.points[idx];
	    },
	    compute: function(t) {
	      // shortcuts
	      if(t===0) { return this.points[0]; }
	      if(t===1) { return this.points[this.order]; }
	      // plain computation
	      var mt = 1-t,
	          mt2 = mt*mt,
	          t2 = t*t,
	          a,b,c,d = 0,
	          p = this.points;
	      if(this.order===2) {
	        p = [p[0], p[1], p[2], ZERO];
	        a = mt2;
	        b = mt*t*2;
	        c = t2;
	      }
	      if(this.order===3) {
	        a = mt2*mt;
	        b = mt2*t*3;
	        c = mt*t2*3;
	        d = t*t2;
	      }
	      var ret = {
	        x: a*p[0].x + b*p[1].x + c*p[2].x + d*p[3].x,
	        y: a*p[0].y + b*p[1].y + c*p[2].y + d*p[3].y
	      };
	      if(this._3d) {
	        ret.z = a*p[0].z + b*p[1].z + c*p[2].z + d*p[3].z;
	      }
	      return ret;
	    },
	    raise: function() {
	      var p = this.points, np = [p[0]], i, k=p.length, pi, pim;
	      for (var i=1; i<k; i++) {
	        pi = p[i];
	        pim = p[i-1];
	        np[i] = {
	          x: (k-i)/k * pi.x + i/k * pim.x,
	          y: (k-i)/k * pi.y + i/k * pim.y
	        };
	      }
	      np[k] = p[k-1];
	      return new Bezier(np);
	    },
	    derivative: function(t) {
	      var mt = 1-t,
	          a,b,c=0,
	          p = this.dpoints[0];
	      if(this.order===2) { p = [p[0], p[1], ZERO]; a = mt; b = t; }
	      if(this.order===3) { a = mt*mt; b = mt*t*2; c = t*t; }
	      var ret = {
	        x: a*p[0].x + b*p[1].x + c*p[2].x,
	        y: a*p[0].y + b*p[1].y + c*p[2].y
	      };
	      if(this._3d) {
	        ret.z = a*p[0].z + b*p[1].z + c*p[2].z;
	      }
	      return ret;
	    },
	    normal: function(t) {
	      return this._3d ? this.__normal3(t) : this.__normal2(t);
	    },
	    __normal2: function(t) {
	      var d = this.derivative(t);
	      var q = sqrt(d.x*d.x + d.y*d.y)
	      return { x: -d.y/q, y: d.x/q };
	    },
	    __normal3: function() {
	      // see http://stackoverflow.com/questions/25453159
	      var r1 = this.derivative(t),
	          r2 = this.derivative(t+0.01),
	          q1 = sqrt(r1.x*r1.x + r1.y*r1.y + r1.z*r1.z),
	          q2 = sqrt(r2.x*r2.x + r2.y*r2.y + r2.z*r2.z);
	      r1.x /= q1; r1.y /= q1; r1.z /= q1;
	      r2.x /= q2; r2.y /= q2; r2.z /= q2;
	      // cross product
	      var c = {
	        x: r2.y*r1.z - r2.z*r1.y,
	        y: r2.z*r1.x - r2.x*r1.z,
	        z: r2.x*r1.y - r2.y*r1.x
	      };
	      var m = sqrt(c.x*c.x + c.y*c.y + c.z*c.z);
	      c.x /= m; c.y /= m; c.z /= m;
	      // rotation matrix
	      var R = [   c.x*c.x,   c.x*c.y-c.z, c.x*c.z+c.y,
	                c.x*c.y+c.z,   c.y*c.y,   c.y*c.z-c.x,
	                c.x*c.z-c.y, c.y*c.z+c.x,   c.z*c.z    ];
	      // normal vector:
	      var n = {
	        x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
	        y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
	        z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
	      };
	      return n;
	    },
	    split: function(t1, t2) {
	      // shortcuts
	      if(t1===0 && !!t2) { return this.split(t2).left; }
	      if(t2===1) { return this.split(t1).right; }
	      // no shortcut: use "de Casteljau" iteration.
	      var p = this.points,
	          _p = [],
	          pt,
	          q = [],
	          idx = 0,
	          i=0,
	          l=0;
	      q[idx++] = p[0];
	      q[idx++] = p[1];
	      q[idx++] = p[2];
	      if(this.order === 3) { q[idx++] = p[3]; }
	      // we lerp between all points at each iteration, until we have 1 point left.
	      while(p.length>1) {
	        _p = [];
	        for(i=0, l=p.length-1; i<l; i++) {
	          pt = utils.lerp(t1,p[i],p[i+1]);
	          q[idx++] = pt;
	          _p.push(pt);
	        }
	        p = _p;
	      }
	      var result = {
	        left: this.order === 2 ? new Bezier([q[0],q[3],q[5]]) : new Bezier([q[0],q[4],q[7],q[9]]),
	        right: this.order === 2 ? new Bezier([q[5],q[4],q[2]]) : new Bezier([q[9],q[8],q[6],q[3]]),
	        span: q
	      };

	      // make sure we bind _t1/_t2 information!
	      result.left._t1  = utils.map(0,  0,1, this._t1,this._t2);
	      result.left._t2  = utils.map(t1, 0,1, this._t1,this._t2);
	      result.right._t1 = utils.map(t1, 0,1, this._t1,this._t2);
	      result.right._t2 = utils.map(1,  0,1, this._t1,this._t2);

	      // if we have no t2, we're done
	      if(!t2) { return result; }

	      // if we have a t2, split again:
	      t2 = utils.map(t2,t1,1,0,1);
	      var subsplit = result.right.split(t2);
	      return subsplit.left;
	    },
	    inflections: function() {
	      var dims = this.dims,
	          len = this.dimlen,
	          result={},
	          roots=[],
	          p, mfn;
	      dims.forEach(function(dim) {
	        mfn = function(v) { return v[dim]; };
	        p = this.dpoints[0].map(mfn);
	        result[dim] = utils.droots(p);
	        if(this.order === 3) {
	          p = this.dpoints[1].map(mfn);
	          result[dim] = result[dim].concat(utils.droots(p));
	        }
	        result[dim] = result[dim].filter(function(t) { return (t>=0 && t<=1); });
	        roots = roots.concat(result[dim].sort());
	      }.bind(this));
	      roots.sort();
	      result.values = roots;
	      return result;
	    },
	    bbox: function() {
	      var inflections = this.inflections(), result = {};
	      this.dims.forEach(function(d) {
	        result[d] = utils.getminmax(this, d, inflections[d]);
	      }.bind(this));
	      return result;
	    },
	    overlaps: function(curve) {
	      var lbbox = this.bbox(),
	          tbbox = curve.bbox();
	      return utils.bboxoverlap(lbbox,tbbox);
	    },
	    offset: function(t, d) {
	      if(typeof d !== "undefined") {
	        var c = this.get(t);
	        var n = this.normal(t);
	        var ret = {
	          c: c,
	          n: n,
	          x: c.x + n.x * d,
	          y: c.y + n.y * d
	        };
	        if(this._3d) {
	          ret.z = c.z + n.z * d;
	        };
	        return ret;
	      }
	      if(this._linear) {
	        var nv = this.normal(0);
	        var coords = this.points.map(function(p) {
	          var ret = {
	            x: p.x + t * nv.x,
	            y: p.y + t * nv.y
	          };
	          if(p.z && n.z) { ret.z = p.z + t * nv.z; }
	          return ret;
	        });
	        return [new Bezier(coords)];
	      }
	      var reduced = this.reduce();
	      return reduced.map(function(s) {
	        return s.scale(t);
	      });
	    },
	    simple: function() {
	      if(this.order===3) {
	        var a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
	        var a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
	        if(a1>0 && a2<0 || a1<0 && a2>0) return false;
	      }
	      var n1 = this.normal(0);
	      var n2 = this.normal(1);
	      var s = n1.x*n2.x + n1.y*n2.y;
	      if(this._3d) { s += n1.z*n2.z; }
	      var angle = abs(acos(s));
	      return angle < pi/3;
	    },
	    reduce: function() {
	      var i, t1=0, t2=0, step=0.01, segment, pass1=[], pass2=[];
	      // first pass: split on inflections
	      var inflections = this.inflections().values;
	      if(inflections.indexOf(0)===-1) { inflections = [0].concat(inflections); }
	      if(inflections.indexOf(1)===-1) { inflections.push(1); }
	      for(t1=inflections[0], i=1; i<inflections.length; i++) {
	        t2 = inflections[i];
	        segment = this.split(t1,t2);
	        segment._t1 = t1;
	        segment._t2 = t2;
	        pass1.push(segment);
	        t1 = t2;
	      }
	      // second pass: further reduce these segments to simple segments
	      pass1.forEach(function(p1) {
	        t1=0;
	        t2=0;
	        while(t2 <= 1) {
	          for(t2=t1+step; t2<=1+step; t2+=step) {
	            segment = p1.split(t1,t2);
	            if(!segment.simple()) {
	              t2 -= step;
	              if(abs(t1-t2)<step) {
	                // we can never form a reduction
	                return [];
	              }
	              segment = p1.split(t1,t2);
	              segment._t1 = utils.map(t1,0,1,p1._t1,p1._t2);
	              segment._t2 = utils.map(t2,0,1,p1._t1,p1._t2);
	              pass2.push(segment);
	              t1 = t2;
	              break;
	            }
	          }
	        }
	        if(t1<1) {
	          segment = p1.split(t1,1);
	          segment._t1 = utils.map(t1,0,1,p1._t1,p1._t2);
	          segment._t2 = p1._t2;
	          pass2.push(segment);
	        }
	      });
	      return pass2;
	    },
	    scale: function(d) {
	      var order = this.order;
	      var distanceFn = false
	      if(typeof d === "function") { distanceFn = d; }
	      if(distanceFn && order === 2) { return this.raise().scale(distanceFn); }

	      // TODO: add special handling for degenerate (=linear) curves.
	      var clockwise = this.clockwise;
	      var r1 = distanceFn ? distanceFn(0) : d;
	      var r2 = distanceFn ? distanceFn(1) : d;
	      var v = [ this.offset(0,10), this.offset(1,10) ];
	      var o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
	      if(!o) { throw "cannot scale this curve. Try reducing it first."; }
	      // move all points by distance 'd' wrt the origin 'o'
	      var points=this.points, np=[];

	      // move end points by fixed distance along normal.
	      [0,1].forEach(function(t) {
	        var p = np[t*order] = utils.copy(points[t*order]);
	        p.x += (t?r2:r1) * v[t].n.x;
	        p.y += (t?r2:r1) * v[t].n.y;
	      }.bind(this));

	      if (!distanceFn) {
	        // move control points to lie on the intersection of the offset
	        // derivative vector, and the origin-through-control vector
	        [0,1].forEach(function(t) {
	          if(this.order===2 && !!t) return;
	          var p = np[t*order];
	          var d = this.derivative(t);
	          var p2 = { x: p.x + d.x, y: p.y + d.y };
	          np[t+1] = utils.lli4(p, p2, o, points[t+1]);
	        }.bind(this));
	        return new Bezier(np);
	      }

	      // move control points by "however much necessary to
	      // ensure the correct tangent to endpoint".
	      [0,1].forEach(function(t) {
	        if(this.order===2 && !!t) return;
	        var p = points[t+1];
	        var ov = {
	          x: p.x - o.x,
	          y: p.y - o.y
	        };
	        var rc = distanceFn ? distanceFn((t+1)/order) : d;
	        if(distanceFn && !clockwise) rc = -rc;
	        var m = sqrt(ov.x*ov.x + ov.y*ov.y);
	        ov.x /= m;
	        ov.y /= m;
	        np[t+1] = {
	          x: p.x + rc*ov.x,
	          y: p.y + rc*ov.y
	        }
	      }.bind(this));
	      return new Bezier(np);
	    },
	    outline: function(d1, d2, d3, d4) {
	      d2 = (typeof d2 === "undefined") ? d1 : d2;
	      var reduced = this.reduce(),
	          len = reduced.length,
	          order = this.order,
	          fcurves = [],
	          bcurves = [],
	          i, p, last,
	          alen = 0,
	          tlen = this.length();

	      var graduated = (typeof d3 !== "undefined" && typeof d4 !== "undefined");

	      function linearDistanceFunction(s,e, tlen,alen,slen) {
	        return function (v) {
	          var f1 = alen/tlen, f2 = (alen+slen)/tlen, d = e-s;
	          return utils.map(v, 0,1, s+f1*d, s+f2*d);
	        };
	      };

	      // form curve oulines
	      reduced.forEach(function(segment) {
	        slen = segment.length();
	        if (graduated) {
	          fcurves.push(segment.scale(  linearDistanceFunction( d1, d3, tlen,alen,slen)  ));
	          bcurves.push(segment.scale(  linearDistanceFunction(-d2,-d4, tlen,alen,slen)  ));
	        } else {
	          fcurves.push(segment.scale( d1));
	          bcurves.push(segment.scale(-d2));
	        }
	        alen += slen;
	      });

	      // reverse the "return" outline
	      bcurves = bcurves.map(function(s) {
	        p = s.points;
	        if(p[3]) { s.points = [p[3],p[2],p[1],p[0]]; }
	        else { s.points = [p[2],p[1],p[0]]; }
	        return s;
	      }).reverse();

	      // form the endcaps as lines
	      var fs = fcurves[0].points[0],
	          fe = fcurves[len-1].points[fcurves[len-1].points.length-1],
	          bs = bcurves[len-1].points[bcurves[len-1].points.length-1],
	          be = bcurves[0].points[0],
	          ls = utils.makeline(bs,fs),
	          le = utils.makeline(fe,be),
	          segments = [ls].concat(fcurves).concat([le]).concat(bcurves),
	          slen = segments.length;

	      return new PolyBezier(segments);
	    },
	    outlineshapes: function(d1,d2) {
	      d2 = d2 || d1;
	      var outline = this.outline(d1,d2).curves;
	      var shapes = [];
	      for(var i=1, len=outline.length; i < len/2; i++) {
	        var shape = utils.makeshape(outline[i], outline[len-i]);
	        shape.startcap.virtual = (i > 1);
	        shape.endcap.virtual = (i < len/2-1);
	        shapes.push(shape);
	      }
	      return shapes;
	    },
	    intersects: function(curve) {
	      if(!curve) return this.selfintersects();
	      if(curve.p1 && curve.p2) {
	        return this.lineIntersects(curve);
	      }
	      if(curve instanceof Bezier) { curve = curve.reduce(); }
	      return this.curveintersects(this.reduce(), curve);
	    },
	    lineIntersects: function(line) {
	      var mx = min(line.p1.x, line.p2.x),
	          my = min(line.p1.y, line.p2.y),
	          MX = max(line.p1.x, line.p2.x),
	          MY = max(line.p1.y, line.p2.y),
	          self=this;
	      return utils.roots(this.points, line).filter(function(t) {
	        var p = self.get(t);
	        return (mx <= p.x && p.x <= MX && my <= p.y && p.y <= MY);
	      });
	    },
	    selfintersects: function() {
	      var reduced = this.reduce();
	      // "simple" curves cannot intersect with their direct
	      // neighbour, so for each segment X we check whether
	      // it intersects [0:x-2][x+2:last].
	      var i,len=reduced.length-2,results=[],result,left,right;
	      for(i=0; i<len; i++) {
	        left = reduced.slice(i,i+1);
	        right = reduced.slice(i+2);
	        result = this.curveintersects(left, right);
	        results = results.concat( result );
	      }
	      return results;
	    },
	    curveintersects: function(c1,c2) {
	      var pairs = [];
	      // step 1: pair off any overlapping segments
	      c1.forEach(function(l) {
	        c2.forEach(function(r) {
	          if(l.overlaps(r)) {
	            pairs.push({ left: l, right: r });
	          }
	        });
	      });
	      // step 2: for each pairing, run through the convergence algorithm.
	      var intersections = [];
	      pairs.forEach(function(pair) {
	        var result = utils.pairiteration(pair.left, pair.right);
	        if(result.length > 0) {
	          intersections = intersections.concat(result);
	        }
	      });
	      return intersections;
	    },
	    arcs: function(errorThreshold) {
	      errorThreshold = errorThreshold || 0.5;
	      var circles = [];
	      return this._iterate(errorThreshold, circles);
	    },
	    _error: function(pc, np1, s, e) {
	      var q = (e - s) / 4,
	          c1 = this.get(s + q),
	          c2 = this.get(e - q),
	          ref = utils.dist(pc, np1),
	          d1  = utils.dist(pc, c1),
	          d2  = utils.dist(pc, c2);
	      return abs(d1-ref) + abs(d2-ref);
	    },
	    _iterate: function(errorThreshold, circles) {
	      var s = 0, e = 1, safety;
	      // we do a binary search to find the "good `t` closest to no-longer-good"
	      do {
	        safety=0;

	        // step 1: start with the maximum possible arc
	        e = 1;

	        // points:
	        var np1 = this.get(s), np2, o_np2, np3, o_np3, arc, prev_arc;

	        // booleans:
	        var curr_good = false, prev_good = false, done;

	        // numbers:
	        var m = e, prev_e = 1, step = 0;

	        // step 2: find the best possible arc
	        do {
	          prev_good = curr_good;
	          prev_arc = arc;
	          m = (s + e)/2;
	          step++;

	          np2 = this.get(m);
	          np3 = this.get(e);

	          arc = utils.getccenter(np1, np2, np3);
	          var error = this._error(arc, np1, s, e);
	          curr_good = (error <= errorThreshold);

	          done = prev_good && !curr_good;
	          if(!done) prev_e = e;

	          // this arc is fine: we can move 'e' up to see if we can find a wider arc
	          if(curr_good) {
	            // if e is already at max, then we're done for this arc.
	            if (e >= 1) {
	              prev_e = 1;
	              prev_arc = arc;
	              break;
	            }
	            // if not, move it up by half the iteration distance
	            e = e + (e-s)/2;
	          }

	          // this is a bad arc: we need to move 'e' down to find a good arc
	          else {
	            e = m;
	          }
	        }
	        while(!done && safety++<100);

	        if(safety>=100) {
	          console.error("arc abstraction somehow failed...");
	          break;
	        }

	        // console.log("[F] arc found", s, prev_e, prev_arc.x, prev_arc.y, prev_arc.s, prev_arc.e);

	        prev_arc = (prev_arc ? prev_arc : arc);
	        circles.push(prev_arc);
	        s = prev_e;
	      }
	      while(e < 1);
	      return circles;
	    }
	  };


	  if(typeof module !== "undefined" && module.exports) {
	    module.exports = Bezier;
	  }

	  else if(true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return Bezier; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }

	  else if(typeof window !== "undefined") {
	    window.Bezier = Bezier;
	  }

	}());


/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "background.png"

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "wall.png"

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	var Stickman = (function() {
	  var stickmanTextureAtlas = __webpack_require__(73),
	    stickmanImg = __webpack_require__(74),
	    stickmanAnimation,
	    stickmanRightTextures = [],
	    stickmanLeftTextures = [],
	    stickmanStillTexture = [],
	    speed = 0,
	    animationSpeed = 0.25,
	    Mousetrap = __webpack_require__(75);

	  function info() {
	    console.info('Stickman animation with speed and textures', speed, stickmanAnimation.textures);
	  }

	  function initAnimation(xPos, yPos) {
	    speed = 0;
	    animationSpeed = 0.30;
	    var loadedStickmanTextures = PIXI.loader.resources[stickmanTextureAtlas].textures;

	    for (var i = 3; i <= 13; i++) {
	      stickmanRightTextures.push(
	        loadedStickmanTextures[i + '_right.png']
	      );
	    }

	    for (i = 3; i <= 13; i++) {
	      stickmanLeftTextures.push(
	        loadedStickmanTextures[i + '_left.png']
	      );
	    }

	    stickmanStillTexture.push(loadedStickmanTextures['1_right.png']);

	    stickmanAnimation = new PIXI.extras.MovieClip(stickmanStillTexture);

	    stickmanAnimation.position.x = xPos;
	    stickmanAnimation.position.y = yPos;

	    stickmanAnimation.anchor.y = 1;
	    stickmanAnimation.anchor.x = 0.5;

	    stickmanAnimation.animationSpeed = animationSpeed;

	    stickmanAnimation.interactive = true;

	    // Keyboard and mouse events
	    Mousetrap.bind('right', Stickman.goRight);
	    Mousetrap.bind('left', Stickman.goLeft);
	    Mousetrap.bind('up', Stickman.stop);
	    Mousetrap.bind('s', Stickman.increaseSpeed);
	    Mousetrap.bind('alt+s', Stickman.decreaseSpeed);
	    stickmanAnimation.on('click', onAnimationClick);
	    stickmanAnimation.on('tap', onAnimationClick);

	    return stickmanAnimation;
	  }

	  function onAnimationClick() {
	    if (speed === 0) {
	      goRight();
	    } else if (speed > 0) {
	      goLeft();
	    } else if (speed < 0) {
	      goRight();
	    }
	  }

	  function startGoRightAnimation() {
	    stickmanAnimation.textures = stickmanRightTextures;
	    startAnimation();
	  }

	  function startGoLeftAnimation() {
	    stickmanAnimation.textures = stickmanLeftTextures;
	    startAnimation();
	  }

	  function stopAnimation() {
	    stickmanAnimation.textures = stickmanStillTexture;
	    stickmanAnimation.stop();
	  }

	  function startAnimation() {
	    console.info('Start moving with speed', speed);
	    stickmanAnimation.play();
	  }

	  function goRight() {
	    if (speed <= 0) {
	      speed = -speed || 1;
	      startGoRightAnimation();
	    }
	  }

	  function goLeft() {
	    if (speed >= 0) {
	      speed = -speed || -1;
	      startGoLeftAnimation();
	    }
	  }

	  function stop() {
	    speed = 0;
	    setBlur();
	    stopAnimation();
	  }

	  function move() {
	    stickmanAnimation.position.x += speed;

	    if (stickmanAnimation.position.x < -20 && speed < 0) {
	      stickmanAnimation.position.x = 1020;
	    } else if (stickmanAnimation.position.x > 1020 && speed > 0) {
	      stickmanAnimation.position.x = -20;
	    }
	  }

	  function increaseSpeed() {
	    if (speed != 0) {
	      var absSpeed = Math.abs(speed);
	      speed = speed + (speed / absSpeed);

	      setBlur();
	      console.info('Speed is now', speed);
	    }
	  }

	  function setBlur() {
	    var blur = new PIXI.filters.BlurFilter();
	    blur.blurX = speed;
	    blur.blurY = speed;

	    stickmanAnimation.filters = [ blur ];
	  }

	  function decreaseSpeed() {
	    var absSpeed = Math.abs(speed);
	    if (absSpeed > 1) {
	      speed = speed - (speed / absSpeed);
	      console.info('Speed is now', speed);
	      setBlur();
	    }
	  }

	  return {
	    // Functions
	    initAnimation: initAnimation,
	    startAnimation: startAnimation,
	    goRight: goRight,
	    goLeft: goLeft,
	    stop: stop,
	    move: move,
	    increaseSpeed: increaseSpeed,
	    decreaseSpeed: decreaseSpeed,
	    info: info,

	    // Variables
	    stickmanTextureAtlas: stickmanTextureAtlas
	  };
	})();

	module.exports = Stickman;


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "stickman-texture-atlas.json"

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "stickman-texture-atlas.png"

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*global define:false */
	/**
	 * Copyright 2015 Craig Campbell
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * Mousetrap is a simple keyboard shortcut library for Javascript with
	 * no external dependencies
	 *
	 * @version 1.5.3
	 * @url craig.is/killing/mice
	 */
	(function(window, document, undefined) {

	    /**
	     * mapping of special keycodes to their corresponding keys
	     *
	     * everything in this dictionary cannot use keypress events
	     * so it has to be here to map to the correct keycodes for
	     * keyup/keydown events
	     *
	     * @type {Object}
	     */
	    var _MAP = {
	        8: 'backspace',
	        9: 'tab',
	        13: 'enter',
	        16: 'shift',
	        17: 'ctrl',
	        18: 'alt',
	        20: 'capslock',
	        27: 'esc',
	        32: 'space',
	        33: 'pageup',
	        34: 'pagedown',
	        35: 'end',
	        36: 'home',
	        37: 'left',
	        38: 'up',
	        39: 'right',
	        40: 'down',
	        45: 'ins',
	        46: 'del',
	        91: 'meta',
	        93: 'meta',
	        224: 'meta'
	    };

	    /**
	     * mapping for special characters so they can support
	     *
	     * this dictionary is only used incase you want to bind a
	     * keyup or keydown event to one of these keys
	     *
	     * @type {Object}
	     */
	    var _KEYCODE_MAP = {
	        106: '*',
	        107: '+',
	        109: '-',
	        110: '.',
	        111 : '/',
	        186: ';',
	        187: '=',
	        188: ',',
	        189: '-',
	        190: '.',
	        191: '/',
	        192: '`',
	        219: '[',
	        220: '\\',
	        221: ']',
	        222: '\''
	    };

	    /**
	     * this is a mapping of keys that require shift on a US keypad
	     * back to the non shift equivelents
	     *
	     * this is so you can use keyup events with these keys
	     *
	     * note that this will only work reliably on US keyboards
	     *
	     * @type {Object}
	     */
	    var _SHIFT_MAP = {
	        '~': '`',
	        '!': '1',
	        '@': '2',
	        '#': '3',
	        '$': '4',
	        '%': '5',
	        '^': '6',
	        '&': '7',
	        '*': '8',
	        '(': '9',
	        ')': '0',
	        '_': '-',
	        '+': '=',
	        ':': ';',
	        '\"': '\'',
	        '<': ',',
	        '>': '.',
	        '?': '/',
	        '|': '\\'
	    };

	    /**
	     * this is a list of special strings you can use to map
	     * to modifier keys when you specify your keyboard shortcuts
	     *
	     * @type {Object}
	     */
	    var _SPECIAL_ALIASES = {
	        'option': 'alt',
	        'command': 'meta',
	        'return': 'enter',
	        'escape': 'esc',
	        'plus': '+',
	        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
	    };

	    /**
	     * variable to store the flipped version of _MAP from above
	     * needed to check if we should use keypress or not when no action
	     * is specified
	     *
	     * @type {Object|undefined}
	     */
	    var _REVERSE_MAP;

	    /**
	     * loop through the f keys, f1 to f19 and add them to the map
	     * programatically
	     */
	    for (var i = 1; i < 20; ++i) {
	        _MAP[111 + i] = 'f' + i;
	    }

	    /**
	     * loop through to map numbers on the numeric keypad
	     */
	    for (i = 0; i <= 9; ++i) {
	        _MAP[i + 96] = i;
	    }

	    /**
	     * cross browser add event method
	     *
	     * @param {Element|HTMLDocument} object
	     * @param {string} type
	     * @param {Function} callback
	     * @returns void
	     */
	    function _addEvent(object, type, callback) {
	        if (object.addEventListener) {
	            object.addEventListener(type, callback, false);
	            return;
	        }

	        object.attachEvent('on' + type, callback);
	    }

	    /**
	     * takes the event and returns the key character
	     *
	     * @param {Event} e
	     * @return {string}
	     */
	    function _characterFromEvent(e) {

	        // for keypress events we should return the character as is
	        if (e.type == 'keypress') {
	            var character = String.fromCharCode(e.which);

	            // if the shift key is not pressed then it is safe to assume
	            // that we want the character to be lowercase.  this means if
	            // you accidentally have caps lock on then your key bindings
	            // will continue to work
	            //
	            // the only side effect that might not be desired is if you
	            // bind something like 'A' cause you want to trigger an
	            // event when capital A is pressed caps lock will no longer
	            // trigger the event.  shift+a will though.
	            if (!e.shiftKey) {
	                character = character.toLowerCase();
	            }

	            return character;
	        }

	        // for non keypress events the special maps are needed
	        if (_MAP[e.which]) {
	            return _MAP[e.which];
	        }

	        if (_KEYCODE_MAP[e.which]) {
	            return _KEYCODE_MAP[e.which];
	        }

	        // if it is not in the special map

	        // with keydown and keyup events the character seems to always
	        // come in as an uppercase character whether you are pressing shift
	        // or not.  we should make sure it is always lowercase for comparisons
	        return String.fromCharCode(e.which).toLowerCase();
	    }

	    /**
	     * checks if two arrays are equal
	     *
	     * @param {Array} modifiers1
	     * @param {Array} modifiers2
	     * @returns {boolean}
	     */
	    function _modifiersMatch(modifiers1, modifiers2) {
	        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
	    }

	    /**
	     * takes a key event and figures out what the modifiers are
	     *
	     * @param {Event} e
	     * @returns {Array}
	     */
	    function _eventModifiers(e) {
	        var modifiers = [];

	        if (e.shiftKey) {
	            modifiers.push('shift');
	        }

	        if (e.altKey) {
	            modifiers.push('alt');
	        }

	        if (e.ctrlKey) {
	            modifiers.push('ctrl');
	        }

	        if (e.metaKey) {
	            modifiers.push('meta');
	        }

	        return modifiers;
	    }

	    /**
	     * prevents default for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _preventDefault(e) {
	        if (e.preventDefault) {
	            e.preventDefault();
	            return;
	        }

	        e.returnValue = false;
	    }

	    /**
	     * stops propogation for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _stopPropagation(e) {
	        if (e.stopPropagation) {
	            e.stopPropagation();
	            return;
	        }

	        e.cancelBubble = true;
	    }

	    /**
	     * determines if the keycode specified is a modifier key or not
	     *
	     * @param {string} key
	     * @returns {boolean}
	     */
	    function _isModifier(key) {
	        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
	    }

	    /**
	     * reverses the map lookup so that we can look for specific keys
	     * to see what can and can't use keypress
	     *
	     * @return {Object}
	     */
	    function _getReverseMap() {
	        if (!_REVERSE_MAP) {
	            _REVERSE_MAP = {};
	            for (var key in _MAP) {

	                // pull out the numeric keypad from here cause keypress should
	                // be able to detect the keys from the character
	                if (key > 95 && key < 112) {
	                    continue;
	                }

	                if (_MAP.hasOwnProperty(key)) {
	                    _REVERSE_MAP[_MAP[key]] = key;
	                }
	            }
	        }
	        return _REVERSE_MAP;
	    }

	    /**
	     * picks the best action based on the key combination
	     *
	     * @param {string} key - character for key
	     * @param {Array} modifiers
	     * @param {string=} action passed in
	     */
	    function _pickBestAction(key, modifiers, action) {

	        // if no action was picked in we should try to pick the one
	        // that we think would work best for this key
	        if (!action) {
	            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
	        }

	        // modifier keys don't work as expected with keypress,
	        // switch to keydown
	        if (action == 'keypress' && modifiers.length) {
	            action = 'keydown';
	        }

	        return action;
	    }

	    /**
	     * Converts from a string key combination to an array
	     *
	     * @param  {string} combination like "command+shift+l"
	     * @return {Array}
	     */
	    function _keysFromString(combination) {
	        if (combination === '+') {
	            return ['+'];
	        }

	        combination = combination.replace(/\+{2}/g, '+plus');
	        return combination.split('+');
	    }

	    /**
	     * Gets info for a specific key combination
	     *
	     * @param  {string} combination key combination ("command+s" or "a" or "*")
	     * @param  {string=} action
	     * @returns {Object}
	     */
	    function _getKeyInfo(combination, action) {
	        var keys;
	        var key;
	        var i;
	        var modifiers = [];

	        // take the keys from this pattern and figure out what the actual
	        // pattern is all about
	        keys = _keysFromString(combination);

	        for (i = 0; i < keys.length; ++i) {
	            key = keys[i];

	            // normalize key names
	            if (_SPECIAL_ALIASES[key]) {
	                key = _SPECIAL_ALIASES[key];
	            }

	            // if this is not a keypress event then we should
	            // be smart about using shift keys
	            // this will only work for US keyboards however
	            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
	                key = _SHIFT_MAP[key];
	                modifiers.push('shift');
	            }

	            // if this key is a modifier then add it to the list of modifiers
	            if (_isModifier(key)) {
	                modifiers.push(key);
	            }
	        }

	        // depending on what the key combination is
	        // we will try to pick the best event for it
	        action = _pickBestAction(key, modifiers, action);

	        return {
	            key: key,
	            modifiers: modifiers,
	            action: action
	        };
	    }

	    function _belongsTo(element, ancestor) {
	        if (element === null || element === document) {
	            return false;
	        }

	        if (element === ancestor) {
	            return true;
	        }

	        return _belongsTo(element.parentNode, ancestor);
	    }

	    function Mousetrap(targetElement) {
	        var self = this;

	        targetElement = targetElement || document;

	        if (!(self instanceof Mousetrap)) {
	            return new Mousetrap(targetElement);
	        }

	        /**
	         * element to attach key events to
	         *
	         * @type {Element}
	         */
	        self.target = targetElement;

	        /**
	         * a list of all the callbacks setup via Mousetrap.bind()
	         *
	         * @type {Object}
	         */
	        self._callbacks = {};

	        /**
	         * direct map of string combinations to callbacks used for trigger()
	         *
	         * @type {Object}
	         */
	        self._directMap = {};

	        /**
	         * keeps track of what level each sequence is at since multiple
	         * sequences can start out with the same sequence
	         *
	         * @type {Object}
	         */
	        var _sequenceLevels = {};

	        /**
	         * variable to store the setTimeout call
	         *
	         * @type {null|number}
	         */
	        var _resetTimer;

	        /**
	         * temporary state where we will ignore the next keyup
	         *
	         * @type {boolean|string}
	         */
	        var _ignoreNextKeyup = false;

	        /**
	         * temporary state where we will ignore the next keypress
	         *
	         * @type {boolean}
	         */
	        var _ignoreNextKeypress = false;

	        /**
	         * are we currently inside of a sequence?
	         * type of action ("keyup" or "keydown" or "keypress") or false
	         *
	         * @type {boolean|string}
	         */
	        var _nextExpectedAction = false;

	        /**
	         * resets all sequence counters except for the ones passed in
	         *
	         * @param {Object} doNotReset
	         * @returns void
	         */
	        function _resetSequences(doNotReset) {
	            doNotReset = doNotReset || {};

	            var activeSequences = false,
	                key;

	            for (key in _sequenceLevels) {
	                if (doNotReset[key]) {
	                    activeSequences = true;
	                    continue;
	                }
	                _sequenceLevels[key] = 0;
	            }

	            if (!activeSequences) {
	                _nextExpectedAction = false;
	            }
	        }

	        /**
	         * finds all callbacks that match based on the keycode, modifiers,
	         * and action
	         *
	         * @param {string} character
	         * @param {Array} modifiers
	         * @param {Event|Object} e
	         * @param {string=} sequenceName - name of the sequence we are looking for
	         * @param {string=} combination
	         * @param {number=} level
	         * @returns {Array}
	         */
	        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
	            var i;
	            var callback;
	            var matches = [];
	            var action = e.type;

	            // if there are no events related to this keycode
	            if (!self._callbacks[character]) {
	                return [];
	            }

	            // if a modifier key is coming up on its own we should allow it
	            if (action == 'keyup' && _isModifier(character)) {
	                modifiers = [character];
	            }

	            // loop through all callbacks for the key that was pressed
	            // and see if any of them match
	            for (i = 0; i < self._callbacks[character].length; ++i) {
	                callback = self._callbacks[character][i];

	                // if a sequence name is not specified, but this is a sequence at
	                // the wrong level then move onto the next match
	                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
	                    continue;
	                }

	                // if the action we are looking for doesn't match the action we got
	                // then we should keep going
	                if (action != callback.action) {
	                    continue;
	                }

	                // if this is a keypress event and the meta key and control key
	                // are not pressed that means that we need to only look at the
	                // character, otherwise check the modifiers as well
	                //
	                // chrome will not fire a keypress if meta or control is down
	                // safari will fire a keypress if meta or meta+shift is down
	                // firefox will fire a keypress if meta or control is down
	                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

	                    // when you bind a combination or sequence a second time it
	                    // should overwrite the first one.  if a sequenceName or
	                    // combination is specified in this call it does just that
	                    //
	                    // @todo make deleting its own method?
	                    var deleteCombo = !sequenceName && callback.combo == combination;
	                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
	                    if (deleteCombo || deleteSequence) {
	                        self._callbacks[character].splice(i, 1);
	                    }

	                    matches.push(callback);
	                }
	            }

	            return matches;
	        }

	        /**
	         * actually calls the callback function
	         *
	         * if your callback function returns false this will use the jquery
	         * convention - prevent default and stop propogation on the event
	         *
	         * @param {Function} callback
	         * @param {Event} e
	         * @returns void
	         */
	        function _fireCallback(callback, e, combo, sequence) {

	            // if this event should not happen stop here
	            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
	                return;
	            }

	            if (callback(e, combo) === false) {
	                _preventDefault(e);
	                _stopPropagation(e);
	            }
	        }

	        /**
	         * handles a character key event
	         *
	         * @param {string} character
	         * @param {Array} modifiers
	         * @param {Event} e
	         * @returns void
	         */
	        self._handleKey = function(character, modifiers, e) {
	            var callbacks = _getMatches(character, modifiers, e);
	            var i;
	            var doNotReset = {};
	            var maxLevel = 0;
	            var processedSequenceCallback = false;

	            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
	            for (i = 0; i < callbacks.length; ++i) {
	                if (callbacks[i].seq) {
	                    maxLevel = Math.max(maxLevel, callbacks[i].level);
	                }
	            }

	            // loop through matching callbacks for this key event
	            for (i = 0; i < callbacks.length; ++i) {

	                // fire for all sequence callbacks
	                // this is because if for example you have multiple sequences
	                // bound such as "g i" and "g t" they both need to fire the
	                // callback for matching g cause otherwise you can only ever
	                // match the first one
	                if (callbacks[i].seq) {

	                    // only fire callbacks for the maxLevel to prevent
	                    // subsequences from also firing
	                    //
	                    // for example 'a option b' should not cause 'option b' to fire
	                    // even though 'option b' is part of the other sequence
	                    //
	                    // any sequences that do not match here will be discarded
	                    // below by the _resetSequences call
	                    if (callbacks[i].level != maxLevel) {
	                        continue;
	                    }

	                    processedSequenceCallback = true;

	                    // keep a list of which sequences were matches for later
	                    doNotReset[callbacks[i].seq] = 1;
	                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
	                    continue;
	                }

	                // if there were no sequence matches but we are still here
	                // that means this is a regular match so we should fire that
	                if (!processedSequenceCallback) {
	                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
	                }
	            }

	            // if the key you pressed matches the type of sequence without
	            // being a modifier (ie "keyup" or "keypress") then we should
	            // reset all sequences that were not matched by this event
	            //
	            // this is so, for example, if you have the sequence "h a t" and you
	            // type "h e a r t" it does not match.  in this case the "e" will
	            // cause the sequence to reset
	            //
	            // modifier keys are ignored because you can have a sequence
	            // that contains modifiers such as "enter ctrl+space" and in most
	            // cases the modifier key will be pressed before the next key
	            //
	            // also if you have a sequence such as "ctrl+b a" then pressing the
	            // "b" key will trigger a "keypress" and a "keydown"
	            //
	            // the "keydown" is expected when there is a modifier, but the
	            // "keypress" ends up matching the _nextExpectedAction since it occurs
	            // after and that causes the sequence to reset
	            //
	            // we ignore keypresses in a sequence that directly follow a keydown
	            // for the same character
	            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
	            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
	                _resetSequences(doNotReset);
	            }

	            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
	        };

	        /**
	         * handles a keydown event
	         *
	         * @param {Event} e
	         * @returns void
	         */
	        function _handleKeyEvent(e) {

	            // normalize e.which for key events
	            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
	            if (typeof e.which !== 'number') {
	                e.which = e.keyCode;
	            }

	            var character = _characterFromEvent(e);

	            // no character found then stop
	            if (!character) {
	                return;
	            }

	            // need to use === for the character check because the character can be 0
	            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
	                _ignoreNextKeyup = false;
	                return;
	            }

	            self.handleKey(character, _eventModifiers(e), e);
	        }

	        /**
	         * called to set a 1 second timeout on the specified sequence
	         *
	         * this is so after each key press in the sequence you have 1 second
	         * to press the next key before you have to start over
	         *
	         * @returns void
	         */
	        function _resetSequenceTimer() {
	            clearTimeout(_resetTimer);
	            _resetTimer = setTimeout(_resetSequences, 1000);
	        }

	        /**
	         * binds a key sequence to an event
	         *
	         * @param {string} combo - combo specified in bind call
	         * @param {Array} keys
	         * @param {Function} callback
	         * @param {string=} action
	         * @returns void
	         */
	        function _bindSequence(combo, keys, callback, action) {

	            // start off by adding a sequence level record for this combination
	            // and setting the level to 0
	            _sequenceLevels[combo] = 0;

	            /**
	             * callback to increase the sequence level for this sequence and reset
	             * all other sequences that were active
	             *
	             * @param {string} nextAction
	             * @returns {Function}
	             */
	            function _increaseSequence(nextAction) {
	                return function() {
	                    _nextExpectedAction = nextAction;
	                    ++_sequenceLevels[combo];
	                    _resetSequenceTimer();
	                };
	            }

	            /**
	             * wraps the specified callback inside of another function in order
	             * to reset all sequence counters as soon as this sequence is done
	             *
	             * @param {Event} e
	             * @returns void
	             */
	            function _callbackAndReset(e) {
	                _fireCallback(callback, e, combo);

	                // we should ignore the next key up if the action is key down
	                // or keypress.  this is so if you finish a sequence and
	                // release the key the final key will not trigger a keyup
	                if (action !== 'keyup') {
	                    _ignoreNextKeyup = _characterFromEvent(e);
	                }

	                // weird race condition if a sequence ends with the key
	                // another sequence begins with
	                setTimeout(_resetSequences, 10);
	            }

	            // loop through keys one at a time and bind the appropriate callback
	            // function.  for any key leading up to the final one it should
	            // increase the sequence. after the final, it should reset all sequences
	            //
	            // if an action is specified in the original bind call then that will
	            // be used throughout.  otherwise we will pass the action that the
	            // next key in the sequence should match.  this allows a sequence
	            // to mix and match keypress and keydown events depending on which
	            // ones are better suited to the key provided
	            for (var i = 0; i < keys.length; ++i) {
	                var isFinal = i + 1 === keys.length;
	                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
	                _bindSingle(keys[i], wrappedCallback, action, combo, i);
	            }
	        }

	        /**
	         * binds a single keyboard combination
	         *
	         * @param {string} combination
	         * @param {Function} callback
	         * @param {string=} action
	         * @param {string=} sequenceName - name of sequence if part of sequence
	         * @param {number=} level - what part of the sequence the command is
	         * @returns void
	         */
	        function _bindSingle(combination, callback, action, sequenceName, level) {

	            // store a direct mapped reference for use with Mousetrap.trigger
	            self._directMap[combination + ':' + action] = callback;

	            // make sure multiple spaces in a row become a single space
	            combination = combination.replace(/\s+/g, ' ');

	            var sequence = combination.split(' ');
	            var info;

	            // if this pattern is a sequence of keys then run through this method
	            // to reprocess each pattern one key at a time
	            if (sequence.length > 1) {
	                _bindSequence(combination, sequence, callback, action);
	                return;
	            }

	            info = _getKeyInfo(combination, action);

	            // make sure to initialize array if this is the first time
	            // a callback is added for this key
	            self._callbacks[info.key] = self._callbacks[info.key] || [];

	            // remove an existing match if there is one
	            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

	            // add this call back to the array
	            // if it is a sequence put it at the beginning
	            // if not put it at the end
	            //
	            // this is important because the way these are processed expects
	            // the sequence ones to come first
	            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
	                callback: callback,
	                modifiers: info.modifiers,
	                action: info.action,
	                seq: sequenceName,
	                level: level,
	                combo: combination
	            });
	        }

	        /**
	         * binds multiple combinations to the same callback
	         *
	         * @param {Array} combinations
	         * @param {Function} callback
	         * @param {string|undefined} action
	         * @returns void
	         */
	        self._bindMultiple = function(combinations, callback, action) {
	            for (var i = 0; i < combinations.length; ++i) {
	                _bindSingle(combinations[i], callback, action);
	            }
	        };

	        // start!
	        _addEvent(targetElement, 'keypress', _handleKeyEvent);
	        _addEvent(targetElement, 'keydown', _handleKeyEvent);
	        _addEvent(targetElement, 'keyup', _handleKeyEvent);
	    }

	    /**
	     * binds an event to mousetrap
	     *
	     * can be a single key, a combination of keys separated with +,
	     * an array of keys, or a sequence of keys separated by spaces
	     *
	     * be sure to list the modifier keys first to make sure that the
	     * correct key ends up getting bound (the last key in the pattern)
	     *
	     * @param {string|Array} keys
	     * @param {Function} callback
	     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
	     * @returns void
	     */
	    Mousetrap.prototype.bind = function(keys, callback, action) {
	        var self = this;
	        keys = keys instanceof Array ? keys : [keys];
	        self._bindMultiple.call(self, keys, callback, action);
	        return self;
	    };

	    /**
	     * unbinds an event to mousetrap
	     *
	     * the unbinding sets the callback function of the specified key combo
	     * to an empty function and deletes the corresponding key in the
	     * _directMap dict.
	     *
	     * TODO: actually remove this from the _callbacks dictionary instead
	     * of binding an empty function
	     *
	     * the keycombo+action has to be exactly the same as
	     * it was defined in the bind method
	     *
	     * @param {string|Array} keys
	     * @param {string} action
	     * @returns void
	     */
	    Mousetrap.prototype.unbind = function(keys, action) {
	        var self = this;
	        return self.bind.call(self, keys, function() {}, action);
	    };

	    /**
	     * triggers an event that has already been bound
	     *
	     * @param {string} keys
	     * @param {string=} action
	     * @returns void
	     */
	    Mousetrap.prototype.trigger = function(keys, action) {
	        var self = this;
	        if (self._directMap[keys + ':' + action]) {
	            self._directMap[keys + ':' + action]({}, keys);
	        }
	        return self;
	    };

	    /**
	     * resets the library back to its initial state.  this is useful
	     * if you want to clear out the current keyboard shortcuts and bind
	     * new ones - for example if you switch to another page
	     *
	     * @returns void
	     */
	    Mousetrap.prototype.reset = function() {
	        var self = this;
	        self._callbacks = {};
	        self._directMap = {};
	        return self;
	    };

	    /**
	     * should we stop this event before firing off callbacks
	     *
	     * @param {Event} e
	     * @param {Element} element
	     * @return {boolean}
	     */
	    Mousetrap.prototype.stopCallback = function(e, element) {
	        var self = this;

	        // if the element has the class "mousetrap" then no need to stop
	        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
	            return false;
	        }

	        if (_belongsTo(element, self.target)) {
	            return false;
	        }

	        // stop for input, select, and textarea
	        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
	    };

	    /**
	     * exposes _handleKey publicly so it can be overwritten by extensions
	     */
	    Mousetrap.prototype.handleKey = function() {
	        var self = this;
	        return self._handleKey.apply(self, arguments);
	    };

	    /**
	     * Init the global mousetrap functions
	     *
	     * This method is needed to allow the global mousetrap functions to work
	     * now that mousetrap is a constructor function.
	     */
	    Mousetrap.init = function() {
	        var documentMousetrap = Mousetrap(document);
	        for (var method in documentMousetrap) {
	            if (method.charAt(0) !== '_') {
	                Mousetrap[method] = (function(method) {
	                    return function() {
	                        return documentMousetrap[method].apply(documentMousetrap, arguments);
	                    };
	                } (method));
	            }
	        }
	    };

	    Mousetrap.init();

	    // expose mousetrap to the global object
	    window.Mousetrap = Mousetrap;

	    // expose as a common js module
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = Mousetrap;
	    }

	    // expose mousetrap as an AMD module
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return Mousetrap;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}) (window, document);


/***/ }

});