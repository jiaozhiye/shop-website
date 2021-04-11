const db = require('../models/db');
const uuid = require('uuid');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config');
const debug = require('debug')('debug:log');

const utils = require('../utils');

const register = async (ctx, next) => {
  // console.log(ctx.request.body)
  let { username, password } = ctx.request.body;

  try {
    // 数据库 I/O
    await db.query(
      `
        INSERT INTO customer (id, account, password) VALUES (?, ?, ?)
      `,
      [uuid(), username, md5(password)]
    );

    // 返回数据
    ctx.body = {
      code: 200,
      msg: '注册成功！'
    };
  } catch (e) {
    console.error(e);
  }
};

const doLogin = async (ctx, next) => {
  // console.log(ctx.request.body)
  let { username, password } = ctx.request.body;

  let rows = [];

  try {
    // 数据库 I/O
    rows = await db.query(
      `
        SELECT
            t1.id, t1.account AS name
        FROM
          customer t1
        WHERE
            t1.account=?
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

const getGoodsList = async (ctx, next) => {
  let { currentPage, pageSize, title } = ctx.request.body;

  // 分页
  const pagination = utils.createPagination(currentPage, pageSize);

  // 查询参数 - 标题
  const titleWhere = title ? ` AND t1.title LIKE ${db.escape(`%${title}%`)}` : '';

  try {
    // 数据库 I/O
    const rows = await db.query(
      `
        SELECT
            t1.id,
            t1.title,
            t1.description,
            t1.type,
            t1.img_path,
            t1.price,
            t1.vprice,
            t1.inventory,
            ${utils.formatDateTime('t1.create_on')} AS create_on
        FROM
            goods t1
        WHERE
            t1.deleted = ? ${titleWhere}
        ${pagination}
      `,
      [0]
    );

    const [{ total }] = await db.query(
      `
        SELECT
            COUNT(*) AS total
        FROM
            goods t1
        WHERE
            t1.deleted = ? ${titleWhere}
      `,
      [0]
    );

    // 返回数据
    ctx.body = {
      code: 200,
      data: {
        records: rows,
        total
      },
      msg: ''
    };
  } catch (e) {
    console.error(e);
  }
};

const getGoodsRecord = async (ctx, next) => {
  const { id } = ctx.query;

  try {
    // 数据库 I/O
    const rows = await db.query(
      `
        SELECT
            t1.id,
            t1.title,
            t1.description,
            t1.type,
            t1.img_path,
            t1.price,
            t1.vprice,
            t1.inventory,
            ${utils.formatDateTime('t1.create_on')} AS create_on
        FROM
            goods t1
        WHERE
            t1.deleted = ? AND id = ?
      `,
      [0, id]
    );

    if (rows.length) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: rows[0],
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const getPersonInfo = async (ctx, next) => {
  const account = utils.getTokenName(ctx.request.headers.jwt);

  try {
    // 数据库 I/O
    const rows = await db.query(
      `
        SELECT
            t1.id,
            t1.account,
            t1.name,
            t1.phone,
            t1.address
        FROM
            customer t1
        WHERE
          t1.account = ? AND t1.deleted = ?
      `,
      [account, 0]
    );

    if (rows.length) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: rows[0],
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const updatePersonInfo = async (ctx, next) => {
  let { account, name, phone, address } = ctx.request.body;

  try {
    const rows = await db.query(
      `
        UPDATE
            customer t1
        SET
            t1.name = ?,
            t1.phone = ?,
            t1.address = ?
        WHERE
            t1.account = ?
      `,
      [name, phone, address, account]
    );

    if (rows.affectedRows) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: null,
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  register,
  doLogin,
  getGoodsList,
  getGoodsRecord,
  getPersonInfo,
  updatePersonInfo
};
