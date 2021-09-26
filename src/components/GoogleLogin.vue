<template>
  <div>
    <div class="col-auto">
      <div v-if="isSignedIn">
        <button class="btn" @click="logout()" type="button">Logout</button>
        {{ userName }}
      </div>
      <button
        :disabled="isSignedIn === null"
        class="btn"
        @click="login()"
        type="button"
        v-if="!isSignedIn"
      >
        Login
      </button>
    </div>
    <div class="col-auto">
      <span v-if="saveFile"> {{ saveFile }}</span>
    </div>
  </div>
  <div v-if="isSignedIn" class="col-12">
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="checkSaveToCloud"
        :checked="saveToCloud"
        @change="toggleSaveToCloud()"
      />
      <label class="form-check-label small" for="checkSaveToCloud">{{
        $t("saveToCloud")
      }}</label>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { MainStore } from "@/store";

export default defineComponent({
  computed: {
    ...mapState<MainStore>({
      isSignedIn: (state: MainStore) => state.drive.isLoaded,
      userName: (state: MainStore) => {
        state.drive.gapi.getUserData()?.firstName ?? "";
      },
      saveToCloud: "saveToCloud",
      saveFile: (state: MainStore) => state.drive.saveFile,
    }),
    ...mapMutations(["toggleSaveToCloud"]),
    ...mapActions(["login", "logout", "DownloadSave"]),
  },
});
</script>
