<template>
  <div class="w1200 detial-wrapper">
    <div class="left-box">
      <img :src="goodsItem.img_path" height="200" />
    </div>
    <div class="right_box">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品名称">
          <span>{{ goodsItem.title }}</span>
        </el-form-item>
        <el-form-item label="商品描述">
          <span>{{ goodsItem.description }}</span>
        </el-form-item>
        <el-form-item label="商品类别">
          <span>{{ createDictText(goodsItem.type) }}</span>
        </el-form-item>
        <el-form-item label="商品价格">
          <span>{{ Number(goodsItem.price).toFixed(2) }} 元</span>
        </el-form-item>
        <el-form-item label="会员价格">
          <span>{{ Number(goodsItem.vprice).toFixed(2) }} 元</span>
        </el-form-item>
        <el-form-item label="库存数量">
          <span>{{ goodsItem.inventory }} 个</span>
        </el-form-item>
        <el-form-item label="上架日期">
          <span>{{ goodsItem.create_on }}</span>
        </el-form-item>
        <el-form-item label="购买数量">
          <el-input-number v-model="buyNumber" :min="1" :max="1000" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addToShopCar">加入购物车</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getGoodsRecord } from '@website/api/detial';

const goods_type = [
  { value: '0', text: '食品' },
  { value: '1', text: '饮料' },
  { value: '2', text: '文具' },
  { value: '3', text: '日用品' },
  { value: '4', text: '其他' }
];

export default {
  name: 'Detial',
  data() {
    return {
      form: {},
      goodsItem: {},
      buyNumber: 1
    };
  },
  mounted() {
    const id = this.$route.query?.id;
    if (!id) return;
    this.getGoodInfo(id);
  },
  methods: {
    createDictText(code) {
      return goods_type.find(x => x.value === code)?.text || '';
    },
    async getGoodInfo(id) {
      const res = await getGoodsRecord({ id });
      if (res.code === 200) {
        this.goodsItem = res.data || {};
      }
    },
    addToShopCar() {}
  }
};
</script>

<style lang="scss" scoped>
.detial-wrapper {
  display: flex;
  padding-top: 50px;
  .left-box {
    width: 400px;
    height: 400px;
    img {
      width: 100%;
    }
  }
  .right_box {
    flex: 1;
    margin-left: 30px;
  }
}
</style>
