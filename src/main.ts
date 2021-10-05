import Vue, { createApp } from "vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "flag-icon-css/css/flag-icon.min.css";
import "simplebar";
import "simplebar/dist/simplebar.css";

import "./assets/styles.css";

import { store } from "./store";

import VueNumerals from "vue-numerals";

import i18n from "./i18n";

import VueGtag from "vue-gtag";

import App from "./App.vue";

const app = createApp(App)
  .use(store)
  .use(VueNumerals)
  .use(i18n)
  .use(VueGtag, { config: { id: "G-7MZR4NX0GD" } });

app.config.performance = true;
app.mount("#app");
