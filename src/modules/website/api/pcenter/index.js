/*
 * @Author: mashaoze
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-11 15:26:39
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 获取用户信息
export const getPersonInfo = params => axios.get(`${SERVER.AUTH}/getPersonInfo`, { params });

// 修改用户信息
export const updatePersonInfo = params => axios.post(`${SERVER.AUTH}/updatePersonInfo`, params);
