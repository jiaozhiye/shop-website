/*
 * @Author: mashaoze
 * @Date: 2020-05-02 09:10:56
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-02 09:13:06
 */
import Mock from 'mockjs';

export default Mock.mock({
  code: 1,
  message: '',
  'data|5-10': [
    {
      'id|+1': 1,
      title: '@county(true)'
    }
  ]
});
