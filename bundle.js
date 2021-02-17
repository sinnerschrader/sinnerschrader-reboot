(() => {
  // node_modules/@glidejs/glide/dist/glide.esm.js
  /*!
   * Glide.js v3.4.1
   * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
   * Released under the MIT License.
   */
  var defaults = {
    type: "slider",
    startAt: 0,
    perView: 1,
    focusAt: 0,
    gap: 10,
    autoplay: false,
    hoverpause: true,
    keyboard: true,
    bound: false,
    swipeThreshold: 80,
    dragThreshold: 120,
    perTouch: false,
    touchRatio: 0.5,
    touchAngle: 45,
    animationDuration: 400,
    rewind: true,
    rewindDuration: 800,
    animationTimingFunc: "cubic-bezier(.165, .840, .440, 1)",
    throttle: 10,
    direction: "ltr",
    peek: 0,
    breakpoints: {},
    classes: {
      direction: {
        ltr: "glide--ltr",
        rtl: "glide--rtl"
      },
      slider: "glide--slider",
      carousel: "glide--carousel",
      swipeable: "glide--swipeable",
      dragging: "glide--dragging",
      cloneSlide: "glide__slide--clone",
      activeNav: "glide__bullet--active",
      activeSlide: "glide__slide--active",
      disabledArrow: "glide__arrow--disabled"
    }
  };
  function warn(msg) {
    console.error("[Glide warn]: " + msg);
  }
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var get = function get2(object, property, receiver) {
    if (object === null)
      object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === void 0) {
      var parent = Object.getPrototypeOf(object);
      if (parent === null) {
        return void 0;
      } else {
        return get2(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;
      if (getter === void 0) {
        return void 0;
      }
      return getter.call(receiver);
    }
  };
  var inherits = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  var possibleConstructorReturn = function(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };
  function toInt(value) {
    return parseInt(value);
  }
  function toFloat(value) {
    return parseFloat(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isObject(value) {
    var type = typeof value === "undefined" ? "undefined" : _typeof(value);
    return type === "function" || type === "object" && !!value;
  }
  function isNumber(value) {
    return typeof value === "number";
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isUndefined(value) {
    return typeof value === "undefined";
  }
  function isArray(value) {
    return value.constructor === Array;
  }
  function mount(glide, extensions, events) {
    var components = {};
    for (var name in extensions) {
      if (isFunction(extensions[name])) {
        components[name] = extensions[name](glide, components, events);
      } else {
        warn("Extension must be a function");
      }
    }
    for (var _name in components) {
      if (isFunction(components[_name].mount)) {
        components[_name].mount();
      }
    }
    return components;
  }
  function define(obj, prop, definition) {
    Object.defineProperty(obj, prop, definition);
  }
  function sortKeys(obj) {
    return Object.keys(obj).sort().reduce(function(r, k) {
      r[k] = obj[k];
      return r[k], r;
    }, {});
  }
  function mergeOptions(defaults2, settings) {
    var options = _extends({}, defaults2, settings);
    if (settings.hasOwnProperty("classes")) {
      options.classes = _extends({}, defaults2.classes, settings.classes);
      if (settings.classes.hasOwnProperty("direction")) {
        options.classes.direction = _extends({}, defaults2.classes.direction, settings.classes.direction);
      }
    }
    if (settings.hasOwnProperty("breakpoints")) {
      options.breakpoints = _extends({}, defaults2.breakpoints, settings.breakpoints);
    }
    return options;
  }
  var EventsBus = function() {
    function EventsBus2() {
      var events = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      classCallCheck(this, EventsBus2);
      this.events = events;
      this.hop = events.hasOwnProperty;
    }
    createClass(EventsBus2, [{
      key: "on",
      value: function on(event, handler) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.on(event[i], handler);
          }
        }
        if (!this.hop.call(this.events, event)) {
          this.events[event] = [];
        }
        var index = this.events[event].push(handler) - 1;
        return {
          remove: function remove() {
            delete this.events[event][index];
          }
        };
      }
    }, {
      key: "emit",
      value: function emit(event, context) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.emit(event[i], context);
          }
        }
        if (!this.hop.call(this.events, event)) {
          return;
        }
        this.events[event].forEach(function(item) {
          item(context || {});
        });
      }
    }]);
    return EventsBus2;
  }();
  var Glide = function() {
    function Glide2(selector) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      classCallCheck(this, Glide2);
      this._c = {};
      this._t = [];
      this._e = new EventsBus();
      this.disabled = false;
      this.selector = selector;
      this.settings = mergeOptions(defaults, options);
      this.index = this.settings.startAt;
    }
    createClass(Glide2, [{
      key: "mount",
      value: function mount$$1() {
        var extensions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        this._e.emit("mount.before");
        if (isObject(extensions)) {
          this._c = mount(this, extensions, this._e);
        } else {
          warn("You need to provide a object on `mount()`");
        }
        this._e.emit("mount.after");
        return this;
      }
    }, {
      key: "mutate",
      value: function mutate() {
        var transformers = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        if (isArray(transformers)) {
          this._t = transformers;
        } else {
          warn("You need to provide a array on `mutate()`");
        }
        return this;
      }
    }, {
      key: "update",
      value: function update() {
        var settings = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        this.settings = mergeOptions(this.settings, settings);
        if (settings.hasOwnProperty("startAt")) {
          this.index = settings.startAt;
        }
        this._e.emit("update");
        return this;
      }
    }, {
      key: "go",
      value: function go(pattern) {
        this._c.Run.make(pattern);
        return this;
      }
    }, {
      key: "move",
      value: function move(distance) {
        this._c.Transition.disable();
        this._c.Move.make(distance);
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._e.emit("destroy");
        return this;
      }
    }, {
      key: "play",
      value: function play() {
        var interval = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        if (interval) {
          this.settings.autoplay = interval;
        }
        this._e.emit("play");
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this._e.emit("pause");
        return this;
      }
    }, {
      key: "disable",
      value: function disable() {
        this.disabled = true;
        return this;
      }
    }, {
      key: "enable",
      value: function enable() {
        this.disabled = false;
        return this;
      }
    }, {
      key: "on",
      value: function on(event, handler) {
        this._e.on(event, handler);
        return this;
      }
    }, {
      key: "isType",
      value: function isType(name) {
        return this.settings.type === name;
      }
    }, {
      key: "settings",
      get: function get$$1() {
        return this._o;
      },
      set: function set$$1(o) {
        if (isObject(o)) {
          this._o = o;
        } else {
          warn("Options must be an `object` instance.");
        }
      }
    }, {
      key: "index",
      get: function get$$1() {
        return this._i;
      },
      set: function set$$1(i) {
        this._i = toInt(i);
      }
    }, {
      key: "type",
      get: function get$$1() {
        return this.settings.type;
      }
    }, {
      key: "disabled",
      get: function get$$1() {
        return this._d;
      },
      set: function set$$1(status) {
        this._d = !!status;
      }
    }]);
    return Glide2;
  }();
  function Run(Glide2, Components, Events) {
    var Run2 = {
      mount: function mount2() {
        this._o = false;
      },
      make: function make(move) {
        var _this = this;
        if (!Glide2.disabled) {
          Glide2.disable();
          this.move = move;
          Events.emit("run.before", this.move);
          this.calculate();
          Events.emit("run", this.move);
          Components.Transition.after(function() {
            if (_this.isStart()) {
              Events.emit("run.start", _this.move);
            }
            if (_this.isEnd()) {
              Events.emit("run.end", _this.move);
            }
            if (_this.isOffset("<") || _this.isOffset(">")) {
              _this._o = false;
              Events.emit("run.offset", _this.move);
            }
            Events.emit("run.after", _this.move);
            Glide2.enable();
          });
        }
      },
      calculate: function calculate() {
        var move = this.move, length = this.length;
        var steps = move.steps, direction = move.direction;
        var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;
        switch (direction) {
          case ">":
            if (steps === ">") {
              Glide2.index = length;
            } else if (this.isEnd()) {
              if (!(Glide2.isType("slider") && !Glide2.settings.rewind)) {
                this._o = true;
                Glide2.index = 0;
              }
            } else if (countableSteps) {
              Glide2.index += Math.min(length - Glide2.index, -toInt(steps));
            } else {
              Glide2.index++;
            }
            break;
          case "<":
            if (steps === "<") {
              Glide2.index = 0;
            } else if (this.isStart()) {
              if (!(Glide2.isType("slider") && !Glide2.settings.rewind)) {
                this._o = true;
                Glide2.index = length;
              }
            } else if (countableSteps) {
              Glide2.index -= Math.min(Glide2.index, toInt(steps));
            } else {
              Glide2.index--;
            }
            break;
          case "=":
            Glide2.index = steps;
            break;
          default:
            warn("Invalid direction pattern [" + direction + steps + "] has been used");
            break;
        }
      },
      isStart: function isStart() {
        return Glide2.index === 0;
      },
      isEnd: function isEnd() {
        return Glide2.index === this.length;
      },
      isOffset: function isOffset(direction) {
        return this._o && this.move.direction === direction;
      }
    };
    define(Run2, "move", {
      get: function get3() {
        return this._m;
      },
      set: function set(value) {
        var step = value.substr(1);
        this._m = {
          direction: value.substr(0, 1),
          steps: step ? toInt(step) ? toInt(step) : step : 0
        };
      }
    });
    define(Run2, "length", {
      get: function get3() {
        var settings = Glide2.settings;
        var length = Components.Html.slides.length;
        if (Glide2.isType("slider") && settings.focusAt !== "center" && settings.bound) {
          return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
        }
        return length - 1;
      }
    });
    define(Run2, "offset", {
      get: function get3() {
        return this._o;
      }
    });
    return Run2;
  }
  function now() {
    return new Date().getTime();
  }
  function throttle(func, wait, options) {
    var timeout = void 0, context = void 0, args = void 0, result = void 0;
    var previous = 0;
    if (!options)
      options = {};
    var later = function later2() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout)
        context = args = null;
    };
    var throttled = function throttled2() {
      var at = now();
      if (!previous && options.leading === false)
        previous = at;
      var remaining = wait - (at - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = at;
        result = func.apply(context, args);
        if (!timeout)
          context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };
    return throttled;
  }
  var MARGIN_TYPE = {
    ltr: ["marginLeft", "marginRight"],
    rtl: ["marginRight", "marginLeft"]
  };
  function Gaps(Glide2, Components, Events) {
    var Gaps2 = {
      apply: function apply(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          var direction = Components.Direction.value;
          if (i !== 0) {
            style[MARGIN_TYPE[direction][0]] = this.value / 2 + "px";
          } else {
            style[MARGIN_TYPE[direction][0]] = "";
          }
          if (i !== slides.length - 1) {
            style[MARGIN_TYPE[direction][1]] = this.value / 2 + "px";
          } else {
            style[MARGIN_TYPE[direction][1]] = "";
          }
        }
      },
      remove: function remove(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          style.marginLeft = "";
          style.marginRight = "";
        }
      }
    };
    define(Gaps2, "value", {
      get: function get3() {
        return toInt(Glide2.settings.gap);
      }
    });
    define(Gaps2, "grow", {
      get: function get3() {
        return Gaps2.value * (Components.Sizes.length - 1);
      }
    });
    define(Gaps2, "reductor", {
      get: function get3() {
        var perView = Glide2.settings.perView;
        return Gaps2.value * (perView - 1) / perView;
      }
    });
    Events.on(["build.after", "update"], throttle(function() {
      Gaps2.apply(Components.Html.wrapper.children);
    }, 30));
    Events.on("destroy", function() {
      Gaps2.remove(Components.Html.wrapper.children);
    });
    return Gaps2;
  }
  function siblings(node) {
    if (node && node.parentNode) {
      var n = node.parentNode.firstChild;
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== node) {
          matched.push(n);
        }
      }
      return matched;
    }
    return [];
  }
  function exist(node) {
    if (node && node instanceof window.HTMLElement) {
      return true;
    }
    return false;
  }
  var TRACK_SELECTOR = '[data-glide-el="track"]';
  function Html(Glide2, Components) {
    var Html2 = {
      mount: function mount2() {
        this.root = Glide2.selector;
        this.track = this.root.querySelector(TRACK_SELECTOR);
        this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function(slide) {
          return !slide.classList.contains(Glide2.settings.classes.cloneSlide);
        });
      }
    };
    define(Html2, "root", {
      get: function get3() {
        return Html2._r;
      },
      set: function set(r) {
        if (isString(r)) {
          r = document.querySelector(r);
        }
        if (exist(r)) {
          Html2._r = r;
        } else {
          warn("Root element must be a existing Html node");
        }
      }
    });
    define(Html2, "track", {
      get: function get3() {
        return Html2._t;
      },
      set: function set(t) {
        if (exist(t)) {
          Html2._t = t;
        } else {
          warn("Could not find track element. Please use " + TRACK_SELECTOR + " attribute.");
        }
      }
    });
    define(Html2, "wrapper", {
      get: function get3() {
        return Html2.track.children[0];
      }
    });
    return Html2;
  }
  function Peek(Glide2, Components, Events) {
    var Peek2 = {
      mount: function mount2() {
        this.value = Glide2.settings.peek;
      }
    };
    define(Peek2, "value", {
      get: function get3() {
        return Peek2._v;
      },
      set: function set(value) {
        if (isObject(value)) {
          value.before = toInt(value.before);
          value.after = toInt(value.after);
        } else {
          value = toInt(value);
        }
        Peek2._v = value;
      }
    });
    define(Peek2, "reductor", {
      get: function get3() {
        var value = Peek2.value;
        var perView = Glide2.settings.perView;
        if (isObject(value)) {
          return value.before / perView + value.after / perView;
        }
        return value * 2 / perView;
      }
    });
    Events.on(["resize", "update"], function() {
      Peek2.mount();
    });
    return Peek2;
  }
  function Move(Glide2, Components, Events) {
    var Move2 = {
      mount: function mount2() {
        this._o = 0;
      },
      make: function make() {
        var _this = this;
        var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        this.offset = offset;
        Events.emit("move", {
          movement: this.value
        });
        Components.Transition.after(function() {
          Events.emit("move.after", {
            movement: _this.value
          });
        });
      }
    };
    define(Move2, "offset", {
      get: function get3() {
        return Move2._o;
      },
      set: function set(value) {
        Move2._o = !isUndefined(value) ? toInt(value) : 0;
      }
    });
    define(Move2, "translate", {
      get: function get3() {
        return Components.Sizes.slideWidth * Glide2.index;
      }
    });
    define(Move2, "value", {
      get: function get3() {
        var offset = this.offset;
        var translate = this.translate;
        if (Components.Direction.is("rtl")) {
          return translate + offset;
        }
        return translate - offset;
      }
    });
    Events.on(["build.before", "run"], function() {
      Move2.make();
    });
    return Move2;
  }
  function Sizes(Glide2, Components, Events) {
    var Sizes2 = {
      setupSlides: function setupSlides() {
        var width = this.slideWidth + "px";
        var slides = Components.Html.slides;
        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = width;
        }
      },
      setupWrapper: function setupWrapper(dimention) {
        Components.Html.wrapper.style.width = this.wrapperSize + "px";
      },
      remove: function remove() {
        var slides = Components.Html.slides;
        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = "";
        }
        Components.Html.wrapper.style.width = "";
      }
    };
    define(Sizes2, "length", {
      get: function get3() {
        return Components.Html.slides.length;
      }
    });
    define(Sizes2, "width", {
      get: function get3() {
        return Components.Html.root.offsetWidth;
      }
    });
    define(Sizes2, "wrapperSize", {
      get: function get3() {
        return Sizes2.slideWidth * Sizes2.length + Components.Gaps.grow + Components.Clones.grow;
      }
    });
    define(Sizes2, "slideWidth", {
      get: function get3() {
        return Sizes2.width / Glide2.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
      }
    });
    Events.on(["build.before", "resize", "update"], function() {
      Sizes2.setupSlides();
      Sizes2.setupWrapper();
    });
    Events.on("destroy", function() {
      Sizes2.remove();
    });
    return Sizes2;
  }
  function Build(Glide2, Components, Events) {
    var Build2 = {
      mount: function mount2() {
        Events.emit("build.before");
        this.typeClass();
        this.activeClass();
        Events.emit("build.after");
      },
      typeClass: function typeClass() {
        Components.Html.root.classList.add(Glide2.settings.classes[Glide2.settings.type]);
      },
      activeClass: function activeClass() {
        var classes = Glide2.settings.classes;
        var slide = Components.Html.slides[Glide2.index];
        if (slide) {
          slide.classList.add(classes.activeSlide);
          siblings(slide).forEach(function(sibling) {
            sibling.classList.remove(classes.activeSlide);
          });
        }
      },
      removeClasses: function removeClasses() {
        var classes = Glide2.settings.classes;
        Components.Html.root.classList.remove(classes[Glide2.settings.type]);
        Components.Html.slides.forEach(function(sibling) {
          sibling.classList.remove(classes.activeSlide);
        });
      }
    };
    Events.on(["destroy", "update"], function() {
      Build2.removeClasses();
    });
    Events.on(["resize", "update"], function() {
      Build2.mount();
    });
    Events.on("move.after", function() {
      Build2.activeClass();
    });
    return Build2;
  }
  function Clones(Glide2, Components, Events) {
    var Clones2 = {
      mount: function mount2() {
        this.items = [];
        if (Glide2.isType("carousel")) {
          this.items = this.collect();
        }
      },
      collect: function collect() {
        var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        var slides = Components.Html.slides;
        var _Glide$settings = Glide2.settings, perView = _Glide$settings.perView, classes = _Glide$settings.classes;
        var peekIncrementer = +!!Glide2.settings.peek;
        var part = perView + peekIncrementer;
        var start = slides.slice(0, part);
        var end = slides.slice(-part);
        for (var r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < start.length; i++) {
            var clone = start[i].cloneNode(true);
            clone.classList.add(classes.cloneSlide);
            items.push(clone);
          }
          for (var _i = 0; _i < end.length; _i++) {
            var _clone = end[_i].cloneNode(true);
            _clone.classList.add(classes.cloneSlide);
            items.unshift(_clone);
          }
        }
        return items;
      },
      append: function append() {
        var items = this.items;
        var _Components$Html = Components.Html, wrapper = _Components$Html.wrapper, slides = _Components$Html.slides;
        var half = Math.floor(items.length / 2);
        var prepend = items.slice(0, half).reverse();
        var append2 = items.slice(half, items.length);
        var width = Components.Sizes.slideWidth + "px";
        for (var i = 0; i < append2.length; i++) {
          wrapper.appendChild(append2[i]);
        }
        for (var _i2 = 0; _i2 < prepend.length; _i2++) {
          wrapper.insertBefore(prepend[_i2], slides[0]);
        }
        for (var _i3 = 0; _i3 < items.length; _i3++) {
          items[_i3].style.width = width;
        }
      },
      remove: function remove() {
        var items = this.items;
        for (var i = 0; i < items.length; i++) {
          Components.Html.wrapper.removeChild(items[i]);
        }
      }
    };
    define(Clones2, "grow", {
      get: function get3() {
        return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones2.items.length;
      }
    });
    Events.on("update", function() {
      Clones2.remove();
      Clones2.mount();
      Clones2.append();
    });
    Events.on("build.before", function() {
      if (Glide2.isType("carousel")) {
        Clones2.append();
      }
    });
    Events.on("destroy", function() {
      Clones2.remove();
    });
    return Clones2;
  }
  var EventsBinder = function() {
    function EventsBinder2() {
      var listeners = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      classCallCheck(this, EventsBinder2);
      this.listeners = listeners;
    }
    createClass(EventsBinder2, [{
      key: "on",
      value: function on(events, el, closure) {
        var capture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        if (isString(events)) {
          events = [events];
        }
        for (var i = 0; i < events.length; i++) {
          this.listeners[events[i]] = closure;
          el.addEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
    }, {
      key: "off",
      value: function off(events, el) {
        var capture = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        if (isString(events)) {
          events = [events];
        }
        for (var i = 0; i < events.length; i++) {
          el.removeEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        delete this.listeners;
      }
    }]);
    return EventsBinder2;
  }();
  function Resize(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var Resize2 = {
      mount: function mount2() {
        this.bind();
      },
      bind: function bind() {
        Binder.on("resize", window, throttle(function() {
          Events.emit("resize");
        }, Glide2.settings.throttle));
      },
      unbind: function unbind() {
        Binder.off("resize", window);
      }
    };
    Events.on("destroy", function() {
      Resize2.unbind();
      Binder.destroy();
    });
    return Resize2;
  }
  var VALID_DIRECTIONS = ["ltr", "rtl"];
  var FLIPED_MOVEMENTS = {
    ">": "<",
    "<": ">",
    "=": "="
  };
  function Direction(Glide2, Components, Events) {
    var Direction2 = {
      mount: function mount2() {
        this.value = Glide2.settings.direction;
      },
      resolve: function resolve(pattern) {
        var token = pattern.slice(0, 1);
        if (this.is("rtl")) {
          return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
        }
        return pattern;
      },
      is: function is(direction) {
        return this.value === direction;
      },
      addClass: function addClass() {
        Components.Html.root.classList.add(Glide2.settings.classes.direction[this.value]);
      },
      removeClass: function removeClass() {
        Components.Html.root.classList.remove(Glide2.settings.classes.direction[this.value]);
      }
    };
    define(Direction2, "value", {
      get: function get3() {
        return Direction2._v;
      },
      set: function set(value) {
        if (VALID_DIRECTIONS.indexOf(value) > -1) {
          Direction2._v = value;
        } else {
          warn("Direction value must be `ltr` or `rtl`");
        }
      }
    });
    Events.on(["destroy", "update"], function() {
      Direction2.removeClass();
    });
    Events.on("update", function() {
      Direction2.mount();
    });
    Events.on(["build.before", "update"], function() {
      Direction2.addClass();
    });
    return Direction2;
  }
  function Rtl(Glide2, Components) {
    return {
      modify: function modify(translate) {
        if (Components.Direction.is("rtl")) {
          return -translate;
        }
        return translate;
      }
    };
  }
  function Gap(Glide2, Components) {
    return {
      modify: function modify(translate) {
        return translate + Components.Gaps.value * Glide2.index;
      }
    };
  }
  function Grow(Glide2, Components) {
    return {
      modify: function modify(translate) {
        return translate + Components.Clones.grow / 2;
      }
    };
  }
  function Peeking(Glide2, Components) {
    return {
      modify: function modify(translate) {
        if (Glide2.settings.focusAt >= 0) {
          var peek = Components.Peek.value;
          if (isObject(peek)) {
            return translate - peek.before;
          }
          return translate - peek;
        }
        return translate;
      }
    };
  }
  function Focusing(Glide2, Components) {
    return {
      modify: function modify(translate) {
        var gap = Components.Gaps.value;
        var width = Components.Sizes.width;
        var focusAt = Glide2.settings.focusAt;
        var slideWidth = Components.Sizes.slideWidth;
        if (focusAt === "center") {
          return translate - (width / 2 - slideWidth / 2);
        }
        return translate - slideWidth * focusAt - gap * focusAt;
      }
    };
  }
  function mutator(Glide2, Components, Events) {
    var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide2._t, [Rtl]);
    return {
      mutate: function mutate(translate) {
        for (var i = 0; i < TRANSFORMERS.length; i++) {
          var transformer = TRANSFORMERS[i];
          if (isFunction(transformer) && isFunction(transformer().modify)) {
            translate = transformer(Glide2, Components, Events).modify(translate);
          } else {
            warn("Transformer should be a function that returns an object with `modify()` method");
          }
        }
        return translate;
      }
    };
  }
  function Translate(Glide2, Components, Events) {
    var Translate2 = {
      set: function set(value) {
        var transform = mutator(Glide2, Components).mutate(value);
        Components.Html.wrapper.style.transform = "translate3d(" + -1 * transform + "px, 0px, 0px)";
      },
      remove: function remove() {
        Components.Html.wrapper.style.transform = "";
      }
    };
    Events.on("move", function(context) {
      var gap = Components.Gaps.value;
      var length = Components.Sizes.length;
      var width = Components.Sizes.slideWidth;
      if (Glide2.isType("carousel") && Components.Run.isOffset("<")) {
        Components.Transition.after(function() {
          Events.emit("translate.jump");
          Translate2.set(width * (length - 1));
        });
        return Translate2.set(-width - gap * length);
      }
      if (Glide2.isType("carousel") && Components.Run.isOffset(">")) {
        Components.Transition.after(function() {
          Events.emit("translate.jump");
          Translate2.set(0);
        });
        return Translate2.set(width * length + gap * length);
      }
      return Translate2.set(context.movement);
    });
    Events.on("destroy", function() {
      Translate2.remove();
    });
    return Translate2;
  }
  function Transition(Glide2, Components, Events) {
    var disabled = false;
    var Transition2 = {
      compose: function compose(property) {
        var settings = Glide2.settings;
        if (!disabled) {
          return property + " " + this.duration + "ms " + settings.animationTimingFunc;
        }
        return property + " 0ms " + settings.animationTimingFunc;
      },
      set: function set() {
        var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
        Components.Html.wrapper.style.transition = this.compose(property);
      },
      remove: function remove() {
        Components.Html.wrapper.style.transition = "";
      },
      after: function after(callback) {
        setTimeout(function() {
          callback();
        }, this.duration);
      },
      enable: function enable() {
        disabled = false;
        this.set();
      },
      disable: function disable() {
        disabled = true;
        this.set();
      }
    };
    define(Transition2, "duration", {
      get: function get3() {
        var settings = Glide2.settings;
        if (Glide2.isType("slider") && Components.Run.offset) {
          return settings.rewindDuration;
        }
        return settings.animationDuration;
      }
    });
    Events.on("move", function() {
      Transition2.set();
    });
    Events.on(["build.before", "resize", "translate.jump"], function() {
      Transition2.disable();
    });
    Events.on("run", function() {
      Transition2.enable();
    });
    Events.on("destroy", function() {
      Transition2.remove();
    });
    return Transition2;
  }
  var supportsPassive = false;
  try {
    opts = Object.defineProperty({}, "passive", {
      get: function get3() {
        supportsPassive = true;
      }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
  } catch (e) {
  }
  var opts;
  var supportsPassive$1 = supportsPassive;
  var START_EVENTS = ["touchstart", "mousedown"];
  var MOVE_EVENTS = ["touchmove", "mousemove"];
  var END_EVENTS = ["touchend", "touchcancel", "mouseup", "mouseleave"];
  var MOUSE_EVENTS = ["mousedown", "mousemove", "mouseup", "mouseleave"];
  function Swipe(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var capture = supportsPassive$1 ? {passive: true} : false;
    var Swipe2 = {
      mount: function mount2() {
        this.bindSwipeStart();
      },
      start: function start(event) {
        if (!disabled && !Glide2.disabled) {
          this.disable();
          var swipe = this.touches(event);
          swipeSin = null;
          swipeStartX = toInt(swipe.pageX);
          swipeStartY = toInt(swipe.pageY);
          this.bindSwipeMove();
          this.bindSwipeEnd();
          Events.emit("swipe.start");
        }
      },
      move: function move(event) {
        if (!Glide2.disabled) {
          var _Glide$settings = Glide2.settings, touchAngle = _Glide$settings.touchAngle, touchRatio = _Glide$settings.touchRatio, classes = _Glide$settings.classes;
          var swipe = this.touches(event);
          var subExSx = toInt(swipe.pageX) - swipeStartX;
          var subEySy = toInt(swipe.pageY) - swipeStartY;
          var powEX = Math.abs(subExSx << 2);
          var powEY = Math.abs(subEySy << 2);
          var swipeHypotenuse = Math.sqrt(powEX + powEY);
          var swipeCathetus = Math.sqrt(powEY);
          swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);
          if (swipeSin * 180 / Math.PI < touchAngle) {
            event.stopPropagation();
            Components.Move.make(subExSx * toFloat(touchRatio));
            Components.Html.root.classList.add(classes.dragging);
            Events.emit("swipe.move");
          } else {
            return false;
          }
        }
      },
      end: function end(event) {
        if (!Glide2.disabled) {
          var settings = Glide2.settings;
          var swipe = this.touches(event);
          var threshold = this.threshold(event);
          var swipeDistance = swipe.pageX - swipeStartX;
          var swipeDeg = swipeSin * 180 / Math.PI;
          var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);
          this.enable();
          if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
            if (settings.perTouch) {
              steps = Math.min(steps, toInt(settings.perTouch));
            }
            if (Components.Direction.is("rtl")) {
              steps = -steps;
            }
            Components.Run.make(Components.Direction.resolve("<" + steps));
          } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
            if (settings.perTouch) {
              steps = Math.max(steps, -toInt(settings.perTouch));
            }
            if (Components.Direction.is("rtl")) {
              steps = -steps;
            }
            Components.Run.make(Components.Direction.resolve(">" + steps));
          } else {
            Components.Move.make();
          }
          Components.Html.root.classList.remove(settings.classes.dragging);
          this.unbindSwipeMove();
          this.unbindSwipeEnd();
          Events.emit("swipe.end");
        }
      },
      bindSwipeStart: function bindSwipeStart() {
        var _this = this;
        var settings = Glide2.settings;
        if (settings.swipeThreshold) {
          Binder.on(START_EVENTS[0], Components.Html.wrapper, function(event) {
            _this.start(event);
          }, capture);
        }
        if (settings.dragThreshold) {
          Binder.on(START_EVENTS[1], Components.Html.wrapper, function(event) {
            _this.start(event);
          }, capture);
        }
      },
      unbindSwipeStart: function unbindSwipeStart() {
        Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
        Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
      },
      bindSwipeMove: function bindSwipeMove() {
        var _this2 = this;
        Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function(event) {
          _this2.move(event);
        }, Glide2.settings.throttle), capture);
      },
      unbindSwipeMove: function unbindSwipeMove() {
        Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
      },
      bindSwipeEnd: function bindSwipeEnd() {
        var _this3 = this;
        Binder.on(END_EVENTS, Components.Html.wrapper, function(event) {
          _this3.end(event);
        });
      },
      unbindSwipeEnd: function unbindSwipeEnd() {
        Binder.off(END_EVENTS, Components.Html.wrapper);
      },
      touches: function touches(event) {
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return event;
        }
        return event.touches[0] || event.changedTouches[0];
      },
      threshold: function threshold(event) {
        var settings = Glide2.settings;
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return settings.dragThreshold;
        }
        return settings.swipeThreshold;
      },
      enable: function enable() {
        disabled = false;
        Components.Transition.enable();
        return this;
      },
      disable: function disable() {
        disabled = true;
        Components.Transition.disable();
        return this;
      }
    };
    Events.on("build.after", function() {
      Components.Html.root.classList.add(Glide2.settings.classes.swipeable);
    });
    Events.on("destroy", function() {
      Swipe2.unbindSwipeStart();
      Swipe2.unbindSwipeMove();
      Swipe2.unbindSwipeEnd();
      Binder.destroy();
    });
    return Swipe2;
  }
  function Images(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var Images2 = {
      mount: function mount2() {
        this.bind();
      },
      bind: function bind() {
        Binder.on("dragstart", Components.Html.wrapper, this.dragstart);
      },
      unbind: function unbind() {
        Binder.off("dragstart", Components.Html.wrapper);
      },
      dragstart: function dragstart(event) {
        event.preventDefault();
      }
    };
    Events.on("destroy", function() {
      Images2.unbind();
      Binder.destroy();
    });
    return Images2;
  }
  function Anchors(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var detached = false;
    var prevented = false;
    var Anchors2 = {
      mount: function mount2() {
        this._a = Components.Html.wrapper.querySelectorAll("a");
        this.bind();
      },
      bind: function bind() {
        Binder.on("click", Components.Html.wrapper, this.click);
      },
      unbind: function unbind() {
        Binder.off("click", Components.Html.wrapper);
      },
      click: function click(event) {
        if (prevented) {
          event.stopPropagation();
          event.preventDefault();
        }
      },
      detach: function detach() {
        prevented = true;
        if (!detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = false;
            this.items[i].setAttribute("data-href", this.items[i].getAttribute("href"));
            this.items[i].removeAttribute("href");
          }
          detached = true;
        }
        return this;
      },
      attach: function attach() {
        prevented = false;
        if (detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = true;
            this.items[i].setAttribute("href", this.items[i].getAttribute("data-href"));
          }
          detached = false;
        }
        return this;
      }
    };
    define(Anchors2, "items", {
      get: function get3() {
        return Anchors2._a;
      }
    });
    Events.on("swipe.move", function() {
      Anchors2.detach();
    });
    Events.on("swipe.end", function() {
      Components.Transition.after(function() {
        Anchors2.attach();
      });
    });
    Events.on("destroy", function() {
      Anchors2.attach();
      Anchors2.unbind();
      Binder.destroy();
    });
    return Anchors2;
  }
  var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
  var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
  function Controls(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var capture = supportsPassive$1 ? {passive: true} : false;
    var Controls2 = {
      mount: function mount2() {
        this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
        this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
        this.addBindings();
      },
      setActive: function setActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.addClass(this._n[i].children);
        }
      },
      removeActive: function removeActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.removeClass(this._n[i].children);
        }
      },
      addClass: function addClass(controls) {
        var settings = Glide2.settings;
        var item = controls[Glide2.index];
        if (item) {
          item.classList.add(settings.classes.activeNav);
          siblings(item).forEach(function(sibling) {
            sibling.classList.remove(settings.classes.activeNav);
          });
        }
      },
      removeClass: function removeClass(controls) {
        var item = controls[Glide2.index];
        if (item) {
          item.classList.remove(Glide2.settings.classes.activeNav);
        }
      },
      addBindings: function addBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.bind(this._c[i].children);
        }
      },
      removeBindings: function removeBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.unbind(this._c[i].children);
        }
      },
      bind: function bind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.on("click", elements[i], this.click);
          Binder.on("touchstart", elements[i], this.click, capture);
        }
      },
      unbind: function unbind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.off(["click", "touchstart"], elements[i]);
        }
      },
      click: function click(event) {
        event.preventDefault();
        Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute("data-glide-dir")));
      }
    };
    define(Controls2, "items", {
      get: function get3() {
        return Controls2._c;
      }
    });
    Events.on(["mount.after", "move.after"], function() {
      Controls2.setActive();
    });
    Events.on("destroy", function() {
      Controls2.removeBindings();
      Controls2.removeActive();
      Binder.destroy();
    });
    return Controls2;
  }
  function Keyboard(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var Keyboard2 = {
      mount: function mount2() {
        if (Glide2.settings.keyboard) {
          this.bind();
        }
      },
      bind: function bind() {
        Binder.on("keyup", document, this.press);
      },
      unbind: function unbind() {
        Binder.off("keyup", document);
      },
      press: function press(event) {
        if (event.keyCode === 39) {
          Components.Run.make(Components.Direction.resolve(">"));
        }
        if (event.keyCode === 37) {
          Components.Run.make(Components.Direction.resolve("<"));
        }
      }
    };
    Events.on(["destroy", "update"], function() {
      Keyboard2.unbind();
    });
    Events.on("update", function() {
      Keyboard2.mount();
    });
    Events.on("destroy", function() {
      Binder.destroy();
    });
    return Keyboard2;
  }
  function Autoplay(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var Autoplay2 = {
      mount: function mount2() {
        this.start();
        if (Glide2.settings.hoverpause) {
          this.bind();
        }
      },
      start: function start() {
        var _this = this;
        if (Glide2.settings.autoplay) {
          if (isUndefined(this._i)) {
            this._i = setInterval(function() {
              _this.stop();
              Components.Run.make(">");
              _this.start();
            }, this.time);
          }
        }
      },
      stop: function stop() {
        this._i = clearInterval(this._i);
      },
      bind: function bind() {
        var _this2 = this;
        Binder.on("mouseover", Components.Html.root, function() {
          _this2.stop();
        });
        Binder.on("mouseout", Components.Html.root, function() {
          _this2.start();
        });
      },
      unbind: function unbind() {
        Binder.off(["mouseover", "mouseout"], Components.Html.root);
      }
    };
    define(Autoplay2, "time", {
      get: function get3() {
        var autoplay = Components.Html.slides[Glide2.index].getAttribute("data-glide-autoplay");
        if (autoplay) {
          return toInt(autoplay);
        }
        return toInt(Glide2.settings.autoplay);
      }
    });
    Events.on(["destroy", "update"], function() {
      Autoplay2.unbind();
    });
    Events.on(["run.before", "pause", "destroy", "swipe.start", "update"], function() {
      Autoplay2.stop();
    });
    Events.on(["run.after", "play", "swipe.end"], function() {
      Autoplay2.start();
    });
    Events.on("update", function() {
      Autoplay2.mount();
    });
    Events.on("destroy", function() {
      Binder.destroy();
    });
    return Autoplay2;
  }
  function sortBreakpoints(points) {
    if (isObject(points)) {
      return sortKeys(points);
    } else {
      warn("Breakpoints option must be an object");
    }
    return {};
  }
  function Breakpoints(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var settings = Glide2.settings;
    var points = sortBreakpoints(settings.breakpoints);
    var defaults2 = _extends({}, settings);
    var Breakpoints2 = {
      match: function match(points2) {
        if (typeof window.matchMedia !== "undefined") {
          for (var point in points2) {
            if (points2.hasOwnProperty(point)) {
              if (window.matchMedia("(max-width: " + point + "px)").matches) {
                return points2[point];
              }
            }
          }
        }
        return defaults2;
      }
    };
    _extends(settings, Breakpoints2.match(points));
    Binder.on("resize", window, throttle(function() {
      Glide2.settings = mergeOptions(settings, Breakpoints2.match(points));
    }, Glide2.settings.throttle));
    Events.on("update", function() {
      points = sortBreakpoints(points);
      defaults2 = _extends({}, settings);
    });
    Events.on("destroy", function() {
      Binder.off("resize", window);
    });
    return Breakpoints2;
  }
  var COMPONENTS = {
    Html,
    Translate,
    Transition,
    Direction,
    Peek,
    Sizes,
    Gaps,
    Move,
    Clones,
    Resize,
    Build,
    Run,
    Swipe,
    Images,
    Anchors,
    Controls,
    Keyboard,
    Autoplay,
    Breakpoints
  };
  var Glide$1 = function(_Core) {
    inherits(Glide$$1, _Core);
    function Glide$$1() {
      classCallCheck(this, Glide$$1);
      return possibleConstructorReturn(this, (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(this, arguments));
    }
    createClass(Glide$$1, [{
      key: "mount",
      value: function mount2() {
        var extensions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return get(Glide$$1.prototype.__proto__ || Object.getPrototypeOf(Glide$$1.prototype), "mount", this).call(this, _extends({}, COMPONENTS, extensions));
      }
    }]);
    return Glide$$1;
  }(Glide);
  var glide_esm_default = Glide$1;

  // _includes/js/slider.js
  var Slider = class {
    constructor() {
      const sliderOptions = {
        type: "slider",
        perView: 2,
        gap: 24,
        peek: {
          before: 0,
          after: 100
        },
        perTouch: 1,
        rewind: false,
        animationTimingFunc: "ease",
        breakpoints: {
          1e3: {
            perView: 1,
            gap: 16
          },
          600: {
            perView: 1,
            gap: 12
          }
        }
      };
      this.init();
      this.mountSlider(sliderOptions);
    }
    init() {
      this.slider = {};
    }
    mountSlider(options) {
      this.slider = new glide_esm_default(".glide", options);
      this.slider.mount();
    }
  };

  // _includes/js/locations.js
  var Locations = class {
    data = LOCATION_DATA;
    BUTTON_NAME = "locations__navigation-button";
    CONTENT_NAME = "locations__content";
    CONTENT_HIDDEN_CLASS = this.CONTENT_NAME + "--hidden";
    BUTTON_SELECTED_CLASS = this.BUTTON_NAME + "--selected";
    locationContainers = [];
    locationButtons = [];
    locationIndicator;
    timeouts = [];
    constructor() {
      this.loadLocationContainers();
      this.loadLocationLinks();
      this.loadLocationIndicator();
      this.renderSelectedLocation(this.data[0].name);
    }
    linkId = (locationName) => `${this.BUTTON_NAME}-${locationName}`;
    contentClassName = (locationName) => `${this.CONTENT_NAME}-${locationName}`;
    loadLocationIndicator = () => {
      this.locationIndicator = document.getElementById("locations__navigation-indicator");
    };
    loadLocationLinks = () => {
      this.locationButtons = this.data.map((location) => {
        const link = document.getElementById(this.linkId(location.name));
        if (link) {
          link.addEventListener("click", () => this.renderSelectedLocation(location.name));
        }
        return link;
      });
    };
    loadLocationContainers = () => {
      this.locationContainers = this.data.map((location) => document.getElementsByClassName(this.contentClassName(location.name))).reduce((acc, current) => [...acc, ...current], []);
    };
    renderSelectedLocation = (newName) => {
      this.locationButtons.forEach((locationLink) => {
        const isSelected = locationLink.id === this.linkId(newName);
        if (isSelected) {
          this.locationIndicator.style.top = locationLink.offsetTop + locationLink.clientHeight / 2;
          locationLink.classList.add(this.BUTTON_SELECTED_CLASS);
        } else {
          locationLink.classList.remove(this.BUTTON_SELECTED_CLASS);
        }
      });
      this.timeouts = this.timeouts.map(clearTimeout);
      this.locationContainers.forEach((locationContainer) => {
        const isShown = locationContainer.classList.contains(this.contentClassName(newName));
        let animationCallback;
        if (isShown) {
          locationContainer.style.display = "block";
          animationCallback = () => {
            locationContainer.classList.remove(this.CONTENT_HIDDEN_CLASS);
          };
        } else {
          locationContainer.classList.add(this.CONTENT_HIDDEN_CLASS);
          animationCallback = () => {
            locationContainer.style.display = "none";
          };
        }
        const timeout = setTimeout(animationCallback, 200);
        this.timeouts.push(timeout);
      });
    };
  };

  // _includes/js/main.js
  (() => {
    new Locations();
    new Slider();
  })();
})();
