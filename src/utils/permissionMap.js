export const perMissionMap = {
  index: {
    enterpriseInfo: { id: 1101, show: false },
    editEnterprise: { id: 1102, show: false },
    statistic: { id: 1103, show: false }
  },
  document: {
    invoiceList: { id: 1201, show: false },
    invoiceDetail: { id: 1202, show: false },
    invoiceDelete: { id: 1203, show: false },
    purchaseList: { id: 1204, show: false },
    purchaseDetail: { id: 1205, show: false },
    purchaseDelete: { id: 1206, show: false },
    salesList: { id: 1207, show: false },
    salesDetail: { id: 1208, show: false },
    salesDelete: { id: 1209, show: false },
    purchaseOrderList: { id: 1211, show: false },
    purchaseOrderDetail: { id: 1212, show: false },
    purchaseOrderDelete: { id: 1213, show: false },
    salesOrderList: { id: 1214, show: false },
    salesOrderDetail: { id: 1215, show: false },
    salesOrderDelete: { id: 1216, show: false }
  },
  interface: {
    applicationList: { id: 1301, show: false },
    applicationDetail: { id: 1302, show: false }
  },
  interfaceDoc: {
    interfaceDocList: { id: 1401, show: false }
  },
  interfaceRecord: {
    recordList: { id: 1501, show: false },
    recordDetail: { id: 1502, show: false }
  },
  userManagement: {
    userList: { id: 1601, show: false },
    userMange: { id: 1601, show: false },
    userDelete: { id: 1601, show: false }
  },
  roleManagement: {
    roleList: { id: 1701, show: false },
    roleMange: { id: 1701, show: false },
    roleDelete: { id: 1701, show: false }
  },
  system: {
    sysLog: { id: 1802, show: false }
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

