const getters = {
  requestLoading: (state) => state.app.requestLoading,
  menu: (state) => state.app.menu,
  system: (state) => state.app.system,
  version: (state) => state.app.version,
  menuActiveIndex: (state) => state.app.menuActiveIndex,
  progressColor: (state) => state.app.progressColor,
  path: (state) => state.app.path,
  size: (state) => state.app.size,
  messageCount: (state) => state.app.messageCount,
  stage: (state) => state.app.stage,
  timeZone: (state) => state.app.timeZone,
  user: (state) => state.user,
  userList: (state) => state.user.userList,
  userDeptList: (state) => state.user.userDeptList,
  userRoleList: (state) => state.user.userRoleList,
  approveCount: (state) => state.approve.count,
  diskFavor: (state) => state.disk.favor,
  diskProcess: (state) => state.disk.list,
  diskVersion: (state) => state.disk.diskVersion,
  knowledgePageInfo: (state) => state.app.knowledgePageInfo
};
export default getters;
