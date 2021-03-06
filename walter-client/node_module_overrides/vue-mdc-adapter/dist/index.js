/**
* @module vue-mdc-adapter 0.17.0
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

import VueMDCRipple, { RippleMixin } from './ripple'
import VueMDCButton from './button'
import VueMDCCard from './card'
import VueMDCCheckbox from './checkbox'
import VueMDCChipSet from './chips'
import VueMDCDialog from './dialog'
import VueMDCDrawer from './drawer'
import VueMDCElevation from './elevation'
import VueMDCFab from './fab'
import VueMDCGridList from './grid-list'
import VueMDCIcon from './icon'
import VueMDCIconToggle from './icon-toggle'
import VueMDCLayoutApp from './layout-app'
import VueMDCLayoutGrid from './layout-grid'
import VueMDCLinearProgress from './linear-progress'
import VueMDCList from './list'
import VueMDCMenu from './menu'
import VueMDCRadio from './radio'
import VueMDCSelect from './select'
import VueMDCSlider from './slider'
import VueMDCSnackbar from './snackbar'
import VueMDCSwitch from './switch'
import VueMDCTabs from './tabs'
import VueMDCTextfield from './textfield'
import VueMDCTheme from './theme'
import VueMDCToolbar from './toolbar'
import VueMDCTypography from './typography'

function BasePlugin (components) {
  return {
    version: '0.17.0',
    install: function install (vm) {
      for (var key in components) {
        var component = components[key]
        vm.component(component.name, component)
      }
    },
    components: components
  }
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var createClass = (function () {
  function defineProperties (target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
}())

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i]

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }

  return target
}

var get = function get (object, property, receiver) {
  if (object === null) object = Function.prototype
  var desc = Object.getOwnPropertyDescriptor(object, property)

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object)

    if (parent === null) {
      return undefined
    } else {
      return get(parent, property, receiver)
    }
  } else if ('value' in desc) {
    return desc.value
  } else {
    var getter = desc.get

    if (getter === undefined) {
      return undefined
    }

    return getter.call(receiver)
  }
}

var inherits = function (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass)
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  // eslint-disable-next-line no-proto
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
}

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }

  return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]

    return arr2
  } else {
    return Array.from(arr)
  }
}

var DispatchEventMixin = {
  props: {
    event: String,
    'event-target': Object,
    'event-args': Array
  },
  methods: {
    dispatchEvent: function dispatchEvent (evt) {
      evt && this.$emit(evt.type, evt)
      if (this.event) {
        var target = this.eventTarget || this.$root
        var args = this.eventArgs || []
        target.$emit.apply(target, [this.event].concat(toConsumableArray(args)))
      }
    }
  },
  computed: {
    listeners: function listeners () {
      var _this = this

      return _extends({}, this.$listeners, {
        click: function click (e) {
          return _this.dispatchEvent(e)
        }
      })
    }
  }
}

// var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-'

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
var cssClasses = {
  FIXED_CLASS: 'mdc-top-app-bar--fixed',
  FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
  SHORT_CLASS: 'mdc-top-app-bar--short',
  SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
  SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed'
}

/** @enum {number} */
var numbers = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
}

