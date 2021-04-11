/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-03-28 11:18:38
 */
import Cookies from 'js-cookie';

// 架构 cookie
export const getToken = () => Cookies.get('jwt');
export const setToken = val => Cookies.set('jwt', val);
export const removeToken = () => Cookies.remove('jwt');

export const getGray = () => localStorage.getItem('gray');
export const setGray = val => localStorage.setItem('gray', val);
export const removeGray = () => localStorage.removeItem('gray');

export const getUserName = () => Cookies.get('username');
export const setUserName = val => Cookies.set('username', val);
export const removeUserName = () => Cookies.remove('username');

export const getWechatAvatar = () => localStorage.getItem('avatar');
export const setWechatAvatar = val => localStorage.setItem('avatar', val);
export const removeWechatAvatar = () => localStorage.removeItem('avatar');
