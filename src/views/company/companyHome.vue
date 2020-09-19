<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="display: none">
      <div class="head">
        <div class="companyName">{{ enterpriseInfo.name }} <span @click="edit">编辑</span></div>
        <div class="companyDetail">
          <img :src="enterpriseInfo.logoUrl" alt="">
          <div class="form">
            <el-form ref="form" :model="form" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="账号：">
                    <span>{{ enterpriseInfo.accountNo }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="状态：">
                    <span>{{ enterpriseInfo.status == 'NORMAL' ? '正常' : enterpriseInfo.status == 'FREEZE' ? '冻结' : enterpriseInfo.status == 'EXPIRE' ? '过期' : '' }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="联系人：">
                    <span>{{ enterpriseInfo.contact }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="到期时间：">
                    <span>{{ enterpriseInfo.expireDate }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div class="top">
        <div class="top-center">
          <div class="center">
            <div class="title">今日访问量
              <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt=""></div>
            <p class="num">5134513454</p>
            <p>成功 <span>{{ form.account }}</span>  失败 <span>{{ form.account }}</span></p>
          </div>
          <div class="center" style="margin-top:2%">
            <div class="title">累计访问量
              <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt=""></div>
            <p class="num">1234513451</p>
            <p>成功<span>{{ form.account }}</span>  失败 <span>{{ form.account }}</span></p>
          </div>
        </div>
        <div class="top-right">
          <div class="title">文档类型分布
            <div class="con">
              <p>发票：<span>{{ form.account }}</span>，占比<span>{{ form.account }}</span></p>
              <p>合同：<span>{{ form.account }}</span>，占比<span>{{ form.account }}</span></p>
              <p>订单：<span>{{ form.account }}</span>，占比<span>{{ form.account }}</span></p>
            </div></div>
          <div class="pie"><pieChart ref="pieChart" /></div>
        </div>
        <div class="top-left">
          <div class="title">应用访问量排名</div>
          <div v-for="item in list">
            <p><span>{{item.sort}}</span><span>{{item.name}}</span><span style="float: right;padding-right: 30px;">{{item.num}}</span></p>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="time">
          <div :class="[{ select: isSelect }, 'time1']" style="border-bottom-left-radius: 5px;border-top-left-radius: 5px;" @click="click(1)">今日</div>
          <div :class="[{ select: !isSelect }, 'time1']" style="border-bottom-right-radius: 5px;border-top-right-radius: 5px;" @click="click(30)">近30日</div>
        </div>
        <lineChart ref="lineChart" class="line" />
      </div>
    </div>
    <companyDialog ref="companyDialog" :corp-info="enterpriseInfo" :visible.sync="visible" />
    <div class="sec-develop">二期功能开发中</div>
  </div>
</template>

<script>
import pieChart from '@/components/PieChart/pieChart'
import lineChart from '@/components/LineChart/lineChart'
import companyDialog from './companyDialog'
import { mapGetters } from 'vuex'
import { getEnterpriseDetail } from '@/api/enterprise'

export default {
  name: 'Home',
  components: {
    pieChart,
    lineChart,
    companyDialog
  },
  data() {
    return {
      form: {},
      isSelect: true,
      list: [
        {
          sort: 1,
          name: 'XXX财务系统',
          num: 134789234789
        }
      ],
      visible: false,
      enterpriseInfo: {},
      companyId: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.getCorpInfo()
  },
  methods: {
    getCorpInfo() {
      this.companyId = this.$route.query.id
      getEnterpriseDetail(this.companyId).then(res => {
        this.enterpriseInfo = res
      })
    },
    edit() {
      this.visible = true
    },
    click(data) {
      if (data == 1) {
        this.isSelect = true
      } else {
        this.isSelect = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      /*padding: 15px;*/
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
      /*display: flex;*/
      height: 100%;
      .head{
        height: 35%;
        width: 100%;
        margin-bottom: 5px;
        /*display: flex;*/
        border-radius: 5px;
        background-color: #fff;
        .companyName{
          font-size: 20px;
          margin-left: 30px;
          /*width: 100%;*/
          span{
            font-size: 16px;
            margin-left: 30px;
            color: #20a0ff;
            cursor: pointer;
          }
        }
        .companyDetail{
          margin-left: 30px;
          margin-top: 30px;
          display: flex;
          img{
            width: 160px;
            height: 90px;
          }
          .el-row{
            width: 800px;
          }
        }
      }
      .top{
        height: 45%;
        width: 100%;
        margin-bottom: 5px;
        display: flex;
        &-left{
          height: 100%;
          width: 34%;
          background-color: #fff;
          border-radius: 5px;
          margin-left: 0.5%;
          p{
            font-size: 16px;
            margin: 0;
            span{
              display: inline-block;
              padding-left: 30px;
            }
          }
        }
        &-center{
          height: 100%;
          width: 25%;
          .center{
            width: 100%;
            height: 49%;
            background-color: #fff;
            border-radius: 5px;
            p{
              font-size: 16px;
              margin: 0;
              padding-left: 30px;
              color: #999999;
            }
            .num{
              font-size: 22px;
              color: #20a0ff;
            }
          }
        }
        &-right{
          display: flex;
          height: 100%;
          width: 40%;
          background-color: #fff;
          border-radius: 5px;
          margin-left: 0.5%;
          .con{
            margin-top: 50px;
            p{
              font-size: 16px;
              margin: 0;
            }
          }
          .pie{
            width: 50%;
            margin-left: 20px;
            margin-top: -50px;
          }
        }
      }
      .bottom{
        height: auto;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        .time{
          margin-left: 80%;
          margin-bottom: -30px;
          z-index: 99;
          cursor: pointer;
          .time1{
            display: inline-block;
            font-size: 18px;
            width: 100px;
            line-height: 36px;
            text-align: center;
            background-color: #f2f2f2;
          }
          .select{
            color: #20a0ff;
          }
        }
        .line{
          padding-top: 20px;
          padding-left: 1%;
        }
      }
    }
  }
  .title{
    font-size: 18px;
    margin-left: 30px;
    padding-top: 5px;
    img{
      /*position: absolute;*/
      margin-left: 100px;
      margin-top: 20px;
      width: 60px;
      margin-bottom: -50px;
    }
  }
  .el-form-item{
    margin-bottom: 0px;
  }
</style>
