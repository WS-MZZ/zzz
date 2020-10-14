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
    applicationDetail: { id: 302, show: false }
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
    userMange: { id: 601, show: false },
    userDelete: { id: 601, show: false }
  },
  roleManagement: {
    roleList: { id: 701, show: false },
    roleMange: { id: 701, show: false },
    roleDelete: { id: 701, show: false }
  },
  system: {
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

