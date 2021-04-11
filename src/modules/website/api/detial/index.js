/*
 * @Author: mashaoze
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-11 11:23:45
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 获取商品列表
export const getGoodsRecord = params => axios.get(`${SERVER.WEB}/getGoodsRecord`, { params });
