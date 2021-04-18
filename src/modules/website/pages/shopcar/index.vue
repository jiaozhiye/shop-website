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
    <div class="w1200 shopcar">
      <ul>
        <li v-for="item in shopcars" :key="item.id">
          <div class="img">
            <img :src="item.img_path" height="80" />
          </div>
          <div class="box">
            <h4>{{ item.title }}</h4>
            <h5>
              <span :class="{ midline: isVip }"> 零售价: ￥{{ item.price }} 元 </span>
              <span :class="{ midline: !isVip }"> 会员价：￥{{ item.vprice }} 元 </span>
            </h5>
          </div>
          <div class="number">
            <el-input-number v-model="item.buyNumber" size="small" :min="1" :max="item.inventory" />
          </div>
          <div class="button tr">
            <el-button type="danger" size="small" icon="el-icon-delete" @click="removeHandle(item.id)">删除</el-button>
          </div>
        </li>
        <p v-if="isEmpty" class="empty-car">购物车已清空...</p>
      </ul>
      <dl class="total tr">总金额：{{ totalPrice.toFixed(2) }} 元</dl>
      <dl class="tr">
        <el-button type="primary" size="small" :disabled="isEmpty" @click="accountHandle()">立即结算</el-button>
      </dl>
    </div>
  </div>
</template>

<script>
import { getUserName } from '@/utils/cookies';
import { getVipInfo } from '@website/api/home';
import { createOrderList } from '@website/api/order';

export default {
  name: 'ShopCar',
  data() {
    return {
      isVip: false,
      shopcars: []
    };
  },
  computed: {
    totalPrice() {
      return this.shopcars.reduce((prev, curr) => {
        curr = curr.buyNumber * (this.isVip ? curr.vprice : curr.price);
        return prev + curr;
      }, 0);
    },
    isEmpty() {
      return !this.shopcars.length;
    }
  },
  watch: {
    shopcars: {
      handler(val) {
        const key = `shopcar_${getUserName()}`;
        localStorage.setItem(key, JSON.stringify(val));
      },
      deep: true
    }
  },
  mounted() {
    this.getShopcarList();
  },
  methods: {
    async getShopcarList() {
      const res = await getVipInfo();
      if (res.code === 200) {
        this.isVip = res.data?.is_vip === '1' ? true : false;
        const key = `shopcar_${getUserName()}`;
        this.shopcars = JSON.parse(localStorage.getItem(key)) || [];
      }
    },
    removeHandle(id) {
      this.shopcars = this.shopcars.filter(x => x.id !== id);
    },
    clearShopcar() {
      const key = `shopcar_${getUserName()}`;
      this.shopcars = [];
      localStorage.setItem(key, '');
    },
    async accountHandle() {
      const res = await createOrderList({ goods: this.shopcars });
      if (res.code === 200) {
        this.$message.success('结算成功，请查看订单详情！');
        this.clearShopcar();
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
.shopcar {
  padding-top: 20px;
  ul {
    min-height: 80px;
    border: 1px solid #d9d9d9;
    li {
      display: flex;
      align-items: center;
      height: 80px;
      padding: 10px;
      border-bottom: 1px solid #d9d9d9;
      &:last-child {
        border-bottom: 0;
      }
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
          span {
            margin-right: 20px;
          }
          .midline {
            text-decoration: line-through;
          }
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
  .empty-car {
    text-align: center;
    line-height: 80px;
  }
}
</style>