/** @enum {string} */
var strings = {
  ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
  NAVIGATION_EVENT: 'MDCTopAppBar:nav',
  NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
  ROOT_SELECTOR: '.mdc-top-app-bar',
  TITLE_SELECTOR: '.mdc-top-app-bar__title'
}

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
var MDCTopAppBarAdapter = (function () {
  function MDCTopAppBarAdapter () {
    classCallCheck(this, MDCTopAppBarAdapter)
  }

  createClass(MDCTopAppBarAdapter, [{
    key: 'addClass',

    /**
     * Adds a class to the root Element.
     * @param {string} className
     */
    value: function addClass (className) {}

    /**
     * Removes a class from the root Element.
     * @param {string} className
     */

  }, {
    key: 'removeClass',
    value: function removeClass (className) {}

    /**
     * Returns true if the root Element contains the given class.
     * @param {string} className
     * @return {boolean}
     */

  }, {
    key: 'hasClass',
    value: function hasClass (className) {}

    /**
     * Sets the specified inline style property on the root Element to the given value.
     * @param {string} property
     * @param {string} value
     */

  }, {
    key: 'setStyle',
    value: function setStyle (property, value) {}

    /**
     * Gets the height of the top app bar.
     * @return {number}
     */

  }, {
    key: 'getTopAppBarHeight',
    value: function getTopAppBarHeight () {}

    /**
     * Registers an event handler on the navigation icon element for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: 'registerNavigationIconInteractionHandler',
    value: function registerNavigationIconInteractionHandler (type, handler) {}

    /**
     * Deregisters an event handler on the navigation icon element for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: 'deregisterNavigationIconInteractionHandler',
    value: function deregisterNavigationIconInteractionHandler (type, handler) {}

    /**
     * Emits an event when the navigation icon is clicked.
     */

  }, {
    key: 'notifyNavigationIconClicked',
    value: function notifyNavigationIconClicked () {}

    /** @param {function(!Event)} handler */

  }, {
    key: 'registerScrollHandler',
    value: function registerScrollHandler (handler) {}

    /** @param {function(!Event)} handler */

  }, {
    key: 'deregisterScrollHandler',
    value: function deregisterScrollHandler (handler) {}

    /** @param {function(!Event)} handler */

  }, {
    key: 'registerResizeHandler',
    value: function registerResizeHandler (handler) {}

    /** @param {function(!Event)} handler */

  }, {
    key: 'deregisterResizeHandler',
    value: function deregisterResizeHandler (handler) {}

    /** @return {number} */

  }, {
    key: 'getViewportScrollY',
    value: function getViewportScrollY () {}

    /** @return {number} */

  }, {
    key: 'getTotalActionItems',
    value: function getTotalActionItems () {}
  }])
  return MDCTopAppBarAdapter
}())

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
var MDCFoundation = (function () {
  createClass(MDCFoundation, null, [{
    key: 'cssClasses',

    /** @return enum{cssClasses} */
    get: function get$$1 () {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {}
    }

    /** @return enum{strings} */

  }, {
    key: 'strings',
    get: function get$$1 () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {}
    }

    /** @return enum{numbers} */

  }, {
    key: 'numbers',
    get: function get$$1 () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {}
    }

    /** @return {!Object} */

  }, {
    key: 'defaultAdapter',
    get: function get$$1 () {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {}
    }

    /**
     * @param {A=} adapter
     */

  }])

  function MDCFoundation () {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    classCallCheck(this, MDCFoundation)

    /** @protected {!A} */
    this.adapter_ = adapter
  }

  createClass(MDCFoundation, [{
    key: 'init',
    value: function init () {
      // Subclasses should override this method to perform initialization routines (registering events, etc.)
    }
  }, {
    key: 'destroy',
    value: function destroy () {
      // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    }
  }])
  return MDCFoundation
}())

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

