<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-row :gutter="10">
        <div class="dashboard-modlue">
          <el-col :span="6">
            <div class="statistic-Left">
              <div class="top-center">
                <div class="center">
                  <div>
                    <div class="title">今日访问量</div>
                    <p class="num">{{ visitList.totalCount }}</p>
                    <p>
                      成功 <span>{{ visitList.successCount }}</span> 失败
                      <span>{{ visitList.failCount }}</span>
                    </p>
                  </div>
                  <div class="homeChart">
                    <homeChart ref="homeChart" :toptraffice="toptraffice" />
                  </div>
                </div>
                <div class="center">
                  <div>
                    <div class="title">累计访问量</div>
                    <p class="num">{{ cumlua.totalCount }}</p>
                    <p>
                      成功<span>{{ cumlua.successCount }}</span> 失败
                      <span>{{ cumlua.failCount }}</span>
                    </p>
                  </div>
                  <div class="homeChart">
                    <homeChart :cumulativelist="cumulativelist" />
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="top">
              <div class="top-left">
                <div class="title">应用访问量排名</div>
                <div v-for="(item, index) in applicat" :key="index">
                  <div class="applicationVist">
                    <div
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      <span class="applicatClass" :class="index<3 ? 'applicatClassSelect' : ''">{{ index + 1 }}</span><span>{{ item.key }}</span>
                    </div>
                    <div style="padding-right: 30px">{{ item.count }}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="top">
              <div class="top-left">
                <div class="title">企业访问量排名</div>
                <div v-for="(item, index) in enterprice" :key="index">
                  <div class="applicationVist">
                    <div
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      <span class="applicatClass" :class="index<3 ? 'applicatClassSelect' : ''">{{ index + 1 }}</span><span>{{ item.key }}</span>
                    </div>
                    <div style="padding-right: 30px">{{ item.count }}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <!-- bar图表 -->
            <div class="top-right">
              <div class="title">
                文档类型分布
                <!-- <div class="con">
                  <p v-for="(item,index) of distr" :key="index">{{ item.key }}：<span>{{ item.count }}</span>，占比：<span>{{ item.percent }}%</span></p>
                </div> -->
              </div>
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
          </el-col>
        </div>
      </el-row>
      <!--  -->
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
    </div>
    <companyDialog
      ref="companyDialog"
      :corp-info="form"
      :visible.sync="visible"
    />
    <!-- <div class="sec-develop">二期功能开发中</div> -->
  </div>
</template>

<script>
import pieChart from '@/components/PieChart/pieChart'
import lineChart from '@/components/LineChart/lineChart'
import homeChart from '@/components/LineChart/homeLineChart'
import companyDialog from './companyDialog'
import {
  todayVist,
  cumulative,
  applicationRank,
  enterpriceRank,
  distribution,
  ContentTodayVist,
  contentTodayTotal
} from '@/api/homeVisit'
export default {
  name: 'Home',
  components: {
    pieChart,
    lineChart,
    homeChart,
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
      visitList: {},
      cumlua: {},
      applicat: [],
      enterprice: [],
      distr: [],
      visible: false,
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
      cumulativelist: []
    }
  },
  computed: {},
  created() {
    this.getCorpInfo()
    this.todayVisit()
    this.cumulatives()
    this.applicationRanks()
    this.enterpriceRanks()
    this.contentVist()
    this.distributions()
    this.contentTop(30)
  },
  methods: {
    getCorpInfo() {
      this.form.logoUrl = '小米'
      this.form.name = '小米'
      this.form.contact = '小米'
      this.form.d = '小米'
    },
    edit() {
      this.visible = true
    },
    click(data) {
      if (data === 1) {
        this.isSelect = true
        this.contentVist()
      } else {
        this.isSelect = false
        this.contentTodayTotals(30)
      }
    },
    // 今日访问
    todayVisit() {
      todayVist().then((res) => {
        this.visitList = res
      })
    },
    // 累计访问
    cumulatives() {
      cumulative().then((res) => {
        this.cumlua = res
      })
    },
    // 应用访问量排名
    applicationRanks() {
      applicationRank().then((res) => {
        this.applicat = res
      })
    },
    // 企业访问量排名
    enterpriceRanks() {
      enterpriceRank().then((res) => {
        this.enterprice = res
      })
    },
    // 文档类型分布
    async distributions() {
      const distrList = await distribution()
      console.log('文档类型分布', distrList)
      this.distr = distrList
    },
    // 接口访问统计
    contentVist() {
      ContentTodayVist().then(res => {
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
        this.todaylist = res
      })
    },
    contentTop(day) {
      contentTodayTotal(day).then(res => {
        this.cumulativelist = res
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
    overflow-x: hidden;
    overflow-y: auto;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    /*display: flex;*/
    // height: 100%;
    .head {
      height: 35%;
      width: 100%;
      margin-bottom: 5px;
      /*display: flex;*/
      border-radius: 5px;
      background-color: #fff;
      .companyName {
        font-size: 20px;
        margin-left: 30px;
        /*width: 100%;*/
        span {
          font-size: 16px;
          margin-left: 30px;
          color: #20a0ff;
          cursor: pointer;
        }
      }
      .companyDetail {
        margin-left: 30px;
        margin-top: 30px;
        display: flex;
        img {
          width: 160px;
          height: 90px;
        }
        .el-row {
          width: 800px;
        }
      }
    }
    .top {
      height: 100%;
      width: 100%;
      // margin-bottom: 10px;
      display: flex;
      max-height: 310px;
      &-left {
        height: 100%;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        // margin-left:10px;
        p {
          font-size: 16px;
          margin: 0;
          span {
            display: inline-block;
            padding-left: 30px;
          }
        }
      }
      &-center {
        // height: 100%;
        width: 100%;
        margin-bottom: 10px;
        // min-width: 640px;
        .center {
          width: 100%;
          height: 150px;
          background-color: #fff;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          // min-width: 315px;
          margin-right: 10px;
          margin-bottom: 10px;
          p {
            font-size: 16px;
            margin: 0;
            padding-left: 30px;
            color: #999999;
          }
          .num {
            font-size: 22px;
            color: #20a0ff;
          }
        }
      }
      &-right {
        // display: flex;
        // height: 100%;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        height: 310px;
        max-height: 310px;
        // justify-content: space-between;
        // margin-left: 0.5%;
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
          margin-left: -30px;
          // margin-right: 50px;
          margin-top: -20px;
        }
      }
    }
    .bottom {
      height: auto;
      width: 100%;
      background-color: #fff;
      border-radius: 5px;
      margin-top: 10px;
      .time {
        margin-left: 80%;
        margin-bottom: -30px;
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
    /*position: absolute;*/
    margin-left: 100px;
    margin-top: 20px;
    width: 60px;
    margin-bottom: -50px;
  }
}
.el-form-item {
  margin-bottom: 0px;
}
.top-center-pic {
  line-height: 200px;
  margin-right: 30px;
}
.dashboard-modlue {
  display: flex;
}
.applicationVist {
  display: flex;
  font-size: 16px;
  padding-left: 30px;
  justify-content: space-between;
  span {
    margin-right: 20px;
  }
}
.homeChart{
  margin-top: 10px;
  margin-right: 20px;
}
.pieModule{
  display: flex;
  // justify-content: space-between;
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
.applicatClass{
  width: 25px;
height: 25px;
background: #EAF0FF;
display: inline-block;
text-align: center;
line-height: 25px;
border-radius: 50%;
color: #2161FD;
}
.applicatClassSelect {
  background-color: #2161FD;
  color: white;
}
</style>
