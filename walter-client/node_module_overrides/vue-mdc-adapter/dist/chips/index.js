/**
* @module vue-mdc-adapterchips 0.17.0
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

import { RippleBase } from '../ripple';

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
var strings = {
  ENTRY_ANIMATION_NAME: 'mdc-chip-entry',
  INTERACTION_EVENT: 'MDCChip:interaction',
  TRAILING_ICON_INTERACTION_EVENT: 'MDCChip:trailingIconInteraction',
  REMOVAL_EVENT: 'MDCChip:removal',
  CHECKMARK_SELECTOR: '.mdc-chip__checkmark',
  LEADING_ICON_SELECTOR: '.mdc-chip__icon--leading',
  TRAILING_ICON_SELECTOR: '.mdc-chip__icon--trailing'
};

/** @enum {string} */
var cssClasses = {
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
      return strings;
    }

    /** @return enum {string} */

  }, {
    key: 'cssClasses',
    get: function get$$1() {
      return cssClasses;
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
      return this.adapter_.hasClass(cssClasses.SELECTED);
    }

    /**
     * @param {boolean} selected
     */

  }, {
    key: 'setSelected',
    value: function setSelected(selected) {
      if (selected) {
        this.adapter_.addClass(cssClasses.SELECTED);
      } else {
        this.adapter_.removeClass(cssClasses.SELECTED);
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
      this.adapter_.addClass(cssClasses.CHIP_EXIT);
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
      if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.CHIP_EXIT)) {
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
      if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.LEADING_ICON) && this.adapter_.hasClass(cssClasses.SELECTED)) {
        this.adapter_.addClassToLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
      } else if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.CHECKMARK) && !this.adapter_.hasClass(cssClasses.SELECTED)) {
        this.adapter_.removeClassFromLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
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
var strings$1 = {
  CHIP_SELECTOR: '.mdc-chip'
};

/** @enum {string} */
var cssClasses$1 = {
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
      return strings$1;
    }

    /** @return enum {string} */

  }, {
    key: 'cssClasses',
    get: function get$$1() {
      return cssClasses$1;
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
      if (this.adapter_.hasClass(cssClasses$1.CHOICE)) {
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
      if (this.adapter_.hasClass(cssClasses$1.CHOICE) || this.adapter_.hasClass(cssClasses$1.FILTER)) {
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

var index = BasePlugin({
  mdcChip: mdcChip,
  mdcChipSet: mdcChipSet
});

export default index;
export { mdcChip, mdcChipSet };
//# sourceMappingURL=index.js.map
