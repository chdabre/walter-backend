/**
* @module vue-mdc-adaptertheme 0.17.0
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

var CustomElement = {
  functional: true,
  render: function render(createElement, context) {
    return createElement(context.props.is || context.props.tag || 'div', context.data, context.children);
  }
};

/* global CustomEvent */

var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

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

var index = BasePlugin({
  mdcTheme: mdcTheme
});

export default index;
export { mdcTheme };
//# sourceMappingURL=index.js.map
