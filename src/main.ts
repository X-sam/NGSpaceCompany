import Vue, { createApp } from "vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/styles.css";

import { store } from "./store";

import VueNumerals from "vue-numerals";

import i18n from "./i18n";

import VueGtag from "vue-gtag";

import VueGapi from "vue-gapi";

import App from "./App.vue";

const app = createApp(App)
  .use(store)
  .use(VueNumerals)
  .use(i18n)
  .use(VueGtag, { config: { id: "G-7MZR4NX0GD" } })
  .use(VueGapi, {
    apiKey: "AIzaSyD3CwT6axPXgJf-5yFl4oV9c6tlF3seX7s",
    clientId:
      "432147045320-cesogd65aiji3og6ua87jko3einodrev.apps.googleusercontent.com",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scope: "https://www.googleapis.com/auth/drive.file",
  });
app.config.performance = true;
app.mount("#app");
