<template> 
  <div>
    <div class="cropper-wrapper cropper-wapper">
      <img @click="isShowModel=true" v-if="initImg" :src="initImg" class="cropper-img">
      <el-button type="text" @click="isShowModel=true" v-else class="el-icon-plus cropper-wrapper-icon"></el-button>
    </div>
    <div v-if="isShowModel">
      <el-dialog  title="图片上传"
                :visible="isShowModel"
                :before-close="closecropperModel"
                class="jxf-upload lcropper"
                style="width: 1650px"
                @close="close" 
                append-to-body 
                >
        <div :id="randomId" class="cropper_content" :class="{ small: tCropHeight <= 300, big: tCropHeight > 300 }">
          <el-row :gutter="10">
            <el-col :span="16" class="imageArea" v-if="option.image">
              <vue-cropper
                ref="cropper"
                :img="option.image ? option.image : dealImage"
                :autoCrop="true"
                :info="false"
                :full="true"
                :centerBox="true"
                :canScale="false"
                resizable="true"
                outputType="png"
                :fixedBox="fixedBox"
                :outputSize="option.outputSize"
                :fixedNumber="option.fixedNumber"
                @realTime="realTime"
              >
              </vue-cropper>
            </el-col>
            <el-col :span="8">
              <div class="prewArea" style="previewStyleBig">
                <div :style="previews.div" class="preview" v-if="previews.url || option.image || dealImage">
                  <img :src="previews.url ? previews.url : dealImage" :style="previews.img">
                </div>
              </div>
              <el-row :gutter="10">
                <el-col :span="22">
                  <div class="changeImage">
                    <label class="btn" for="uploads">选择图片</label>
                    <input type="file" ref="uploads" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="setImage($event, 1)">
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10" v-if="option.image">
                <el-col :span="11">
                  <!-- 上传 -->
                  <el-button type="success" @click="uploadImg('blob')">上传</el-button>
                </el-col>
                <el-col :span="11">
                  <!-- 取消 -->
                  <el-button type="success" @click="cancelUpload">取消</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="footer-btn">
          <div class="scope-btn">
            <div class="loadImg">
            </div>
          </div>
        </div>
    </el-dialog>
    </div>
    
  </div>
