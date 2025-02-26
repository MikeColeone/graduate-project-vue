const state = {
  role: "", //登陆身份
  isAuthenticated: false, //登陆状态
};
//更新角色
const mutations = {
  setAuthenticated(state, isAuthenticated: boolean) {
    state.isAuthenticated = isAuthenticated; //登陆成功的时更新状态
  },
  setRole(state, role: string) {
    state.role = role;
  },
};
const actions = {
  updateRole({ commit }, role: string) {
    commit("setRole", role); // 使用 mutation 更新状态
  },
  updateisAuthticated({ commit }, isAuthenticated: boolean) {
    commit("setAuthenticated", isAuthenticated); //触发mutation
  },
};
const getters = {
  role: (state) => state.role, // 获取当前角色
};

export default {
  state,
  mutations,
  actions,
  getters,
};
