<template>
  <div class="setting">
    <el-dropdown trigger="click" class="el-dropdown">
      <span class="el-dropdown-link">
        <span class="avatar">
          <img class="img" src="../../assets/img/avatar.jpg" />
        </span>
        <span>{{ username }}</span>
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-setting">个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" divided @click.native="logoutHandle">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-03-28 11:36:44
 **/
import { mapActions } from 'vuex';
import { getUserName } from '../../utils/cookies';

export default {
  name: 'PersonalCenter',
  data() {
    return {
      username: getUserName()
    };
  },
  methods: {
    ...mapActions('app', ['createLogout']),
    logoutHandle() {
      this.createLogout();
      // 需要走后台推出接口
      this.$router.push({ path: '/login' });
    }
  }
};
</script>

<style lang="scss" scoped>
.setting {
  margin-left: 15px;
  .el-dropdown {
    .el-dropdown-link {
      display: inline-block;
      padding: 5px 0;
      font-size: 14px;
      cursor: pointer;
      .avatar {
        display: inline-block;
        overflow: hidden;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        vertical-align: middle;
        .img {
          object-fit: cover;
          display: block;
          height: 100%;
        }
      }
    }
  }
}
</style>
