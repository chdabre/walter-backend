/**
* @module vue-mdc-adaptertoolbar 0.17.0
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

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

var cssClasses = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized'
};

var strings = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  ICON_SELECTOR: '.mdc-toolbar__icon',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change'
};

var numbers = {
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

var index = BasePlugin({
  mdcToolbar: mdcToolbar,
  mdcToolbarRow: mdcToolbarRow,
  mdcToolbarSection: mdcToolbarSection,
  mdcToolbarMenuIcon: mdcToolbarMenuIcon,
  mdcToolbarTitle: mdcToolbarTitle,
  mdcToolbarIcon: mdcToolbarIcon
});

export default index;
export { mdcToolbar, mdcToolbarRow, mdcToolbarSection, mdcToolbarMenuIcon, mdcToolbarTitle, mdcToolbarIcon };
//# sourceMappingURL=index.js.map
