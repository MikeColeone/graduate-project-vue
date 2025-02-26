import { createStore } from "vuex";
import menu from "././modules/menuStore";
import loginStore from "././modules/loginStore";

export default createStore({
  modules: {
    menu,
    loginStore,
  },
});
