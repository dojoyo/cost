import Cookies from 'js-cookie';

const app = {
  state: {
    version: '1.2.100',
    size: Cookies.get('size') || 'medium',
    stage: '',
    progressColor: { NM: '#20c997', WN: '#ffc442', DG: '#ff5b57', NU: '#48525C' },
    menu: [
      { name: '费用',
        iconOff: 'icon-feiyong_normal',
        iconOn: 'icon-feiyong_pressed',
        path: '/cost/labor',
        isActive: false,
        code: '',
        sideMenu: [
          { name: '人工费', icon: 'icon-renlichengben', path: '/cost/labor', code: '' },
          { name: '差旅费', icon: 'icon-chalvfei', path: '/cost/travel', code: '' },
          { name: '业务招待费', icon: 'icon-yewuzhaodaifei', path: '/cost/serve', code: '' },
          { name: '咨询/中介费', icon: 'icon-waibuzixunzhongjiefei', path: '/cost/agent', code: '' },
          { name: '数据库费', icon: 'icon-shujukufei', path: '/cost/database', code: '',
            children: [
              { name: '数据库录入费', icon: '', path: '/cost/database/entering', code: '' },
              { name: '数据库录账号分配', icon: '', path: '/cost/database/allocation', code: '' },
              { name: '凯胜专家库使用情况', icon: '', path: '/cost/database/expert', code: '' }
            ]
          },
          { name: '猎头费', icon: 'icon-lietoufei', path: '', code: '',
            children: [
              { name: '猎头招聘费', icon: '', path: '/cost/headhunting', code: '' },
              { name: '新增人数', icon: '', path: '/cost/newly', code: '' },
            ]
          },
          { name: '固定办公费', icon: 'icon-gudingbangongfei', path: '/cost/office', code: '' },
          { name: '工商类费用', icon: 'icon-gongshangleifeiyong', path: '/cost/commerce', code: '' },
          { name: '其他费用', icon: 'icon-qitafeiyong', path: '/cost/other', code: '' },
          { name: '其他收入', icon: 'icon-qitashouru', path: '/cost/income', code: '' },
          { name: '数据发布', icon: 'icon-shujufabu', path: '/cost/distribution', code: '' },
          { name: '超额提醒', icon: 'icon-chaoetixing', path: '/cost/overage', code: '' },
          { name: '费用分摊比例设置', icon: 'icon-feiyongfentanbilishezhi', path: '/cost/setting', code: '' },
        ]
      },
      { name: '归档',
        iconOff: 'icon-guidangguanli_normal1',
        iconOn: 'icon-guidangguanli_pressed1',
        path: '',
        isActive: false,
        code: 140,
        sideMenu: [
          { name: '电子签约', icon: 'icon-dianziqianyue1', path: '/document/contract', code: 144 },
          { name: '模版管理', icon: 'icon-mobanguanli1', path: '', code: 140,
            children: [
              { name: '表单模版', icon: 'icon-biaodanmoban', path: '/document/form', code: 142 },
              { name: '电子签章模版', icon: 'icon-dianziqianzhangmoban', path: '/document/signature', code: 143 }
            ]
          }
        ]
      }
    ],
    system: [
      { name: '控制台', icon: 'icon-houtaizonglan', path: '/system/dashboard', isActive: false, code: 1 },
      { name: '应用管理', icon: 'icon-yingyongzhongxin_normal', path: '/system/application', isActive: false, code: 4 },
      { name: '发版记录', icon: 'icon-fabanjilu', path: '/system/version', isActive: false, code: 7 },
      { name: '常见问题', icon: 'icon-changjianwenti', path: '/system/question', isActive: false, code: 8 },
      { name: '成员管理', icon: 'icon-chengyuanjianbao', path: '/system/members', isActive: false, code: 2 },
      { name: '汇报关系', icon: 'icon-woshenqingde', path: '/system/rank', isActive: false, code: 6 },
      { name: '权限管理', icon: 'icon-juseguanli', path: '/system/role', isActive: false, code: 3 },
      { name: '授权管理', icon: 'icon-pingfenguanli', path: '/system/authorization', isActive: false, code: 9 },
      { name: '账户设置', icon: 'icon-zhanghuguanli', path: '/system/account', isActive: false, code: 5 }
    ],
    path: '',
    menuActiveIndex: 0,
    requestLoading: 0,
    messageCount: 0, // 消息
    timeZone: '',
    knowledgePageInfo: {
      tab: 0, // 顶部导航
      indexArticle: -1, // 首页最新
      indexOthers: 0, // 首页侧边
      pageSubTab: 0, // 页面二级导航
      pageOrderType: 'DE' // 页面排序
    }
  },
  mutations: {
    SET_LOADING: (state, status) => {
      // error 的时候直接重置
      if (status === 0) {
        state.requestLoading = 0;
        return;
      }
      state.requestLoading = status ? ++state.requestLoading : --state.requestLoading;
    },
    SET_PATH: (state, path) => {
      state.path = path;
    },
    SET_STAGE: (state, stage) => {
      state.stage = stage;
    },
    SET_SIZE: (state, size) => {
      state.size = size;
      Cookies.set('size', size);
    },
    SET_MENU: (state, index) => {
      state.menu.forEach(function (value, index, array) {
        value.isActive = false;
      });
      state.menu[index].isActive = true;
      state.menuActiveIndex = index;
    },
    SET_CHILD_MENU: (state, status) => {
      state.menu.forEach(function (value, index, array) {
        value.isActive = false;
      });
      state.menu[status[0]].isActive = true;
      state.menuActiveIndex = status[0];
    },
    SET_MESSAGE_COUNT: (state, count) => {
      if (count !== undefined) {
        state.messageCount = count;
      } else {
        state.messageCount--;
      }
    },
    SET_TIMEZONE: (state, zone) => {
      state.timeZone = zone;
    },
    SET_KNOWLEDGEPAGEINFO: (state, data) => {
      state.knowledgePageInfo = data;
    }
  },
  actions: {
    SetLoading({ commit }, status) {
      commit('SET_LOADING', status);
    },
    SetPath({ commit }, status) {
      commit('SET_PATH', status);
    },
    SetStage({ commit }, status) {
      commit('SET_STAGE', status);
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size);
    },
    SetMenu({ commit }, status) {
      commit('SET_MENU', status);
    },
    SetChildMenu({ commit }, status) {
      commit('SET_CHILD_MENU', status);
    },

    SetMessageCount({ commit }, data) {
      commit('SET_MESSAGE_COUNT', data);
    },
    SetTimeZone({ commit }, status) {
      commit('SET_TIMEZONE', status);
    },
    SetKnowledgePageInfo({ commit }, status) {
      commit('SET_KNOWLEDGEPAGEINFO', status);
    }
  }
};
export default app;
