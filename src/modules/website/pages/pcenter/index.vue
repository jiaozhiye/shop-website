<template>
  <div>
    <div class="toper">
      <div class="w1200 top tr">
        <el-button type="text" @click="goToHandle('/order')">我的订单</el-button>
        <el-button type="text" @click="goToHandle('/shopcar')">购物车</el-button>
        <el-button type="text" @click="goToHandle('/pcenter')">个人中心</el-button>
        <el-button type="text" @click="goToHandle('/home')">返回首页</el-button>
      </div>
    </div>
    <div class="w1200 pcener-wrapper">
      <el-form ref="form" label-position="top" :model="form" :rules="rules">
        <el-form-item label="账号名">
          <el-input v-model="form.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="name">
          <el-input v-model="form.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="phone">
          <el-input v-model="form.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-input v-model="form.address" type="textarea" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getPersonInfo, updatePersonInfo } from '@website/api/pcenter';

export default {
  name: 'PCenter',
  data() {
    return {
      form: {
        account: '',
        name: '',
        phone: '',
        address: ''
      },
      rules: {
        name: [{ required: true, message: '请输入联系人姓名.', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系人电话.', trigger: 'blur' }],
        address: [{ required: true, message: '请输入收货地址.', trigger: 'blur' }]
      }
    };
  },
  mounted() {
    this.getPerson();
  },
  methods: {
    async getPerson() {
      const res = await getPersonInfo();
      if (res.code === 200) {
        for (let key in this.form) {
          this.form[key] = res.data[key];
        }
      }
    },
    async doSave() {
      const res = await updatePersonInfo(this.form);
      if (res.code === 200) {
        this.$message.success('更新成功！');
      }
    },
    goToHandle(path) {
      this.$router.push({ path });
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
.pcener-wrapper {
  width: 600px;
}
</style>
