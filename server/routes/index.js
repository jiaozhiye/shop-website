/**
 * ajax 服务路由集合
 */
const Router = require('koa-router');
const controllers = require('../controllers');
const router = new Router();

// 路由列表
router.post('/api/sys/login', controllers.login.login);
router.get('/api/sys/getMenuList', controllers.api.getMenuList);
router.get('/api/sys/getDictList', controllers.api.getDictList);
router.post('/api/sys/upload', controllers.login.upload);

router.post('/api/website/register', controllers.website.register);
router.post('/api/website/doLogin', controllers.website.doLogin);
router.post('/api/website/getGoodsList', controllers.website.getGoodsList);
router.get('/api/website/getGoodsRecord', controllers.website.getGoodsRecord);

module.exports = router;
