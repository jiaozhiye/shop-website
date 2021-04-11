const CONF = {
  // 域名
  host: '127.0.0.1',
  // 端口号
  port: '3020',

  // 允许请求白名单
  whitelist: ['*'],

  // 权限校验
  auth: {
    admin_secret: 'admin-token',
    whitelist: ['/api/website'] // ajax 接口请求的白名单前缀
  },

  /**
   * MySQL 配置
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'app_cms',
    pass: 'root',
    char: 'utf8'
  }
};

module.exports = CONF;
