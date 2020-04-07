'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function isChildRoute(route, targetRoute) {
  return route.fullPath.substring(0, route.fullPath.lastIndexOf('/')) === targetRoute.fullPath;
}

function findChildren(parentRoute, routes) {
  return routes.filter(function (route) {
    return isChildRoute(route, parentRoute);
  });
}

function findRootRoutes(routes) {
  return routes.filter(function (route) {
    return route.fullPath.substring(0, route.fullPath.lastIndexOf('/')) === '';
  });
}

function fixRoutePath(route, parentRoute) {
  route.path = route.fullPath.replace(parentRoute.fullPath + '/', '');
}

function createRoutes(routes, rootRoutes) {
  rootRoutes.forEach(function (route) {
    route.children = findChildren(route, routes);
    if (route.children.length > 0) {
      route.children.forEach(function (childRoute) {
        fixRoutePath(childRoute, route);
      });
      createRoutes(routes, route.children);
    }
  });
}

exports.default = {
  compose: function compose() {
    var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var files = require.context('@/views', true, /\.vue$/);
    var dynamicRoutes = files.keys().map(function (key) {
      var routePath = key.replace(/(\.|\/index|vue)/g, '');
      var filePath = key.replace(/\.\//g, '');
      return {
        path: routePath,
        fullPath: routePath,
        meta: files(key).default.meta || {},
        component: function component() {
          return import('@/views/' + filePath);
        }
      };
    });
    var rootRoutes = findRootRoutes(dynamicRoutes);
    createRoutes(dynamicRoutes, rootRoutes);
    routes.push.apply(routes, _toConsumableArray(rootRoutes));
    return routes;
  }
};