import {importShared} from './__federation_fn_import.js'
const {computed,resolveComponent,openBlock,createElementBlock,createBlock,createCommentVNode,normalizeStyle,unref,createElementVNode:createBaseVNode} = await importShared('vue')

function useNormalizeStyle( style) {
  return computed(() => {
    const _style = Object.entries(style).reduce(
    (obj, _style) => {
      const [key, value] = _style;
      if (typeof value === 'number') {
        obj[key] = `${value}px`;
      } else {
        obj[key] = value;
      }
      return obj;
    }, {});

    return {
      transition: 'inherit',
      ..._style,
    }
  });
}

const _hoisted_1 = /*#__PURE__*/createBaseVNode("div", { style: {"width":"100%","height":"100%"} }, "empty", -1);

const _sfc_main = {
  __name: 'preview',
  props: {
  config: {
    type: Object,
    default: () => ({})
  }
},
  setup(__props) {

const props = __props;


const style = useNormalizeStyle(props.config.style);

return (_ctx, _cache) => {
  const _component_el_image = resolveComponent("el-image");

  return (openBlock(), createElementBlock("div", {
    style: normalizeStyle(unref(style))
  }, [
    (__props.config.defaultImg)
      ? (openBlock(), createBlock(_component_el_image, {
          key: 0,
          style: {"width":"100%","height":"100%"},
          src: __props.config.defaultImg
        }, null, 8, ["src"]))
      : createCommentVNode("", true),
    _hoisted_1
  ], 4))
}
}

};

export { _sfc_main as default };
