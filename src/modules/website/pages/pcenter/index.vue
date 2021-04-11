<template>
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
</template>

<script>
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
  methods: {
    async doSave() {
      // ...
    }
  }
};
</script>

<style lang="scss" scoped>
.pcener-wrapper {
  width: 600px;
}
</style>
