import _Vue from "vue";

declare module "vue-numerals" {
  function install(Vue: typeof _Vue, options?: any): void;
  export = install;
}
