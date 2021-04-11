/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-11 14:37:03
 */
import router from '@/routes';
import store from '@/store';
import config from '@/config';
import { getToken } from '@/utils/cookies';
import { notifyAction } from '@/utils';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import i18n from '@/lang';

// 设置 NProgress 样式
NProgress.configure({ showSpinner: false });

// 访问白名单
const whiteList = ['/login', '/home', '/detial'];

// 权限白名单
const whiteAuth = ['/home', '/iframe', '/redirect', '/404'];

// 路由重定向
const redirect = (next, path) => {
  path ? next({ path }) : next(false);
  NProgress.done();
};

// 登录判断
const isLogin = () => {
  if (process.env.MOCK_DATA === 'true') {
    return true;
  } else {
    return getToken();
  }
};

// iframe 判断
const isIframe = path => {
  return path.startsWith(whiteAuth[1]);
};

router.beforeEach(async (to, from, next) => {
  !isIframe(to.path) && NProgress.start();
  if (isLogin()) {
    if (to.path === '/login') {
      redirect(next, '/');
    } else {
      next();
    }
  } else {
    // 白名单，直接进入
    if (whiteList.includes(to.path)) {
      next();
    } else {
      redirect(next, '/login');
    }
  }
});

router.afterEach(to => {
  const title = to.meta?.title ?? '404';
  document.title = `${config.systemName}-${title}`;
  NProgress.done();
});
