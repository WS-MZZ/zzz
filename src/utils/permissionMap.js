export const perMissionMap = {
  index: {
    statistic: { id: 101, show: false }
  },
  company: {
    companyList: { id: 201, show: false },
    companyMockLogin: { id: 202, show: false },
    companyEdit: { id: 203, show: false },
    compayEnable: { id: 204, show: false },
    companyReset: { id: 205, show: false },
    companyDelete: { id: 206, show: false },
    companyAdd: { id: 207, show: false }
  },
  interface: {
    applicationList: { id: 301, show: false },
    applicationDetail: { id: 302, show: false },
    applicationAdd: { id: 303, show: false },
    applicationEdit: { id: 304, show: false },
    applicationFreeze: { id: 305, show: false },
    applicationDelete: { id: 306, show: false }
  },
  interfaceDoc: {
    interfaceDocList: { id: 401, show: false }
  },
  interfaceRecord: {
    recordList: { id: 501, show: false },
    recordDetail: { id: 502, show: false }
  },
  userManagement: {
    userList: { id: 601, show: false },
    userMange: { id: 602, show: false },
    userDelete: { id: 603, show: false }
  },
  roleManagement: {
    roleList: { id: 701, show: false },
    roleMange: { id: 702, show: false },
    roleDelete: { id: 703, show: false }
  },
  system: {
    sysConfiguration: { id: 801, show: false },
    sysLog: { id: 802, show: false }
  }
}

export function loadAuthInfo(authIds) {
  for (const key1 in perMissionMap) {
    for (const key2 in perMissionMap[key1]) {
      if (authIds.indexOf(perMissionMap[key1][key2].id) !== -1) {
        perMissionMap[key1][key2].show = true
      }
    }
  }
  return perMissionMap
}

