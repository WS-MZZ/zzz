<template>
  <div>
    <div class="menu-detailSty">
      <div class="detail-title">新增发票</div>
      <div class="detail-briefintroduction">
        简介这里是接口的简介简介这里是接口的简介简介这里是接口的简介简介这里是接口的简介简介这里是接口的简介
      </div>
      <div class="detail-moType">
        <div class="moType-module">
          所属分类: <span class="moType-moduleContent">合同类</span>
        </div>
        <div class="moType-module">
          收费类型: <span class="moType-moduleContent">按次收费</span>
        </div>
        <div class="moType-module">
          输入输出类型: <span class="moType-moduleContent">IN</span>
        </div>
      </div>
      <!-- API URL -->
      <div class="detail-tableModule">
        <div class="tableModule-title">Api URL</div>
        <div class="tableModule-border">
          <div class="tablemodule-borderTop">
            <div class="bordertop-left">URL</div>
            <div class="bordertop-right">/api/document/invoiceDocument</div>
          </div>
          <div class="tablemodule-borderBottom">
            <div class="bordertop-left">请求方式</div>
            <div class="bordertop-right">POST</div>
          </div>
        </div>
      </div>
      <!-- 请求参数 -->
      <div class="detail-tableModule">
        <div class="tableModule-title">请求参数</div>
        <div>
          <el-table
            :data="tableData"
            border
            style="width: 100%;"
            :header-cell-style="{background:'#f5f7fa',color:'black'}"
          >
            <el-table-column
              prop="dateName"
              label="参数名"
            />
            <el-table-column
              prop="meaning"
              label="含义"
            />
            <el-table-column
              prop="rule"
              label="规则说明"
            />
            <el-table-column
              prop="confirm"
              label="是否必须"
            />
            <el-table-column
              prop="defaultValue"
              label="缺省值"
            />
          </el-table>
        </div>
      </div>
      <!-- 返回结果参数说明 -->
      <div class="detail-tableModule">
        <div class="tableModule-title">返回结果参数说明</div>
        <div>
          <el-table
            :data="tableDetail"
            border
            style="width: 100%;"
            :header-cell-style="{background:'#f5f7fa',color:'black'}"
          >
            <el-table-column
              prop="date"
              label="名称"
            />
            <el-table-column
              prop="meaning"
              label="含义"
            />
            <el-table-column
              prop="rule"
              label="规则说明"
            />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceContent',
  props: {
  },
  data() {
    return {
      tableData: [{
        dateName: 'agentInfo',
        meaning: '办理人',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      }, {
        dateName: 'agentInfo2',
        meaning: '经办人2',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      }, {
        dateName: 'appId',
        meaning: 'appId',
        rule: '',
        confirm: '必须',
        defaultValue: ''

      }, {
        dateName: 'appName',
        meaning: '应用名称',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      }, {
        dateName: 'appSecret',
        meaning: 'appSecret',
        rule: '',
        confirm: '必须',
        defaultValue: ''

      },
      {
        dateName: 'auditor',
        meaning: '审核人',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'billDate',
        meaning: '单据日期',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      }, {
        dateName: 'billId',
        meaning: '单据id',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'billNo',
        meaning: '单据编号',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'billType',
        meaning: '单据类型',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      }, {
        dateName: 'buyOrderNo',
        meaning: '采购订单号',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      }, {
        dateName: 'code',
        meaning: '发票代码',
        rule: '',
        confirm: '必须',
        defaultValue: ''

      },
      {
        dateName: 'companyNo',
        meaning: '公司编号',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'contactUnitNo',
        meaning: '往来单位编号',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'contractList',
        meaning: '关联合同',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'customerAddressAndPhone',
        meaning: '客户地址和电话',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'customerBankAddressAndNo',
        meaning: '客户开户行和账号',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'customerID',
        meaning: '纳税人识别号',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'customerName',
        meaning: '客户名称',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'customerNo',
        meaning: '客户编号',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'customerOrderNo',
        meaning: '客户订单号',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'drawer',
        meaning: '开票人',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'ext',
        meaning: '扩展字段',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'fileList',
        meaning: '文件',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'invoiceList',
        meaning: '关联发票',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'invoiceUrl',
        meaning: '发票url	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'makeOutDate',
        meaning: '开票日期	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'no',
        meaning: '发票号码	',
        rule: '',
        confirm: '必须',
        defaultValue: ''

      },
      {
        dateName: 'notTaxAmount',
        meaning: '不含税额	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'payee',
        meaning: '收款人	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'remark',
        meaning: '备注	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'saleAddressAndPhone',
        meaning: '销方地址及电话	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'saleBankAndNo',
        meaning: '销方银行及账号	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'saleId',
        meaning: '销方纳税人识别号	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'saleOrderNo',
        meaning: '销售订单号	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'shopNo',
        meaning: '门店编号	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'status',
        meaning: '发票状态	',
        rule: '',
        confirm: '非必须',
        defaultValue: ''

      },
      {
        dateName: 'sysApplicationId',
        meaning: '应用id',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: 'sysEnterpriseId',
        meaning: '企业id',
        rule: '',
        confirm: '必须',
        defaultValue: ''
      },
      {
        dateName: 'sysEnterpriseName',
        meaning: '企业名称',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: 'tagList',
        meaning: '标签',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: 'taxAmount',
        meaning: '税额',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: 'taxBureau',
        meaning: '税务局',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: 'taxRate',
        meaning: '税率',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: 'totalAmount',
        meaning: '价税合计',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: 'type',
        meaning: '发票类型',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: 'validCode',
        meaning: '发育校验码',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      }
      ],
      tableDetail: [
        { dataName: 'Content-Type', name: '反回状态', addressz: `值为0或者1  1：成功;0：失败` },
        { date: 'ok', name: '', addressz: `` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-detail {
    // width: 80%;
    .menu-detailSty {
      margin-left: 15px;
      .detail-title {
        font-weight: 600;
        padding: 10px 0px;
        margin-bottom: 10px;
      }
      .detail-briefintroduction {
        font-size: 14px;
        color: rgb(179, 176, 176);
        margin-bottom: 20px;
      }
      .detail-moType {
        display: flex;
        // justify-content: space-around;
        .moType-module {
          margin-right: 10px;
          color: rgb(179, 176, 176);
          width: 30%;
          font-size: 14px;
          .moType-moduleContent {
            color: black;
          }
        }
      }
      // API URL
      .detail-tableModule {
        margin-top: 30px;
        .tableModule-title {
          height: 40px;
        }
        .tableModule-border {
          border: 1px solid  #EBEEF5;
          height: 70px;
          .tablemodule-borderTop {
            display: flex;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 10px;
            border-bottom: 1px solid  #EBEEF5;
          }
          .bordertop-left {
            width: 10%;
            border-right: 1px solid  #EBEEF5;
          }
          .bordertop-right {
            padding: 0 10px;
          }
          .tablemodule-borderBottom {
            display: flex;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 10px;
          }
        }
      }
    }
  }
</style>
