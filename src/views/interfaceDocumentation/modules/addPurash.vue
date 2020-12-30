<template>
  <div>
    <div class="menu-detailSty">
      <div class="detail-title">新增采购合同</div>
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
            <div class="bordertop-right">https://api.saas.copeople.demo.aks.chilunyc.com/api/document/buyContractDocument</div>
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
              prop="meaning"
              label="参数名"
            />
            <el-table-column
              prop="dateName"
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
  name: 'AddPurash',
  data() {
    return {
      tableDetail: [],
      tableData: [{
        dateName: 'appId',
        meaning: 'appId',
        rule: '',
        confirm: '必须',
        defaultValue: ''
      },
      {
        dateName: '应用名称',
        meaning: 'appName',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: 'appSecret',
        meaning: 'appSecret',
        rule: '',
        confirm: '必须',
        defaultValue: ''
      },
      {
        dateName: '申请部门',
        meaning: 'applyDept',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '申请人',
        meaning: 'applyUser',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '批准时间（yyyy-MM-dd HH:mm:ss）',
        meaning: 'approveDate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '批准人',
        meaning: 'approveUser',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '归档时间（yyyy-MM-dd HH:mm:ss）',
        meaning: 'archiveDate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '归档人',
        meaning: 'archiveUser',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '输入时间（yyyy-MM-dd HH:mm:ss）',
        meaning: 'audtDate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '输入人',
        meaning: 'audtUser',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '采购订单号',
        meaning: 'buyOrderNo',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '合同大类',
        meaning: 'catg01',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '合同大类02（金额类别）',
        meaning: 'catg02',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '合同类别03',
        meaning: 'catg03',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '合同类型04',
        meaning: 'catg04',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '变更标记（0默认1变量2变价3新增',
        meaning: 'changeFlag',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '客户代码',
        meaning: 'clientCode',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '客户联系邮件',
        meaning: 'clientContactEmail',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '客户联系人',
        meaning: 'clientContactName',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '客户联系电话',
        meaning: 'clientContactTel',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '合同号码',
        meaning: 'code',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '公司编号',
        meaning: 'companyCode',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '关联合同',
        meaning: 'contractList',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '合同类型',
        meaning: 'contractType',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '币种',
        meaning: 'curCode',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '汇率',
        meaning: 'curRate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '交货日期(yyyy-MM-dd)',
        meaning: 'deliverDate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '服务内容',
        meaning: 'description',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '结束日期(yyyy-MM-dd)',
        meaning: 'endDate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '扩展字段',
        meaning: 'ext',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '文件列表',
        meaning: 'fileInfoList',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '关联项目代码',
        meaning: 'linkProjectCode',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '项目名称',
        meaning: 'linkProjectName',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '付款方式',
        meaning: 'paymentTerm',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '合同备注',
        meaning: 'remark',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '销售订单号',
        meaning: 'saleOrderNo',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '交货方式',
        meaning: 'shipVia',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '签署日期(yyyy-MM-dd)',
        meaning: 'signDate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '印花税额',
        meaning: 'stampAmt',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '印花税率',
        meaning: 'stampRate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '开始日期(yyyy-MM-dd)',
        meaning: 'startDate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '合同状态',
        meaning: 'status',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '是否分包或其他标记',
        meaning: 'subFlag',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '合同主题',
        meaning: 'subject',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '应用id',
        meaning: 'sysApplicationId',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '企业id',
        meaning: 'sysEnterpriseId',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '企业名称',
        meaning: 'sysEnterpriseName',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '标签',
        meaning: 'tagList',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '税额',
        meaning: 'taxAmount',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '不含税金额',
        meaning: 'taxBase',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '税率',
        meaning: 'taxRate',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '总金额',
        meaning: 'totalAmount',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '供应商代码',
        meaning: 'vendorCode',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '供应商联系邮件',
        meaning: 'vendorContactEmail',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '供应商联系人',
        meaning: 'vendorContactName',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      },
      {
        dateName: '供应商联系电话',
        meaning: 'vendorContactTel',
        rule: '',
        confirm: '非必须',
        defaultValue: ''
      }
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
