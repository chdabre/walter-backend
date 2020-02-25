/**
* @module vue-mdc-adaptertheme 0.17.0
* @exports VueMDCTheme
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCTheme = factory());
}(this, (function () { 'use strict';

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

  var plugin = BasePlugin({
    mdcTheme: mdcTheme
  });

  // import './styles.scss'

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWVsZW1lbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL3VuaXF1ZWlkLW1peGluLmpzIiwiLi4vLi4vY29tcG9uZW50cy90aGVtZS9tZGMtdGhlbWUudnVlIiwiLi4vLi4vY29tcG9uZW50cy90aGVtZS9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdGhlbWUvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0KHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luKGNvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6IHZtID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50ID0ge1xuICBmdW5jdGlvbmFsOiB0cnVlLFxuICByZW5kZXIoY3JlYXRlRWxlbWVudCwgY29udGV4dCkge1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxuICAgICAgY29udGV4dC5wcm9wcy5pcyB8fCBjb250ZXh0LnByb3BzLnRhZyB8fCAnZGl2JyxcbiAgICAgIGNvbnRleHQuZGF0YSxcbiAgICAgIGNvbnRleHQuY2hpbGRyZW5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEN1c3RvbUVsZW1lbnRNaXhpbiA9IHtcbiAgY29tcG9uZW50czoge1xuICAgIEN1c3RvbUVsZW1lbnRcbiAgfVxufVxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiY29uc3Qgc2NvcGUgPVxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDB4MTAwMDAwMDApKS50b1N0cmluZygpICsgJy0nXG5cbmV4cG9ydCBjb25zdCBWTUFVbmlxdWVJZE1peGluID0ge1xuICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgdGhpcy52bWFfdWlkXyA9IHNjb3BlICsgdGhpcy5fdWlkXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGN1c3RvbS1lbGVtZW50IFxuICAgIDp0YWc9XCJ0YWdcIiBcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCJcbiAgICBjbGFzcz1cIm1kYy10aGVtZVwiPlxuICAgIDxzbG90IC8+XG4gIDwvY3VzdG9tLWVsZW1lbnQ+XG48L3RlbXBsYXRlPlxuXG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBDdXN0b21FbGVtZW50IH0gZnJvbSAnLi4vYmFzZSdcblxuY29uc3QgVEhFTUVfQ09MT1JTID0gW1xuICAncHJpbWFyeScsXG4gICdzZWNvbmRhcnknLFxuICAnYmFja2dyb3VuZCcsXG4gICdwcmltYXJ5LWxpZ2h0JyxcbiAgJ3NlY29uZGFyeS1saWdodCcsXG4gICdzZWNvbmRhcnktZGFyaycsXG4gICdwcmltYXJ5LWRhcmsnXG5dXG5cbmNvbnN0IFRIRU1FX1NUWUxFUyA9IFtcbiAgJ3RleHQtcHJpbWFyeScsXG4gICd0ZXh0LXNlY29uZGFyeScsXG4gICd0ZXh0LWhpbnQnLFxuICAndGV4dC1pY29uJyxcbiAgJ3RleHQtZGlzYWJsZWQnXG5dXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10aGVtZScsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBDdXN0b21FbGVtZW50XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdGFnOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJ2RpdicgfSxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIGJhY2tncm91bmQ6IFN0cmluZ1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMoKSB7XG4gICAgICBsZXQgY2xhc3NlcyA9IHt9XG5cbiAgICAgIGlmICh0aGlzLmNvbG9yICYmIFRIRU1FX0NPTE9SUy5pbmRleE9mKHRoaXMuY29sb3IpICE9PSAtMSkge1xuICAgICAgICBjbGFzc2VzW2BtZGMtdGhlbWUtLSR7dGhpcy5jb2xvcn1gXSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZCAmJiBUSEVNRV9DT0xPUlMuaW5kZXhPZih0aGlzLmJhY2tncm91bmQpICE9PSAtMSkge1xuICAgICAgICBjbGFzc2VzW2BtZGMtdGhlbWUtLSR7dGhpcy5iYWNrZ3JvdW5kfS1iZ2BdID0gdHJ1ZVxuXG4gICAgICAgIGlmICh0aGlzLmNvbG9yICYmIFRIRU1FX1NUWUxFUy5pbmRleE9mKHRoaXMuY29sb3IpICE9PSAtMSkge1xuICAgICAgICAgIGNsYXNzZXNbYG1kYy10aGVtZS0tJHt0aGlzLmNvbG9yfS1vbi0ke3RoaXMuYmFja2dyb3VuZH1gXSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNsYXNzZXNcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgQmFzZVBsdWdpbiB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjVGhlbWUgZnJvbSAnLi9tZGMtdGhlbWUudnVlJ1xuXG5leHBvcnQgeyBtZGNUaGVtZSB9XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNUaGVtZVxufSlcbiIsIi8vIGltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IGF1dG9Jbml0IH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsImtleSIsImNvbXBvbmVudCIsInZtIiwibmFtZSIsIkN1c3RvbUVsZW1lbnQiLCJmdW5jdGlvbmFsIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJwcm9wcyIsImlzIiwidGFnIiwiZGF0YSIsImNoaWxkcmVuIiwic2NvcGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsIlRIRU1FX0NPTE9SUyIsIlRIRU1FX1NUWUxFUyIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwiY29tcHV0ZWQiLCJjbGFzc2VzIiwiaW5kZXhPZiIsIm1kY1RoZW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0VBQU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7RUFDL0I7RUFDQSxNQUFJQyxPQUFPLElBQVg7RUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7RUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ3hDO0VBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7RUFDRDtFQUNELE1BQUlGLElBQUosRUFBVTtFQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7RUFDRDtFQUNGOztFQ1pNLFNBQVNNLFVBQVQsQ0FBb0JDLFVBQXBCLEVBQWdDO0VBQ3JDLFNBQU87RUFDTEMsYUFBUyxRQURKO0VBRUxDLGFBQVMscUJBQU07RUFDYixXQUFLLElBQUlDLEdBQVQsSUFBZ0JILFVBQWhCLEVBQTRCO0VBQzFCLFlBQUlJLFlBQVlKLFdBQVdHLEdBQVgsQ0FBaEI7RUFDQUUsV0FBR0QsU0FBSCxDQUFhQSxVQUFVRSxJQUF2QixFQUE2QkYsU0FBN0I7RUFDRDtFQUNGLEtBUEk7RUFRTEo7RUFSSyxHQUFQO0VBVUQ7O0VDWE0sSUFBTU8sZ0JBQWdCO0VBQzNCQyxjQUFZLElBRGU7RUFFM0JDLFFBRjJCLGtCQUVwQkMsYUFGb0IsRUFFTEMsT0FGSyxFQUVJO0VBQzdCLFdBQU9ELGNBQ0xDLFFBQVFDLEtBQVIsQ0FBY0MsRUFBZCxJQUFvQkYsUUFBUUMsS0FBUixDQUFjRSxHQUFsQyxJQUF5QyxLQURwQyxFQUVMSCxRQUFRSSxJQUZILEVBR0xKLFFBQVFLLFFBSEgsQ0FBUDtFQUtEO0VBUjBCLENBQXRCOztFQ0FQOztFQ0FBLElBQU1DLFFBQ0pDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkYsS0FBS0MsS0FBTCxDQUFXLFVBQVgsQ0FBM0IsRUFBbURFLFFBQW5ELEtBQWdFLEdBRGxFOztFQ2FBLElBQU1DLGVBQWUsQ0FDbkIsU0FEbUIsRUFFbkIsV0FGbUIsRUFHbkIsWUFIbUIsRUFJbkIsZUFKbUIsRUFLbkIsaUJBTG1CLEVBTW5CLGdCQU5tQixFQU9uQixjQVBtQixDQUFyQjs7RUFVQSxJQUFNQyxlQUFlLENBQ25CLGNBRG1CLEVBRW5CLGdCQUZtQixFQUduQixXQUhtQixFQUluQixXQUptQixFQUtuQixlQUxtQixDQUFyQjs7QUFRQSxpQkFBZSxFQUFDZDs7S0FBRCxxQkFBQTtFQUNiSCxRQUFNLFdBRE87RUFFYk4sY0FBWTtFQUNWTztFQURVLEdBRkM7RUFLYkssU0FBTztFQUNMRSxTQUFLLEVBQUVVLE1BQU1DLE1BQVIsRUFBZ0JDLFNBQVMsS0FBekIsRUFEQTtFQUVMQyxXQUFPRixNQUZGO0VBR0xHLGdCQUFZSDtFQUhQLEdBTE07RUFVYkksWUFBVTtFQUNSQyxXQURRLHFCQUNFO0VBQ1IsVUFBSUEsVUFBVSxFQUFkOztFQUVBLFVBQUksS0FBS0gsS0FBTCxJQUFjTCxhQUFhUyxPQUFiLENBQXFCLEtBQUtKLEtBQTFCLE1BQXFDLENBQUMsQ0FBeEQsRUFBMkQ7RUFDekRHLGdDQUFzQixLQUFLSCxLQUEzQixJQUFzQyxJQUF0QztFQUNEOztFQUVELFVBQUksS0FBS0MsVUFBTCxJQUFtQk4sYUFBYVMsT0FBYixDQUFxQixLQUFLSCxVQUExQixNQUEwQyxDQUFDLENBQWxFLEVBQXFFO0VBQ25FRSxnQ0FBc0IsS0FBS0YsVUFBM0IsWUFBOEMsSUFBOUM7O0VBRUEsWUFBSSxLQUFLRCxLQUFMLElBQWNKLGFBQWFRLE9BQWIsQ0FBcUIsS0FBS0osS0FBMUIsTUFBcUMsQ0FBQyxDQUF4RCxFQUEyRDtFQUN6REcsa0NBQXNCLEtBQUtILEtBQTNCLFlBQXVDLEtBQUtDLFVBQTVDLElBQTRELElBQTVEO0VBQ0Q7RUFDRjtFQUNELGFBQU9FLE9BQVA7RUFDRDtFQWhCTztFQVZHLENBQWY7O0FDMUJBLGVBQWUvQixXQUFXO0VBQ3hCaUM7RUFEd0IsQ0FBWCxDQUFmOztFQ0xBO0FBQ0E7RUFJQXhDLFNBQVNDLE1BQVQ7Ozs7Ozs7OyJ9
