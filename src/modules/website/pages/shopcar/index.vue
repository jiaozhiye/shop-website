<template>
  <div class="w1200 shopcar">
    <ul>
      <li v-for="item in shopcars" :key="item.id">
        <div class="img">
          <img :src="item.img_path" height="80" />
        </div>
        <div class="box">
          <h4>{{ item.title }}</h4>
          <h5>
            <span>
              零售价: <i>￥{{ item.price }}</i>
            </span>
            <span style="margin-left: 20px;">
              会员价：<i>￥{{ item.vprice }}</i>
            </span>
          </h5>
        </div>
        <div class="number">
          <el-input-number v-model="item.buyNumber" size="small" :min="1" :max="item.inventory" />
        </div>
        <div class="button tr">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="removeHandle(item.id)">删除</el-button>
        </div>
      </li>
    </ul>
    <dl class="total tr">总金额：{{ totalPrice.toFixed(2) }} 元</dl>
    <dl class="tr">
      <el-button type="primary" size="small" @click="accountHandle()">立即结算</el-button>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'ShopCar',
  data() {
    return {
      shopcars: []
    };
  },
  computed: {
    totalPrice() {
      return this.shopcars.reduce((prev, curr) => {
        curr = curr.buyNumber * curr.price;
        return prev + curr;
      }, 0);
    }
  },
  mounted() {
    this.getShopcarList();
  },
  methods: {
    getShopcarList() {
      this.shopcars = JSON.parse(localStorage.getItem('shopcar')) || [];
    },
    accountHandle() {}
  }
};
</script>

<style lang="scss" scoped>
.shopcar {
  padding-top: 40px;
  ul {
    border: 1px solid #d9d9d9;
    li {
      display: flex;
      align-items: center;
      height: 80px;
      padding: 10px;
      border-bottom: 1px solid #d9d9d9;
      .img {
        width: 150px;
      }
      .box {
        flex: 1;
        h4 {
          font-size: 16px;
          padding-bottom: 10px;
        }
        h5 {
          font-weight: normal;
          font-size: 14px;
        }
      }
      .number {
        width: 150px;
      }
      .button {
        width: 150px;
      }
    }
  }
  .total {
    font-size: 18px;
    margin: 20px 0;
  }
}
</style>
