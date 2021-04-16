/*
 * @Author: mashaoze
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-04-16 11:37:51
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 生成订单
export const createOrderList = params => axios.post(`${SERVER.AUTH}/createOrderList`, params);

// 获取订单
export const getOrderList = params => axios.get(`${SERVER.AUTH}/getOrderList`, { params });
