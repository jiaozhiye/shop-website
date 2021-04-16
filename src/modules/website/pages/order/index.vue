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
    <div class="w1200 order-list">
      <div v-for="order in orders" :key="order.id" class="order-item">
        <h4 class="title">
          <span>订单编号：{{ order.id }}</span>
          <span>清单状态：{{ createDictText(order.type) }}</span>
        </h4>
        <ul>
          <li v-for="item in order.list" :key="item.id">
            <div class="img">
              <img :src="item.img_path" height="80" />
            </div>
            <div class="box">
              <h4>{{ item.title }}</h4>
              <h5>
                <span> 价格: {{ item.price }} 元 </span>
              </h5>
            </div>
            <div class="number">数量：{{ item.buyNumber }}</div>
          </li>
        </ul>
        <dl>总价：￥ {{ totalPrice(order.list).toFixed(2) }} 元</dl>
      </div>
    </div>
    <div style="height: 100px;"></div>
  </div>
</template>

<script>
import { getVipInfo } from '@website/api/home';
import { getOrderList } from '@website/api/order';

const order_type = [
  { value: '0', text: '进行中' },
  { value: '1', text: '已完成' },
  { value: '2', text: '未完成' }
];

export default {
  name: 'Order',
  data() {
    return {
      orders: []
    };
  },
  mounted() {
    this.getOrderRecords();
  },
  methods: {
    createDictText(code) {
      return order_type.find(x => x.value === code)?.text || '';
    },
    totalPrice(list) {
      return list.reduce((prev, curr) => {
        curr = curr.buyNumber * curr.price;
        return prev + curr;
      }, 0);
    },
    async getOrderRecords() {
      const res = await getOrderList();
      if (res.code === 200) {
        this.orders = res.data || [];
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
.order-list {
  .order-item {
    margin-top: 20px;
    border: 1px solid #d9d9d9;
    .title {
      padding: 10px;
      border-bottom: 1px solid #d9d9d9;
      display: flex;
      justify-content: space-between;
    }
    ul {
      min-height: 80px;
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
    dl {
      padding: 10px;
    }
  }
}
</style>
