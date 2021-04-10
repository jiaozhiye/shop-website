<template>
  <div>
    <div class="toper">
      <div class="w1200 top tr">
        <span v-if="!customer">您好，请&nbsp;</span>
        <span v-else>
          欢迎 <em class="name">{{ customer }}</em> 回来&nbsp;&nbsp;
        </span>
        <el-button v-if="!customer" type="text" @click="toLogin">登录</el-button>
        <el-button v-if="!customer" type="text" @click="visible = !0">免费注册</el-button>
        <el-button type="text">我的订单</el-button>
        <el-button type="text">购物车</el-button>
      </div>
    </div>
    <div class="w1200">
      <div class="search">
        <el-input v-model="svalue" placeholder="请输入内容" prefix-icon="el-icon-search" />
        <el-button type="primary" class="button">搜 索</el-button>
      </div>
    </div>
    <div class="w1200 goods">
      <ul class="clearfix">
        <li>
          <a href="#">
            <img src="../../../../assets/img/avatar.jpg" />
            <h5 class="title">啊实打实大大</h5>
            <h5 class="price">
              <span>零售价: <i style="text-decoration: line-through">￥12.00</i></span>
              <span>会员价：<i>￥10.00</i></span>
            </h5>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../../../assets/img/avatar.jpg" />
            <h5 class="title">啊实打实大大</h5>
            <h5 class="price">
              <span>零售价: <i style="text-decoration: line-through">￥12.00</i></span>
              <span>会员价：<i>￥10.00</i></span>
            </h5>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../../../assets/img/avatar.jpg" />
            <h5 class="title">啊实打实大大</h5>
            <h5 class="price">
              <span>零售价: <i style="text-decoration: line-through">￥12.00</i></span>
              <span>会员价：<i>￥10.00</i></span>
            </h5>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../../../assets/img/avatar.jpg" />
            <h5 class="title">啊实打实大大</h5>
            <h5 class="price">
              <span>零售价: <i style="text-decoration: line-through">￥12.00</i></span>
              <span>会员价：<i>￥10.00</i></span>
            </h5>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../../../assets/img/avatar.jpg" />
            <h5 class="title">啊实打实大大</h5>
            <h5 class="price">
              <span>零售价: <i style="text-decoration: line-through">￥12.00</i></span>
              <span>会员价：<i>￥10.00</i></span>
            </h5>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../../../assets/img/avatar.jpg" />
            <h5 class="title">啊实打实大大</h5>
            <h5 class="price">
              <span>零售价: <i style="text-decoration: line-through">￥12.00</i></span>
              <span>会员价：<i>￥10.00</i></span>
            </h5>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../../../assets/img/avatar.jpg" />
            <h5 class="title">啊实打实大大</h5>
            <h5 class="price">
              <span>零售价: <i style="text-decoration: line-through">￥12.00</i></span>
              <span>会员价：<i>￥10.00</i></span>
            </h5>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../../../assets/img/avatar.jpg" />
            <h5 class="title">啊实打实大大</h5>
            <h5 class="price">
              <span>零售价: <i style="text-decoration: line-through">￥12.00</i></span>
              <span>会员价：<i>￥10.00</i></span>
            </h5>
          </a>
        </li>
      </ul>
      <dl>
        <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
      </dl>
    </div>
    <div class="footer"></div>
    <el-dialog title="新用户注册" :visible.sync="visible" width="50%">
      <div>
        <el-form ref="form" label-position="top" :model="form" :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="form.checkPass" type="password" placeholder="确认密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="visible = !1">取 消</el-button>
        <el-button type="primary" @click="registerHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserName } from '@/utils/cookies';
import { doRegister } from '@website/api/home';

export default {
  name: 'Home',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      svalue: '',
      visible: false,
      customer: getUserName(),
      form: {
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名.', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码.', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass, trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapState('app', ['loginInfo'])
  },
  watch: {
    [`loginInfo.name`](next) {
      if (next) {
        this.customer = next;
      }
    }
  },
  methods: {
    async doValidate() {
      try {
        return await this.$refs[`form`].validate();
      } catch (err) {
        return err;
      }
      return false;
    },
    async registerHandle() {
      const isPassed = await this.doValidate();
      if (!isPassed) return;
      const res = await doRegister({ username: this.form.username, password: this.form.password });
      if (res.code === 200) {
        this.$message({ message: '恭喜你，注册成功！', type: 'success' });
        this.visible = !1;
      }
    },
    toLogin() {
      this.$router.push({ path: '/login' });
    }
  }
};
</script>

<style lang="scss" scoped>
.toper {
  height: 40px;
  background: #f0f0f0;
  .top {
    line-height: 40px;
    .name {
      color: $primaryColor;
    }
  }
}
.search {
  display: flex;
  width: 60%;
  margin: 0 auto;
  padding: 20px 0;
  .button {
    margin-left: 10px;
  }
}
.goods {
  ul {
    li {
      float: left;
      margin: 10px;
      width: 280px;
      a {
        display: block;
        img {
          width: 100%;
        }
        .title {
          font-size: 14px;
          line-height: 26px;
        }
        .price {
          line-height: 24px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
  }
  dl {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: right;
  }
}
.footer {
  height: 100px;
  background: #f0f0f0;
}
</style>
