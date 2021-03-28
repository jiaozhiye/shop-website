/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-03-28 13:38:17
 */
import { uniqWith, isEqual } from 'lodash';
import * as types from '../types';
import i18n from '@/lang';
import config from '@/config';
import router from '@/routes';
import { setToken, setGray, setUserName, removeToken, removeGray, removeWechatAvatar } from '@/utils/cookies';
import variables from '@/assets/css/variables.scss';
import localDict from '@/utils/localDict';
import { getNavList, getAllDict, getStarMenuList, getCommonMenuList, createMenuPoint } from '@/api/login';
// 自定义主题
import client from 'webpack-custom-theme/client';
import forElementUI from 'webpack-custom-theme/forElementUI';

const deepMapRoute = (arr, mark) => {
  let res = null;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i].children)) {
      res = deepMapRoute(arr[i].children, mark);
    }
    if (res) {
      return res;
    }
    if (arr[i].path === mark) {
      return arr[i];
    }
  }
  return res;
};

const createMenuList = list => {
  let res = [];
  list.forEach(x => {
    if (Array.isArray(x.children)) {
      res.push(...createMenuList(x.children));
    } else {
      res.push(x);
    }
  });
  return res;
};

const formatNavData = (list, routes) => {
  list.forEach(x => {
    if (Array.isArray(x.children) && x.children.length) {
      x.children.forEach(sub => (sub.parentKey = x.key));
      formatNavData(x.children, routes);
    }
    if (!x.children && !x.key) {
      x.children = [];
    }
    let target = deepMapRoute(routes, x.key);
    if (target) {
      target.meta && (target.meta.title = x.title);
      target.hideInMenu && (x.hideInMenu = true);
    }
  });
};

// state
const state = {
  loginInfo: {}, // 登录信息
  navList: [], // 导航菜单树
  menuList: [], // 可点击(三级)的子菜单列表
  tabNavList: [], // 导航选项卡列表
  starMenuList: [], // 收藏导航
  commonMenuList: [], // 常用导航
  keepAliveList: [], // 路由组件缓存列表
  iframeList: [], // iframe 列表
  lang: localStorage.getItem('lang') || config.lang, // 多语言
  size: localStorage.getItem('size') || config.size, // 尺寸
  theme: variables.theme, // 主题色
  dict: {}, // 数据字典
  isNotifyMark: !1, // 页面中是否已存在消息通知组件
  weChat: {} // 微信登录信息
};

