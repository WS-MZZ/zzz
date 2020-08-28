<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="top">
        <div class="top-left">
          <div class="title">基础信息</div>
          <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="应用名称：">
              <span>{{ form.account }}</span>
            </el-form-item>
            <el-form-item label="Appid：">
              <span>{{ form.account }}</span>
            </el-form-item>
            <el-form-item label="每分钟访问限制：">
              <span>{{ form.account }}</span>
            </el-form-item>
            <el-form-item label="状态：">
              <span>{{ form.account }}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>{{ form.account }}</span>
            </el-form-item>
          </el-form>
        </div>
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
      </div>

      <div class="bottom">
        <div class="time">
          <div :class="[{ select: isSelect }, 'time1']" style="border-bottom-left-radius: 5px;border-top-left-radius: 5px;" @click="click(1)">今日</div>
          <div :class="[{ select: !isSelect }, 'time1']" style="border-bottom-right-radius: 5px;border-top-right-radius: 5px;" @click="click(30)">近30日</div>
        </div>
        <lineChart ref="lineChart" class="line" />
      </div>
    </div>
  </div>
</template>

<script>
import pieChart from '@/components/PieChart/pieChart'
import lineChart from '@/components/LineChart/lineChart'

export default {
  name: 'PersonalInfo',
  components: {
    pieChart,
    lineChart
  },
  data() {
    return {
      form: {},
      isSelect: true
    }
  },
  computed: {},
  methods: {
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
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
      /*display: flex;*/
      height: 100%;
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
          margin-right: 0.5%;
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
        height: 55%;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        .time{
          position: fixed;
          right: 100px;
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
      position: absolute;
      margin-left: 100px;
      margin-top: 20px;
      width: 60px;
    }
  }
  .el-form-item{
    margin-bottom: 0px;
  }
</style>
