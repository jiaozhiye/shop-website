/*
 * @Author: mashaoze
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-18 10:45:05
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 执行登录
export const doLogin = params => axios.post(`${SERVER.SYS}/doLogin`, params);

// 退出登录
export const doLogout = params => axios.post(`${SERVER.SYS}/doLogout`, params);
