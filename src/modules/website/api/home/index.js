/*
 * @Author: mashaoze
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-04-16 09:58:50
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 新用户注册
export const doRegister = params => axios.post(`${SERVER.WEB}/register`, params);

// 获取商品列表
export const getGoodsList = params => axios.post(`${SERVER.WEB}/getGoodsList`, params);

// 获取是否是会员
export const getVipInfo = params => axios.get(`${SERVER.AUTH}/getVipInfo`, { params });
