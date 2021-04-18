const path = require('path');
const db = require('../models/db');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config');
const debug = require('debug')('debug:log');

const login = async (ctx, next) => {
  // console.log(ctx.request.body)
  let { username, password } = ctx.request.body;
  let rows = [];

  try {
    // 数据库 I/O
    rows = await db.query(
      `
        SELECT
            t1.id, t1.username as name
        FROM
            user t1
        WHERE
            t1.username=?
        AND
            t1.password=?
        AND
            t1.deleted=0
      `,
      [username, md5(password)]
    );
  } catch (e) {
    console.error(e);
  }
  // console.log(rows)

  try {
    let [data] = rows;

    if (!data) {
      return (ctx.state.msg = '用户名或密码错误！');
    }

    // token签名 有效期为24小时
    let token = jwt.sign({ name: data.name }, config.auth.admin_secret, {
      expiresIn: '24h'
    });

    // 返回数据
    ctx.body = {
      code: 200,
      msg: '登录成功!',
      data: {
        id: data.id,
        name: data.name,
        token
      }
    };
  } catch (e) {
    console.error(e);
  }
};

const logout = async (ctx, next) => {
  ctx.session = null;
  ctx.cookies.set('jwt', null, { maxAge: -1 });
  // 返回数据
  ctx.body = {
    code: 200,
    data: null,
    msg: '成功退出登录！'
  };
};

const upload = async (ctx, next) => {
  const file = ctx.request.files.file;
  const basename = path.basename(file.path);

  // 返回数据
  ctx.body = {
    code: 200,
    data: `${ctx.origin}/${basename}`,
    msg: ''
  };
};

module.exports = {
  login,
  logout,
  upload
};
