/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-03-28 09:44:26
 */
export default [
  {
    title: '用户管理',
    key: '/custom',
    icon: 'icon-adduser',
    children: [
      {
        title: '用户列表',
        key: '/custom/list'
      }
    ]
  },
  {
    title: '商品管理',
    key: '/goods',
    icon: 'icon-shop',
    children: [
      {
        title: '商品列表',
        key: '/goods/list'
      }
    ]
  },
  {
    title: '订单管理',
    key: '/order',
    icon: 'icon-container',
    children: [
      {
        title: '订单列表',
        key: '/order/list'
      }
    ]
  }
];
