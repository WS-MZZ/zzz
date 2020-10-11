export const perMissionMap = {
  index: {
    statistic: { id: 101, show: false }
  },
  document: {
    invoiceList: { id: 201, show: false },
    invoiceDetail: { id: 202, show: false },
    invoiceDelete: { id: 203, show: false },
    purchaseList: { id: 204, show: false },
    purchaseDetail: { id: 205, show: false },
    purchaseDelete: { id: 206, show: false },
    salesList: { id: 207, show: false },
    salesDetail: { id: 208, show: false },
    salesDelete: { id: 209, show: false },
    purchaseOrderList: { id: 211, show: false },
    purchaseOrderDetail: { id: 212, show: false },
    purchaseOrderDelete: { id: 213, show: false },
    salesOrderList: { id: 214, show: false },
    salesOrderDetail: { id: 215, show: false },
    salesOrderDelete: { id: 216, show: false }
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
  debugger
  return perMissionMap
}

