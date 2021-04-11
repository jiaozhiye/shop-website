<template>
  <div>
    <div class="toper">
      <div class="w1200 top tr">
        <el-button type="text" @click="goToHandle('/order')">我的订单</el-button>
        <el-button type="text" @click="goToHandle('/shopcar')">购物车</el-button>
        <el-button type="text" @click="goToHandle('/pcenter')">个人中心</el-button>
      </div>
    </div>
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
            <span>{{ createPrice(goodsItem.price) }} 元</span>
          </el-form-item>
          <el-form-item label="会员价格">
            <span>{{ createPrice(goodsItem.vprice) }} 元</span>
          </el-form-item>
          <el-form-item label="库存数量">
            <span>{{ goodsItem.inventory }} 个</span>
          </el-form-item>
          <el-form-item label="上架日期">
            <span>{{ goodsItem.create_on }}</span>
          </el-form-item>
          <el-form-item label="购买数量">
            <el-input-number v-model="form.buyNumber" :min="1" :max="goodsItem.inventory" :disabled="isDisabled" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isDisabled" @click="addToShopCar">加入购物车</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, getUserName } from '@/utils/cookies';
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
      form: {
        buyNumber: 1
      },
      goodsItem: {}
    };
  },
  computed: {
    isDisabled() {
      return !Object.keys(this.goodsItem).length || this.goodsItem.inventory <= 0;
    }
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
    createPrice(val) {
      if (typeof val === 'undefined') {
        return '';
      }
      return Number(val).toFixed(2);
    },
    async getGoodInfo(id) {
      const res = await getGoodsRecord({ id });
      if (res.code === 200) {
        this.goodsItem = res.data || {};
      }
    },
    addToShopCar() {
      const { id } = this.goodsItem;
      if (!id) return;
      if (!getToken() || !getUserName()) {
        return this.$message.warning('登录之后才能购买！');
      }
      const key = `shopcar_${getUserName()}`;
      const carts = JSON.parse(localStorage.getItem(key)) || [];
      if (carts.findIndex(x => x.id === id) !== -1) {
        return this.$message.warning('此商品已经在购物车中，请到购物车中修改购买数量！');
      }
      carts.push({ id, ...this.goodsItem, ...this.form });
      localStorage.setItem(key, JSON.stringify(carts));
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
.detial-wrapper {
  display: flex;
  padding-top: 20px;
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
