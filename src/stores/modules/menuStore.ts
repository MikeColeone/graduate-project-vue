const state = {
  isCollapse: false,
  selectMenu: [],
};

const mutations = {
  collapseMenu(state: { isCollapse: boolean }) {
    state.isCollapse = !state.isCollapse;
  },
  addMenu(state: { selectMenu: { path: any }[] }, payload: { path: any }) {
    //对数据去重
    if (
      state.selectMenu.findIndex(
        (item: { path: any }) => item.path === payload.path
      ) === -1
    ) {
      state.selectMenu.push(payload);
    }
  },
  //实现关闭上导航逻辑
  closeMenu(state: { selectMenu: any[] }, payload: { name: any }) {
    const index = state.selectMenu.findIndex(
      (val) => val.name === payload.name
    );
    //传入参数 删除的数量
    state.selectMenu.splice(index, 1);
  },
};

export default {
  state,
  mutations,
};
