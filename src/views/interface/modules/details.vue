<template>
  <div class="dashboard-container" style="overflow-y: auto;">
    <div class="dashboard-text">
      <div class="top">
        <div class="top-left">
          <div class="title">基础信息</div>
          <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="应用名称：">
              <span>{{ form.name }}</span>
            </el-form-item>
            <el-form-item label="Appid：">
              <span>{{ form.appId }}</span>
            </el-form-item>
            <el-form-item label="AppSerect：" class="lg-1">
              <span class="appSec">{{ form.appSecret }}</span>
            </el-form-item>
            <el-form-item label="每分钟访问限制：">
              <span>{{ form.maxLimit ? form.maxLimit : "无限制" }}</span>
            </el-form-item>
            <el-form-item label="状态：">
              <span>{{ form.status }}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>{{ form.createdDate }}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="top-center">
          <div class="center">
            <div class="title">
              今日访问量
              <p class="num">{{ todayVisit.totalCount }}</p>
              <p>
                成功 <span>{{ todayVisit.successCount }}</span> 失败
                <span>{{ todayVisit.failCount }}</span>
              </p>
            </div>

            <div class="homeChart">
              <homeChart ref="homeChart" :toptraffice="toptraffice" />
            </div>
          </div>
          <div class="center" style="margin-top:6px">
            <div class="title">
              累计访问量
              <p class="num">{{ Cumulat.totalCount }}</p>
              <p>
                成功<span>{{ Cumulat.successCount }}</span> 失败
                <span>{{ Cumulat.failCount }}</span>
              </p>
            </div>
            <div class="homeChart">
              <homeChart ref="homeChart" :cumulativelist="cumulativelist" />
            </div>
          </div>
        </div>
        <div class="top-right">
          <div class="title">
            文档类型分布
            <div class="pieModule">
              <div class="pie"><pieChart ref="pieChart" :distr="distr" /></div>
              <div class="pieFont">
                <div v-for="(item,index) of distr" :key="index" class="pieContent">
                  <div :key="item.key" class="pieRoundLeft" style="margin-right:10px" :class="setColor[index]" />
                  <div><span>{{ item.key }}:</span> {{ item.count }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="time">
          <div
            :class="[{ select: isSelect }, 'time1']"
            style="border-bottom-left-radius: 5px; border-top-left-radius: 5px"
            @click="click(1)"
          >
            今日
          </div>
          <div
            :class="[{ select: !isSelect }, 'time1']"
            style="
              border-bottom-right-radius: 5px;
              border-top-right-radius: 5px;
            "
            @click="click(30)"
          >
            近30日
          </div>
        </div>
        <lineChart ref="lineChart" class="line" :todaylist="todaylist" />
      </div>
      <!--  -->
      <div class="bottom">
        <div class="time">
          <div
            :class="[{ select: isSelectBar }, 'time1']"
            style="border-bottom-left-radius: 5px; border-top-left-radius: 5px"
            @click="clickBar(1)"
          >
            今日
          </div>
          <div
            :class="[{ select: !isSelectBar }, 'time1']"
            style="
              border-bottom-right-radius: 5px;
              border-top-right-radius: 5px;
            "
            @click="clickBar(30)"
          >
            近30日
          </div>
        </div>
        <interfaceChart class="line" :enterpiselist="enterpiselist" />
      </div>
    </div>
    <!-- <div class="sec-develop">二期功能开发中</div> -->
  </div>
</template>

<script>
import pieChart from '@/components/PieChart/pieChart'
import lineChart from '@/components/LineChart/lineChart'
import homeChart from '@/components/LineChart/homeLineChart'
import interfaceChart from '@/components/interfaceBarChart/interfaceBarChart'
import {
  getSysApplication,
  getTodayStatic,
  getCumulative,
  distribution,
  ContentTodayVist,
  contentTodayTotal,
  enterpriseRank
} from '@/api/applications'

// const defaultForm = {
//   name: '',
//   appId: '',
//   maxLimit: ''
// }

export default {
  name: 'PersonalInfo',
  components: {
    pieChart,
    lineChart,
    homeChart,
    interfaceChart
  },
  data() {
    return {
      form: {},
      isSelect: true,
      isSelectBar: true,
      id: null,
      todayVisit: [],
      Cumulat: [],
      basicInfo: [],
      distr: [],
      setColor: [
        'setRed',
        'setYello',
        'setBlue'
      ],
      todaylist: [],
      toptraffice: [
        { key: '01', totalCount: 60 },
        { key: '02', totalCount: 150 },
        { key: '03', totalCount: 180 },
        { key: '04', totalCount: 360 },
        { key: '05', totalCount: 310 }
      ],
      cumulativelist: [],
      enterpiselist: []
    }
  },
  computed: {},
  watch: { },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getSysApplication(this.id)
      this.getTodayVist(this.id)
      this.getCumulatives(this.id)
      this.distributions(this.id)
      this.contentVist(this.id)
      this.contentTop(30)
      this.enterpriseRanks(0)
    }
  },
  methods: {
    click(data) {
      if (data === 1) {
        this.isSelect = true
        this.contentVist()
      } else {
        this.isSelect = false
        this.contentTodayTotals({ sysApplicationId: this.id, day: 30 })
      }
    },
    clickBar(data) {
      if (data === 1) {
        this.isSelectBar = true
        this.enterpriseRanks({ sysApplicationId: this.id, day: 0 })
      } else {
        this.isSelectBar = false
        this.enterpriseRanks({ sysApplicationId: this.id, day: 30 })
      }
    },
    getSysApplication(id) {
      getSysApplication(id)
        .then((res) => {
          this.form = res
          console.log('应用详情s', this.form)
        })
        .catch((error) => {
          console.log(error) // 这里catch虽然不做什么提示上的动作，但是为了要把loading去掉，也还是需要的
        })
    },
    // 今日访问量
    getTodayVist(id) {
      getTodayStatic(id).then((res) => {
        console.log('今日访问量', res)
        this.todayVisit = res
      })
    },
    // 累计访问量
    getCumulatives(id) {
      getCumulative(id).then((res) => {
        console.log('累计访问量', res)
        this.Cumulat = res
      })
    }, // 文档类型分布
    async distributions(id) {
      const distrList = await distribution(id)
      console.log('文档类型分布sss', distrList)
      this.distr = distrList
    },
    // 接口访问统计
    contentVist(id) {
      ContentTodayVist(id).then(res => {
        this.todaylist = [
          { key: '01', failCount: 50, totalCount: 60 },
          { key: '02', failCount: 130, totalCount: 150 },
          { key: '03', failCount: 110, totalCount: 180 },
          { key: '04', failCount: 240, totalCount: 360 },
          { key: '05', failCount: 261, totalCount: 310 }
        ]
        res = this.todaylist
      })
    },
    contentTodayTotals(day) {
      contentTodayTotal(day).then(res => {
        console.log('折线图', res)
        this.todaylist = res
      })
    },
    contentTop(day) {
      contentTodayTotal(day).then(res => {
        this.cumulativelist = res
      })
    },
    // 企业排名
    enterpriseRanks(data) {
      enterpriseRank(data).then(res => {
        console.log('企业排名', res)
        this.enterpiselist = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    /*padding: 15px;*/
    height: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    /*display: flex;*/
    // height: 100%;
    .top {
      height: 55%;
      width: 100%;
      margin-bottom: 5px;
      display: flex;
      &-left {
        height: 100%;
        width: 34%;
        background-color: #fff;
        border-radius: 5px;
        margin-right: 0.5%;
      }
      &-center {
        // height: 100%;
        width: 25%;
        .center {
          width: 100%;
          height: 49%;
          background-color: #fff;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          p {
            font-size: 16px;
            margin: 0;
            // padding-left: 10px;
            color: #999999;
          }
          .num {
            font-size: 22px;
            color: #20a0ff;
            padding-left: 30px;
          }
        }
      }
      &-right {
        display: flex;
        // height: 291px;
        width: 40%;
        background-color: #fff;
        border-radius: 5px;
        margin-left: 0.5%;
        .con {
          margin-top: 50px;
          p {
            font-size: 16px;
            margin: 0;
          }
        }
         .pie {
          width: 200px;
          height: 300px;
          margin-left: -50px;
          // margin-right: 50px;
          margin-top: -20px;
        }
      }
    }
    .bottom {
      height: 55%;
      width: 100%;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 10px;
      .time {
        // position: fixed;
        // right: 100px;
        text-align: right;
        margin-right: 100px;
        padding-top: 10px;
        z-index: 99;
        cursor: pointer;
        .time1 {
          display: inline-block;
          font-size: 18px;
          width: 100px;
          line-height: 36px;
          text-align: center;
          background-color: #f2f2f2;
        }
        .select {
          color: #20a0ff;
        }
      }
      .line {
        padding-top: 20px;
        padding-left: 1%;
      }
    }
  }
}
.title {
  font-size: 18px;
  margin-left: 30px;
  padding-top: 5px;
  img {
    position: absolute;
    margin-left: 100px;
    margin-top: 20px;
    width: 60px;
  }
}
.el-form-item {
  margin-bottom: 0px;
}
.appSec {
  word-break: break-all;
}
::v-deep.lg-1 .el-form-item__content {
  // line-height: 1.5;
}
.pieModule{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pieFont{
  font-size: 14px;
  margin-right: 30px;
  margin-left: 20px;
}
.pieContent{
  display: flex;
  align-items: center;
}
.pieRoundLeft{
  width:10px;
  height: 10px;
  // background: #F57A71;
  border-radius: 5px;
}
.setRed{
  background: #F57A71;
}
.setYello {
  background: #FFEE7B;
}
.setBlue {
  background: #5CAFFF;
}
.homeChart{
  margin-top: 10px;
  margin-right: 20px;
}
::v-deep .app-main{
  height: 100%;
}
</style>
