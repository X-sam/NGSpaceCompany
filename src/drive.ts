import { VueGapi } from "vue-gapi";
import { ActionContext } from "vuex";
import { MainStore } from "./store";

export type File = gapi.client.drive.File;
export interface DriveState {
  gapi: VueGapi;
  currentUser: gapi.auth2.GoogleUser;
  isLoaded: boolean; //Are we initialized, and logged in?
  saveFile: File; //internal use by the store.
}
export default {
  state: (): DriveState => ({
    gapi: {} as VueGapi,
    currentUser: {} as gapi.auth2.GoogleUser,
    isLoaded: false,
    saveFile: {},
  }),
  mutations: {
    initializeGapi(state: DriveState, payload: VueGapi) {
      state.gapi = payload;
    },
    setCurrentUser(state: DriveState, payload: gapi.auth2.GoogleUser) {
      state.currentUser = payload;
    },
    setLoaded(state: DriveState, payload = true) {
      state.isLoaded = payload;
    },
    setSaveFile(state: DriveState, payload: gapi.client.drive.File) {
      state.saveFile = payload;
    },
  },
  actions: {
    async login({ state, commit }: ActionContext<DriveState, MainStore>) {
      const res = await state.gapi.login();
      if (res.currentUser.isSignedIn()) {
        commit("setCurrentUser", res.currentUser);
        commit("setLoaded");
      }
    },
    async logout({ state, commit }: ActionContext<DriveState, MainStore>) {
      const res = await state.gapi.logout();
      commit("setCurrentUser", null);
      commit("setLoaded", false);
    },
    async UploadSave(
      { state, commit, dispatch }: ActionContext<DriveState, MainStore>,
      save: string
    ) {
      let id = state.saveFile.id;
      if (id === undefined) {
        id = ((await dispatch("FindSaveFile")) as gapi.client.drive.File).id;
      }
      const text = save;
      const boundary = "foo_bar_baz";
      const delimiter = `\r\n--${boundary}\r\n`;
      const close_delim = `\r\n--${boundary}--`;
      const contentType = "text/plain";
      const metadata = {
        name: "NGSpace.Save",
        mimeType: contentType,
        id,
      };
      const multipartRequestBody = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(
        metadata
      )}${delimiter}Content-Type:${contentType}\r\n\r\n${text}\r\n${close_delim}`;

      const res: gapi.client.Response<gapi.client.drive.File> =
        await gapi.client.request({
          path: "/upload/drive/v3/files",
          method: "POST",
          params: { uploadType: "multipart" },
          headers: {
            "Content-Type": `multipart/related; boundary=foo_bar_baz`,
            "Content-Length": multipartRequestBody.length,
          },
          body: multipartRequestBody,
        });
      if (id === undefined) commit("setSaveFile", res.result);
    },
    async FindSaveFile({
      state,
      commit,
    }: ActionContext<DriveState, MainStore>) {
      const gapi = await state.gapi.getGapiClient();
      const list = await gapi.client.drive.files.list({
        q: "name='NGSpace.Save'",
      });
      if (
        !(list.result.files?.length && list.result.files[0].id !== undefined)
      ) {
        throw Error("Couldn't find Save!");
      }
      commit("setSaveFile", list.result.files[0]);
      return list.result.files[0];
    },
    async DownloadSave({
      state,
      commit,
      dispatch,
    }: ActionContext<DriveState, MainStore>) {
      let id = state.saveFile.id;
      if (id === undefined) {
        id = ((await dispatch("FindSaveFile")) as gapi.client.drive.File).id;
      }
      return await gapi.client.drive.files.get({
        alt: "media",
        fileId: id!,
      });
    },
  },
};