</template>
<script>
  import { VueCropper } from "vue-cropper"
  import { deleteFile } from '@/api/file'
  import request from '@/utils/request'
  export default {
    name: 'CropperUpload',
    components:{
      VueCropper
    },
    props: {
      //图片属性数组
      value: String,
      useUuid: {
        type: Boolean,
        default: true
      },
      replace: {
        type: Boolean,
        default: false
      },
      isShowCropper: {
        type: Boolean,
        default: true
      },
      fixedBox: {
        type: Boolean,
        default: true
      },
      tCropWidth: {
        type: Number,
        default: 460
      },
      tCropHeight: {
        type: Number,
        default: 345
      },
      dealImage: {
        type: String,
        default: null
      },
      getChangedImage: {
        type: Function,
        default: () => {}
      },
      uploadUrl: {
        type: String,
        default: ""
      },
      dataSize: {
        type: Number,
        default: 3
      },
      fixedNumber:[4,3]
    },
    data() {
      return {
        imageUrl: '',
        dataObj: {
          useUuid: this.useUuid,
          replace: this.replace
        },
        reviewStyleBig: {
          'overflow': 'hidden',
          'zoom': '0.5'
        },
        previews: {
        },
        fileUpload: null,
        option: {
          outputSize: 2,
          full: false,
          autoCrop: true,
          fixedBox: true,
          autoCropWidth: this.tCropWidth,
          autoCropHeight: this.tCropHeight ,
          image: null,
          fixedNumber: this.fixedNumber
        },
        randomId:"",
        isShowModel: false
      };
    },
    created(){
      this.randomId = this.randomString()
    },
    methods: {
      setImage(e, num) {
        var file = e.target.files[0]
        this.fileUpload = file
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$message.warning('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.image = data
          }
          this.$refs['uploads'].value = ''
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
 
      // 放大缩小
      changeScale(num) {
        num = num || 1;
        this.$refs.cropper.changeScale(num);
      },
 
      // 左旋转
      rotateLeft() {
        this.$refs.cropper.rotateLeft();
      },
 
      // 右旋转
      rotateRight() {
        this.$refs.cropper.rotateRight();
      },

      // 上传
      uploadImg(type) {
        let formData = new FormData();
        if (type === 'blob') {
            this.$refs.cropper.getCropBlob((data) => {
                if(data.size / 1024 / 1024 > this.dataSize) {
                  this.$message({
                    message: '上传图片不能超过' + this.dataSize,
                    type: 'warning'
                  });
                  return false;
                }
                formData.append("file", data, 'cropper.png');
                let url = this.uploadUrl
                request.post(
                  url,
                  formData,
                  {
                    contentType: false, 
                    processData: false, 
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(res => {
                  if(res.message === 'success'){
                    this.$emit('input', res.data.url)
                    this.isShowModel = false
                    this.closecropperModel()
                  }
                }).catch(err => {
                  console.error("上传失败...")
                })
            })
        } else {
          // 预留
        }
      },
 
      // 取消上传
      cancelUpload() {
        this.fileUpload = null;
        this.option = {
          outputSize: 2,
          autoCrop: true,
          fixedBox: true,
          autoCropWidth: this.tCropWidth,
          autoCropHeight: this.tCropHeight,
          image: null,
        };
        this.previews = {}
        if(this.option.image) {
          this.$refs['cropper'].imgs = "";
        }
        this.close()
      },

      // 预览
      realTime(data) {
        this.previews = {
          ...data
        };
      },
 
      // 将base64的图片转换为file文件
      convertBase64UrlToBlob(urlData) {
        let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
      },
 
      // 关闭弹窗之前
      closecropperModel(done) {
        this.fileUpload = null
        this.option = {
          outputSize: 2,
          autoCrop: true,
          fixedBox: true,
          autoCropWidth: this.tCropWidth,
          autoCropHeight: this.tCropHeight,
          image: null,
        };
        if(this.option.image) {
          this.$refs['cropper'].imgs = "";
        }
        this.previews = {}
        // this.dealImage = null;
        if(done){
          done()
        }
        
      },

      // 关闭Cropper
      close(){
        this.isShowModel = false
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
    },
    computed:{
      initImg: function(){
        return this.value
      }
    },
  }
</script>
<style>
  .cropper-wapper {
    height: 150px;
    width: 200px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .cropper-wapper:hover {
    border-color: #409EFF;
  }
  .cropper-wrapper-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 150px;
    text-align: center;
  }
  .cropper-img {
    width: 200px;
    height: 150px;
    display: block;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.jxf-upload {
  .btn {
    display: inline-block;
    width: 100%;
    cursor: pointer;
  }
  small {
    zoom: .5;
  }
  big {
    zoom: .5;
  }
  .imageArea {
    position: relative;
  }
}
.lcropper {
    .el-dialog {
      //width: 1000px!important;
      width: 60%;
      .cropper_content {
        .vue-cropper {
          width: 500px!important;
          height: 375px!important;
          zoom: .4;
          .cropper-crop-box {
            width: 350px;
            height: 350px;
          }
          .cropper-modal {
            background: url("data:image/png")!important;
          }
        }
        .prewArea {
          //background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
          .preview{
            overflow: hidden;
            margin-left: 55%;
            transform: translateX(-55%) scale(0.65);
            /*margin-left: 40px;*/
            img {
              max-height: 1400px!important;
            }
          }
        }
        .el-button {
          margin-top: 10px;
          width: 100%;
          height: 40px;
          font-size: 12px;
          text-align: center;
        }
        .changeImage {
          margin-top: 10px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 12px;
          color: #fff;
          background: #67c23a;
          border-color: #67c23a;
          border-radius: 4px;
        }
      }
    }
  }
</style>


