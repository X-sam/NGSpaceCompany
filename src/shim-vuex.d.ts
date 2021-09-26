import { MainStore } from "@/store"; // path to store file

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: MainStore;
  }
}