var MDCTopAppBarBaseFoundation = (function (_MDCFoundation) {
  inherits(MDCTopAppBarBaseFoundation, _MDCFoundation)
  createClass(MDCTopAppBarBaseFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get$$1 () {
      return strings
    }

    /** @return enum {string} */

  }, {
    key: 'cssClasses',
    get: function get$$1 () {
      return cssClasses
    }

    /** @return enum {number} */

  }, {
    key: 'numbers',
    get: function get$$1 () {
      return numbers
    }

    /**
     * {@see MDCTopAppBarAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTopAppBarAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1 () {
      return (/** @type {!MDCTopAppBarAdapter} */{
        hasClass: function hasClass () /* className: string */{},
        addClass: function addClass () /* className: string */{},
        removeClass: function removeClass () /* className: string */{},
        setStyle: function setStyle () /* property: string, value: string */{},
        getTopAppBarHeight: function getTopAppBarHeight () {},
        registerNavigationIconInteractionHandler: function registerNavigationIconInteractionHandler () /* type: string, handler: EventListener */{},
        deregisterNavigationIconInteractionHandler: function deregisterNavigationIconInteractionHandler () /* type: string, handler: EventListener */{},
        notifyNavigationIconClicked: function notifyNavigationIconClicked () {},
        registerScrollHandler: function registerScrollHandler () /* handler: EventListener */{},
        deregisterScrollHandler: function deregisterScrollHandler () /* handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler () /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler () /* handler: EventListener */{},
        getViewportScrollY: function getViewportScrollY () {
          return (/* number */0
          )
        },
        getTotalActionItems: function getTotalActionItems () {
          return (/* number */0
          )
        }
      }
      )
    }

    /**
     * @param {!MDCTopAppBarAdapter} adapter
     */

  }])

  function MDCTopAppBarBaseFoundation (/** @type {!MDCTopAppBarAdapter} */adapter) {
    classCallCheck(this, MDCTopAppBarBaseFoundation)

    // eslint-disable-next-line no-proto
    var _this = possibleConstructorReturn(this, (MDCTopAppBarBaseFoundation.__proto__ || Object.getPrototypeOf(MDCTopAppBarBaseFoundation)).call(this, _extends(MDCTopAppBarBaseFoundation.defaultAdapter, adapter)))

    _this.navClickHandler_ = function () {
      return _this.adapter_.notifyNavigationIconClicked()
    }
    return _this
  }

  createClass(MDCTopAppBarBaseFoundation, [{
    key: 'init',
    value: function init () {
      this.adapter_.registerNavigationIconInteractionHandler('click', this.navClickHandler_)
    }
  }, {
    key: 'destroy',
    value: function destroy () {
      this.adapter_.deregisterNavigationIconInteractionHandler('click', this.navClickHandler_)
    }
  }])
  return MDCTopAppBarBaseFoundation
}(MDCFoundation))

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

var MDCShortTopAppBarFoundation = (function (_MDCTopAppBarBaseFoun) {
  inherits(MDCShortTopAppBarFoundation, _MDCTopAppBarBaseFoun)

  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  function MDCShortTopAppBarFoundation (adapter) {
    classCallCheck(this, MDCShortTopAppBarFoundation)

    // State variable for the current top app bar state
    // eslint-disable-next-line no-proto
    var _this = possibleConstructorReturn(this, (MDCShortTopAppBarFoundation.__proto__ || Object.getPrototypeOf(MDCShortTopAppBarFoundation)).call(this, adapter))

    _this.isCollapsed = false

    _this.scrollHandler_ = function () {
      return _this.shortAppBarScrollHandler_()
    }
    return _this
  }

  createClass(MDCShortTopAppBarFoundation, [{
    key: 'init',
    value: function init () {
      // eslint-disable-next-line no-proto
      get(MDCShortTopAppBarFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCShortTopAppBarFoundation.prototype), 'init', this).call(this)
      var isAlwaysCollapsed = this.adapter_.hasClass(cssClasses.SHORT_COLLAPSED_CLASS)

      if (this.adapter_.getTotalActionItems() > 0) {
        this.adapter_.addClass(cssClasses.SHORT_HAS_ACTION_ITEM_CLASS)
      }

      if (!isAlwaysCollapsed) {
        this.adapter_.registerScrollHandler(this.scrollHandler_)
        this.shortAppBarScrollHandler_()
      }
    }
  }, {
    key: 'destroy',
    value: function destroy () {
      // eslint-disable-next-line no-proto
      get(MDCShortTopAppBarFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCShortTopAppBarFoundation.prototype), 'destroy', this).call(this)
      this.adapter_.deregisterScrollHandler(this.scrollHandler_)
    }

    /**
     * Scroll handler for applying/removing the collapsed modifier class
     * on the short top app bar.
     * @private
     */

  }, {
    key: 'shortAppBarScrollHandler_',
    value: function shortAppBarScrollHandler_ () {
      var currentScroll = this.adapter_.getViewportScrollY()

      if (currentScroll <= 0) {
        if (this.isCollapsed) {
          this.adapter_.removeClass(cssClasses.SHORT_COLLAPSED_CLASS)
          this.isCollapsed = false
        }
      } else {
        if (!this.isCollapsed) {
          this.adapter_.addClass(cssClasses.SHORT_COLLAPSED_CLASS)
          this.isCollapsed = true
        }
      }
    }
  }])
  return MDCShortTopAppBarFoundation
}(MDCTopAppBarBaseFoundation))

