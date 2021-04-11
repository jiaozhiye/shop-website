/*
 * @Author: mashaoze
 * @Date: 2020-05-17 09:36:33
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-11 13:20:00
 */
export default {
  // webpackChunkName -> webpack 在打包编译时，生成的文件路径(名)，格式：模块名称/用例名称 service/spt1001
  routes: [
    {
      path: '/home',
      meta: { title: '首页', keepAlive: true },
      component: () => import(/* webpackChunkName: "website/home" */ '@website/pages/home/index')
    },
    {
      path: '/detial',
      meta: { title: '详情页', keepAlive: true },
      component: () => import(/* webpackChunkName: "website/detial" */ '@website/pages/detial/index')
    },
    {
      path: '/shopcar',
      meta: { title: '购物车页', keepAlive: true },
      component: () => import(/* webpackChunkName: "website/shopcar" */ '@website/pages/shopcar/index')
    },
    {
      path: '/pcenter',
      meta: { title: '个人中心', keepAlive: true },
      component: () => import(/* webpackChunkName: "website/pcenter" */ '@website/pages/pcenter/index')
    }
  ],
  // 注意：通过 iframe 形式加载的路由页面，路由路径必须以 /iframe 开头，
  // path 的值与 iframeRoutePath 相等
  iframes: []
};
