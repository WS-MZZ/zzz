<template>
  <div style="height: 100%;width: 100%;overflow-y: auto;">
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="block-wrapper basic-info">
          <div class="title">
            基础信息
          </div>
          <div class="content basicCon">
            <div v-for="(item, index) in list" :key="item.name" class="item" :prop="item.prop" :label="item.name">
              <div class="label">
                <span>{{ item.name }}</span>
              </div>
              <div class="semi">:</div>
              <div class="value">
                <span>{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="top">
          <div class="block-wrapper fg1" style="margin-bottom: 10px;">
            <div class="title">
              拓展信息
            </div>
            <div class="content fgCon">
              <div v-for="(item, index) in fgList" :key="item.name" class="item" style="width: 100%;" :prop="item.prop" :label="item.name">
                <div class="label" style="text-align: initial;width: 30%;">
                  <span>{{ item.name }}</span>
                </div>
                <div class="semi">:</div>
                <div class="value">
                  <span>{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="block-wrapper fg1">
            <div class="title">
              标签
            </div>
            <div class="tag-content">
              <el-tag
                v-for="item in tagList"
                v-if="tagList.length != 0"
                :key="item"
                class="md5"
                effect="dark"
              >
                {{ item }}
              </el-tag>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="down">
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="con">
            <div class="title">
              关联图谱
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="con">
            <div class="title">
              附件
            </div>
            <div v-for="item in urlList" :key="item">
              <p>{{ item }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getInvoiceDocument } from '@/api/documentation'

export default {
  name: '',
  components: {
  },
  data() {
    return {
      id: null,
      list: [
        {
          name: '发票代码',
          prop: 'code',
          value: ''
        },
        {
          name: '发票号码',
          prop: 'no',
          value: ''
        },
        {
          name: '开票日期',
          prop: 'makeOutDate',
          value: ''
        },
        {
          name: '发票状态',
          prop: 'status',
          value: ''
        },
        {
          name: '发票校验码',
          prop: 'validCode',
          value: ''
        },
        {
          name: '发票类型',
          prop: 'type',
          value: ''
        },
        {
          name: '价税合计',
          prop: 'totalAmount',
          value: ''
        },
        {
          name: '不含税金额',
          prop: 'notTaxAmount',
          value: ''
        },
        {
          name: '税额',
          prop: 'taxAmount',
          value: ''
        },
        {
          name: '发票备注',
          prop: 'remark',
          value: ''
        },
        {
          name: '开票人',
          prop: 'drawer',
          value: ''
        },
        {
          name: '收款人',
          prop: '',
          value: ''
        },
        {
          name: '复核人',
          prop: '',
          value: ''
        },
        {
          name: '购买客户编号',
          prop: 'customerNo',
          value: ''
        },
        {
          name: '购买方名称',
          prop: 'customerName',
          value: ''
        },
        {
          name: '购买方纳税人识别号',
          prop: 'customerID',
          value: ''
        },
        {
          name: '购买方开户行及账号',
          prop: 'customerBankAddressAndNo',
          value: ''
        },
        {
          name: '购买方地址及电话',
          prop: 'customerAddressAndPhone',
          value: ''
        },
        {
          name: '销售订单号',
          prop: 'saleOrderNo',
          value: ''
        },
        {
          name: '数据来源',
          prop: 'dataSource',
          value: ''
        },
        {
          name: '来源类型',
          prop: 'dataSourceType',
          value: ''
        },
        {
          name: '销方纳税人识别号',
          prop: 'saleId',
          value: ''
        },
        {
          name: '销方银行及账号',
          prop: 'saleBankAndNo',
          value: ''
        },
        {
          name: '销方地址及电话',
          prop: 'saleAddressAndPhone',
          value: ''
        },
        {
          name: '电子发票pdfurl',
          prop: 'invoiceUrl',
          value: ''
        },
        {
          name: '开票税局',
          prop: 'taxBureau',
          value: ''
        },
        {
          name: '开票税率',
          prop: 'taxRate',
          value: ''
        },
        {
          name: '单据ID',
          prop: 'billId',
          value: ''
        },
        {
          name: '单据编号',
          prop: 'billNo',
          value: ''
        },
        {
          name: '单据日期',
          prop: 'billDate',
          value: ''
        },
        {
          name: '客户订单号',
          prop: 'customerOrderNo',
          value: ''
        },
        {
          name: '公司编号',
          prop: 'companyNo',
          value: ''
        },
        {
          name: '门店编号',
          prop: 'shopNo',
          value: ''
        },
        {
          name: '单据类型',
          prop: 'billType',
          value: ''
        },
        // {
        //   name: '销售订单号',
        //   prop: 'saleOrderNo',
        //   value: ''
        // },
        {
          name: '采购订单号',
          prop: 'buyOrderNo',
          value: ''
        },
        {
          name: '往来单位编号',
          prop: 'contactUnitNo',
          value: ''
        },
        {
          name: '经办人信息',
          prop: 'agentInfo',
          value: ''
        },
        {
          name: '经办人信息2',
          prop: 'agentInfo2',
          value: ''
        },
        {
          name: '系统插入时间',
          prop: 'createdDate',
          value: ''
        },
        {
          name: '系统插入用户',
          prop: 'createdBy',
          value: ''
        },
        {
          name: '系统更新时间',
          prop: 'lastModifiedDate',
          value: ''
        },
        {
          name: '系统更新用户',
          prop: 'lastModifiedBy',
          value: ''
        }
      ],
      fgList: [
        // {
        //   name: '发票代码',
        //   prop: 'code',
        //   value: ''
        // },
        // {
        //   name: '发票号码',
        //   prop: 'no',
        //   value: ''
        // },
        // {
        //   name: '开票日期',
        //   prop: 'makeOutDate',
        //   value: ''
        // }
      ],
      tagList: [],
      urlList: []
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getInvoiceDocument(this.id)
    }
  },
  methods: {
    getInvoiceDocument(id) {
      getInvoiceDocument(id).then(res => {
        for (const key in res) {
          this.list.forEach(item => {
            if (key == item.prop) {
              item.value = res[key]
            }
          })
          this.tagList = res.tagList
          this.urlList = res.fileUrlList
        }
      }).catch(error => {
        console.log(error) // 这里catch虽然不做什么提示上的动作，但是为了要把loading去掉，也还是需要的
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-info {
  height: 658px;
  .basicCon{
    height: 550px;
    font-size: 14px;
  }
}
.top {
  height: 650px;
  display: flex;
  flex-flow: column;
  .fgCon{
    height: 300px;
    overflow-y: auto;
  }
}
.content {
  /*height: 450px;*/
  margin-top: 10px;
  display: flex;
  flex-flow: column wrap;
  .item {
    width: 50%;
    display: flex;
    align-items: baseline;
    margin-bottom: 5px;
    .label {
      width:29%;
      display: inline-block;
      text-align: right;
      word-wrap:break-word;
    }
    .semi {
      width:1%;
      display: inline-block;
    }
    .value {
      width:70%;
      display: inline-block;
      word-wrap:break-word;
      margin-left: 10px
    }
  }
}
.tag-content {
  padding-top: 10px;
  height: 240px;
  .md5{
    margin-right: 5px;
  }
}
  .down{
    height: 600px;
    width: 100%;
    margin-top: 10px;
    .con{
      height:100%;
      background: #ffffff;
      border-radius: 5px;
      padding: 15px;
    }
  }
  .el-row{
    width: 100%;
    .el-col{
      height: 100%;
    }
  }
</style>