var mdcTopAppBar = {
  render: function render () {
    var _vm = this; var _h = _vm.$createElement; var _c = _vm._self._c || _h; return _c('header', _vm._g({ ref: 'root', class: _vm.rootClasses, style: _vm.rootStyles }, _vm.$listeners), [_c('div', { staticClass: 'mdc-top-app-bar__row' }, [_c('section', { staticClass: 'mdc-top-app-bar__section mdc-top-app-bar__section--align-start' }, [_vm.haveNavigationIcon ? _c('a', _vm._g({ ref: 'navigationIcon', class: _vm.naviconClasses, attrs: { href: '#' } }, _vm.listeners), [_vm._v(_vm._s(_vm.icon))]) : _vm._e(), _vm._v(' '), _vm.title ? _c('span', { staticClass: 'mdc-top-app-bar__title' }, [_vm._v(_vm._s(_vm.title))]) : _vm._e()]), _vm._v(' '), _vm.$slots.default ? _c('section', { staticClass: 'mdc-top-app-bar__section mdc-top-app-bar__section--align-end' }, [_vm._t('default')], 2) : _vm._e()]), _vm._v(' '), _vm.$slots.tabs ? _c('div', { staticClass: 'mdc-top-app-bar__row' }, [_vm._t('tabs')], 2) : _vm._e()])
  },
  staticRenderFns: [],
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
  data: function data () {
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
    }
  },

  computed: {
    haveNavigationIcon: function haveNavigationIcon () {
      return !!this.icon || this.iconClasses
    },
    naviconClasses: function naviconClasses () {
      return _extends({
        'mdc-top-app-bar__navigation-icon': true,
        'material-icons': !!this.icon
      }, this.iconClasses)
    }
  },
  mounted: function mounted () {
    var _this = this

    var adapter = {
      addClass: function addClass (className) {
        _this.$set(_this.rootClasses, className, true)
      },
      removeClass: function removeClass (className) {
        _this.$delete(_this.rootClasses, className)
      },
      hasClass: function hasClass (className) {
        return _this.$refs.root.classList.contains(className)
      },
      setStyle: function setStyle (property, value) {
        _this.$set(_this.rootStyles, property, value)
      },
      getTopAppBarHeight: function getTopAppBarHeight () {
        return _this.$el.clientHeight
      },
      registerNavigationIconInteractionHandler: function registerNavigationIconInteractionHandler (type, handler) {
        if (_this.$refs.navigationIcon) {
          _this.$refs.navigationIcon.addEventListener(type, handler)
        }
      },
      deregisterNavigationIconInteractionHandler: function deregisterNavigationIconInteractionHandler (type, handler) {
        if (_this.$refs.navigationIcon) {
          _this.$refs.navigationIcon.removeEventListener(type, handler)
        }
      },
      notifyNavigationIconClicked: function notifyNavigationIconClicked () {
        _this.$emit('nav')
      },
      registerScrollHandler: function registerScrollHandler (handler) {
        window.addEventListener('scroll', handler)
      },
      deregisterScrollHandler: function deregisterScrollHandler (handler) {
        window.removeEventListener('scroll', handler)
      },
      registerResizeHandler: function registerResizeHandler (handler) {
        return window.addEventListener('resize', handler)
      },
      deregisterResizeHandler: function deregisterResizeHandler (handler) {
        return window.removeEventListener('resize', handler)
      },

      getViewportScrollY: function getViewportScrollY () {
        return window.pageYOffset
      },
      getTotalActionItems: function getTotalActionItems () {
        return _this.$refs.root.querySelectorAll(MDCTopAppBarBaseFoundation.strings.ACTION_ITEM_SELECTOR).length
      }
    }

    this.foundation = this.short ? new MDCShortTopAppBarFoundation(adapter) : new MDCTopAppBarBaseFoundation(adapter)

    this.foundation.init()
  },
  beforeDestroy: function beforeDestroy () {
    this.foundation.destroy()
  }
}

