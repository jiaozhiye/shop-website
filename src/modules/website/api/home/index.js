/*
 * @Author: mashaoze
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-11 10:45:31
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 新用户注册
export const doRegister = params => axios.post(`${SERVER.WEB}/register`, params);

// 获取商品列表
export const getGoodsList = params => axios.post(`${SERVER.WEB}/getGoodsList`, params);
