/**
* @module vue-mdc-adaptercard 0.17.0
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.37.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

import { RippleMixin, RippleBase } from '../ripple';
import { mdcButtonBase } from '../button';

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

var index = BasePlugin({
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

export default index;
export { mdcCard, mdcCardPrimaryAction, mdcCardMedia, mdcCardHeader, mdcCardTitle, mdcCardSubtitle, mdcCardText, mdcCardActions, mdcCardActionButtons, mdcCardActionButton, mdcCardActionIcons, mdcCardActionIcon };
//# sourceMappingURL=index.js.map
