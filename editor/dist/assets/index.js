import { ref, openBlock, createElementBlock, createElementVNode as createBaseVNode, toDisplayString, Fragment, pushScopeId, popScopeId, createTextVNode, createVNode, createApp } from './__federation_shared_vue.js';

true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
            fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
            fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (script.crossorigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

const style = '';

const _imports_0 = "/vite.svg";

const _imports_1 = "/assets/vue.5532db34.svg";

const HelloWorld_vue_vue_type_style_index_0_scoped_a1de4649_lang = '';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _withScopeId$1 = n => (pushScopeId("data-v-a1de4649"),n=n(),popScopeId(),n);
const _hoisted_1$1 = { class: "card" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createTextVNode(" Edit "),
  /*#__PURE__*/createBaseVNode("code", null, "components/HelloWorld.vue"),
  /*#__PURE__*/createTextVNode(" to test HMR ")
], -1));
const _hoisted_3 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createTextVNode(" Check out "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://vuejs.org/guide/quick-start.html#local",
    target: "_blank"
  }, "create-vue"),
  /*#__PURE__*/createTextVNode(", the official Vue + Vite starter ")
], -1));
const _hoisted_4 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createTextVNode(" Install "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://github.com/johnsoncodehk/volar",
    target: "_blank"
  }, "Volar"),
  /*#__PURE__*/createTextVNode(" in your IDE for a better DX ")
], -1));
const _hoisted_5 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1));


const _sfc_main$1 = {
  __name: 'HelloWorld',
  props: {
  msg: String
},
  setup(__props) {



const count = ref(0);

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", null, toDisplayString(__props.msg), 1),
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("button", {
        type: "button",
        onClick: _cache[0] || (_cache[0] = $event => (count.value++))
      }, "count is " + toDisplayString(count.value), 1),
      _hoisted_2
    ]),
    _hoisted_3,
    _hoisted_4,
    _hoisted_5
  ], 64))
}
}

};
const HelloWorld = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-a1de4649"]]);

const App_vue_vue_type_style_index_0_scoped_d2afaedd_lang = '';

const _withScopeId = n => (pushScopeId("data-v-d2afaedd"),n=n(),popScopeId(),n);
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", null, [
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://vitejs.dev",
    target: "_blank"
  }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0,
      class: "logo",
      alt: "Vite logo"
    })
  ]),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://vuejs.org/",
    target: "_blank"
  }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1,
      class: "logo vue",
      alt: "Vue logo"
    })
  ])
], -1));

const _sfc_main = {
  __name: 'App',
  setup(__props) {

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createVNode(HelloWorld, { msg: "Vite + Vue" })
  ], 64))
}
}

};
const App = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-d2afaedd"]]);

createApp(App).mount('#app');