// actions
const actions = {
  createLoginInfo({ commit, state }, params) {
    setToken(params.token);
    params.gray && setGray(params.gray);
    setUserName(params.name);
    commit({
      type: types.LOGININFO,
      data: { name: params.name }
    });
  },
  createLogout({ dispatch, commit, state }, params) {
    removeToken();
    removeGray();
    removeWechatAvatar();
    commit({
      type: types.LOGOUT,
      data: {}
    });
    dispatch('clearNavList');
    if (process.env.NODE_ENV === 'development') {
      router.push({ path: '/login' }).catch(() => {});
    } else {
      // 刷新浏览器，释放内存
      setTimeout(() => (window.location = '/login'), 300);
    }
  },
  createWeChat({ commit, state }, params) {
    commit({
      type: types.WECHAT,
      data: params || {}
    });
  },
  async createNavList({ dispatch, commit, state }, params) {
    if (state.navList.length) return;
    let data = [];
    if (process.env.MOCK_DATA === 'true') {
      const res = require('@/mock/sideMenu').default;
      data = res;
    } else {
      try {
        const res = await getNavList();
        if (res.code === 200) {
          data = res.data.length ? res.data : [{ title: i18n.t('app.dashboard'), key: '/home', icon: 'icon-linechart' }];
        } else {
          return dispatch('createLogout');
        }
      } catch (err) {
        return dispatch('createLogout');
      }
    }
    formatNavData(data, router.options.routes);
    commit({ type: types.NAVLIST, data });
    commit({ type: types.MENULIST, data: createMenuList(data) });
    return !0;
  },
  clearNavList({ dispatch, commit, state }, params) {
    commit({
      type: types.NAVLIST,
      data: []
    });
    dispatch('createTabNavList', []);
  },
  async createStarMenuList({ commit, state }, params) {
    if (state.starMenuList.length) return;
    let data = [];
    if (process.env.MOCK_DATA === 'true') {
      const res = require('@/mock/starMenu').default;
      data = res;
    } else {
      const res = await getStarMenuList();
      if (res.code === 200) {
        data = res.data ?? [];
      }
    }
    commit({ type: types.STAR_MENU, data });
  },
  async createCommonMenuList({ commit, state }, params) {
    if (state.commonMenuList.length) return;
    let data = [];
    if (process.env.MOCK_DATA === 'true') {
      const res = require('@/mock/starMenu').default;
      data = res;
    } else {
      const res = await getCommonMenuList();
      if (res.code === 200) {
        data = res.data ?? [];
      }
    }
    commit({ type: types.COMMON_MENU, data });
  },
  createTabNavList({ commit, state }, params) {
    const routes = params.filter(x => x.key !== '/404');
    commit({
      type: types.TAB_NAVLIST,
      data: routes
    });
    localStorage.setItem('tab_nav', JSON.stringify(routes));
  },
  checkAuthority({ commit, state }, params) {
    return state.menuList.some(x => x.key === params);
  },
  async createDictData({ commit, state }, params) {
    if (Object.keys(state.dict).length) return;
    let data = {};
    if (process.env.MOCK_DATA === 'true') {
      data = { ...localDict };
    } else {
      const res = await getAllDict();
      if (res.code === 200) {
        // 数据字典规则：如果有重复的 Code，服务端覆盖客户端
        data = {
          ...localDict,
          ...res.data?.dict
        };
      }
    }
    // 数据字典本地存储
    localStorage.setItem('dict', JSON.stringify(data));
    // vuex 状态存储
    commit({ type: types.DICT_DATA, data });
  },
  async createMenuRecord({ commit, state }, params) {
    if (process.env.MOCK_DATA === 'true') return;
    await createMenuPoint({ vpath: params.path, vcaseName: params.title });
  },
  addKeepAliveCache({ commit, state }, params) {
    if (state.keepAliveList.some(x => x.value === params.value)) return;
    commit({
      type: types.ADD_CACHE,
      data: params
    });
  },
  removeKeepAliveCache({ commit, state }, params) {
    commit({
      type: types.DEL_CACHE,
      data: params
    });
  },
  clearKeepAliveCache({ commit, state }, params) {
    commit({
      type: types.CLEAR_CACHE,
      data: []
    });
  },
  createIframeList({ commit, state }, params) {
    commit({
      type: types.IFRAME_NAVLIST,
      data: params
    });
  },
  addStarMenuList({ commit, state }, params) {
    commit({
      type: types.ADD_STAR_MENU,
      data: params
    });
  },
  removeStarMenuList({ commit, state }, params) {
    commit({
      type: types.DEL_STAR_MENU,
      data: params
    });
  },
  refreshView({ dispatch, commit, state }, { path, query = {} }) {
    let $iframe = document.getElementById(path);
    if ($iframe) {
      // 释放 iframe 内存
      $iframe.src = 'about:blank';
      try {
        $iframe.contentWindow.document.write('');
        $iframe.contentWindow.document.clear();
      } catch (e) {}
      $iframe.parentNode.removeChild($iframe);
      $iframe = null;
      // 释放 iframe 内存 END
      const data = state.iframeList.find(x => x.key === path);
      commit({ type: types.DEL_IFRAME, data: path });
      setTimeout(() => commit({ type: types.ADD_IFRAME, data }), 10);
    } else {
      router.replace({ path: `/redirect${path}`, query }).catch(() => {});
    }
    dispatch('removeKeepAliveCache', path);
  },
  createNotifyState({ commit, state }, params) {
    commit({
      type: types.NOTIFY_STATE,
      data: params
    });
  },
  setLanguage({ commit, state }, params) {
    state.iframeList.forEach(x => {
      const $iframe = document.getElementById(x.key);
      if (!$iframe) return;
      $iframe.contentWindow.postMessage({ type: 'lang', data: params });
    });
    commit({
      type: types.LANGUAGE,
      data: params
    });
  },
  setSize({ commit, state }, params) {
    state.iframeList.forEach(x => {
      const $iframe = document.getElementById(x.key);
      if (!$iframe) return;
      $iframe.contentWindow.postMessage({ type: 'size', data: params });
    });
    commit({
      type: types.SIZE,
      data: params
    });
  },
  createElementSize({ commit, state }, params) {
    this._vm.$ELEMENT.size = config.toElementSize[params];
    this._vm.$VDESIGN.size = params;
  },
  emitThemeColor({ commit, state }, params) {
    state.iframeList.forEach(x => {
      const $iframe = document.getElementById(x.key);
      if (!$iframe) return;
      $iframe.contentWindow.postMessage({ type: 'theme', data: params }, '*');
    });
  },
  createThemeColor({ commit, state }, params) {
    const options = {
      newColors: [...forElementUI.getElementUISeries(params), params],
      // 当 router 不是 hash mode 时，它需要将 url 更改为绝对路径(以 / 开头)
      changeUrl: cssUrl => `/${cssUrl}`
    };
    commit({ type: types.THEME_COLOR, data: params });
    client.changer.changeColor(options, Promise).then(() => localStorage.setItem('theme', params));
  }
};

