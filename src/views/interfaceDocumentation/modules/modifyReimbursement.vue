<template>
  <div>
    <div class="menu-detailSty">
      <div class="detail-title">修改报销单</div>
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
            <div class="bordertop-right">https://api.saas.copeople.demo.aks.chilunyc.com/api/document/expenseReportDocument</div>
          </div>
          <div class="tablemodule-borderBottom">
            <div class="bordertop-left">请求方式</div>
            <div class="bordertop-right">PUT</div>
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
  name: 'AddReimbursement',
  data() {
    return {
      tableDetail: [],
      tableData: [
        {
          dateName: 'appId',
          meaning: 'appId',
          rule: '',
          confirm: '必须',
          defaultValue: ''
        },
        {
          dateName: 'appName',
          meaning: '应用名称',
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
          dateName: 'applyDept',
          meaning: '申请部门',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'applyUser',
          meaning: '申请人',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'approveDate',
          meaning: '批准时间',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'approveUser',
          meaning: '批准人',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'archiveDate',
          meaning: '归档时间',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'archiveUser',
          meaning: '归档人',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'auditInfo',
          meaning: '审核意见',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'audtDate',
          meaning: '输入时间',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'audtUser',
          meaning: '输入人',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'batchCode',
          meaning: '批次号码',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'budgetCode',
          meaning: '预算代码',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'buyOrderNo',
          meaning: '采购订单号',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'catg01',
          meaning: '合同大类',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'catg02',
          meaning: '合同大类02（金额类别）',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'catg03',
          meaning: '合同类别03',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'catg04',
          meaning: '合同类型04',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'changeFlag',
          meaning: '变更标记（0默认1变量2变价3新增)',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'clientCode',
          meaning: '客户代码',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'clientContactEmail',
          meaning: '客户联系邮件',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'clientContactName',
          meaning: '客户联系人',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'clientContactTel',
          meaning: '客户联系电话',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'code',
          meaning: '合同号码',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'companyCode',
          meaning: '公司编号',
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
          dateName: 'contractType',
          meaning: '合同类型',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'curCode',
          meaning: '币种',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'curRate',
          meaning: '汇率',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'deliverDate',
          meaning: '交货日期',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'description',
          meaning: '服务内容',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'endDate',
          meaning: '结束日期',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'expenseDate',
          meaning: '单据日期',
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
          dateName: 'feeDept',
          meaning: '使用费用部门',
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
          dateName: 'linkProjectCode',
          meaning: '关联项目代码',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'linkProjectName',
          meaning: '项目名称',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'paymentTerm',
          meaning: '付款方式',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'remark',
          meaning: '合同备注',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'saleOrderNo',
          meaning: '销售订单号',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'shipVia',
          meaning: '交货方式  ',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'signDate',
          meaning: '签署日期  ',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'stampAmt',
          meaning: '印花税额',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'stampRate',
          meaning: '印花税率',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'startDate',
          meaning: '开始日期',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'status',
          meaning: '合同状态',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'subFlag',
          meaning: '是否分包或其他标记',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'subject',
          meaning: '合同主题',
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
          dateName: 'sysEnterpriseId\t',
          meaning: '企业id',
          rule: '',
          confirm: '非必须',
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
          dateName: 'taxBase',
          meaning: '不含税金额',
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
          meaning: '总金额',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'type',
          meaning: '报销单类型',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'vendorCode',
          meaning: '供应商代码',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'vendorContactEmail',
          meaning: '供应商联系邮件',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'vendorContactName',
          meaning: '供应商联系人',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'vendorContactTel',
          meaning: '供应商联系电话',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
        {
          dateName: 'voucherCode',
          meaning: '凭证代码',
          rule: '',
          confirm: '非必须',
          defaultValue: ''
        },
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
