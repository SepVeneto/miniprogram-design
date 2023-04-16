// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) {
  // @ts-expect-error: public-path
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__;
}
