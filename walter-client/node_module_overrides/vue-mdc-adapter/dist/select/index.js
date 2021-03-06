/**
* @module vue-mdc-adapterselect 0.17.0
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

import { RippleBase } from '../ripple';

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

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* global CustomEvent */

var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

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
var cssClasses = {
  BOX: 'mdc-select--box',
  DISABLED: 'mdc-select--disabled',
  ROOT: 'mdc-select',
  OUTLINED: 'mdc-select--outlined'
};

var strings = {
  CHANGE_EVENT: 'MDCSelect:change',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
  LABEL_SELECTOR: '.mdc-floating-label',
  NATIVE_CONTROL_SELECTOR: '.mdc-select__native-control',
  OUTLINE_SELECTOR: '.mdc-notched-outline'
};

/** @enum {number} */
var numbers = {
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
      return cssClasses;
    }
  }, {
    key: 'numbers',
    get: function get$$1() {
      return numbers;
    }
  }, {
    key: 'strings',
    get: function get$$1() {
      return strings;
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
        var labelScale = numbers.LABEL_SCALE;
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
var cssClasses$1 = {
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
      return cssClasses$1;
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
var cssClasses$2 = {
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
      return cssClasses$2;
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
      this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
      this.adapter_.addClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
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
      this.adapter_.addClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
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
      var isDeactivating = this.adapter_.hasClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);

      if (evt.propertyName === 'opacity') {
        if (isDeactivating) {
          this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
          this.adapter_.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
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
var strings$1 = {
  PATH_SELECTOR: '.mdc-notched-outline__path',
  IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle'
};

/** @enum {string} */
var cssClasses$3 = {
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
      return strings$1;
    }

    /** @return enum {string} */

  }, {
    key: 'cssClasses',
    get: function get$$1() {
      return cssClasses$3;
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

var index = BasePlugin({
  mdcSelect: mdcSelect
});

export default index;
export { mdcSelect };
//# sourceMappingURL=index.js.map
