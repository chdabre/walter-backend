/**
* @module vue-mdc-adapter 0.17.0
* @exports VueMDCAdapter
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCAdapter = factory());
}(this, (function () { 'use strict';

  var supportsPassive_ = void 0;

  /**
   * Determine whether the current browser supports passive event listeners, and if so, use them.
   * @param {!Window=} globalObj
   * @param {boolean=} forceRefresh
   * @return {boolean|{passive: boolean}}
   */
  function applyPassive() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_ === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, {
          get passive() {
            isSupported = { passive: true };
          }
        });
      } catch (e) {
        //empty
      }

      supportsPassive_ = isSupported;
    }

    return supportsPassive_;
  }

  function autoInit(plugin) {
    // Auto-install
    var _Vue = null;
    if (typeof window !== 'undefined') {
      _Vue = window.Vue;
    } else if (typeof global !== 'undefined') {
      /*global global*/
      _Vue = global.Vue;
    }
    if (_Vue) {
      _Vue.use(plugin);
    }
  }

  function BasePlugin(components) {
    return {
      version: '0.17.0',
      install: function install(vm) {
        for (var key in components) {
          var component = components[key];
          vm.component(component.name, component);
        }
      },
      components: components
    };
  }

  var CustomElement = {
    functional: true,
    render: function render(createElement, context) {
      return createElement(context.props.is || context.props.tag || 'div', context.data, context.children);
    }
  };

  var CustomElementMixin = {
    components: {
      CustomElement: CustomElement
    }
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
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

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
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
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var CustomLink = {
    name: 'custom-link',
    functional: true,
    props: {
      tag: { type: String, default: 'a' },
      link: Object
    },
    render: function render(h, context) {
      var element = void 0;
      var data = _extends({}, context.data);

      if (context.props.link && context.parent.$router) {
        // router-link case
        element = context.parent.$root.$options.components['router-link'];
        data.props = _extends({ tag: context.props.tag }, context.props.link);
        if (data.on.click) {
          data.nativeOn = { click: data.on.click };
        }
      } else {
        // element fallback
        element = context.props.tag;
      }

      return h(element, data, context.children);
    }
  };

  var CustomLinkMixin = {
    props: {
      to: [String, Object],
      exact: Boolean,
      append: Boolean,
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String
    },
    computed: {
      link: function link() {
        return this.to && {
          to: this.to,
          exact: this.exact,
          append: this.append,
          replace: this.replace,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass
        };
      }
    },
    components: {
      CustomLink: CustomLink
    }
  };

  /* global CustomEvent */

  function emitCustomEvent(el, evtType, evtData) {
    var shouldBubble = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var evt = void 0;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }
    el.dispatchEvent(evt);
  }

  var CustomButton = {
    name: 'custom-button',
    functional: true,
    props: {
      link: Object
    },
    render: function render(h, context) {
      var element = void 0;
      var data = _extends({}, context.data);

      if (context.props.link && context.parent.$router) {
        // router-link case
        element = context.parent.$root.$options.components['router-link'];
        data.props = _extends({ tag: context.props.tag }, context.props.link);
        data.attrs.role = 'button';
        if (data.on.click) {
          data.nativeOn = { click: data.on.click };
        }
      } else if (data.attrs && data.attrs.href) {
        // href case
        element = 'a';
        data.attrs.role = 'button';
      } else {
        // button fallback
        element = 'button';
      }

      return h(element, data, context.children);
    }
  };

  var CustomButtonMixin = {
    props: {
      href: String,
      disabled: Boolean,
      to: [String, Object],
      exact: Boolean,
      append: Boolean,
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String
    },
    computed: {
      link: function link() {
        return this.to && {
          to: this.to,
          exact: this.exact,
          append: this.append,
          replace: this.replace,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass
        };
      }
    },
    components: {
      CustomButton: CustomButton
    }
  };

  function extractIconProp(iconProp) {
    if (typeof iconProp === 'string') {
      return {
        classes: { 'material-icons': true },
        content: iconProp
      };
    } else if (iconProp instanceof Array) {
      return {
        classes: iconProp.reduce(function (result, value) {
          return _extends(result, defineProperty({}, value, true));
        }, {})
      };
    } else if ((typeof iconProp === 'undefined' ? 'undefined' : _typeof(iconProp)) === 'object') {
      return {
        classes: iconProp.className.split(' ').reduce(function (result, value) {
          return _extends(result, defineProperty({}, value, true));
        }, {}),
        content: iconProp.textContent
      };
    }
  }

  var DispatchEventMixin = {
    props: {
      event: String,
      'event-target': Object,
      'event-args': Array
    },
    methods: {
      dispatchEvent: function dispatchEvent(evt) {
        evt && this.$emit(evt.type, evt);
        if (this.event) {
          var target = this.eventTarget || this.$root;
          var args = this.eventArgs || [];
          target.$emit.apply(target, [this.event].concat(toConsumableArray(args)));
        }
      }
    },
    computed: {
      listeners: function listeners() {
        var _this = this;

        return _extends({}, this.$listeners, {
          click: function click(e) {
            return _this.dispatchEvent(e);
          }
        });
      }
    }
  };

  var DispatchFocusMixin = {
    data: function data() {
      return { hasFocus: false };
    },

    methods: {
      onMouseDown: function onMouseDown() {
        this._active = true;
      },
      onMouseUp: function onMouseUp() {
        this._active = false;
      },
      onFocusEvent: function onFocusEvent() {
        var _this = this;

        // dispatch async to let time to other focus event to propagate
        setTimeout(function () {
          return _this.dispatchFocusEvent();
        }, 0);
      },
      onBlurEvent: function onBlurEvent() {
        var _this2 = this;

        // dispatch async to let time to other focus event to propagate
        // also filtur blur if mousedown
        this._active || setTimeout(function () {
          return _this2.dispatchFocusEvent();
        }, 0);
      },
      dispatchFocusEvent: function dispatchFocusEvent() {
        var hasFocus = this.$el === document.activeElement || this.$el.contains(document.activeElement);
        if (hasFocus != this.hasFocus) {
          this.$emit(hasFocus ? 'focus' : 'blur');
          this.hasFocus = hasFocus;
        }
      }
    },
    mounted: function mounted() {
      this.$el.addEventListener('focusin', this.onFocusEvent);
      this.$el.addEventListener('focusout', this.onBlurEvent);
      this.$el.addEventListener('mousedown', this.onMouseDown);
      this.$el.addEventListener('mouseup', this.onMouseUp);
    },
    beforeDestroy: function beforeDestroy() {
      this.$el.removeEventListener('focusin', this.onFocusEvent);
      this.$el.removeEventListener('focusout', this.onBlurEvent);
      this.$el.removeEventListener('mousedown', this.onMouseDown);
      this.$el.removeEventListener('mouseup', this.onMouseUp);
    }
  };

  var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

  var VMAUniqueIdMixin = {
    beforeCreate: function beforeCreate() {
      this.vma_uid_ = scope + this._uid;
    }
  };

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @template A
   */
  var MDCFoundation = function () {
    createClass(MDCFoundation, null, [{
      key: "cssClasses",

      /** @return enum{cssClasses} */
      get: function get$$1() {
        // Classes extending MDCFoundation should implement this method to return an object which exports every
        // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
        return {};
      }

      /** @return enum{strings} */

    }, {
      key: "strings",
      get: function get$$1() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
        return {};
      }

      /** @return enum{numbers} */

    }, {
      key: "numbers",
      get: function get$$1() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
        return {};
      }

      /** @return {!Object} */

    }, {
      key: "defaultAdapter",
      get: function get$$1() {
        // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
        // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
        // validation.
        return {};
      }

      /**
       * @param {A=} adapter
       */

    }]);

    function MDCFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, MDCFoundation);

      /** @protected {!A} */
      this.adapter_ = adapter;
    }

    createClass(MDCFoundation, [{
      key: "init",
      value: function init() {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
      }
    }, {
      key: "destroy",
      value: function destroy() {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
      }
    }]);
    return MDCFoundation;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Ripple. Provides an interface for managing
   * - classes
   * - dom
   * - CSS variables
   * - position
   * - dimensions
   * - scroll position
   * - event handlers
   * - unbounded, active and disabled states
   *
   * Additionally, provides type information for the adapter to the Closure
   * compiler.
   *
   * Implement this adapter for your framework of choice to delegate updates to
   * the component in your framework of choice. See architecture documentation
   * for more details.
   * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
   *
   * @record
   */
  var MDCRippleAdapter = function () {
    function MDCRippleAdapter() {
      classCallCheck(this, MDCRippleAdapter);
    }

    createClass(MDCRippleAdapter, [{
      key: "browserSupportsCssVars",

      /** @return {boolean} */
      value: function browserSupportsCssVars() {}

      /** @return {boolean} */

    }, {
      key: "isUnbounded",
      value: function isUnbounded() {}

      /** @return {boolean} */

    }, {
      key: "isSurfaceActive",
      value: function isSurfaceActive() {}

      /** @return {boolean} */

    }, {
      key: "isSurfaceDisabled",
      value: function isSurfaceDisabled() {}

      /** @param {string} className */

    }, {
      key: "addClass",
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /** @param {!EventTarget} target */

    }, {
      key: "containsEventTarget",
      value: function containsEventTarget(target) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "registerDocumentInteractionHandler",
      value: function registerDocumentInteractionHandler(evtType, handler) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "deregisterDocumentInteractionHandler",
      value: function deregisterDocumentInteractionHandler(evtType, handler) {}

      /**
       * @param {!Function} handler
       */

    }, {
      key: "registerResizeHandler",
      value: function registerResizeHandler(handler) {}

      /**
       * @param {!Function} handler
       */

    }, {
      key: "deregisterResizeHandler",
      value: function deregisterResizeHandler(handler) {}

      /**
       * @param {string} varName
       * @param {?number|string} value
       */

    }, {
      key: "updateCssVariable",
      value: function updateCssVariable(varName, value) {}

      /** @return {!ClientRect} */

    }, {
      key: "computeBoundingRect",
      value: function computeBoundingRect() {}

      /** @return {{x: number, y: number}} */

    }, {
      key: "getWindowPageOffset",
      value: function getWindowPageOffset() {}
    }]);
    return MDCRippleAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
  };

  var strings = {
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
  };

  var numbers = {
    PADDING: 10,
    INITIAL_ORIGIN_SCALE: 0.6,
    DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
    FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
    TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
  };

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
   * @private {boolean|undefined}
   */
  var supportsCssVariables_ = void 0;

  /**
   * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
   * @private {boolean|undefined}
   */
  var supportsPassive_$1 = void 0;

  /**
   * @param {!Window} windowObj
   * @return {boolean}
   */
  function detectEdgePseudoVarBug(windowObj) {
    // Detect versions of Edge with buggy var() support
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
    var document = windowObj.document;
    var node = document.createElement('div');
    node.className = 'mdc-ripple-surface--test-edge-var-bug';
    document.body.appendChild(node);

    // The bug exists if ::before style ends up propagating to the parent element.
    // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
    // but Firefox is known to support CSS custom properties correctly.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = windowObj.getComputedStyle(node);
    var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
    node.remove();
    return hasPseudoVarBug;
  }

  /**
   * @param {!Window} windowObj
   * @param {boolean=} forceRefresh
   * @return {boolean|undefined}
   */

  function supportsCssVariables(windowObj) {
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var supportsCssVariables = supportsCssVariables_;
    if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
      return supportsCssVariables;
    }

    var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
    if (!supportsFunctionPresent) {
      return;
    }

    var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
    // See: https://bugs.webkit.org/show_bug.cgi?id=154669
    // See: README section on Safari
    var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

    if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
      supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
    } else {
      supportsCssVariables = false;
    }

    if (!forceRefresh) {
      supportsCssVariables_ = supportsCssVariables;
    }
    return supportsCssVariables;
  }

  //
  /**
   * Determine whether the current browser supports passive event listeners, and if so, use them.
   * @param {!Window=} globalObj
   * @param {boolean=} forceRefresh
   * @return {boolean|{passive: boolean}}
   */
  function applyPassive$1() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_$1 === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, { get passive() {
            isSupported = true;
          } });
      } catch (e) {}

      supportsPassive_$1 = isSupported;
    }

    return supportsPassive_$1 ? { passive: true } : false;
  }

  /**
   * @param {!Object} HTMLElementPrototype
   * @return {!Array<string>}
   */
  function getMatchesProperty(HTMLElementPrototype) {
    return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
      return p in HTMLElementPrototype;
    }).pop();
  }

  /**
   * @param {!Event} ev
   * @param {{x: number, y: number}} pageOffset
   * @param {!ClientRect} clientRect
   * @return {{x: number, y: number}}
   */
  function getNormalizedEventCoords(ev, pageOffset, clientRect) {
    var x = pageOffset.x,
        y = pageOffset.y;

    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;

    var normalizedX = void 0;
    var normalizedY = void 0;
    // Determine touch point relative to the ripple container.
    if (ev.type === 'touchstart') {
      normalizedX = ev.changedTouches[0].pageX - documentX;
      normalizedY = ev.changedTouches[0].pageY - documentY;
    } else {
      normalizedX = ev.pageX - documentX;
      normalizedY = ev.pageY - documentY;
    }

    return { x: normalizedX, y: normalizedY };
  }

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  // Activation events registered on the root element of each instance for activation
  var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

  // Deactivation events registered on documentElement when a pointer-related down event occurs
  var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

  // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
  /** @type {!Array<!EventTarget>} */
  var activatedTargets = [];

  /**
   * @extends {MDCFoundation<!MDCRippleAdapter>}
   */

  var MDCRippleFoundation = function (_MDCFoundation) {
    inherits(MDCRippleFoundation, _MDCFoundation);
    createClass(MDCRippleFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
      }
    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
          isUnbounded: function isUnbounded() /* boolean */{},
          isSurfaceActive: function isSurfaceActive() /* boolean */{},
          isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
          registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
          computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
          getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
        };
      }
    }]);

    function MDCRippleFoundation(adapter) {
      classCallCheck(this, MDCRippleFoundation);

      /** @private {number} */
      var _this = possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

      _this.layoutFrame_ = 0;

      /** @private {!ClientRect} */
      _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

      /** @private {!ActivationStateType} */
      _this.activationState_ = _this.defaultActivationState_();

      /** @private {number} */
      _this.initialSize_ = 0;

      /** @private {number} */
      _this.maxRadius_ = 0;

      /** @private {function(!Event)} */
      _this.activateHandler_ = function (e) {
        return _this.activate_(e);
      };

      /** @private {function(!Event)} */
      _this.deactivateHandler_ = function (e) {
        return _this.deactivate_(e);
      };

      /** @private {function(?Event=)} */
      _this.focusHandler_ = function () {
        return _this.handleFocus();
      };

      /** @private {function(?Event=)} */
      _this.blurHandler_ = function () {
        return _this.handleBlur();
      };

      /** @private {!Function} */
      _this.resizeHandler_ = function () {
        return _this.layout();
      };

      /** @private {{left: number, top:number}} */
      _this.unboundedCoords_ = {
        left: 0,
        top: 0
      };

      /** @private {number} */
      _this.fgScale_ = 0;

      /** @private {number} */
      _this.activationTimer_ = 0;

      /** @private {number} */
      _this.fgDeactivationRemovalTimer_ = 0;

      /** @private {boolean} */
      _this.activationAnimationHasEnded_ = false;

      /** @private {!Function} */
      _this.activationTimerCallback_ = function () {
        _this.activationAnimationHasEnded_ = true;
        _this.runDeactivationUXLogicIfReady_();
      };

      /** @private {?Event} */
      _this.previousActivationEvent_ = null;
      return _this;
    }

    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     * @return {boolean}
     * @private
     */


    createClass(MDCRippleFoundation, [{
      key: 'isSupported_',
      value: function isSupported_() {
        return this.adapter_.browserSupportsCssVars();
      }

      /**
       * @return {!ActivationStateType}
       */

    }, {
      key: 'defaultActivationState_',
      value: function defaultActivationState_() {
        return {
          isActivated: false,
          hasDeactivationUXRun: false,
          wasActivatedByPointer: false,
          wasElementMadeActive: false,
          activationEvent: null,
          isProgrammatic: false
        };
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        if (!this.isSupported_()) {
          return;
        }
        this.registerRootHandlers_();

        var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
            ROOT = _MDCRippleFoundation$.ROOT,
            UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

        requestAnimationFrame(function () {
          _this2.adapter_.addClass(ROOT);
          if (_this2.adapter_.isUnbounded()) {
            _this2.adapter_.addClass(UNBOUNDED);
            // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
            _this2.layoutInternal_();
          }
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        if (!this.isSupported_()) {
          return;
        }

        if (this.activationTimer_) {
          clearTimeout(this.activationTimer_);
          this.activationTimer_ = 0;
          var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

          this.adapter_.removeClass(FG_ACTIVATION);
        }

        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();

        var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
            ROOT = _MDCRippleFoundation$2.ROOT,
            UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

        requestAnimationFrame(function () {
          _this3.adapter_.removeClass(ROOT);
          _this3.adapter_.removeClass(UNBOUNDED);
          _this3.removeCssVars_();
        });
      }

      /** @private */

    }, {
      key: 'registerRootHandlers_',
      value: function registerRootHandlers_() {
        var _this4 = this;

        ACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
        });
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.registerResizeHandler(this.resizeHandler_);
        }
      }

      /**
       * @param {!Event} e
       * @private
       */

    }, {
      key: 'registerDeactivationHandlers_',
      value: function registerDeactivationHandlers_(e) {
        var _this5 = this;

        if (e.type === 'keydown') {
          this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
        } else {
          POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
          });
        }
      }

      /** @private */

    }, {
      key: 'deregisterRootHandlers_',
      value: function deregisterRootHandlers_() {
        var _this6 = this;

        ACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
        });
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        }
      }

      /** @private */

    }, {
      key: 'deregisterDeactivationHandlers_',
      value: function deregisterDeactivationHandlers_() {
        var _this7 = this;

        this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
        });
      }

      /** @private */

    }, {
      key: 'removeCssVars_',
      value: function removeCssVars_() {
        var _this8 = this;

        var strings$$1 = MDCRippleFoundation.strings;

        Object.keys(strings$$1).forEach(function (k) {
          if (k.indexOf('VAR_') === 0) {
            _this8.adapter_.updateCssVariable(strings$$1[k], null);
          }
        });
      }

      /**
       * @param {?Event} e
       * @private
       */

    }, {
      key: 'activate_',
      value: function activate_(e) {
        var _this9 = this;

        if (this.adapter_.isSurfaceDisabled()) {
          return;
        }

        var activationState = this.activationState_;
        if (activationState.isActivated) {
          return;
        }

        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent_;
        var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
        if (isSameInteraction) {
          return;
        }

        activationState.isActivated = true;
        activationState.isProgrammatic = e === null;
        activationState.activationEvent = e;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

        var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
          return _this9.adapter_.containsEventTarget(target);
        });
        if (hasActivatedChild) {
          // Immediately reset activation state, while preserving logic that prevents touch follow-on events
          this.resetActivationState_();
          return;
        }

        if (e) {
          activatedTargets.push( /** @type {!EventTarget} */e.target);
          this.registerDeactivationHandlers_(e);
        }

        activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }

        requestAnimationFrame(function () {
          // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
          activatedTargets = [];

          if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
            // If space was pressed, try again within an rAF call to detect :active, because different UAs report
            // active states inconsistently when they're called within event handling code:
            // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
            // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
            // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
            // variable is set within a rAF callback for a submit button interaction (#2241).
            activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);
            if (activationState.wasElementMadeActive) {
              _this9.animateActivation_();
            }
          }

          if (!activationState.wasElementMadeActive) {
            // Reset activation state immediately if element was not made active.
            _this9.activationState_ = _this9.defaultActivationState_();
          }
        });
      }

      /**
       * @param {?Event} e
       * @private
       */

    }, {
      key: 'checkElementMadeActive_',
      value: function checkElementMadeActive_(e) {
        return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
      }

      /**
       * @param {?Event=} event Optional event containing position information.
       */

    }, {
      key: 'activate',
      value: function activate() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.activate_(event);
      }

      /** @private */

    }, {
      key: 'animateActivation_',
      value: function animateActivation_() {
        var _this10 = this;

        var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
            VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
            VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
        var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
            FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
            FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


        this.layoutInternal_();

        var translateStart = '';
        var translateEnd = '';

        if (!this.adapter_.isUnbounded()) {
          var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
              startPoint = _getFgTranslationCoor.startPoint,
              endPoint = _getFgTranslationCoor.endPoint;

          translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
          translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
        }

        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter_.removeClass(FG_DEACTIVATION);

        // Force layout in order to re-trigger the animation.
        this.adapter_.computeBoundingRect();
        this.adapter_.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(function () {
          return _this10.activationTimerCallback_();
        }, DEACTIVATION_TIMEOUT_MS);
      }

      /**
       * @private
       * @return {{startPoint: PointType, endPoint: PointType}}
       */

    }, {
      key: 'getFgTranslationCoordinates_',
      value: function getFgTranslationCoordinates_() {
        var _activationState_ = this.activationState_,
            activationEvent = _activationState_.activationEvent,
            wasActivatedByPointer = _activationState_.wasActivatedByPointer;


        var startPoint = void 0;
        if (wasActivatedByPointer) {
          startPoint = getNormalizedEventCoords(
          /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
        } else {
          startPoint = {
            x: this.frame_.width / 2,
            y: this.frame_.height / 2
          };
        }
        // Center the element around the start point.
        startPoint = {
          x: startPoint.x - this.initialSize_ / 2,
          y: startPoint.y - this.initialSize_ / 2
        };

        var endPoint = {
          x: this.frame_.width / 2 - this.initialSize_ / 2,
          y: this.frame_.height / 2 - this.initialSize_ / 2
        };

        return { startPoint: startPoint, endPoint: endPoint };
      }

      /** @private */

    }, {
      key: 'runDeactivationUXLogicIfReady_',
      value: function runDeactivationUXLogicIfReady_() {
        var _this11 = this;

        // This method is called both when a pointing device is released, and when the activation animation ends.
        // The deactivation animation should only run after both of those occur.
        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _activationState_2 = this.activationState_,
            hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
            isActivated = _activationState_2.isActivated;

        var activationHasEnded = hasDeactivationUXRun || !isActivated;

        if (activationHasEnded && this.activationAnimationHasEnded_) {
          this.rmBoundedActivationClasses_();
          this.adapter_.addClass(FG_DEACTIVATION);
          this.fgDeactivationRemovalTimer_ = setTimeout(function () {
            _this11.adapter_.removeClass(FG_DEACTIVATION);
          }, numbers.FG_DEACTIVATION_MS);
        }
      }

      /** @private */

    }, {
      key: 'rmBoundedActivationClasses_',
      value: function rmBoundedActivationClasses_() {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

        this.adapter_.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter_.computeBoundingRect();
      }
    }, {
      key: 'resetActivationState_',
      value: function resetActivationState_() {
        var _this12 = this;

        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function () {
          return _this12.previousActivationEvent_ = null;
        }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
      }

      /**
       * @param {?Event} e
       * @private
       */

    }, {
      key: 'deactivate_',
      value: function deactivate_(e) {
        var _this13 = this;

        var activationState = this.activationState_;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
          return;
        }

        var state = /** @type {!ActivationStateType} */_extends({}, activationState);

        if (activationState.isProgrammatic) {
          var evtObject = null;
          requestAnimationFrame(function () {
            return _this13.animateDeactivation_(evtObject, state);
          });
          this.resetActivationState_();
        } else {
          this.deregisterDeactivationHandlers_();
          requestAnimationFrame(function () {
            _this13.activationState_.hasDeactivationUXRun = true;
            _this13.animateDeactivation_(e, state);
            _this13.resetActivationState_();
          });
        }
      }

      /**
       * @param {?Event=} event Optional event containing position information.
       */

    }, {
      key: 'deactivate',
      value: function deactivate() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.deactivate_(event);
      }

      /**
       * @param {Event} e
       * @param {!ActivationStateType} options
       * @private
       */

    }, {
      key: 'animateDeactivation_',
      value: function animateDeactivation_(e, _ref) {
        var wasActivatedByPointer = _ref.wasActivatedByPointer,
            wasElementMadeActive = _ref.wasElementMadeActive;

        if (wasActivatedByPointer || wasElementMadeActive) {
          this.runDeactivationUXLogicIfReady_();
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        var _this14 = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(function () {
          _this14.layoutInternal_();
          _this14.layoutFrame_ = 0;
        });
      }

      /** @private */

    }, {
      key: 'layoutInternal_',
      value: function layoutInternal_() {
        var _this15 = this;

        this.frame_ = this.adapter_.computeBoundingRect();
        var maxDim = Math.max(this.frame_.height, this.frame_.width);

        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function getBoundedRadius() {
          var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
          return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };

        this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
        this.fgScale_ = this.maxRadius_ / this.initialSize_;

        this.updateLayoutCssVars_();
      }

      /** @private */

    }, {
      key: 'updateLayoutCssVars_',
      value: function updateLayoutCssVars_() {
        var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
            VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
            VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
            VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
            VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


        this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
        this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

        if (this.adapter_.isUnbounded()) {
          this.unboundedCoords_ = {
            left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
            top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
          };

          this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
          this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
        }
      }

      /** @param {boolean} unbounded */

    }, {
      key: 'setUnbounded',
      value: function setUnbounded(unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

        if (unbounded) {
          this.adapter_.addClass(UNBOUNDED);
        } else {
          this.adapter_.removeClass(UNBOUNDED);
        }
      }
    }, {
      key: 'handleFocus',
      value: function handleFocus() {
        var _this16 = this;

        requestAnimationFrame(function () {
          return _this16.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    }, {
      key: 'handleBlur',
      value: function handleBlur() {
        var _this17 = this;

        requestAnimationFrame(function () {
          return _this17.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    }]);
    return MDCRippleFoundation;
  }(MDCFoundation);

  var RippleBase = function (_MDCRippleFoundation) {
    inherits(RippleBase, _MDCRippleFoundation);
    createClass(RippleBase, null, [{
      key: 'isSurfaceActive',
      value: function isSurfaceActive(ref) {
        return ref[RippleBase.MATCHES](':active');
      }
    }, {
      key: 'MATCHES',
      get: function get$$1() {
        /* global HTMLElement */
        return RippleBase._matches || (RippleBase._matches = getMatchesProperty(HTMLElement.prototype));
      }
    }]);

    function RippleBase(vm, options) {
      classCallCheck(this, RippleBase);
      return possibleConstructorReturn(this, (RippleBase.__proto__ || Object.getPrototypeOf(RippleBase)).call(this, _extends({
        browserSupportsCssVars: function browserSupportsCssVars() {
          return supportsCssVariables(window);
        },
        isUnbounded: function isUnbounded() {
          return false;
        },
        isSurfaceActive: function isSurfaceActive() {
          return vm.$el[RippleBase.MATCHES](':active');
        },
        isSurfaceDisabled: function isSurfaceDisabled() {
          return vm.disabled;
        },
        addClass: function addClass(className) {
          vm.$set(vm.classes, className, true);
        },
        removeClass: function removeClass(className) {
          vm.$delete(vm.classes, className);
        },

        containsEventTarget: function containsEventTarget(target) {
          return vm.$el.contains(target);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          vm.$el.addEventListener(evt, handler, applyPassive$1());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          vm.$el.removeEventListener(evt, handler, applyPassive$1());
        },
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
          return document.documentElement.addEventListener(evtType, handler, applyPassive$1());
        },
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
          return document.documentElement.removeEventListener(evtType, handler, applyPassive$1());
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        updateCssVariable: function updateCssVariable(varName, value) {
          vm.$set(vm.styles, varName, value);
        },
        computeBoundingRect: function computeBoundingRect() {
          return vm.$el.getBoundingClientRect();
        },
        getWindowPageOffset: function getWindowPageOffset() {
          return { x: window.pageXOffset, y: window.pageYOffset };
        }
      }, options)));
    }

    return RippleBase;
  }(MDCRippleFoundation);

  var RippleMixin = {
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },
    mounted: function mounted() {
      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.ripple.destroy();
    }
  };

  var mdcRipple = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-element', { staticClass: "mdc-ripple", attrs: { "tag": _vm.tag, "classes": _vm.classes, "styles": _vm.styles } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-ripple',
    mixins: [CustomElementMixin, RippleMixin],
    props: {
      tag: String
    }
  };

  var VueMDCRipple = BasePlugin({
    mdcRipple: mdcRipple
  });

  var mdcButtonBase = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-button', _vm._g({ ref: "root", class: _vm.classes, style: _vm.styles, attrs: { "href": _vm.href, "link": _vm.link, "disabled": _vm.disabled } }, _vm.listeners), [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-button-base',
    mixins: [DispatchEventMixin, CustomButtonMixin, RippleMixin],
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    }
  };

  var mdcButton = {
    name: 'mdc-button',
    extends: mdcButtonBase,
    props: {
      raised: Boolean,
      unelevated: Boolean,
      outlined: Boolean,
      dense: Boolean
    },
    data: function data() {
      return {
        classes: {
          'mdc-button': true,
          'mdc-button--raised': this.raised,
          'mdc-button--unelevated': this.unelevated,
          'mdc-button--outlined': this.outlined,
          'mdc-button--dense': this.dense
        }
      };
    },

    watch: {
      raised: function raised() {
        this.$set(this.classes, 'mdc-button--raised', this.raised);
      },
      unelevated: function unelevated() {
        this.$set(this.classes, 'mdc-button--unelevated', this.unelevated);
      },
      outlined: function outlined() {
        this.$set(this.classes, 'mdc-button--outlined', this.outlined);
      },
      dense: function dense() {
        this.$set(this.classes, 'mdc-button--dense', this.dense);
      }
    }
  };

  var VueMDCButton = BasePlugin({
    mdcButton: mdcButton
  });

  var mdcCard = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-card", class: { 'mdc-card--outlined': _vm.outlined } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-card',
    props: {
      outlined: Boolean
    }
  };

  var mdcCardPrimaryAction = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-link', _vm._g({ staticClass: "mdc-card-primary-action mdc-card__primary-action", class: _vm.classes, style: _vm.styles, attrs: { "link": _vm.link } }, _vm.listeners), [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-card-primary-action',
    mixins: [DispatchEventMixin, CustomLinkMixin, RippleMixin],
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    }
  };

  var mdcCardMedia = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-card-media mdc-card__media", class: _vm.classes, style: _vm.styles }, [_vm.$slots.default ? _c('div', { staticClass: "mdc-card__media-content" }, [_vm._t("default")], 2) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-card-media',
    props: {
      src: String,
      square: Boolean
    },
    computed: {
      styles: function styles() {
        var styles = {
          backgroundImage: 'url(' + this.src + ')'
        };

        return styles;
      },
      classes: function classes() {
        return this.square ? 'mdc-card__media--square' : 'mdc-card__media--16-9';
      }
    }
  };

  var mdcCardHeader = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-card-header mdc-card__primary" }, [_vm._t("default", [_vm.title ? _c('h1', { staticClass: "mdc-card__title", class: { 'mdc-card__title--large': _vm.largeTitle } }, [_vm._v(" " + _vm._s(_vm.title) + " ")]) : _vm._e(), _vm._v(" "), _vm.subtitle ? _c('h2', { staticClass: "mdc-card__subtitle" }, [_vm._v(" " + _vm._s(_vm.subtitle) + " ")]) : _vm._e()])], 2);
    }, staticRenderFns: [],
    name: 'mdc-card-header',
    props: {
      title: String,
      subtitle: String,
      'large-title': { type: Boolean, default: true }
    }
  };

  var mdcCardTitle = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('h1', { staticClass: "mdc-card-title mdc-card__title", class: { 'mdc-card__title--large': _vm.large } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-card-title',
    props: {
      large: Boolean
    }
  };

  var mdcCardSubtitle = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('h2', { staticClass: "mdc-card-subtitle mdc-card__subtitle" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-card-subtitle'
  };

  var mdcCardText = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-card-text mdc-card__supporting-text" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-card-text'
  };

  var mdcCardActions = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-card-actions mdc-card__actions", class: _vm.classes }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-card-actions',
    props: {
      fullBleed: Boolean
    },
    computed: {
      classes: function classes() {
        return {
          'mdc-card__actions--full-bleed': this.fullBleed
        };
      }
    }
  };

  var mdcCardActionButtons = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-card-action-buttons mdc-card__action-buttons" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-card-action-buttons'
  };

  var mdcCardActionButton = {
    name: 'mdc-card-action-button',
    extends: mdcButtonBase,
    data: function data() {
      return {
        classes: {
          'mdc-button': true,
          'mdc-card__action': true,
          'mdc-card-action-button': true
        }
      };
    }
  };

  var mdcCardActionIcons = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-card-action-icons mdc-card__action-icons" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-card-action-icons'
  };

  var mdcCardActionIcon = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', _vm._g({ class: _vm.classes, style: _vm.styles }, _vm.listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
    }, staticRenderFns: [],
    name: 'mdc-card-action-icon',
    mixins: [DispatchEventMixin],
    props: {
      icon: String
    },
    data: function data() {
      return {
        classes: {
          'mdc-card-action-icon': true,
          'material-icons': !!this.icon,
          'mdc-card__action': true,
          'mdc-card__action--icon': true,
          'mdc-icon-toggle': true
        },
        styles: {}
      };
    },

    watch: {
      icon: function icon() {
        this.$set(this.classes, 'material-icons', !!this.icon);
      }
    },
    mounted: function mounted() {
      this.ripple = new RippleBase(this, {
        isUnbounded: function isUnbounded() {
          return true;
        }
      });
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.ripple.destroy();
    }
  };

  var VueMDCCard = BasePlugin({
    mdcCard: mdcCard,
    mdcCardPrimaryAction: mdcCardPrimaryAction,
    mdcCardMedia: mdcCardMedia,
    mdcCardHeader: mdcCardHeader,
    mdcCardTitle: mdcCardTitle,
    mdcCardSubtitle: mdcCardSubtitle,
    mdcCardText: mdcCardText,
    mdcCardActions: mdcCardActions,
    mdcCardActionButtons: mdcCardActionButtons,
    mdcCardActionButton: mdcCardActionButton,
    mdcCardActionIcons: mdcCardActionIcons,
    mdcCardActionIcon: mdcCardActionIcon
  });

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @template F
   */

  var MDCComponent = function () {
    createClass(MDCComponent, null, [{
      key: 'attachTo',

      /**
       * @param {!Element} root
       * @return {!MDCComponent}
       */
      value: function attachTo(root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new MDCFoundation());
      }

      /**
       * @param {!Element} root
       * @param {F=} foundation
       * @param {...?} args
       */

    }]);

    function MDCComponent(root) {
      var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      classCallCheck(this, MDCComponent);

      /** @protected {!Element} */
      this.root_ = root;

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      this.initialize.apply(this, args);
      // Note that we initialize foundation here and not within the constructor's default param so that
      // this.root_ is defined and can be used within the foundation class.
      /** @protected {!F} */
      this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
      this.foundation_.init();
      this.initialSyncWithDOM();
    }

    createClass(MDCComponent, [{
      key: 'initialize',
      value: function initialize() /* ...args */{}
      // Subclasses can override this to do any additional setup work that would be considered part of a
      // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
      // initialized. Any additional arguments besides root and foundation will be passed in here.


      /**
       * @return {!F} foundation
       */

    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        // Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation_.destroy();
      }

      /**
       * Wrapper method to add an event listener to the component's root element. This is most useful when
       * listening for custom events.
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: 'listen',
      value: function listen(evtType, handler) {
        this.root_.addEventListener(evtType, handler);
      }

      /**
       * Wrapper method to remove an event listener to the component's root element. This is most useful when
       * unlistening for custom events.
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: 'unlisten',
      value: function unlisten(evtType, handler) {
        this.root_.removeEventListener(evtType, handler);
      }

      /**
       * Fires a cross-browser-compatible custom event from the component root of the given type,
       * with the given data.
       * @param {string} evtType
       * @param {!Object} evtData
       * @param {boolean=} shouldBubble
       */

    }, {
      key: 'emit',
      value: function emit(evtType, evtData) {
        var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var evt = void 0;
        if (typeof CustomEvent === 'function') {
          evt = new CustomEvent(evtType, {
            detail: evtData,
            bubbles: shouldBubble
          });
        } else {
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }

        this.root_.dispatchEvent(evt);
      }
    }]);
    return MDCComponent;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends MDCComponent<!MDCRippleFoundation>
   */

  var MDCRipple = function (_MDCComponent) {
    inherits(MDCRipple, _MDCComponent);

    /** @param {...?} args */
    function MDCRipple() {
      var _ref;

      classCallCheck(this, MDCRipple);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /** @type {boolean} */
      var _this = possibleConstructorReturn(this, (_ref = MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).call.apply(_ref, [this].concat(args)));

      _this.disabled = false;

      /** @private {boolean} */
      _this.unbounded_;
      return _this;
    }

    /**
     * @param {!Element} root
     * @param {{isUnbounded: (boolean|undefined)}=} options
     * @return {!MDCRipple}
     */


    createClass(MDCRipple, [{
      key: 'setUnbounded_',


      /**
       * Closure Compiler throws an access control error when directly accessing a
       * protected or private property inside a getter/setter, like unbounded above.
       * By accessing the protected property inside a method, we solve that problem.
       * That's why this function exists.
       * @private
       */
      value: function setUnbounded_() {
        this.foundation_.setUnbounded(this.unbounded_);
      }
    }, {
      key: 'activate',
      value: function activate() {
        this.foundation_.activate();
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.foundation_.deactivate();
      }
    }, {
      key: 'layout',
      value: function layout() {
        this.foundation_.layout();
      }

      /** @return {!MDCRippleFoundation} */

    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        return new MDCRippleFoundation(MDCRipple.createAdapter(this));
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
      }
    }, {
      key: 'unbounded',


      /** @return {boolean} */
      get: function get$$1() {
        return this.unbounded_;
      }

      /** @param {boolean} unbounded */
      ,
      set: function set$$1(unbounded) {
        this.unbounded_ = Boolean(unbounded);
        this.setUnbounded_();
      }
    }], [{
      key: 'attachTo',
      value: function attachTo(root) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$isUnbounded = _ref2.isUnbounded,
            isUnbounded = _ref2$isUnbounded === undefined ? undefined : _ref2$isUnbounded;

        var ripple = new MDCRipple(root);
        // Only override unbounded behavior if option is explicitly specified
        if (isUnbounded !== undefined) {
          ripple.unbounded = /** @type {boolean} */isUnbounded;
        }
        return ripple;
      }

      /**
       * @param {!RippleCapableSurface} instance
       * @return {!MDCRippleAdapter}
       */

    }, {
      key: 'createAdapter',
      value: function createAdapter(instance) {
        var MATCHES = getMatchesProperty(HTMLElement.prototype);

        return {
          browserSupportsCssVars: function browserSupportsCssVars() {
            return supportsCssVariables(window);
          },
          isUnbounded: function isUnbounded() {
            return instance.unbounded;
          },
          isSurfaceActive: function isSurfaceActive() {
            return instance.root_[MATCHES](':active');
          },
          isSurfaceDisabled: function isSurfaceDisabled() {
            return instance.disabled;
          },
          addClass: function addClass(className) {
            return instance.root_.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return instance.root_.classList.remove(className);
          },
          containsEventTarget: function containsEventTarget(target) {
            return instance.root_.contains(target);
          },
          registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
            return instance.root_.addEventListener(evtType, handler, applyPassive$1());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
            return instance.root_.removeEventListener(evtType, handler, applyPassive$1());
          },
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.addEventListener(evtType, handler, applyPassive$1());
          },
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.removeEventListener(evtType, handler, applyPassive$1());
          },
          registerResizeHandler: function registerResizeHandler(handler) {
            return window.addEventListener('resize', handler);
          },
          deregisterResizeHandler: function deregisterResizeHandler(handler) {
            return window.removeEventListener('resize', handler);
          },
          updateCssVariable: function updateCssVariable(varName, value) {
            return instance.root_.style.setProperty(varName, value);
          },
          computeBoundingRect: function computeBoundingRect() {
            return instance.root_.getBoundingClientRect();
          },
          getWindowPageOffset: function getWindowPageOffset() {
            return { x: window.pageXOffset, y: window.pageYOffset };
          }
        };
      }
    }]);
    return MDCRipple;
  }(MDCComponent);

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @record
   */

  var MDCSelectionControl = function () {
    function MDCSelectionControl() {
      classCallCheck(this, MDCSelectionControl);
    }

    createClass(MDCSelectionControl, [{
      key: 'ripple',

      /** @return {?MDCRipple} */
      get: function get$$1() {}
    }]);
    return MDCSelectionControl;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Checkbox. Provides an interface for managing
   * - classes
   * - dom
   * - event handlers
   *
   * Additionally, provides type information for the adapter to the Closure
   * compiler.
   *
   * Implement this adapter for your framework of choice to delegate updates to
   * the component in your framework of choice. See architecture documentation
   * for more details.
   * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
   *
   * @record
   */

  var MDCCheckboxAdapter = function () {
    function MDCCheckboxAdapter() {
      classCallCheck(this, MDCCheckboxAdapter);
    }

    createClass(MDCCheckboxAdapter, [{
      key: 'addClass',

      /** @param {string} className */
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: 'removeClass',
      value: function removeClass(className) {}

      /**
       * Sets an attribute with a given value on the input element.
       * @param {string} attr
       * @param {string} value
       */

    }, {
      key: 'setNativeControlAttr',
      value: function setNativeControlAttr(attr, value) {}

      /**
       * Removes an attribute from the input element.
       * @param {string} attr
       */

    }, {
      key: 'removeNativeControlAttr',
      value: function removeNativeControlAttr(attr) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'registerAnimationEndHandler',
      value: function registerAnimationEndHandler(handler) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'deregisterAnimationEndHandler',
      value: function deregisterAnimationEndHandler(handler) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'registerChangeHandler',
      value: function registerChangeHandler(handler) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'deregisterChangeHandler',
      value: function deregisterChangeHandler(handler) {}

      /** @return {!MDCSelectionControlState} */

    }, {
      key: 'getNativeControl',
      value: function getNativeControl() {}
    }, {
      key: 'forceLayout',
      value: function forceLayout() {}

      /** @return {boolean} */

    }, {
      key: 'isAttachedToDOM',
      value: function isAttachedToDOM() {}
    }]);
    return MDCCheckboxAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @const {string} */
  var ROOT = 'mdc-checkbox';

  /** @enum {string} */
  var cssClasses$1 = {
    UPGRADED: 'mdc-checkbox--upgraded',
    CHECKED: 'mdc-checkbox--checked',
    INDETERMINATE: 'mdc-checkbox--indeterminate',
    DISABLED: 'mdc-checkbox--disabled',
    ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
    ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
    ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
    ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
    ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
    ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked'
  };

  /** @enum {string} */
  var strings$1 = {
    NATIVE_CONTROL_SELECTOR: '.' + ROOT + '__native-control',
    TRANSITION_STATE_INIT: 'init',
    TRANSITION_STATE_CHECKED: 'checked',
    TRANSITION_STATE_UNCHECKED: 'unchecked',
    TRANSITION_STATE_INDETERMINATE: 'indeterminate',
    ARIA_CHECKED_ATTR: 'aria-checked',
    ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed'
  };

  /** @enum {number} */
  var numbers$1 = {
    ANIM_END_LATCH_MS: 250
  };

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @const {!Array<string>} */
  var CB_PROTO_PROPS = ['checked', 'indeterminate'];

  /**
   * @extends {MDCFoundation<!MDCCheckboxAdapter>}
   */

  var MDCCheckboxFoundation = function (_MDCFoundation) {
    inherits(MDCCheckboxFoundation, _MDCFoundation);
    createClass(MDCCheckboxFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses$1;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$1;
      }

      /** @return enum {numbers} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers$1;
      }

      /** @return {!MDCCheckboxAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCCheckboxAdapter} */{
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            setNativeControlAttr: function setNativeControlAttr() /* attr: string, value: string */{},
            removeNativeControlAttr: function removeNativeControlAttr() /* attr: string */{},
            registerAnimationEndHandler: function registerAnimationEndHandler() /* handler: EventListener */{},
            deregisterAnimationEndHandler: function deregisterAnimationEndHandler() /* handler: EventListener */{},
            registerChangeHandler: function registerChangeHandler() /* handler: EventListener */{},
            deregisterChangeHandler: function deregisterChangeHandler() /* handler: EventListener */{},
            getNativeControl: function getNativeControl() /* !MDCSelectionControlState */{},
            forceLayout: function forceLayout() {},
            isAttachedToDOM: function isAttachedToDOM() /* boolean */{}
          }
        );
      }
    }]);

    function MDCCheckboxFoundation(adapter) {
      classCallCheck(this, MDCCheckboxFoundation);

      /** @private {string} */
      var _this = possibleConstructorReturn(this, (MDCCheckboxFoundation.__proto__ || Object.getPrototypeOf(MDCCheckboxFoundation)).call(this, _extends(MDCCheckboxFoundation.defaultAdapter, adapter)));

      _this.currentCheckState_ = strings$1.TRANSITION_STATE_INIT;

      /** @private {string} */
      _this.currentAnimationClass_ = '';

      /** @private {number} */
      _this.animEndLatchTimer_ = 0;

      _this.animEndHandler_ = /** @private {!EventListener} */function () {
        return _this.handleAnimationEnd();
      };

      _this.changeHandler_ = /** @private {!EventListener} */function () {
        return _this.handleChange();
      };
      return _this;
    }

    createClass(MDCCheckboxFoundation, [{
      key: 'init',
      value: function init() {
        this.currentCheckState_ = this.determineCheckState_(this.getNativeControl_());
        this.updateAriaChecked_();
        this.adapter_.addClass(cssClasses$1.UPGRADED);
        this.adapter_.registerChangeHandler(this.changeHandler_);
        this.installPropertyChangeHooks_();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterChangeHandler(this.changeHandler_);
        this.uninstallPropertyChangeHooks_();
      }

      /** @return {boolean} */

    }, {
      key: 'isChecked',
      value: function isChecked() {
        return this.getNativeControl_().checked;
      }

      /** @param {boolean} checked */

    }, {
      key: 'setChecked',
      value: function setChecked(checked) {
        this.getNativeControl_().checked = checked;
      }

      /** @return {boolean} */

    }, {
      key: 'isIndeterminate',
      value: function isIndeterminate() {
        return this.getNativeControl_().indeterminate;
      }

      /** @param {boolean} indeterminate */

    }, {
      key: 'setIndeterminate',
      value: function setIndeterminate(indeterminate) {
        this.getNativeControl_().indeterminate = indeterminate;
      }

      /** @return {boolean} */

    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.getNativeControl_().disabled;
      }

      /** @param {boolean} disabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.getNativeControl_().disabled = disabled;
        if (disabled) {
          this.adapter_.addClass(cssClasses$1.DISABLED);
        } else {
          this.adapter_.removeClass(cssClasses$1.DISABLED);
        }
      }

      /** @return {?string} */

    }, {
      key: 'getValue',
      value: function getValue() {
        return this.getNativeControl_().value;
      }

      /** @param {?string} value */

    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.getNativeControl_().value = value;
      }

      /**
       * Handles the animationend event for the checkbox
       */

    }, {
      key: 'handleAnimationEnd',
      value: function handleAnimationEnd() {
        var _this2 = this;

        clearTimeout(this.animEndLatchTimer_);
        this.animEndLatchTimer_ = setTimeout(function () {
          _this2.adapter_.removeClass(_this2.currentAnimationClass_);
          _this2.adapter_.deregisterAnimationEndHandler(_this2.animEndHandler_);
        }, numbers$1.ANIM_END_LATCH_MS);
      }

      /**
       * Handles the change event for the checkbox
       */

    }, {
      key: 'handleChange',
      value: function handleChange() {
        this.transitionCheckState_();
      }

      /** @private */

    }, {
      key: 'installPropertyChangeHooks_',
      value: function installPropertyChangeHooks_() {
        var _this3 = this;

        var nativeCb = this.getNativeControl_();
        var cbProto = Object.getPrototypeOf(nativeCb);

        CB_PROTO_PROPS.forEach(function (controlState) {
          var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
          // We have to check for this descriptor, since some browsers (Safari) don't support its return.
          // See: https://bugs.webkit.org/show_bug.cgi?id=49739
          if (validDescriptor(desc)) {
            var nativeCbDesc = /** @type {!ObjectPropertyDescriptor} */{
              get: desc.get,
              set: function set$$1(state) {
                desc.set.call(nativeCb, state);
                _this3.transitionCheckState_();
              },
              configurable: desc.configurable,
              enumerable: desc.enumerable
            };
            Object.defineProperty(nativeCb, controlState, nativeCbDesc);
          }
        });
      }

      /** @private */

    }, {
      key: 'uninstallPropertyChangeHooks_',
      value: function uninstallPropertyChangeHooks_() {
        var nativeCb = this.getNativeControl_();
        var cbProto = Object.getPrototypeOf(nativeCb);

        CB_PROTO_PROPS.forEach(function (controlState) {
          var desc = /** @type {!ObjectPropertyDescriptor} */Object.getOwnPropertyDescriptor(cbProto, controlState);
          if (validDescriptor(desc)) {
            Object.defineProperty(nativeCb, controlState, desc);
          }
        });
      }

      /** @private */

    }, {
      key: 'transitionCheckState_',
      value: function transitionCheckState_() {
        var nativeCb = this.adapter_.getNativeControl();
        if (!nativeCb) {
          return;
        }
        var oldState = this.currentCheckState_;
        var newState = this.determineCheckState_(nativeCb);
        if (oldState === newState) {
          return;
        }

        this.updateAriaChecked_();

        // Check to ensure that there isn't a previously existing animation class, in case for example
        // the user interacted with the checkbox before the animation was finished.
        if (this.currentAnimationClass_.length > 0) {
          clearTimeout(this.animEndLatchTimer_);
          this.adapter_.forceLayout();
          this.adapter_.removeClass(this.currentAnimationClass_);
        }

        this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
        this.currentCheckState_ = newState;

        // Check for parentNode so that animations are only run when the element is attached
        // to the DOM.
        if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
          this.adapter_.addClass(this.currentAnimationClass_);
          this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
        }
      }

      /**
       * @param {!MDCSelectionControlState} nativeCb
       * @return {string}
       * @private
       */

    }, {
      key: 'determineCheckState_',
      value: function determineCheckState_(nativeCb) {
        var TRANSITION_STATE_INDETERMINATE = strings$1.TRANSITION_STATE_INDETERMINATE,
            TRANSITION_STATE_CHECKED = strings$1.TRANSITION_STATE_CHECKED,
            TRANSITION_STATE_UNCHECKED = strings$1.TRANSITION_STATE_UNCHECKED;


        if (nativeCb.indeterminate) {
          return TRANSITION_STATE_INDETERMINATE;
        }
        return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
      }

      /**
       * @param {string} oldState
       * @param {string} newState
       * @return {string}
       */

    }, {
      key: 'getTransitionAnimationClass_',
      value: function getTransitionAnimationClass_(oldState, newState) {
        var TRANSITION_STATE_INIT = strings$1.TRANSITION_STATE_INIT,
            TRANSITION_STATE_CHECKED = strings$1.TRANSITION_STATE_CHECKED,
            TRANSITION_STATE_UNCHECKED = strings$1.TRANSITION_STATE_UNCHECKED;
        var _MDCCheckboxFoundatio = MDCCheckboxFoundation.cssClasses,
            ANIM_UNCHECKED_CHECKED = _MDCCheckboxFoundatio.ANIM_UNCHECKED_CHECKED,
            ANIM_UNCHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_UNCHECKED_INDETERMINATE,
            ANIM_CHECKED_UNCHECKED = _MDCCheckboxFoundatio.ANIM_CHECKED_UNCHECKED,
            ANIM_CHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_CHECKED_INDETERMINATE,
            ANIM_INDETERMINATE_CHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_CHECKED,
            ANIM_INDETERMINATE_UNCHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_UNCHECKED;


        switch (oldState) {
          case TRANSITION_STATE_INIT:
            if (newState === TRANSITION_STATE_UNCHECKED) {
              return '';
            }
          // fallthrough
          case TRANSITION_STATE_UNCHECKED:
            return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
          case TRANSITION_STATE_CHECKED:
            return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
          // TRANSITION_STATE_INDETERMINATE
          default:
            return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
        }
      }
    }, {
      key: 'updateAriaChecked_',
      value: function updateAriaChecked_() {
        // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
        if (this.isIndeterminate()) {
          this.adapter_.setNativeControlAttr(strings$1.ARIA_CHECKED_ATTR, strings$1.ARIA_CHECKED_INDETERMINATE_VALUE);
        } else {
          this.adapter_.removeNativeControlAttr(strings$1.ARIA_CHECKED_ATTR);
        }
      }

      /**
       * @return {!MDCSelectionControlState}
       * @private
       */

    }, {
      key: 'getNativeControl_',
      value: function getNativeControl_() {
        return this.adapter_.getNativeControl() || {
          checked: false,
          indeterminate: false,
          disabled: false,
          value: null
        };
      }
    }]);
    return MDCCheckboxFoundation;
  }(MDCFoundation);

  /**
   * @param {ObjectPropertyDescriptor|undefined} inputPropDesc
   * @return {boolean}
   */


  function validDescriptor(inputPropDesc) {
    return !!inputPropDesc && typeof inputPropDesc.set === 'function';
  }

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Form Field. Provides an interface for managing
   * - event handlers
   * - ripple activation
   *
   * Additionally, provides type information for the adapter to the Closure
   * compiler.
   *
   * Implement this adapter for your framework of choice to delegate updates to
   * the component in your framework of choice. See architecture documentation
   * for more details.
   * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
   *
   * @record
   */
  var MDCFormFieldAdapter = function () {
    function MDCFormFieldAdapter() {
      classCallCheck(this, MDCFormFieldAdapter);
    }

    createClass(MDCFormFieldAdapter, [{
      key: "registerInteractionHandler",

      /**
       * @param {string} type
       * @param {!EventListener} handler
       */
      value: function registerInteractionHandler(type, handler) {}

      /**
       * @param {string} type
       * @param {!EventListener} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}
    }, {
      key: "activateInputRipple",
      value: function activateInputRipple() {}
    }, {
      key: "deactivateInputRipple",
      value: function deactivateInputRipple() {}
    }]);
    return MDCFormFieldAdapter;
  }();

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var cssClasses$2 = {
    ROOT: 'mdc-form-field'
  };

  /** @enum {string} */
  var strings$2 = {
    LABEL_SELECTOR: '.mdc-form-field > label'
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCFormFieldAdapter>}
   */

  var MDCFormFieldFoundation = function (_MDCFoundation) {
    inherits(MDCFormFieldFoundation, _MDCFoundation);
    createClass(MDCFormFieldFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses$2;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$2;
      }

      /** @return {!MDCFormFieldAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          activateInputRipple: function activateInputRipple() {},
          deactivateInputRipple: function deactivateInputRipple() {}
        };
      }
    }]);

    function MDCFormFieldFoundation(adapter) {
      classCallCheck(this, MDCFormFieldFoundation);

      /** @private {!EventListener} */
      var _this = possibleConstructorReturn(this, (MDCFormFieldFoundation.__proto__ || Object.getPrototypeOf(MDCFormFieldFoundation)).call(this, _extends(MDCFormFieldFoundation.defaultAdapter, adapter)));

      _this.clickHandler_ = /** @type {!EventListener} */function () {
        return _this.handleClick_();
      };
      return _this;
    }

    createClass(MDCFormFieldFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      }

      /** @private */

    }, {
      key: 'handleClick_',
      value: function handleClick_() {
        var _this2 = this;

        this.adapter_.activateInputRipple();
        requestAnimationFrame(function () {
          return _this2.adapter_.deactivateInputRipple();
        });
      }
    }]);
    return MDCFormFieldFoundation;
  }(MDCFoundation);

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @const {Object<string, !VendorPropertyMapType>} */
  var eventTypeMap = {
    'animationstart': {
      noPrefix: 'animationstart',
      webkitPrefix: 'webkitAnimationStart',
      styleProperty: 'animation'
    },
    'animationend': {
      noPrefix: 'animationend',
      webkitPrefix: 'webkitAnimationEnd',
      styleProperty: 'animation'
    },
    'animationiteration': {
      noPrefix: 'animationiteration',
      webkitPrefix: 'webkitAnimationIteration',
      styleProperty: 'animation'
    },
    'transitionend': {
      noPrefix: 'transitionend',
      webkitPrefix: 'webkitTransitionEnd',
      styleProperty: 'transition'
    }
  };

  /** @const {Object<string, !VendorPropertyMapType>} */
  var cssPropertyMap = {
    'animation': {
      noPrefix: 'animation',
      webkitPrefix: '-webkit-animation'
    },
    'transform': {
      noPrefix: 'transform',
      webkitPrefix: '-webkit-transform'
    },
    'transition': {
      noPrefix: 'transition',
      webkitPrefix: '-webkit-transition'
    }
  };

  /**
   * @param {!Object} windowObj
   * @return {boolean}
   */
  function hasProperShape(windowObj) {
    return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
  }

  /**
   * @param {string} eventType
   * @return {boolean}
   */
  function eventFoundInMaps(eventType) {
    return eventType in eventTypeMap || eventType in cssPropertyMap;
  }

  /**
   * @param {string} eventType
   * @param {!Object<string, !VendorPropertyMapType>} map
   * @param {!Element} el
   * @return {string}
   */
  function getJavaScriptEventName(eventType, map, el) {
    return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  /**
   * Helper function to determine browser prefix for CSS3 animation events
   * and property names.
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getAnimationName(windowObj, eventType) {
    if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
      return eventType;
    }

    var map = /** @type {!Object<string, !VendorPropertyMapType>} */eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
    var el = windowObj['document']['createElement']('div');
    var eventName = '';

    if (map === eventTypeMap) {
      eventName = getJavaScriptEventName(eventType, map, el);
    } else {
      eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
    }

    return eventName;
  }

  // Public functions to access getAnimationName() for JavaScript events or CSS
  // property names.

  var transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

  /**
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getCorrectEventName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

  /**
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getCorrectPropertyName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

  var mdcCheckbox = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-checkbox-wrapper", class: _vm.formFieldClasses }, [_c('div', { ref: "root", staticClass: "mdc-checkbox", class: _vm.classes, style: _vm.styles }, [_c('input', { ref: "control", staticClass: "mdc-checkbox__native-control", attrs: { "id": _vm.vma_uid_, "name": _vm.name, "type": "checkbox" }, domProps: { "value": _vm.value }, on: { "change": _vm.onChange } }), _vm._v(" "), _c('div', { staticClass: "mdc-checkbox__background" }, [_c('svg', { staticClass: "mdc-checkbox__checkmark", attrs: { "viewBox": "0 0 24 24" } }, [_c('path', { staticClass: "mdc-checkbox__checkmark-path", attrs: { "fill": "none", "stroke": "white", "d": "M1.73,12.91 8.1,19.28 22.79,4.59" } })]), _vm._v(" "), _c('div', { staticClass: "mdc-checkbox__mixedmark" })])]), _vm._v(" "), _c('label', { ref: "label", attrs: { "for": _vm.vma_uid_ } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-checkbox',
    mixins: [DispatchFocusMixin, VMAUniqueIdMixin],
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: [Boolean, Array],
      indeterminate: Boolean,
      disabled: Boolean,
      label: String,
      'align-end': Boolean,
      value: {
        type: [String, Number],
        default: function _default() {
          return 'on';
        }
      },
      name: String
    },
    data: function data() {
      return {
        styles: {},
        classes: {}
      };
    },

    computed: {
      hasLabel: function hasLabel() {
        return this.label || this.$slots.default;
      },
      formFieldClasses: function formFieldClasses() {
        return {
          'mdc-form-field': this.hasLabel,
          'mdc-form-field--align-end': this.hasLabel && this.alignEnd
        };
      }
    },
    watch: {
      checked: 'setChecked',
      disabled: function disabled(value) {
        this.foundation.setDisabled(value);
      },
      indeterminate: function indeterminate(value) {
        this.foundation.setIndeterminate(value);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCCheckboxFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        setNativeControlAttr: function setNativeControlAttr(attr, value) {
          _this.$refs.control.setAttribute(attr, value);
        },
        removeNativeControlAttr: function removeNativeControlAttr(attr) {
          _this.$refs.control.removeAttribute(attr);
        },
        registerAnimationEndHandler: function registerAnimationEndHandler(handler) {
          return _this.$refs.root.addEventListener(getCorrectEventName(window, 'animationend'), handler);
        },
        deregisterAnimationEndHandler: function deregisterAnimationEndHandler(handler) {
          return _this.$refs.root.removeEventListener(getCorrectEventName(window, 'animationend'), handler);
        },
        registerChangeHandler: function registerChangeHandler(handler) {
          return _this.$refs.control.addEventListener('change', handler);
        },
        deregisterChangeHandler: function deregisterChangeHandler(handler) {
          return _this.$refs.control.removeEventListener('change', handler);
        },
        getNativeControl: function getNativeControl() {
          return _this.$refs.control;
        },
        forceLayout: function forceLayout() {
          return _this.$refs.root.offsetWidth;
        },
        isAttachedToDOM: function isAttachedToDOM() {
          return Boolean(_this.$el.parentNode);
        }
      });

      this.ripple = new RippleBase(this, {
        isUnbounded: function isUnbounded() {
          return true;
        },
        isSurfaceActive: function isSurfaceActive() {
          return RippleBase.isSurfaceActive(_this.$refs.control);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          _this.$refs.control.addEventListener(evt, handler, applyPassive());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          _this.$refs.control.removeEventListener(evt, handler, applyPassive());
        },
        computeBoundingRect: function computeBoundingRect() {
          return _this.$refs.root.getBoundingClientRect();
        }
      });

      this.formField = new MDCFormFieldFoundation({
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          _this.$refs.label.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          _this.$refs.label.removeEventListener(type, handler);
        },
        activateInputRipple: function activateInputRipple() {
          _this.ripple && _this.ripple.activate();
        },
        deactivateInputRipple: function deactivateInputRipple() {
          _this.ripple && _this.ripple.deactivate();
        }
      });

      this.foundation.init();
      this.ripple.init();
      this.formField.init();
      this.setChecked(this.checked);
      this.foundation.setDisabled(this.disabled);
      this.foundation.setIndeterminate(this.indeterminate);
    },
    beforeDestroy: function beforeDestroy() {
      this.formField.destroy();
      this.ripple.destroy();
      this.foundation.destroy();
    },

    methods: {
      setChecked: function setChecked(checked) {
        this.foundation.setChecked(Array.isArray(checked) ? checked.indexOf(this.value) > -1 : checked);
      },
      onChange: function onChange() {
        this.$emit('update:indeterminate', this.foundation.isIndeterminate());
        var isChecked = this.foundation.isChecked();

        if (Array.isArray(this.checked)) {
          var idx = this.checked.indexOf(this.value);
          if (isChecked) {
            idx < 0 && this.$emit('change', this.checked.concat(this.value));
          } else {
            idx > -1 && this.$emit('change', this.checked.slice(0, idx).concat(this.checked.slice(idx + 1)));
          }
        } else {
          this.$emit('change', isChecked);
        }
      }
    }
  };

  var VueMDCCheckbox = BasePlugin({
    mdcCheckbox: mdcCheckbox
  });

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Chip.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Chip into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCChipAdapter = function () {
    function MDCChipAdapter() {
      classCallCheck(this, MDCChipAdapter);
    }

    createClass(MDCChipAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the root element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the root element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns true if the root element contains the given class.
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "hasClass",
      value: function hasClass(className) {}

      /**
       * Adds a class to the leading icon element.
       * @param {string} className
       */

    }, {
      key: "addClassToLeadingIcon",
      value: function addClassToLeadingIcon(className) {}

      /**
       * Removes a class from the leading icon element.
       * @param {string} className
       */

    }, {
      key: "removeClassFromLeadingIcon",
      value: function removeClassFromLeadingIcon(className) {}

      /**
       * Returns true if target has className, false otherwise.
       * @param {!EventTarget} target
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "eventTargetHasClass",
      value: function eventTargetHasClass(target, className) {}

      /**
       * Registers an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerEventHandler",
      value: function registerEventHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterEventHandler",
      value: function deregisterEventHandler(evtType, handler) {}

      /**
       * Registers an event listener on the trailing icon element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerTrailingIconInteractionHandler",
      value: function registerTrailingIconInteractionHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the trailing icon element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterTrailingIconInteractionHandler",
      value: function deregisterTrailingIconInteractionHandler(evtType, handler) {}

      /**
       * Emits a custom "MDCChip:interaction" event denoting the chip has been
       * interacted with (typically on click or keydown).
       */

    }, {
      key: "notifyInteraction",
      value: function notifyInteraction() {}

      /**
       * Emits a custom "MDCChip:trailingIconInteraction" event denoting the trailing icon has been
       * interacted with (typically on click or keydown).
       */

    }, {
      key: "notifyTrailingIconInteraction",
      value: function notifyTrailingIconInteraction() {}

      /**
       * Emits a custom event "MDCChip:removal" denoting the chip will be removed.
       */

    }, {
      key: "notifyRemoval",
      value: function notifyRemoval() {}

      /**
       * Returns the computed property value of the given style property on the root element.
       * @param {string} propertyName
       * @return {string}
       */

    }, {
      key: "getComputedStyleValue",
      value: function getComputedStyleValue(propertyName) {}

      /**
       * Sets the property value of the given style property on the root element.
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setStyleProperty",
      value: function setStyleProperty(propertyName, value) {}
    }]);
    return MDCChipAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var strings$3 = {
    ENTRY_ANIMATION_NAME: 'mdc-chip-entry',
    INTERACTION_EVENT: 'MDCChip:interaction',
    TRAILING_ICON_INTERACTION_EVENT: 'MDCChip:trailingIconInteraction',
    REMOVAL_EVENT: 'MDCChip:removal',
    CHECKMARK_SELECTOR: '.mdc-chip__checkmark',
    LEADING_ICON_SELECTOR: '.mdc-chip__icon--leading',
    TRAILING_ICON_SELECTOR: '.mdc-chip__icon--trailing'
  };

  /** @enum {string} */
  var cssClasses$3 = {
    CHECKMARK: 'mdc-chip__checkmark',
    CHIP_EXIT: 'mdc-chip--exit',
    HIDDEN_LEADING_ICON: 'mdc-chip__icon--leading-hidden',
    LEADING_ICON: 'mdc-chip__icon--leading',
    TRAILING_ICON: 'mdc-chip__icon--trailing',
    SELECTED: 'mdc-chip--selected'
  };

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCChipAdapter>}
   * @final
   */

  var MDCChipFoundation = function (_MDCFoundation) {
    inherits(MDCChipFoundation, _MDCFoundation);
    createClass(MDCChipFoundation, null, [{
      key: 'strings',

      /** @return enum {string} */
      get: function get$$1() {
        return strings$3;
      }

      /** @return enum {string} */

    }, {
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$3;
      }

      /**
       * {@see MDCChipAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCChipAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCChipAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            hasClass: function hasClass() {},
            addClassToLeadingIcon: function addClassToLeadingIcon() {},
            removeClassFromLeadingIcon: function removeClassFromLeadingIcon() {},
            eventTargetHasClass: function eventTargetHasClass() {},
            registerEventHandler: function registerEventHandler() {},
            deregisterEventHandler: function deregisterEventHandler() {},
            registerTrailingIconInteractionHandler: function registerTrailingIconInteractionHandler() {},
            deregisterTrailingIconInteractionHandler: function deregisterTrailingIconInteractionHandler() {},
            notifyInteraction: function notifyInteraction() {},
            notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {},
            notifyRemoval: function notifyRemoval() {},
            getComputedStyleValue: function getComputedStyleValue() {},
            setStyleProperty: function setStyleProperty() {}
          }
        );
      }

      /**
       * @param {!MDCChipAdapter} adapter
       */

    }]);

    function MDCChipFoundation(adapter) {
      classCallCheck(this, MDCChipFoundation);

      /**
       * Whether a trailing icon click should immediately trigger exit/removal of the chip.
       * @private {boolean}
       * */
      var _this = possibleConstructorReturn(this, (MDCChipFoundation.__proto__ || Object.getPrototypeOf(MDCChipFoundation)).call(this, _extends(MDCChipFoundation.defaultAdapter, adapter)));

      _this.shouldRemoveOnTrailingIconClick_ = true;
      /** @private {function(!Event): undefined} */
      _this.interactionHandler_ = function (evt) {
        return _this.handleInteraction(evt);
      };
      /** @private {function(!Event): undefined} */
      _this.transitionEndHandler_ = function (evt) {
        return _this.handleTransitionEnd(evt);
      };
      /** @private {function(!Event): undefined} */
      _this.trailingIconInteractionHandler_ = function (evt) {
        return _this.handleTrailingIconInteraction(evt);
      };
      return _this;
    }

    createClass(MDCChipFoundation, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        ['click', 'keydown'].forEach(function (evtType) {
          _this2.adapter_.registerEventHandler(evtType, _this2.interactionHandler_);
        });
        this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
        ['click', 'keydown', 'touchstart', 'pointerdown', 'mousedown'].forEach(function (evtType) {
          _this2.adapter_.registerTrailingIconInteractionHandler(evtType, _this2.trailingIconInteractionHandler_);
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        ['click', 'keydown'].forEach(function (evtType) {
          _this3.adapter_.deregisterEventHandler(evtType, _this3.interactionHandler_);
        });
        this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
        ['click', 'keydown', 'touchstart', 'pointerdown', 'mousedown'].forEach(function (evtType) {
          _this3.adapter_.deregisterTrailingIconInteractionHandler(evtType, _this3.trailingIconInteractionHandler_);
        });
      }

      /**
       * @return {boolean}
       */

    }, {
      key: 'isSelected',
      value: function isSelected() {
        return this.adapter_.hasClass(cssClasses$3.SELECTED);
      }

      /**
       * @param {boolean} selected
       */

    }, {
      key: 'setSelected',
      value: function setSelected(selected) {
        if (selected) {
          this.adapter_.addClass(cssClasses$3.SELECTED);
        } else {
          this.adapter_.removeClass(cssClasses$3.SELECTED);
        }
      }

      /**
       * @return {boolean}
       */

    }, {
      key: 'getShouldRemoveOnTrailingIconClick',
      value: function getShouldRemoveOnTrailingIconClick() {
        return this.shouldRemoveOnTrailingIconClick_;
      }

      /**
       * @param {boolean} shouldRemove
       */

    }, {
      key: 'setShouldRemoveOnTrailingIconClick',
      value: function setShouldRemoveOnTrailingIconClick(shouldRemove) {
        this.shouldRemoveOnTrailingIconClick_ = shouldRemove;
      }

      /**
       * Begins the exit animation which leads to removal of the chip.
       */

    }, {
      key: 'beginExit',
      value: function beginExit() {
        this.adapter_.addClass(cssClasses$3.CHIP_EXIT);
      }

      /**
       * Handles an interaction event on the root element.
       * @param {!Event} evt
       */

    }, {
      key: 'handleInteraction',
      value: function handleInteraction(evt) {
        if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
          this.adapter_.notifyInteraction();
        }
      }

      /**
       * Handles a transition end event on the root element.
       * @param {!Event} evt
       */

    }, {
      key: 'handleTransitionEnd',
      value: function handleTransitionEnd(evt) {
        var _this4 = this;

        // Handle transition end event on the chip when it is about to be removed.
        if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses$3.CHIP_EXIT)) {
          if (evt.propertyName === 'width') {
            this.adapter_.notifyRemoval();
          } else if (evt.propertyName === 'opacity') {
            // See: https://css-tricks.com/using-css-transitions-auto-dimensions/#article-header-id-5
            var chipWidth = this.adapter_.getComputedStyleValue('width');

            // On the next frame (once we get the computed width), explicitly set the chip's width
            // to its current pixel width, so we aren't transitioning out of 'auto'.
            requestAnimationFrame(function () {
              _this4.adapter_.setStyleProperty('width', chipWidth);

              // To mitigate jitter, start transitioning padding and margin before width.
              _this4.adapter_.setStyleProperty('padding', '0');
              _this4.adapter_.setStyleProperty('margin', '0');

              // On the next frame (once width is explicitly set), transition width to 0.
              requestAnimationFrame(function () {
                _this4.adapter_.setStyleProperty('width', '0');
              });
            });
          }
          return;
        }

        // Handle a transition end event on the leading icon or checkmark, since the transition end event bubbles.
        if (evt.propertyName !== 'opacity') {
          return;
        }
        if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses$3.LEADING_ICON) && this.adapter_.hasClass(cssClasses$3.SELECTED)) {
          this.adapter_.addClassToLeadingIcon(cssClasses$3.HIDDEN_LEADING_ICON);
        } else if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses$3.CHECKMARK) && !this.adapter_.hasClass(cssClasses$3.SELECTED)) {
          this.adapter_.removeClassFromLeadingIcon(cssClasses$3.HIDDEN_LEADING_ICON);
        }
      }

      /**
       * Handles an interaction event on the trailing icon element. This is used to
       * prevent the ripple from activating on interaction with the trailing icon.
       * @param {!Event} evt
       */

    }, {
      key: 'handleTrailingIconInteraction',
      value: function handleTrailingIconInteraction(evt) {
        evt.stopPropagation();
        if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
          this.adapter_.notifyTrailingIconInteraction();
          if (this.shouldRemoveOnTrailingIconClick_) {
            this.beginExit();
          }
        }
      }
    }]);
    return MDCChipFoundation;
  }(MDCFoundation);

  var mdcChip = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', _vm._g({ class: _vm.classes, style: _vm.styles, attrs: { "tabindex": "0" } }, _vm.$listeners), [_vm.haveleadingIcon ? _c('i', { ref: "leadingIcon", staticClass: "mdc-chip__icon mdc-chip__icon--leading", class: _vm.leadingClasses }, [_vm._v(_vm._s(_vm.leadingIcon))]) : _vm._e(), _vm._v(" "), _vm.isFilter ? _c('div', { staticClass: "mdc-chip__checkmark" }, [_c('svg', { staticClass: "mdc-chip__checkmark-svg", attrs: { "viewBox": "-2 -3 30 30" } }, [_c('path', { staticClass: "mdc-chip__checkmark-path", attrs: { "fill": "none", "stroke": "black", "d": "M1.73,12.91 8.1,19.28 22.79,4.59" } })])]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "mdc-chip__text" }, [_vm._t("default")], 2), _vm._v(" "), _vm.havetrailingIcon ? _c('i', { ref: "trailingIcon", staticClass: "mdc-chip__icon mdc-chip__icon--trailing", class: _vm.trailingClasses, attrs: { "tabindex": "0", "role": "button" } }, [_vm._v(_vm._s(_vm.trailingIcon))]) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-chip',
    mixins: [CustomLinkMixin],
    props: {
      leadingIcon: [String],
      trailingIcon: [String],
      leadingIconClasses: [Object],
      trailingIconClasses: [Object]
    },
    inject: ['mdcChipSet'],
    data: function data() {
      return {
        classes: {
          'mdc-chip': true
        },
        styles: {}
      };
    },

    computed: {
      isFilter: function isFilter() {
        return this.mdcChipSet && this.mdcChipSet.filter;
      },
      haveleadingIcon: function haveleadingIcon() {
        return !!this.leadingIcon || this.leadingIconClasses;
      },
      havetrailingIcon: function havetrailingIcon() {
        return !!this.trailingIcon || this.trailingIconClasses;
      },
      leadingClasses: function leadingClasses() {
        return _extends({}, {
          'material-icons': !!this.leadingIcon
        }, this.leadingIconClasses);
      },
      trailingClasses: function trailingClasses() {
        return _extends({}, {
          'material-icons': !!this.trailingIcon
        }, this.trailingIconClasses);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCChipFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        addClassToLeadingIcon: function addClassToLeadingIcon(className) {
          if (_this.haveleadingIcon) {
            _this.$refs.leadingIcon.classList.add(className);
          }
        },
        removeClassFromLeadingIcon: function removeClassFromLeadingIcon(className) {
          if (_this.haveleadingIcon) {
            _this.$refs.leadingIcon.classList.remove(className);
          }
        },
        eventTargetHasClass: function eventTargetHasClass(target, className) {
          return target.classList.contains(className);
        },
        registerEventHandler: function registerEventHandler(evtType, handler) {
          return _this.$el.addEventListener(evtType, handler);
        },
        deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
          return _this.$el.removeEventListener(evtType, handler);
        },
        notifyInteraction: function notifyInteraction() {
          emitCustomEvent(_this.$el, MDCChipFoundation.strings.INTERACTION_EVENT, {
            chip: _this
          }, true);
        },
        notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {
          emitCustomEvent(_this.$el, MDCChipFoundation.strings.TRAILING_ICON_INTERACTION_EVENT, {
            chip: _this
          }, true);
        },

        registerTrailingIconInteractionHandler: function registerTrailingIconInteractionHandler(evtType, handler) {
          if (_this.$refs.trailingIcon) {
            _this.$refs.trailingIcon.addEventListener(evtType, handler, applyPassive());
          }
        },
        deregisterTrailingIconInteractionHandler: function deregisterTrailingIconInteractionHandler(evtType, handler) {
          if (_this.$refs.trailingIcon) {
            _this.$refs.trailingIcon.removeEventListener(evtType, handler, applyPassive());
          }
        },
        notifyRemoval: function notifyRemoval() {
          emitCustomEvent(_this.$el, MDCChipFoundation.strings.REMOVAL_EVENT, { chip: _this }, true);
        },
        getComputedStyleValue: function getComputedStyleValue(propertyName) {
          return window.getComputedStyle(_this.$el).getPropertyValue(propertyName);
        },
        setStyleProperty: function setStyleProperty(property, value) {
          return _this.$set(_this.styles, property, value);
        }
      });

      this.foundation.init();

      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.ripple.destroy();
      this.foundation.destroy();
    },

    methods: {
      toggleSelected: function toggleSelected() {
        this.foundation.toggleSelected();
      },
      isSelected: function isSelected() {
        return this.foundation.isSelected();
      }
    }
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Chip Set.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Chip Set into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */

  var MDCChipSetAdapter = function () {
    function MDCChipSetAdapter() {
      classCallCheck(this, MDCChipSetAdapter);
    }

    createClass(MDCChipSetAdapter, [{
      key: 'hasClass',

      /**
       * Returns true if the root element contains the given class name.
       * @param {string} className
       * @return {boolean}
       */
      value: function hasClass(className) {}

      /**
       * Registers an event handler on the root element for a given event.
       * @param {string} evtType
       * @param {function(!MDCChipInteractionEventType): undefined} handler
       */

    }, {
      key: 'registerInteractionHandler',
      value: function registerInteractionHandler(evtType, handler) {}

      /**
       * Deregisters an event handler on the root element for a given event.
       * @param {string} evtType
       * @param {function(!MDCChipInteractionEventType): undefined} handler
       */

    }, {
      key: 'deregisterInteractionHandler',
      value: function deregisterInteractionHandler(evtType, handler) {}

      /**
       * Removes the chip object from the chip set.
       * @param {!Object} chip
       */

    }, {
      key: 'removeChip',
      value: function removeChip(chip) {}
    }]);
    return MDCChipSetAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var strings$4 = {
    CHIP_SELECTOR: '.mdc-chip'
  };

  /** @enum {string} */
  var cssClasses$4 = {
    CHOICE: 'mdc-chip-set--choice',
    FILTER: 'mdc-chip-set--filter'
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCChipSetAdapter>}
   * @final
   */

  var MDCChipSetFoundation = function (_MDCFoundation) {
    inherits(MDCChipSetFoundation, _MDCFoundation);
    createClass(MDCChipSetFoundation, null, [{
      key: 'strings',

      /** @return enum {string} */
      get: function get$$1() {
        return strings$4;
      }

      /** @return enum {string} */

    }, {
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$4;
      }

      /**
       * {@see MDCChipSetAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCChipSetAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCChipSetAdapter} */{
            hasClass: function hasClass() {},
            registerInteractionHandler: function registerInteractionHandler() {},
            deregisterInteractionHandler: function deregisterInteractionHandler() {},
            removeChip: function removeChip() {}
          }
        );
      }

      /**
       * @param {!MDCChipSetAdapter} adapter
       */

    }]);

    function MDCChipSetFoundation(adapter) {
      classCallCheck(this, MDCChipSetFoundation);

      /**
       * The selected chips in the set. Only used for choice chip set or filter chip set.
       * @private {!Array<!MDCChipFoundation>}
       */
      var _this = possibleConstructorReturn(this, (MDCChipSetFoundation.__proto__ || Object.getPrototypeOf(MDCChipSetFoundation)).call(this, _extends(MDCChipSetFoundation.defaultAdapter, adapter)));

      _this.selectedChips_ = [];

      /** @private {function(!MDCChipInteractionEventType): undefined} */
      _this.chipInteractionHandler_ = function (evt) {
        return _this.handleChipInteraction_(evt);
      };
      /** @private {function(!MDCChipInteractionEventType): undefined} */
      _this.chipRemovalHandler_ = function (evt) {
        return _this.handleChipRemoval_(evt);
      };
      return _this;
    }

    createClass(MDCChipSetFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler(MDCChipFoundation.strings.INTERACTION_EVENT, this.chipInteractionHandler_);
        this.adapter_.registerInteractionHandler(MDCChipFoundation.strings.REMOVAL_EVENT, this.chipRemovalHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler(MDCChipFoundation.strings.INTERACTION_EVENT, this.chipInteractionHandler_);
        this.adapter_.deregisterInteractionHandler(MDCChipFoundation.strings.REMOVAL_EVENT, this.chipRemovalHandler_);
      }

      /**
       * Selects the given chip. Deselects all other chips if the chip set is of the choice variant.
       * @param {!MDCChipFoundation} chipFoundation
       */

    }, {
      key: 'select',
      value: function select(chipFoundation) {
        if (this.adapter_.hasClass(cssClasses$4.CHOICE)) {
          this.deselectAll_();
        }
        chipFoundation.setSelected(true);
        this.selectedChips_.push(chipFoundation);
      }

      /**
       * Deselects the given chip.
       * @param {!MDCChipFoundation} chipFoundation
       */

    }, {
      key: 'deselect',
      value: function deselect(chipFoundation) {
        var index = this.selectedChips_.indexOf(chipFoundation);
        if (index >= 0) {
          this.selectedChips_.splice(index, 1);
        }
        chipFoundation.setSelected(false);
      }

      /** Deselects all selected chips. */

    }, {
      key: 'deselectAll_',
      value: function deselectAll_() {
        this.selectedChips_.forEach(function (chipFoundation) {
          chipFoundation.setSelected(false);
        });
        this.selectedChips_.length = 0;
      }

      /**
       * Handles a chip interaction event
       * @param {!MDCChipInteractionEventType} evt
       * @private
       */

    }, {
      key: 'handleChipInteraction_',
      value: function handleChipInteraction_(evt) {
        var chipFoundation = evt.detail.chip.foundation;
        if (this.adapter_.hasClass(cssClasses$4.CHOICE) || this.adapter_.hasClass(cssClasses$4.FILTER)) {
          if (chipFoundation.isSelected()) {
            this.deselect(chipFoundation);
          } else {
            this.select(chipFoundation);
          }
        }
      }

      /**
       * Handles the event when a chip is removed.
       * @param {!MDCChipInteractionEventType} evt
       * @private
       */

    }, {
      key: 'handleChipRemoval_',
      value: function handleChipRemoval_(evt) {
        var chip = evt.detail.chip;

        this.deselect(chip.foundation);
        this.adapter_.removeChip(chip);
      }
    }]);
    return MDCChipSetFoundation;
  }(MDCFoundation);

  var mdcChipSet = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', _vm._g({ class: _vm.classes }, _vm.$listeners), [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-chip-set',
    props: {
      choice: [Boolean],
      filter: [Boolean],
      input: [Boolean]
    },
    provide: function provide() {
      return { mdcChipSet: this };
    },
    data: function data() {
      return {
        classes: {
          'mdc-chip-set': true,
          'mdc-chip-set--choice': this.choice,
          'mdc-chip-set--filter': this.filter,
          'mdc-chip-set--input': this.input
        }
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCChipSetFoundation({
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
          _this.$el.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
          _this.$el.removeEventListener(evtType, handler);
        },
        removeChip: function removeChip(chip) {
          // TODO: may need refactoring
          _this.$nextTick(function () {
            return chip.$destroy();
          });
        }
      });

      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    },

    methods: {}
  };

  var VueMDCChipSet = BasePlugin({
    mdcChip: mdcChip,
    mdcChipSet: mdcChipSet
  });

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses$5 = {
    ROOT: 'mdc-dialog',
    OPEN: 'mdc-dialog--open',
    ANIMATING: 'mdc-dialog--animating',
    BACKDROP: 'mdc-dialog__backdrop',
    SCROLL_LOCK: 'mdc-dialog-scroll-lock',
    ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
    CANCEL_BTN: 'mdc-dialog__footer__button--cancel'
  };

  var strings$5 = {
    OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
    DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
    ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
    ACCEPT_EVENT: 'MDCDialog:accept',
    CANCEL_EVENT: 'MDCDialog:cancel'
  };

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCDialogFoundation = function (_MDCFoundation) {
    inherits(MDCDialogFoundation, _MDCFoundation);
    createClass(MDCDialogFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$5;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$5;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          addBodyClass: function addBodyClass() /* className: string */{},
          removeBodyClass: function removeBodyClass() /* className: string */{},
          eventTargetHasClass: function eventTargetHasClass() {
            return (/* target: EventTarget, className: string */ /* boolean */false
            );
          },
          registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
          registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
          deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
          registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
          notifyAccept: function notifyAccept() {},
          notifyCancel: function notifyCancel() {},
          trapFocusOnSurface: function trapFocusOnSurface() {},
          untrapFocusOnSurface: function untrapFocusOnSurface() {},
          isDialog: function isDialog() {
            return (/* el: Element */ /* boolean */false
            );
          }
        };
      }
    }]);

    function MDCDialogFoundation(adapter) {
      classCallCheck(this, MDCDialogFoundation);

      var _this = possibleConstructorReturn(this, (MDCDialogFoundation.__proto__ || Object.getPrototypeOf(MDCDialogFoundation)).call(this, _extends(MDCDialogFoundation.defaultAdapter, adapter)));

      _this.isOpen_ = false;
      _this.componentClickHandler_ = function (evt) {
        if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses$5.BACKDROP)) {
          _this.cancel(true);
        }
      };
      _this.dialogClickHandler_ = function (evt) {
        return _this.handleDialogClick_(evt);
      };
      _this.documentKeydownHandler_ = function (evt) {
        if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
          _this.cancel(true);
        }
      };
      _this.transitionEndHandler_ = function (evt) {
        return _this.handleTransitionEnd_(evt);
      };
      return _this;
    }

    createClass(MDCDialogFoundation, [{
      key: 'destroy',
      value: function destroy() {
        // Ensure that dialog is cleaned up when destroyed
        if (this.isOpen_) {
          this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
          this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
          this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
          this.adapter_.untrapFocusOnSurface();
          this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
          this.enableScroll_();
        }
      }
    }, {
      key: 'open',
      value: function open() {
        this.isOpen_ = true;
        this.disableScroll_();
        this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
        this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
        this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
        this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
        this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
        this.adapter_.addClass(MDCDialogFoundation.cssClasses.OPEN);
      }
    }, {
      key: 'close',
      value: function close() {
        this.isOpen_ = false;
        this.enableScroll_();
        this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
        this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
        this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
        this.adapter_.untrapFocusOnSurface();
        this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
        this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
        this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
      }
    }, {
      key: 'isOpen',
      value: function isOpen() {
        return this.isOpen_;
      }
    }, {
      key: 'accept',
      value: function accept(shouldNotify) {
        if (shouldNotify) {
          this.adapter_.notifyAccept();
        }

        this.close();
      }
    }, {
      key: 'cancel',
      value: function cancel(shouldNotify) {
        if (shouldNotify) {
          this.adapter_.notifyCancel();
        }

        this.close();
      }
    }, {
      key: 'handleDialogClick_',
      value: function handleDialogClick_(evt) {
        var target = evt.target;

        if (this.adapter_.eventTargetHasClass(target, cssClasses$5.ACCEPT_BTN)) {
          this.accept(true);
        } else if (this.adapter_.eventTargetHasClass(target, cssClasses$5.CANCEL_BTN)) {
          this.cancel(true);
        }
      }
    }, {
      key: 'handleTransitionEnd_',
      value: function handleTransitionEnd_(evt) {
        if (this.adapter_.isDialog(evt.target)) {
          this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
          this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
          if (this.isOpen_) {
            this.adapter_.trapFocusOnSurface();
          }      }    }
    }, {
      key: 'disableScroll_',
      value: function disableScroll_() {
        this.adapter_.addBodyClass(cssClasses$5.SCROLL_LOCK);
      }
    }, {
      key: 'enableScroll_',
      value: function enableScroll_() {
        this.adapter_.removeBodyClass(cssClasses$5.SCROLL_LOCK);
      }
    }]);
    return MDCDialogFoundation;
  }(MDCFoundation);

  var tabbable = function (el, options) {
    options = options || {};

    var elementDocument = el.ownerDocument || el;
    var basicTabbables = [];
    var orderedTabbables = [];

    // A node is "available" if
    // - it's computed style
    var isUnavailable = createIsUnavailable(elementDocument);

    var candidateSelectors = ['input', 'select', 'a[href]', 'textarea', 'button', '[tabindex]'];

    var candidates = el.querySelectorAll(candidateSelectors.join(','));

    if (options.includeContainer) {
      var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

      if (candidateSelectors.some(function (candidateSelector) {
        return matches.call(el, candidateSelector);
      })) {
        candidates = Array.prototype.slice.apply(candidates);
        candidates.unshift(el);
      }
    }

    var candidate, candidateIndexAttr, candidateIndex;
    for (var i = 0, l = candidates.length; i < l; i++) {
      candidate = candidates[i];
      candidateIndexAttr = parseInt(candidate.getAttribute('tabindex'), 10);
      candidateIndex = isNaN(candidateIndexAttr) ? candidate.tabIndex : candidateIndexAttr;

      if (candidateIndex < 0 || candidate.tagName === 'INPUT' && candidate.type === 'hidden' || candidate.disabled || isUnavailable(candidate, elementDocument)) {
        continue;
      }

      if (candidateIndex === 0) {
        basicTabbables.push(candidate);
      } else {
        orderedTabbables.push({
          index: i,
          tabIndex: candidateIndex,
          node: candidate
        });
      }
    }

    var tabbableNodes = orderedTabbables.sort(function (a, b) {
      return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
    }).map(function (a) {
      return a.node;
    });

    Array.prototype.push.apply(tabbableNodes, basicTabbables);

    return tabbableNodes;
  };

  function createIsUnavailable(elementDocument) {
    // Node cache must be refreshed on every check, in case
    // the content of the element has changed
    var isOffCache = [];

    // "off" means `display: none;`, as opposed to "hidden",
    // which means `visibility: hidden;`. getComputedStyle
    // accurately reflects visiblity in context but not
    // "off" state, so we need to recursively check parents.

    function isOff(node, nodeComputedStyle) {
      if (node === elementDocument.documentElement) return false;

      // Find the cached node (Array.prototype.find not available in IE9)
      for (var i = 0, length = isOffCache.length; i < length; i++) {
        if (isOffCache[i][0] === node) return isOffCache[i][1];
      }

      nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

      var result = false;

      if (nodeComputedStyle.display === 'none') {
        result = true;
      } else if (node.parentNode) {
        result = isOff(node.parentNode);
      }

      isOffCache.push([node, result]);

      return result;
    }

    return function isUnavailable(node) {
      if (node === elementDocument.documentElement) return false;

      var computedStyle = elementDocument.defaultView.getComputedStyle(node);

      if (isOff(node, computedStyle)) return true;

      return computedStyle.visibility === 'hidden';
    };
  }

  var listeningFocusTrap = null;

  function focusTrap(element, userOptions) {
    var tabbableNodes = [];
    var firstTabbableNode = null;
    var lastTabbableNode = null;
    var nodeFocusedBeforeActivation = null;
    var active = false;
    var paused = false;
    var tabEvent = null;

    var container = typeof element === 'string' ? document.querySelector(element) : element;

    var config = userOptions || {};
    config.returnFocusOnDeactivate = userOptions && userOptions.returnFocusOnDeactivate !== undefined ? userOptions.returnFocusOnDeactivate : true;
    config.escapeDeactivates = userOptions && userOptions.escapeDeactivates !== undefined ? userOptions.escapeDeactivates : true;

    var trap = {
      activate: activate,
      deactivate: deactivate,
      pause: pause,
      unpause: unpause
    };

    return trap;

    function activate(activateOptions) {
      if (active) return;

      var defaultedActivateOptions = {
        onActivate: activateOptions && activateOptions.onActivate !== undefined ? activateOptions.onActivate : config.onActivate
      };

      active = true;
      paused = false;
      nodeFocusedBeforeActivation = document.activeElement;

      if (defaultedActivateOptions.onActivate) {
        defaultedActivateOptions.onActivate();
      }

      addListeners();
      return trap;
    }

    function deactivate(deactivateOptions) {
      if (!active) return;

      var defaultedDeactivateOptions = {
        returnFocus: deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate,
        onDeactivate: deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate
      };

      removeListeners();

      if (defaultedDeactivateOptions.onDeactivate) {
        defaultedDeactivateOptions.onDeactivate();
      }

      if (defaultedDeactivateOptions.returnFocus) {
        setTimeout(function () {
          tryFocus(nodeFocusedBeforeActivation);
        }, 0);
      }

      active = false;
      paused = false;
      return this;
    }

    function pause() {
      if (paused || !active) return;
      paused = true;
      removeListeners();
    }

    function unpause() {
      if (!paused || !active) return;
      paused = false;
      addListeners();
    }

    function addListeners() {
      if (!active) return;

      // There can be only one listening focus trap at a time
      if (listeningFocusTrap) {
        listeningFocusTrap.pause();
      }
      listeningFocusTrap = trap;

      updateTabbableNodes();
      // Ensure that the focused element doesn't capture the event that caused the focus trap activation
      setTimeout(function () {
        tryFocus(firstFocusNode());
      }, 0);
      document.addEventListener('focus', checkFocus, true);
      document.addEventListener('click', checkClick, true);
      document.addEventListener('mousedown', checkPointerDown, true);
      document.addEventListener('touchstart', checkPointerDown, true);
      document.addEventListener('keydown', checkKey, true);

      return trap;
    }

    function removeListeners() {
      if (!active || listeningFocusTrap !== trap) return;

      document.removeEventListener('focus', checkFocus, true);
      document.removeEventListener('click', checkClick, true);
      document.removeEventListener('mousedown', checkPointerDown, true);
      document.removeEventListener('touchstart', checkPointerDown, true);
      document.removeEventListener('keydown', checkKey, true);

      listeningFocusTrap = null;

      return trap;
    }

    function getNodeForOption(optionName) {
      var optionValue = config[optionName];
      var node = optionValue;
      if (!optionValue) {
        return null;
      }
      if (typeof optionValue === 'string') {
        node = document.querySelector(optionValue);
        if (!node) {
          throw new Error('`' + optionName + '` refers to no known node');
        }
      }
      if (typeof optionValue === 'function') {
        node = optionValue();
        if (!node) {
          throw new Error('`' + optionName + '` did not return a node');
        }
      }
      return node;
    }

    function firstFocusNode() {
      var node;
      if (getNodeForOption('initialFocus') !== null) {
        node = getNodeForOption('initialFocus');
      } else if (container.contains(document.activeElement)) {
        node = document.activeElement;
      } else {
        node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
      }

      if (!node) {
        throw new Error('You can\'t have a focus-trap without at least one focusable element');
      }

      return node;
    }

    // This needs to be done on mousedown and touchstart instead of click
    // so that it precedes the focus event
    function checkPointerDown(e) {
      if (config.clickOutsideDeactivates && !container.contains(e.target)) {
        deactivate({ returnFocus: false });
      }
    }

    function checkClick(e) {
      if (config.clickOutsideDeactivates) return;
      if (container.contains(e.target)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    function checkFocus(e) {
      if (container.contains(e.target)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      // Checking for a blur method here resolves a Firefox issue (#15)
      if (typeof e.target.blur === 'function') e.target.blur();

      if (tabEvent) {
        readjustFocus(tabEvent);
      }
    }

    function checkKey(e) {
      if (e.key === 'Tab' || e.keyCode === 9) {
        handleTab(e);
      }

      if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
        deactivate();
      }
    }

    function handleTab(e) {
      updateTabbableNodes();

      if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
        return tabEvent = e;
      }

      e.preventDefault();
      var currentFocusIndex = tabbableNodes.indexOf(e.target);

      if (e.shiftKey) {
        if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
          return tryFocus(lastTabbableNode);
        }
        return tryFocus(tabbableNodes[currentFocusIndex - 1]);
      }

      if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

      tryFocus(tabbableNodes[currentFocusIndex + 1]);
    }

    function updateTabbableNodes() {
      tabbableNodes = tabbable(container);
      firstTabbableNode = tabbableNodes[0];
      lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
    }

    function readjustFocus(e) {
      if (e.shiftKey) return tryFocus(lastTabbableNode);

      tryFocus(firstTabbableNode);
    }
  }

  function isEscapeEvent(e) {
    return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
  }

  function tryFocus(node) {
    if (!node || !node.focus) return;
    if (node === document.activeElement) return;

    node.focus();
    if (node.tagName.toLowerCase() === 'input') {
      node.select();
    }
  }

  var focusTrap_1 = focusTrap;

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  function createFocusTrapInstance(surfaceEl, acceptButtonEl) {
    var focusTrapFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : focusTrap_1;

    return focusTrapFactory(surfaceEl, {
      initialFocus: acceptButtonEl,
      clickOutsideDeactivates: true
    });
  }

  var mdcDialog = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('aside', { ref: "root", staticClass: "mdc-dialog", class: _vm.classes, style: _vm.styles, attrs: { "aria-labelledby": 'label' + _vm.vma_uid_, "aria-describedby": 'desc' + _vm.vma_uid_, "role": "alertdialog" } }, [_c('div', { ref: "surface", staticClass: "mdc-dialog__surface", class: _vm.surfaceClasses }, [_vm.title ? _c('header', { staticClass: "mdc-dialog__header" }, [_c('h2', { staticClass: "mdc-dialog__header__title", attrs: { "id": 'label' + _vm.vma_uid_ } }, [_vm._v(" " + _vm._s(_vm.title) + " ")])]) : _vm._e(), _vm._v(" "), _c('section', { staticClass: "mdc-dialog__body", class: _vm.bodyClasses, attrs: { "id": 'desc' + _vm.vma_uid_ } }, [_vm._t("default")], 2), _vm._v(" "), _vm.accept || _vm.cancel ? _c('footer', { staticClass: "mdc-dialog__footer" }, [_vm.cancel ? _c('mdcButton', { ref: "cancel", staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--cancel", class: { 'mdc-dialog__action': _vm.accent }, on: { "click": _vm.onCancel } }, [_vm._v(_vm._s(_vm.cancel))]) : _vm._e(), _vm._v(" "), _c('mdcButton', { ref: "accept", staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--accept", class: { 'mdc-dialog__action': _vm.accent }, attrs: { "disabled": _vm.acceptDisabled }, on: { "click": _vm.onAccept } }, [_vm._v(_vm._s(_vm.accept))])], 1) : _vm._e()]), _vm._v(" "), _c('div', { staticClass: "mdc-dialog__backdrop" })]);
    }, staticRenderFns: [],
    name: 'mdc-dialog',
    components: {
      mdcButton: mdcButton
    },
    mixins: [VMAUniqueIdMixin],
    model: {
      prop: 'open',
      event: 'change'
    },
    props: {
      title: { type: String },
      accept: { type: String, default: 'Ok' },
      acceptDisabled: Boolean,
      cancel: { type: String },
      accent: Boolean,
      scrollable: Boolean,
      open: Boolean
    },
    data: function data() {
      return {
        classes: {
          'mdc-theme--dark': this.dark
        },
        styles: {},
        surfaceClasses: {},
        bodyClasses: {
          'mdc-dialog__body--scrollable': this.scrollable
        }
      };
    },

    watch: { open: 'onOpen_' },
    mounted: function mounted() {
      var _this = this;

      if (this.accept) {
        this.focusTrap = createFocusTrapInstance(this.$refs.surface, this.$refs.accept);
      }

      this.foundation = new MDCDialogFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        addBodyClass: function addBodyClass(className) {
          return document.body.classList.add(className);
        },
        removeBodyClass: function removeBodyClass(className) {
          return document.body.classList.remove(className);
        },
        eventTargetHasClass: function eventTargetHasClass(target, className) {
          return target.classList.contains(className);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          return _this.$refs.root.addEventListener(evt, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          return _this.$refs.root.removeEventListener(evt, handler);
        },
        registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /*evt, handler*/{
          // VMA_HACK: handle button clicks ourselves
          // this.$refs.surface.addEventListener(evt, handler)
        },
        deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /*evt, handler*/{
          // VMA_HACK: handle button clicks ourselves
          // this.$refs.surface.removeEventListener(evt, handler)
        },
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
          return document.addEventListener('keydown', handler);
        },
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
          return document.removeEventListener('keydown', handler);
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          return _this.$refs.surface.addEventListener('transitionend', handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          return _this.$refs.surface.removeEventListener('transitionend', handler);
        },
        notifyAccept: function notifyAccept() {
          _this.$emit('change', false);
          _this.$emit('accept');
        },
        notifyCancel: function notifyCancel() {
          _this.$emit('change', false);
          _this.$emit('cancel');
        },
        trapFocusOnSurface: function trapFocusOnSurface() {
          return _this.focusTrap && _this.focusTrap.activate();
        },
        untrapFocusOnSurface: function untrapFocusOnSurface() {
          return _this.focusTrap && _this.focusTrap.deactivate();
        },
        isDialog: function isDialog(el) {
          return _this.$refs.surface === el;
        }
      });

      this.foundation.init();
      this.open && this.foundation.open();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    },

    methods: {
      onOpen_: function onOpen_(value) {
        if (value) {
          this.foundation.open();
        } else {
          this.foundation.close();
        }
      },
      onCancel: function onCancel() {
        var _this2 = this;

        if (this.$listeners['validateCancel']) {
          this.$emit('validateCancel', {
            cancel: function cancel() {
              var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

              // if notify = false, the dialog will close
              // but the notifyAccept method will not be called
              // so we need to notify listeners the open state
              // is changing.
              if (!notify) {
                _this2.$emit('change', false);
              }
              _this2.foundation.cancel(notify);
            }
          });
        } else {
          this.foundation.cancel(true);
        }
      },
      onAccept: function onAccept() {
        var _this3 = this;

        if (this.$listeners['validate']) {
          this.$emit('validate', {
            accept: function accept() {
              var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

              // if notify = false, the dialog will close
              // but the notifyAccept method will not be called
              // so we need to notify listeners the open state
              // is changing.
              if (!notify) {
                _this3.$emit('change', false);
              }
              _this3.foundation.accept(notify);
            }
          });
        } else {
          this.foundation.accept(true);
        }
      },
      show: function show() {
        this.foundation.open();
      },
      close: function close() {
        this.foundation.close();
      }
    }
  };

  var VueMDCDialog = BasePlugin({
    mdcDialog: mdcDialog
  });

  var mdcPermanentDrawer = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "mdc-permanent-drawer mdc-drawer--permanent mdc-typography" }, [_c('nav', { staticClass: "mdc-drawer__content" }, [_vm.toolbarSpacer ? _c('div', { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-permanent-drawer',
    props: {
      'toolbar-spacer': Boolean
    }
  };

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCSlidableDrawerFoundation = function (_MDCFoundation) {
    inherits(MDCSlidableDrawerFoundation, _MDCFoundation);
    createClass(MDCSlidableDrawerFoundation, null, [{
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          hasClass: function hasClass() /* className: string */{},
          hasNecessaryDom: function hasNecessaryDom() {
            return (/* boolean */false
            );
          },
          registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
          registerDrawerInteractionHandler: function registerDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
          deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
          registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
          setTranslateX: function setTranslateX() /* value: number | null */{},
          getFocusableElements: function getFocusableElements() /* NodeList */{},
          saveElementTabState: function saveElementTabState() /* el: Element */{},
          restoreElementTabState: function restoreElementTabState() /* el: Element */{},
          makeElementUntabbable: function makeElementUntabbable() /* el: Element */{},
          notifyOpen: function notifyOpen() {},
          notifyClose: function notifyClose() {},
          isRtl: function isRtl() {
            return (/* boolean */false
            );
          },
          getDrawerWidth: function getDrawerWidth() {
            return (/* number */0
            );
          }
        };
      }
    }]);

    function MDCSlidableDrawerFoundation(adapter, rootCssClass, animatingCssClass, openCssClass) {
      classCallCheck(this, MDCSlidableDrawerFoundation);

      var _this = possibleConstructorReturn(this, (MDCSlidableDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCSlidableDrawerFoundation)).call(this, _extends(MDCSlidableDrawerFoundation.defaultAdapter, adapter)));

      _this.rootCssClass_ = rootCssClass;
      _this.animatingCssClass_ = animatingCssClass;
      _this.openCssClass_ = openCssClass;

      _this.transitionEndHandler_ = function (evt) {
        return _this.handleTransitionEnd_(evt);
      };

      _this.inert_ = false;

      _this.componentTouchStartHandler_ = function (evt) {
        return _this.handleTouchStart_(evt);
      };
      _this.componentTouchMoveHandler_ = function (evt) {
        return _this.handleTouchMove_(evt);
      };
      _this.componentTouchEndHandler_ = function (evt) {
        return _this.handleTouchEnd_(evt);
      };
      _this.documentKeydownHandler_ = function (evt) {
        if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
          _this.close();
        }
      };
      return _this;
    }

    createClass(MDCSlidableDrawerFoundation, [{
      key: 'init',
      value: function init() {
        var ROOT = this.rootCssClass_;
        var OPEN = this.openCssClass_;

        if (!this.adapter_.hasClass(ROOT)) {
          throw new Error(ROOT + ' class required in root element.');
        }

        if (!this.adapter_.hasNecessaryDom()) {
          throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
        }

        if (this.adapter_.hasClass(OPEN)) {
          this.isOpen_ = true;
        } else {
          this.detabinate_();
          this.isOpen_ = false;
        }

        this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
        this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
        this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
        this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
        this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
        // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
        this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
      }
    }, {
      key: 'open',
      value: function open() {
        this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
        this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
        this.adapter_.addClass(this.animatingCssClass_);
        this.adapter_.addClass(this.openCssClass_);
        this.retabinate_();
        // Debounce multiple calls
        if (!this.isOpen_) {
          this.adapter_.notifyOpen();
        }
        this.isOpen_ = true;
      }
    }, {
      key: 'close',
      value: function close() {
        this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
        this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
        this.adapter_.addClass(this.animatingCssClass_);
        this.adapter_.removeClass(this.openCssClass_);
        this.detabinate_();
        // Debounce multiple calls
        if (this.isOpen_) {
          this.adapter_.notifyClose();
        }
        this.isOpen_ = false;
      }
    }, {
      key: 'isOpen',
      value: function isOpen() {
        return this.isOpen_;
      }

      /**
       *  Render all children of the drawer inert when it's closed.
       */

    }, {
      key: 'detabinate_',
      value: function detabinate_() {
        if (this.inert_) {
          return;
        }

        var elements = this.adapter_.getFocusableElements();
        if (elements) {
          for (var i = 0; i < elements.length; i++) {
            this.adapter_.saveElementTabState(elements[i]);
            this.adapter_.makeElementUntabbable(elements[i]);
          }
        }

        this.inert_ = true;
      }

      /**
       *  Make all children of the drawer tabbable again when it's open.
       */

    }, {
      key: 'retabinate_',
      value: function retabinate_() {
        if (!this.inert_) {
          return;
        }

        var elements = this.adapter_.getFocusableElements();
        if (elements) {
          for (var i = 0; i < elements.length; i++) {
            this.adapter_.restoreElementTabState(elements[i]);
          }
        }

        this.inert_ = false;
      }
    }, {
      key: 'handleTouchStart_',
      value: function handleTouchStart_(evt) {
        if (!this.adapter_.hasClass(this.openCssClass_)) {
          return;
        }
        if (evt.pointerType && evt.pointerType !== 'touch') {
          return;
        }

        this.direction_ = this.adapter_.isRtl() ? -1 : 1;
        this.drawerWidth_ = this.adapter_.getDrawerWidth();
        this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
        this.currentX_ = this.startX_;

        this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
      }
    }, {
      key: 'handleTouchMove_',
      value: function handleTouchMove_(evt) {
        if (evt.pointerType && evt.pointerType !== 'touch') {
          return;
        }

        this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
      }
    }, {
      key: 'handleTouchEnd_',
      value: function handleTouchEnd_(evt) {
        if (evt.pointerType && evt.pointerType !== 'touch') {
          return;
        }

        this.prepareForTouchEnd_();

        // Did the user close the drawer by more than 50%?
        if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
          this.close();
        } else {
          // Triggering an open here means we'll get a nice animation back to the fully open state.
          this.open();
        }
      }
    }, {
      key: 'prepareForTouchEnd_',
      value: function prepareForTouchEnd_() {
        cancelAnimationFrame(this.updateRaf_);
        this.adapter_.setTranslateX(null);
      }
    }, {
      key: 'updateDrawer_',
      value: function updateDrawer_() {
        this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
        this.adapter_.setTranslateX(this.newPosition_);
      }
    }, {
      key: 'isRootTransitioningEventTarget_',
      value: function isRootTransitioningEventTarget_() {
        // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
        // if the event target is the root event target currently transitioning.
        return false;
      }
    }, {
      key: 'handleTransitionEnd_',
      value: function handleTransitionEnd_(evt) {
        if (this.isRootTransitioningEventTarget_(evt.target)) {
          this.adapter_.removeClass(this.animatingCssClass_);
          this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
        }
      }
    }, {
      key: 'newPosition_',
      get: function get$$1() {
        var newPos = null;

        if (this.direction_ === 1) {
          newPos = Math.min(0, this.currentX_ - this.startX_);
        } else {
          newPos = Math.max(0, this.currentX_ - this.startX_);
        }

        return newPos;
      }
    }]);
    return MDCSlidableDrawerFoundation;
  }(MDCFoundation);

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses$6 = {
    ROOT: 'mdc-drawer--persistent',
    OPEN: 'mdc-drawer--open',
    ANIMATING: 'mdc-drawer--animating'
  };

  var strings$6 = {
    DRAWER_SELECTOR: '.mdc-drawer--persistent .mdc-drawer__drawer',
    FOCUSABLE_ELEMENTS: FOCUSABLE_ELEMENTS,
    OPEN_EVENT: 'MDCPersistentDrawer:open',
    CLOSE_EVENT: 'MDCPersistentDrawer:close'
  };

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCPersistentDrawerFoundation = function (_MDCSlidableDrawerFou) {
    inherits(MDCPersistentDrawerFoundation, _MDCSlidableDrawerFou);
    createClass(MDCPersistentDrawerFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$6;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$6;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return _extends(MDCSlidableDrawerFoundation.defaultAdapter, {
          isDrawer: function isDrawer() {
            return false;
          }
        });
      }
    }]);

    function MDCPersistentDrawerFoundation(adapter) {
      classCallCheck(this, MDCPersistentDrawerFoundation);
      return possibleConstructorReturn(this, (MDCPersistentDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCPersistentDrawerFoundation)).call(this, _extends(MDCPersistentDrawerFoundation.defaultAdapter, adapter), MDCPersistentDrawerFoundation.cssClasses.ROOT, MDCPersistentDrawerFoundation.cssClasses.ANIMATING, MDCPersistentDrawerFoundation.cssClasses.OPEN));
    }

    createClass(MDCPersistentDrawerFoundation, [{
      key: 'isRootTransitioningEventTarget_',
      value: function isRootTransitioningEventTarget_(el) {
        return this.adapter_.isDrawer(el);
      }
    }]);
    return MDCPersistentDrawerFoundation;
  }(MDCSlidableDrawerFoundation);

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var TAB_DATA = 'data-mdc-tabindex';
  var TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

  var storedTransformPropertyName_ = void 0;
  var supportsPassive_$2 = void 0;

  // Remap touch events to pointer events, if the browser doesn't support touch events.
  function remapEvent(eventName) {
    var globalObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

    if (!('ontouchstart' in globalObj.document)) {
      switch (eventName) {
        case 'touchstart':
          return 'pointerdown';
        case 'touchmove':
          return 'pointermove';
        case 'touchend':
          return 'pointerup';
        default:
          return eventName;
      }
    }

    return eventName;
  }

  // Choose the correct transform property to use on the current browser.
  function getTransformPropertyName() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (storedTransformPropertyName_ === undefined || forceRefresh) {
      var el = globalObj.document.createElement('div');
      var transformPropertyName = 'transform' in el.style ? 'transform' : '-webkit-transform';
      storedTransformPropertyName_ = transformPropertyName;
    }

    return storedTransformPropertyName_;
  }

  // Determine whether the current browser supports CSS properties.
  function supportsCssCustomProperties() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

    if ('CSS' in globalObj) {
      return globalObj.CSS.supports('(--color: red)');
    }
    return false;
  }

  // Determine whether the current browser supports passive event listeners, and if so, use them.
  function applyPassive$2() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_$2 === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, { get passive() {
            isSupported = true;
          } });
      } catch (e) {}

      supportsPassive_$2 = isSupported;
    }

    return supportsPassive_$2 ? { passive: true } : false;
  }

  // Save the tab state for an element.
  function saveElementTabState(el) {
    if (el.hasAttribute('tabindex')) {
      el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
    }
    el.setAttribute(TAB_DATA_HANDLED, true);
  }

  // Restore the tab state for an element, if it was saved.
  function restoreElementTabState(el) {
    // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
    if (el.hasAttribute(TAB_DATA_HANDLED)) {
      if (el.hasAttribute(TAB_DATA)) {
        el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
        el.removeAttribute(TAB_DATA);
      } else {
        el.removeAttribute('tabindex');
      }
      el.removeAttribute(TAB_DATA_HANDLED);
    }
  }

  var mdcPersistentDrawer = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('aside', { staticClass: "mdc-persistent-drawer mdc-drawer--persistent mdc-typography", class: _vm.classes }, [_c('nav', { ref: "drawer", staticClass: "mdc-drawer__drawer" }, [_vm.toolbarSpacer ? _c('div', { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-persistent-drawer',
    model: {
      prop: 'open',
      event: 'change'
    },
    props: {
      'toolbar-spacer': Boolean,
      open: Boolean
    },
    data: function data() {
      return {
        classes: {}
      };
    },

    watch: {
      open: '_refresh'
    },
    mounted: function mounted() {
      var _this = this;

      var FOCUSABLE_ELEMENTS = MDCPersistentDrawerFoundation.strings.FOCUSABLE_ELEMENTS;


      this.foundation = new MDCPersistentDrawerFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return !!_this.$refs.drawer;
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          _this.$el.addEventListener(remapEvent(evt), handler, applyPassive$2());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          _this.$el.removeEventListener(remapEvent(evt), handler, applyPassive$2());
        },
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
          _this.$refs.drawer.addEventListener(remapEvent(evt), handler, applyPassive$2());
        },
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
          _this.$refs.drawer.removeEventListener(remapEvent(evt), handler, applyPassive$2());
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          _this.$refs.drawer.addEventListener('transitionend', handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          _this.$refs.drawer.removeEventListener('transitionend', handler);
        },
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
          document.addEventListener('keydown', handler);
        },
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
          document.removeEventListener('keydown', handler);
        },
        getDrawerWidth: function getDrawerWidth() {
          return _this.$refs.drawer.offsetWidth;
        },
        setTranslateX: function setTranslateX(value) {
          _this.$refs.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
        },
        getFocusableElements: function getFocusableElements() {
          return _this.$refs.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
        },
        saveElementTabState: function saveElementTabState$$1(el) {
          saveElementTabState(el);
        },
        restoreElementTabState: function restoreElementTabState$$1(el) {
          restoreElementTabState(el);
        },
        makeElementUntabbable: function makeElementUntabbable(el) {
          el.setAttribute('tabindex', -1);
        },
        notifyOpen: function notifyOpen() {
          _this.$emit('change', true);
          _this.$emit('open');
        },
        notifyClose: function notifyClose() {
          _this.$emit('change', false);
          _this.$emit('close');
        },
        isRtl: function isRtl() {
          /* global getComputedStyle */
          return getComputedStyle(_this.$el).getPropertyValue('direction') === 'rtl';
        },
        isDrawer: function isDrawer(el) {
          return el === _this.$refs.drawer;
        }
      });
      this.foundation && this.foundation.init();
      this._refresh();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation && this.foundation.destroy();
      this.foundation = null;
    },

    methods: {
      _refresh: function _refresh() {
        if (this.open) {
          this.foundation && this.foundation.open();
        } else {
          this.foundation && this.foundation.close();
        }
      }
    }
  };

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses$7 = {
    ROOT: 'mdc-drawer--temporary',
    OPEN: 'mdc-drawer--open',
    ANIMATING: 'mdc-drawer--animating',
    SCROLL_LOCK: 'mdc-drawer-scroll-lock'
  };

  var strings$7 = {
    DRAWER_SELECTOR: '.mdc-drawer--temporary .mdc-drawer__drawer',
    OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
    FOCUSABLE_ELEMENTS: FOCUSABLE_ELEMENTS,
    OPEN_EVENT: 'MDCTemporaryDrawer:open',
    CLOSE_EVENT: 'MDCTemporaryDrawer:close'
  };

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCTemporaryDrawerFoundation = function (_MDCSlidableDrawerFou) {
    inherits(MDCTemporaryDrawerFoundation, _MDCSlidableDrawerFou);
    createClass(MDCTemporaryDrawerFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$7;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$7;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return _extends(MDCSlidableDrawerFoundation.defaultAdapter, {
          addBodyClass: function addBodyClass() /* className: string */{},
          removeBodyClass: function removeBodyClass() /* className: string */{},
          isDrawer: function isDrawer() {
            return false;
          },
          updateCssVariable: function updateCssVariable() /* value: string */{},
          eventTargetHasClass: function eventTargetHasClass() {
            return (/* target: EventTarget, className: string */ /* boolean */false
            );
          }
        });
      }
    }]);

    function MDCTemporaryDrawerFoundation(adapter) {
      classCallCheck(this, MDCTemporaryDrawerFoundation);

      var _this = possibleConstructorReturn(this, (MDCTemporaryDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation)).call(this, _extends(MDCTemporaryDrawerFoundation.defaultAdapter, adapter), MDCTemporaryDrawerFoundation.cssClasses.ROOT, MDCTemporaryDrawerFoundation.cssClasses.ANIMATING, MDCTemporaryDrawerFoundation.cssClasses.OPEN));

      _this.componentClickHandler_ = function (evt) {
        if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses$7.ROOT)) {
          _this.close(true);
        }
      };
      return _this;
    }

    createClass(MDCTemporaryDrawerFoundation, [{
      key: 'init',
      value: function init() {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'init', this).call(this);

        // Make browser aware of custom property being used in this element.
        // Workaround for certain types of hard-to-reproduce heisenbugs.
        this.adapter_.updateCssVariable(0);
        this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'destroy', this).call(this);

        this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
        this.enableScroll_();
      }
    }, {
      key: 'open',
      value: function open() {
        this.disableScroll_();
        // Make sure custom property values are cleared before starting.
        this.adapter_.updateCssVariable('');

        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'open', this).call(this);
      }
    }, {
      key: 'close',
      value: function close() {
        // Make sure custom property values are cleared before making any changes.
        this.adapter_.updateCssVariable('');

        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'close', this).call(this);
      }
    }, {
      key: 'prepareForTouchEnd_',
      value: function prepareForTouchEnd_() {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'prepareForTouchEnd_', this).call(this);

        this.adapter_.updateCssVariable('');
      }
    }, {
      key: 'updateDrawer_',
      value: function updateDrawer_() {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'updateDrawer_', this).call(this);

        var newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
        this.adapter_.updateCssVariable(newOpacity);
      }
    }, {
      key: 'isRootTransitioningEventTarget_',
      value: function isRootTransitioningEventTarget_(el) {
        return this.adapter_.isDrawer(el);
      }
    }, {
      key: 'handleTransitionEnd_',
      value: function handleTransitionEnd_(evt) {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'handleTransitionEnd_', this).call(this, evt);
        if (!this.isOpen_) {
          this.enableScroll_();
        }
      }
    }, {
      key: 'disableScroll_',
      value: function disableScroll_() {
        this.adapter_.addBodyClass(cssClasses$7.SCROLL_LOCK);
      }
    }, {
      key: 'enableScroll_',
      value: function enableScroll_() {
        this.adapter_.removeBodyClass(cssClasses$7.SCROLL_LOCK);
      }
    }]);
    return MDCTemporaryDrawerFoundation;
  }(MDCSlidableDrawerFoundation);

  var mdcTemporaryDrawer = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('aside', { staticClass: "mdc-temporary-drawer mdc-drawer--temporary mdc-typography", class: _vm.classes }, [_c('nav', { ref: "drawer", staticClass: "mdc-drawer__drawer" }, [_vm.toolbarSpacer ? _c('div', { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-temporary-drawer',
    model: {
      prop: 'open',
      event: 'change'
    },
    props: {
      open: Boolean,
      'toolbar-spacer': Boolean
    },
    data: function data() {
      return {
        classes: {}
      };
    },

    watch: {
      open: '_refresh'
    },
    mounted: function mounted() {
      var _this = this;

      var _MDCTemporaryDrawerFo = MDCTemporaryDrawerFoundation.strings,
          FOCUSABLE_ELEMENTS = _MDCTemporaryDrawerFo.FOCUSABLE_ELEMENTS,
          OPACITY_VAR_NAME = _MDCTemporaryDrawerFo.OPACITY_VAR_NAME;


      this.foundation = new MDCTemporaryDrawerFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        addBodyClass: function addBodyClass(className) {
          return document.body.classList.add(className);
        },
        removeBodyClass: function removeBodyClass(className) {
          return document.body.classList.remove(className);
        },
        eventTargetHasClass: function eventTargetHasClass(target, className) {
          return target.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return !!_this.$refs.drawer;
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          _this.$el.addEventListener(remapEvent(evt), handler, applyPassive$2());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          _this.$el.removeEventListener(remapEvent(evt), handler, applyPassive$2());
        },
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
          _this.$refs.drawer.addEventListener(remapEvent(evt), handler, applyPassive$2());
        },
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
          _this.$refs.drawer.removeEventListener(remapEvent(evt), handler, applyPassive$2());
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          _this.$refs.drawer.addEventListener('transitionend', handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          _this.$refs.drawer.removeEventListener('transitionend', handler);
        },
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
          document.addEventListener('keydown', handler);
        },
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
          document.removeEventListener('keydown', handler);
        },
        getDrawerWidth: function getDrawerWidth() {
          return _this.$refs.drawer.offsetWidth;
        },
        setTranslateX: function setTranslateX(value) {
          _this.$refs.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
        },
        updateCssVariable: function updateCssVariable(value) {
          if (supportsCssCustomProperties()) {
            _this.$el.style.setProperty(OPACITY_VAR_NAME, value);
          }
        },
        getFocusableElements: function getFocusableElements() {
          return _this.$refs.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
        },
        saveElementTabState: function saveElementTabState$$1(el) {
          saveElementTabState(el);
        },
        restoreElementTabState: function restoreElementTabState$$1(el) {
          restoreElementTabState(el);
        },
        makeElementUntabbable: function makeElementUntabbable(el) {
          el.setAttribute('tabindex', -1);
        },
        notifyOpen: function notifyOpen() {
          _this.$emit('change', true);
          _this.$emit('open');
        },
        notifyClose: function notifyClose() {
          _this.$emit('change', false);
          _this.$emit('close');
        },
        isRtl: function isRtl() {
          /* global getComputedStyle */
          return getComputedStyle(_this.$el).getPropertyValue('direction') === 'rtl';
        },
        isDrawer: function isDrawer(el) {
          return el === _this.$refs.drawer;
        }
      });
      this.foundation && this.foundation.init();
      this._refresh();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation && this.foundation.destroy();
      this.foundation = null;
    },

    methods: {
      _refresh: function _refresh() {
        if (this.open) {
          this.foundation && this.foundation.open();
        } else {
          this.foundation && this.foundation.close();
        }
      }
    }
  };

  var media = new (function () {
    function _class() {
      classCallCheck(this, _class);
    }

    createClass(_class, [{
      key: 'small',
      get: function get$$1() {
        return this._small || (this._small = window.matchMedia('(max-width: 839px)'));
      }
    }, {
      key: 'large',
      get: function get$$1() {
        return this._large || (this._large = window.matchMedia('(min-width: 1200px)'));
      }
    }]);
    return _class;
  }())();

  var mdcDrawer = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.type, { ref: "drawer", tag: "component", staticClass: "mdc-drawer", attrs: { "toolbar-spacer": _vm.toolbarSpacer }, on: { "change": _vm.onChange, "open": function open($event) {
            _vm.$emit('open');
          }, "close": function close($event) {
            _vm.$emit('close');
          } }, model: { value: _vm.open_, callback: function callback($$v) {
            _vm.open_ = $$v;
          }, expression: "open_" } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-drawer',
    components: {
      'mdc-permanent-drawer': mdcPermanentDrawer,
      'mdc-persistent-drawer': mdcPersistentDrawer,
      'mdc-temporary-drawer': mdcTemporaryDrawer
    },
    model: {
      prop: 'open',
      event: 'change'
    },
    props: {
      open: Boolean,
      permanent: Boolean,
      persistent: Boolean,
      temporary: Boolean,
      drawerType: {
        type: String,
        validator: function validator(val) {
          return val in ['temporary', 'persistent', 'permanent'];
        }
      },
      toolbarSpacer: Boolean,
      toggleOn: String,
      toggleOnSource: { type: Object, required: false },
      openOn: String,
      openOnSource: { type: Object, required: false },
      closeOn: String,
      closeOnSource: { type: Object, required: false }
    },
    provide: function provide() {
      return { mdcDrawer: this };
    },
    data: function data() {
      return {
        small: false,
        large: false,
        open_: false
      };
    },

    computed: {
      type: function type() {
        if (this.permanent) {
          return 'mdc-permanent-drawer';
        } else if (this.persistent) {
          return 'mdc-persistent-drawer';
        } else if (this.temporary) {
          return 'mdc-temporary-drawer';
        } else {
          switch (this.drawerType) {
            case 'permanent':
              return 'mdc-permanent-drawer';
            case 'persistent':
              return 'mdc-persistent-drawer';
            case 'temporary':
              return 'mdc-temporary-drawer';
            default:
              return this.small ? 'mdc-temporary-drawer' : 'mdc-persistent-drawer';
          }
        }
      },
      isPermanent: function isPermanent() {
        return this.permanent || this.type === 'mdc-permanent-drawer';
      },
      isPersistent: function isPersistent() {
        return this.persistent || this.type === 'mdc-persistent-drawer';
      },
      isTemporary: function isTemporary() {
        return this.temporary || this.type === 'mdc-temporary-drawer';
      },
      isResponsive: function isResponsive() {
        return !(this.permanent || this.persistent || this.temporary || this.drawerType);
      }
    },
    watch: {
      open: 'onOpen_'
    },
    created: function created() {
      if (typeof window !== 'undefined' && window.matchMedia) {
        this.small = media.small.matches;
        this.large = media.large.matches;
      }
    },
    mounted: function mounted() {
      var _this = this;

      if (this.toggleOn) {
        this.toggleOnEventSource = this.toggleOnSource || this.$root;
        this.toggleOnEventSource.$on(this.toggleOn, this.toggle);
      }
      if (this.openOn) {
        this.openOnEventSource = this.openOnSource || this.$root;
        this.openOnEventSource.$on(this.openOn, this.show);
      }
      if (this.closeOn) {
        this.closeOnEventSource = this.closeOnSource || this.$root;
        this.closeOnEventSource.$on(this.closeOn, this.close);
      }
      media.small.addListener(this.refreshMedia);
      media.large.addListener(this.refreshMedia);
      this.$nextTick(function () {
        return _this.refreshMedia();
      });
    },
    beforeDestroy: function beforeDestroy() {
      media.small.removeListener(this.refreshMedia);
      media.large.removeListener(this.refreshMedia);

      if (this.toggleOnEventSource) {
        this.toggleOnEventSource.$off(this.toggleOn, this.toggle);
      }
      if (this.openOnEventSource) {
        this.openOnEventSource.$off(this.openOn, this.show);
      }
      if (this.closeOnEventSource) {
        this.closeOnEventSource.$off(this.closeOn, this.close);
      }
    },

    methods: {
      onOpen_: function onOpen_(value) {
        this.isPermanent || (this.open_ = value);
      },
      onChange: function onChange(event) {
        this.$emit('change', event);
        this.$root.$emit('vma:layout');
      },
      show: function show() {
        this.open_ = true;
      },
      close: function close() {
        this.isPermanent || (this.open_ = false);
      },
      toggle: function toggle() {
        this.isPermanent || (this.isOpen() ? this.close() : this.show());
      },
      isOpen: function isOpen() {
        return this.isPermanent || this.open_;
      },
      refreshMedia: function refreshMedia() {
        this.small = media.small.matches;
        this.large = media.large.matches;
        if (this.isResponsive) {
          if (this.large) {
            this.show();
          } else {
            this.close();
          }
        }
      }
    }
  };

  var mdcDrawerLayout = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-drawer-layout" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-drawer-layout'
  };

  var mdcDrawerHeader = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.show ? _c('header', { staticClass: "mdc-drawer-header mdc-drawer__header" }, [_c('div', { staticClass: "mdc-drawer__header-content" }, [_vm._t("default")], 2)]) : _vm._e();
    }, staticRenderFns: [],
    name: 'mdc-drawer-header',
    props: {
      permanent: Boolean,
      persistent: Boolean,
      temporary: Boolean
    },
    inject: ['mdcDrawer'],
    computed: {
      show: function show() {
        if (this.temporary || this.persistent || this.permanent) {
          return this.temporary && this.mdcDrawer.isTemporary || this.persistent && this.mdcDrawer.isPersistent || this.permanent && this.mdcDrawer.isPermanent;
        } else {
          return true;
        }
      }
    }
  };

  var mdcDrawerList = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "mdc-drawer-list mdc-list", class: _vm.classes }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-drawer-list',
    props: {
      dense: Boolean
    },
    data: function data() {
      return {
        classes: {
          'mdc-list--dense': this.dense
        }
      };
    }
  };

  var mdcDrawerItem = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-link', _vm._g({ staticClass: "mdc-drawer-item mdc-list-item", class: [_vm.classes, _vm.itemClasses], style: _vm.styles, attrs: { "link": _vm.link } }, _vm.mylisteners), [_vm.hasStartDetail ? _c('span', { staticClass: "mdc-list-item__graphic" }, [_vm._t("start-detail", [_c('i', { staticClass: "material-icons", attrs: { "aria-hidden": "true" } }, [_vm._v(_vm._s(_vm.startIcon))])])], 2) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-drawer-item',
    inject: ['mdcDrawer'],
    mixins: [DispatchEventMixin, CustomLinkMixin],
    props: {
      startIcon: String,
      temporaryClose: {
        type: Boolean,
        default: true
      },
      activated: Boolean,
      exactActiveClass: {
        type: String,
        default: 'mdc-list-item--activated'
      }
    },
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },

    computed: {
      mylisteners: function mylisteners() {
        var _this = this;

        return _extends({}, this.$listeners, {
          click: function click(e) {
            _this.mdcDrawer.isTemporary && _this.temporaryClose && _this.mdcDrawer.close();
            _this.dispatchEvent(e);
          }
        });
      },
      itemClasses: function itemClasses() {
        return {
          'mdc-list-item--activated': this.activated
        };
      },
      hasStartDetail: function hasStartDetail() {
        return this.startIcon || this.$slots['start-detail'];
      }
    },
    mounted: function mounted() {
      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.ripple && this.ripple.destroy();
      this.ripple = null;
    }
  };

  var mdcDrawerDivider = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('hr', { staticClass: "mdc-list-divider" });
    }, staticRenderFns: [],
    name: 'mdc-drawer-divider'
  };

  var VueMDCDrawer = BasePlugin({
    mdcDrawer: mdcDrawer,
    mdcDrawerLayout: mdcDrawerLayout,
    mdcDrawerHeader: mdcDrawerHeader,
    mdcDrawerList: mdcDrawerList,
    mdcDrawerItem: mdcDrawerItem,
    mdcDrawerDivider: mdcDrawerDivider
  });

  var mdcElevation = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-elevation" });
    }, staticRenderFns: [],
    name: 'mdc-elevation',
    props: {}
  };

  var VueMDCElevation = BasePlugin({
    mdcElevation: mdcElevation
  });

  var mdcFAB = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-button', _vm._g({ staticClass: "mdc-fab", class: _vm.classes, style: _vm.styles, attrs: { "href": _vm.href, "link": _vm.link } }, _vm.listeners), [_c('span', { staticClass: "mdc-fab__icon" }, [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-fab',
    mixins: [DispatchEventMixin, CustomButtonMixin, RippleMixin],
    props: {
      icon: String,
      mini: Boolean,
      absolute: Boolean,
      fixed: Boolean
    },
    data: function data() {
      return {
        classes: {
          'material-icons': this.icon,
          'mdc-fab--mini': this.mini,
          'mdc-fab--absolute': this.absolute,
          'mdc-fab--fixed': this.fixed
        },
        styles: {}
      };
    },

    watch: {
      icon: function icon() {
        this.$set(this.classes, 'material-icons', this.icon);
      },
      mini: function mini() {
        this.$set(this.classes, 'mdc-fab--mini', this.mini);
      }
    }
  };

  var VueMDCFab = BasePlugin({
    mdcFAB: mdcFAB
  });

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var strings$8 = {
    TILES_SELECTOR: '.mdc-grid-list__tiles',
    TILE_SELECTOR: '.mdc-grid-tile'
  };

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCGridListFoundation = function (_MDCFoundation) {
    inherits(MDCGridListFoundation, _MDCFoundation);
    createClass(MDCGridListFoundation, null, [{
      key: 'strings',
      get: function get$$1() {
        return strings$8;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          getOffsetWidth: function getOffsetWidth() {
            return (/* number */0
            );
          },
          getNumberOfTiles: function getNumberOfTiles() {
            return (/* number */0
            );
          },
          getOffsetWidthForTileAtIndex: function getOffsetWidthForTileAtIndex() {
            return (/* index: number */ /* number */0
            );
          },
          setStyleForTilesElement: function setStyleForTilesElement() /* property: string, value: string */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{}
        };
      }
    }]);

    function MDCGridListFoundation(adapter) {
      classCallCheck(this, MDCGridListFoundation);

      var _this = possibleConstructorReturn(this, (MDCGridListFoundation.__proto__ || Object.getPrototypeOf(MDCGridListFoundation)).call(this, _extends(MDCGridListFoundation.defaultAdapter, adapter)));

      _this.resizeHandler_ = function () {
        return _this.alignCenter();
      };
      _this.resizeFrame_ = 0;
      return _this;
    }

    createClass(MDCGridListFoundation, [{
      key: 'init',
      value: function init() {
        this.alignCenter();
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }
    }, {
      key: 'alignCenter',
      value: function alignCenter() {
        var _this2 = this;

        if (this.resizeFrame_ !== 0) {
          cancelAnimationFrame(this.resizeFrame_);
        }
        this.resizeFrame_ = requestAnimationFrame(function () {
          _this2.alignCenter_();
          _this2.resizeFrame_ = 0;
        });
      }
    }, {
      key: 'alignCenter_',
      value: function alignCenter_() {
        if (this.adapter_.getNumberOfTiles() == 0) {
          return;
        }
        var gridWidth = this.adapter_.getOffsetWidth();
        var itemWidth = this.adapter_.getOffsetWidthForTileAtIndex(0);
        var tilesWidth = itemWidth * Math.floor(gridWidth / itemWidth);
        this.adapter_.setStyleForTilesElement('width', tilesWidth + 'px');
      }
    }]);
    return MDCGridListFoundation;
  }(MDCFoundation);

  var mdcGridList = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-grid-list" }, [_c('ul', { staticClass: "mdc-grid-list__tiles", class: _vm.classes, style: _vm.styles }, [_vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-grid-list',
    props: {
      width: [String, Number],
      ratio: String,
      'narrow-gutter': Boolean,
      'header-caption': Boolean,
      'icon-align-start': Boolean,
      'icon-align-end': Boolean,
      'with-support-text': Boolean,
      interactive: Boolean
    },
    provide: function provide() {
      return { mdcGrid: this };
    },

    computed: {
      classes: function classes() {
        var classes = {};

        classes['mdc-grid-list--tile-gutter-1'] = this.narrowGutter;
        classes['mdc-grid-list--header-caption'] = this.headerCaption;
        classes['mdc-grid-list--tile-aspect-' + this.ratio] = this.ratio;
        classes['mdc-grid-list--with-icon-align-start'] = this.iconAlignStart;
        classes['mdc-grid-list--with-icon-align-end'] = this.iconAlignEnd;
        classes['mdc-grid-list--twoline-caption'] = this.withSupportText;
        classes['mdc-grid-list--non-interactive'] = !this.interactive;

        return classes;
      },
      styles: function styles() {
        var defaultWidth = 200;
        return {
          '--mdc-grid-list-tile-width': (this.width || defaultWidth) + 'px'
        };
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCGridListFoundation({
        getOffsetWidth: function getOffsetWidth() {
          return _this.$el.offsetWidth;
        },
        getNumberOfTiles: function getNumberOfTiles() {
          return _this.$el.querySelectorAll(MDCGridListFoundation.strings.TILE_SELECTOR).length;
        },
        getOffsetWidthForTileAtIndex: function getOffsetWidthForTileAtIndex(index) {
          return _this.$el.querySelectorAll(MDCGridListFoundation.strings.TILE_SELECTOR)[index].offsetWidth;
        },
        setStyleForTilesElement: function setStyleForTilesElement(property, value) {
          _this.$el.querySelector(MDCGridListFoundation.strings.TILES_SELECTOR).style[property] = value;
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          window.removeEventListener('resize', handler);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    }
  };

  var mdcGridTile = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', _vm._g({ staticClass: "mdc-grid-tile", class: [_vm.classes, _vm.itemClasses], style: _vm.styles, attrs: { "tabindex": _vm.isInteractive ? '0' : undefined } }, _vm.isInteractive ? _vm.listeners : _vm.clickListener), [_vm.cover ? _c('div', { staticClass: "mdc-grid-tile__primary" }, [_c('div', { staticClass: "mdc-grid-tile__primary-content", style: { backgroundImage: 'url(' + _vm.src + ')' } })]) : _c('div', { staticClass: "mdc-grid-tile__primary" }, [_c('img', { staticClass: "mdc-grid-tile__primary-content", attrs: { "src": _vm.src } })]), _vm._v(" "), _vm.title || _vm.supportText ? _c('span', { staticClass: "mdc-grid-tile__secondary" }, [_vm.icon ? _c('i', { staticClass: "mdc-grid-tile__icon material-icons" }, [_vm._v(_vm._s(_vm.icon))]) : _vm._e(), _vm._v(" "), _vm.title ? _c('span', { staticClass: "mdc-grid-tile__title" }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _vm.supportText ? _c('span', { staticClass: "mdc-grid-tile__support-text" }, [_vm._v(_vm._s(_vm.supportText))]) : _vm._e()]) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-grid-tile',
    inject: ['mdcGrid'],
    mixins: [DispatchEventMixin],
    props: {
      src: String,
      cover: Boolean,
      icon: String,
      title: String,
      'support-text': String,
      selected: Boolean,
      activated: Boolean
    },
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },

    computed: {
      clickListener: function clickListener() {
        var _this = this;

        return { click: function click(e) {
            return _this.dispatchEvent(e);
          } };
      },
      itemClasses: function itemClasses() {
        return {
          'mdc-grid-tile--selected': this.selected,
          'mdc-grid-tile--activated': this.activated
        };
      },
      isInteractive: function isInteractive() {
        return this.mdcGrid && this.mdcGrid.interactive;
      },
      hasStartDetail: function hasStartDetail() {
        return this.startIcon || this.$slots['start-detail'];
      },
      hasEndDetail: function hasEndDetail() {
        return this.endIcon || this.$slots['end-detail'];
      }
    },
    watch: {
      isInteractive: function isInteractive(value) {
        if (value) {
          this.addRipple();
        } else {
          this.removeRipple();
        }
      }
    },
    mounted: function mounted() {
      this.isInteractive && this.addRipple();
    },
    beforeDestroy: function beforeDestroy() {
      this.removeRipple();
    },

    methods: {
      addRipple: function addRipple() {
        if (!this.ripple) {
          var ripple = new RippleBase(this);
          ripple.init();
          this.ripple = ripple;
        }
      },
      removeRipple: function removeRipple() {
        if (this.ripple) {
          var ripple = this.ripple;
          this.ripple = null;
          ripple.destroy();
        }
      }
    }
  };

  var VueMDCGridList = BasePlugin({
    mdcGridList: mdcGridList,
    mdcGridTile: mdcGridTile
  });

  var mdcIcon = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { staticClass: "mdc-icon mdc-icon--material", class: { 'material-icons': !!_vm.icon } }, [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
    }, staticRenderFns: [],
    name: 'mdc-icon',
    props: {
      icon: String
    }
  };

  var VueMDCIcon = BasePlugin({
    mdcIcon: mdcIcon
  });

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Icon Toggle. Provides an interface for managing
   * - classes
   * - dom
   * - inner text
   * - event handlers
   * - event dispatch
   *
   * Additionally, provides type information for the adapter to the Closure
   * compiler.
   *
   * Implement this adapter for your framework of choice to delegate updates to
   * the component in your framework of choice. See architecture documentation
   * for more details.
   * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
   *
   * @record
   */

  var MDCIconToggleAdapter = function () {
    function MDCIconToggleAdapter() {
      classCallCheck(this, MDCIconToggleAdapter);
    }

    createClass(MDCIconToggleAdapter, [{
      key: "addClass",

      /** @param {string} className */
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * @param {string} type
       * @param {!EventListener} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(type, handler) {}

      /**
       * @param {string} type
       * @param {!EventListener} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}

      /** @param {string} text */

    }, {
      key: "setText",
      value: function setText(text) {}

      /** @return {number} */

    }, {
      key: "getTabIndex",
      value: function getTabIndex() {}

      /** @param {number} tabIndex */

    }, {
      key: "setTabIndex",
      value: function setTabIndex(tabIndex) {}

      /**
       * @param {string} name
       * @return {string}
       */

    }, {
      key: "getAttr",
      value: function getAttr(name) {}

      /**
       * @param {string} name
       * @param {string} value
       */

    }, {
      key: "setAttr",
      value: function setAttr(name, value) {}

      /** @param {string} name */

    }, {
      key: "rmAttr",
      value: function rmAttr(name) {}

      /** @param {!IconToggleEvent} evtData */

    }, {
      key: "notifyChange",
      value: function notifyChange(evtData) {}
    }]);
    return MDCIconToggleAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var cssClasses$8 = {
    ROOT: 'mdc-icon-toggle',
    DISABLED: 'mdc-icon-toggle--disabled'
  };

  /** @enum {string} */
  var strings$9 = {
    DATA_TOGGLE_ON: 'data-toggle-on',
    DATA_TOGGLE_OFF: 'data-toggle-off',
    ARIA_PRESSED: 'aria-pressed',
    ARIA_DISABLED: 'aria-disabled',
    ARIA_LABEL: 'aria-label',
    CHANGE_EVENT: 'MDCIconToggle:change'
  };

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCIconToggleAdapter>}
   */

  var MDCIconToggleFoundation = function (_MDCFoundation) {
    inherits(MDCIconToggleFoundation, _MDCFoundation);
    createClass(MDCIconToggleFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$8;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$9;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          setText: function setText() /* text: string */{},
          getTabIndex: function getTabIndex() {
            return (/* number */0
            );
          },
          setTabIndex: function setTabIndex() /* tabIndex: number */{},
          getAttr: function getAttr() {
            return (/* name: string */ /* string */''
            );
          },
          setAttr: function setAttr() /* name: string, value: string */{},
          rmAttr: function rmAttr() /* name: string */{},
          notifyChange: function notifyChange() /* evtData: IconToggleEvent */{}
        };
      }
    }]);

    function MDCIconToggleFoundation(adapter) {
      classCallCheck(this, MDCIconToggleFoundation);

      /** @private {boolean} */
      var _this = possibleConstructorReturn(this, (MDCIconToggleFoundation.__proto__ || Object.getPrototypeOf(MDCIconToggleFoundation)).call(this, _extends(MDCIconToggleFoundation.defaultAdapter, adapter)));

      _this.on_ = false;

      /** @private {boolean} */
      _this.disabled_ = false;

      /** @private {number} */
      _this.savedTabIndex_ = -1;

      /** @private {?IconToggleState} */
      _this.toggleOnData_ = null;

      /** @private {?IconToggleState} */
      _this.toggleOffData_ = null;

      _this.clickHandler_ = /** @private {!EventListener} */function () {
        return _this.toggleFromEvt_();
      };

      /** @private {boolean} */
      _this.isHandlingKeydown_ = false;

      _this.keydownHandler_ = /** @private {!EventListener} */function ( /** @type {!KeyboardKey} */evt) {
        if (isSpace(evt)) {
          _this.isHandlingKeydown_ = true;
          return evt.preventDefault();
        }
      };

      _this.keyupHandler_ = /** @private {!EventListener} */function ( /** @type {!KeyboardKey} */evt) {
        if (isSpace(evt)) {
          _this.isHandlingKeydown_ = false;
          _this.toggleFromEvt_();
        }
      };
      return _this;
    }

    createClass(MDCIconToggleFoundation, [{
      key: 'init',
      value: function init() {
        this.refreshToggleData();
        this.savedTabIndex_ = this.adapter_.getTabIndex();
        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
      }
    }, {
      key: 'refreshToggleData',
      value: function refreshToggleData() {
        var _MDCIconToggleFoundat = MDCIconToggleFoundation.strings,
            DATA_TOGGLE_ON = _MDCIconToggleFoundat.DATA_TOGGLE_ON,
            DATA_TOGGLE_OFF = _MDCIconToggleFoundat.DATA_TOGGLE_OFF;

        this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
        this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
      }

      /** @private */

    }, {
      key: 'toggleFromEvt_',
      value: function toggleFromEvt_() {
        this.toggle();
        var isOn = this.on_;

        this.adapter_.notifyChange( /** @type {!IconToggleEvent} */{ isOn: isOn });
      }

      /** @return {boolean} */

    }, {
      key: 'isOn',
      value: function isOn() {
        return this.on_;
      }

      /** @param {boolean=} isOn */

    }, {
      key: 'toggle',
      value: function toggle() {
        var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.on_;

        this.on_ = isOn;

        var _MDCIconToggleFoundat2 = MDCIconToggleFoundation.strings,
            ARIA_LABEL = _MDCIconToggleFoundat2.ARIA_LABEL,
            ARIA_PRESSED = _MDCIconToggleFoundat2.ARIA_PRESSED;


        if (this.on_) {
          this.adapter_.setAttr(ARIA_PRESSED, 'true');
        } else {
          this.adapter_.setAttr(ARIA_PRESSED, 'false');
        }

        var _ref = this.on_ ? this.toggleOffData_ : this.toggleOnData_,
            classToRemove = _ref.cssClass;

        if (classToRemove) {
          this.adapter_.removeClass(classToRemove);
        }

        var _ref2 = this.on_ ? this.toggleOnData_ : this.toggleOffData_,
            content = _ref2.content,
            label = _ref2.label,
            cssClass = _ref2.cssClass;

        if (cssClass) {
          this.adapter_.addClass(cssClass);
        }
        if (content) {
          this.adapter_.setText(content);
        }
        if (label) {
          this.adapter_.setAttr(ARIA_LABEL, label);
        }
      }

      /**
       * @param {string} dataAttr
       * @return {!IconToggleState}
       */

    }, {
      key: 'parseJsonDataAttr_',
      value: function parseJsonDataAttr_(dataAttr) {
        var val = this.adapter_.getAttr(dataAttr);
        if (!val) {
          return {};
        }
        return (/** @type {!IconToggleState} */JSON.parse(val)
        );
      }

      /** @return {boolean} */

    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.disabled_;
      }

      /** @param {boolean} isDisabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(isDisabled) {
        this.disabled_ = isDisabled;

        var DISABLED = MDCIconToggleFoundation.cssClasses.DISABLED;
        var ARIA_DISABLED = MDCIconToggleFoundation.strings.ARIA_DISABLED;


        if (this.disabled_) {
          this.savedTabIndex_ = this.adapter_.getTabIndex();
          this.adapter_.setTabIndex(-1);
          this.adapter_.setAttr(ARIA_DISABLED, 'true');
          this.adapter_.addClass(DISABLED);
        } else {
          this.adapter_.setTabIndex(this.savedTabIndex_);
          this.adapter_.rmAttr(ARIA_DISABLED);
          this.adapter_.removeClass(DISABLED);
        }
      }

      /** @return {boolean} */

    }, {
      key: 'isKeyboardActivated',
      value: function isKeyboardActivated() {
        return this.isHandlingKeydown_;
      }
    }]);
    return MDCIconToggleFoundation;
  }(MDCFoundation);

  /**
   * @param {!KeyboardKey} keyboardKey
   * @return {boolean}
   */
  function isSpace(keyboardKey) {
    return keyboardKey.key === 'Space' || keyboardKey.keyCode === 32;
  }

  var mdcIConToggle = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { staticClass: "mdc-icon-toggle", class: _vm.classes, style: _vm.styles, attrs: { "tabindex": _vm.tabIndex, "data-toggle-on": _vm.toggleOnData, "data-toggle-off": _vm.toggleOffData, "role": "button", "aria-pressed": "false" } }, [_c('i', { class: _vm.iconClasses, attrs: { "aria-hidden": "true" } }, [_vm._v(_vm._s(_vm.text))])]);
    }, staticRenderFns: [],
    name: 'mdc-icon-toggle',
    props: {
      toggleOn: [String, Object],
      toggleOff: [String, Object],
      value: Boolean,
      disabled: Boolean,
      accent: Boolean
    },
    data: function data() {
      return {
        classes: {
          'mdc-icon-toggle--accent': this.accent
        },
        styles: {},
        iconClasses: {},
        tabIndex: 0,
        text: ''
      };
    },

    computed: {
      toggleOnData: function toggleOnData() {
        var toggle = this.toggleOn;
        return toggle && JSON.stringify(typeof toggle === 'string' ? {
          content: toggle,
          cssClass: 'material-icons'
        } : {
          content: toggle.icon || toggle.content,
          label: toggle.label,
          cssClass: toggle.icon ? 'material-icons' : toggle.cssClass
        });
      },
      toggleOffData: function toggleOffData() {
        var toggle = this.toggleOff;
        return toggle && JSON.stringify(typeof toggle === 'string' ? {
          content: toggle,
          cssClass: 'material-icons'
        } : {
          content: toggle.icon || toggle.content,
          label: toggle.label,
          cssClass: toggle.icon ? 'material-icons' : toggle.cssClass
        });
      }
    },
    watch: {
      value: function value(_value) {
        this.foundation && this.foundation.toggle(_value);
      },
      disabled: function disabled(_disabled) {
        this.foundation && this.foundation.setDisabled(_disabled);
      },
      toggleOnData: function toggleOnData() {
        this.foundation && this.foundation.refreshToggleData();
      },
      toggleOffData: function toggleOffData() {
        this.foundation && this.foundation.refreshToggleData();
      },
      accent: function accent(value) {
        this.$set(this.classes, 'mdc-icon-toggle--secondary', value);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCIconToggleFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.iconClasses, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.iconClasses, className);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          return _this.$el.addEventListener(evt, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          return _this.$el.removeEventListener(evt, handler);
        },
        setText: function setText(text) {
          _this.text = text;
        },
        getTabIndex: function getTabIndex() {
          return _this.tabIndex;
        },
        setTabIndex: function setTabIndex(tabIndex) {
          _this.tabIndex = tabIndex;
        },
        getAttr: function getAttr(name, value) {
          return _this.$el.getAttribute(name, value);
        },
        setAttr: function setAttr(name, value) {
          _this.$el.setAttribute(name, value);
        },
        rmAttr: function rmAttr(name) {
          _this.$el.removeAttribute(name);
        },
        notifyChange: function notifyChange(evtData) {
          _this.$emit('input', evtData.isOn);
        }
      });
      this.foundation.init();
      this.foundation.toggle(this.value);
      this.foundation.setDisabled(this.disabled);

      this.ripple = new RippleBase(this, {
        isUnbounded: function isUnbounded() {
          return true;
        },
        isSurfaceActive: function isSurfaceActive() {
          return _this.foundation.isKeyboardActivated();
        }
      });
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
      this.ripple.destroy();
    }
  };

  var VueMDCIconToggle = BasePlugin({
    mdcIConToggle: mdcIConToggle
  });

  var mdcLayoutApp = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-app" }, [_c('div', { staticClass: "mdc-layout-app--toolbar-wrapper" }, [_vm._t("toolbar")], 2), _vm._v(" "), _c('div', { staticClass: "mdc-layout-app--main-container" }, [_c('div', { staticClass: "mdc-layout-app--drawer-wrapper" }, [_vm._t("drawer")], 2), _vm._v(" "), _c('div', { staticClass: "mdc-layout-app--content-wrapper" }, [_vm._t("default")], 2)])]);
    }, staticRenderFns: [],
    name: 'mdc-layout-app'
  };

  var VueMDCLayoutApp = BasePlugin({
    mdcLayoutApp: mdcLayoutApp
  });

  var mdcLayoutGrid = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_c('div', { staticClass: "mdc-layout-grid__inner" }, [_vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-layout-grid',
    props: {
      'fixed-column-width': Boolean,
      'align-left': Boolean,
      'align-right': Boolean
    },
    computed: {
      classes: function classes() {
        return {
          'mdc-layout-grid': true,
          'mdc-layout-grid--fixed-column-width': this.fixedColumnWidth,
          'mdc-layout-grid--align-left': this.alignLeft,
          'mdc-layout-grid--align-right': this.alignRight
        };
      }
    }
  };

  var spanOptions = {
    type: [String, Number],
    default: null,
    validator: function validator(value) {
      var num = Number(value);
      return isFinite(num) && num <= 12 && num > 0;
    }
  };

  var mdcLayoutCell = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-cell mdc-layout-grid__cell", class: _vm.classes }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-layout-cell',
    props: {
      span: spanOptions,
      order: spanOptions,
      phone: spanOptions,
      tablet: spanOptions,
      desktop: spanOptions,
      align: {
        type: String,
        validator: function validator(value) {
          return ['top', 'bottom', 'middle'].indexOf(value) !== -1;
        }
      }
    },
    computed: {
      classes: function classes() {
        var classes = [];

        if (this.span) {
          classes.push("mdc-layout-grid__cell--span-" + this.span);
        }

        if (this.order) {
          classes.push("mdc-layout-grid__cell--order-" + this.order);
        }

        if (this.phone) {
          classes.push("mdc-layout-grid__cell--span-" + this.phone + "-phone");
        }

        if (this.tablet) {
          classes.push("mdc-layout-grid__cell--span-" + this.tablet + "-tablet");
        }

        if (this.desktop) {
          classes.push("mdc-layout-grid__cell--span-" + this.desktop + "-desktop");
        }

        if (this.align) {
          classes.push("mdc-layout-grid__cell--align-" + this.align);
        }

        return classes;
      }
    }
  };

  var mdcLayoutInnerGrid = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-inner-grid mdc-layout-grid__inner" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-layout-inner-grid'
  };

  var VueMDCLayoutGrid = BasePlugin({
    mdcLayoutGrid: mdcLayoutGrid,
    mdcLayoutCell: mdcLayoutCell,
    mdcLayoutInnerGrid: mdcLayoutInnerGrid
  });

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses$9 = {
    CLOSED_CLASS: 'mdc-linear-progress--closed',
    INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
    REVERSED_CLASS: 'mdc-linear-progress--reversed'
  };

  var strings$a = {
    PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar',
    BUFFER_SELECTOR: '.mdc-linear-progress__buffer'
  };

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCLinearProgressFoundation = function (_MDCFoundation) {
    inherits(MDCLinearProgressFoundation, _MDCFoundation);
    createClass(MDCLinearProgressFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$9;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$a;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          getPrimaryBar: function getPrimaryBar() /* el: Element */{},
          getBuffer: function getBuffer() /* el: Element */{},
          hasClass: function hasClass() {
            return (/* className: string */false
            );
          },
          removeClass: function removeClass() /* className: string */{},
          setStyle: function setStyle() /* el: Element, styleProperty: string, value: string */{}
        };
      }
    }]);

    function MDCLinearProgressFoundation(adapter) {
      classCallCheck(this, MDCLinearProgressFoundation);
      return possibleConstructorReturn(this, (MDCLinearProgressFoundation.__proto__ || Object.getPrototypeOf(MDCLinearProgressFoundation)).call(this, _extends(MDCLinearProgressFoundation.defaultAdapter, adapter)));
    }

    createClass(MDCLinearProgressFoundation, [{
      key: 'init',
      value: function init() {
        this.determinate_ = !this.adapter_.hasClass(cssClasses$9.INDETERMINATE_CLASS);
        this.reverse_ = this.adapter_.hasClass(cssClasses$9.REVERSED_CLASS);
        this.progress_ = 0;
      }
    }, {
      key: 'setDeterminate',
      value: function setDeterminate(isDeterminate) {
        this.determinate_ = isDeterminate;
        if (this.determinate_) {
          this.adapter_.removeClass(cssClasses$9.INDETERMINATE_CLASS);
          this.setScale_(this.adapter_.getPrimaryBar(), this.progress_);
        } else {
          this.adapter_.addClass(cssClasses$9.INDETERMINATE_CLASS);
          this.setScale_(this.adapter_.getPrimaryBar(), 1);
          this.setScale_(this.adapter_.getBuffer(), 1);
        }
      }
    }, {
      key: 'setProgress',
      value: function setProgress(value) {
        this.progress_ = value;
        if (this.determinate_) {
          this.setScale_(this.adapter_.getPrimaryBar(), value);
        }
      }
    }, {
      key: 'setBuffer',
      value: function setBuffer(value) {
        if (this.determinate_) {
          this.setScale_(this.adapter_.getBuffer(), value);
        }
      }
    }, {
      key: 'setReverse',
      value: function setReverse(isReversed) {
        this.reverse_ = isReversed;
        if (this.reverse_) {
          this.adapter_.addClass(cssClasses$9.REVERSED_CLASS);
        } else {
          this.adapter_.removeClass(cssClasses$9.REVERSED_CLASS);
        }
      }
    }, {
      key: 'open',
      value: function open() {
        this.adapter_.removeClass(cssClasses$9.CLOSED_CLASS);
      }
    }, {
      key: 'close',
      value: function close() {
        this.adapter_.addClass(cssClasses$9.CLOSED_CLASS);
      }
    }, {
      key: 'setScale_',
      value: function setScale_(el, scaleValue) {
        var _this2 = this;

        var value = 'scaleX(' + scaleValue + ')';
        transformStyleProperties.forEach(function (transformStyleProperty) {
          _this2.adapter_.setStyle(el, transformStyleProperty, value);
        });
      }
    }]);
    return MDCLinearProgressFoundation;
  }(MDCFoundation);

  var ProgressPropType = {
    type: [Number, String],
    validator: function validator(value) {
      return Number(value) >= 0 && Number(value) <= 1;
    }
  };

  var mdcLinearProgress = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-linear-progress", class: _vm.classes, style: _vm.styles, attrs: { "role": "progressbar" } }, [_c('div', { staticClass: "mdc-linear-progress__buffering-dots" }), _vm._v(" "), _c('div', { ref: "buffer", staticClass: "mdc-linear-progress__buffer" }), _vm._v(" "), _c('div', { ref: "primary", staticClass: "mdc-linear-progress__bar mdc-linear-progress__primary-bar" }, [_c('span', { staticClass: "mdc-linear-progress__bar-inner" })]), _vm._v(" "), _vm._m(0)]);
    }, staticRenderFns: [function () {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-linear-progress__bar mdc-linear-progress__secondary-bar" }, [_c('span', { staticClass: "mdc-linear-progress__bar-inner" })]);
    }],
    name: 'mdc-linear-progress',
    props: {
      open: { type: Boolean, default: true },
      indeterminate: Boolean,
      reverse: Boolean,
      accent: Boolean,
      progress: ProgressPropType,
      buffer: ProgressPropType
    },
    data: function data() {
      return {
        classes: { 'mdc-linear-progress--accent': this.accent },
        styles: {}
      };
    },

    watch: {
      open: function open() {
        if (this.open) {
          this.foundation.open();
        } else {
          this.foundation.close();
        }
      },
      progress: function progress() {
        this.foundation.setProgress(Number(this.progress));
      },
      buffer: function buffer() {
        this.foundation.setBuffer(Number(this.buffer));
      },
      indeterminate: function indeterminate() {
        this.foundation.setDeterminate(!this.indeterminate);
      },
      reverse: function reverse() {
        this.foundation.setReverse(this.reverse);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCLinearProgressFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.classes, className, true);
        },
        getPrimaryBar: function getPrimaryBar() /* el: Element */{
          return _this.$refs.primary;
        },
        getBuffer: function getBuffer() /* el: Element */{
          return _this.$refs.buffer;
        },
        hasClass: function hasClass(className) {
          _this.$el.classList.contains(className);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.classes, className);
        },
        setStyle: function setStyle(el, styleProperty, value) {
          el.style[styleProperty] = value;
        }
      });
      this.foundation.init();

      this.foundation.setReverse(this.reverse);
      this.foundation.setProgress(Number(this.progress));
      this.foundation.setBuffer(Number(this.buffer));
      this.foundation.setDeterminate(!this.indeterminate);
      if (this.open) {
        this.foundation.open();
      } else {
        this.foundation.close();
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    }
  };

  var VueMDCLinearProgress = BasePlugin({
    mdcLinearProgress: mdcLinearProgress
  });

  var mdcList = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { staticClass: "mdc-list", class: _vm.classes }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-list',
    props: {
      dense: Boolean,
      avatarList: Boolean,
      twoLine: Boolean,
      bordered: Boolean,
      interactive: Boolean
    },
    provide: function provide() {
      return { mdcList: this };
    },

    computed: {
      classes: function classes() {
        return {
          'mdc-list--dense': this.dense,
          'mdc-list--avatar-list': this.avatarList,
          'mdc-list--two-line': this.twoLine,
          'mdc-list--bordered': this.bordered,
          'mdc-list--non-interactive': !this.interactive
        };
      }
    }
  };

  var mdcListItem = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', _vm._g({ staticClass: "mdc-list-item", class: [_vm.classes, _vm.itemClasses], style: _vm.styles, attrs: { "tabindex": _vm.isInteractive ? '0' : undefined } }, _vm.isInteractive ? _vm.$listeners : {}), [_vm.hasStartDetail ? _c('span', { staticClass: "mdc-list-item__graphic" }, [_vm._t("start-detail")], 2) : _vm._e(), _vm._v(" "), _vm.hasSecondary ? _c('span', { staticClass: "mdc-list-item__text" }, [_vm._t("default"), _vm._v(" "), _c('span', { staticClass: "mdc-list-item__secondary-text" }, [_vm._t("secondary")], 2)], 2) : _vm._t("default"), _vm._v(" "), _vm.hasEndDetail ? _c('span', { staticClass: "mdc-list-item__meta" }, [_vm._t("end-detail")], 2) : _vm._e()], 2);
    }, staticRenderFns: [],
    name: 'mdc-list-item',
    inject: ['mdcList'],
    props: {
      selected: Boolean,
      activated: Boolean
    },
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },

    computed: {
      itemClasses: function itemClasses() {
        return {
          'mdc-list-item--selected': this.selected,
          'mdc-list-item--activated': this.activated
        };
      },
      isInteractive: function isInteractive() {
        return this.mdcList && this.mdcList.interactive;
      },
      hasSecondary: function hasSecondary() {
        return this.$slots['secondary'] && this.mdcList && this.mdcList.twoLine;
      },
      hasEndDetail: function hasEndDetail() {
        return !!this.$slots['end-detail'];
      },
      hasStartDetail: function hasStartDetail() {
        return !!this.$slots['start-detail'];
      }
    },
    watch: {
      isInteractive: function isInteractive(value) {
        if (value) {
          this.addRipple();
        } else {
          this.removeRipple();
        }
      }
    },
    mounted: function mounted() {
      this.isInteractive && this.addRipple();
    },
    beforeDestroy: function beforeDestroy() {
      this.removeRipple();
    },

    methods: {
      addRipple: function addRipple() {
        if (!this.ripple) {
          var ripple = new RippleBase(this);
          ripple.init();
          this.ripple = ripple;
        }
      },
      removeRipple: function removeRipple() {
        if (this.ripple) {
          var ripple = this.ripple;
          this.ripple = null;
          ripple.destroy();
        }
      }
    }
  };

  var mdcListDivider = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "mdc-list-divider", class: _vm.classes, attrs: { "role": "separator" } });
    }, staticRenderFns: [],
    name: 'mdc-list-divider',
    props: {
      inset: Boolean,
      padded: Boolean
    },
    computed: {
      classes: function classes() {
        return {
          'mdc-list-divider--inset': this.inset,
          'mdc-list-divider--padded': this.padded
        };
      }
    }
  };

  var mdcListGroup = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-list-group" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-list-group'
  };

  var mdcListGroupHeader = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('h3', { staticClass: "mdc-list-group-header mdc-list-group__subheader" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-list-group-header'
  };

  var mdcListGroupDivider = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('hr', { staticClass: "mdc-list-group-divider mdc-list-divider" });
    }, staticRenderFns: [],
    name: 'mdc-list-group-divider'
  };

  var VueMDCList = BasePlugin({
    mdcList: mdcList,
    mdcListItem: mdcListItem,
    mdcListDivider: mdcListDivider,
    mdcListGroup: mdcListGroup,
    mdcListGroupHeader: mdcListGroupHeader,
    mdcListGroupDivider: mdcListGroupDivider
  });

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Menu. Provides an interface for managing
   * - classes
   * - dom
   * - focus
   * - position
   * - dimensions
   * - event handlers
   *
   * Additionally, provides type information for the adapter to the Closure
   * compiler.
   *
   * Implement this adapter for your framework of choice to delegate updates to
   * the component in your framework of choice. See architecture documentation
   * for more details.
   * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
   *
   * @record
   */
  var MDCMenuAdapter = function () {
    function MDCMenuAdapter() {
      classCallCheck(this, MDCMenuAdapter);
    }

    createClass(MDCMenuAdapter, [{
      key: "addClass",

      /** @param {string} className */
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "hasClass",
      value: function hasClass(className) {}

      /** @return {boolean} */

    }, {
      key: "hasNecessaryDom",
      value: function hasNecessaryDom() {}

      /**
       * @param {EventTarget} target
       * @param {string} attributeName
       * @return {string}
       */

    }, {
      key: "getAttributeForEventTarget",
      value: function getAttributeForEventTarget(target, attributeName) {}

      /** @return {{ width: number, height: number }} */

    }, {
      key: "getInnerDimensions",
      value: function getInnerDimensions() {}

      /** @return {boolean} */

    }, {
      key: "hasAnchor",
      value: function hasAnchor() {}

      /** @return {{width: number, height: number, top: number, right: number, bottom: number, left: number}} */

    }, {
      key: "getAnchorDimensions",
      value: function getAnchorDimensions() {}

      /** @return {{ width: number, height: number }} */

    }, {
      key: "getWindowDimensions",
      value: function getWindowDimensions() {}

      /** @return {number} */

    }, {
      key: "getNumberOfItems",
      value: function getNumberOfItems() {}

      /**
       * @param {string} type
       * @param {function(!Event)} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(type, handler) {}

      /**
       * @param {string} type
       * @param {function(!Event)} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}

      /** @param {function(!Event)} handler */

    }, {
      key: "registerBodyClickHandler",
      value: function registerBodyClickHandler(handler) {}

      /** @param {function(!Event)} handler */

    }, {
      key: "deregisterBodyClickHandler",
      value: function deregisterBodyClickHandler(handler) {}

      /**
       * @param {EventTarget} target
       * @return {number}
       */

    }, {
      key: "getIndexForEventTarget",
      value: function getIndexForEventTarget(target) {}

      /** @param {{index: number}} evtData */

    }, {
      key: "notifySelected",
      value: function notifySelected(evtData) {}
    }, {
      key: "notifyCancel",
      value: function notifyCancel() {}
    }, {
      key: "saveFocus",
      value: function saveFocus() {}
    }, {
      key: "restoreFocus",
      value: function restoreFocus() {}

      /** @return {boolean} */

    }, {
      key: "isFocused",
      value: function isFocused() {}
    }, {
      key: "focus",
      value: function focus() {}

      /** @return {number} */

    }, {
      key: "getFocusedItemIndex",
      value: function getFocusedItemIndex() /* number */{}

      /** @param {number} index */

    }, {
      key: "focusItemAtIndex",
      value: function focusItemAtIndex(index) {}

      /** @return {boolean} */

    }, {
      key: "isRtl",
      value: function isRtl() {}

      /** @param {string} origin */

    }, {
      key: "setTransformOrigin",
      value: function setTransformOrigin(origin) {}

      /** @param {{
      *   top: (string|undefined),
      *   right: (string|undefined),
      *   bottom: (string|undefined),
      *   left: (string|undefined)
      * }} position */

    }, {
      key: "setPosition",
      value: function setPosition(position) {}

      /** @param {string} height */

    }, {
      key: "setMaxHeight",
      value: function setMaxHeight(height) {}

      /**
       * @param {number} index
       * @param {string} attr
       * @param {string} value
       */

    }, {
      key: "setAttrForOptionAtIndex",
      value: function setAttrForOptionAtIndex(index, attr, value) {}

      /**
       * @param {number} index
       * @param {string} attr
       */

    }, {
      key: "rmAttrForOptionAtIndex",
      value: function rmAttrForOptionAtIndex(index, attr) {}

      /**
       * @param {number} index
       * @param {string} className
       */

    }, {
      key: "addClassForOptionAtIndex",
      value: function addClassForOptionAtIndex(index, className) {}

      /**
       * @param {number} index
       * @param {string} className
       */

    }, {
      key: "rmClassForOptionAtIndex",
      value: function rmClassForOptionAtIndex(index, className) {}
    }]);
    return MDCMenuAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var cssClasses$a = {
    ROOT: 'mdc-menu',
    OPEN: 'mdc-menu--open',
    ANIMATING_OPEN: 'mdc-menu--animating-open',
    ANIMATING_CLOSED: 'mdc-menu--animating-closed',
    SELECTED_LIST_ITEM: 'mdc-list-item--selected'
  };

  /** @enum {string} */
  var strings$b = {
    ITEMS_SELECTOR: '.mdc-menu__items',
    SELECTED_EVENT: 'MDCMenu:selected',
    CANCEL_EVENT: 'MDCMenu:cancel',
    ARIA_DISABLED_ATTR: 'aria-disabled'
  };

  /** @enum {number} */
  var numbers$2 = {
    // Amount of time to wait before triggering a selected event on the menu. Note that this time
    // will most likely be bumped up once interactive lists are supported to allow for the ripple to
    // animate before closing the menu
    SELECTED_TRIGGER_DELAY: 50,
    // Total duration of menu open animation.
    TRANSITION_OPEN_DURATION: 120,
    // Total duration of menu close animation.
    TRANSITION_CLOSE_DURATION: 75,
    // Margin left to the edge of the viewport when menu is at maximum possible height.
    MARGIN_TO_EDGE: 32,
    // Ratio of anchor width to menu width for switching from corner positioning to center positioning.
    ANCHOR_TO_MENU_WIDTH_RATIO: 0.67,
    // Ratio of vertical offset to menu height for switching from corner to mid-way origin positioning.
    OFFSET_TO_MENU_HEIGHT_RATIO: 0.1
  };

  /**
   * Enum for bits in the {@see Corner) bitmap.
   * @enum {number}
   */
  var CornerBit = {
    BOTTOM: 1,
    CENTER: 2,
    RIGHT: 4,
    FLIP_RTL: 8
  };

  /**
   * Enum for representing an element corner for positioning the menu.
   *
   * The START constants map to LEFT if element directionality is left
   * to right and RIGHT if the directionality is right to left.
   * Likewise END maps to RIGHT or LEFT depending on the directionality.
   *
   * @enum {number}
   */
  var Corner = {
    TOP_LEFT: 0,
    TOP_RIGHT: CornerBit.RIGHT,
    BOTTOM_LEFT: CornerBit.BOTTOM,
    BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
    TOP_START: CornerBit.FLIP_RTL,
    TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
    BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
    BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL
  };

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCMenuAdapter>}
   */

  var MDCMenuFoundation = function (_MDCFoundation) {
    inherits(MDCMenuFoundation, _MDCFoundation);
    createClass(MDCMenuFoundation, null, [{
      key: 'cssClasses',

      /** @return enum{cssClasses} */
      get: function get$$1() {
        return cssClasses$a;
      }

      /** @return enum{strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$b;
      }

      /** @return enum{numbers} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers$2;
      }

      /** @return enum{number} */

    }, {
      key: 'Corner',
      get: function get$$1() {
        return Corner;
      }

      /**
       * {@see MDCMenuAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCMenuAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCMenuAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            hasClass: function hasClass() {
              return false;
            },
            hasNecessaryDom: function hasNecessaryDom() {
              return false;
            },
            getAttributeForEventTarget: function getAttributeForEventTarget() {},
            getInnerDimensions: function getInnerDimensions() {
              return {};
            },
            hasAnchor: function hasAnchor() {
              return false;
            },
            getAnchorDimensions: function getAnchorDimensions() {
              return {};
            },
            getWindowDimensions: function getWindowDimensions() {
              return {};
            },
            getNumberOfItems: function getNumberOfItems() {
              return 0;
            },
            registerInteractionHandler: function registerInteractionHandler() {},
            deregisterInteractionHandler: function deregisterInteractionHandler() {},
            registerBodyClickHandler: function registerBodyClickHandler() {},
            deregisterBodyClickHandler: function deregisterBodyClickHandler() {},
            getIndexForEventTarget: function getIndexForEventTarget() {
              return 0;
            },
            notifySelected: function notifySelected() {},
            notifyCancel: function notifyCancel() {},
            saveFocus: function saveFocus() {},
            restoreFocus: function restoreFocus() {},
            isFocused: function isFocused() {
              return false;
            },
            focus: function focus() {},
            getFocusedItemIndex: function getFocusedItemIndex() {
              return -1;
            },
            focusItemAtIndex: function focusItemAtIndex() {},
            isRtl: function isRtl() {
              return false;
            },
            setTransformOrigin: function setTransformOrigin() {},
            setPosition: function setPosition() {},
            setMaxHeight: function setMaxHeight() {},
            setAttrForOptionAtIndex: function setAttrForOptionAtIndex() {},
            rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() {},
            addClassForOptionAtIndex: function addClassForOptionAtIndex() {},
            rmClassForOptionAtIndex: function rmClassForOptionAtIndex() {}
          }
        );
      }

      /** @param {!MDCMenuAdapter} adapter */

    }]);

    function MDCMenuFoundation(adapter) {
      classCallCheck(this, MDCMenuFoundation);

      /** @private {function(!Event)} */
      var _this = possibleConstructorReturn(this, (MDCMenuFoundation.__proto__ || Object.getPrototypeOf(MDCMenuFoundation)).call(this, _extends(MDCMenuFoundation.defaultAdapter, adapter)));

      _this.clickHandler_ = function (evt) {
        return _this.handlePossibleSelected_(evt);
      };
      /** @private {function(!Event)} */
      _this.keydownHandler_ = function (evt) {
        return _this.handleKeyboardDown_(evt);
      };
      /** @private {function(!Event)} */
      _this.keyupHandler_ = function (evt) {
        return _this.handleKeyboardUp_(evt);
      };
      /** @private {function(!Event)} */
      _this.documentClickHandler_ = function (evt) {
        return _this.handleDocumentClick_(evt);
      };
      /** @private {boolean} */
      _this.isOpen_ = false;
      /** @private {number} */
      _this.openAnimationEndTimerId_ = 0;
      /** @private {number} */
      _this.closeAnimationEndTimerId_ = 0;
      /** @private {number} */
      _this.selectedTriggerTimerId_ = 0;
      /** @private {number} */
      _this.animationRequestId_ = 0;
      /** @private {!{ width: number, height: number }} */
      _this.dimensions_;
      /** @private {number} */
      _this.itemHeight_;
      /** @private {Corner} */
      _this.anchorCorner_ = Corner.TOP_START;
      /** @private {AnchorMargin} */
      _this.anchorMargin_ = { top: 0, right: 0, bottom: 0, left: 0 };
      /** @private {?AutoLayoutMeasurements} */
      _this.measures_ = null;
      /** @private {number} */
      _this.selectedIndex_ = -1;
      /** @private {boolean} */
      _this.rememberSelection_ = false;
      /** @private {boolean} */
      _this.quickOpen_ = false;

      // A keyup event on the menu needs to have a corresponding keydown
      // event on the menu. If the user opens the menu with a keydown event on a
      // button, the menu will only get the key up event causing buggy behavior with selected elements.
      /** @private {boolean} */
      _this.keyDownWithinMenu_ = false;
      return _this;
    }

    createClass(MDCMenuFoundation, [{
      key: 'init',
      value: function init() {
        var _MDCMenuFoundation$cs = MDCMenuFoundation.cssClasses,
            ROOT = _MDCMenuFoundation$cs.ROOT,
            OPEN = _MDCMenuFoundation$cs.OPEN;


        if (!this.adapter_.hasClass(ROOT)) {
          throw new Error(ROOT + ' class required in root element.');
        }

        if (!this.adapter_.hasNecessaryDom()) {
          throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
        }

        if (this.adapter_.hasClass(OPEN)) {
          this.isOpen_ = true;
        }

        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
        this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        clearTimeout(this.selectedTriggerTimerId_);
        clearTimeout(this.openAnimationEndTimerId_);
        clearTimeout(this.closeAnimationEndTimerId_);
        // Cancel any currently running animations.
        cancelAnimationFrame(this.animationRequestId_);
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
        this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
      }

      /**
       * @param {!Corner} corner Default anchor corner alignment of top-left menu corner.
       */

    }, {
      key: 'setAnchorCorner',
      value: function setAnchorCorner(corner) {
        this.anchorCorner_ = corner;
      }

      /**
       * @param {!AnchorMargin} margin 4-plet of margins from anchor.
       */

    }, {
      key: 'setAnchorMargin',
      value: function setAnchorMargin(margin) {
        this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
        this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
        this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
        this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
      }

      /** @param {boolean} rememberSelection */

    }, {
      key: 'setRememberSelection',
      value: function setRememberSelection(rememberSelection) {
        this.rememberSelection_ = rememberSelection;
        this.setSelectedIndex(-1);
      }

      /** @param {boolean} quickOpen */

    }, {
      key: 'setQuickOpen',
      value: function setQuickOpen(quickOpen) {
        this.quickOpen_ = quickOpen;
      }

      /**
       * @param {?number} focusIndex
       * @private
       */

    }, {
      key: 'focusOnOpen_',
      value: function focusOnOpen_(focusIndex) {
        if (focusIndex === null) {
          // If this instance of MDCMenu remembers selections, and the user has
          // made a selection, then focus the last selected item
          if (this.rememberSelection_ && this.selectedIndex_ >= 0) {
            this.adapter_.focusItemAtIndex(this.selectedIndex_);
            return;
          }

          this.adapter_.focus();
          // If that doesn't work, focus first item instead.
          if (!this.adapter_.isFocused()) {
            this.adapter_.focusItemAtIndex(0);
          }
        } else {
          this.adapter_.focusItemAtIndex(focusIndex);
        }
      }

      /**
       * Handle clicks and cancel the menu if not a child list-item
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handleDocumentClick_',
      value: function handleDocumentClick_(evt) {
        var el = evt.target;

        while (el && el !== document.documentElement) {
          if (this.adapter_.getIndexForEventTarget(el) !== -1) {
            return;
          }
          el = el.parentNode;
        }

        this.adapter_.notifyCancel();
        this.close(evt);
      }
    }, {
      key: 'handleKeyboardDown_',


      /**
       * Handle keys that we want to repeat on hold (tab and arrows).
       * @param {!Event} evt
       * @return {boolean}
       * @private
       */
      value: function handleKeyboardDown_(evt) {
        // Do nothing if Alt, Ctrl or Meta are pressed.
        if (evt.altKey || evt.ctrlKey || evt.metaKey) {
          return true;
        }

        var keyCode = evt.keyCode,
            key = evt.key,
            shiftKey = evt.shiftKey;

        var isTab = key === 'Tab' || keyCode === 9;
        var isArrowUp = key === 'ArrowUp' || keyCode === 38;
        var isArrowDown = key === 'ArrowDown' || keyCode === 40;
        var isSpace = key === 'Space' || keyCode === 32;
        var isEnter = key === 'Enter' || keyCode === 13;
        // The menu needs to know if the keydown event was triggered on the menu
        this.keyDownWithinMenu_ = isEnter || isSpace;

        var focusedItemIndex = this.adapter_.getFocusedItemIndex();
        var lastItemIndex = this.adapter_.getNumberOfItems() - 1;

        if (shiftKey && isTab && focusedItemIndex === 0) {
          this.adapter_.focusItemAtIndex(lastItemIndex);
          evt.preventDefault();
          return false;
        }

        if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
          this.adapter_.focusItemAtIndex(0);
          evt.preventDefault();
          return false;
        }

        // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
        if (isArrowUp || isArrowDown || isSpace) {
          evt.preventDefault();
        }

        if (isArrowUp) {
          if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
            this.adapter_.focusItemAtIndex(lastItemIndex);
          } else {
            this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
          }
        } else if (isArrowDown) {
          if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
            this.adapter_.focusItemAtIndex(0);
          } else {
            this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
          }
        }

        return true;
      }

      /**
       * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
       * @param {!Event} evt
       * @return {boolean}
       * @private
       */

    }, {
      key: 'handleKeyboardUp_',
      value: function handleKeyboardUp_(evt) {
        // Do nothing if Alt, Ctrl or Meta are pressed.
        if (evt.altKey || evt.ctrlKey || evt.metaKey) {
          return true;
        }

        var keyCode = evt.keyCode,
            key = evt.key;

        var isEnter = key === 'Enter' || keyCode === 13;
        var isSpace = key === 'Space' || keyCode === 32;
        var isEscape = key === 'Escape' || keyCode === 27;

        if (isEnter || isSpace) {
          // If the keydown event didn't occur on the menu, then it should
          // disregard the possible selected event.
          if (this.keyDownWithinMenu_) {
            this.handlePossibleSelected_(evt);
          }
          this.keyDownWithinMenu_ = false;
        }

        if (isEscape) {
          this.adapter_.notifyCancel();
          this.close();
        }

        return true;
      }

      /**
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handlePossibleSelected_',
      value: function handlePossibleSelected_(evt) {
        var _this2 = this;

        if (this.adapter_.getAttributeForEventTarget(evt.target, strings$b.ARIA_DISABLED_ATTR) === 'true') {
          return;
        }
        var targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
        if (targetIndex < 0) {
          return;
        }
        // Debounce multiple selections
        if (this.selectedTriggerTimerId_) {
          return;
        }
        this.selectedTriggerTimerId_ = setTimeout(function () {
          _this2.selectedTriggerTimerId_ = 0;
          _this2.close();
          if (_this2.rememberSelection_) {
            _this2.setSelectedIndex(targetIndex);
          }
          _this2.adapter_.notifySelected({ index: targetIndex });
        }, numbers$2.SELECTED_TRIGGER_DELAY);
      }

      /**
       * @return {AutoLayoutMeasurements} Measurements used to position menu popup.
       */

    }, {
      key: 'getAutoLayoutMeasurements_',
      value: function getAutoLayoutMeasurements_() {
        var anchorRect = this.adapter_.getAnchorDimensions();
        var viewport = this.adapter_.getWindowDimensions();

        return {
          viewport: viewport,
          viewportDistance: {
            top: anchorRect.top,
            right: viewport.width - anchorRect.right,
            left: anchorRect.left,
            bottom: viewport.height - anchorRect.bottom
          },
          anchorHeight: anchorRect.height,
          anchorWidth: anchorRect.width,
          menuHeight: this.dimensions_.height,
          menuWidth: this.dimensions_.width
        };
      }

      /**
       * Computes the corner of the anchor from which to animate and position the menu.
       * @return {Corner}
       * @private
       */

    }, {
      key: 'getOriginCorner_',
      value: function getOriginCorner_() {
        // Defaults: open from the top left.
        var corner = Corner.TOP_LEFT;

        var _measures_ = this.measures_,
            viewportDistance = _measures_.viewportDistance,
            anchorHeight = _measures_.anchorHeight,
            anchorWidth = _measures_.anchorWidth,
            menuHeight = _measures_.menuHeight,
            menuWidth = _measures_.menuWidth;

        var isBottomAligned = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
        var availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
        var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;

        var topOverflow = menuHeight - availableTop;
        var bottomOverflow = menuHeight - availableBottom;
        if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
          corner |= CornerBit.BOTTOM;
        }

        var isRtl = this.adapter_.isRtl();
        var isFlipRtl = Boolean(this.anchorCorner_ & CornerBit.FLIP_RTL);
        var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
        var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
        var availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
        var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorWidth - this.anchorMargin_.left;

        var leftOverflow = menuWidth - availableLeft;
        var rightOverflow = menuWidth - availableRight;

        if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
          corner |= CornerBit.RIGHT;
        }

        return corner;
      }

      /**
       * @param {Corner} corner Origin corner of the menu.
       * @return {number} Horizontal offset of menu origin corner from corresponding anchor corner.
       * @private
       */

    }, {
      key: 'getHorizontalOriginOffset_',
      value: function getHorizontalOriginOffset_(corner) {
        var anchorWidth = this.measures_.anchorWidth;

        var isRightAligned = Boolean(corner & CornerBit.RIGHT);
        var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
        var x = 0;
        if (isRightAligned) {
          var rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right;
          x = rightOffset;
        } else {
          var leftOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
          x = leftOffset;
        }
        return x;
      }

      /**
       * @param {Corner} corner Origin corner of the menu.
       * @return {number} Vertical offset of menu origin corner from corresponding anchor corner.
       * @private
       */

    }, {
      key: 'getVerticalOriginOffset_',
      value: function getVerticalOriginOffset_(corner) {
        var _measures_2 = this.measures_,
            viewport = _measures_2.viewport,
            viewportDistance = _measures_2.viewportDistance,
            anchorHeight = _measures_2.anchorHeight,
            menuHeight = _measures_2.menuHeight;

        var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);
        var MARGIN_TO_EDGE = MDCMenuFoundation.numbers.MARGIN_TO_EDGE;

        var avoidVerticalOverlap = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
        var canOverlapVertically = !avoidVerticalOverlap;
        var y = 0;

        if (isBottomAligned) {
          y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom;
          // adjust for when menu can overlap anchor, but too tall to be aligned to bottom
          // anchor corner. Bottom margin is ignored in such cases.
          if (canOverlapVertically && menuHeight > viewportDistance.top + anchorHeight) {
            y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.top + anchorHeight));
          }
        } else {
          y = avoidVerticalOverlap ? anchorHeight + this.anchorMargin_.bottom : this.anchorMargin_.top;
          // adjust for when menu can overlap anchor, but too tall to be aligned to top
          // anchor corners. Top margin is ignored in that case.
          if (canOverlapVertically && menuHeight > viewportDistance.bottom + anchorHeight) {
            y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.bottom + anchorHeight));
          }
        }
        return y;
      }

      /**
       * @param {Corner} corner Origin corner of the menu.
       * @return {number} Maximum height of the menu, based on available space. 0 indicates should not be set.
       * @private
       */

    }, {
      key: 'getMenuMaxHeight_',
      value: function getMenuMaxHeight_(corner) {
        var maxHeight = 0;
        var viewportDistance = this.measures_.viewportDistance;

        var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);

        // When maximum height is not specified, it is handled from css.
        if (this.anchorCorner_ & CornerBit.BOTTOM) {
          if (isBottomAligned) {
            maxHeight = viewportDistance.top + this.anchorMargin_.top;
          } else {
            maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom;
          }
        }

        return maxHeight;
      }

      /** @private */

    }, {
      key: 'autoPosition_',
      value: function autoPosition_() {
        var _position;

        if (!this.adapter_.hasAnchor()) {
          return;
        }

        // Compute measurements for autoposition methods reuse.
        this.measures_ = this.getAutoLayoutMeasurements_();

        var corner = this.getOriginCorner_();
        var maxMenuHeight = this.getMenuMaxHeight_(corner);
        var verticalAlignment = corner & CornerBit.BOTTOM ? 'bottom' : 'top';
        var horizontalAlignment = corner & CornerBit.RIGHT ? 'right' : 'left';
        var horizontalOffset = this.getHorizontalOriginOffset_(corner);
        var verticalOffset = this.getVerticalOriginOffset_(corner);
        var position = (_position = {}, defineProperty(_position, horizontalAlignment, horizontalOffset ? horizontalOffset + 'px' : '0'), defineProperty(_position, verticalAlignment, verticalOffset ? verticalOffset + 'px' : '0'), _position);
        var _measures_3 = this.measures_,
            anchorWidth = _measures_3.anchorWidth,
            menuHeight = _measures_3.menuHeight,
            menuWidth = _measures_3.menuWidth;
        // Center align when anchor width is comparable or greater than menu, otherwise keep corner.

        if (anchorWidth / menuWidth > numbers$2.ANCHOR_TO_MENU_WIDTH_RATIO) {
          horizontalAlignment = 'center';
        }

        // Adjust vertical origin when menu is positioned with significant offset from anchor. This is done so that
        // scale animation is "anchored" on the anchor.
        if (!(this.anchorCorner_ & CornerBit.BOTTOM) && Math.abs(verticalOffset / menuHeight) > numbers$2.OFFSET_TO_MENU_HEIGHT_RATIO) {
          var verticalOffsetPercent = Math.abs(verticalOffset / menuHeight) * 100;
          var originPercent = corner & CornerBit.BOTTOM ? 100 - verticalOffsetPercent : verticalOffsetPercent;
          verticalAlignment = Math.round(originPercent * 100) / 100 + '%';
        }

        this.adapter_.setTransformOrigin(horizontalAlignment + ' ' + verticalAlignment);
        this.adapter_.setPosition(position);
        this.adapter_.setMaxHeight(maxMenuHeight ? maxMenuHeight + 'px' : '');

        // Clear measures after positioning is complete.
        this.measures_ = null;
      }

      /**
       * Open the menu.
       * @param {{focusIndex: ?number}=} options
       */

    }, {
      key: 'open',
      value: function open() {
        var _this3 = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$focusIndex = _ref.focusIndex,
            focusIndex = _ref$focusIndex === undefined ? null : _ref$focusIndex;

        this.adapter_.saveFocus();

        if (!this.quickOpen_) {
          this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
        }

        this.animationRequestId_ = requestAnimationFrame(function () {
          _this3.dimensions_ = _this3.adapter_.getInnerDimensions();
          _this3.autoPosition_();
          _this3.adapter_.addClass(MDCMenuFoundation.cssClasses.OPEN);
          _this3.focusOnOpen_(focusIndex);
          _this3.adapter_.registerBodyClickHandler(_this3.documentClickHandler_);
          if (!_this3.quickOpen_) {
            _this3.openAnimationEndTimerId_ = setTimeout(function () {
              _this3.openAnimationEndTimerId_ = 0;
              _this3.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
            }, numbers$2.TRANSITION_OPEN_DURATION);
          }
        });
        this.isOpen_ = true;
      }

      /**
       * Closes the menu.
       * @param {Event=} evt
       */

    }, {
      key: 'close',
      value: function close() {
        var _this4 = this;

        var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var targetIsDisabled = evt ? this.adapter_.getAttributeForEventTarget(evt.target, strings$b.ARIA_DISABLED_ATTR) === 'true' : false;

        if (targetIsDisabled) {
          return;
        }

        this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);

        if (!this.quickOpen_) {
          this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
        }

        requestAnimationFrame(function () {
          _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.OPEN);
          if (!_this4.quickOpen_) {
            _this4.closeAnimationEndTimerId_ = setTimeout(function () {
              _this4.closeAnimationEndTimerId_ = 0;
              _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
            }, numbers$2.TRANSITION_CLOSE_DURATION);
          }
        });
        this.isOpen_ = false;
        this.adapter_.restoreFocus();
      }

      /** @return {boolean} */

    }, {
      key: 'isOpen',
      value: function isOpen() {
        return this.isOpen_;
      }

      /** @return {number} */

    }, {
      key: 'getSelectedIndex',
      value: function getSelectedIndex() {
        return this.selectedIndex_;
      }

      /**
       * @param {number} index Index of the item to set as selected.
       */

    }, {
      key: 'setSelectedIndex',
      value: function setSelectedIndex(index) {
        if (index === this.selectedIndex_) {
          return;
        }

        var prevSelectedIndex = this.selectedIndex_;
        if (prevSelectedIndex >= 0) {
          this.adapter_.rmAttrForOptionAtIndex(prevSelectedIndex, 'aria-selected');
          this.adapter_.rmClassForOptionAtIndex(prevSelectedIndex, cssClasses$a.SELECTED_LIST_ITEM);
        }

        this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfItems() ? index : -1;
        if (this.selectedIndex_ >= 0) {
          this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
          this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, cssClasses$a.SELECTED_LIST_ITEM);
        }
      }
    }]);
    return MDCMenuFoundation;
  }(MDCFoundation);

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @type {string|undefined} */
  var storedTransformPropertyName_$1 = void 0;

  /**
   * Returns the name of the correct transform property to use on the current browser.
   * @param {!Window} globalObj
   * @param {boolean=} forceRefresh
   * @return {string}
   */
  function getTransformPropertyName$1(globalObj) {
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (storedTransformPropertyName_$1 === undefined || forceRefresh) {
      var el = globalObj.document.createElement('div');
      var transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
      storedTransformPropertyName_$1 = transformPropertyName;
    }

    return storedTransformPropertyName_$1;
  }

  var mdcMenu = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root", staticClass: "mdc-menu mdc-simple-menu", class: _vm.classes, style: _vm.styles, attrs: { "tabindex": "-1" } }, [_c('ul', { ref: "items", staticClass: "mdc-simple-menu__items mdc-list", attrs: { "role": "menu", "aria-hidden": "true" } }, [_vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-menu',
    model: {
      prop: 'open',
      event: 'change'
    },
    props: {
      open: [Boolean, Object],
      'quick-open': Boolean,
      'anchor-corner': [String, Number],
      'anchor-margin': Object
    },
    data: function data() {
      return {
        classes: {},
        styles: {},
        items: []
      };
    },

    watch: {
      open: 'onOpen_',
      quickOpen: function quickOpen(nv) {
        this.foundation.setQuickOpen(nv);
      },
      anchorCorner: function anchorCorner(nv) {
        this.foundation.setAnchorCorner(Number(nv));
      },
      anchorMargin: function anchorMargin(nv) {
        this.foundation.setAnchorMargin(nv);
      }
    },
    mounted: function mounted() {
      var _this = this;

      var refreshItems = function refreshItems() {
        _this.items = [].slice.call(_this.$refs.items.querySelectorAll('.mdc-list-item[role]'));
        _this.$emit('update');
      };
      this.slotObserver = new MutationObserver(function () {
        return refreshItems();
      });
      this.slotObserver.observe(this.$el, {
        childList: true,
        subtree: true
      });

      this._previousFocus = undefined;

      this.foundation = new MDCMenuFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this.$refs.root.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return Boolean(_this.$refs.items);
        },
        getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
          return target.getAttribute(attributeName);
        },
        getInnerDimensions: function getInnerDimensions() {
          return {
            width: _this.$refs.items.offsetWidth,
            height: _this.$refs.items.offsetHeight
          };
        },
        hasAnchor: function hasAnchor() {
          return _this.$refs.root.parentElement && _this.$refs.root.parentElement.classList.contains('mdc-menu-anchor');
        },
        getAnchorDimensions: function getAnchorDimensions() {
          return _this.$refs.root.parentElement.getBoundingClientRect();
        },
        getWindowDimensions: function getWindowDimensions() {
          return {
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        getNumberOfItems: function getNumberOfItems() {
          return _this.items.length;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this.$refs.root.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this.$refs.root.removeEventListener(type, handler);
        },
        registerBodyClickHandler: function registerBodyClickHandler(handler) {
          return document.body.addEventListener('click', handler);
        },
        deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
          return document.body.removeEventListener('click', handler);
        },
        getIndexForEventTarget: function getIndexForEventTarget(target) {
          return _this.items.indexOf(target);
        },
        notifySelected: function notifySelected(evtData) {
          var evt = {
            index: evtData.index,
            item: _this.items[evtData.index]
          };
          _this.$emit('change', false);
          _this.$emit('select', evt);
          emitCustomEvent(_this.$el, MDCMenuFoundation.strings.SELECTED_EVENT, evt);
        },
        notifyCancel: function notifyCancel() {
          _this.$emit('change', false);
          _this.$emit('cancel');
          emitCustomEvent(_this.$el, MDCMenuFoundation.strings.CANCEL_EVENT, {});
        },
        saveFocus: function saveFocus() {
          _this._previousFocus = document.activeElement;
        },
        restoreFocus: function restoreFocus() {
          if (_this._previousFocus) {
            _this._previousFocus.focus();
          }
        },
        isFocused: function isFocused() {
          return document.activeElement === _this.$refs.root;
        },
        focus: function focus() {
          return _this.$refs.root.focus();
        },
        getFocusedItemIndex: function getFocusedItemIndex() {
          return _this.items.indexOf(document.activeElement);
        },
        focusItemAtIndex: function focusItemAtIndex(index) {
          return _this.items[index].focus();
        },
        isRtl: function isRtl() {
          return getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
        },
        setTransformOrigin: function setTransformOrigin(origin) {
          _this.$set(_this.styles, getTransformPropertyName$1(window) + '-origin', origin);
        },
        setPosition: function setPosition(position) {
          _this.$set(_this.styles, 'left', position.left);
          _this.$set(_this.styles, 'right', position.right);
          _this.$set(_this.styles, 'top', position.top);
          _this.$set(_this.styles, 'bottom', position.bottom);
        },
        setMaxHeight: function setMaxHeight(height) {
          _this.$set(_this.styles, 'max-height', height);
        },
        setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
          _this.items[index].setAttribute(attr, value);
        },
        rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
          _this.items[index].removeAttribute(attr);
        },
        addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
          _this.items[index].classList.add(className);
        },
        rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
          _this.items[index].classList.remove(className);
        }
      });

      refreshItems();
      this.foundation.init();
      if (this.anchorCorner !== void 0) {
        this.foundation.setAnchorCorner(Number(this.anchorCorner));
      }
      if (this.anchorMargin !== void 0) {
        this.foundation.setAnchorMargin(this.anchorMargin);
      }
    },
    beforeDestroy: function beforeDestroy() {
      this._previousFocus = null;
      this.slotObserver.disconnect();
      this.foundation.destroy();
    },


    methods: {
      onOpen_: function onOpen_(value) {
        if (value) {
          this.foundation.open((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : void 0);
        } else {
          this.foundation.close();
        }
      },
      show: function show(options) {
        this.foundation.open(options);
      },
      hide: function hide() {
        this.foundation.close();
      },
      isOpen: function isOpen() {
        return this.foundation ? this.foundation.isOpen() : false;
      }
    }
  };

  var mdcMenuItem = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "mdc-menu-item mdc-list-item", attrs: { "tabindex": _vm.disabled ? '-1' : '0', "aria-disabled": _vm.disabled, "role": "menuitem" } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-menu-item',
    props: {
      disabled: Boolean
    }
  };

  var mdcMenuDivider = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "mdc-menu-divider mdc-list-divider", attrs: { "role": "separator" } });
    }, staticRenderFns: [],
    name: 'mdc-menu-divider'
  };

  var mdcMenuAnchor = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-menu-anchor" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-menu-anchor'
  };

  var VueMDCMenu = BasePlugin({
    mdcMenu: mdcMenu,
    mdcMenuItem: mdcMenuItem,
    mdcMenuDivider: mdcMenuDivider,
    mdcMenuAnchor: mdcMenuAnchor
  });

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Radio. Provides an interface for managing
   * - classes
   * - dom
   *
   * Additionally, provides type information for the adapter to the Closure
   * compiler.
   *
   * Implement this adapter for your framework of choice to delegate updates to
   * the component in your framework of choice. See architecture documentation
   * for more details.
   * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
   *
   * @record
   */

  var MDCRadioAdapter = function () {
    function MDCRadioAdapter() {
      classCallCheck(this, MDCRadioAdapter);
    }

    createClass(MDCRadioAdapter, [{
      key: 'addClass',

      /** @param {string} className */
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: 'removeClass',
      value: function removeClass(className) {}

      /** @return {!MDCSelectionControlState} */

    }, {
      key: 'getNativeControl',
      value: function getNativeControl() {}
    }]);
    return MDCRadioAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var strings$c = {
    NATIVE_CONTROL_SELECTOR: '.mdc-radio__native-control'
  };

  /** @enum {string} */
  var cssClasses$b = {
    ROOT: 'mdc-radio',
    DISABLED: 'mdc-radio--disabled'
  };

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCRadioAdapter>}
   */

  var MDCRadioFoundation = function (_MDCFoundation) {
    inherits(MDCRadioFoundation, _MDCFoundation);

    function MDCRadioFoundation() {
      classCallCheck(this, MDCRadioFoundation);
      return possibleConstructorReturn(this, (MDCRadioFoundation.__proto__ || Object.getPrototypeOf(MDCRadioFoundation)).apply(this, arguments));
    }

    createClass(MDCRadioFoundation, [{
      key: 'isChecked',


      /** @return {boolean} */
      value: function isChecked() {
        return this.getNativeControl_().checked;
      }

      /** @param {boolean} checked */

    }, {
      key: 'setChecked',
      value: function setChecked(checked) {
        this.getNativeControl_().checked = checked;
      }

      /** @return {boolean} */

    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.getNativeControl_().disabled;
      }

      /** @param {boolean} disabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        var DISABLED = MDCRadioFoundation.cssClasses.DISABLED;

        this.getNativeControl_().disabled = disabled;
        if (disabled) {
          this.adapter_.addClass(DISABLED);
        } else {
          this.adapter_.removeClass(DISABLED);
        }
      }

      /** @return {?string} */

    }, {
      key: 'getValue',
      value: function getValue() {
        return this.getNativeControl_().value;
      }

      /** @param {?string} value */

    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.getNativeControl_().value = value;
      }

      /**
       * @return {!MDCSelectionControlState}
       * @private
       */

    }, {
      key: 'getNativeControl_',
      value: function getNativeControl_() {
        return this.adapter_.getNativeControl() || {
          checked: false,
          disabled: false,
          value: null
        };
      }
    }], [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses$b;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$c;
      }

      /** @return {!MDCRadioAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCRadioAdapter} */{
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            getNativeControl: function getNativeControl() /* !MDCSelectionControlState */{}
          }
        );
      }
    }]);
    return MDCRadioFoundation;
  }(MDCFoundation);

  var mdcRadio = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-radio-wrapper", class: _vm.formFieldClasses }, [_c('div', { ref: "root", staticClass: "mdc-radio", class: _vm.classes, style: _vm.styles }, [_c('input', { ref: "control", staticClass: "mdc-radio__native-control", attrs: { "id": _vm.vma_uid_, "name": _vm.name, "type": "radio" }, on: { "change": _vm.sync } }), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('label', { ref: "label", attrs: { "for": _vm.vma_uid_ } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2)]);
    }, staticRenderFns: [function () {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-radio__background" }, [_c('div', { staticClass: "mdc-radio__outer-circle" }), _vm._v(" "), _c('div', { staticClass: "mdc-radio__inner-circle" })]);
    }],
    name: 'mdc-radio',
    mixins: [DispatchFocusMixin, VMAUniqueIdMixin],
    model: {
      prop: 'picked',
      event: 'change'
    },
    props: {
      name: { type: String, required: true },
      value: String,
      picked: String,
      checked: Boolean,
      label: String,
      'align-end': Boolean,
      disabled: Boolean
    },
    data: function data() {
      return {
        classes: {},
        styles: {},
        formFieldClasses: {
          'mdc-form-field': this.label,
          'mdc-form-field--align-end': this.label && this.alignEnd
        }
      };
    },

    watch: {
      checked: 'setChecked',
      disabled: function disabled(value) {
        this.foundation.setDisabled(value);
      }
    },
    mounted: function mounted() {
      var _this = this;

      // add foundation
      this.foundation = new MDCRadioFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        getNativeControl: function getNativeControl() {
          return _this.$refs.control;
        }
      });

      // add ripple
      this.ripple = new RippleBase(this, {
        isUnbounded: function isUnbounded() {
          return true;
        },
        isSurfaceActive: function isSurfaceActive() {
          return false;
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          _this.$refs.control.addEventListener(evt, handler, applyPassive());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          _this.$refs.control.removeEventListener(evt, handler, applyPassive());
        },
        computeBoundingRect: function computeBoundingRect() {
          return _this.$refs.root.getBoundingClientRect();
        }
      });

      this.formField = new MDCFormFieldFoundation({
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          _this.$refs.label.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          _this.$refs.label.removeEventListener(type, handler);
        },
        activateInputRipple: function activateInputRipple() {
          _this.ripple && _this.ripple.activate();
        },
        deactivateInputRipple: function deactivateInputRipple() {
          _this.ripple && _this.ripple.deactivate();
        }
      });

      this.foundation.init();
      this.ripple.init();
      this.formField.init();

      this.foundation.setValue(this.value ? this.value : this.label);
      this.foundation.setDisabled(this.disabled);
      this.foundation.setChecked(this.checked || this.picked == this.foundation.getValue());

      // refresh model
      this.checked && this.sync();
    },
    beforeDestroy: function beforeDestroy() {
      this.formField.destroy();
      this.ripple.destroy();
      this.foundation.destroy();
    },

    methods: {
      setChecked: function setChecked(checked) {
        this.foundation.setChecked(checked);
      },
      isChecked: function isChecked() {
        return this.foundation.isChecked();
      },
      sync: function sync() {
        this.$emit('change', this.foundation.getValue());
      }
    }
  };

  var VueMDCRadio = BasePlugin({
    mdcRadio: mdcRadio
  });

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var cssClasses$c = {
    BOX: 'mdc-select--box',
    DISABLED: 'mdc-select--disabled',
    ROOT: 'mdc-select',
    OUTLINED: 'mdc-select--outlined'
  };

  var strings$d = {
    CHANGE_EVENT: 'MDCSelect:change',
    LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
    LABEL_SELECTOR: '.mdc-floating-label',
    NATIVE_CONTROL_SELECTOR: '.mdc-select__native-control',
    OUTLINE_SELECTOR: '.mdc-notched-outline'
  };

  /** @enum {number} */
  var numbers$3 = {
    LABEL_SCALE: 0.75
  };

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCSelectFoundation = function (_MDCFoundation) {
    inherits(MDCSelectFoundation, _MDCFoundation);
    createClass(MDCSelectFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$c;
      }
    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers$3;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$d;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          hasClass: function hasClass() {
            return (/* className: string */false
            );
          },
          floatLabel: function floatLabel() /* value: boolean */{},
          activateBottomLine: function activateBottomLine() {},
          deactivateBottomLine: function deactivateBottomLine() {},
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          getSelectedIndex: function getSelectedIndex() {
            return (/* number */-1
            );
          },
          setSelectedIndex: function setSelectedIndex() /* index: number */{},
          setDisabled: function setDisabled() /* disabled: boolean */{},
          getValue: function getValue() {
            return (/* string */''
            );
          },
          setValue: function setValue() /* value: string */{},
          isRtl: function isRtl() {
            return false;
          },
          hasLabel: function hasLabel() {},
          getLabelWidth: function getLabelWidth() {},
          hasOutline: function hasOutline() {},
          notchOutline: function notchOutline() {},
          closeOutline: function closeOutline() {}
        };
      }
    }]);

    function MDCSelectFoundation(adapter) {
      classCallCheck(this, MDCSelectFoundation);

      var _this = possibleConstructorReturn(this, (MDCSelectFoundation.__proto__ || Object.getPrototypeOf(MDCSelectFoundation)).call(this, _extends(MDCSelectFoundation.defaultAdapter, adapter)));

      _this.focusHandler_ = function (evt) {
        return _this.handleFocus_(evt);
      };
      _this.blurHandler_ = function (evt) {
        return _this.handleBlur_(evt);
      };
      _this.selectionHandler_ = function (evt) {
        return _this.handleSelect_(evt);
      };
      return _this;
    }

    createClass(MDCSelectFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
        this.adapter_.registerInteractionHandler('change', this.selectionHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
        this.adapter_.deregisterInteractionHandler('change', this.selectionHandler_);
      }
    }, {
      key: 'setSelectedIndex',
      value: function setSelectedIndex(index) {
        this.adapter_.setSelectedIndex(index);
        this.floatLabelWithValue_();
      }
    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.adapter_.setValue(value);
        this.setSelectedIndex(this.adapter_.getSelectedIndex());
      }
    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        var DISABLED = MDCSelectFoundation.cssClasses.DISABLED;

        this.adapter_.setDisabled(disabled);
        if (disabled) {
          this.adapter_.addClass(DISABLED);
        } else {
          this.adapter_.removeClass(DISABLED);
        }
      }
    }, {
      key: 'floatLabelWithValue_',
      value: function floatLabelWithValue_() {
        var optionHasValue = this.adapter_.getValue().length > 0;
        this.adapter_.floatLabel(optionHasValue);
        this.notchOutline(optionHasValue);
      }
    }, {
      key: 'handleFocus_',
      value: function handleFocus_() {
        this.adapter_.floatLabel(true);
        this.notchOutline(true);
        this.adapter_.activateBottomLine();
      }
    }, {
      key: 'handleBlur_',
      value: function handleBlur_() {
        this.floatLabelWithValue_();
        this.adapter_.deactivateBottomLine();
      }
    }, {
      key: 'handleSelect_',
      value: function handleSelect_() {
        this.setSelectedIndex(this.adapter_.getSelectedIndex());
      }

      /**
       * Opens/closes the notched outline.
       * @param {boolean} openNotch
       */

    }, {
      key: 'notchOutline',
      value: function notchOutline(openNotch) {
        if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
          return;
        }

        if (openNotch) {
          var labelScale = numbers$3.LABEL_SCALE;
          var labelWidth = this.adapter_.getLabelWidth() * labelScale;
          var isRtl = this.adapter_.isRtl();
          this.adapter_.notchOutline(labelWidth, isRtl);
        } else {
          this.adapter_.closeOutline();
        }
      }
    }]);
    return MDCSelectFoundation;
  }(MDCFoundation);

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Floating Label.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the floating label into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCFloatingLabelAdapter = function () {
    function MDCFloatingLabelAdapter() {
      classCallCheck(this, MDCFloatingLabelAdapter);
    }

    createClass(MDCFloatingLabelAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the label element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the label element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns the width of the label element.
       * @return {number}
       */

    }, {
      key: "getWidth",
      value: function getWidth() {}

      /**
       * Registers an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}
    }]);
    return MDCFloatingLabelAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var cssClasses$d = {
    LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
    LABEL_SHAKE: 'mdc-floating-label--shake'
  };

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
   * @final
   */

  var MDCFloatingLabelFoundation = function (_MDCFoundation) {
    inherits(MDCFloatingLabelFoundation, _MDCFoundation);
    createClass(MDCFloatingLabelFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$d;
      }

      /**
       * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCFloatingLabelAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCFloatingLabelAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            getWidth: function getWidth() {},
            registerInteractionHandler: function registerInteractionHandler() {},
            deregisterInteractionHandler: function deregisterInteractionHandler() {}
          }
        );
      }

      /**
       * @param {!MDCFloatingLabelAdapter} adapter
       */

    }]);

    function MDCFloatingLabelFoundation(adapter) {
      classCallCheck(this, MDCFloatingLabelFoundation);

      /** @private {function(!Event): undefined} */
      var _this = possibleConstructorReturn(this, (MDCFloatingLabelFoundation.__proto__ || Object.getPrototypeOf(MDCFloatingLabelFoundation)).call(this, _extends(MDCFloatingLabelFoundation.defaultAdapter, adapter)));

      _this.shakeAnimationEndHandler_ = function () {
        return _this.handleShakeAnimationEnd_();
      };
      return _this;
    }

    createClass(MDCFloatingLabelFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
      }

      /**
       * Returns the width of the label element.
       * @return {number}
       */

    }, {
      key: 'getWidth',
      value: function getWidth() {
        return this.adapter_.getWidth();
      }

      /**
       * Styles the label to produce the label shake for errors.
       * @param {boolean} shouldShake adds shake class if true,
       * otherwise removes shake class.
       */

    }, {
      key: 'shake',
      value: function shake(shouldShake) {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

        if (shouldShake) {
          this.adapter_.addClass(LABEL_SHAKE);
        } else {
          this.adapter_.removeClass(LABEL_SHAKE);
        }
      }

      /**
       * Styles the label to float or dock.
       * @param {boolean} shouldFloat adds float class if true, otherwise remove
       * float and shake class to dock label.
       */

    }, {
      key: 'float',
      value: function float(shouldFloat) {
        var _MDCFloatingLabelFoun = MDCFloatingLabelFoundation.cssClasses,
            LABEL_FLOAT_ABOVE = _MDCFloatingLabelFoun.LABEL_FLOAT_ABOVE,
            LABEL_SHAKE = _MDCFloatingLabelFoun.LABEL_SHAKE;

        if (shouldFloat) {
          this.adapter_.addClass(LABEL_FLOAT_ABOVE);
        } else {
          this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
          this.adapter_.removeClass(LABEL_SHAKE);
        }
      }

      /**
       * Handles an interaction event on the root element.
       */

    }, {
      key: 'handleShakeAnimationEnd_',
      value: function handleShakeAnimationEnd_() {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

        this.adapter_.removeClass(LABEL_SHAKE);
      }
    }]);
    return MDCFloatingLabelFoundation;
  }(MDCFoundation);

  var SelectLabel = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('label', { staticClass: "mdc-floating-label", class: _vm.labelClasses }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-select-label',
    data: function data() {
      return {
        labelClasses: {}
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCFloatingLabelFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.labelClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.labelClasses, className);
        },
        getWidth: function getWidth() {
          return _this.$el.offsetWidth;
        },
        registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
          _this.$el.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
          _this.$el.removeEventListener(evtType, handler);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();
    }
  };

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC TextField Line Ripple.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the line ripple into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCLineRippleAdapter = function () {
    function MDCLineRippleAdapter() {
      classCallCheck(this, MDCLineRippleAdapter);
    }

    createClass(MDCLineRippleAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the line ripple element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the line ripple element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "hasClass",
      value: function hasClass(className) {}

      /**
       * Sets the style property with propertyName to value on the root element.
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setStyle",
      value: function setStyle(propertyName, value) {}

      /**
       * Registers an event listener on the line ripple element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerEventHandler",
      value: function registerEventHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the line ripple element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterEventHandler",
      value: function deregisterEventHandler(evtType, handler) {}
    }]);
    return MDCLineRippleAdapter;
  }();

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var cssClasses$e = {
    LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
    LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
  };

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCLineRippleAdapter>}
   * @final
   */

  var MDCLineRippleFoundation = function (_MDCFoundation) {
    inherits(MDCLineRippleFoundation, _MDCFoundation);
    createClass(MDCLineRippleFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$e;
      }

      /**
       * {@see MDCLineRippleAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCLineRippleAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCLineRippleAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            hasClass: function hasClass() {},
            setStyle: function setStyle() {},
            registerEventHandler: function registerEventHandler() {},
            deregisterEventHandler: function deregisterEventHandler() {}
          }
        );
      }

      /**
       * @param {!MDCLineRippleAdapter=} adapter
       */

    }]);

    function MDCLineRippleFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCLineRippleAdapter} */{};
      classCallCheck(this, MDCLineRippleFoundation);

      /** @private {function(!Event): undefined} */
      var _this = possibleConstructorReturn(this, (MDCLineRippleFoundation.__proto__ || Object.getPrototypeOf(MDCLineRippleFoundation)).call(this, _extends(MDCLineRippleFoundation.defaultAdapter, adapter)));

      _this.transitionEndHandler_ = function (evt) {
        return _this.handleTransitionEnd(evt);
      };
      return _this;
    }

    createClass(MDCLineRippleFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
      }

      /**
       * Activates the line ripple
       */

    }, {
      key: 'activate',
      value: function activate() {
        this.adapter_.removeClass(cssClasses$e.LINE_RIPPLE_DEACTIVATING);
        this.adapter_.addClass(cssClasses$e.LINE_RIPPLE_ACTIVE);
      }

      /**
       * Sets the center of the ripple animation to the given X coordinate.
       * @param {number} xCoordinate
       */

    }, {
      key: 'setRippleCenter',
      value: function setRippleCenter(xCoordinate) {
        this.adapter_.setStyle('transform-origin', xCoordinate + 'px center');
      }

      /**
       * Deactivates the line ripple
       */

    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.adapter_.addClass(cssClasses$e.LINE_RIPPLE_DEACTIVATING);
      }

      /**
       * Handles a transition end event
       * @param {!Event} evt
       */

    }, {
      key: 'handleTransitionEnd',
      value: function handleTransitionEnd(evt) {
        // Wait for the line ripple to be either transparent or opaque
        // before emitting the animation end event
        var isDeactivating = this.adapter_.hasClass(cssClasses$e.LINE_RIPPLE_DEACTIVATING);

        if (evt.propertyName === 'opacity') {
          if (isDeactivating) {
            this.adapter_.removeClass(cssClasses$e.LINE_RIPPLE_ACTIVE);
            this.adapter_.removeClass(cssClasses$e.LINE_RIPPLE_DEACTIVATING);
          }
        }
      }
    }]);
    return MDCLineRippleFoundation;
  }(MDCFoundation);

  var SelectLineRiple = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-line-ripple", class: _vm.lineClasses, style: _vm.lineStyles });
    }, staticRenderFns: [],
    name: 'mdc-select-line-ripple',
    data: function data() {
      return {
        lineClasses: {},
        lineStyles: {}
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCLineRippleFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.lineClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.lineClasses, className);
        },
        hasClass: function hasClass(className) {
          _this.$el.classList.contains(className);
        },
        setStyle: function setStyle(name, value) {
          _this.$set(_this.lineStyles, name, value);
        },
        registerEventHandler: function registerEventHandler(evtType, handler) {
          _this.$el.addEventListener(evtType, handler);
        },
        deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
          _this.$el.removeEventListener(evtType, handler);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();
    }
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Notched Outline.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Notched Outline into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCNotchedOutlineAdapter = function () {
    function MDCNotchedOutlineAdapter() {
      classCallCheck(this, MDCNotchedOutlineAdapter);
    }

    createClass(MDCNotchedOutlineAdapter, [{
      key: "getWidth",

      /**
       * Returns the width of the root element.
       * @return {number}
       */
      value: function getWidth() {}

      /**
       * Returns the height of the root element.
       * @return {number}
       */

    }, {
      key: "getHeight",
      value: function getHeight() {}

      /**
       * Adds a class to the root element.
       * @param {string} className
       */

    }, {
      key: "addClass",
      value: function addClass(className) {}

      /**
       * Removes a class from the root element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Sets the "d" attribute of the outline element's SVG path.
       * @param {string} value
       */

    }, {
      key: "setOutlinePathAttr",
      value: function setOutlinePathAttr(value) {}

      /**
       * Returns the idle outline element's computed style value of the given css property `propertyName`.
       * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
       * @param {string} propertyName
       * @return {string}
       */

    }, {
      key: "getIdleOutlineStyleValue",
      value: function getIdleOutlineStyleValue(propertyName) {}
    }]);
    return MDCNotchedOutlineAdapter;
  }();

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var strings$e = {
    PATH_SELECTOR: '.mdc-notched-outline__path',
    IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle'
  };

  /** @enum {string} */
  var cssClasses$f = {
    OUTLINE_NOTCHED: 'mdc-notched-outline--notched'
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
   * @final
   */

  var MDCNotchedOutlineFoundation = function (_MDCFoundation) {
    inherits(MDCNotchedOutlineFoundation, _MDCFoundation);
    createClass(MDCNotchedOutlineFoundation, null, [{
      key: 'strings',

      /** @return enum {string} */
      get: function get$$1() {
        return strings$e;
      }

      /** @return enum {string} */

    }, {
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$f;
      }

      /**
       * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCNotchedOutlineAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCNotchedOutlineAdapter} */{
            getWidth: function getWidth() {},
            getHeight: function getHeight() {},
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            setOutlinePathAttr: function setOutlinePathAttr() {},
            getIdleOutlineStyleValue: function getIdleOutlineStyleValue() {}
          }
        );
      }

      /**
       * @param {!MDCNotchedOutlineAdapter} adapter
       */

    }]);

    function MDCNotchedOutlineFoundation(adapter) {
      classCallCheck(this, MDCNotchedOutlineFoundation);
      return possibleConstructorReturn(this, (MDCNotchedOutlineFoundation.__proto__ || Object.getPrototypeOf(MDCNotchedOutlineFoundation)).call(this, _extends(MDCNotchedOutlineFoundation.defaultAdapter, adapter)));
    }

    /**
     * Adds the outline notched selector and updates the notch width
     * calculated based off of notchWidth and isRtl.
     * @param {number} notchWidth
     * @param {boolean=} isRtl
     */


    createClass(MDCNotchedOutlineFoundation, [{
      key: 'notch',
      value: function notch(notchWidth) {
        var isRtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

        this.adapter_.addClass(OUTLINE_NOTCHED);
        this.updateSvgPath_(notchWidth, isRtl);
      }

      /**
       * Removes notched outline selector to close the notch in the outline.
       */

    }, {
      key: 'closeNotch',
      value: function closeNotch() {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

        this.adapter_.removeClass(OUTLINE_NOTCHED);
      }

      /**
       * Updates the SVG path of the focus outline element based on the notchWidth
       * and the RTL context.
       * @param {number} notchWidth
       * @param {boolean=} isRtl
       * @private
       */

    }, {
      key: 'updateSvgPath_',
      value: function updateSvgPath_(notchWidth, isRtl) {
        // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
        var radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') || this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
        var radius = parseFloat(radiusStyleValue);
        var width = this.adapter_.getWidth();
        var height = this.adapter_.getHeight();
        var cornerWidth = radius + 1.2;
        var leadingStrokeLength = Math.abs(11 - cornerWidth);
        var paddedNotchWidth = notchWidth + 8;

        // The right, bottom, and left sides of the outline follow the same SVG path.
        var pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (-width + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (-height + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

        var path = void 0;
        if (!isRtl) {
          path = 'M' + (cornerWidth + leadingStrokeLength + paddedNotchWidth) + ',' + 1 + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength) + pathMiddle + 'h' + leadingStrokeLength;
        } else {
          path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1 + 'h' + leadingStrokeLength + pathMiddle + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength);
        }

        this.adapter_.setOutlinePathAttr(path);
      }
    }]);
    return MDCNotchedOutlineFoundation;
  }(MDCFoundation);

  var SelectNotchedOutline = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('div', { ref: "outlined", staticClass: "mdc-notched-outline", class: _vm.outlinedClasses }, [_c('svg', [_c('path', { ref: "outlinedPath", staticClass: "mdc-notched-outline__path" })])]), _vm._v(" "), _c('div', { ref: "outlinedIdle", staticClass: "mdc-notched-outline__idle" })]);
    }, staticRenderFns: [],
    name: 'mdc-select-notched-outline',
    data: function data() {
      return {
        outlinedClasses: {}
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCNotchedOutlineFoundation({
        getWidth: function getWidth() {
          return _this.$refs.outlined.offsetWidth;
        },
        getHeight: function getHeight() {
          return _this.$refs.outlined.offsetHeight;
        },
        addClass: function addClass(className) {
          _this.$set(_this.outlinedClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.outlinedClasses, className);
        },
        setOutlinePathAttr: function setOutlinePathAttr(value) {
          var path = _this.$refs.outlinedPath;
          path.setAttribute('d', value);
        },
        getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
          return window.getComputedStyle(_this.$refs.outlinedIdle).getPropertyValue(propertyName);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();
    }
  };

  var mdcSelect = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-select", class: _vm.rootClasses, style: _vm.styles, attrs: { "id": _vm.id } }, [_c('select', _vm._g(_vm._b({ ref: "native_control", staticClass: "mdc-select__native-control" }, 'select', _vm.$attrs, false), _vm.listeners), [!!_vm.label ? _c('option', { staticClass: "mdc-option", attrs: { "value": "", "disabled": "disabled", "selected": "selected" } }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2), _vm._v(" "), _vm.label ? _c('select-label', { ref: "label" }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), !_vm.outlined ? _c('select-line-riple', { ref: "line" }) : _vm._e(), _vm._v(" "), _vm.outlined ? _c('select-notched-outline', { ref: "outline" }) : _vm._e()], 1);
    }, staticRenderFns: [],
    name: 'mdc-select',
    components: {
      SelectLabel: SelectLabel,
      SelectLineRiple: SelectLineRiple,
      SelectNotchedOutline: SelectNotchedOutline
    },
    inheritAttrs: false,
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: String,
      disabled: Boolean,
      label: String,
      box: Boolean,
      outlined: Boolean,
      id: { type: String }
    },
    data: function data() {
      return {
        styles: {},
        classes: {}
      };
    },

    computed: {
      rootClasses: function rootClasses() {
        return _extends({
          'mdc-select--box': this.box,
          'mdc-select--outlined': this.outlined
        }, this.classes);
      },
      listeners: function listeners() {
        var _this = this;

        return _extends({}, this.$listeners, {
          change: function change(event) {
            return _this.$emit('change', event.target.value);
          }
        });
      }
    },
    watch: {
      disabled: function disabled(value) {
        this.foundation && this.foundation.setDisabled(value);
      },

      value: 'refreshIndex'
    },
    mounted: function mounted() {
      var _this2 = this;

      this.foundation = new MDCSelectFoundation({
        addClass: function addClass(className) {
          return _this2.$set(_this2.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this2.$delete(_this2.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this2.$el.classList.contains(className);
        },
        activateBottomLine: function activateBottomLine() {
          if (_this2.$refs.line) {
            _this2.$refs.line.foundation.activate();
          }
        },
        deactivateBottomLine: function deactivateBottomLine() {
          if (_this2.$refs.line) {
            _this2.$refs.line.foundation.deactivate();
          }
        },
        setDisabled: function setDisabled(disabled) {
          return _this2.$refs.native_control.disabled = disabled;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this2.$refs.native_control.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this2.$refs.native_control.removeEventListener(type, handler);
        },
        getSelectedIndex: function getSelectedIndex() {
          return _this2.$refs.native_control.selectedIndex;
        },
        setSelectedIndex: function setSelectedIndex(index) {
          return _this2.$refs.native_control.selectedIndex = index;
        },
        getValue: function getValue() {
          return _this2.$refs.native_control.value;
        },
        setValue: function setValue(value) {
          return _this2.$refs.native_control.value = value;
        },
        isRtl: function isRtl() {
          return window.getComputedStyle(_this2.$el).getPropertyValue('direction') === 'rtl';
        },
        notchOutline: function notchOutline(labelWidth, isRtl) {
          if (_this2.$refs.outline) {
            _this2.$refs.outline.foundation.notch(labelWidth, isRtl);
          }
        },
        closeOutline: function closeOutline() {
          if (_this2.$refs.outline) {
            _this2.$refs.outline.foundation.closeNotch();
          }
        },
        hasOutline: function hasOutline() {
          return !!_this2.$refs.outline;
        },
        floatLabel: function floatLabel(value) {
          if (_this2.$refs.label) {
            _this2.$refs.label.foundation.float(value);
          }
        },
        hasLabel: function hasLabel() {
          return !!_this2.$refs.label;
        },
        getLabelWidth: function getLabelWidth() {
          if (_this2.$refs.label) {
            return _this2.$refs.label.foundation.getWidth();
          }
        }
      });

      this.foundation.init();

      this.foundation.setDisabled(this.disabled);

      // initial sync with DOM
      this.refreshIndex();
      this.slotObserver = new MutationObserver(function () {
        return _this2.refreshIndex();
      });
      this.slotObserver.observe(this.$refs.native_control, {
        childList: true,
        subtree: true
      });

      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.slotObserver.disconnect();

      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();

      this.ripple && this.ripple.destroy();
    },

    methods: {
      refreshIndex: function refreshIndex() {
        var _this3 = this;

        var options = [].concat(toConsumableArray(this.$refs.native_control.querySelectorAll('option')));

        var idx = options.findIndex(function (_ref) {
          var value = _ref.value;

          return _this3.value === value;
        });

        if (this.$refs.native_control.selectedIndex !== idx) {
          this.foundation.setSelectedIndex(idx);
        }
      }
    }
  };

  var VueMDCSelect = BasePlugin({
    mdcSelect: mdcSelect
  });

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
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
   */

  /** @enum {string} */
  var cssClasses$g = {
    ACTIVE: 'mdc-slider--active',
    DISABLED: 'mdc-slider--disabled',
    DISCRETE: 'mdc-slider--discrete',
    FOCUS: 'mdc-slider--focus',
    IN_TRANSIT: 'mdc-slider--in-transit',
    IS_DISCRETE: 'mdc-slider--discrete',
    HAS_TRACK_MARKER: 'mdc-slider--display-markers'
  };

  /** @enum {string} */
  var strings$f = {
    TRACK_SELECTOR: '.mdc-slider__track',
    TRACK_MARKER_CONTAINER_SELECTOR: '.mdc-slider__track-marker-container',
    LAST_TRACK_MARKER_SELECTOR: '.mdc-slider__track-marker:last-child',
    THUMB_CONTAINER_SELECTOR: '.mdc-slider__thumb-container',
    PIN_VALUE_MARKER_SELECTOR: '.mdc-slider__pin-value-marker',
    ARIA_VALUEMIN: 'aria-valuemin',
    ARIA_VALUEMAX: 'aria-valuemax',
    ARIA_VALUENOW: 'aria-valuenow',
    ARIA_DISABLED: 'aria-disabled',
    STEP_DATA_ATTR: 'data-step',
    CHANGE_EVENT: 'MDCSlider:change',
    INPUT_EVENT: 'MDCSlider:input'
  };

  /** @enum {number} */
  var numbers$4 = {
    PAGE_FACTOR: 4
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
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
   */

  /* eslint-disable no-unused-vars */

  /**
   * Adapter for MDC Slider.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Slider into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCSliderAdapter = function () {
    function MDCSliderAdapter() {
      classCallCheck(this, MDCSliderAdapter);
    }

    createClass(MDCSliderAdapter, [{
      key: "hasClass",

      /**
       * Returns true if className exists for the slider Element
       * @param {string} className
       * @return {boolean}
       */
      value: function hasClass(className) {}

      /**
       * Adds a class to the slider Element
       * @param {string} className
       */

    }, {
      key: "addClass",
      value: function addClass(className) {}

      /**
       * Removes a class from the slider Element
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns a string if attribute name exists on the slider Element,
       * otherwise returns null
       * @param {string} name
       * @return {?string}
       */

    }, {
      key: "getAttribute",
      value: function getAttribute(name) {}

      /**
       * Sets attribute name on slider Element to value
       * @param {string} name
       * @param {string} value
       */

    }, {
      key: "setAttribute",
      value: function setAttribute(name, value) {}

      /**
       * Removes attribute name from slider Element
       * @param {string} name
       */

    }, {
      key: "removeAttribute",
      value: function removeAttribute(name) {}

      /**
       * Returns the bounding client rect for the slider Element
       * @return {?ClientRect}
       */

    }, {
      key: "computeBoundingRect",
      value: function computeBoundingRect() {}

      /**
       * Returns the tab index of the slider Element
       * @return {number}
       */

    }, {
      key: "getTabIndex",
      value: function getTabIndex() {}

      /**
       * Registers an event handler on the root element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the root element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}

      /**
       * Registers an event handler on the thumb container element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerThumbContainerInteractionHandler",
      value: function registerThumbContainerInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the thumb container element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterThumbContainerInteractionHandler",
      value: function deregisterThumbContainerInteractionHandler(type, handler) {}

      /**
       * Registers an event handler on the body for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerBodyInteractionHandler",
      value: function registerBodyInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the body for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterBodyInteractionHandler",
      value: function deregisterBodyInteractionHandler(type, handler) {}

      /**
       * Registers an event handler for the window resize event
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerResizeHandler",
      value: function registerResizeHandler(handler) {}

      /**
       * Deregisters an event handler for the window resize event
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterResizeHandler",
      value: function deregisterResizeHandler(handler) {}

      /**
       * Emits a custom event MDCSlider:input from the root
       */

    }, {
      key: "notifyInput",
      value: function notifyInput() {}

      /**
       * Emits a custom event MDCSlider:change from the root
       */

    }, {
      key: "notifyChange",
      value: function notifyChange() {}

      /**
       * Sets a style property of the thumb container element to the passed value
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setThumbContainerStyleProperty",
      value: function setThumbContainerStyleProperty(propertyName, value) {}

      /**
       * Sets a style property of the track element to the passed value
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setTrackStyleProperty",
      value: function setTrackStyleProperty(propertyName, value) {}

      /**
       * Sets the inner text of the pin marker to the passed value
       * @param {number} value
       */

    }, {
      key: "setMarkerValue",
      value: function setMarkerValue(value) {}

      /**
       * Appends the passed number of track markers to the track mark container element
       * @param {number} numMarkers
       */

    }, {
      key: "appendTrackMarkers",
      value: function appendTrackMarkers(numMarkers) {}

      /**
       * Removes all track markers fromt he track mark container element
       */

    }, {
      key: "removeTrackMarkers",
      value: function removeTrackMarkers() {}

      /**
       * Sets a style property of the last track marker to the passed value
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setLastTrackMarkersStyleProperty",
      value: function setLastTrackMarkersStyleProperty(propertyName, value) {}

      /**
       * Returns true if the root element is RTL, otherwise false
       * @return {boolean}
       */

    }, {
      key: "isRTL",
      value: function isRTL() {}
    }]);
    return MDCSliderAdapter;
  }();

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   *you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var KEY_IDS = {
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown'
  };

  /** @enum {string} */
  var MOVE_EVENT_MAP = {
    'mousedown': 'mousemove',
    'touchstart': 'touchmove',
    'pointerdown': 'pointermove'
  };

  var DOWN_EVENTS = ['mousedown', 'pointerdown', 'touchstart'];
  var UP_EVENTS = ['mouseup', 'pointerup', 'touchend'];

  /**
   * @extends {MDCFoundation<!MDCSliderAdapter>}
   */

  var MDCSliderFoundation = function (_MDCFoundation) {
    inherits(MDCSliderFoundation, _MDCFoundation);
    createClass(MDCSliderFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses$g;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$f;
      }

      /** @return enum {numbers} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers$4;
      }

      /** @return {!MDCSliderAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCSliderAdapter} */{
            hasClass: function hasClass() {
              return (/* className: string */ /* boolean */false
              );
            },
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            getAttribute: function getAttribute() {
              return (/* name: string */ /* string|null */null
              );
            },
            setAttribute: function setAttribute() /* name: string, value: string */{},
            removeAttribute: function removeAttribute() /* name: string */{},
            computeBoundingRect: function computeBoundingRect() {
              return (/* ClientRect */{
                  top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0
                }
              );
            },
            getTabIndex: function getTabIndex() {
              return (/* number */0
              );
            },
            registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
            registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
            registerBodyInteractionHandler: function registerBodyInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler() /* type: string, handler: EventListener */{},
            registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
            deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
            notifyInput: function notifyInput() {},
            notifyChange: function notifyChange() {},
            setThumbContainerStyleProperty: function setThumbContainerStyleProperty() /* propertyName: string, value: string */{},
            setTrackStyleProperty: function setTrackStyleProperty() /* propertyName: string, value: string */{},
            setMarkerValue: function setMarkerValue() /* value: number */{},
            appendTrackMarkers: function appendTrackMarkers() /* numMarkers: number */{},
            removeTrackMarkers: function removeTrackMarkers() {},
            setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty() /* propertyName: string, value: string */{},
            isRTL: function isRTL() {
              return (/* boolean */false
              );
            }
          }
        );
      }

      /**
       * Creates a new instance of MDCSliderFoundation
       * @param {?MDCSliderAdapter} adapter
       */

    }]);

    function MDCSliderFoundation(adapter) {
      classCallCheck(this, MDCSliderFoundation);

      /** @private {?ClientRect} */
      var _this = possibleConstructorReturn(this, (MDCSliderFoundation.__proto__ || Object.getPrototypeOf(MDCSliderFoundation)).call(this, _extends(MDCSliderFoundation.defaultAdapter, adapter)));

      _this.rect_ = null;
      // We set this to NaN since we want it to be a number, but we can't use '0' or '-1'
      // because those could be valid tabindices set by the client code.
      _this.savedTabIndex_ = NaN;
      _this.active_ = false;
      _this.inTransit_ = false;
      _this.isDiscrete_ = false;
      _this.hasTrackMarker_ = false;
      _this.handlingThumbTargetEvt_ = false;
      _this.min_ = 0;
      _this.max_ = 100;
      _this.step_ = 0;
      _this.value_ = 0;
      _this.disabled_ = false;
      _this.preventFocusState_ = false;
      _this.updateUIFrame_ = 0;
      _this.thumbContainerPointerHandler_ = function () {
        _this.handlingThumbTargetEvt_ = true;
      };
      _this.interactionStartHandler_ = function (evt) {
        return _this.handleDown_(evt);
      };
      _this.keydownHandler_ = function (evt) {
        return _this.handleKeydown_(evt);
      };
      _this.focusHandler_ = function () {
        return _this.handleFocus_();
      };
      _this.blurHandler_ = function () {
        return _this.handleBlur_();
      };
      _this.resizeHandler_ = function () {
        return _this.layout();
      };
      return _this;
    }

    createClass(MDCSliderFoundation, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        this.isDiscrete_ = this.adapter_.hasClass(cssClasses$g.IS_DISCRETE);
        this.hasTrackMarker_ = this.adapter_.hasClass(cssClasses$g.HAS_TRACK_MARKER);
        DOWN_EVENTS.forEach(function (evtName) {
          return _this2.adapter_.registerInteractionHandler(evtName, _this2.interactionStartHandler_);
        });
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
        DOWN_EVENTS.forEach(function (evtName) {
          _this2.adapter_.registerThumbContainerInteractionHandler(evtName, _this2.thumbContainerPointerHandler_);
        });
        this.adapter_.registerResizeHandler(this.resizeHandler_);
        this.layout();
        // At last step, provide a reasonable default value to discrete slider
        if (this.isDiscrete_ && this.getStep() == 0) {
          this.step_ = 1;
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        DOWN_EVENTS.forEach(function (evtName) {
          _this3.adapter_.deregisterInteractionHandler(evtName, _this3.interactionStartHandler_);
        });
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
        DOWN_EVENTS.forEach(function (evtName) {
          _this3.adapter_.deregisterThumbContainerInteractionHandler(evtName, _this3.thumbContainerPointerHandler_);
        });
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }
    }, {
      key: 'setupTrackMarker',
      value: function setupTrackMarker() {
        if (this.isDiscrete_ && this.hasTrackMarker_ && this.getStep() != 0) {
          var min = this.getMin();
          var max = this.getMax();
          var step = this.getStep();
          var numMarkers = (max - min) / step;

          // In case distance between max & min is indivisible to step,
          // we place the secondary to last marker proportionally at where thumb
          // could reach and place the last marker at max value
          var indivisible = Math.ceil(numMarkers) !== numMarkers;
          if (indivisible) {
            numMarkers = Math.ceil(numMarkers);
          }

          this.adapter_.removeTrackMarkers();
          this.adapter_.appendTrackMarkers(numMarkers);

          if (indivisible) {
            var lastStepRatio = (max - numMarkers * step) / step + 1;
            var flex = getCorrectPropertyName(window, 'flex');
            this.adapter_.setLastTrackMarkersStyleProperty(flex, String(lastStepRatio));
          }
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        this.rect_ = this.adapter_.computeBoundingRect();
        this.updateUIForCurrentValue_();
      }

      /** @return {number} */

    }, {
      key: 'getValue',
      value: function getValue() {
        return this.value_;
      }

      /** @param {number} value */

    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.setValue_(value, false);
      }

      /** @return {number} */

    }, {
      key: 'getMax',
      value: function getMax() {
        return this.max_;
      }

      /** @param {number} max */

    }, {
      key: 'setMax',
      value: function setMax(max) {
        if (max < this.min_) {
          throw new Error('Cannot set max to be less than the slider\'s minimum value');
        }
        this.max_ = max;
        this.setValue_(this.value_, false, true);
        this.adapter_.setAttribute(strings$f.ARIA_VALUEMAX, String(this.max_));
        this.setupTrackMarker();
      }

      /** @return {number} */

    }, {
      key: 'getMin',
      value: function getMin() {
        return this.min_;
      }

      /** @param {number} min */

    }, {
      key: 'setMin',
      value: function setMin(min) {
        if (min > this.max_) {
          throw new Error('Cannot set min to be greater than the slider\'s maximum value');
        }
        this.min_ = min;
        this.setValue_(this.value_, false, true);
        this.adapter_.setAttribute(strings$f.ARIA_VALUEMIN, String(this.min_));
        this.setupTrackMarker();
      }

      /** @return {number} */

    }, {
      key: 'getStep',
      value: function getStep() {
        return this.step_;
      }

      /** @param {number} step */

    }, {
      key: 'setStep',
      value: function setStep(step) {
        if (step < 0) {
          throw new Error('Step cannot be set to a negative number');
        }
        if (this.isDiscrete_ && (typeof step !== 'number' || step < 1)) {
          step = 1;
        }
        this.step_ = step;
        this.setValue_(this.value_, false, true);
        this.setupTrackMarker();
      }

      /** @return {boolean} */

    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.disabled_;
      }

      /** @param {boolean} disabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.disabled_ = disabled;
        this.toggleClass_(cssClasses$g.DISABLED, this.disabled_);
        if (this.disabled_) {
          this.savedTabIndex_ = this.adapter_.getTabIndex();
          this.adapter_.setAttribute(strings$f.ARIA_DISABLED, 'true');
          this.adapter_.removeAttribute('tabindex');
        } else {
          this.adapter_.removeAttribute(strings$f.ARIA_DISABLED);
          if (!isNaN(this.savedTabIndex_)) {
            this.adapter_.setAttribute('tabindex', String(this.savedTabIndex_));
          }
        }
      }

      /**
       * Called when the user starts interacting with the slider
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handleDown_',
      value: function handleDown_(evt) {
        var _this4 = this;

        if (this.disabled_) {
          return;
        }

        this.preventFocusState_ = true;
        this.setInTransit_(!this.handlingThumbTargetEvt_);
        this.handlingThumbTargetEvt_ = false;
        this.setActive_(true);

        var moveHandler = function moveHandler(evt) {
          _this4.handleMove_(evt);
        };

        // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
        // do not always fire these consistently in pairs.
        // (See https://github.com/material-components/material-components-web/issues/1192)
        var upHandler = function upHandler() {
          _this4.handleUp_();
          _this4.adapter_.deregisterBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
          UP_EVENTS.forEach(function (evtName) {
            return _this4.adapter_.deregisterBodyInteractionHandler(evtName, upHandler);
          });
        };

        this.adapter_.registerBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
        UP_EVENTS.forEach(function (evtName) {
          return _this4.adapter_.registerBodyInteractionHandler(evtName, upHandler);
        });
        this.setValueFromEvt_(evt);
      }

      /**
       * Called when the user moves the slider
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handleMove_',
      value: function handleMove_(evt) {
        evt.preventDefault();
        this.setValueFromEvt_(evt);
      }

      /**
       * Called when the user's interaction with the slider ends
       * @private
       */

    }, {
      key: 'handleUp_',
      value: function handleUp_() {
        this.setActive_(false);
        this.adapter_.notifyChange();
      }

      /**
       * Returns the pageX of the event
       * @param {!Event} evt
       * @return {number}
       * @private
       */

    }, {
      key: 'getPageX_',
      value: function getPageX_(evt) {
        if (evt.targetTouches && evt.targetTouches.length > 0) {
          return evt.targetTouches[0].pageX;
        }
        return evt.pageX;
      }

      /**
       * Sets the slider value from an event
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'setValueFromEvt_',
      value: function setValueFromEvt_(evt) {
        var pageX = this.getPageX_(evt);
        var value = this.computeValueFromPageX_(pageX);
        this.setValue_(value, true);
      }

      /**
       * Computes the new value from the pageX position
       * @param {number} pageX
       * @return {number}
       */

    }, {
      key: 'computeValueFromPageX_',
      value: function computeValueFromPageX_(pageX) {
        var max = this.max_,
            min = this.min_;

        var xPos = pageX - this.rect_.left;
        var pctComplete = xPos / this.rect_.width;
        if (this.adapter_.isRTL()) {
          pctComplete = 1 - pctComplete;
        }
        // Fit the percentage complete between the range [min,max]
        // by remapping from [0, 1] to [min, min+(max-min)].
        return min + pctComplete * (max - min);
      }

      /**
       * Handles keydown events
       * @param {!Event} evt
       */

    }, {
      key: 'handleKeydown_',
      value: function handleKeydown_(evt) {
        var keyId = this.getKeyId_(evt);
        var value = this.getValueForKeyId_(keyId);
        if (isNaN(value)) {
          return;
        }

        // Prevent page from scrolling due to key presses that would normally scroll the page
        evt.preventDefault();
        this.adapter_.addClass(cssClasses$g.FOCUS);
        this.setValue_(value, true);
        this.adapter_.notifyChange();
      }

      /**
       * Returns the computed name of the event
       * @param {!Event} kbdEvt
       * @return {string}
       */

    }, {
      key: 'getKeyId_',
      value: function getKeyId_(kbdEvt) {
        if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
          return KEY_IDS.ARROW_LEFT;
        }
        if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
          return KEY_IDS.ARROW_RIGHT;
        }
        if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
          return KEY_IDS.ARROW_UP;
        }
        if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
          return KEY_IDS.ARROW_DOWN;
        }
        if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
          return KEY_IDS.HOME;
        }
        if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
          return KEY_IDS.END;
        }
        if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
          return KEY_IDS.PAGE_UP;
        }
        if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
          return KEY_IDS.PAGE_DOWN;
        }

        return '';
      }

      /**
       * Computes the value given a keyboard key ID
       * @param {string} keyId
       * @return {number}
       */

    }, {
      key: 'getValueForKeyId_',
      value: function getValueForKeyId_(keyId) {
        var max = this.max_,
            min = this.min_,
            step = this.step_;

        var delta = step || (max - min) / 100;
        var valueNeedsToBeFlipped = this.adapter_.isRTL() && (keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT);
        if (valueNeedsToBeFlipped) {
          delta = -delta;
        }

        switch (keyId) {
          case KEY_IDS.ARROW_LEFT:
          case KEY_IDS.ARROW_DOWN:
            return this.value_ - delta;
          case KEY_IDS.ARROW_RIGHT:
          case KEY_IDS.ARROW_UP:
            return this.value_ + delta;
          case KEY_IDS.HOME:
            return this.min_;
          case KEY_IDS.END:
            return this.max_;
          case KEY_IDS.PAGE_UP:
            return this.value_ + delta * numbers$4.PAGE_FACTOR;
          case KEY_IDS.PAGE_DOWN:
            return this.value_ - delta * numbers$4.PAGE_FACTOR;
          default:
            return NaN;
        }
      }
    }, {
      key: 'handleFocus_',
      value: function handleFocus_() {
        if (this.preventFocusState_) {
          return;
        }
        this.adapter_.addClass(cssClasses$g.FOCUS);
      }
    }, {
      key: 'handleBlur_',
      value: function handleBlur_() {
        this.preventFocusState_ = false;
        this.adapter_.removeClass(cssClasses$g.FOCUS);
      }

      /**
       * Sets the value of the slider
       * @param {number} value
       * @param {boolean} shouldFireInput
       * @param {boolean=} force
       */

    }, {
      key: 'setValue_',
      value: function setValue_(value, shouldFireInput) {
        var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (value === this.value_ && !force) {
          return;
        }

        var min = this.min_,
            max = this.max_;

        var valueSetToBoundary = value === min || value === max;
        if (this.step_ && !valueSetToBoundary) {
          value = this.quantize_(value);
        }
        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        }
        this.value_ = value;
        this.adapter_.setAttribute(strings$f.ARIA_VALUENOW, String(this.value_));
        this.updateUIForCurrentValue_();

        if (shouldFireInput) {
          this.adapter_.notifyInput();
          if (this.isDiscrete_) {
            this.adapter_.setMarkerValue(value);
          }
        }
      }

      /**
       * Calculates the quantized value
       * @param {number} value
       * @return {number}
       */

    }, {
      key: 'quantize_',
      value: function quantize_(value) {
        var numSteps = Math.round(value / this.step_);
        var quantizedVal = numSteps * this.step_;
        return quantizedVal;
      }
    }, {
      key: 'updateUIForCurrentValue_',
      value: function updateUIForCurrentValue_() {
        var _this5 = this;

        var max = this.max_,
            min = this.min_,
            value = this.value_;

        var pctComplete = (value - min) / (max - min);
        var translatePx = pctComplete * this.rect_.width;
        if (this.adapter_.isRTL()) {
          translatePx = this.rect_.width - translatePx;
        }

        var transformProp = getCorrectPropertyName(window, 'transform');
        var transitionendEvtName = getCorrectEventName(window, 'transitionend');

        if (this.inTransit_) {
          var onTransitionEnd = function onTransitionEnd() {
            _this5.setInTransit_(false);
            _this5.adapter_.deregisterThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
          };
          this.adapter_.registerThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
        }

        this.updateUIFrame_ = requestAnimationFrame(function () {
          // NOTE(traviskaufman): It would be nice to use calc() here,
          // but IE cannot handle calcs in transforms correctly.
          // See: https://goo.gl/NC2itk
          // Also note that the -50% offset is used to center the slider thumb.
          _this5.adapter_.setThumbContainerStyleProperty(transformProp, 'translateX(' + translatePx + 'px) translateX(-50%)');
          _this5.adapter_.setTrackStyleProperty(transformProp, 'scaleX(' + pctComplete + ')');
        });
      }

      /**
       * Toggles the active state of the slider
       * @param {boolean} active
       */

    }, {
      key: 'setActive_',
      value: function setActive_(active) {
        this.active_ = active;
        this.toggleClass_(cssClasses$g.ACTIVE, this.active_);
      }

      /**
       * Toggles the inTransit state of the slider
       * @param {boolean} inTransit
       */

    }, {
      key: 'setInTransit_',
      value: function setInTransit_(inTransit) {
        this.inTransit_ = inTransit;
        this.toggleClass_(cssClasses$g.IN_TRANSIT, this.inTransit_);
      }

      /**
       * Conditionally adds or removes a class based on shouldBePresent
       * @param {string} className
       * @param {boolean} shouldBePresent
       */

    }, {
      key: 'toggleClass_',
      value: function toggleClass_(className, shouldBePresent) {
        if (shouldBePresent) {
          this.adapter_.addClass(className);
        } else {
          this.adapter_.removeClass(className);
        }
      }
    }]);
    return MDCSliderFoundation;
  }(MDCFoundation);

  var mdcSlider = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-slider", class: _vm.classes, attrs: { "tabindex": "0", "role": "slider" } }, [_c('div', { staticClass: "mdc-slider__track-container" }, [_c('div', { staticClass: "mdc-slider__track", style: _vm.trackStyles }), _vm._v(" "), _vm.hasMarkers ? _c('div', { staticClass: "mdc-slider__track-marker-container" }, _vm._l(_vm.numMarkers, function (markerNum) {
        return _c('div', { key: markerNum, staticClass: "mdc-slider__track-marker", style: markerNum == _vm.numMarkers ? _vm.lastTrackMarkersStyles : {} });
      })) : _vm._e()]), _vm._v(" "), _c('div', { ref: "thumbContainer", staticClass: "mdc-slider__thumb-container", style: _vm.thumbStyles }, [_vm.isDiscrete ? _c('div', { staticClass: "mdc-slider__pin" }, [_c('span', { staticClass: "mdc-slider__pin-value-marker" }, [_vm._v(_vm._s(_vm.markerValue))])]) : _vm._e(), _vm._v(" "), _c('svg', { staticClass: "mdc-slider__thumb", attrs: { "width": "21", "height": "21" } }, [_c('circle', { attrs: { "cx": "10.5", "cy": "10.5", "r": "7.875" } })]), _vm._v(" "), _c('div', { staticClass: "mdc-slider__focus-ring" })])]);
    }, staticRenderFns: [],
    name: 'mdc-slider',
    mixins: [DispatchFocusMixin],
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: [Number, String],
      min: { type: [Number, String], default: 0 },
      max: { type: [Number, String], default: 100 },
      step: { type: [Number, String], default: 0 },
      displayMarkers: Boolean,
      disabled: Boolean,
      layoutOn: String,
      layoutOnSource: { type: Object, required: false }
    },
    data: function data() {
      return {
        classes: {
          'mdc-slider--discrete': !!this.step,
          'mdc-slider--display-markers': this.displayMarkers
        },
        trackStyles: {},
        lastTrackMarkersStyles: {},
        thumbStyles: {},
        markerValue: '',
        numMarkers: 0
      };
    },

    computed: {
      isDiscrete: function isDiscrete() {
        return !!this.step;
      },
      hasMarkers: function hasMarkers() {
        return !!this.step && this.displayMarkers && this.numMarkers;
      }
    },
    watch: {
      value: function value() {
        if (this.foundation.getValue() !== Number(this.value)) {
          this.foundation.setValue(this.value);
        }
      },
      min: function min() {
        this.foundation.setMin(Number(this.min));
      },
      max: function max() {
        this.foundation.setMax(Number(this.max));
      },
      step: function step() {
        this.foundation.setStep(Number(this.step));
      },
      disabled: function disabled() {
        this.foundation.setDisabled(this.disabled);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCSliderFoundation({
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        addClass: function addClass(className) {
          _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.classes, className, true);
        },
        getAttribute: function getAttribute(name) {
          return _this.$el.getAttribute(name);
        },
        setAttribute: function setAttribute(name, value) {
          return _this.$el.setAttribute(name, value);
        },
        removeAttribute: function removeAttribute(name) {
          return _this.$el.removeAttribute(name);
        },
        computeBoundingRect: function computeBoundingRect() {
          return _this.$el.getBoundingClientRect();
        },
        getTabIndex: function getTabIndex() {
          return _this.$el.tabIndex;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          _this.$el.addEventListener(type, handler, applyPassive());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          _this.$el.removeEventListener(type, handler, applyPassive());
        },
        registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler(type, handler) {
          _this.$refs.thumbContainer.addEventListener(type, handler, applyPassive());
        },
        deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler(type, handler) {
          _this.$refs.thumbContainer.removeEventListener(type, handler, applyPassive());
        },
        registerBodyInteractionHandler: function registerBodyInteractionHandler(type, handler) {
          document.body.addEventListener(type, handler);
        },
        deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler(type, handler) {
          document.body.removeEventListener(type, handler);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          window.removeEventListener('resize', handler);
        },
        notifyInput: function notifyInput() {
          _this.$emit('input', _this.foundation.getValue());
        },
        notifyChange: function notifyChange() {
          _this.$emit('change', _this.foundation.getValue());
        },
        setThumbContainerStyleProperty: function setThumbContainerStyleProperty(propertyName, value) {
          _this.$set(_this.thumbStyles, propertyName, value);
        },
        setTrackStyleProperty: function setTrackStyleProperty(propertyName, value) {
          _this.$set(_this.trackStyles, propertyName, value);
        },
        setMarkerValue: function setMarkerValue(value) {
          _this.markerValue = value;
        },
        appendTrackMarkers: function appendTrackMarkers(numMarkers) {
          _this.numMarkers = numMarkers;
        },
        removeTrackMarkers: function removeTrackMarkers() {
          _this.numMarkers = 0;
        },
        setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty(propertyName, value) {
          _this.$set(_this.lastTrackMarkersStyles, propertyName, value);
        },
        isRTL: function isRTL() {
          return false;
        }
      });

      this.foundation.init();
      this.foundation.setDisabled(this.disabled);
      if (Number(this.min) <= this.foundation.getMax()) {
        this.foundation.setMin(Number(this.min));
        this.foundation.setMax(Number(this.max));
      } else {
        this.foundation.setMax(Number(this.max));
        this.foundation.setMin(Number(this.min));
      }
      this.foundation.setStep(Number(this.step));
      this.foundation.setValue(Number(this.value));
      if (this.hasMarkers) {
        this.foundation.setupTrackMarker();
      }

      this.$root.$on('vma:layout', this.layout);

      if (this.layoutOn) {
        this.layoutOnEventSource = this.layoutOnSource || this.$root;
        this.layoutOnEventSource.$on(this.layoutOn, this.layout);
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.$root.$off('vma:layout', this.layout);
      if (this.layoutOnEventSource) {
        this.layoutOnEventSource.$off(this.layoutOn, this.layout);
      }
      this.foundation.destroy();
    },

    methods: {
      layout: function layout() {
        var _this2 = this;

        this.$nextTick(function () {
          _this2.foundation && _this2.foundation.layout();
        });
      }
    }
  };

  var VueMDCSlider = BasePlugin({
    mdcSlider: mdcSlider
  });

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var cssClasses$h = {
    ROOT: 'mdc-snackbar',
    TEXT: 'mdc-snackbar__text',
    ACTION_WRAPPER: 'mdc-snackbar__action-wrapper',
    ACTION_BUTTON: 'mdc-snackbar__action-button',
    ACTIVE: 'mdc-snackbar--active',
    MULTILINE: 'mdc-snackbar--multiline',
    ACTION_ON_BOTTOM: 'mdc-snackbar--action-on-bottom'
  };

  var strings$g = {
    TEXT_SELECTOR: '.mdc-snackbar__text',
    ACTION_WRAPPER_SELECTOR: '.mdc-snackbar__action-wrapper',
    ACTION_BUTTON_SELECTOR: '.mdc-snackbar__action-button',
    SHOW_EVENT: 'MDCSnackbar:show',
    HIDE_EVENT: 'MDCSnackbar:hide'
  };

  var numbers$5 = {
    MESSAGE_TIMEOUT: 2750
  };

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCSnackbarFoundation = function (_MDCFoundation) {
    inherits(MDCSnackbarFoundation, _MDCFoundation);
    createClass(MDCSnackbarFoundation, [{
      key: 'active',
      get: function get$$1() {
        return this.active_;
      }
    }], [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$h;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$g;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          setAriaHidden: function setAriaHidden() {},
          unsetAriaHidden: function unsetAriaHidden() {},
          setActionAriaHidden: function setActionAriaHidden() {},
          unsetActionAriaHidden: function unsetActionAriaHidden() {},
          setActionText: function setActionText() /* actionText: string */{},
          setMessageText: function setMessageText() /* message: string */{},
          setFocus: function setFocus() {},
          visibilityIsHidden: function visibilityIsHidden() {
            return (/* boolean */false
            );
          },
          registerCapturedBlurHandler: function registerCapturedBlurHandler() /* handler: EventListener */{},
          deregisterCapturedBlurHandler: function deregisterCapturedBlurHandler() /* handler: EventListener */{},
          registerVisibilityChangeHandler: function registerVisibilityChangeHandler() /* handler: EventListener */{},
          deregisterVisibilityChangeHandler: function deregisterVisibilityChangeHandler() /* handler: EventListener */{},
          registerCapturedInteractionHandler: function registerCapturedInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerActionClickHandler: function registerActionClickHandler() /* handler: EventListener */{},
          deregisterActionClickHandler: function deregisterActionClickHandler() /* handler: EventListener */{},
          registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
          notifyShow: function notifyShow() {},
          notifyHide: function notifyHide() {}
        };
      }
    }]);

    function MDCSnackbarFoundation(adapter) {
      classCallCheck(this, MDCSnackbarFoundation);

      var _this = possibleConstructorReturn(this, (MDCSnackbarFoundation.__proto__ || Object.getPrototypeOf(MDCSnackbarFoundation)).call(this, _extends(MDCSnackbarFoundation.defaultAdapter, adapter)));

      _this.active_ = false;
      _this.actionWasClicked_ = false;
      _this.dismissOnAction_ = true;
      _this.firstFocus_ = true;
      _this.pointerDownRecognized_ = false;
      _this.snackbarHasFocus_ = false;
      _this.snackbarData_ = null;
      _this.queue_ = [];
      _this.actionClickHandler_ = function () {
        _this.actionWasClicked_ = true;
        _this.invokeAction_();
      };
      _this.visibilitychangeHandler_ = function () {
        clearTimeout(_this.timeoutId_);
        _this.snackbarHasFocus_ = true;

        if (!_this.adapter_.visibilityIsHidden()) {
          setTimeout(_this.cleanup_.bind(_this), _this.snackbarData_.timeout || numbers$5.MESSAGE_TIMEOUT);
        }
      };
      _this.interactionHandler_ = function (evt) {
        if (evt.type == 'touchstart' || evt.type == 'mousedown') {
          _this.pointerDownRecognized_ = true;
        }
        _this.handlePossibleTabKeyboardFocus_(evt);

        if (evt.type == 'focus') {
          _this.pointerDownRecognized_ = false;
        }
      };
      _this.blurHandler_ = function () {
        clearTimeout(_this.timeoutId_);
        _this.snackbarHasFocus_ = false;
        _this.timeoutId_ = setTimeout(_this.cleanup_.bind(_this), _this.snackbarData_.timeout || numbers$5.MESSAGE_TIMEOUT);
      };
      return _this;
    }

    createClass(MDCSnackbarFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerActionClickHandler(this.actionClickHandler_);
        this.adapter_.setAriaHidden();
        this.adapter_.setActionAriaHidden();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this2 = this;

        this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
        this.adapter_.deregisterCapturedBlurHandler(this.blurHandler_);
        this.adapter_.deregisterVisibilityChangeHandler(this.visibilitychangeHandler_);
        ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
          _this2.adapter_.deregisterCapturedInteractionHandler(evtType, _this2.interactionHandler_);
        });
      }
    }, {
      key: 'dismissesOnAction',
      value: function dismissesOnAction() {
        return this.dismissOnAction_;
      }
    }, {
      key: 'setDismissOnAction',
      value: function setDismissOnAction(dismissOnAction) {
        this.dismissOnAction_ = !!dismissOnAction;
      }
    }, {
      key: 'show',
      value: function show(data) {
        var _this3 = this;

        if (!data) {
          throw new Error('Please provide a data object with at least a message to display.');
        }
        if (!data.message) {
          throw new Error('Please provide a message to be displayed.');
        }
        if (data.actionHandler && !data.actionText) {
          throw new Error('Please provide action text with the handler.');
        }
        if (this.active) {
          this.queue_.push(data);
          return;
        }
        clearTimeout(this.timeoutId_);
        this.snackbarData_ = data;
        this.firstFocus_ = true;
        this.adapter_.registerVisibilityChangeHandler(this.visibilitychangeHandler_);
        this.adapter_.registerCapturedBlurHandler(this.blurHandler_);
        ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
          _this3.adapter_.registerCapturedInteractionHandler(evtType, _this3.interactionHandler_);
        });

        var ACTIVE = cssClasses$h.ACTIVE,
            MULTILINE = cssClasses$h.MULTILINE,
            ACTION_ON_BOTTOM = cssClasses$h.ACTION_ON_BOTTOM;


        this.adapter_.setMessageText(this.snackbarData_.message);

        if (this.snackbarData_.multiline) {
          this.adapter_.addClass(MULTILINE);
          if (this.snackbarData_.actionOnBottom) {
            this.adapter_.addClass(ACTION_ON_BOTTOM);
          }
        }

        if (this.snackbarData_.actionHandler) {
          this.adapter_.setActionText(this.snackbarData_.actionText);
          this.actionHandler_ = this.snackbarData_.actionHandler;
          this.setActionHidden_(false);
        } else {
          this.setActionHidden_(true);
          this.actionHandler_ = null;
          this.adapter_.setActionText(null);
        }

        this.active_ = true;
        this.adapter_.addClass(ACTIVE);
        this.adapter_.unsetAriaHidden();
        this.adapter_.notifyShow();

        this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$5.MESSAGE_TIMEOUT);
      }
    }, {
      key: 'handlePossibleTabKeyboardFocus_',
      value: function handlePossibleTabKeyboardFocus_() {
        var hijackFocus = this.firstFocus_ && !this.pointerDownRecognized_;

        if (hijackFocus) {
          this.setFocusOnAction_();
        }

        this.firstFocus_ = false;
      }
    }, {
      key: 'setFocusOnAction_',
      value: function setFocusOnAction_() {
        this.adapter_.setFocus();
        this.snackbarHasFocus_ = true;
        this.firstFocus_ = false;
      }
    }, {
      key: 'invokeAction_',
      value: function invokeAction_() {
        try {
          if (!this.actionHandler_) {
            return;
          }

          this.actionHandler_();
        } finally {
          if (this.dismissOnAction_) {
            this.cleanup_();
          }
        }
      }
    }, {
      key: 'cleanup_',
      value: function cleanup_() {
        var _this4 = this;

        var allowDismissal = !this.snackbarHasFocus_ || this.actionWasClicked_;

        if (allowDismissal) {
          var ACTIVE = cssClasses$h.ACTIVE,
              MULTILINE = cssClasses$h.MULTILINE,
              ACTION_ON_BOTTOM = cssClasses$h.ACTION_ON_BOTTOM;


          this.adapter_.removeClass(ACTIVE);

          var handler = function handler() {
            clearTimeout(_this4.timeoutId_);
            _this4.adapter_.deregisterTransitionEndHandler(handler);
            _this4.adapter_.removeClass(MULTILINE);
            _this4.adapter_.removeClass(ACTION_ON_BOTTOM);
            _this4.setActionHidden_(true);
            _this4.adapter_.setAriaHidden();
            _this4.active_ = false;
            _this4.snackbarHasFocus_ = false;
            _this4.adapter_.notifyHide();
            _this4.showNext_();
          };

          this.adapter_.registerTransitionEndHandler(handler);
        }
      }
    }, {
      key: 'showNext_',
      value: function showNext_() {
        if (!this.queue_.length) {
          return;
        }
        this.show(this.queue_.shift());
      }
    }, {
      key: 'setActionHidden_',
      value: function setActionHidden_(isHidden) {
        if (isHidden) {
          this.adapter_.setActionAriaHidden();
        } else {
          this.adapter_.unsetActionAriaHidden();
        }
      }
    }]);
    return MDCSnackbarFoundation;
  }(MDCFoundation);

  var mdcSnackbar = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root", staticClass: "mdc-snackbar", class: _vm.classes, attrs: { "aria-hidden": _vm.hidden, "aria-live": "assertive", "aria-atomic": "true" } }, [_c('div', { staticClass: "mdc-snackbar__text" }, [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), _c('div', { staticClass: "mdc-snackbar__action-wrapper" }, [_c('button', { ref: "button", staticClass: "mdc-snackbar__action-button", attrs: { "aria-hidden": _vm.actionHidden, "type": "button" } }, [_vm._v(_vm._s(_vm.actionText))])])]);
    }, staticRenderFns: [],
    name: 'mdc-snackbar',
    model: {
      prop: 'snack',
      event: 'queued'
    },
    props: {
      'align-start': Boolean,
      snack: Object,
      event: String,
      'event-source': {
        type: Object,
        required: false,
        default: function _default() {
          return this.$root;
        }
      },
      'dismisses-on-action': {
        type: Boolean,
        default: true
      }
    },
    data: function data() {
      return {
        classes: {
          'mdc-snackbar--align-start': this.alignStart
        },
        message: '',
        actionText: '',
        hidden: false,
        actionHidden: false
      };
    },

    watch: {
      snack: 'onSnack'
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCSnackbarFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        setAriaHidden: function setAriaHidden() {
          return _this.hidden = true;
        },
        unsetAriaHidden: function unsetAriaHidden() {
          return _this.hidden = false;
        },
        setActionAriaHidden: function setActionAriaHidden() {
          return _this.actionHidden = true;
        },
        unsetActionAriaHidden: function unsetActionAriaHidden() {
          return _this.actionHidden = false;
        },
        setActionText: function setActionText(text) {
          _this.actionText = text;
        },
        setMessageText: function setMessageText(text) {
          _this.message = text;
        },
        setFocus: function setFocus() {
          return _this.$refs.button.focus();
        },
        visibilityIsHidden: function visibilityIsHidden() {
          return document.hidden;
        },
        registerCapturedBlurHandler: function registerCapturedBlurHandler(handler) {
          return _this.$refs.button.addEventListener('blur', handler, true);
        },
        deregisterCapturedBlurHandler: function deregisterCapturedBlurHandler(handler) {
          return _this.$refs.button.removeEventListener('blur', handler, true);
        },
        registerVisibilityChangeHandler: function registerVisibilityChangeHandler(handler) {
          return document.addEventListener('visibilitychange', handler);
        },
        deregisterVisibilityChangeHandler: function deregisterVisibilityChangeHandler(handler) {
          return document.removeEventListener('visibilitychange', handler);
        },
        registerCapturedInteractionHandler: function registerCapturedInteractionHandler(evt, handler) {
          return document.body.addEventListener(evt, handler, true);
        },
        deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler(evt, handler) {
          return document.body.removeEventListener(evt, handler, true);
        },
        registerActionClickHandler: function registerActionClickHandler(handler) {
          return _this.$refs.button.addEventListener('click', handler);
        },
        deregisterActionClickHandler: function deregisterActionClickHandler(handler) {
          return _this.$refs.button.removeEventListener('click', handler);
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          var root = _this.$refs.root;
          root && root.addEventListener(getCorrectEventName(window, 'transitionend'), handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          var root = _this.$refs.root;
          root && root.removeEventListener(getCorrectEventName(window, 'transitionend'), handler);
        },
        notifyShow: function notifyShow() {
          return _this.$emit('show');
        },
        notifyHide: function notifyHide() {
          return _this.$emit('hide');
        }
      });
      this.foundation.init();

      // if event specified use it, else if no snack prop then use default.
      this.eventName = this.event || (this.snack === void 0 ? 'show-snackbar' : null);
      if (this.eventName) {
        this.eventSource.$on(this.eventName, this.show);
      }
      this.foundation.setDismissOnAction(this.dismissesOnAction);
    },
    beforeDestroy: function beforeDestroy() {
      if (this.eventSource) {
        this.eventSource.$off(this.eventName, this.show);
      }
      this.foundation.destroy();
    },

    methods: {
      onSnack: function onSnack(snack) {
        if (snack && snack.message) {
          this.foundation.show(snack);
          this.$emit('queued', snack);
        }
      },
      show: function show(data) {
        this.foundation.show(data);
      }
    }
  };

  var VueMDCSnackbar = BasePlugin({
    mdcSnackbar: mdcSnackbar
  });

  var mdcSwitch = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-switch-wrapper", class: { 'mdc-form-field': _vm.hasLabel, 'mdc-form-field--align-end': _vm.hasLabel && _vm.alignEnd } }, [_c('div', { staticClass: "mdc-switch", class: { 'mdc-switch--disabled': _vm.disabled } }, [_c('input', { ref: "control", staticClass: "mdc-switch__native-control", attrs: { "name": _vm.name, "id": _vm.vma_uid_, "disabled": _vm.disabled, "type": "checkbox" }, domProps: { "checked": _vm.checked }, on: { "change": _vm.onChanged } }), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _vm.hasLabel ? _c('label', { staticClass: "mdc-switch-label", attrs: { "for": _vm.vma_uid_ } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()]);
    }, staticRenderFns: [function () {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-switch__background" }, [_c('div', { staticClass: "mdc-switch__knob" })]);
    }],
    name: 'mdc-switch',
    mixins: [DispatchFocusMixin, VMAUniqueIdMixin],
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean,
      label: String,
      alignEnd: Boolean,
      disabled: Boolean,
      value: {
        type: String,
        default: function _default() {
          return 'on';
        }
      },
      name: String
    },
    computed: {
      hasLabel: function hasLabel() {
        return this.label || this.$slots.default;
      }
    },
    methods: {
      onChanged: function onChanged(event) {
        this.$emit('change', event.target.checked);
      }
    }
  };

  var VueMDCSwitch = BasePlugin({
    mdcSwitch: mdcSwitch
  });

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses$i = {
    ACTIVE: 'mdc-tab--active'
  };

  var strings$h = {
    SELECTED_EVENT: 'MDCTab:selected'
  };

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCTabFoundation = function (_MDCFoundation) {
    inherits(MDCTabFoundation, _MDCFoundation);
    createClass(MDCTabFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$i;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$h;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          getOffsetWidth: function getOffsetWidth() {
            return (/* number */0
            );
          },
          getOffsetLeft: function getOffsetLeft() {
            return (/* number */0
            );
          },
          notifySelected: function notifySelected() {}
        };
      }
    }]);

    function MDCTabFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, MDCTabFoundation);

      var _this = possibleConstructorReturn(this, (MDCTabFoundation.__proto__ || Object.getPrototypeOf(MDCTabFoundation)).call(this, _extends(MDCTabFoundation.defaultAdapter, adapter)));

      _this.computedWidth_ = 0;
      _this.computedLeft_ = 0;
      _this.isActive_ = false;
      _this.preventDefaultOnClick_ = false;

      _this.clickHandler_ = function (evt) {
        if (_this.preventDefaultOnClick_) {
          evt.preventDefault();
        }
        _this.adapter_.notifySelected();
      };

      _this.keydownHandler_ = function (evt) {
        if (evt.key && evt.key === 'Enter' || evt.keyCode === 13) {
          _this.adapter_.notifySelected();
        }
      };
      return _this;
    }

    createClass(MDCTabFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'getComputedWidth',
      value: function getComputedWidth() {
        return this.computedWidth_;
      }
    }, {
      key: 'getComputedLeft',
      value: function getComputedLeft() {
        return this.computedLeft_;
      }
    }, {
      key: 'isActive',
      value: function isActive() {
        return this.isActive_;
      }
    }, {
      key: 'setActive',
      value: function setActive(isActive) {
        this.isActive_ = isActive;
        if (this.isActive_) {
          this.adapter_.addClass(cssClasses$i.ACTIVE);
        } else {
          this.adapter_.removeClass(cssClasses$i.ACTIVE);
        }
      }
    }, {
      key: 'preventsDefaultOnClick',
      value: function preventsDefaultOnClick() {
        return this.preventDefaultOnClick_;
      }
    }, {
      key: 'setPreventDefaultOnClick',
      value: function setPreventDefaultOnClick(preventDefaultOnClick) {
        this.preventDefaultOnClick_ = preventDefaultOnClick;
      }
    }, {
      key: 'measureSelf',
      value: function measureSelf() {
        this.computedWidth_ = this.adapter_.getOffsetWidth();
        this.computedLeft_ = this.adapter_.getOffsetLeft();
      }
    }]);
    return MDCTabFoundation;
  }(MDCFoundation);

  var mdcTab = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-link', _vm._g({ staticClass: "mdc-tab", class: _vm.classes, style: _vm.styles, attrs: { "link": _vm.link } }, _vm.listeners), [!!_vm.hasIcon ? _c('i', { ref: "icon", staticClass: "mdc-tab__icon", class: _vm.hasIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("icon", [_vm._v(_vm._s(_vm.hasIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasText ? _c('span', { class: { 'mdc-tab__icon-text': !!_vm.hasIcon } }, [_vm._t("default")], 2) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-tab',
    mixins: [CustomLinkMixin, DispatchEventMixin],
    props: {
      active: Boolean,
      icon: [String, Array, Object]
    },
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },

    computed: {
      hasIcon: function hasIcon() {
        if (this.icon || this.$slots.icon) {
          return this.icon ? extractIconProp(this.icon) : {};
        }
        return false;
      },
      hasText: function hasText() {
        return !!this.$slots.default;
      }
    },
    watch: {
      active: function active(value) {
        if (value) {
          this.foundation.adapter_.notifySelected();
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCTabFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this.$el.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this.$el.removeEventListener(type, handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this.$el.offsetWidth;
        },
        getOffsetLeft: function getOffsetLeft() {
          return _this.$el.offsetLeft;
        },
        notifySelected: function notifySelected() {
          emitCustomEvent(_this.$el, MDCTabFoundation.strings.SELECTED_EVENT, { tab: _this }, true);
        }
      });
      this.foundation.init();
      this.setActive(this.active);
      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
      this.ripple.destroy();
    },

    methods: {
      getComputedWidth: function getComputedWidth() {
        return this.foundation.getComputedWidth();
      },
      getComputedLeft: function getComputedLeft() {
        return this.foundation.getComputedLeft();
      },
      isActive: function isActive() {
        return this.foundation.isActive();
      },
      setActive: function setActive(isActive) {
        this.foundation.setActive(isActive);
      },
      isDefaultPreventedOnClick: function isDefaultPreventedOnClick() {
        return this.foundation.preventsDefaultOnClick();
      },
      setPreventDefaultOnClick: function setPreventDefaultOnClick(preventDefaultOnClick) {
        this.foundation.setPreventDefaultOnClick(preventDefaultOnClick);
      },
      measureSelf: function measureSelf() {
        this.foundation.measureSelf();
      }
    }
  };

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses$j = {
    UPGRADED: 'mdc-tab-bar-upgraded'
  };

  var strings$i = {
    TAB_SELECTOR: '.mdc-tab',
    INDICATOR_SELECTOR: '.mdc-tab-bar__indicator',
    CHANGE_EVENT: 'MDCTabBar:change'
  };

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCTabBarFoundation = function (_MDCFoundation) {
    inherits(MDCTabBarFoundation, _MDCFoundation);
    createClass(MDCTabBarFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$j;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$i;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {},
          unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          getOffsetWidth: function getOffsetWidth() {
            return (/* number */0
            );
          },
          setStyleForIndicator: function setStyleForIndicator() /* propertyName: string, value: string */{},
          getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
            return (/* number */0
            );
          },
          notifyChange: function notifyChange() /* evtData: {activeTabIndex: number} */{},
          getNumberOfTabs: function getNumberOfTabs() {
            return (/* number */0
            );
          },
          isTabActiveAtIndex: function isTabActiveAtIndex() {
            return (/* index: number */ /* boolean */false
            );
          },
          setTabActiveAtIndex: function setTabActiveAtIndex() /* index: number, isActive: true */{},
          isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex() {
            return (/* index: number */ /* boolean */false
            );
          },
          setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex() /* index: number, preventDefaultOnClick: boolean */{},
          measureTabAtIndex: function measureTabAtIndex() /* index: number */{},
          getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex() {
            return (/* index: number */ /* number */0
            );
          },
          getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex() {
            return (/* index: number */ /* number */0
            );
          }
        };
      }
    }]);

    function MDCTabBarFoundation(adapter) {
      classCallCheck(this, MDCTabBarFoundation);

      var _this = possibleConstructorReturn(this, (MDCTabBarFoundation.__proto__ || Object.getPrototypeOf(MDCTabBarFoundation)).call(this, _extends(MDCTabBarFoundation.defaultAdapter, adapter)));

      _this.isIndicatorShown_ = false;
      _this.computedWidth_ = 0;
      _this.computedLeft_ = 0;
      _this.activeTabIndex_ = 0;
      _this.layoutFrame_ = 0;
      _this.resizeHandler_ = function () {
        return _this.layout();
      };
      return _this;
    }

    createClass(MDCTabBarFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.addClass(cssClasses$j.UPGRADED);
        this.adapter_.bindOnMDCTabSelectedEvent();
        this.adapter_.registerResizeHandler(this.resizeHandler_);
        var activeTabIndex = this.findActiveTabIndex_();
        if (activeTabIndex >= 0) {
          this.activeTabIndex_ = activeTabIndex;
        }
        this.layout();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.removeClass(cssClasses$j.UPGRADED);
        this.adapter_.unbindOnMDCTabSelectedEvent();
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }
    }, {
      key: 'layoutInternal_',
      value: function layoutInternal_() {
        var _this2 = this;

        this.forEachTabIndex_(function (index) {
          return _this2.adapter_.measureTabAtIndex(index);
        });
        this.computedWidth_ = this.adapter_.getOffsetWidth();
        this.layoutIndicator_();
      }
    }, {
      key: 'layoutIndicator_',
      value: function layoutIndicator_() {
        var isIndicatorFirstRender = !this.isIndicatorShown_;

        // Ensure that indicator appears in the right position immediately for correct first render.
        if (isIndicatorFirstRender) {
          this.adapter_.setStyleForIndicator('transition', 'none');
        }

        var translateAmtForActiveTabLeft = this.adapter_.getComputedLeftForTabAtIndex(this.activeTabIndex_);
        var scaleAmtForActiveTabWidth = this.adapter_.getComputedWidthForTabAtIndex(this.activeTabIndex_) / this.adapter_.getOffsetWidth();

        var transformValue = 'translateX(' + translateAmtForActiveTabLeft + 'px) scale(' + scaleAmtForActiveTabWidth + ', 1)';
        this.adapter_.setStyleForIndicator(getCorrectPropertyName(window, 'transform'), transformValue);

        if (isIndicatorFirstRender) {
          // Force layout so that transform styles to take effect.
          this.adapter_.getOffsetWidthForIndicator();
          this.adapter_.setStyleForIndicator('transition', '');
          this.adapter_.setStyleForIndicator('visibility', 'visible');
          this.isIndicatorShown_ = true;
        }
      }
    }, {
      key: 'findActiveTabIndex_',
      value: function findActiveTabIndex_() {
        var _this3 = this;

        var activeTabIndex = -1;
        this.forEachTabIndex_(function (index) {
          if (_this3.adapter_.isTabActiveAtIndex(index)) {
            activeTabIndex = index;
            return true;
          }
        });
        return activeTabIndex;
      }
    }, {
      key: 'forEachTabIndex_',
      value: function forEachTabIndex_(iterator) {
        var numTabs = this.adapter_.getNumberOfTabs();
        for (var index = 0; index < numTabs; index++) {
          var shouldBreak = iterator(index);
          if (shouldBreak) {
            break;
          }
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        var _this4 = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }

        this.layoutFrame_ = requestAnimationFrame(function () {
          _this4.layoutInternal_();
          _this4.layoutFrame_ = 0;
        });
      }
    }, {
      key: 'switchToTabAtIndex',
      value: function switchToTabAtIndex(index, shouldNotify) {
        var _this5 = this;

        if (index === this.activeTabIndex_) {
          return;
        }

        if (index < 0 || index >= this.adapter_.getNumberOfTabs()) {
          throw new Error('Out of bounds index specified for tab: ' + index);
        }

        var prevActiveTabIndex = this.activeTabIndex_;
        this.activeTabIndex_ = index;
        requestAnimationFrame(function () {
          if (prevActiveTabIndex >= 0) {
            _this5.adapter_.setTabActiveAtIndex(prevActiveTabIndex, false);
          }
          _this5.adapter_.setTabActiveAtIndex(_this5.activeTabIndex_, true);
          _this5.layoutIndicator_();
          if (shouldNotify) {
            _this5.adapter_.notifyChange({ activeTabIndex: _this5.activeTabIndex_ });
          }
        });
      }
    }, {
      key: 'getActiveTabIndex',
      value: function getActiveTabIndex() {
        return this.findActiveTabIndex_();
      }
    }]);
    return MDCTabBarFoundation;
  }(MDCFoundation);

  var mdcTabBar = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', _vm._g({ staticClass: "mdc-tab-bar", class: _vm.classes }, _vm.$listeners), [_vm._t("default"), _vm._v(" "), _c('span', { ref: "indicator", staticClass: "mdc-tab-bar__indicator", style: _vm.indicatorStyles })], 2);
    }, staticRenderFns: [],
    name: 'mdc-tab-bar',
    data: function data() {
      return {
        classes: {},
        indicatorStyles: {},
        tabs: []
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCTabBarFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {
          _this.$el.addEventListener(MDCTabFoundation.strings.SELECTED_EVENT, _this.onSelect);
        },
        unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {
          return _this.$el.removeEventListener(MDCTabFoundation.strings.SELECTED_EVENT, _this.onSelect);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this.$el.offsetWidth;
        },
        setStyleForIndicator: function setStyleForIndicator(propertyName, value) {
          return _this.$set(_this.indicatorStyles, propertyName, value);
        },
        getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
          return _this.$refs.indicator.offsetWidth;
        },
        notifyChange: function notifyChange(evtData) {
          _this.$emit('change', evtData.activeTabIndex);
        },
        getNumberOfTabs: function getNumberOfTabs() {
          return _this.tabs.length;
        },
        isTabActiveAtIndex: function isTabActiveAtIndex(index) {
          return _this.tabs[index].isActive();
        },
        setTabActiveAtIndex: function setTabActiveAtIndex(index, isActive) {
          // pgbr: 2018-04-07
          // since it is possible to change the number of tabs programatically
          // we need to detect the foundation deactivating a tab
          // that no longer exists but was previously active.
          if (!isActive && index >= _this.tabs.length) {
            return;
          }
          _this.tabs[index].setActive(isActive);
        },
        isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex(index) {
          return _this.tabs[index].isDefaultPreventedOnClick();
        },
        setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex(index, preventDefaultOnClick) {
          _this.tabs[index].setPreventDefaultOnClick(preventDefaultOnClick);
        },
        measureTabAtIndex: function measureTabAtIndex(index) {
          return _this.tabs[index].measureSelf();
        },
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex(index) {
          return _this.tabs[index].getComputedWidth();
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex(index) {
          return _this.tabs[index].getComputedLeft();
        }
      });

      var resetTabs = function resetTabs() {
        var tabElements = [].slice.call(_this.$el.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR));
        _this.tabs = tabElements.map(function (el) {
          return el.__vue__;
        });

        var hasText = void 0,
            hasIcon = void 0;
        var tabs = _this.tabs;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tab = _step.value;

            if (tab.hasText) {
              hasText = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = tabs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _tab = _step2.value;

            if (_tab.hasIcon) {
              hasIcon = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (hasText && hasIcon) {
          _this.$set(_this.classes, 'mdc-tab-bar--icons-with-text', true);
        } else if (hasIcon) {
          _this.$set(_this.classes, 'mdc-tab-bar--icon-tab-bar', true);
        }

        if (_this.foundation) {
          var activeTabIndex = _this.foundation.getActiveTabIndex();
          if (activeTabIndex >= 0) {
            _this.foundation.switchToTabAtIndex(activeTabIndex, true);
          } else {
            _this.foundation.switchToTabAtIndex(0, true);
          }
          _this.foundation.layout();
        }
      };

      resetTabs();

      this.slotObserver = new MutationObserver(function () {
        return resetTabs();
      });
      this.slotObserver.observe(this.$el, { childList: true, subtree: true });

      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.slotObserver.disconnect();
      this.foundation.destroy();
    },

    methods: {
      onSelect: function onSelect(_ref) {
        var detail = _ref.detail;
        var tab = detail.tab;

        var index = this.tabs.indexOf(tab);
        if (index < 0) {
          throw new Error('mdc-tab-bar internal error: index not found');
        }
        this.foundation.switchToTabAtIndex(index, true);
      }
    }
  };

  var VueMDCTabs = BasePlugin({
    mdcTab: mdcTab,
    mdcTabBar: mdcTabBar
  });

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Text Field Helper Text.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the TextField helper text into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCTextFieldHelperTextAdapter = function () {
    function MDCTextFieldHelperTextAdapter() {
      classCallCheck(this, MDCTextFieldHelperTextAdapter);
    }

    createClass(MDCTextFieldHelperTextAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the helper text element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the helper text element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns whether or not the helper text element contains the given class.
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "hasClass",
      value: function hasClass(className) {}

      /**
       * Sets an attribute with a given value on the helper text element.
       * @param {string} attr
       * @param {string} value
       */

    }, {
      key: "setAttr",
      value: function setAttr(attr, value) {}

      /**
       * Removes an attribute from the helper text element.
       * @param {string} attr
       */

    }, {
      key: "removeAttr",
      value: function removeAttr(attr) {}

      /**
       * Sets the text content for the helper text element.
       * @param {string} content
       */

    }, {
      key: "setContent",
      value: function setContent(content) {}
    }]);
    return MDCTextFieldHelperTextAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var strings$j = {
    ARIA_HIDDEN: 'aria-hidden',
    ROLE: 'role'
  };

  /** @enum {string} */
  var cssClasses$k = {
    HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
    HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg'
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
   * @final
   */

  var MDCTextFieldHelperTextFoundation = function (_MDCFoundation) {
    inherits(MDCTextFieldHelperTextFoundation, _MDCFoundation);
    createClass(MDCTextFieldHelperTextFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$k;
      }

      /** @return enum {string} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$j;
      }

      /**
       * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCTextFieldHelperTextAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCTextFieldHelperTextAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            hasClass: function hasClass() {},
            setAttr: function setAttr() {},
            removeAttr: function removeAttr() {},
            setContent: function setContent() {}
          }
        );
      }

      /**
       * @param {!MDCTextFieldHelperTextAdapter} adapter
       */

    }]);

    function MDCTextFieldHelperTextFoundation(adapter) {
      classCallCheck(this, MDCTextFieldHelperTextFoundation);
      return possibleConstructorReturn(this, (MDCTextFieldHelperTextFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldHelperTextFoundation)).call(this, _extends(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)));
    }

    /**
     * Sets the content of the helper text field.
     * @param {string} content
     */


    createClass(MDCTextFieldHelperTextFoundation, [{
      key: 'setContent',
      value: function setContent(content) {
        this.adapter_.setContent(content);
      }

      /** @param {boolean} isPersistent Sets the persistency of the helper text. */

    }, {
      key: 'setPersistent',
      value: function setPersistent(isPersistent) {
        if (isPersistent) {
          this.adapter_.addClass(cssClasses$k.HELPER_TEXT_PERSISTENT);
        } else {
          this.adapter_.removeClass(cssClasses$k.HELPER_TEXT_PERSISTENT);
        }
      }

      /**
       * @param {boolean} isValidation True to make the helper text act as an
       *   error validation message.
       */

    }, {
      key: 'setValidation',
      value: function setValidation(isValidation) {
        if (isValidation) {
          this.adapter_.addClass(cssClasses$k.HELPER_TEXT_VALIDATION_MSG);
        } else {
          this.adapter_.removeClass(cssClasses$k.HELPER_TEXT_VALIDATION_MSG);
        }
      }

      /** Makes the helper text visible to the screen reader. */

    }, {
      key: 'showToScreenReader',
      value: function showToScreenReader() {
        this.adapter_.removeAttr(strings$j.ARIA_HIDDEN);
      }

      /**
       * Sets the validity of the helper text based on the input validity.
       * @param {boolean} inputIsValid
       */

    }, {
      key: 'setValidity',
      value: function setValidity(inputIsValid) {
        var helperTextIsPersistent = this.adapter_.hasClass(cssClasses$k.HELPER_TEXT_PERSISTENT);
        var helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses$k.HELPER_TEXT_VALIDATION_MSG);
        var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

        if (validationMsgNeedsDisplay) {
          this.adapter_.setAttr(strings$j.ROLE, 'alert');
        } else {
          this.adapter_.removeAttr(strings$j.ROLE);
        }

        if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
          this.hide_();
        }
      }

      /**
       * Hides the help text from screen readers.
       * @private
       */

    }, {
      key: 'hide_',
      value: function hide_() {
        this.adapter_.setAttr(strings$j.ARIA_HIDDEN, 'true');
      }
    }]);
    return MDCTextFieldHelperTextFoundation;
  }(MDCFoundation);

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Text Field Icon.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the text field icon into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCTextFieldIconAdapter = function () {
    function MDCTextFieldIconAdapter() {
      classCallCheck(this, MDCTextFieldIconAdapter);
    }

    createClass(MDCTextFieldIconAdapter, [{
      key: "getAttr",

      /**
       * Gets the value of an attribute on the icon element.
       * @param {string} attr
       * @return {string}
       */
      value: function getAttr(attr) {}

      /**
       * Sets an attribute on the icon element.
       * @param {string} attr
       * @param {string} value
       */

    }, {
      key: "setAttr",
      value: function setAttr(attr, value) {}

      /**
       * Removes an attribute from the icon element.
       * @param {string} attr
       */

    }, {
      key: "removeAttr",
      value: function removeAttr(attr) {}

      /**
       * Sets the text content of the icon element.
       * @param {string} content
       */

    }, {
      key: "setContent",
      value: function setContent(content) {}

      /**
       * Registers an event listener on the icon element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the icon element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}

      /**
       * Emits a custom event "MDCTextField:icon" denoting a user has clicked the icon.
       */

    }, {
      key: "notifyIconAction",
      value: function notifyIconAction() {}
    }]);
    return MDCTextFieldIconAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var strings$k = {
    ICON_EVENT: 'MDCTextField:icon',
    ICON_ROLE: 'button'
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
   * @final
   */

  var MDCTextFieldIconFoundation = function (_MDCFoundation) {
    inherits(MDCTextFieldIconFoundation, _MDCFoundation);
    createClass(MDCTextFieldIconFoundation, null, [{
      key: 'strings',

      /** @return enum {string} */
      get: function get$$1() {
        return strings$k;
      }

      /**
       * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCTextFieldIconAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCTextFieldIconAdapter} */{
            getAttr: function getAttr() {},
            setAttr: function setAttr() {},
            removeAttr: function removeAttr() {},
            setContent: function setContent() {},
            registerInteractionHandler: function registerInteractionHandler() {},
            deregisterInteractionHandler: function deregisterInteractionHandler() {},
            notifyIconAction: function notifyIconAction() {}
          }
        );
      }

      /**
       * @param {!MDCTextFieldIconAdapter} adapter
       */

    }]);

    function MDCTextFieldIconFoundation(adapter) {
      classCallCheck(this, MDCTextFieldIconFoundation);

      /** @private {string?} */
      var _this = possibleConstructorReturn(this, (MDCTextFieldIconFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldIconFoundation)).call(this, _extends(MDCTextFieldIconFoundation.defaultAdapter, adapter)));

      _this.savedTabIndex_ = null;

      /** @private {function(!Event): undefined} */
      _this.interactionHandler_ = function (evt) {
        return _this.handleInteraction(evt);
      };
      return _this;
    }

    createClass(MDCTextFieldIconFoundation, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        this.savedTabIndex_ = this.adapter_.getAttr('tabindex');

        ['click', 'keydown'].forEach(function (evtType) {
          _this2.adapter_.registerInteractionHandler(evtType, _this2.interactionHandler_);
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        ['click', 'keydown'].forEach(function (evtType) {
          _this3.adapter_.deregisterInteractionHandler(evtType, _this3.interactionHandler_);
        });
      }

      /** @param {boolean} disabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        if (!this.savedTabIndex_) {
          return;
        }

        if (disabled) {
          this.adapter_.setAttr('tabindex', '-1');
          this.adapter_.removeAttr('role');
        } else {
          this.adapter_.setAttr('tabindex', this.savedTabIndex_);
          this.adapter_.setAttr('role', strings$k.ICON_ROLE);
        }
      }

      /** @param {string} label */

    }, {
      key: 'setAriaLabel',
      value: function setAriaLabel(label) {
        this.adapter_.setAttr('aria-label', label);
      }

      /** @param {string} content */

    }, {
      key: 'setContent',
      value: function setContent(content) {
        this.adapter_.setContent(content);
      }

      /**
       * Handles an interaction event
       * @param {!Event} evt
       */

    }, {
      key: 'handleInteraction',
      value: function handleInteraction(evt) {
        if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
          this.adapter_.notifyIconAction();
        }
      }
    }]);
    return MDCTextFieldIconFoundation;
  }(MDCFoundation);

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Adapter for MDC Text Field.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Text Field into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */

  var MDCTextFieldAdapter = function () {
    function MDCTextFieldAdapter() {
      classCallCheck(this, MDCTextFieldAdapter);
    }

    createClass(MDCTextFieldAdapter, [{
      key: 'addClass',

      /**
       * Adds a class to the root Element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the root Element.
       * @param {string} className
       */

    }, {
      key: 'removeClass',
      value: function removeClass(className) {}

      /**
       * Returns true if the root element contains the given class name.
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: 'hasClass',
      value: function hasClass(className) {}

      /**
       * Registers an event handler on the root element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: 'registerTextFieldInteractionHandler',
      value: function registerTextFieldInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the root element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: 'deregisterTextFieldInteractionHandler',
      value: function deregisterTextFieldInteractionHandler(type, handler) {}

      /**
       * Registers an event listener on the native input element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: 'registerInputInteractionHandler',
      value: function registerInputInteractionHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the native input element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: 'deregisterInputInteractionHandler',
      value: function deregisterInputInteractionHandler(evtType, handler) {}

      /**
       * Registers a validation attribute change listener on the input element.
       * Handler accepts list of attribute names.
       * @param {function(!Array<string>): undefined} handler
       * @return {!MutationObserver}
       */

    }, {
      key: 'registerValidationAttributeChangeHandler',
      value: function registerValidationAttributeChangeHandler(handler) {}

      /**
       * Disconnects a validation attribute observer on the input element.
       * @param {!MutationObserver} observer
       */

    }, {
      key: 'deregisterValidationAttributeChangeHandler',
      value: function deregisterValidationAttributeChangeHandler(observer) {}

      /**
       * Returns an object representing the native text input element, with a
       * similar API shape. The object returned should include the value, disabled
       * and badInput properties, as well as the checkValidity() function. We never
       * alter the value within our code, however we do update the disabled
       * property, so if you choose to duck-type the return value for this method
       * in your implementation it's important to keep this in mind. Also note that
       * this method can return null, which the foundation will handle gracefully.
       * @return {?Element|?NativeInputType}
       */

    }, {
      key: 'getNativeInput',
      value: function getNativeInput() {}

      /**
       * Returns true if the textfield is focused.
       * We achieve this via `document.activeElement === this.root_`.
       * @return {boolean}
       */

    }, {
      key: 'isFocused',
      value: function isFocused() {}

      /**
       * Returns true if the direction of the root element is set to RTL.
       * @return {boolean}
       */

    }, {
      key: 'isRtl',
      value: function isRtl() {}

      /**
       * Activates the line ripple.
       */

    }, {
      key: 'activateLineRipple',
      value: function activateLineRipple() {}

      /**
       * Deactivates the line ripple.
       */

    }, {
      key: 'deactivateLineRipple',
      value: function deactivateLineRipple() {}

      /**
       * Sets the transform origin of the line ripple.
       * @param {number} normalizedX
       */

    }, {
      key: 'setLineRippleTransformOrigin',
      value: function setLineRippleTransformOrigin(normalizedX) {}

      /**
       * Only implement if label exists.
       * Shakes label if shouldShake is true.
       * @param {boolean} shouldShake
       */

    }, {
      key: 'shakeLabel',
      value: function shakeLabel(shouldShake) {}

      /**
       * Only implement if label exists.
       * Floats the label above the input element if shouldFloat is true.
       * @param {boolean} shouldFloat
       */

    }, {
      key: 'floatLabel',
      value: function floatLabel(shouldFloat) {}

      /**
       * Returns true if label element exists, false if it doesn't.
       * @return {boolean}
       */

    }, {
      key: 'hasLabel',
      value: function hasLabel() {}

      /**
       * Only implement if label exists.
       * Returns width of label in pixels.
       * @return {number}
       */

    }, {
      key: 'getLabelWidth',
      value: function getLabelWidth() {}

      /**
       * Returns true if outline element exists, false if it doesn't.
       * @return {boolean}
       */

    }, {
      key: 'hasOutline',
      value: function hasOutline() {}

      /**
       * Only implement if outline element exists.
       * Updates SVG Path and outline element based on the
       * label element width and RTL context.
       * @param {number} labelWidth
       * @param {boolean=} isRtl
       */

    }, {
      key: 'notchOutline',
      value: function notchOutline(labelWidth, isRtl) {}

      /**
       * Only implement if outline element exists.
       * Closes notch in outline element.
       */

    }, {
      key: 'closeOutline',
      value: function closeOutline() {}
    }]);
    return MDCTextFieldAdapter;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var strings$l = {
    ARIA_CONTROLS: 'aria-controls',
    INPUT_SELECTOR: '.mdc-text-field__input',
    LABEL_SELECTOR: '.mdc-floating-label',
    ICON_SELECTOR: '.mdc-text-field__icon',
    OUTLINE_SELECTOR: '.mdc-notched-outline',
    LINE_RIPPLE_SELECTOR: '.mdc-line-ripple'
  };

  /** @enum {string} */
  var cssClasses$l = {
    ROOT: 'mdc-text-field',
    UPGRADED: 'mdc-text-field--upgraded',
    DISABLED: 'mdc-text-field--disabled',
    DENSE: 'mdc-text-field--dense',
    FOCUSED: 'mdc-text-field--focused',
    INVALID: 'mdc-text-field--invalid',
    BOX: 'mdc-text-field--box',
    OUTLINED: 'mdc-text-field--outlined'
  };

  /** @enum {number} */
  var numbers$6 = {
    LABEL_SCALE: 0.75,
    DENSE_LABEL_SCALE: 0.923
  };

  // whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
  // under section: `Validation-related attributes`
  var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCTextFieldAdapter>}
   * @final
   */

  var MDCTextFieldFoundation = function (_MDCFoundation) {
    inherits(MDCTextFieldFoundation, _MDCFoundation);
    createClass(MDCTextFieldFoundation, [{
      key: 'shouldShake',


      /** @return {boolean} */
      get: function get$$1() {
        return !this.isValid() && !this.isFocused_;
      }

      /** @return {boolean} */

    }, {
      key: 'shouldFloat',
      get: function get$$1() {
        return this.isFocused_ || !!this.getValue() || this.isBadInput_();
      }

      /**
       * {@see MDCTextFieldAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCTextFieldAdapter}
       */

    }], [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$l;
      }

      /** @return enum {string} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$l;
      }

      /** @return enum {string} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers$6;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCTextFieldAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            hasClass: function hasClass() {},
            registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler() {},
            deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler() {},
            registerInputInteractionHandler: function registerInputInteractionHandler() {},
            deregisterInputInteractionHandler: function deregisterInputInteractionHandler() {},
            registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler() {},
            deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler() {},
            getNativeInput: function getNativeInput() {},
            isFocused: function isFocused() {},
            isRtl: function isRtl() {},
            activateLineRipple: function activateLineRipple() {},
            deactivateLineRipple: function deactivateLineRipple() {},
            setLineRippleTransformOrigin: function setLineRippleTransformOrigin() {},
            shakeLabel: function shakeLabel() {},
            floatLabel: function floatLabel() {},
            hasLabel: function hasLabel() {},
            getLabelWidth: function getLabelWidth() {},
            hasOutline: function hasOutline() {},
            notchOutline: function notchOutline() {},
            closeOutline: function closeOutline() {}
          }
        );
      }

      /**
       * @param {!MDCTextFieldAdapter} adapter
       * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
       */

    }]);

    function MDCTextFieldFoundation(adapter) {
      var foundationMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /** @type {!FoundationMapType} */{};
      classCallCheck(this, MDCTextFieldFoundation);

      /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
      var _this = possibleConstructorReturn(this, (MDCTextFieldFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldFoundation)).call(this, _extends(MDCTextFieldFoundation.defaultAdapter, adapter)));

      _this.helperText_ = foundationMap.helperText;
      /** @type {!MDCTextFieldIconFoundation|undefined} */
      _this.icon_ = foundationMap.icon;

      /** @private {boolean} */
      _this.isFocused_ = false;
      /** @private {boolean} */
      _this.receivedUserInput_ = false;
      /** @private {boolean} */
      _this.useCustomValidityChecking_ = false;
      /** @private {boolean} */
      _this.isValid_ = true;
      /** @private {function(): undefined} */
      _this.inputFocusHandler_ = function () {
        return _this.activateFocus();
      };
      /** @private {function(): undefined} */
      _this.inputBlurHandler_ = function () {
        return _this.deactivateFocus();
      };
      /** @private {function(): undefined} */
      _this.inputInputHandler_ = function () {
        return _this.autoCompleteFocus();
      };
      /** @private {function(!Event): undefined} */
      _this.setPointerXOffset_ = function (evt) {
        return _this.setTransformOrigin(evt);
      };
      /** @private {function(!Event): undefined} */
      _this.textFieldInteractionHandler_ = function () {
        return _this.handleTextFieldInteraction();
      };
      /** @private {function(!Array): undefined} */
      _this.validationAttributeChangeHandler_ = function (attributesList) {
        return _this.handleValidationAttributeChange(attributesList);
      };

      /** @private {!MutationObserver} */
      _this.validationObserver_;
      return _this;
    }

    createClass(MDCTextFieldFoundation, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
        // Ensure label does not collide with any pre-filled value.
        if (this.adapter_.hasLabel() && (this.getValue() || this.isBadInput_())) {
          this.adapter_.floatLabel(this.shouldFloat);
          this.notchOutline(this.shouldFloat);
        }

        if (this.adapter_.isFocused()) {
          this.inputFocusHandler_();
        }

        this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
        this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
        this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
        ['mousedown', 'touchstart'].forEach(function (evtType) {
          _this2.adapter_.registerInputInteractionHandler(evtType, _this2.setPointerXOffset_);
        });
        ['click', 'keydown'].forEach(function (evtType) {
          _this2.adapter_.registerTextFieldInteractionHandler(evtType, _this2.textFieldInteractionHandler_);
        });
        this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
        this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
        this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
        this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
        ['mousedown', 'touchstart'].forEach(function (evtType) {
          _this3.adapter_.deregisterInputInteractionHandler(evtType, _this3.setPointerXOffset_);
        });
        ['click', 'keydown'].forEach(function (evtType) {
          _this3.adapter_.deregisterTextFieldInteractionHandler(evtType, _this3.textFieldInteractionHandler_);
        });
        this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
      }

      /**
       * Handles user interactions with the Text Field.
       */

    }, {
      key: 'handleTextFieldInteraction',
      value: function handleTextFieldInteraction() {
        if (this.adapter_.getNativeInput().disabled) {
          return;
        }
        this.receivedUserInput_ = true;
      }

      /**
       * Handles validation attribute changes
       * @param {!Array<string>} attributesList
       */

    }, {
      key: 'handleValidationAttributeChange',
      value: function handleValidationAttributeChange(attributesList) {
        var _this4 = this;

        attributesList.some(function (attributeName) {
          if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
            _this4.styleValidity_(true);
            return true;
          }
        });
      }

      /**
       * Opens/closes the notched outline.
       * @param {boolean} openNotch
       */

    }, {
      key: 'notchOutline',
      value: function notchOutline(openNotch) {
        if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
          return;
        }

        if (openNotch) {
          var isDense = this.adapter_.hasClass(cssClasses$l.DENSE);
          var labelScale = isDense ? numbers$6.DENSE_LABEL_SCALE : numbers$6.LABEL_SCALE;
          var labelWidth = this.adapter_.getLabelWidth() * labelScale;
          var isRtl = this.adapter_.isRtl();
          this.adapter_.notchOutline(labelWidth, isRtl);
        } else {
          this.adapter_.closeOutline();
        }
      }

      /**
       * Activates the text field focus state.
       */

    }, {
      key: 'activateFocus',
      value: function activateFocus() {
        this.isFocused_ = true;
        this.styleFocused_(this.isFocused_);
        this.adapter_.activateLineRipple();
        this.notchOutline(this.shouldFloat);
        if (this.adapter_.hasLabel()) {
          this.adapter_.shakeLabel(this.shouldShake);
          this.adapter_.floatLabel(this.shouldFloat);
        }
        if (this.helperText_) {
          this.helperText_.showToScreenReader();
        }
      }

      /**
       * Sets the line ripple's transform origin, so that the line ripple activate
       * animation will animate out from the user's click location.
       * @param {!Event} evt
       */

    }, {
      key: 'setTransformOrigin',
      value: function setTransformOrigin(evt) {
        var targetClientRect = evt.target.getBoundingClientRect();
        var evtCoords = { x: evt.clientX, y: evt.clientY };
        var normalizedX = evtCoords.x - targetClientRect.left;
        this.adapter_.setLineRippleTransformOrigin(normalizedX);
      }

      /**
       * Activates the Text Field's focus state in cases when the input value
       * changes without user input (e.g. programatically).
       */

    }, {
      key: 'autoCompleteFocus',
      value: function autoCompleteFocus() {
        if (!this.receivedUserInput_) {
          this.activateFocus();
        }
      }

      /**
       * Deactivates the Text Field's focus state.
       */

    }, {
      key: 'deactivateFocus',
      value: function deactivateFocus() {
        this.isFocused_ = false;
        this.adapter_.deactivateLineRipple();
        var input = this.getNativeInput_();
        var shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
        var isValid = this.isValid();
        this.styleValidity_(isValid);
        this.styleFocused_(this.isFocused_);
        if (this.adapter_.hasLabel()) {
          this.adapter_.shakeLabel(this.shouldShake);
          this.adapter_.floatLabel(this.shouldFloat);
          this.notchOutline(this.shouldFloat);
        }
        if (shouldRemoveLabelFloat) {
          this.receivedUserInput_ = false;
        }
      }

      /**
       * @return {string} The value of the input Element.
       */

    }, {
      key: 'getValue',
      value: function getValue() {
        return this.getNativeInput_().value;
      }

      /**
       * @param {string} value The value to set on the input Element.
       */

    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.getNativeInput_().value = value;
        var isValid = this.isValid();
        this.styleValidity_(isValid);
        if (this.adapter_.hasLabel()) {
          this.adapter_.shakeLabel(this.shouldShake);
          this.adapter_.floatLabel(this.shouldFloat);
          this.notchOutline(this.shouldFloat);
        }
      }

      /**
       * @return {boolean} If a custom validity is set, returns that value.
       *     Otherwise, returns the result of native validity checks.
       */

    }, {
      key: 'isValid',
      value: function isValid() {
        return this.useCustomValidityChecking_ ? this.isValid_ : this.isNativeInputValid_();
      }

      /**
       * @param {boolean} isValid Sets the validity state of the Text Field.
       */

    }, {
      key: 'setValid',
      value: function setValid(isValid) {
        this.useCustomValidityChecking_ = true;
        this.isValid_ = isValid;
        // Retrieve from the getter to ensure correct logic is applied.
        isValid = this.isValid();
        this.styleValidity_(isValid);
        if (this.adapter_.hasLabel()) {
          this.adapter_.shakeLabel(this.shouldShake);
        }
      }

      /**
       * @return {boolean} True if the Text Field is disabled.
       */

    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.getNativeInput_().disabled;
      }

      /**
       * @param {boolean} disabled Sets the text-field disabled or enabled.
       */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.getNativeInput_().disabled = disabled;
        this.styleDisabled_(disabled);
      }

      /**
       * @param {string} content Sets the content of the helper text.
       */

    }, {
      key: 'setHelperTextContent',
      value: function setHelperTextContent(content) {
        if (this.helperText_) {
          this.helperText_.setContent(content);
        }
      }

      /**
       * Sets the aria label of the icon.
       * @param {string} label
       */

    }, {
      key: 'setIconAriaLabel',
      value: function setIconAriaLabel(label) {
        if (this.icon_) {
          this.icon_.setAriaLabel(label);
        }
      }

      /**
       * Sets the text content of the icon.
       * @param {string} content
       */

    }, {
      key: 'setIconContent',
      value: function setIconContent(content) {
        if (this.icon_) {
          this.icon_.setContent(content);
        }
      }

      /**
       * @return {boolean} True if the Text Field input fails in converting the
       *     user-supplied value.
       * @private
       */

    }, {
      key: 'isBadInput_',
      value: function isBadInput_() {
        return this.getNativeInput_().validity.badInput;
      }

      /**
       * @return {boolean} The result of native validity checking
       *     (ValidityState.valid).
       */

    }, {
      key: 'isNativeInputValid_',
      value: function isNativeInputValid_() {
        return this.getNativeInput_().validity.valid;
      }

      /**
       * Styles the component based on the validity state.
       * @param {boolean} isValid
       * @private
       */

    }, {
      key: 'styleValidity_',
      value: function styleValidity_(isValid) {
        var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

        if (isValid) {
          this.adapter_.removeClass(INVALID);
        } else {
          this.adapter_.addClass(INVALID);
        }
        if (this.helperText_) {
          this.helperText_.setValidity(isValid);
        }
      }

      /**
       * Styles the component based on the focused state.
       * @param {boolean} isFocused
       * @private
       */

    }, {
      key: 'styleFocused_',
      value: function styleFocused_(isFocused) {
        var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

        if (isFocused) {
          this.adapter_.addClass(FOCUSED);
        } else {
          this.adapter_.removeClass(FOCUSED);
        }
      }

      /**
       * Styles the component based on the disabled state.
       * @param {boolean} isDisabled
       * @private
       */

    }, {
      key: 'styleDisabled_',
      value: function styleDisabled_(isDisabled) {
        var _MDCTextFieldFoundati = MDCTextFieldFoundation.cssClasses,
            DISABLED = _MDCTextFieldFoundati.DISABLED,
            INVALID = _MDCTextFieldFoundati.INVALID;

        if (isDisabled) {
          this.adapter_.addClass(DISABLED);
          this.adapter_.removeClass(INVALID);
        } else {
          this.adapter_.removeClass(DISABLED);
        }
        if (this.icon_) {
          this.icon_.setDisabled(isDisabled);
        }
      }

      /**
       * @return {!Element|!NativeInputType} The native text input from the
       * host environment, or a dummy if none exists.
       * @private
       */

    }, {
      key: 'getNativeInput_',
      value: function getNativeInput_() {
        return this.adapter_.getNativeInput() ||
        /** @type {!NativeInputType} */{
          value: '',
          disabled: false,
          validity: {
            badInput: false,
            valid: true
          }
        };
      }
    }]);
    return MDCTextFieldFoundation;
  }(MDCFoundation);

  var mdcTextField = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-textfield-wrapper", style: { width: _vm.fullwidth ? '100%' : undefined }, attrs: { "id": _vm.id } }, [_c('div', { ref: "root", class: _vm.rootClasses }, [!!_vm.hasLeadingIcon ? _c('i', { ref: "icon", staticClass: "mdc-text-field__icon", class: _vm.hasLeadingIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("leading-icon", [_vm._v(_vm._s(_vm.hasLeadingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.multiline ? _c('textarea', _vm._g(_vm._b({ ref: "input", class: _vm.inputClasses, attrs: { "id": _vm.vma_uid_, "minlength": _vm.minlength, "maxlength": _vm.maxlength, "placeholder": _vm.inputPlaceHolder, "aria-label": _vm.inputPlaceHolder, "aria-controls": _vm.inputAriaControls, "rows": _vm.rows, "cols": _vm.cols }, on: { "input": function input($event) {
            _vm.updateValue($event.target.value);
          } } }, 'textarea', _vm.$attrs, false), _vm.$listeners)) : _c('input', _vm._g(_vm._b({ ref: "input", class: _vm.inputClasses, attrs: { "id": _vm.vma_uid_, "type": _vm.type, "minlength": _vm.minlength, "maxlength": _vm.maxlength, "placeholder": _vm.inputPlaceHolder, "aria-label": _vm.inputPlaceHolder, "aria-controls": _vm.inputAriaControls }, on: { "input": function input($event) {
            _vm.updateValue($event.target.value);
          } } }, 'input', _vm.$attrs, false), _vm.$listeners)), _vm._v(" "), _vm.hasLabel ? _c('label', { ref: "label", class: _vm.labelClassesUpgraded, attrs: { "for": _vm.vma_uid_ } }, [_vm._v(" " + _vm._s(_vm.label) + " ")]) : _vm._e(), _vm._v(" "), !!_vm.hasTrailingIcon ? _c('i', { ref: "icon", staticClass: "mdc-text-field__icon", class: _vm.hasTrailingIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("trailing-icon", [_vm._v(_vm._s(_vm.hasTrailingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c('div', { ref: "outline", staticClass: "mdc-notched-outline", class: _vm.outlineClasses }, [_c('svg', [_c('path', { staticClass: "mdc-notched-outline__path", attrs: { "d": _vm.outlinePathAttr } })])]) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c('div', { ref: "outlineIdle", staticClass: "mdc-notched-outline__idle" }) : _vm._e(), _vm._v(" "), _vm.hasLineRipple ? _c('div', { ref: "lineRipple", class: _vm.lineRippleClasses, style: _vm.lineRippleStyles }) : _vm._e()]), _vm._v(" "), _vm.helptext ? _c('p', { ref: "help", class: _vm.helpClasses, attrs: { "id": 'help-' + _vm.vma_uid_, "aria-hidden": "true" } }, [_vm._v(" " + _vm._s(_vm.helptext) + " ")]) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-textfield',
    mixins: [CustomElementMixin, DispatchFocusMixin, VMAUniqueIdMixin],
    inheritAttrs: false,
    model: {
      prop: 'value',
      event: 'model'
    },
    props: {
      value: String,
      type: {
        type: String,
        default: 'text',
        validator: function validator(value) {
          return ['text', 'email', 'search', 'password', 'tel', 'url', 'number'].indexOf(value) !== -1;
        }
      },
      dense: Boolean,
      label: String,
      helptext: String,
      helptextPersistent: Boolean,
      helptextValidation: Boolean,
      box: Boolean,
      outline: Boolean,
      disabled: Boolean,
      required: Boolean,
      valid: { type: Boolean, default: undefined },
      fullwidth: Boolean,
      multiline: Boolean,
      leadingIcon: [String, Array, Object],
      trailingIcon: [String, Array, Object],
      size: { type: [Number, String], default: 20 },
      minlength: { type: [Number, String], default: undefined },
      maxlength: { type: [Number, String], default: undefined },
      rows: { type: [Number, String], default: 8 },
      cols: { type: [Number, String], default: 40 },
      id: { type: String }
    },
    data: function data() {
      return {
        text: this.value,
        rootClasses: {
          'mdc-textfield': true,
          'mdc-text-field': true,
          'mdc-text-field--upgraded': true,
          'mdc-text-field--disabled': this.disabled,
          'mdc-text-field--dense': this.dense,
          'mdc-text-field--fullwidth': this.fullwidth,
          'mdc-text-field--textarea': this.multiline,
          'mdc-text-field--box': !this.fullwidth && this.box,
          'mdc-text-field--outlined': !this.fullwidth && this.outline
        },
        inputClasses: {
          'mdc-text-field__input': true
        },
        labelClasses: {
          'mdc-floating-label': true
        },
        lineRippleClasses: {
          'mdc-line-ripple': true
        },
        lineRippleStyles: {},
        helpClasses: {
          'mdc-text-field-helper-text': true,
          'mdc-text-field-helper-text--persistent': this.helptextPersistent,
          'mdc-text-field-helper-text--validation-msg': this.helptextValidation
        },
        outlineClasses: {},
        outlinePathAttr: undefined
      };
    },
    computed: {
      inputPlaceHolder: function inputPlaceHolder() {
        return this.fullwidth ? this.label : undefined;
      },
      inputAriaControls: function inputAriaControls() {
        return this.help ? 'help-' + this.vma_uid_ : undefined;
      },
      hasLabel: function hasLabel() {
        return !this.fullwidth && this.label;
      },
      hasOutline: function hasOutline() {
        return !this.fullwidth && this.outline;
      },
      hasLineRipple: function hasLineRipple() {
        return !this.hasOutline && !this.multiline;
      },
      hasLeadingIcon: function hasLeadingIcon() {
        if ((this.leadingIcon || this.$slots['leading-icon']) && !(this.trailingIcon || this.$slots['trailing-icon'])) {
          return this.leadingIcon ? extractIconProp(this.leadingIcon) : {};
        }
        return false;
      },
      hasTrailingIcon: function hasTrailingIcon() {
        if (this.trailingIcon || this.$slots['trailing-icon']) {
          return this.trailingIcon ? extractIconProp(this.trailingIcon) : {};
        }
        return false;
      },
      labelClassesUpgraded: function labelClassesUpgraded() {
        return _extends(this.labelClasses, {
          'mdc-floating-label--float-above': this.value
        });
      }
    },
    watch: {
      disabled: function disabled() {
        this.foundation && this.foundation.setDisabled(this.disabled);
      },
      required: function required() {
        this.$refs.input && (this.$refs.input.required = this.required);
      },
      valid: function valid() {
        if (typeof this.valid !== 'undefined') {
          this.foundation && this.foundation.setValid(this.valid);
        }
      },
      dense: function dense() {
        this.$set(this.rootClasses, 'mdc-text-field--dense', this.dense);
      },
      helptextPersistent: function helptextPersistent() {
        this.helperTextFoundation && this.helperTextFoundation.setPersistent(this.helptextPersistent);
      },
      helptextValidation: function helptextValidation() {
        this.helperTextFoundation && this.helperTextFoundation.setValidation(this.helptextValidation);
      },
      value: function value(_value) {
        if (this.foundation) {
          if (_value !== this.foundation.getValue()) {
            this.foundation.setValue(_value);
          }
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      if (this.$refs.lineRipple) {
        this.lineRippleFoundation = new MDCLineRippleFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.lineRippleClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.lineRippleClasses, className);
          },
          hasClass: function hasClass(className) {
            _this.$refs.lineRipple.classList.contains(className);
          },
          setStyle: function setStyle(name, value) {
            _this.$set(_this.lineRippleStyles, name, value);
          },
          registerEventHandler: function registerEventHandler(evtType, handler) {
            _this.$refs.lineRipple.addEventListener(evtType, handler);
          },
          deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
            _this.$refs.lineRipple.removeEventListener(evtType, handler);
          }
        });
        this.lineRippleFoundation.init();
      }

      if (this.$refs.help) {
        this.helperTextFoundation = new MDCTextFieldHelperTextFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.helpClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.helpClasses, className);
          },
          hasClass: function hasClass(className) {
            return _this.$refs.help.classList.contains(className);
          },
          setAttr: function setAttr(name, value) {
            _this.$refs.help.setAttribute(name, value);
          },
          removeAttr: function removeAttr(name) {
            _this.$refs.help.removeAttribute(name);
          },
          setContent: function setContent() /*content*/{
            // help text get's updated from {{helptext}}
            // this.$refs.help.textContent = content;
          }
        });
        this.helperTextFoundation.init();
      }

      if (this.$refs.icon) {
        if (this.hasLeadingIcon) {
          this.$set(this.rootClasses, 'mdc-text-field--with-leading-icon', true);
        } else if (this.hasTrailingIcon) {
          this.$set(this.rootClasses, 'mdc-text-field--with-trailing-icon', true);
        }

        this.iconFoundation = new MDCTextFieldIconFoundation({
          setAttr: function setAttr(attr, value) {
            return _this.$refs.icon.setAttribute(attr, value);
          },
          getAttr: function getAttr(attr) {
            return _this.$refs.icon.getAttribute(attr);
          },
          removeAttr: function removeAttr(attr) {
            return _this.$refs.icon.removeAttribute(attr);
          },
          setContent: function setContent() /*content*/{
            // icon text get's updated from {{{{ hasTrailingIcon.content }}}}
            // this.$refs.icon.textContent = content;
          },
          registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
            _this.$refs.icon.addEventListener(evtType, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
            _this.$refs.icon.removeEventListener(evtType, handler);
          },
          notifyIconAction: function notifyIconAction() {
            return _this.$emit('icon-action');
          }
        });
        this.iconFoundation.init();
      }

      if (this.$refs.label) {
        this.labelFoundation = new MDCFloatingLabelFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.labelClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.labelClasses, className);
          },
          getWidth: function getWidth() {
            return _this.$refs.label.offsetWidth;
          },
          registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
            _this.$refs.label.addEventListener(evtType, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
            _this.$refs.label.removeEventListener(evtType, handler);
          }
        });
        this.labelFoundation.init();
      }

      if (this.$refs.outline) {
        this.outlineFoundation = new MDCNotchedOutlineFoundation({
          getWidth: function getWidth() {
            return _this.$refs.outline.offsetWidth;
          },
          getHeight: function getHeight() {
            return _this.$refs.outline.offsetHeight;
          },
          addClass: function addClass(className) {
            _this.$set(_this.outlineClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.outlineClasses, className);
          },
          setOutlinePathAttr: function setOutlinePathAttr(value) {
            _this.outlinePathAttr = value;
          },
          getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
            var idleOutlineElement = _this.$refs.outlineIdle;
            if (idleOutlineElement) {
              return window.getComputedStyle(idleOutlineElement).getPropertyValue(propertyName);
            }
          }
        });
        this.outlineFoundation.init();
      }

      this.foundation = new MDCTextFieldFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.rootClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.rootClasses, className);
        },
        hasClass: function hasClass(className) {
          _this.$refs.root.classList.contains(className);
        },
        registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler(evtType, handler) {
          _this.$refs.root.addEventListener(evtType, handler);
        },
        deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler(evtType, handler) {
          _this.$refs.root.removeEventListener(evtType, handler);
        },
        isFocused: function isFocused() {
          return document.activeElement === _this.$refs.input;
        },
        isRtl: function isRtl() {
          return window.getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
        },
        deactivateLineRipple: function deactivateLineRipple() {
          if (_this.lineRippleFoundation) {
            _this.lineRippleFoundation.deactivate();
          }
        },
        activateLineRipple: function activateLineRipple() {
          if (_this.lineRippleFoundation) {
            _this.lineRippleFoundation.activate();
          }
        },
        setLineRippleTransformOrigin: function setLineRippleTransformOrigin(normalizedX) {
          if (_this.lineRippleFoundation) {
            _this.lineRippleFoundation.setRippleCenter(normalizedX);
          }
        },
        registerInputInteractionHandler: function registerInputInteractionHandler(evtType, handler) {
          _this.$refs.input.addEventListener(evtType, handler, applyPassive());
        },
        deregisterInputInteractionHandler: function deregisterInputInteractionHandler(evtType, handler) {
          _this.$refs.input.removeEventListener(evtType, handler, applyPassive());
        },
        registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler(handler) {
          var getAttributesList = function getAttributesList(mutationsList) {
            return mutationsList.map(function (mutation) {
              return mutation.attributeName;
            });
          };
          var observer = new MutationObserver(function (mutationsList) {
            return handler(getAttributesList(mutationsList));
          });
          var targetNode = _this.$refs.input;
          var config = { attributes: true };
          observer.observe(targetNode, config);
          return observer;
        },
        deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler(observer) {
          observer.disconnect();
        },
        shakeLabel: function shakeLabel(shouldShake) {
          _this.labelFoundation.shake(shouldShake);
        },
        floatLabel: function floatLabel(shouldFloat) {
          _this.labelFoundation.float(shouldFloat);
        },
        hasLabel: function hasLabel() {
          return !!_this.$refs.label;
        },
        getLabelWidth: function getLabelWidth() {
          return _this.labelFoundation.getWidth();
        },
        getNativeInput: function getNativeInput() {
          return _this.$refs.input;
        },
        hasOutline: function hasOutline() {
          return !!_this.hasOutline;
        },
        notchOutline: function notchOutline(notchWidth, isRtl) {
          return _this.outlineFoundation.notch(notchWidth, isRtl);
        },
        closeOutline: function closeOutline() {
          return _this.outlineFoundation.closeNotch();
        }
      }, {
        helperText: this.helperTextFoundation,
        icon: this.iconFoundation
      });

      this.foundation.init();
      this.foundation.setValue(this.value);
      this.foundation.setDisabled(this.disabled);
      this.$refs.input && (this.$refs.input.required = this.required);
      if (typeof this.valid !== 'undefined') {
        this.foundation.setValid(this.valid);
      }

      if (this.textbox) {
        this.ripple = new RippleBase(this);
        this.ripple.init();
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation && this.foundation.destroy();
      this.lineRippleFoundation && this.lineRippleFoundation.destroy();
      this.helperTextFoundation && this.helperTextFoundation.destroy();
      this.iconFoundation && this.iconFoundation.destroy();
      this.labelFoundation && this.labelFoundation.destroy();
      this.outlineFoundation && this.outlineFoundation.destroy();
      this.ripple && this.ripple.destroy();
    },

    methods: {
      updateValue: function updateValue(value) {
        this.$emit('model', value);
      },
      focus: function focus() {
        this.$refs.input && this.$refs.input.focus();
      },
      blur: function blur() {
        this.$refs.input && this.$refs.input.blur();
      }
    }
  };

  var VueMDCTextfield = BasePlugin({
    mdcTextField: mdcTextField
  });

  var THEME_COLORS = ['primary', 'secondary', 'background', 'primary-light', 'secondary-light', 'secondary-dark', 'primary-dark'];

  var THEME_STYLES = ['text-primary', 'text-secondary', 'text-hint', 'text-icon', 'text-disabled'];

  var mdcTheme = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-element', { staticClass: "mdc-theme", class: _vm.classes, attrs: { "tag": _vm.tag } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-theme',
    components: {
      CustomElement: CustomElement
    },
    props: {
      tag: { type: String, default: 'div' },
      color: String,
      background: String
    },
    computed: {
      classes: function classes() {
        var classes = {};

        if (this.color && THEME_COLORS.indexOf(this.color) !== -1) {
          classes['mdc-theme--' + this.color] = true;
        }

        if (this.background && THEME_COLORS.indexOf(this.background) !== -1) {
          classes['mdc-theme--' + this.background + '-bg'] = true;

          if (this.color && THEME_STYLES.indexOf(this.color) !== -1) {
            classes['mdc-theme--' + this.color + '-on-' + this.background] = true;
          }
        }
        return classes;
      }
    }
  };

  var VueMDCTheme = BasePlugin({
    mdcTheme: mdcTheme
  });

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses$m = {
    FIXED: 'mdc-toolbar--fixed',
    FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
    FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
    TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
    FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
    FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
    FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized'
  };

  var strings$m = {
    TITLE_SELECTOR: '.mdc-toolbar__title',
    ICON_SELECTOR: '.mdc-toolbar__icon',
    FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
    CHANGE_EVENT: 'MDCToolbar:change'
  };

  var numbers$7 = {
    MAX_TITLE_SIZE: 2.125,
    MIN_TITLE_SIZE: 1.25,
    TOOLBAR_ROW_HEIGHT: 64,
    TOOLBAR_ROW_MOBILE_HEIGHT: 56,
    TOOLBAR_MOBILE_BREAKPOINT: 600
  };

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCToolbarFoundation = function (_MDCFoundation) {
    inherits(MDCToolbarFoundation, _MDCFoundation);
    createClass(MDCToolbarFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$m;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$m;
      }
    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers$7;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          hasClass: function hasClass() {
            return (/* className: string */ /* boolean */false
            );
          },
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          registerScrollHandler: function registerScrollHandler() /* handler: EventListener */{},
          deregisterScrollHandler: function deregisterScrollHandler() /* handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          getViewportWidth: function getViewportWidth() {
            return (/* number */0
            );
          },
          getViewportScrollY: function getViewportScrollY() {
            return (/* number */0
            );
          },
          getOffsetHeight: function getOffsetHeight() {
            return (/* number */0
            );
          },
          getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
            return (/* number */0
            );
          },
          notifyChange: function notifyChange() /* evtData: {flexibleExpansionRatio: number} */{},
          setStyle: function setStyle() /* property: string, value: string */{},
          setStyleForTitleElement: function setStyleForTitleElement() /* property: string, value: string */{},
          setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement() /* property: string, value: string */{},
          setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement() /* property: string, value: string */{}
        };
      }
    }]);

    function MDCToolbarFoundation(adapter) {
      classCallCheck(this, MDCToolbarFoundation);

      var _this = possibleConstructorReturn(this, (MDCToolbarFoundation.__proto__ || Object.getPrototypeOf(MDCToolbarFoundation)).call(this, _extends(MDCToolbarFoundation.defaultAdapter, adapter)));

      _this.resizeHandler_ = function () {
        return _this.checkRowHeight_();
      };
      _this.scrollHandler_ = function () {
        return _this.updateToolbarStyles_();
      };
      _this.checkRowHeightFrame_ = 0;
      _this.scrollFrame_ = 0;
      _this.executedLastChange_ = false;

      _this.calculations_ = {
        toolbarRowHeight: 0,
        // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
        toolbarRatio: 0, // The ratio of toolbar height to row height
        flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
        maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
        scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
        // Derived Heights based on the above key ratios.
        toolbarHeight: 0,
        flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
        maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
        scrollThreshold: 0
      };
      // Toolbar fixed behavior
      // If toolbar is fixed
      _this.fixed_ = false;
      // If fixed is targeted only at the last row
      _this.fixedLastrow_ = false;
      // Toolbar flexible behavior
      // If the first row is flexible
      _this.hasFlexibleRow_ = false;
      // If use the default behavior
      _this.useFlexDefaultBehavior_ = false;
      return _this;
    }

    createClass(MDCToolbarFoundation, [{
      key: 'init',
      value: function init() {
        this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
        this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
        this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
        if (this.hasFlexibleRow_) {
          this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
        }
        this.initKeyRatio_();
        this.setKeyHeights_();
        this.adapter_.registerResizeHandler(this.resizeHandler_);
        this.adapter_.registerScrollHandler(this.scrollHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        this.adapter_.deregisterScrollHandler(this.scrollHandler_);
      }
    }, {
      key: 'updateAdjustElementStyles',
      value: function updateAdjustElementStyles() {
        if (this.fixed_) {
          this.adapter_.setStyleForFixedAdjustElement('margin-top', this.calculations_.toolbarHeight + 'px');
        }
      }
    }, {
      key: 'getFlexibleExpansionRatio_',
      value: function getFlexibleExpansionRatio_(scrollTop) {
        // To prevent division by zero when there is no flexibleExpansionHeight
        var delta = 0.0001;
        return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
      }
    }, {
      key: 'checkRowHeight_',
      value: function checkRowHeight_() {
        var _this2 = this;

        cancelAnimationFrame(this.checkRowHeightFrame_);
        this.checkRowHeightFrame_ = requestAnimationFrame(function () {
          return _this2.setKeyHeights_();
        });
      }
    }, {
      key: 'setKeyHeights_',
      value: function setKeyHeights_() {
        var newToolbarRowHeight = this.getRowHeight_();
        if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
          this.calculations_.toolbarRowHeight = newToolbarRowHeight;
          this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
          this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
          this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
          this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
          this.updateAdjustElementStyles();
          this.updateToolbarStyles_();
        }
      }
    }, {
      key: 'updateToolbarStyles_',
      value: function updateToolbarStyles_() {
        var _this3 = this;

        cancelAnimationFrame(this.scrollFrame_);
        this.scrollFrame_ = requestAnimationFrame(function () {
          var scrollTop = _this3.adapter_.getViewportScrollY();
          var hasScrolledOutOfThreshold = _this3.scrolledOutOfThreshold_(scrollTop);

          if (hasScrolledOutOfThreshold && _this3.executedLastChange_) {
            return;
          }

          var flexibleExpansionRatio = _this3.getFlexibleExpansionRatio_(scrollTop);

          _this3.updateToolbarFlexibleState_(flexibleExpansionRatio);
          if (_this3.fixedLastrow_) {
            _this3.updateToolbarFixedState_(scrollTop);
          }
          if (_this3.hasFlexibleRow_) {
            _this3.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
          }
          _this3.executedLastChange_ = hasScrolledOutOfThreshold;
          _this3.adapter_.notifyChange({ flexibleExpansionRatio: flexibleExpansionRatio });
        });
      }
    }, {
      key: 'scrolledOutOfThreshold_',
      value: function scrolledOutOfThreshold_(scrollTop) {
        return scrollTop > this.calculations_.scrollThreshold;
      }
    }, {
      key: 'initKeyRatio_',
      value: function initKeyRatio_() {
        var toolbarRowHeight = this.getRowHeight_();
        var firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
        this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
        this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
        this.calculations_.maxTranslateYRatio = this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
        this.calculations_.scrollThresholdRatio = (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
      }
    }, {
      key: 'getRowHeight_',
      value: function getRowHeight_() {
        var breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
        return this.adapter_.getViewportWidth() < breakpoint ? MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
      }
    }, {
      key: 'updateToolbarFlexibleState_',
      value: function updateToolbarFlexibleState_(flexibleExpansionRatio) {
        this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
        this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
        if (flexibleExpansionRatio === 1) {
          this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
        } else if (flexibleExpansionRatio === 0) {
          this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
        }
      }
    }, {
      key: 'updateToolbarFixedState_',
      value: function updateToolbarFixedState_(scrollTop) {
        var translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
        this.adapter_.setStyle('transform', 'translateY(' + -translateDistance + 'px)');

        if (translateDistance === this.calculations_.maxTranslateYDistance) {
          this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
        } else {
          this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
        }
      }
    }, {
      key: 'updateFlexibleRowElementStyles_',
      value: function updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
        if (this.fixed_) {
          var height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
          this.adapter_.setStyleForFlexibleRowElement('height', height + this.calculations_.toolbarRowHeight + 'px');
        }
        if (this.useFlexDefaultBehavior_) {
          this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
        }
      }
    }, {
      key: 'updateElementStylesDefaultBehavior_',
      value: function updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
        var maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
        var minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
        var currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

        this.adapter_.setStyleForTitleElement('font-size', currentTitleSize + 'rem');
      }
    }]);
    return MDCToolbarFoundation;
  }(MDCFoundation);

  var mdcToolbar = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('header', { staticClass: "mdc-toolbar-wrapper" }, [_c('div', { ref: "root", class: _vm.rootClasses, style: _vm.rootStyles }, [_vm._t("default")], 2), _vm._v(" "), _vm.fixed || _vm.waterfall || _vm.fixedLastrow ? _c('div', { ref: "fixed-adjust", staticClass: "mdc-toolbar-fixed-adjust", style: _vm.adjustStyles }) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-toolbar',
    props: {
      fixed: Boolean,
      waterfall: Boolean,
      'fixed-lastrow': Boolean,
      flexible: Boolean,
      'flexible-default': { type: Boolean, default: true }
    },
    data: function data() {
      return {
        rootClasses: {
          'mdc-toolbar': true,
          'mdc-toolbar--fixed': this.fixed || this.waterfall || this.fixedLastrow,
          'mdc-toolbar--waterfall': this.waterfall,
          'mdc-toolbar--fixed-lastrow-only': this.fixedLastrow,
          'mdc-toolbar--flexible': this.flexible,
          'mdc-toolbar--flexible-default-behavior': this.flexible && this.flexibleDefault
        },
        rootStyles: {},
        adjustStyles: {
          // to avoid top margin collapse with :after el
          // 0.1 px should be rounded to 0px
          // TODO: find a better trick
          // height: '0.1px'
        },
        foundation: null
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCToolbarFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.rootClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.rootClasses, className);
        },
        hasClass: function hasClass(className) {
          return _this.$refs.root.classList.contains(className);
        },
        registerScrollHandler: function registerScrollHandler(handler) {
          window.addEventListener('scroll', handler);
        },
        deregisterScrollHandler: function deregisterScrollHandler(handler) {
          window.removeEventListener('scroll', handler);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          window.removeEventListener('resize', handler);
        },
        getViewportWidth: function getViewportWidth() {
          return window.innerWidth;
        },
        getViewportScrollY: function getViewportScrollY() {
          return window.pageYOffset;
        },
        getOffsetHeight: function getOffsetHeight() {
          return _this.$refs.root.offsetHeight;
        },
        getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
          var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
          return el ? el.offsetHeight : undefined;
        },
        notifyChange: function notifyChange(evtData) {
          _this.$emit('change', evtData);
        },
        setStyle: function setStyle(property, value) {
          _this.$set(_this.rootStyles, property, value);
        },
        setStyleForTitleElement: function setStyleForTitleElement(property, value) {
          var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR);
          if (el) el.style.setProperty(property, value);
        },
        setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(property, value) {
          var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
          if (el) el.style.setProperty(property, value);
        },
        setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(property, value) {
          _this.$set(_this.adjustStyles, property, value);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    }
  };

  var mdcToolbarRow = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-toolbar-row mdc-toolbar__row" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-row'
  };

  var mdcToolbarSection = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-toolbar-section mdc-toolbar__section", class: _vm.classes }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-section',
    props: {
      'align-start': Boolean,
      'align-end': Boolean,
      'shrink-to-fit': Boolean
    },
    data: function data() {
      return {
        classes: {
          'mdc-toolbar__section--align-start': this.alignStart,
          'mdc-toolbar__section--align-end': this.alignEnd,
          'mdc-toolbar__section--shrink-to-fit': this.shrinkToFit
        }
      };
    }
  };

  var mdcToolbarMenuIcon = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', _vm._g({ staticClass: "mdc-toolbar-menu-icon mdc-toolbar__menu-icon", class: { 'material-icons': !!_vm.icon } }, _vm.listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-menu-icon',
    mixins: [DispatchEventMixin],
    props: {
      icon: { type: String, default: 'menu' }
    }
  };

  var mdcToolbarTitle = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', _vm._g({ staticClass: "mdc-toolbar-title mdc-toolbar__title" }, _vm.listeners), [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-title',
    mixins: [DispatchEventMixin]
  };

  var mdcToolbarIcon = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', _vm._g({ staticClass: "mdc-toolbar-icon mdc-toolbar__icon", class: { 'material-icons': !!_vm.icon } }, _vm.listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-icon',
    mixins: [DispatchEventMixin],
    props: {
      icon: String
    }
  };

  var VueMDCToolbar = BasePlugin({
    mdcToolbar: mdcToolbar,
    mdcToolbarRow: mdcToolbarRow,
    mdcToolbarSection: mdcToolbarSection,
    mdcToolbarMenuIcon: mdcToolbarMenuIcon,
    mdcToolbarTitle: mdcToolbarTitle,
    mdcToolbarIcon: mdcToolbarIcon
  });

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var cssClasses$n = {
    FIXED_CLASS: 'mdc-top-app-bar--fixed',
    FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
    SHORT_CLASS: 'mdc-top-app-bar--short',
    SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
    SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed'
  };

  /** @enum {number} */
  var numbers$8 = {
    DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
    MAX_TOP_APP_BAR_HEIGHT: 128
  };

  /** @enum {string} */
  var strings$n = {
    ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
    NAVIGATION_EVENT: 'MDCTopAppBar:nav',
    NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
    ROOT_SELECTOR: '.mdc-top-app-bar',
    TITLE_SELECTOR: '.mdc-top-app-bar__title'
  };

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Top App Bar
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Top App Bar into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCTopAppBarAdapter = function () {
    function MDCTopAppBarAdapter() {
      classCallCheck(this, MDCTopAppBarAdapter);
    }

    createClass(MDCTopAppBarAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the root Element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the root Element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns true if the root Element contains the given class.
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "hasClass",
      value: function hasClass(className) {}

      /**
       * Sets the specified inline style property on the root Element to the given value.
       * @param {string} property
       * @param {string} value
       */

    }, {
      key: "setStyle",
      value: function setStyle(property, value) {}

      /**
       * Gets the height of the top app bar.
       * @return {number}
       */

    }, {
      key: "getTopAppBarHeight",
      value: function getTopAppBarHeight() {}

      /**
       * Registers an event handler on the navigation icon element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerNavigationIconInteractionHandler",
      value: function registerNavigationIconInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the navigation icon element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterNavigationIconInteractionHandler",
      value: function deregisterNavigationIconInteractionHandler(type, handler) {}

      /**
       * Emits an event when the navigation icon is clicked.
       */

    }, {
      key: "notifyNavigationIconClicked",
      value: function notifyNavigationIconClicked() {}

      /** @param {function(!Event)} handler */

    }, {
      key: "registerScrollHandler",
      value: function registerScrollHandler(handler) {}

      /** @param {function(!Event)} handler */

    }, {
      key: "deregisterScrollHandler",
      value: function deregisterScrollHandler(handler) {}

      /** @param {function(!Event)} handler */

    }, {
      key: "registerResizeHandler",
      value: function registerResizeHandler(handler) {}

      /** @param {function(!Event)} handler */

    }, {
      key: "deregisterResizeHandler",
      value: function deregisterResizeHandler(handler) {}

      /** @return {number} */

    }, {
      key: "getViewportScrollY",
      value: function getViewportScrollY() {}

      /** @return {number} */

    }, {
      key: "getTotalActionItems",
      value: function getTotalActionItems() {}
    }]);
    return MDCTopAppBarAdapter;
  }();

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCFoundation<!MDCTopAppBarAdapter>}
   */

  var MDCTopAppBarBaseFoundation = function (_MDCFoundation) {
    inherits(MDCTopAppBarBaseFoundation, _MDCFoundation);
    createClass(MDCTopAppBarBaseFoundation, null, [{
      key: 'strings',

      /** @return enum {string} */
      get: function get$$1() {
        return strings$n;
      }

      /** @return enum {string} */

    }, {
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$n;
      }

      /** @return enum {number} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers$8;
      }

      /**
       * {@see MDCTopAppBarAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCTopAppBarAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCTopAppBarAdapter} */{
            hasClass: function hasClass() /* className: string */{},
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            setStyle: function setStyle() /* property: string, value: string */{},
            getTopAppBarHeight: function getTopAppBarHeight() {},
            registerNavigationIconInteractionHandler: function registerNavigationIconInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterNavigationIconInteractionHandler: function deregisterNavigationIconInteractionHandler() /* type: string, handler: EventListener */{},
            notifyNavigationIconClicked: function notifyNavigationIconClicked() {},
            registerScrollHandler: function registerScrollHandler() /* handler: EventListener */{},
            deregisterScrollHandler: function deregisterScrollHandler() /* handler: EventListener */{},
            registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
            deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
            getViewportScrollY: function getViewportScrollY() {
              return (/* number */0
              );
            },
            getTotalActionItems: function getTotalActionItems() {
              return (/* number */0
              );
            }
          }
        );
      }

      /**
       * @param {!MDCTopAppBarAdapter} adapter
       */

    }]);

    function MDCTopAppBarBaseFoundation( /** @type {!MDCTopAppBarAdapter} */adapter) {
      classCallCheck(this, MDCTopAppBarBaseFoundation);

      var _this = possibleConstructorReturn(this, (MDCTopAppBarBaseFoundation.__proto__ || Object.getPrototypeOf(MDCTopAppBarBaseFoundation)).call(this, _extends(MDCTopAppBarBaseFoundation.defaultAdapter, adapter)));

      _this.navClickHandler_ = function () {
        return _this.adapter_.notifyNavigationIconClicked();
      };
      return _this;
    }

    createClass(MDCTopAppBarBaseFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerNavigationIconInteractionHandler('click', this.navClickHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterNavigationIconInteractionHandler('click', this.navClickHandler_);
      }
    }]);
    return MDCTopAppBarBaseFoundation;
  }(MDCFoundation);

  /**
   * @license
   * Copyright 2018 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCTopAppBarBaseFoundation<!MDCShortTopAppBarFoundation>}
   * @final
   */

  var MDCShortTopAppBarFoundation = function (_MDCTopAppBarBaseFoun) {
    inherits(MDCShortTopAppBarFoundation, _MDCTopAppBarBaseFoun);

    /**
     * @param {!MDCTopAppBarAdapter} adapter
     */
    function MDCShortTopAppBarFoundation(adapter) {
      classCallCheck(this, MDCShortTopAppBarFoundation);

      // State variable for the current top app bar state
      var _this = possibleConstructorReturn(this, (MDCShortTopAppBarFoundation.__proto__ || Object.getPrototypeOf(MDCShortTopAppBarFoundation)).call(this, adapter));

      _this.isCollapsed = false;

      _this.scrollHandler_ = function () {
        return _this.shortAppBarScrollHandler_();
      };
      return _this;
    }

    createClass(MDCShortTopAppBarFoundation, [{
      key: 'init',
      value: function init() {
        get(MDCShortTopAppBarFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCShortTopAppBarFoundation.prototype), 'init', this).call(this);
        var isAlwaysCollapsed = this.adapter_.hasClass(cssClasses$n.SHORT_COLLAPSED_CLASS);

        if (this.adapter_.getTotalActionItems() > 0) {
          this.adapter_.addClass(cssClasses$n.SHORT_HAS_ACTION_ITEM_CLASS);
        }

        if (!isAlwaysCollapsed) {
          this.adapter_.registerScrollHandler(this.scrollHandler_);
          this.shortAppBarScrollHandler_();
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        get(MDCShortTopAppBarFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCShortTopAppBarFoundation.prototype), 'destroy', this).call(this);
        this.adapter_.deregisterScrollHandler(this.scrollHandler_);
      }

      /**
       * Scroll handler for applying/removing the collapsed modifier class
       * on the short top app bar.
       * @private
       */

    }, {
      key: 'shortAppBarScrollHandler_',
      value: function shortAppBarScrollHandler_() {
        var currentScroll = this.adapter_.getViewportScrollY();

        if (currentScroll <= 0) {
          if (this.isCollapsed) {
            this.adapter_.removeClass(cssClasses$n.SHORT_COLLAPSED_CLASS);
            this.isCollapsed = false;
          }
        } else {
          if (!this.isCollapsed) {
            this.adapter_.addClass(cssClasses$n.SHORT_COLLAPSED_CLASS);
            this.isCollapsed = true;
          }
        }
      }
    }]);
    return MDCShortTopAppBarFoundation;
  }(MDCTopAppBarBaseFoundation);

  var mdcTopAppBar = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('header', _vm._g({ ref: "root", class: _vm.rootClasses, style: _vm.rootStyles }, _vm.$listeners), [_c('div', { staticClass: "mdc-top-app-bar__row" }, [_c('section', { staticClass: "mdc-top-app-bar__section mdc-top-app-bar__section--align-start" }, [_vm.haveNavigationIcon ? _c('a', _vm._g({ ref: "navigationIcon", class: _vm.naviconClasses, attrs: { "href": "#" } }, _vm.listeners), [_vm._v(_vm._s(_vm.icon))]) : _vm._e(), _vm._v(" "), !!_vm.title ? _c('span', { staticClass: "mdc-top-app-bar__title" }, [_vm._v(_vm._s(_vm.title))]) : _vm._e()]), _vm._v(" "), _vm.$slots.default ? _c('section', { staticClass: "mdc-top-app-bar__section mdc-top-app-bar__section--align-end" }, [_vm._t("default")], 2) : _vm._e()]), _vm._v(" "), _vm.$slots.tabs ? _c('div', { staticClass: "mdc-top-app-bar__row" }, [_vm._t("tabs")], 2) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-top-app-bar',
    mixins: [DispatchEventMixin],
    props: {
      short: Boolean,
      shortCollapsed: Boolean,
      prominent: Boolean,
      fixed: Boolean,
      title: String,
      icon: {
        type: String,
        default: 'menu'
      },
      iconClasses: Object,
      dense: Boolean
    },
    data: function data() {
      return {
        rootStyles: {},
        rootClasses: {
          'mdc-top-app-bar': true,
          'mdc-top-app-bar--dense': this.dense,
          'mdc-top-app-bar--short': this.short,
          'mdc-top-app-bar--short-collapsed': this.shortCollapsed,
          'mdc-top-app-bar--prominent': this.prominent,
          'mdc-top-app-bar--fixed': this.fixed
        },
        foundation: null
      };
    },

    computed: {
      haveNavigationIcon: function haveNavigationIcon() {
        return !!this.icon || this.iconClasses;
      },
      naviconClasses: function naviconClasses() {
        return _extends({
          'mdc-top-app-bar__navigation-icon': true,
          'material-icons': !!this.icon
        }, this.iconClasses);
      }
    },
    mounted: function mounted() {
      var _this = this;

      var adapter = {
        addClass: function addClass(className) {
          _this.$set(_this.rootClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.rootClasses, className);
        },
        hasClass: function hasClass(className) {
          return _this.$refs.root.classList.contains(className);
        },
        setStyle: function setStyle(property, value) {
          _this.$set(_this.rootStyles, property, value);
        },
        getTopAppBarHeight: function getTopAppBarHeight() {
          return _this.$el.clientHeight;
        },
        registerNavigationIconInteractionHandler: function registerNavigationIconInteractionHandler(type, handler) {
          if (_this.$refs.navigationIcon) {
            _this.$refs.navigationIcon.addEventListener(type, handler);
          }
        },
        deregisterNavigationIconInteractionHandler: function deregisterNavigationIconInteractionHandler(type, handler) {
          if (_this.$refs.navigationIcon) {
            _this.$refs.navigationIcon.removeEventListener(type, handler);
          }
        },
        notifyNavigationIconClicked: function notifyNavigationIconClicked() {
          _this.$emit('nav');
        },
        registerScrollHandler: function registerScrollHandler(handler) {
          window.addEventListener('scroll', handler);
        },
        deregisterScrollHandler: function deregisterScrollHandler(handler) {
          window.removeEventListener('scroll', handler);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },

        getViewportScrollY: function getViewportScrollY() {
          return window.pageYOffset;
        },
        getTotalActionItems: function getTotalActionItems() {
          return _this.$refs.root.querySelectorAll(MDCTopAppBarBaseFoundation.strings.ACTION_ITEM_SELECTOR).length;
        }
      };

      this.foundation = this.short ? new MDCShortTopAppBarFoundation(adapter) : new MDCTopAppBarBaseFoundation(adapter);

      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    }
  };

  var mdcTopAppBarAction = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', _vm._g({ staticClass: "mdc-top-app-bar-action mdc-top-app-bar--action mdc-top-app-bar__action-item", class: _vm.actioniconClasses, attrs: { "href": "#" } }, _vm.listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
    }, staticRenderFns: [],
    name: 'mdc-top-app-bar-action',
    mixins: [DispatchEventMixin, RippleMixin],
    props: {
      icon: String,
      iconClasses: Object
    },
    computed: {
      actioniconClasses: function actioniconClasses() {
        return _extends({
          'material-icons': !!this.icon
        }, this.iconClasses);
      }
    }
  };

  var VueMDCTopAppBar = BasePlugin({
    mdcTopAppBar: mdcTopAppBar,
    mdcTopAppBarAction: mdcTopAppBarAction
  });

  var typos = ['headline1', 'headline2', 'headline3', 'headline4', 'headline5', 'headline6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'];

  var mdcTypoMixin = function mdcTypoMixin(name) {
    return {
      render: function render(createElement) {
        var _class;

        return createElement(this.tag, {
          class: (_class = {
            'mdc-typo': true
          }, defineProperty(_class, name, true), defineProperty(_class, 'mdc-typography--' + this.typo, true), _class),
          attrs: this.$attrs,
          on: this.$listeners
        }, this.$slots.default);
      }
    };
  };

  function mdcTypoPropMixin(defaultTag, defaultTypo, validTypos) {
    return {
      props: {
        tag: {
          type: String,
          default: defaultTag
        },
        typo: {
          type: String,
          default: defaultTypo,
          validator: function validator(value) {
            return validTypos.indexOf(value) !== -1;
          }
        }
      }
    };
  }

  var mdcTextSection = {
    name: 'mdc-text-section',
    props: {
      tag: {
        type: String,
        default: 'section'
      }
    },
    render: function render(createElement) {
      return createElement(this.tag, {
        class: {
          'mdc-typography': true,
          'mdc-text-section': true
        },
        attrs: this.$attrs,
        on: this.$listeners
      }, this.$slots.default);
    }
  };

  var mdcText = {
    name: 'mdc-text',
    mixins: [mdcTypoMixin('mdc-text'), mdcTypoPropMixin('p', 'body1', typos)]
  };

  var mdcDisplay = {
    name: 'mdc-display',
    mixins: [mdcTypoMixin('mdc-display'), mdcTypoPropMixin('h1', 'headline4', ['headline4', 'headline3', 'headline2', 'headline1'])]
  };

  var mdcHeadline = {
    name: 'mdc-headline',
    mixins: [mdcTypoMixin('mdc-headline'), mdcTypoPropMixin('h2', 'headline5', ['headline5'])]
  };

  var mdcTitle = {
    name: 'mdc-title',
    mixins: [mdcTypoMixin('mdc-title'), mdcTypoPropMixin('h3', 'headline6', ['headline6'])]
  };

  var mdcSubHeading = {
    name: 'mdc-subheading',
    mixins: [mdcTypoMixin('mdc-subheading'), mdcTypoPropMixin('h4', 'subtitle2', ['subtitle1', 'subtitle2'])]
  };

  var mdcBody = {
    name: 'mdc-body',
    mixins: [mdcTypoMixin('mdc-body'), mdcTypoPropMixin('p', 'body1', ['body1', 'body2'])]
  };

  var mdcCaption = {
    name: 'mdc-caption',
    mixins: [mdcTypoMixin('mdc-caption'), mdcTypoPropMixin('span', 'caption', ['caption'])]
  };

  var VueMDCTypography = BasePlugin({
    mdcTextSection: mdcTextSection,
    mdcText: mdcText,
    mdcBody: mdcBody,
    mdcCaption: mdcCaption,
    mdcDisplay: mdcDisplay,
    mdcHeadline: mdcHeadline,
    mdcSubHeading: mdcSubHeading,
    mdcTitle: mdcTitle
  });

  //

  var plugin = {
    version: '0.17.0',
    install: function install(vm) {
      vm.use(VueMDCButton);
      vm.use(VueMDCCard);
      vm.use(VueMDCCheckbox);
      vm.use(VueMDCChipSet);
      vm.use(VueMDCDialog);
      vm.use(VueMDCDrawer);
      vm.use(VueMDCElevation);
      vm.use(VueMDCFab);
      vm.use(VueMDCGridList);
      vm.use(VueMDCIcon);
      vm.use(VueMDCIconToggle);
      vm.use(VueMDCLayoutApp);
      vm.use(VueMDCLayoutGrid);
      vm.use(VueMDCLinearProgress);
      vm.use(VueMDCList);
      vm.use(VueMDCMenu);
      vm.use(VueMDCRadio);
      vm.use(VueMDCRipple);
      vm.use(VueMDCSelect);
      vm.use(VueMDCSlider);
      vm.use(VueMDCSnackbar);
      vm.use(VueMDCSwitch);
      vm.use(VueMDCTabs);
      vm.use(VueMDCTextfield);
      vm.use(VueMDCTheme);
      vm.use(VueMDCToolbar);
      vm.use(VueMDCTopAppBar);
      vm.use(VueMDCTypography);
    }
  };

  autoInit(plugin);

  return plugin;

})));