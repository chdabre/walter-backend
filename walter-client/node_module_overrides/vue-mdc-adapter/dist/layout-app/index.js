/**
* @module vue-mdc-adapterlayout-app 0.17.0
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

var scope = Math.floor(Math.random() * Math.floor(0x10000000)).toString() + '-';

var mdcLayoutApp = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-app" }, [_c('div', { staticClass: "mdc-layout-app--toolbar-wrapper" }, [_vm._t("toolbar")], 2), _vm._v(" "), _c('div', { staticClass: "mdc-layout-app--main-container" }, [_c('div', { staticClass: "mdc-layout-app--drawer-wrapper" }, [_vm._t("drawer")], 2), _vm._v(" "), _c('div', { staticClass: "mdc-layout-app--content-wrapper" }, [_vm._t("default")], 2)])]);
  }, staticRenderFns: [],
  name: 'mdc-layout-app'
};

var index = BasePlugin({
  mdcLayoutApp: mdcLayoutApp
});

export default index;
export { mdcLayoutApp };
//# sourceMappingURL=index.js.map
