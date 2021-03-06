/**
 * ajax 服务路由集合
 */
const Router = require('koa-router');
const controllers = require('../controllers');
const router = new Router();

// 路由列表
router.post('/api/sys/login', controllers.login.login);
router.post('/api/sys/logout', controllers.login.logout);
router.get('/api/sys/getMenuList', controllers.api.getMenuList);
router.get('/api/sys/getDictList', controllers.api.getDictList);
router.post('/api/sys/upload', controllers.login.upload);

router.post('/api/website/register', controllers.website.register);
router.post('/api/website/doLogin', controllers.website.doLogin);
router.post('/api/website/doLogout', controllers.website.doLogout);
router.post('/api/website/getGoodsList', controllers.website.getGoodsList);
router.get('/api/website/getGoodsRecord', controllers.website.getGoodsRecord);
router.get('/api/auth/getPersonInfo', controllers.website.getPersonInfo);
router.post('/api/auth/updatePersonInfo', controllers.website.updatePersonInfo);
router.get('/api/auth/getVipInfo', controllers.website.getVipInfo);
router.post('/api/auth/createOrderList', controllers.website.createOrderList);
router.get('/api/auth/getOrderList', controllers.website.getOrderList);

module.exports = router;
