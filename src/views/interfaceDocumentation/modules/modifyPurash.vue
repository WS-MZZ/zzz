<template>
  <div>
        <div class="menu-detailSty">
      <div class="detail-title">修改采购合同</div>
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
              prop="dateName"
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
  name: 'ModifyPurash',
 data(){
    return{
    tableDetail: [],
    tableData: [
     { dateName: 'appId', confirm: '必须', meaning: 'appId', defaultValue: ''},
     { dateName: '应用名称', confirm: '非必须', meaning: 'appName', defaultValue: ''},
     { dateName: 'appSecret', confirm: '必须', meaning: 'appSecret', defaultValue: '' },
     { dateName: '申请部门', confirm: '非必须', meaning: 'applyDept', defaultValue: '' },
     { dateName: '申请人', confirm: '非必须', meaning: 'applyUser', defaultValue: '' },
     { dateName: '批准时间（yyyy-MM-dd HH:mm:ss）', confirm: '非必须', meaning: 'approveDate', defaultValue: '' },
     { dateName: '批准人', confirm: '非必须', meaning: 'approveUser', defaultValue: '' },
     { dateName: '归档时间（yyyy-MM-dd HH:mm:ss）', confirm: '非必须', meaning: 'archiveDate', defaultValue: '' },
     { dateName: '归档人', confirm: '非必须', meaning: 'archiveUser', defaultValue: '' },
     { dateName: '输入时间（yyyy-MM-dd HH:mm:ss）', confirm: '非必须', meaning: 'audtDate', defaultValue: '' },
     { dateName: '输入人', confirm: '非必须', meaning: 'audtUser', defaultValue: '' },
     { dateName: '采购订单号', confirm: '非必须', meaning: 'buyOrderNo', defaultValue: '' },
     { dateName: '合同大类', confirm: '非必须', meaning: 'catg01', defaultValue: '' },
     { dateName: '合同大类02（金额类别）', confirm: '非必须', meaning: 'catg02', defaultValue: '' },
     { dateName: '合同类别03', confirm: '非必须', meaning: 'catg03', defaultValue: '' },
     { dateName: '合同类型04', confirm: '非必须', meaning: 'catg04', defaultValue: '' },
     { dateName: '变更标记（0默认1变量2变价3新增', confirm: '非必须', meaning: 'changeFlag', defaultValue: '' },
     { dateName: '客户代码', confirm: '非必须', meaning: 'clientCode', defaultValue: '' },
     { dateName: '客户联系邮件', confirm: '非必须', meaning: 'clientContactEmail', defaultValue: '' },
     { dateName: '客户联系人', confirm: '非必须', meaning: 'clientContactName', defaultValue: '' },
     { dateName: '客户联系电话', confirm: '非必须', meaning: 'clientContactTel', defaultValue: '' },
     { dateName: '合同号码', confirm: '非必须', meaning: 'code', defaultValue: '' },
     { dateName: '公司编号', confirm: '非必须', meaning: 'companyCode', defaultValue: '' },
     { dateName: '关联合同', confirm: '非必须', meaning: 'contractList', defaultValue: '' },
     { dateName: '合同类型', confirm: '非必须', meaning: 'contractType', defaultValue: '' },
     { dateName: '币种', confirm: '非必须', meaning: 'curCode', defaultValue: '' },
     { dateName: '汇率', confirm: '非必须', meaning: 'curRate', defaultValue: '' },
     { dateName: '交货日期(yyyy-MM-dd)', confirm: '非必须', meaning: 'deliverDate', defaultValue: '' },
     { dateName: '服务内容', confirm: '非必须', meaning: 'description', defaultValue: '' },
     { dateName: '结束日期(yyyy-MM-dd)', confirm: '非必须', meaning: 'endDate', defaultValue: '' },
     { dateName: '扩展字段', confirm: '非必须', meaning: 'ext', defaultValue: '' },
     { dateName: '文件', confirm: '非必须', meaning: 'fileList', defaultValue: '' },
     { dateName: '关联项目代码', confirm: '非必须', meaning: 'linkProjectCode', defaultValue: '' },
     { dateName: '项目名称', confirm: '非必须', meaning: 'linkProjectName', defaultValue: '' },
     { dateName: '付款方式', confirm: '非必须', meaning: 'paymentTerm', defaultValue: '' },
     { dateName: '合同备注', confirm: '非必须', meaning: 'remark', defaultValue: '' },
     { dateName: '销售订单号', confirm: '非必须', meaning: 'saleOrderNo', defaultValue: '' },
     { dateName: '交货方式', confirm: '非必须', meaning: 'shipVia', defaultValue: '' },
     { dateName: '签署日期(yyyy-MM-dd)', confirm: '非必须', meaning: 'signDate', defaultValue: '' },
     { dateName: '印花税额', confirm: '非必须', meaning: 'stampAmt', defaultValue: '' },
     { dateName: '印花税率', confirm: '非必须', meaning: 'stampRate', defaultValue: '' },
     { dateName: '开始日期(yyyy-MM-dd)', confirm: '非必须', meaning: 'startDate', defaultValue: '' },
     { dateName: '合同状态', confirm: '非必须', meaning: 'status', defaultValue: '' },
     { dateName: '是否分包或其他标记', confirm: '非必须', meaning: 'subFlag', defaultValue: '' },
     { dateName: '合同主题', confirm: '非必须', meaning: 'subject', defaultValue: '' },
     { dateName: '应用id', confirm: '非必须', meaning: 'sysApplicationId', defaultValue: '' },
     { dateName: '企业id', confirm: '非必须', meaning: 'sysEnterpriseId', defaultValue: '' },
     { dateName: '企业名称', confirm: '非必须', meaning: 'sysEnterpriseName', defaultValue: '' },
     { dateName: '标签', confirm: '非必须', meaning: 'tagList', defaultValue: '' },
     { dateName: '税额', confirm: '非必须', meaning: 'taxAmount', defaultValue: '' },
     { dateName: '不含税金额', confirm: '非必须', meaning: 'taxBase', defaultValue: '' },
     { dateName: '税率', confirm: '非必须', meaning: 'taxRate', defaultValue: '' },
     { dateName: '总金额', confirm: '非必须', meaning: 'totalAmount', defaultValue: '' },
     { dateName: '供应商代码', confirm: '非必须', meaning: 'vendorCode', defaultValue: '' },
     { dateName: '供应商联系邮件', confirm: '非必须', meaning: 'vendorContactEmail', defaultValue: '' },
     { dateName: '供应商联系人', confirm: '非必须', meaning: 'vendorContactName', defaultValue: '' },
     { dateName: '供应商联系电话', confirm: '非必须', meaning: 'vendorContactTel', defaultValue: '' },
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