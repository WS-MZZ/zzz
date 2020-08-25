<template>
  <div>
    <div>
      <transition name="confirm-fade">
        <div class="confirm" @click.stop>
          <div class="confirm-wrapper">
            <div class='topoperate'></div>
            <div :id="randomId" class='l-map'></div>
            <div>
              <el-input
                clearable class='r-result' size="small"
                type="text" placeholder="请输入具体位置" :id="suggestId"  style="width:300px;"
                v-model="resultObj.address">
              </el-input>
            </div>
            <div class="operate">
              <div class="rightSide">
                <el-button @click="hide">取消</el-button>
                <el-button @click="confirm" type="primary">确认</el-button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker} from 'vue-baidu-map'
  export default {
    name: "map-search",
    props: {
      value: Object
    },
    components: {
      BaiduMap,
      BmControl,
      BmView,
      BmAutoComplete,
      BmLocalSearch,
      BmMarker
    },
    data() {
      return {
        resultObj: {
            lng:null,
            lat:null,
            address: ''
        }, //坐标逆解析结果对象(根据经纬度获取地址)
        curPoint: {}, //当前选中的坐标经纬度
        scrollTop: null,
        scrollLeft: null,
        randomId:"",
        suggestId:"",
        mapStyle: {
          width: '100%',
          height: '100%'
        },
        center: {lng: 116.404, lat: 39.915},
        zoom: 15
      }
    },
    created() {
      this.randomId = this.randomString()
      this.suggestId = this.randomString()
      this.show()
    },
    methods: {
      show() {
        //document.body.style.overflow = 'hidden'
        this.scrollTop = document.documentElement.scrollTop
        this.scrollLeft = document.documentElement.scrollLeft
        window.scrollTo(0, 0)
        this.$nextTick(() => {
          setTimeout(() => {
            //初始化地图
            var $this = this
            //第一次点开地图弹框，进行地图的实例化
            var map = new BMap.Map(this.randomId);

            var point = new BMap.Point(116.404, 39.915); // 创建点坐标，汉得公司的经纬度坐标
            map.centerAndZoom(point, 12);
            map.enableScrollWheelZoom(); //启动鼠标滚轮操作
            let marker = new BMap.Marker(point)
            map.addOverlay(marker)
        
            this.resultObj.address = ''
            var ac = new BMap.Autocomplete(//建立一个自动完成的对象
              {
                  "input": this.suggestId,
                  "location": map
              }
            )
            let myValue
            ac.addEventListener("onconfirm", function (e) {
              //鼠标点击下拉列表后的事件
              let _value = e.item.value  //获取选中的地址信息
              myValue = _value.province + _value.city + _value.district + _value.street + _value.business //拼接成具体地址
              $this.resultObj.address = myValue
              setPlace();
            });
            function setPlace() {
              map.clearOverlays();    //清除地图上所有覆盖物
              function myFun() {
                if(local.getResults().getPoi(0)) {
                  $this.curPoint = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                  map.centerAndZoom($this.curPoint, 12);
                  map.addOverlay(new BMap.Marker($this.curPoint));    //添加标注
                }else {}
              }
              let local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
              });
              local.search(myValue);
            }
            map.addEventListener("click",function(e){
                map.clearOverlays();
                $this.curPoint = new BMap.Point(e.point.lng, e.point.lat)
                let marker = new BMap.Marker($this.curPoint)
                map.addOverlay(marker)
                let geoc = new BMap.Geocoder();
                let pt = e.point;
                geoc.getLocation(pt, function(rs){
                    $this.resultObj.lat = rs.lat
                    $this.resultObj.lng = rs.lng
                    $this.resultObj.address = rs.address;
                });
            })
          }, 500);
        })
      },
      hide() {
        var map = new BMap.Map(this.randomId);
        document.body.style.overflow = 'auto'
        if (this.scrollTop !== null && this.scrollLeft !== null) {
          window.scrollTo(this.scrollLeft, this.scrollTop)
        }
        if (!this.resultObj.lng && !this.resultObj.lat) {
          map.clearOverlays()
          let center = new BMap.Point(116.404, 39.915)
          map.centerAndZoom(center, 12)
        }
        this.$emit('mapClosed')
      },
      confirm() {
        if (!this.curPoint.lng && !this.curPoint.lat) {
          this.$message({
            message: '请在地图上标记位置点',
            type: 'info'
          })
          return
        }
        document.body.style.overflow = 'auto'
        if (this.scrollTop !== null && this.scrollLeft !== null) {
          window.scrollTo(this.scrollLeft, this.scrollTop)
        }
        this.resultObj.lng = this.curPoint.lng
        this.resultObj.lat = this.curPoint.lat
        this.$emit('mapLocationSuccess', this.resultObj)
      },
      //生成随机id数（因为一个页面可能多次用到地图组件，保证其地图加载时能找到唯一的id）
      randomString() {
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        var maxPos = $chars.length
        var pwd = ''
        for (let i = 0; i < 32; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      }
    }
  }
</script>

<style scoped>
  .confirm {
    position: fixed;
    width: 80%;
    left: 300px;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 990;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 40px 40px 40px;
  }

  .confirm.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;
  }

  .confirm .confirm-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 222;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  .confirm .confirm-wrapper .topoperate {
    position: absolute;
    height: 50px;
    width: 100%;
    top: 0;
    padding: 10px 20px;
    background: #fff;
    z-index: 99;
  }
  .confirm .confirm-wrapper .operate {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 10px 20px;
    background: #fff;
    text-align: center;
  }

  .confirm .confirm-wrapper .operate .leftSide {
    float: left;
    line-height: 40px;
  }
  .confirm .confirm-wrapper .operate .rightSide {
    float: right;
  }
  .l-map {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    height: 100%;
  }

  .r-result {
    width:340px;
    z-index: 999;
    position: fixed;
    top: 100px;
    left: 365px;
  }
  @keyframes confirm-fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
<style>
  /* 关键字下拉框 */
  .tangram-suggestion-main {
    z-index: 9999 !important;
  }
  /* 去掉坐下面默认百度logo版权 */
  .BMap_cpyCtrl {
    display:none;
  }
  .anchorBL{
    display:none;
  }
  /* 标题样式 */
  .all_blue2{
    width:3px;
    height: 24px;
    background: #6ab2ff;
  }

</style>
