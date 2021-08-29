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
  // 用户查询
  getUser(data) {
    return request({
      url: '/contacts/userSearch',
      method: 'get',
      params: data
    })
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
  getLaborTemp(data) {
    return request({
      url: '/fee/pc/labor-cost/template/download',
      method: 'get',
      responseType: 'arraybuffer',
      params: data
    });
  },
  // 人工费导入
  laborImport(data) {
    return request({
      url: '/fee/pc/labor-cost/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 人工费导出
  laborExport(data) {
    return request({
      url: '/fee/pc/labor-cost/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 业务招待费-列表
  getServeList(data) {
    return request({
      url: '/fee/pc/entertain/list',
      method: 'post',
      data
    });
  },
  // 业务招待费-新增
  addServe(data) {
    return request({
      url: '/fee/pc/entertain/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 业务招待费-编辑
  editServe(data) {
    return request({
      url: `/fee/pc/entertain/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
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
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 业务招待费-导出
  serveExport(data) {
    return request({
      url: '/fee/pc/entertain/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 业务招待费-删除
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
  getFixedTemp(data) {
    return request({
      url: '/fee/pc/fixed-office/template/download',
      method: 'get',
      responseType: 'arraybuffer',
      params: data
    });
  },
  // 固定办公费-导入
  fixedImport(data) {
    return request({
      url: '/fee/pc/fixed-office/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 固定办公费-导出
  fixedExport(data) {
    return request({
      url: '/fee/pc/fixed-office/export',
      method: 'post',
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
  getOtherTemp(data) {
    return request({
      url: '/fee/pc/other/template/download',
      method: 'get',
      responseType: 'arraybuffer',
      params: data
    });
  },
  // 其他费用-导入
  otherImport(data) {
    return request({
      url: '/fee/pc/other/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 其他费用-导出
  otherExport(data) {
    return request({
      url: '/fee/pc/other/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-机票-列表
  getTravelAirList(data) {
    return request({
      url: '/fee/pc/travel/air-ticket/list',
      method: 'post',
      data
    });
  },
  // 差旅费-机票-新增
  addTravelAir(data) {
    return request({
      url: '/fee/pc/travel/air-ticket/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-机票-编辑
  editTravelAir(data) {
    return request({
      url: `/fee/pc/travel/air-ticket/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-机票-获取详情
  travelAirDetail(id) {
    return request({
      url: `/fee/pc/travel/air-ticket/${id}`,
      method: 'get'
    });
  },
  // 差旅费-机票-模板下载
  getTravelAirTemp() {
    return request({
      url: '/fee/pc/travel/air-ticket/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-机票-导入
  travelAirImport(data) {
    return request({
      url: '/fee/pc/travel/air-ticket/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 差旅费-机票-导出
  travelAirExport(data) {
    return request({
      url: '/fee/pc/travel/air-ticket/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-机票-删除
  travelAirDelete(id) {
    return request({
      url: `/fee/pc/travel/air-ticket/${id}`,
      method: 'DELETE'
    });
  },
  // 差旅费-滴滴-列表
  getTravelDidiList(data) {
    return request({
      url: '/fee/pc/travel/didi/list',
      method: 'post',
      data
    });
  },
  // 差旅费-滴滴-新增
  addTravelDidi(data) {
    return request({
      url: '/fee/pc/travel/didi/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-滴滴-编辑
  editTravelDidi(data) {
    return request({
      url: `/fee/pc/travel/didi/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-滴滴-获取详情
  travelDidiDetail(id) {
    return request({
      url: `/fee/pc/travel/didi/${id}`,
      method: 'get'
    });
  },
  // 差旅费-滴滴-模板下载
  getTravelDidiTemp() {
    return request({
      url: '/fee/pc/travel/didi/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-滴滴-导入
  travelDidiImport(data) {
    return request({
      url: '/fee/pc/travel/didi/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 差旅费-滴滴-导出
  travelDidiExport(data) {
    return request({
      url: '/fee/pc/travel/didi/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-滴滴-删除
  travelDidiDelete(id) {
    return request({
      url: `/fee/pc/travel/didi/${id}`,
      method: 'DELETE'
    });
  },
  // 差旅费-酒店-列表
  getTravelHotelList(data) {
    return request({
      url: '/fee/pc/travel/hotel/list',
      method: 'post',
      data
    });
  },
  // 差旅费-酒店-新增
  addTravelHotel(data) {
    return request({
      url: '/fee/pc/travel/hotel/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-酒店-编辑
  editTravelHotel(data) {
    return request({
      url: `/fee/pc/travel/hotel/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-酒店-获取详情
  travelHotelDetail(id) {
    return request({
      url: `/fee/pc/travel/hotel/${id}`,
      method: 'get'
    });
  },
  // 差旅费-酒店-模板下载
  getTravelHotelTemp() {
    return request({
      url: '/fee/pc/travel/hotel/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-酒店-导入
  travelHotelImport(data) {
    return request({
      url: '/fee/pc/travel/hotel/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 差旅费-酒店-导出
  travelHotelExport(data) {
    return request({
      url: '/fee/pc/travel/hotel/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-酒店-删除
  travelHotelDelete(id) {
    return request({
      url: `/fee/pc/travel/hotel/${id}`,
      method: 'DELETE'
    });
  },
  // 差旅费-其他-列表
  getTravelOtherList(data) {
    return request({
      url: '/fee/pc/travel/other/list',
      method: 'post',
      data
    });
  },
  // 差旅费-其他-新增
  addTravelOther(data) {
    return request({
      url: '/fee/pc/travel/other/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-其他-编辑
  editTravelOther(data) {
    return request({
      url: `/fee/pc/travel/other/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-其他-获取详情
  travelOtherDetail(id) {
    return request({
      url: `/fee/pc/travel/other/${id}`,
      method: 'get'
    });
  },
  // 差旅费-其他-模板下载
  getTravelOtherTemp() {
    return request({
      url: '/fee/pc/travel/other/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-其他-导入
  travelOtherImport(data) {
    return request({
      url: '/fee/pc/travel/other/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 差旅费-其他-导出
  travelOtherExport(data) {
    return request({
      url: '/fee/pc/travel/other/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-其他-删除
  travelOtherDelete(id) {
    return request({
      url: `/fee/pc/travel/other/${id}`,
      method: 'DELETE'
    });
  },
  // 差旅费-火车票-列表
  getTravelTrainList(data) {
    return request({
      url: '/fee/pc/travel/train-ticket/list',
      method: 'post',
      data
    });
  },
  // 差旅费-火车票-新增
  addTravelTrain(data) {
    return request({
      url: '/fee/pc/travel/train-ticket/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-火车票-编辑
  editTravelTrain(data) {
    return request({
      url: `/fee/pc/travel/train-ticket/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 差旅费-火车票-获取详情
  travelTrainDetail(id) {
    return request({
      url: `/fee/pc/travel/train-ticket/${id}`,
      method: 'get'
    });
  },
  // 差旅费-火车票-模板下载
  getTravelTrainTemp() {
    return request({
      url: '/fee/pc/travel/train-ticket/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-火车票-导入
  travelTrainImport(data) {
    return request({
      url: '/fee/pc/travel/train-ticket/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 差旅费-火车票-导出
  travelTrainExport(data) {
    return request({
      url: '/fee/pc/travel/train-ticket/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 差旅费-火车票-删除
  travelTrainDelete(id) {
    return request({
      url: `/fee/pc/travel/train-ticket/${id}`,
      method: 'DELETE'
    });
  },
  // 其他收入-列表
  getIncomeList(data){
    return request({
      url: '/fee/pc/other-income/list',
      method: 'post',
      data
    });
  },
   // 其他收入- 编辑
  editIncomeDetail(data){
    return request({
      url: `/fee/pc/other-income/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
   // 其他收入- 新增
   addIncome(data){
    return request({
      url: `/fee/pc/other-income/add`,
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
   // 其他收入- 详情
   getIncomeDetail(id){
    return request({
      url: `/fee/pc/other-income/${id}`,
      method: 'get',
    });
  },
  // 其他收入- 删除
  delIncome(id){
    return request({
      url: `/fee/pc/other-income/${id}`,
      method: 'delete',
    });
  },
  exportIncomeFile(data){
    return request({
      url: '/fee/pc/other-income/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 猎头费-列表
  hunterList(data){
    return request({
      url: '/fee/pc/headhunting/list',
      method: 'post',
      data
    });
  },
  // 猎头费-新增
  addHunter(data){
    return request({
      url: '/fee/pc/headhunting/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
   // 猎头费 - 编辑
  editHunter(data){
    return request({
      url: `/fee/pc/headhunting/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
   // 猎头费-详情
   hunterDetail(id){
    return request({
      url: `/fee/pc/headhunting/${id}`,
      method: 'get'
    });
  },
   // 猎头费 - 删除
  delHunter(id){
    return request({
      url: `/fee/pc/headhunting/${id}`,
      method: 'delete'
    });
  },
  // 猎头费 - 导出
  exportHunter(data){
    return request({
      url: '/fee/pc/headhunting/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 猎头费 - 导入
  importHunter(data){
    return request({
      url: '/fee/pc/headhunting/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    })
  },
  // 猎头费 - 模板下载
  downLoadHunter(){
    return request({
      url: '/fee/pc/headhunting/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 猎头费-新增人数-列表
  newHunterList(data){
    return request({
      url: '/fee/pc/headhunting/addition/list',
      method: 'post',
      data
    });
  },
  // 猎头费-新增人数-新增
  addNewHunter(data){
    return request({
      url: '/fee/pc/headhunting/addition/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 猎头费-新增人数- 编辑
  editNewHunter(data){
    return request({
      url: `/fee/pc/headhunting/addition/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 猎头费-新增人数-详情
  newHunterDetail(id){
    return request({
      url: `/fee/pc/headhunting/addition/${id}`,
      method: 'get'
    });
  },
  // 猎头费-新增人数- 删除
  delNewHunter(id){
    return request({
      url: `/fee/pc/headhunting/addition/${id}`,
      method: 'delete'
    });
  },
  //工商类 - 列表
  bizExpenseList(data){
    return request({
      url: '/fee/pc/biz-expense/list',
      method: 'post',
      data
    });
  },
  //工商类 - 新增
  addExpenseList(data){
    return request({
      url: '/fee/pc/biz-expense/add',
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  //工商类 - 编辑
  editExpenseList(data){
    return request({
      url: `/fee/pc/biz-expense/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  //工商类 - 详情
  expenseDetail(id){
    return request({
      url: `/fee/pc/biz-expense/${id}`,
      method: 'get',
    });
  },
  //工商类 - 模板下载
  expenseDownTemplate(){
    return request({
      url: '/fee/pc/biz-expense/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  //工商类 - 导出
  exportExpense(data){
    return request({
      url: '/fee/pc/biz-expense/export',
      method: 'post',
      responseType: 'arraybuffer',
      data
    });
  },
  //工商类 - 删除
  delExpense(id){
    return request({
      url: `/fee/pc/biz-expense/${id}`,
      method: 'delete'
    });
  },
  //工商类 - 导入
  importExpense(data){
    return request({
      url: '/fee/pc/biz-expense/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  //数据发布 - 列表
  releaseList(data){
    return request({
      url: '/fee/pc/release/list',
      method: 'post',
      data
    });
  },
  //数据发布 - 发布数据
  publishRelease(data){
    return request({
      url: '/fee/pc/release/data',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  //费用分摊设置 - 列表
  shareList(data){
    return request({
      url:'/fee/pc/share/list',
      method:'post',
      data
    })
  },
  //费用分摊设置 - 编辑
  editShareList(data){
    return request({
      url:'/fee/pc/share/edit',
      method:'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    })
  },
  //超额提醒 - 列表
  excessRemindList(data){
    return request({
      url:'/fee/pc/excess-remind/list',
      method:'post',
      data
    })
  },
  //超额提醒 - 新增
  addExcessRemind(data){
    return request({
      url:'/fee/pc/excess-remind/add',
      method:'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    })
  },
  //超额提醒 - 详情
  excessRemindDetail(id){
    return request({
      url:`/fee/pc/excess-remind/${id}`,
      method:'get'
    })
  },
  //超额提醒 - 编辑
  editExcessRemind(data){
    return request({
      url:`/fee/pc/excess-remind/${data.id}`,
      method:'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    })
  },
  //超额提醒 - 删除
  delExcessRemind(id){
    return request({
      url:`/fee/pc/excess-remind/${id}`,
      method:'delete'
    })
  },
  //超额提醒 - 推送
  pushExcessRemind(id){
    return request({
      url:`/fee/pc/excess-remind/${id}/push`,
      method:'delete'
    })
  },
  // 咨询中介费-列表
  getAdvisoryList(data) {
    return request({
      url: '/fee/pc/advisory/list',
      method: 'post',
      data
    });
  },
  // 咨询中介费-新增
  addAdvisory(data) {
    return request({
      url: '/fee/pc/advisory/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 咨询中介费-编辑
  editAdvisory(data) {
    return request({
      url: `/fee/pc/advisory/${data.id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 咨询中介费-获取详情
  advisoryDetail(id) {
    return request({
      url: `/fee/pc/advisory/${id}`,
      method: 'get'
    });
  },
  // 咨询中介费-模板下载
  getAdvisoryTemp() {
    return request({
      url: '/fee/pc/advisory/template/download',
      method: 'get',
      responseType: 'arraybuffer'
    });
  },
  // 咨询中介费-导入
  advisoryImport(data) {
    return request({
      url: '/fee/pc/advisory/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  // 咨询中介费-导出
  advisoryExport(data) {
    return request({
      url: '/fee/pc/advisory/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 咨询中介费-删除
  advisoryDelete(id) {
    return request({
      url: `/fee/pc/advisory/${id}`,
      method: 'DELETE'
    });
  },
  //数据库费 - 使用情况- 列表
  databaseUseList(data) {
    return request({
      url: '/fee/pc/database/usage/list',
      method: 'post',
      data
    });
  },
  //数据库费 - 使用情况- 导入
  importDatabaseList(data) {
    return request({
      url: '/fee/pc/database/usage/import',
      method: 'post',
      headers:{ 'Content-Type': 'multipart/form-data' },
      data
    });
  },
  //数据库费 - 使用情况- 导出
  exportDatabaseList(data) {
    return request({
      url: '/fee/pc/database/usage/export',
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  //数据库费 - 使用情况- 模板下载
  downDatabaseList() {
    return request({
      url: '/fee/pc/database/usage/template/download',
      method: 'get',
      responseType:'arraybuffer'
    });
  },
  //数据库费 - 使用情况- 删除
  deDatabaseList(id) {
    return request({
      url: `/fee/pc/database/usage/${id}`,
      method: 'delete'
    });
  },
  //数据库费 - 使用情况- 编辑
 editDatabase(data) {
    return request({
      url: `/fee/pc/database/usage/${data.id}`,
      method: 'put',
      headers:{ 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  //数据库费 - 使用情况- 新增
  addDatabaseList(data) {
    return request({
      url: `/fee/pc/database/usage/add`,
      method: 'post',
      headers:{ 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 数据库费-部门选择列表
  moreDatabaseList(id) {
    return request({
      url: `/fee/pc/database/${id}/dept/list`,
      method: 'get'
    });
  },
  // 数据库-账号分配-列表
  accountDatabaseList(data) {
    return request({
      url: `/fee/pc/database/account/list`,
      method: 'post',
      data
    });
  },
  // 数据库-账号分配-新增
  addAccount(data) {
    return request({
      url: `/fee/pc/database/account/add`,
      method: 'post',
      headers:{ 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 数据库费-账号分配
  allocateAccount(data) {
    return request({
      url: `/fee/pc/database/${data.id}/account/allocated`,
      method: 'post',
      headers:{ 'Content-Type': 'application/json; charset=utf-8' },
      data: data.data
    })
  },
  // 数据库-账号分配-导出
  exportAccount(data) {
    return request({
      url: `/fee/pc/database/account/export`,
      method: 'post',
      data,
      responseType: 'arraybuffer'
    });
  },
  // 数据库-账号分配-详情
  accountDetail(id) {
    return request({
      url: `/fee/pc/database/account/${id}`,
      method: 'get'
    });
  },
  // 数据库-账号分配-编辑
  editAccount(data) {
    return request({
      url: `/fee/pc/database/account/${data.id}`,
      method: 'put',
      headers:{ 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 数据库-账号分配-删除
  delAccount(id) {
    return request({
      url: `/fee/pc/database/account/${id}`,
      method: 'delete'
    });
  },
  // 数据库-录入-删除
  delReocrdData(id) {
    return request({
      url: `/fee/pc/database/${id}`,
      method: 'delete'
    });
  },
  // 数据库-录入-列表
  reocrdDatabaseList(data) {
    return request({
      url: `/fee/pc/database/list`,
      method: 'post',
      data
    });
  },
  // 数据库-录入-新增
  addReocrdDatabase(data) {
    return request({
      url: `/fee/pc/database/add`,
      method: 'post',
      headers:{ 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 数据库-录入-编辑
  editReocrdDatabase(data) {
    return request({
      url: `/fee/pc/database/${data.id}`,
      method: 'put',
      headers:{ 'Content-Type': 'application/json; charset=utf-8' },
      data
    });
  },
  // 数据库-录入-详情
  recordDatabaseDetail(id) {
    return request({
      url: `/fee/pc/database/${id}`,
      method: 'get'
    });
  },
  // 数据库-费用分摊设置
  setCostShare(data) {
    return request({
      url: `/fee/pc/database/${data.id}/cost-share`,
      method: 'post',
      headers:{ 'Content-Type': 'application/json; charset=utf-8' },
      data: data.data
    });
  },
  costShareList(id) {
    return request({
      url: `/fee/pc/database/${id}/cost-share/list`,
      method: 'get'
    });
  },
  // 各页面新增费用合计
  // 机票-费用合计
  getTravelAirTotal(data) {
    return request({
      url: '/fee/pc/travel/air-ticket/total',
      method: 'post',
      data
    });
  },
  // 滴滴-费用合计
  getTravelDidiTotal(data) {
    return request({
      url: '/fee/pc/travel/didi/total',
      method: 'post',
      data
    });
  },
  // 酒店-费用合计
  getTravelHotelTotal(data) {
    return request({
      url: '/fee/pc/travel/hotel/total',
      method: 'post',
      data
    });
  },
  // 其他-费用合计
  getOtherTotal(data) {
    return request({
      url: '/fee/pc/other/total',
      method: 'post',
      data
    });
  },
  // 火车票-费用合计
  getTravelTrainTotal(data) {
    return request({
      url: '/fee/pc/travel/train-ticket/total',
      method: 'post',
      data
    });
  },
  // 业务招待费-费用合计
  getServeTotal(data) {
    return request({
      url: '/fee/pc/entertain/total',
      method: 'post',
      data
    });
  },
  // 咨询中介费-费用合计
  getAdvisoryTotal(data) {
    return request({
      url: '/fee/pc/advisory/total',
      method: 'post',
      data
    });
  },
  // 数据库费-费用合计
  reocrdDatabaseTotal(data) {
    return request({
      url: `/fee/pc/database/total`,
      method: 'post',
      data
    });
  },
  // 猎头费-费用合计
  hunterTotal(data){
    return request({
      url: '/fee/pc/headhunting/total',
      method: 'post',
      data
    });
  },
  // 工商类费用-费用合计
  bizExpenseTotal(data){
    return request({
      url: '/fee/pc/biz-expense/total',
      method: 'post',
      data
    });
  },
};
