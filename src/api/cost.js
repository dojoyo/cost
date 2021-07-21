import request from '@/utils/request';
export default {
  // 获取枚举类型
  getEnum (type) {
    return request({
      url: '/enum/' + type,
      method: 'get'
    });
  },
  getSignList(data) {
    return request({
      url: '/contract/sign/list',
      method: 'post',
      data
    });
  },
  // 部门树
  getDeptTree() {
    return request({
      url: '/contacts/deptTree',
      method: 'get'
    });
  },
  // 人工费（人力成本）
  getLaborList(data) {
    return request({
      url: '/fee/pc/labor-cost/list',
      method: 'post',
      data
    });
  },
  // 人工费新增编辑
  setLabor(data) {
    return request({
      url: `/fee/pc/labor-cost/save`,
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 人工费下载模板
  getLaborTemp() {
    return request({
      url: '/fee/pc/labor-cost/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 人工费导入
  laborImport(data) {
    return request({
      url: '/fee/pc/labor-cost/import',
      method: 'post',
      data
    });
  },
  // 人工费导出
  laborExport(data) {
    return request({
      url: '/fee/pc/labor-cost/export',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data,
      responseType: 'arraybuffer'
    });
  },
  // 业务招待费-列表
  getServeList(data) {
    return request({
      url: '/fee/pc/entertain/list',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 业务招待费-新增
  addServe(data) {
    return request({
      url: '/fee/pc/entertain/add',
      method: 'post',
      data
    });
  },
  // 业务招待费-编辑
  editServe(data) {
    return request({
      url: `/fee/pc/entertain/${data.id}`,
      method: 'put',
      data
    });
  },
  // 业务招待费-获取详情
  serveDetail(id) {
    return request({
      url: `/fee/pc/entertain/${id}`,
      method: 'get'
    });
  },
  // 业务招待费-模板下载
  getServeTemp() {
    return request({
      url: '/fee/pc/entertain/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 业务招待费-导入
  serveImport(data) {
    return request({
      url: '/fee/pc/entertain/import',
      method: 'post',
      data
    });
  },
  // 业务招待费-导出
  serveExport(data) {
    return request({
      url: '/fee/pc/entertain/export',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data,
      responseType: 'arraybuffer'
    });
  },
  // 业务招待费-获取详情
  serveDelete(id) {
    return request({
      url: `/fee/pc/entertain/${id}`,
      method: 'DELETE'
    });
  },
  // 固定办公费-列表
  getFixedList(data) {
    return request({
      url: '/fee/pc/fixed-office/list',
      method: 'post',
      data
    });
  },
  // 固定办公费-新增编辑
  setFixed(data) {
    return request({
      url: `/fee/pc/fixed-office/save`,
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 固定办公费-下载模板
  getFixedTemp() {
    return request({
      url: '/fee/pc/fixed-office/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 固定办公费-导入
  fixedImport(data) {
    return request({
      url: '/fee/pc/fixed-office/import',
      method: 'post',
      data
    });
  },
  // 固定办公费-导出
  fixedExport(data) {
    return request({
      url: '/fee/pc/fixed-office/export',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data,
      responseType: 'arraybuffer'
    });
  },
  // 其他费用-列表
  getOtherList(data) {
    return request({
      url: '/fee/pc/other/list',
      method: 'post',
      data
    });
  },
  // 其他费用-新增编辑
  setOther(data) {
    return request({
      url: `/fee/pc/other/save`,
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 其他费用-下载模板
  getOtherTemp() {
    return request({
      url: '/fee/pc/other/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 其他费用-导入
  otherImport(data) {
    return request({
      url: '/fee/pc/other/import',
      method: 'post',
      data
    });
  },
  // 其他费用-导出
  otherExport(data) {
    return request({
      url: '/fee/pc/other/export',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data,
      responseType: 'arraybuffer'
    });
  }
};
