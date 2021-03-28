/*
 * @Author: 焦质晔
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-03-28 14:37:36
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 新用户注册
export const doRegister = params => axios.post(`${SERVER.SYS}/register`, params);
