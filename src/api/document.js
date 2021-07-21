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
  getFormTemplateList(data){
    return request({
      url: '/archive/template/form/list',
      method: 'post',
      data: data
    })
  },
  getSignatureTemplateList(data){
    return request({
      url: '/archive/template/contract/list',
      method: 'post',
      data: data
    })
  },
  getTemplateGrants(id){
    return request({
      url: '/archive/template/form/'+id+'/grants',
      method: 'get',
    })
  },
  saveTemplateGrants(data,id){
    return request({
      url: '/archive/template/form/'+id+'/grants/save',
      method: 'post',
      data: data
    })
  },
  uploadTemplateFiles(data,id){
    return request({
      url: '/archive/template/form/'+id+'/upload',
      method: 'post',
      data: data
    })
  },
  uploadContractFiles(data,id){
    return request({
      url: '/archive/template/contract/'+id+'/upload',
      method: 'post',
      data: data
    })
  },
  downloadContractFiles(tid,aid){
    return request({
      url: '/archive/template/contract/'+tid+'/attach/'+aid,
      method: 'get',
      responseType: 'arraybuffer'
    })
  },
  deleteContractFiles(tid,aid){
    return request({
      url: '/archive/template/form/'+tid+'/attach/'+aid,
      method: 'delete'
    })
  },
  downloadContractSignFile(id){
    return request({
      url: '/contract/sign/'+id,
      method: 'get',
      responseType: 'arraybuffer'
    })
  },
  showFile(id){
    return request({
      url: '/contract/sign/'+id+'/report',
      method: 'get',
      responseType: 'arraybuffer'
    })
  },
  cancelSign(id){
    return request({
      url: '/contract/sign/'+id+'/cancelled',
      method: 'put',
    })
  },
  recoverSign(id){
    return request({
      url: '/contract/sign/'+id+'/recover',
      method: 'put',
    })
  },
  sendMsg(id){
    return request({
      url: '/contract/sign/'+id+'/sms',
      method: 'put',
    })
  },
  resyncSign(data){
    return request({
      url: '/public/contract/resync/sign',
      method: 'post',
      data: data
    })
  },
  retry(id){
    return request({
      url: '/contract/sign/'+id+'/launch/retry',
      method: 'post'
    })
  },
};
