//根据perssion表生成路由表
export function reRouter(e, permission) {
  console.log(permission);
  const routes = [];
  e.forEach((item) => {
    let permission1 = [];
    if (
      item.meta &&
      item.meta.permission &&
      item.meta["permission"].length > 0
    ) {
      item.meta.permission.forEach((p) => {
        if (permission.indexOf(p) != -1) {
          permission1.push(p);
        }
      });
      item.meta.permission = permission1;
      if (item.children && item.children != []) {
        item.children = reRouter(item.children, permission);
      }
      if (permission1 != [] && permission1.length > 0) {
        routes.push(item);
      }
    }
  });
  try {
    routes.forEach((item) => {
      if (item.redirect && item.children && item.children != []) {
        item.redirect = "/" + item.children[0].name;
      }
      throw Error();
    });
  } catch (err) {
    if (err.message === "End Loop") throw err;
  }
  return routes;
}
//刷新路由表
export function flush(router, to, from) {
  to.forEach((r) => {
    router.removeRoute(r.name);
  });
  from.forEach((i) => {
    router.addRoute(i);
  });
}
//根据路由表生成菜单
export function menu(routes) {
  const menuList = [];
  routes.forEach((route) => {
    if (route.meta.title && route.meta.title.length > 0) {
      const menu = {};
      menu.title = route.meta.title;
      menu.icon = route.meta.icon;
      if (
        route.meta.parentPath &&
        route.meta.parentPath.length > 0 &&
        route.meta.parentPath != "/"
      ) {
        menu.index = "/" + route.meta.parentPath + "/" + route.name;
      } else {
        menu.index = "/" + route.name;
      }
      menuList.push(menu);
    }
  });
  return menuList;
}