// mutations
const mutations = {
  [types.LOGININFO](state, { data }) {
    state.loginInfo = data;
  },
  [types.LOGOUT](state, { data }) {
    state.loginInfo = data;
  },
  [types.WECHAT](state, { data }) {
    state.weChat = data;
  },
  [types.NAVLIST](state, { data }) {
    state.navList = data;
  },
  [types.STAR_MENU](state, { data }) {
    state.starMenuList = data;
  },
  [types.COMMON_MENU](state, { data }) {
    state.commonMenuList = data;
  },
  [types.MENULIST](state, { data }) {
    state.menuList = data;
  },
  [types.TAB_NAVLIST](state, { data }) {
    state.tabNavList = data;
  },
  [types.IFRAME_NAVLIST](state, { data }) {
    state.iframeList = data;
  },
  [types.DICT_DATA](state, { data }) {
    state.dict = data;
  },
  [types.ADD_CACHE](state, { data }) {
    state.keepAliveList = [...state.keepAliveList, data];
  },
  [types.DEL_CACHE](state, { data }) {
    state.keepAliveList = state.keepAliveList.filter(x => x.key !== data);
  },
  [types.CLEAR_CACHE](state, { data }) {
    state.keepAliveList = data;
  },
  [types.ADD_IFRAME](state, { data }) {
    state.iframeList = [...state.iframeList, data];
  },
  [types.DEL_IFRAME](state, { data }) {
    state.iframeList = state.iframeList.filter(x => x.key !== data);
  },
  [types.ADD_STAR_MENU](state, { data }) {
    state.starMenuList = uniqWith([...state.starMenuList, data], isEqual);
  },
  [types.DEL_STAR_MENU](state, { data }) {
    state.starMenuList = state.starMenuList.filter(x => x.key !== data);
  },
  [types.NOTIFY_STATE](state, { data }) {
    state.isNotifyMark = data;
  },
  [types.LANGUAGE](state, { data }) {
    state.lang = data;
  },
  [types.SIZE](state, { data }) {
    state.size = data;
  },
  [types.THEME_COLOR](state, { data }) {
    state.theme = data;
  }
};

// getters
const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
