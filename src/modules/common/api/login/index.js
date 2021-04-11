/*
 * @Author: mashaoze
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-03-28 15:12:08
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 执行登录
export const doLogin = params => axios.post(`${SERVER.SYS}/doLogin`, params);
