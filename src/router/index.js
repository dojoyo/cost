import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

const layout = _import('layout/layout');

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: '/', component: _import('login/login'), meta: { title: '账号登录' } },
    { path: '/login', name: 'login', component: _import('login/login'), meta: { title: '账号登录' } },
    { path: '/reset', name: 'reset', component: _import('login/reset'), meta: { title: '设置密码' } },
    { path: '/404', name: '404', component: _import('public/404'), meta: { title: '无效访问' } },
    { path: '*', redirect: '/' },
    { path: '/cost',
      component: layout,
      redirect: '/cost'
    },
    {
      path: '/cost',
      component: layout,
      children: [
        { path: 'labor', name: 'cost-labor', component: _import('cost/labor/index'), meta: { title: 'cost-labor' } },
        { path: 'travel', name: 'cost-travel', component: _import('cost/travel/index'), meta: { title: 'cost-travel' } },
        { path: 'serve', name: 'cost-serve', component: _import('cost/serve/index'), meta: { title: 'cost-serve' } },
        { path: 'agent', name: 'cost-agent', component: _import('cost/agent/index'), meta: { title: 'cost-agent' } },
        { path: 'headhunting', name: 'cost-headhunting', component: _import('cost/headhunting/index'), meta: { title: 'cost-headhunting' } },
        { path: 'office', name: 'cost-office', component: _import('cost/office/index'), meta: { title: 'cost-office' } },
        { path: 'commerce', name: 'cost-commerce', component: _import('cost/commerce/index'), meta: { title: 'cost-commerce' } },
        { path: 'other', name: 'cost-other', component: _import('cost/other/index'), meta: { title: 'cost-other' } },
        { path: 'income', name: 'cost-income', component: _import('cost/income/index'), meta: { title: 'cost-income' } },
        { path: 'distribution', name: 'cost-distribution', component: _import('cost/distribution/index'), meta: { title: 'cost-distribution' } },
        { path: 'overage', name: 'cost-overage', component: _import('cost/overage/index'), meta: { title: 'cost-overage' } },
        { path: 'setting', name: 'cost-setting', component: _import('cost/setting/index'), meta: { title: 'cost-setting' } },
        { path: 'database/entering', name: 'cost-database-entering', component: _import('cost/database/entering/index'), meta: { title: 'cost-database-entering' } },
        { path: 'database/allocation', name: 'cost-database-allocation', component: _import('cost/database/allocation/index'), meta: { title: 'cost-database-allocation' } },
        { path: 'database/expert', name: 'cost-database-expert', component: _import('cost/database/expert/index'), meta: { title: 'cost-database-expert' } },
      ]
    },
    {
      path: '/document',
      component: layout,
      children: [
        { path: 'contract', name: 'document-contract', component: _import('document/contract'), meta: { title: 'document-contract' } },
        { path: 'form', name: 'document-form', component: _import('document/form'), meta: { title: 'document-form' } },
        { path: 'signature', name: 'document-signature', component: _import('document/signature'), meta: { title: 'document-signature' } },
      ]
    }
  ]
});
