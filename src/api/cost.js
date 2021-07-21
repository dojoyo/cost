import request from '@/utils/request';
export default {
  // 获取枚举类型
  getEnum (type) {
    return request({
      url: '/enum/' + type,
      method: 'get'
    })
  },
  getSignList(data){
    return request({
      url: '/contract/sign/list',
      method: 'post',
      data: data
    })
  },
};
