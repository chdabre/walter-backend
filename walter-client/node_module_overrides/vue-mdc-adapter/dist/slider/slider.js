/**
* @module vue-mdc-adapterslider 0.17.0
* @exports VueMDCSlider
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCSlider = factory());
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

  /* global CustomEvent */

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
  var cssClasses = {
    ACTIVE: 'mdc-slider--active',
    DISABLED: 'mdc-slider--disabled',
    DISCRETE: 'mdc-slider--discrete',
    FOCUS: 'mdc-slider--focus',
    IN_TRANSIT: 'mdc-slider--in-transit',
    IS_DISCRETE: 'mdc-slider--discrete',
    HAS_TRACK_MARKER: 'mdc-slider--display-markers'
  };

  /** @enum {string} */
  var strings = {
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
  var numbers = {
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
        return cssClasses;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
      }

      /** @return enum {numbers} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers;
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

        this.isDiscrete_ = this.adapter_.hasClass(cssClasses.IS_DISCRETE);
        this.hasTrackMarker_ = this.adapter_.hasClass(cssClasses.HAS_TRACK_MARKER);
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
        this.adapter_.setAttribute(strings.ARIA_VALUEMAX, String(this.max_));
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
        this.adapter_.setAttribute(strings.ARIA_VALUEMIN, String(this.min_));
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
        this.toggleClass_(cssClasses.DISABLED, this.disabled_);
        if (this.disabled_) {
          this.savedTabIndex_ = this.adapter_.getTabIndex();
          this.adapter_.setAttribute(strings.ARIA_DISABLED, 'true');
          this.adapter_.removeAttribute('tabindex');
        } else {
          this.adapter_.removeAttribute(strings.ARIA_DISABLED);
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
        this.adapter_.addClass(cssClasses.FOCUS);
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
            return this.value_ + delta * numbers.PAGE_FACTOR;
          case KEY_IDS.PAGE_DOWN:
            return this.value_ - delta * numbers.PAGE_FACTOR;
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
        this.adapter_.addClass(cssClasses.FOCUS);
      }
    }, {
      key: 'handleBlur_',
      value: function handleBlur_() {
        this.preventFocusState_ = false;
        this.adapter_.removeClass(cssClasses.FOCUS);
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
        this.adapter_.setAttribute(strings.ARIA_VALUENOW, String(this.value_));
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
        this.toggleClass_(cssClasses.ACTIVE, this.active_);
      }

      /**
       * Toggles the inTransit state of the slider
       * @param {boolean} inTransit
       */

    }, {
      key: 'setInTransit_',
      value: function setInTransit_(inTransit) {
        this.inTransit_ = inTransit;
        this.toggleClass_(cssClasses.IN_TRANSIT, this.inTransit_);
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

  var plugin = BasePlugin({
    mdcSlider: mdcSlider
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXBwbHktcGFzc2l2ZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWZvY3VzLW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zbGlkZXIvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zbGlkZXIvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYW5pbWF0aW9uL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NsaWRlci9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9zbGlkZXIvbWRjLXNsaWRlci52dWUiLCIuLi8uLi9jb21wb25lbnRzL3NsaWRlci9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2xpZGVyL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBzdXBwb3J0c1Bhc3NpdmVfXG5cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2VcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7XG4gICAgICAgIGdldCBwYXNzaXZlKCkge1xuICAgICAgICAgIGlzU3VwcG9ydGVkID0geyBwYXNzaXZlOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvL2VtcHR5XG4gICAgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkXG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlX1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6IHZtID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50KGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEZvY3VzTWl4aW4gPSB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHsgaGFzRm9jdXM6IGZhbHNlIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uTW91c2VEb3duKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZVxuICAgIH0sXG4gICAgb25Nb3VzZVVwKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2VcbiAgICB9LFxuICAgIG9uRm9jdXNFdmVudCgpIHtcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRpc3BhdGNoRm9jdXNFdmVudCgpLCAwKVxuICAgIH0sXG4gICAgb25CbHVyRXZlbnQoKSB7XG4gICAgICAvLyBkaXNwYXRjaCBhc3luYyB0byBsZXQgdGltZSB0byBvdGhlciBmb2N1cyBldmVudCB0byBwcm9wYWdhdGVcbiAgICAgIC8vIGFsc28gZmlsdHVyIGJsdXIgaWYgbW91c2Vkb3duXG4gICAgICB0aGlzLl9hY3RpdmUgfHwgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRpc3BhdGNoRm9jdXNFdmVudCgpLCAwKVxuICAgIH0sXG4gICAgZGlzcGF0Y2hGb2N1c0V2ZW50KCkge1xuICAgICAgbGV0IGhhc0ZvY3VzID1cbiAgICAgICAgdGhpcy4kZWwgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHxcbiAgICAgICAgdGhpcy4kZWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcbiAgICAgIGlmIChoYXNGb2N1cyAhPSB0aGlzLmhhc0ZvY3VzKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoaGFzRm9jdXMgPyAnZm9jdXMnIDogJ2JsdXInKVxuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gaGFzRm9jdXNcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9XG59XG4iLCJjb25zdCBzY29wZSA9XG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMHgxMDAwMDAwMCkpLnRvU3RyaW5nKCkgKyAnLSdcblxuZXhwb3J0IGNvbnN0IFZNQVVuaXF1ZUlkTWl4aW4gPSB7XG4gIGJlZm9yZUNyZWF0ZSgpIHtcbiAgICB0aGlzLnZtYV91aWRfID0gc2NvcGUgKyB0aGlzLl91aWRcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEFDVElWRTogJ21kYy1zbGlkZXItLWFjdGl2ZScsXG4gIERJU0FCTEVEOiAnbWRjLXNsaWRlci0tZGlzYWJsZWQnLFxuICBESVNDUkVURTogJ21kYy1zbGlkZXItLWRpc2NyZXRlJyxcbiAgRk9DVVM6ICdtZGMtc2xpZGVyLS1mb2N1cycsXG4gIElOX1RSQU5TSVQ6ICdtZGMtc2xpZGVyLS1pbi10cmFuc2l0JyxcbiAgSVNfRElTQ1JFVEU6ICdtZGMtc2xpZGVyLS1kaXNjcmV0ZScsXG4gIEhBU19UUkFDS19NQVJLRVI6ICdtZGMtc2xpZGVyLS1kaXNwbGF5LW1hcmtlcnMnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBUUkFDS19TRUxFQ1RPUjogJy5tZGMtc2xpZGVyX190cmFjaycsXG4gIFRSQUNLX01BUktFUl9DT05UQUlORVJfU0VMRUNUT1I6ICcubWRjLXNsaWRlcl9fdHJhY2stbWFya2VyLWNvbnRhaW5lcicsXG4gIExBU1RfVFJBQ0tfTUFSS0VSX1NFTEVDVE9SOiAnLm1kYy1zbGlkZXJfX3RyYWNrLW1hcmtlcjpsYXN0LWNoaWxkJyxcbiAgVEhVTUJfQ09OVEFJTkVSX1NFTEVDVE9SOiAnLm1kYy1zbGlkZXJfX3RodW1iLWNvbnRhaW5lcicsXG4gIFBJTl9WQUxVRV9NQVJLRVJfU0VMRUNUT1I6ICcubWRjLXNsaWRlcl9fcGluLXZhbHVlLW1hcmtlcicsXG4gIEFSSUFfVkFMVUVNSU46ICdhcmlhLXZhbHVlbWluJyxcbiAgQVJJQV9WQUxVRU1BWDogJ2FyaWEtdmFsdWVtYXgnLFxuICBBUklBX1ZBTFVFTk9XOiAnYXJpYS12YWx1ZW5vdycsXG4gIEFSSUFfRElTQUJMRUQ6ICdhcmlhLWRpc2FibGVkJyxcbiAgU1RFUF9EQVRBX0FUVFI6ICdkYXRhLXN0ZXAnLFxuICBDSEFOR0VfRVZFTlQ6ICdNRENTbGlkZXI6Y2hhbmdlJyxcbiAgSU5QVVRfRVZFTlQ6ICdNRENTbGlkZXI6aW5wdXQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICBQQUdFX0ZBQ1RPUjogNCxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFNsaWRlci5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBTbGlkZXIgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1NsaWRlckFkYXB0ZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGNsYXNzTmFtZSBleGlzdHMgZm9yIHRoZSBzbGlkZXIgRWxlbWVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgc2xpZGVyIEVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgc2xpZGVyIEVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIGlmIGF0dHJpYnV0ZSBuYW1lIGV4aXN0cyBvbiB0aGUgc2xpZGVyIEVsZW1lbnQsXG4gICAqIG90aGVyd2lzZSByZXR1cm5zIG51bGxcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHJldHVybiB7P3N0cmluZ31cbiAgICovXG4gIGdldEF0dHJpYnV0ZShuYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGF0dHJpYnV0ZSBuYW1lIG9uIHNsaWRlciBFbGVtZW50IHRvIHZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGF0dHJpYnV0ZSBuYW1lIGZyb20gc2xpZGVyIEVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICovXG4gIHJlbW92ZUF0dHJpYnV0ZShuYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBib3VuZGluZyBjbGllbnQgcmVjdCBmb3IgdGhlIHNsaWRlciBFbGVtZW50XG4gICAqIEByZXR1cm4gez9DbGllbnRSZWN0fVxuICAgKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRhYiBpbmRleCBvZiB0aGUgc2xpZGVyIEVsZW1lbnRcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0VGFiSW5kZXgoKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgdGh1bWIgY29udGFpbmVyIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIHRodW1iIGNvbnRhaW5lciBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBib2R5IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIGJvZHkgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIHdpbmRvdyByZXNpemUgZXZlbnRcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIGZvciB0aGUgd2luZG93IHJlc2l6ZSBldmVudFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogRW1pdHMgYSBjdXN0b20gZXZlbnQgTURDU2xpZGVyOmlucHV0IGZyb20gdGhlIHJvb3RcbiAgICovXG4gIG5vdGlmeUlucHV0KCkge31cblxuICAvKipcbiAgICogRW1pdHMgYSBjdXN0b20gZXZlbnQgTURDU2xpZGVyOmNoYW5nZSBmcm9tIHRoZSByb290XG4gICAqL1xuICBub3RpZnlDaGFuZ2UoKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3R5bGUgcHJvcGVydHkgb2YgdGhlIHRodW1iIGNvbnRhaW5lciBlbGVtZW50IHRvIHRoZSBwYXNzZWQgdmFsdWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldFRodW1iQ29udGFpbmVyU3R5bGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3R5bGUgcHJvcGVydHkgb2YgdGhlIHRyYWNrIGVsZW1lbnQgdG8gdGhlIHBhc3NlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0VHJhY2tTdHlsZVByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGlubmVyIHRleHQgb2YgdGhlIHBpbiBtYXJrZXIgdG8gdGhlIHBhc3NlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICovXG4gIHNldE1hcmtlclZhbHVlKHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHRoZSBwYXNzZWQgbnVtYmVyIG9mIHRyYWNrIG1hcmtlcnMgdG8gdGhlIHRyYWNrIG1hcmsgY29udGFpbmVyIGVsZW1lbnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bU1hcmtlcnNcbiAgICovXG4gIGFwcGVuZFRyYWNrTWFya2VycyhudW1NYXJrZXJzKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0cmFjayBtYXJrZXJzIGZyb210IGhlIHRyYWNrIG1hcmsgY29udGFpbmVyIGVsZW1lbnRcbiAgICovXG4gIHJlbW92ZVRyYWNrTWFya2VycygpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdHlsZSBwcm9wZXJ0eSBvZiB0aGUgbGFzdCB0cmFjayBtYXJrZXIgdG8gdGhlIHBhc3NlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0TGFzdFRyYWNrTWFya2Vyc1N0eWxlUHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByb290IGVsZW1lbnQgaXMgUlRMLCBvdGhlcndpc2UgZmFsc2VcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzUlRMKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDU2xpZGVyQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIG5vUHJlZml4OiBzdHJpbmcsXG4gKiAgIHdlYmtpdFByZWZpeDogc3RyaW5nLFxuICogICBzdHlsZVByb3BlcnR5OiBzdHJpbmdcbiAqIH19XG4gKi9cbmxldCBWZW5kb3JQcm9wZXJ0eU1hcFR5cGU7XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgZXZlbnRUeXBlTWFwID0ge1xuICAnYW5pbWF0aW9uc3RhcnQnOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25zdGFydCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uU3RhcnQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uZW5kJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAnYW5pbWF0aW9uaXRlcmF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25JdGVyYXRpb24nLFxuICAgIHN0eWxlUHJvcGVydHk6ICdhbmltYXRpb24nLFxuICB9LFxuICAndHJhbnNpdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgIHN0eWxlUHJvcGVydHk6ICd0cmFuc2l0aW9uJyxcbiAgfSxcbn07XG5cbi8qKiBAY29uc3Qge09iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqL1xuY29uc3QgY3NzUHJvcGVydHlNYXAgPSB7XG4gICdhbmltYXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zZm9ybSc6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zZm9ybScsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2Zvcm0nLFxuICB9LFxuICAndHJhbnNpdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zaXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHtcbiAgcmV0dXJuICh3aW5kb3dPYmpbJ2RvY3VtZW50J10gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10gPT09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSB7XG4gIHJldHVybiAoZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCB8fCBldmVudFR5cGUgaW4gY3NzUHJvcGVydHlNYXApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSBtYXBcbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKSB7XG4gIHJldHVybiBtYXBbZXZlbnRUeXBlXS5zdHlsZVByb3BlcnR5IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGRldGVybWluZSBicm93c2VyIHByZWZpeCBmb3IgQ1NTMyBhbmltYXRpb24gZXZlbnRzXG4gKiBhbmQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIGlmICghaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB8fCAhZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpKSB7XG4gICAgcmV0dXJuIGV2ZW50VHlwZTtcbiAgfVxuXG4gIGNvbnN0IG1hcCA9IC8qKiBAdHlwZSB7IU9iamVjdDxzdHJpbmcsICFWZW5kb3JQcm9wZXJ0eU1hcFR5cGU+fSAqLyAoXG4gICAgZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCA/IGV2ZW50VHlwZU1hcCA6IGNzc1Byb3BlcnR5TWFwXG4gICk7XG4gIGNvbnN0IGVsID0gd2luZG93T2JqWydkb2N1bWVudCddWydjcmVhdGVFbGVtZW50J10oJ2RpdicpO1xuICBsZXQgZXZlbnROYW1lID0gJyc7XG5cbiAgaWYgKG1hcCA9PT0gZXZlbnRUeXBlTWFwKSB7XG4gICAgZXZlbnROYW1lID0gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50TmFtZSA9IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG4gIH1cblxuICByZXR1cm4gZXZlbnROYW1lO1xufVxuXG4vLyBQdWJsaWMgZnVuY3Rpb25zIHRvIGFjY2VzcyBnZXRBbmltYXRpb25OYW1lKCkgZm9yIEphdmFTY3JpcHQgZXZlbnRzIG9yIENTU1xuLy8gcHJvcGVydHkgbmFtZXMuXG5cbmNvbnN0IHRyYW5zZm9ybVN0eWxlUHJvcGVydGllcyA9IFsndHJhbnNmb3JtJywgJ1dlYmtpdFRyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdNU1RyYW5zZm9ybSddO1xuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RFdmVudE5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufVxuXG5leHBvcnQge3RyYW5zZm9ybVN0eWxlUHJvcGVydGllcywgZ2V0Q29ycmVjdEV2ZW50TmFtZSwgZ2V0Q29ycmVjdFByb3BlcnR5TmFtZX07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICp5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IE1EQ1NsaWRlckFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcblxuaW1wb3J0IHtnZXRDb3JyZWN0RXZlbnROYW1lLCBnZXRDb3JyZWN0UHJvcGVydHlOYW1lfSBmcm9tICdAbWF0ZXJpYWwvYW5pbWF0aW9uL2luZGV4JztcbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IEtFWV9JRFMgPSB7XG4gIEFSUk9XX0xFRlQ6ICdBcnJvd0xlZnQnLFxuICBBUlJPV19SSUdIVDogJ0Fycm93UmlnaHQnLFxuICBBUlJPV19VUDogJ0Fycm93VXAnLFxuICBBUlJPV19ET1dOOiAnQXJyb3dEb3duJyxcbiAgSE9NRTogJ0hvbWUnLFxuICBFTkQ6ICdFbmQnLFxuICBQQUdFX1VQOiAnUGFnZVVwJyxcbiAgUEFHRV9ET1dOOiAnUGFnZURvd24nLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBNT1ZFX0VWRU5UX01BUCA9IHtcbiAgJ21vdXNlZG93bic6ICdtb3VzZW1vdmUnLFxuICAndG91Y2hzdGFydCc6ICd0b3VjaG1vdmUnLFxuICAncG9pbnRlcmRvd24nOiAncG9pbnRlcm1vdmUnLFxufTtcblxuY29uc3QgRE9XTl9FVkVOVFMgPSBbJ21vdXNlZG93bicsICdwb2ludGVyZG93bicsICd0b3VjaHN0YXJ0J107XG5jb25zdCBVUF9FVkVOVFMgPSBbJ21vdXNldXAnLCAncG9pbnRlcnVwJywgJ3RvdWNoZW5kJ107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1NsaWRlckFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENTbGlkZXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDU2xpZGVyQWRhcHRlcn0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDU2xpZGVyQWRhcHRlcn0gKi8gKHtcbiAgICAgIGhhc0NsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZ2V0QXR0cmlidXRlOiAoLyogbmFtZTogc3RyaW5nICovKSA9PiAvKiBzdHJpbmd8bnVsbCAqLyBudWxsLFxuICAgICAgc2V0QXR0cmlidXRlOiAoLyogbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUF0dHJpYnV0ZTogKC8qIG5hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovICh7XG4gICAgICAgIHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCxcbiAgICAgIH0pLFxuICAgICAgZ2V0VGFiSW5kZXg6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5SW5wdXQ6ICgpID0+IHt9LFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIHNldFRodW1iQ29udGFpbmVyU3R5bGVQcm9wZXJ0eTogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldFRyYWNrU3R5bGVQcm9wZXJ0eTogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldE1hcmtlclZhbHVlOiAoLyogdmFsdWU6IG51bWJlciAqLykgPT4ge30sXG4gICAgICBhcHBlbmRUcmFja01hcmtlcnM6ICgvKiBudW1NYXJrZXJzOiBudW1iZXIgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlVHJhY2tNYXJrZXJzOiAoKSA9PiB7fSxcbiAgICAgIHNldExhc3RUcmFja01hcmtlcnNTdHlsZVByb3BlcnR5OiAoLyogcHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgaXNSVEw6ICgpID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBNRENTbGlkZXJGb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7P01EQ1NsaWRlckFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1NsaWRlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgICAvKiogQHByaXZhdGUgez9DbGllbnRSZWN0fSAqL1xuICAgIHRoaXMucmVjdF8gPSBudWxsO1xuICAgIC8vIFdlIHNldCB0aGlzIHRvIE5hTiBzaW5jZSB3ZSB3YW50IGl0IHRvIGJlIGEgbnVtYmVyLCBidXQgd2UgY2FuJ3QgdXNlICcwJyBvciAnLTEnXG4gICAgLy8gYmVjYXVzZSB0aG9zZSBjb3VsZCBiZSB2YWxpZCB0YWJpbmRpY2VzIHNldCBieSB0aGUgY2xpZW50IGNvZGUuXG4gICAgdGhpcy5zYXZlZFRhYkluZGV4XyA9IE5hTjtcbiAgICB0aGlzLmFjdGl2ZV8gPSBmYWxzZTtcbiAgICB0aGlzLmluVHJhbnNpdF8gPSBmYWxzZTtcbiAgICB0aGlzLmlzRGlzY3JldGVfID0gZmFsc2U7XG4gICAgdGhpcy5oYXNUcmFja01hcmtlcl8gPSBmYWxzZTtcbiAgICB0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfID0gZmFsc2U7XG4gICAgdGhpcy5taW5fID0gMDtcbiAgICB0aGlzLm1heF8gPSAxMDA7XG4gICAgdGhpcy5zdGVwXyA9IDA7XG4gICAgdGhpcy52YWx1ZV8gPSAwO1xuICAgIHRoaXMuZGlzYWJsZWRfID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNTdGF0ZV8gPSBmYWxzZTtcbiAgICB0aGlzLnVwZGF0ZVVJRnJhbWVfID0gMDtcbiAgICB0aGlzLnRodW1iQ29udGFpbmVyUG9pbnRlckhhbmRsZXJfID0gKCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGluZ1RodW1iVGFyZ2V0RXZ0XyA9IHRydWU7XG4gICAgfTtcbiAgICB0aGlzLmludGVyYWN0aW9uU3RhcnRIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlRG93bl8oZXZ0KTtcbiAgICB0aGlzLmtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlS2V5ZG93bl8oZXZ0KTtcbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzXygpO1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyXygpO1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmlzRGlzY3JldGVfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLklTX0RJU0NSRVRFKTtcbiAgICB0aGlzLmhhc1RyYWNrTWFya2VyXyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IQVNfVFJBQ0tfTUFSS0VSKTtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dE5hbWUsIHRoaXMuaW50ZXJhY3Rpb25TdGFydEhhbmRsZXJfKSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy50aHVtYkNvbnRhaW5lclBvaW50ZXJIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgdGhpcy5sYXlvdXQoKTtcbiAgICAvLyBBdCBsYXN0IHN0ZXAsIHByb3ZpZGUgYSByZWFzb25hYmxlIGRlZmF1bHQgdmFsdWUgdG8gZGlzY3JldGUgc2xpZGVyXG4gICAgaWYgKHRoaXMuaXNEaXNjcmV0ZV8gJiYgdGhpcy5nZXRTdGVwKCkgPT0gMCkge1xuICAgICAgdGhpcy5zdGVwXyA9IDE7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy5pbnRlcmFjdGlvblN0YXJ0SGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgRE9XTl9FVkVOVFMuZm9yRWFjaCgoZXZ0TmFtZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy50aHVtYkNvbnRhaW5lclBvaW50ZXJIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgfVxuXG4gIHNldHVwVHJhY2tNYXJrZXIoKSB7XG4gICAgaWYgKHRoaXMuaXNEaXNjcmV0ZV8gJiYgdGhpcy5oYXNUcmFja01hcmtlcl8mJiB0aGlzLmdldFN0ZXAoKSAhPSAwKSB7XG4gICAgICBjb25zdCBtaW4gPSB0aGlzLmdldE1pbigpO1xuICAgICAgY29uc3QgbWF4ID0gdGhpcy5nZXRNYXgoKTtcbiAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmdldFN0ZXAoKTtcbiAgICAgIGxldCBudW1NYXJrZXJzID0gKG1heCAtIG1pbikgLyBzdGVwO1xuXG4gICAgICAvLyBJbiBjYXNlIGRpc3RhbmNlIGJldHdlZW4gbWF4ICYgbWluIGlzIGluZGl2aXNpYmxlIHRvIHN0ZXAsXG4gICAgICAvLyB3ZSBwbGFjZSB0aGUgc2Vjb25kYXJ5IHRvIGxhc3QgbWFya2VyIHByb3BvcnRpb25hbGx5IGF0IHdoZXJlIHRodW1iXG4gICAgICAvLyBjb3VsZCByZWFjaCBhbmQgcGxhY2UgdGhlIGxhc3QgbWFya2VyIGF0IG1heCB2YWx1ZVxuICAgICAgY29uc3QgaW5kaXZpc2libGUgPSBNYXRoLmNlaWwobnVtTWFya2VycykgIT09IG51bU1hcmtlcnM7XG4gICAgICBpZiAoaW5kaXZpc2libGUpIHtcbiAgICAgICAgbnVtTWFya2VycyA9IE1hdGguY2VpbChudW1NYXJrZXJzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVUcmFja01hcmtlcnMoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYXBwZW5kVHJhY2tNYXJrZXJzKG51bU1hcmtlcnMpO1xuXG4gICAgICBpZiAoaW5kaXZpc2libGUpIHtcbiAgICAgICAgY29uc3QgbGFzdFN0ZXBSYXRpbyA9IChtYXggLSBudW1NYXJrZXJzICogc3RlcCkgLyBzdGVwICsgMTtcbiAgICAgICAgY29uc3QgZmxleCA9IGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93LCAnZmxleCcpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldExhc3RUcmFja01hcmtlcnNTdHlsZVByb3BlcnR5KGZsZXgsIFN0cmluZyhsYXN0U3RlcFJhdGlvKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIHRoaXMucmVjdF8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLnVwZGF0ZVVJRm9yQ3VycmVudFZhbHVlXygpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAqL1xuICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuc2V0VmFsdWVfKHZhbHVlLCBmYWxzZSk7XG4gIH1cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXRNYXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF4XztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge251bWJlcn0gbWF4ICovXG4gIHNldE1heChtYXgpIHtcbiAgICBpZiAobWF4IDwgdGhpcy5taW5fKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgbWF4IHRvIGJlIGxlc3MgdGhhbiB0aGUgc2xpZGVyXFwncyBtaW5pbXVtIHZhbHVlJyk7XG4gICAgfVxuICAgIHRoaXMubWF4XyA9IG1heDtcbiAgICB0aGlzLnNldFZhbHVlXyh0aGlzLnZhbHVlXywgZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlKHN0cmluZ3MuQVJJQV9WQUxVRU1BWCwgU3RyaW5nKHRoaXMubWF4XykpO1xuICAgIHRoaXMuc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0TWluKCkge1xuICAgIHJldHVybiB0aGlzLm1pbl87XG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IG1pbiAqL1xuICBzZXRNaW4obWluKSB7XG4gICAgaWYgKG1pbiA+IHRoaXMubWF4Xykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IG1pbiB0byBiZSBncmVhdGVyIHRoYW4gdGhlIHNsaWRlclxcJ3MgbWF4aW11bSB2YWx1ZScpO1xuICAgIH1cbiAgICB0aGlzLm1pbl8gPSBtaW47XG4gICAgdGhpcy5zZXRWYWx1ZV8odGhpcy52YWx1ZV8sIGZhbHNlLCB0cnVlKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZShzdHJpbmdzLkFSSUFfVkFMVUVNSU4sIFN0cmluZyh0aGlzLm1pbl8pKTtcbiAgICB0aGlzLnNldHVwVHJhY2tNYXJrZXIoKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldFN0ZXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcF87XG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgKi9cbiAgc2V0U3RlcChzdGVwKSB7XG4gICAgaWYgKHN0ZXAgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgY2Fubm90IGJlIHNldCB0byBhIG5lZ2F0aXZlIG51bWJlcicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0Rpc2NyZXRlXyAmJiAodHlwZW9mKHN0ZXApICE9PSAnbnVtYmVyJyB8fCBzdGVwIDwgMSkpIHtcbiAgICAgIHN0ZXAgPSAxO1xuICAgIH1cbiAgICB0aGlzLnN0ZXBfID0gc3RlcDtcbiAgICB0aGlzLnNldFZhbHVlXyh0aGlzLnZhbHVlXywgZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRfO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWQgKi9cbiAgc2V0RGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmRpc2FibGVkXyA9IGRpc2FibGVkO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3NfKGNzc0NsYXNzZXMuRElTQUJMRUQsIHRoaXMuZGlzYWJsZWRfKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZF8pIHtcbiAgICAgIHRoaXMuc2F2ZWRUYWJJbmRleF8gPSB0aGlzLmFkYXB0ZXJfLmdldFRhYkluZGV4KCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZShzdHJpbmdzLkFSSUFfRElTQUJMRUQsICd0cnVlJyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVBdHRyaWJ1dGUoc3RyaW5ncy5BUklBX0RJU0FCTEVEKTtcbiAgICAgIGlmICghaXNOYU4odGhpcy5zYXZlZFRhYkluZGV4XykpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgU3RyaW5nKHRoaXMuc2F2ZWRUYWJJbmRleF8pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGludGVyYWN0aW5nIHdpdGggdGhlIHNsaWRlclxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVEb3duXyhldnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZlbnRGb2N1c1N0YXRlXyA9IHRydWU7XG4gICAgdGhpcy5zZXRJblRyYW5zaXRfKCF0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfKTtcbiAgICB0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfID0gZmFsc2U7XG4gICAgdGhpcy5zZXRBY3RpdmVfKHRydWUpO1xuXG4gICAgY29uc3QgbW92ZUhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZU1vdmVfKGV2dCk7XG4gICAgfTtcblxuICAgIC8vIE5vdGU6IHVwSGFuZGxlciBpcyBbZGVdcmVnaXN0ZXJlZCBvbiBBTEwgcG90ZW50aWFsIHBvaW50ZXItcmVsYXRlZCByZWxlYXNlIGV2ZW50IHR5cGVzLCBzaW5jZSBzb21lIGJyb3dzZXJzXG4gICAgLy8gZG8gbm90IGFsd2F5cyBmaXJlIHRoZXNlIGNvbnNpc3RlbnRseSBpbiBwYWlycy5cbiAgICAvLyAoU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2lzc3Vlcy8xMTkyKVxuICAgIGNvbnN0IHVwSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlVXBfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKE1PVkVfRVZFTlRfTUFQW2V2dC50eXBlXSwgbW92ZUhhbmRsZXIpO1xuICAgICAgVVBfRVZFTlRTLmZvckVhY2goKGV2dE5hbWUpID0+IHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdXBIYW5kbGVyKSk7XG4gICAgfTtcblxuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKE1PVkVfRVZFTlRfTUFQW2V2dC50eXBlXSwgbW92ZUhhbmRsZXIpO1xuICAgIFVQX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcihldnROYW1lLCB1cEhhbmRsZXIpKTtcbiAgICB0aGlzLnNldFZhbHVlRnJvbUV2dF8oZXZ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdXNlciBtb3ZlcyB0aGUgc2xpZGVyXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZU1vdmVfKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0VmFsdWVGcm9tRXZ0XyhldnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB1c2VyJ3MgaW50ZXJhY3Rpb24gd2l0aCB0aGUgc2xpZGVyIGVuZHNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZVVwXygpIHtcbiAgICB0aGlzLnNldEFjdGl2ZV8oZmFsc2UpO1xuICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGFnZVggb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0UGFnZVhfKGV2dCkge1xuICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcyAmJiBldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgfVxuICAgIHJldHVybiBldnQucGFnZVg7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2xpZGVyIHZhbHVlIGZyb20gYW4gZXZlbnRcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0VmFsdWVGcm9tRXZ0XyhldnQpIHtcbiAgICBjb25zdCBwYWdlWCA9IHRoaXMuZ2V0UGFnZVhfKGV2dCk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbXB1dGVWYWx1ZUZyb21QYWdlWF8ocGFnZVgpO1xuICAgIHRoaXMuc2V0VmFsdWVfKHZhbHVlLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgbmV3IHZhbHVlIGZyb20gdGhlIHBhZ2VYIHBvc2l0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlWFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBjb21wdXRlVmFsdWVGcm9tUGFnZVhfKHBhZ2VYKSB7XG4gICAgY29uc3Qge21heF86IG1heCwgbWluXzogbWlufSA9IHRoaXM7XG4gICAgY29uc3QgeFBvcyA9IHBhZ2VYIC0gdGhpcy5yZWN0Xy5sZWZ0O1xuICAgIGxldCBwY3RDb21wbGV0ZSA9IHhQb3MgLyB0aGlzLnJlY3RfLndpZHRoO1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzUlRMKCkpIHtcbiAgICAgIHBjdENvbXBsZXRlID0gMSAtIHBjdENvbXBsZXRlO1xuICAgIH1cbiAgICAvLyBGaXQgdGhlIHBlcmNlbnRhZ2UgY29tcGxldGUgYmV0d2VlbiB0aGUgcmFuZ2UgW21pbixtYXhdXG4gICAgLy8gYnkgcmVtYXBwaW5nIGZyb20gWzAsIDFdIHRvIFttaW4sIG1pbisobWF4LW1pbildLlxuICAgIHJldHVybiBtaW4gKyBwY3RDb21wbGV0ZSAqIChtYXggLSBtaW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5ZG93biBldmVudHNcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgaGFuZGxlS2V5ZG93bl8oZXZ0KSB7XG4gICAgY29uc3Qga2V5SWQgPSB0aGlzLmdldEtleUlkXyhldnQpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZUZvcktleUlkXyhrZXlJZCk7XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFByZXZlbnQgcGFnZSBmcm9tIHNjcm9sbGluZyBkdWUgdG8ga2V5IHByZXNzZXMgdGhhdCB3b3VsZCBub3JtYWxseSBzY3JvbGwgdGhlIHBhZ2VcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRk9DVVMpO1xuICAgIHRoaXMuc2V0VmFsdWVfKHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXB1dGVkIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBrYmRFdnRcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0S2V5SWRfKGtiZEV2dCkge1xuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLkFSUk9XX0xFRlQgfHwga2JkRXZ0LmtleUNvZGUgPT09IDM3KSB7XG4gICAgICByZXR1cm4gS0VZX0lEUy5BUlJPV19MRUZUO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5BUlJPV19SSUdIVCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkFSUk9XX1JJR0hUO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5BUlJPV19VUCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzgpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkFSUk9XX1VQO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5BUlJPV19ET1dOIHx8IGtiZEV2dC5rZXlDb2RlID09PSA0MCkge1xuICAgICAgcmV0dXJuIEtFWV9JRFMuQVJST1dfRE9XTjtcbiAgICB9XG4gICAgaWYgKGtiZEV2dC5rZXkgPT09IEtFWV9JRFMuSE9NRSB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzYpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkhPTUU7XG4gICAgfVxuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLkVORCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzUpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkVORDtcbiAgICB9XG4gICAgaWYgKGtiZEV2dC5rZXkgPT09IEtFWV9JRFMuUEFHRV9VUCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzMpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLlBBR0VfVVA7XG4gICAgfVxuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLlBBR0VfRE9XTiB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzQpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLlBBR0VfRE9XTjtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIHZhbHVlIGdpdmVuIGEga2V5Ym9hcmQga2V5IElEXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlJZFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRWYWx1ZUZvcktleUlkXyhrZXlJZCkge1xuICAgIGNvbnN0IHttYXhfOiBtYXgsIG1pbl86IG1pbiwgc3RlcF86IHN0ZXB9ID0gdGhpcztcbiAgICBsZXQgZGVsdGEgPSBzdGVwIHx8IChtYXggLSBtaW4pIC8gMTAwO1xuICAgIGNvbnN0IHZhbHVlTmVlZHNUb0JlRmxpcHBlZCA9IHRoaXMuYWRhcHRlcl8uaXNSVEwoKSAmJiAoXG4gICAgICBrZXlJZCA9PT0gS0VZX0lEUy5BUlJPV19MRUZUIHx8IGtleUlkID09PSBLRVlfSURTLkFSUk9XX1JJR0hUXG4gICAgKTtcbiAgICBpZiAodmFsdWVOZWVkc1RvQmVGbGlwcGVkKSB7XG4gICAgICBkZWx0YSA9IC1kZWx0YTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGtleUlkKSB7XG4gICAgY2FzZSBLRVlfSURTLkFSUk9XX0xFRlQ6XG4gICAgY2FzZSBLRVlfSURTLkFSUk9XX0RPV046XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV8gLSBkZWx0YTtcbiAgICBjYXNlIEtFWV9JRFMuQVJST1dfUklHSFQ6XG4gICAgY2FzZSBLRVlfSURTLkFSUk9XX1VQOlxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfICsgZGVsdGE7XG4gICAgY2FzZSBLRVlfSURTLkhPTUU6XG4gICAgICByZXR1cm4gdGhpcy5taW5fO1xuICAgIGNhc2UgS0VZX0lEUy5FTkQ6XG4gICAgICByZXR1cm4gdGhpcy5tYXhfO1xuICAgIGNhc2UgS0VZX0lEUy5QQUdFX1VQOlxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfICsgZGVsdGEgKiBudW1iZXJzLlBBR0VfRkFDVE9SO1xuICAgIGNhc2UgS0VZX0lEUy5QQUdFX0RPV046XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV8gLSBkZWx0YSAqIG51bWJlcnMuUEFHRV9GQUNUT1I7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBOYU47XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXNfKCkge1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1N0YXRlXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRk9DVVMpO1xuICB9XG5cbiAgaGFuZGxlQmx1cl8oKSB7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNTdGF0ZV8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuRk9DVVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBzbGlkZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkRmlyZUlucHV0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlXG4gICAqL1xuICBzZXRWYWx1ZV8odmFsdWUsIHNob3VsZEZpcmVJbnB1dCwgZm9yY2UgPSBmYWxzZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy52YWx1ZV8gJiYgIWZvcmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge21pbl86IG1pbiwgbWF4XzogbWF4fSA9IHRoaXM7XG4gICAgY29uc3QgdmFsdWVTZXRUb0JvdW5kYXJ5ID0gdmFsdWUgPT09IG1pbiB8fCB2YWx1ZSA9PT0gbWF4O1xuICAgIGlmICh0aGlzLnN0ZXBfICYmICF2YWx1ZVNldFRvQm91bmRhcnkpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5xdWFudGl6ZV8odmFsdWUpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPCBtaW4pIHtcbiAgICAgIHZhbHVlID0gbWluO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgIHZhbHVlID0gbWF4O1xuICAgIH1cbiAgICB0aGlzLnZhbHVlXyA9IHZhbHVlO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlKHN0cmluZ3MuQVJJQV9WQUxVRU5PVywgU3RyaW5nKHRoaXMudmFsdWVfKSk7XG4gICAgdGhpcy51cGRhdGVVSUZvckN1cnJlbnRWYWx1ZV8oKTtcblxuICAgIGlmIChzaG91bGRGaXJlSW5wdXQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SW5wdXQoKTtcbiAgICAgIGlmICh0aGlzLmlzRGlzY3JldGVfKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0TWFya2VyVmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBxdWFudGl6ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIHF1YW50aXplXyh2YWx1ZSkge1xuICAgIGNvbnN0IG51bVN0ZXBzID0gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuc3RlcF8pO1xuICAgIGNvbnN0IHF1YW50aXplZFZhbCA9IG51bVN0ZXBzICogdGhpcy5zdGVwXztcbiAgICByZXR1cm4gcXVhbnRpemVkVmFsO1xuICB9XG5cbiAgdXBkYXRlVUlGb3JDdXJyZW50VmFsdWVfKCkge1xuICAgIGNvbnN0IHttYXhfOiBtYXgsIG1pbl86IG1pbiwgdmFsdWVfOiB2YWx1ZX0gPSB0aGlzO1xuICAgIGNvbnN0IHBjdENvbXBsZXRlID0gKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pO1xuICAgIGxldCB0cmFuc2xhdGVQeCA9IHBjdENvbXBsZXRlICogdGhpcy5yZWN0Xy53aWR0aDtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1JUTCgpKSB7XG4gICAgICB0cmFuc2xhdGVQeCA9IHRoaXMucmVjdF8ud2lkdGggLSB0cmFuc2xhdGVQeDtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2Zvcm1Qcm9wID0gZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSh3aW5kb3csICd0cmFuc2Zvcm0nKTtcbiAgICBjb25zdCB0cmFuc2l0aW9uZW5kRXZ0TmFtZSA9IGdldENvcnJlY3RFdmVudE5hbWUod2luZG93LCAndHJhbnNpdGlvbmVuZCcpO1xuXG4gICAgaWYgKHRoaXMuaW5UcmFuc2l0Xykge1xuICAgICAgY29uc3Qgb25UcmFuc2l0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEluVHJhbnNpdF8oZmFsc2UpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcih0cmFuc2l0aW9uZW5kRXZ0TmFtZSwgb25UcmFuc2l0aW9uRW5kKTtcbiAgICAgIH07XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIodHJhbnNpdGlvbmVuZEV2dE5hbWUsIG9uVHJhbnNpdGlvbkVuZCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVVSUZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBOT1RFKHRyYXZpc2thdWZtYW4pOiBJdCB3b3VsZCBiZSBuaWNlIHRvIHVzZSBjYWxjKCkgaGVyZSxcbiAgICAgIC8vIGJ1dCBJRSBjYW5ub3QgaGFuZGxlIGNhbGNzIGluIHRyYW5zZm9ybXMgY29ycmVjdGx5LlxuICAgICAgLy8gU2VlOiBodHRwczovL2dvby5nbC9OQzJpdGtcbiAgICAgIC8vIEFsc28gbm90ZSB0aGF0IHRoZSAtNTAlIG9mZnNldCBpcyB1c2VkIHRvIGNlbnRlciB0aGUgc2xpZGVyIHRodW1iLlxuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUaHVtYkNvbnRhaW5lclN0eWxlUHJvcGVydHkodHJhbnNmb3JtUHJvcCwgYHRyYW5zbGF0ZVgoJHt0cmFuc2xhdGVQeH1weCkgdHJhbnNsYXRlWCgtNTAlKWApO1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUcmFja1N0eWxlUHJvcGVydHkodHJhbnNmb3JtUHJvcCwgYHNjYWxlWCgke3BjdENvbXBsZXRlfSlgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBhY3RpdmUgc3RhdGUgb2YgdGhlIHNsaWRlclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2ZVxuICAgKi9cbiAgc2V0QWN0aXZlXyhhY3RpdmUpIHtcbiAgICB0aGlzLmFjdGl2ZV8gPSBhY3RpdmU7XG4gICAgdGhpcy50b2dnbGVDbGFzc18oY3NzQ2xhc3Nlcy5BQ1RJVkUsIHRoaXMuYWN0aXZlXyk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgaW5UcmFuc2l0IHN0YXRlIG9mIHRoZSBzbGlkZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBpblRyYW5zaXRcbiAgICovXG4gIHNldEluVHJhbnNpdF8oaW5UcmFuc2l0KSB7XG4gICAgdGhpcy5pblRyYW5zaXRfID0gaW5UcmFuc2l0O1xuICAgIHRoaXMudG9nZ2xlQ2xhc3NfKGNzc0NsYXNzZXMuSU5fVFJBTlNJVCwgdGhpcy5pblRyYW5zaXRfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IGFkZHMgb3IgcmVtb3ZlcyBhIGNsYXNzIGJhc2VkIG9uIHNob3VsZEJlUHJlc2VudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkQmVQcmVzZW50XG4gICAqL1xuICB0b2dnbGVDbGFzc18oY2xhc3NOYW1lLCBzaG91bGRCZVByZXNlbnQpIHtcbiAgICBpZiAoc2hvdWxkQmVQcmVzZW50KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDU2xpZGVyRm91bmRhdGlvbjtcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdlxuICAgIDpjbGFzcz1cImNsYXNzZXNcIlxuICAgIGNsYXNzPVwibWRjLXNsaWRlclwiXG4gICAgdGFiaW5kZXg9XCIwXCJcbiAgICByb2xlPVwic2xpZGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdlxuICAgICAgICA6c3R5bGU9XCJ0cmFja1N0eWxlc1wiXG4gICAgICAgIGNsYXNzPVwibWRjLXNsaWRlcl9fdHJhY2tcIi8+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJoYXNNYXJrZXJzXCJcbiAgICAgICAgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFjay1tYXJrZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICB2LWZvcj1cIm1hcmtlck51bSBpbiBudW1NYXJrZXJzXCJcbiAgICAgICAgICA6a2V5PVwibWFya2VyTnVtXCJcbiAgICAgICAgICA6c3R5bGU9XCIobWFya2VyTnVtID09IG51bU1hcmtlcnMpID8gbGFzdFRyYWNrTWFya2Vyc1N0eWxlcyA6IHt9XCJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrLW1hcmtlclwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICByZWY9XCJ0aHVtYkNvbnRhaW5lclwiXG4gICAgICA6c3R5bGU9XCJ0aHVtYlN0eWxlc1wiXG4gICAgICBjbGFzcz1cIm1kYy1zbGlkZXJfX3RodW1iLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdlxuICAgICAgICB2LWlmPVwiaXNEaXNjcmV0ZVwiXG4gICAgICAgIGNsYXNzPVwibWRjLXNsaWRlcl9fcGluXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibWRjLXNsaWRlcl9fcGluLXZhbHVlLW1hcmtlclwiPnt7IG1hcmtlclZhbHVlIH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3ZnXG4gICAgICAgIGNsYXNzPVwibWRjLXNsaWRlcl9fdGh1bWJcIlxuICAgICAgICB3aWR0aD1cIjIxXCJcbiAgICAgICAgaGVpZ2h0PVwiMjFcIj5cbiAgICAgICAgPGNpcmNsZVxuICAgICAgICAgIGN4PVwiMTAuNVwiXG4gICAgICAgICAgY3k9XCIxMC41XCJcbiAgICAgICAgICByPVwiNy44NzVcIi8+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX19mb2N1cy1yaW5nXCIvPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDU2xpZGVyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvc2xpZGVyL2ZvdW5kYXRpb24nXG5pbXBvcnQgeyBEaXNwYXRjaEZvY3VzTWl4aW4sIGFwcGx5UGFzc2l2ZSB9IGZyb20gJy4uL2Jhc2UnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1zbGlkZXInLFxuICBtaXhpbnM6IFtEaXNwYXRjaEZvY3VzTWl4aW5dLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICd2YWx1ZScsXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgbWluOiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IDAgfSxcbiAgICBtYXg6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogMTAwIH0sXG4gICAgc3RlcDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiAwIH0sXG4gICAgZGlzcGxheU1hcmtlcnM6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgbGF5b3V0T246IFN0cmluZyxcbiAgICBsYXlvdXRPblNvdXJjZTogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiBmYWxzZSB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy1zbGlkZXItLWRpc2NyZXRlJzogISF0aGlzLnN0ZXAsXG4gICAgICAgICdtZGMtc2xpZGVyLS1kaXNwbGF5LW1hcmtlcnMnOiB0aGlzLmRpc3BsYXlNYXJrZXJzXG4gICAgICB9LFxuICAgICAgdHJhY2tTdHlsZXM6IHt9LFxuICAgICAgbGFzdFRyYWNrTWFya2Vyc1N0eWxlczoge30sXG4gICAgICB0aHVtYlN0eWxlczoge30sXG4gICAgICBtYXJrZXJWYWx1ZTogJycsXG4gICAgICBudW1NYXJrZXJzOiAwXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGlzRGlzY3JldGUoKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnN0ZXBcbiAgICB9LFxuICAgIGhhc01hcmtlcnMoKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnN0ZXAgJiYgdGhpcy5kaXNwbGF5TWFya2VycyAmJiB0aGlzLm51bU1hcmtlcnNcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWUoKSB7XG4gICAgICBpZiAodGhpcy5mb3VuZGF0aW9uLmdldFZhbHVlKCkgIT09IE51bWJlcih0aGlzLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24uc2V0VmFsdWUodGhpcy52YWx1ZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIG1pbigpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNaW4oTnVtYmVyKHRoaXMubWluKSlcbiAgICB9LFxuICAgIG1heCgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNYXgoTnVtYmVyKHRoaXMubWF4KSlcbiAgICB9LFxuICAgIHN0ZXAoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0U3RlcChOdW1iZXIodGhpcy5zdGVwKSlcbiAgICB9LFxuICAgIGRpc2FibGVkKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENTbGlkZXJGb3VuZGF0aW9uKHtcbiAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICB9LFxuICAgICAgZ2V0QXR0cmlidXRlOiBuYW1lID0+IHRoaXMuJGVsLmdldEF0dHJpYnV0ZShuYW1lKSxcbiAgICAgIHNldEF0dHJpYnV0ZTogKG5hbWUsIHZhbHVlKSA9PiB0aGlzLiRlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpLFxuICAgICAgcmVtb3ZlQXR0cmlidXRlOiBuYW1lID0+IHRoaXMuJGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHRoaXMuJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgZ2V0VGFiSW5kZXg6ICgpID0+IHRoaXMuJGVsLnRhYkluZGV4LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSlcbiAgICAgIH0sXG4gICAgICByZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLnRodW1iQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgIGFwcGx5UGFzc2l2ZSgpXG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMudGh1bWJDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgYXBwbHlQYXNzaXZlKClcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogaGFuZGxlciA9PiB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBoYW5kbGVyID0+IHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgbm90aWZ5SW5wdXQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSlcbiAgICAgIH0sXG4gICAgICBub3RpZnlDaGFuZ2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5mb3VuZGF0aW9uLmdldFZhbHVlKCkpXG4gICAgICB9LFxuICAgICAgc2V0VGh1bWJDb250YWluZXJTdHlsZVByb3BlcnR5OiAocHJvcGVydHlOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy50aHVtYlN0eWxlcywgcHJvcGVydHlOYW1lLCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBzZXRUcmFja1N0eWxlUHJvcGVydHk6IChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnRyYWNrU3R5bGVzLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIHNldE1hcmtlclZhbHVlOiB2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMubWFya2VyVmFsdWUgPSB2YWx1ZVxuICAgICAgfSxcbiAgICAgIGFwcGVuZFRyYWNrTWFya2VyczogbnVtTWFya2VycyA9PiB7XG4gICAgICAgIHRoaXMubnVtTWFya2VycyA9IG51bU1hcmtlcnNcbiAgICAgIH0sXG4gICAgICByZW1vdmVUcmFja01hcmtlcnM6ICgpID0+IHtcbiAgICAgICAgdGhpcy5udW1NYXJrZXJzID0gMFxuICAgICAgfSxcbiAgICAgIHNldExhc3RUcmFja01hcmtlcnNTdHlsZVByb3BlcnR5OiAocHJvcGVydHlOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5sYXN0VHJhY2tNYXJrZXJzU3R5bGVzLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIGlzUlRMOiAoKSA9PiBmYWxzZVxuICAgIH0pXG5cbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpXG4gICAgaWYgKE51bWJlcih0aGlzLm1pbikgPD0gdGhpcy5mb3VuZGF0aW9uLmdldE1heCgpKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0TWluKE51bWJlcih0aGlzLm1pbikpXG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0TWF4KE51bWJlcih0aGlzLm1heCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNYXgoTnVtYmVyKHRoaXMubWF4KSlcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNaW4oTnVtYmVyKHRoaXMubWluKSlcbiAgICB9XG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldFN0ZXAoTnVtYmVyKHRoaXMuc3RlcCkpXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKE51bWJlcih0aGlzLnZhbHVlKSlcbiAgICBpZiAodGhpcy5oYXNNYXJrZXJzKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0dXBUcmFja01hcmtlcigpXG4gICAgfVxuXG4gICAgdGhpcy4kcm9vdC4kb24oJ3ZtYTpsYXlvdXQnLCB0aGlzLmxheW91dClcblxuICAgIGlmICh0aGlzLmxheW91dE9uKSB7XG4gICAgICB0aGlzLmxheW91dE9uRXZlbnRTb3VyY2UgPSB0aGlzLmxheW91dE9uU291cmNlIHx8IHRoaXMuJHJvb3RcbiAgICAgIHRoaXMubGF5b3V0T25FdmVudFNvdXJjZS4kb24odGhpcy5sYXlvdXRPbiwgdGhpcy5sYXlvdXQpXG4gICAgfVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuJHJvb3QuJG9mZigndm1hOmxheW91dCcsIHRoaXMubGF5b3V0KVxuICAgIGlmICh0aGlzLmxheW91dE9uRXZlbnRTb3VyY2UpIHtcbiAgICAgIHRoaXMubGF5b3V0T25FdmVudFNvdXJjZS4kb2ZmKHRoaXMubGF5b3V0T24sIHRoaXMubGF5b3V0KVxuICAgIH1cbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBsYXlvdXQoKSB7XG4gICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24ubGF5b3V0KClcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IEJhc2VQbHVnaW4gfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1NsaWRlciBmcm9tICcuL21kYy1zbGlkZXIudnVlJ1xuXG5leHBvcnQgeyBtZGNTbGlkZXIgfVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjU2xpZGVyXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHsgYXV0b0luaXQgfSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJzdXBwb3J0c1Bhc3NpdmVfIiwiYXBwbHlQYXNzaXZlIiwiZ2xvYmFsT2JqIiwid2luZG93IiwiZm9yY2VSZWZyZXNoIiwidW5kZWZpbmVkIiwiaXNTdXBwb3J0ZWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiZSIsImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJrZXkiLCJjb21wb25lbnQiLCJ2bSIsIm5hbWUiLCJEaXNwYXRjaEZvY3VzTWl4aW4iLCJkYXRhIiwiaGFzRm9jdXMiLCJtZXRob2RzIiwib25Nb3VzZURvd24iLCJfYWN0aXZlIiwib25Nb3VzZVVwIiwib25Gb2N1c0V2ZW50Iiwic2V0VGltZW91dCIsImRpc3BhdGNoRm9jdXNFdmVudCIsIm9uQmx1ckV2ZW50IiwiJGVsIiwiYWN0aXZlRWxlbWVudCIsImNvbnRhaW5zIiwiJGVtaXQiLCJtb3VudGVkIiwiYmVmb3JlRGVzdHJveSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzY29wZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiY3NzQ2xhc3NlcyIsIkFDVElWRSIsIkRJU0FCTEVEIiwiRElTQ1JFVEUiLCJGT0NVUyIsIklOX1RSQU5TSVQiLCJJU19ESVNDUkVURSIsIkhBU19UUkFDS19NQVJLRVIiLCJzdHJpbmdzIiwiVFJBQ0tfU0VMRUNUT1IiLCJUUkFDS19NQVJLRVJfQ09OVEFJTkVSX1NFTEVDVE9SIiwiTEFTVF9UUkFDS19NQVJLRVJfU0VMRUNUT1IiLCJUSFVNQl9DT05UQUlORVJfU0VMRUNUT1IiLCJQSU5fVkFMVUVfTUFSS0VSX1NFTEVDVE9SIiwiQVJJQV9WQUxVRU1JTiIsIkFSSUFfVkFMVUVNQVgiLCJBUklBX1ZBTFVFTk9XIiwiQVJJQV9ESVNBQkxFRCIsIlNURVBfREFUQV9BVFRSIiwiQ0hBTkdFX0VWRU5UIiwiSU5QVVRfRVZFTlQiLCJudW1iZXJzIiwiUEFHRV9GQUNUT1IiLCJNRENTbGlkZXJBZGFwdGVyIiwiY2xhc3NOYW1lIiwidmFsdWUiLCJ0eXBlIiwiaGFuZGxlciIsInByb3BlcnR5TmFtZSIsIm51bU1hcmtlcnMiLCJldmVudFR5cGVNYXAiLCJub1ByZWZpeCIsIndlYmtpdFByZWZpeCIsInN0eWxlUHJvcGVydHkiLCJjc3NQcm9wZXJ0eU1hcCIsImhhc1Byb3BlclNoYXBlIiwid2luZG93T2JqIiwiZXZlbnRGb3VuZEluTWFwcyIsImV2ZW50VHlwZSIsImdldEphdmFTY3JpcHRFdmVudE5hbWUiLCJtYXAiLCJlbCIsInN0eWxlIiwiZ2V0QW5pbWF0aW9uTmFtZSIsImV2ZW50TmFtZSIsImdldENvcnJlY3RFdmVudE5hbWUiLCJnZXRDb3JyZWN0UHJvcGVydHlOYW1lIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIktFWV9JRFMiLCJBUlJPV19MRUZUIiwiQVJST1dfUklHSFQiLCJBUlJPV19VUCIsIkFSUk9XX0RPV04iLCJIT01FIiwiRU5EIiwiUEFHRV9VUCIsIlBBR0VfRE9XTiIsIk1PVkVfRVZFTlRfTUFQIiwiRE9XTl9FVkVOVFMiLCJVUF9FVkVOVFMiLCJNRENTbGlkZXJGb3VuZGF0aW9uIiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0VGFiSW5kZXgiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsIm5vdGlmeUlucHV0Iiwibm90aWZ5Q2hhbmdlIiwic2V0VGh1bWJDb250YWluZXJTdHlsZVByb3BlcnR5Iiwic2V0VHJhY2tTdHlsZVByb3BlcnR5Iiwic2V0TWFya2VyVmFsdWUiLCJhcHBlbmRUcmFja01hcmtlcnMiLCJyZW1vdmVUcmFja01hcmtlcnMiLCJzZXRMYXN0VHJhY2tNYXJrZXJzU3R5bGVQcm9wZXJ0eSIsImlzUlRMIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJkZWZhdWx0QWRhcHRlciIsInJlY3RfIiwic2F2ZWRUYWJJbmRleF8iLCJOYU4iLCJhY3RpdmVfIiwiaW5UcmFuc2l0XyIsImlzRGlzY3JldGVfIiwiaGFzVHJhY2tNYXJrZXJfIiwiaGFuZGxpbmdUaHVtYlRhcmdldEV2dF8iLCJtaW5fIiwibWF4XyIsInN0ZXBfIiwidmFsdWVfIiwiZGlzYWJsZWRfIiwicHJldmVudEZvY3VzU3RhdGVfIiwidXBkYXRlVUlGcmFtZV8iLCJ0aHVtYkNvbnRhaW5lclBvaW50ZXJIYW5kbGVyXyIsImludGVyYWN0aW9uU3RhcnRIYW5kbGVyXyIsImV2dCIsImhhbmRsZURvd25fIiwia2V5ZG93bkhhbmRsZXJfIiwiaGFuZGxlS2V5ZG93bl8iLCJmb2N1c0hhbmRsZXJfIiwiaGFuZGxlRm9jdXNfIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1cl8iLCJyZXNpemVIYW5kbGVyXyIsImxheW91dCIsImZvckVhY2giLCJldnROYW1lIiwiZ2V0U3RlcCIsIm1pbiIsImdldE1pbiIsIm1heCIsImdldE1heCIsInN0ZXAiLCJpbmRpdmlzaWJsZSIsImNlaWwiLCJsYXN0U3RlcFJhdGlvIiwiZmxleCIsIlN0cmluZyIsInVwZGF0ZVVJRm9yQ3VycmVudFZhbHVlXyIsInNldFZhbHVlXyIsIkVycm9yIiwic2V0dXBUcmFja01hcmtlciIsImRpc2FibGVkIiwidG9nZ2xlQ2xhc3NfIiwiaXNOYU4iLCJzZXRJblRyYW5zaXRfIiwic2V0QWN0aXZlXyIsIm1vdmVIYW5kbGVyIiwiaGFuZGxlTW92ZV8iLCJ1cEhhbmRsZXIiLCJoYW5kbGVVcF8iLCJzZXRWYWx1ZUZyb21FdnRfIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXRUb3VjaGVzIiwibGVuZ3RoIiwicGFnZVgiLCJnZXRQYWdlWF8iLCJjb21wdXRlVmFsdWVGcm9tUGFnZVhfIiwieFBvcyIsInBjdENvbXBsZXRlIiwia2V5SWQiLCJnZXRLZXlJZF8iLCJnZXRWYWx1ZUZvcktleUlkXyIsImtiZEV2dCIsImtleUNvZGUiLCJkZWx0YSIsInZhbHVlTmVlZHNUb0JlRmxpcHBlZCIsInNob3VsZEZpcmVJbnB1dCIsImZvcmNlIiwidmFsdWVTZXRUb0JvdW5kYXJ5IiwicXVhbnRpemVfIiwibnVtU3RlcHMiLCJyb3VuZCIsInF1YW50aXplZFZhbCIsInRyYW5zbGF0ZVB4IiwidHJhbnNmb3JtUHJvcCIsInRyYW5zaXRpb25lbmRFdnROYW1lIiwib25UcmFuc2l0aW9uRW5kIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYWN0aXZlIiwiaW5UcmFuc2l0Iiwic2hvdWxkQmVQcmVzZW50IiwicmVuZGVyIiwibWl4aW5zIiwibW9kZWwiLCJwcm9wIiwiZXZlbnQiLCJwcm9wcyIsIk51bWJlciIsImRlZmF1bHQiLCJkaXNwbGF5TWFya2VycyIsIkJvb2xlYW4iLCJsYXlvdXRPbiIsImxheW91dE9uU291cmNlIiwiT2JqZWN0IiwicmVxdWlyZWQiLCJjbGFzc2VzIiwidHJhY2tTdHlsZXMiLCJsYXN0VHJhY2tNYXJrZXJzU3R5bGVzIiwidGh1bWJTdHlsZXMiLCJtYXJrZXJWYWx1ZSIsImNvbXB1dGVkIiwiaXNEaXNjcmV0ZSIsImhhc01hcmtlcnMiLCJ3YXRjaCIsImZvdW5kYXRpb24iLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwic2V0TWluIiwic2V0TWF4Iiwic2V0U3RlcCIsInNldERpc2FibGVkIiwiY2xhc3NMaXN0IiwiJHNldCIsIiRkZWxldGUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0YWJJbmRleCIsIiRyZWZzIiwidGh1bWJDb250YWluZXIiLCJib2R5IiwiaW5pdCIsIiRyb290IiwiJG9uIiwibGF5b3V0T25FdmVudFNvdXJjZSIsIiRvZmYiLCJkZXN0cm95IiwiJG5leHRUaWNrIiwibWRjU2xpZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsSUFBSUEseUJBQUo7O0VBRUE7Ozs7OztB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
