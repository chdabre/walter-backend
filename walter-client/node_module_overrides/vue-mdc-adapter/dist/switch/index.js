/**
* @module vue-mdc-adapterswitch 0.17.0
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

var VMAUniqueIdMixin = {
  beforeCreate: function beforeCreate() {
    this.vma_uid_ = scope + this._uid;
  }
};

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

var index = BasePlugin({
  mdcSwitch: mdcSwitch
});

export default index;
export { mdcSwitch };
//# sourceMappingURL=index.js.map