var mdcTopAppBarAction = {
  render: function render () {
    var _vm = this; var _h = _vm.$createElement; var _c = _vm._self._c || _h; return _c('a', _vm._g({ staticClass: 'mdc-top-app-bar-action mdc-top-app-bar--action mdc-top-app-bar__action-item', class: _vm.actioniconClasses, attrs: { href: '#' } }, _vm.listeners), [_vm._t('default', [_vm._v(_vm._s(_vm.icon))])], 2)
  },
  staticRenderFns: [],
  name: 'mdc-top-app-bar-action',
  mixins: [DispatchEventMixin, RippleMixin],
  props: {
    icon: String,
    iconClasses: Object
  },
  computed: {
    actioniconClasses: function actioniconClasses () {
      return _extends({
        'material-icons': !!this.icon
      }, this.iconClasses)
    }
  }
}

var VueMDCTopAppBar = BasePlugin({
  mdcTopAppBar: mdcTopAppBar,
  mdcTopAppBarAction: mdcTopAppBarAction
})

//

var index = {
  version: '0.17.0',
  install: function install (vm) {
    vm.use(VueMDCButton)
    vm.use(VueMDCCard)
    vm.use(VueMDCCheckbox)
    vm.use(VueMDCChipSet)
    vm.use(VueMDCDialog)
    vm.use(VueMDCDrawer)
    vm.use(VueMDCElevation)
    vm.use(VueMDCFab)
    vm.use(VueMDCGridList)
    vm.use(VueMDCIcon)
    vm.use(VueMDCIconToggle)
    vm.use(VueMDCLayoutApp)
    vm.use(VueMDCLayoutGrid)
    vm.use(VueMDCLinearProgress)
    vm.use(VueMDCList)
    vm.use(VueMDCMenu)
    vm.use(VueMDCRadio)
    vm.use(VueMDCRipple)
    vm.use(VueMDCSelect)
    vm.use(VueMDCSlider)
    vm.use(VueMDCSnackbar)
    vm.use(VueMDCSwitch)
    vm.use(VueMDCTabs)
    vm.use(VueMDCTextfield)
    vm.use(VueMDCTheme)
    vm.use(VueMDCToolbar)
    vm.use(VueMDCTopAppBar)
    vm.use(VueMDCTypography)
  }
}

export default index

export { VueMDCButton }
export { VueMDCCard }
export { VueMDCCheckbox }
// export { VueMDCChips }
export { VueMDCDialog }
export { VueMDCDrawer }
export { VueMDCElevation }
export { VueMDCFab }
export { VueMDCGridList }
export { VueMDCIconToggle }
export { VueMDCIcon }
export { VueMDCLayoutApp }
export { VueMDCLayoutGrid }
export { VueMDCLinearProgress }
export { VueMDCList }
export { VueMDCMenu }
export { VueMDCRadio }
export { VueMDCRipple }
export { VueMDCSelect }
export { VueMDCSlider }
export { VueMDCSnackbar }
export { VueMDCSwitch }
export { VueMDCTabs }
export { VueMDCTextfield }
export { VueMDCTheme }
export { VueMDCToolbar }
export { VueMDCTypography }
export { MDCTopAppBarAdapter }

export * from './button'
export * from './card'
export * from './checkbox'
export * from './chips'
export * from './dialog'
export * from './drawer'
export * from './elevation'
export * from './fab'
export * from './grid-list'
export * from './icon-toggle'
export * from './icon'
export * from './layout-app'
export * from './layout-grid'
export * from './linear-progress'
export * from './list'
export * from './menu'
export * from './radio'
export * from './ripple'
export * from './select'
export * from './slider'
export * from './snackbar'
export * from './switch'
export * from './tabs'
export * from './textfield'
export * from './theme'
export * from './toolbar'
export * from './typography'
// # sourceMappingURL=index.js.map
