function isChildRoute(route, targetRoute) {
  return route.fullPath.substring(0, route.fullPath.lastIndexOf('/')) === targetRoute.fullPath
}

function findChildren(parentRoute, routes) {
  return routes.filter(route => isChildRoute(route, parentRoute));
}

function findRootRoutes(routes) {
  return routes.filter(route => route.fullPath.substring(0, route.fullPath.lastIndexOf('/')) === '');
}

function fixRoutePath(route, parentRoute) {
  route.path = route.fullPath.replace(parentRoute.fullPath + '/', '');
}

function createRoutes(routes, rootRoutes) {
  rootRoutes.forEach((route) => {
    route.children = findChildren(route, routes);
    if (route.children.length > 0) {
      route.children.forEach((childRoute) => {
        fixRoutePath(childRoute, route);
      });
      createRoutes(routes, route.children);
    }
  });
}

export default {
  compose(routes = []) {
    const files = require.context('@/views', true, /\.vue$/);
    let dynamicRoutes = files.keys().map((key) => {
      let routePath = key.replace(/(\.|\/index|vue)/g, '');
      let filePath = key.replace(/\.\//g, '');
      return {
        path: routePath,
        fullPath: routePath,
        meta: files(key).default.meta || {},
        component: () => import(`@/views/${filePath}`),
      };
    });
    const rootRoutes = findRootRoutes(dynamicRoutes);
    createRoutes(dynamicRoutes, rootRoutes);
    routes.push(...rootRoutes);
    return routes;
  }
}
