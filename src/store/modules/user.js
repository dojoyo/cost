import { getUser, setUser, removeUser } from '@/utils/auth';
import api from '@/api/user';

const user = {
  state: {
    user: getUser(),
    userList: '',
    userDeptList: '',
    userRoleList: ''
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_USER_LIST: (state, list) => {
      state.userList = list;
    },
    SET_USER_DEPT_LIST: (state, list) => {
      state.userDeptList = list;
    },
    SET_USER_ROLE_LIST: (state, list) => {
      state.userRoleList = list;
    }
  },

  actions: {
    // 账号登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.login(userInfo).then(res => {
          if (res.code === 200) {
            setUser(res.data);
            commit('SET_USER', res.data);
            setTimeout(() => {
              api.getUserDetail(res.data.jwtClaims.id).then(r => {
                console.log(r);
                res.data.detail = r.data;
                setUser(res.data);
                commit('SET_USER', res.data);
                resolve();
              });
            }, 300);
          } else {
            reject(res);
          }
        }).catch(err => {
          reject(err);
        });
      });
    },

    // 电话登录
    LoginPhone ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.loginPhone(userInfo).then(res => {
          if (res.code === 200) {
            setUser(res.data);
            commit('SET_USER', res.data);
            setTimeout(() => {
              api.getUserDetail(res.data.jwtClaims.id).then(r => {
                console.log(r);
                res.data.detail = r.data;
                setUser(res.data);
                commit('SET_USER', res.data);
                resolve();
              });
            }, 300);
          } else {
            reject(res);
          }
        }).catch(err => {
          reject(err);
        });
      });
    },

    // 获取用户信息
    GetUser ({ commit, state }) {
      return new Promise((resolve, reject) => {
        resolve(getUser);
      });
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.logout().then(res => {
          if (res.code === 200) {
            removeUser();
            commit('SET_USER', {
              jwtClaims:{
                ar:[],
                di:'',
                ei:'',
                en:'',
                gt:'',
                id:'',
                lt:'',
                ou:'',
                sc:'',
                su:'',
                ua:'',
                un:'',
                up:'',
                wa:''
              },
              refreshToken:'',
              token:''
            });
            resolve();
          } else {
            reject(res);
          }
        }).catch(err => {
          reject(err);
        });
      });
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER', '');
        removeUser();
        resolve();
      });
    },

    SetUserList({ commit }, list) {
      commit('SET_USER_LIST', list);
    },

    SetUserDeptList({ commit }, list) {
      commit('SET_USER_DEPT_LIST', list);
    },

    SetUserRoleList({ commit }, list) {
      commit('SET_USER_ROLE_LIST', list);
    },

    SetUser({ commit }, user) {
      let u = user;
      api.getUserDetail(u.jwtClaims.id).then(r => {
        u.detail = r.data;
        setUser(u);
        commit('SET_USER', u);
      });
      // setUser(user);
      // commit('SET_USER', user);
    }
  }
};

export default user;
