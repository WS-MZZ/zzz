<template>
    <div class="form-container" shadow="never">
        <el-form :model="bannerForm" :rules="rules" ref="bannerForm" label-width="100px" >
            <el-form-item label="标题：" prop="title">
                <el-input v-model="bannerForm.title" placeholder="请输入3 到 20 个字符" ></el-input>
            </el-form-item>
            <el-form-item label="副标题：" prop="subTitle">
                <el-input v-model="bannerForm.subTitle" placeholder="50字以内" ></el-input>
            </el-form-item>
            <el-form-item label="网站图片：" prop="pcCover">
                <cropper-upload :uploadUrl="fileUploadUrl" v-model="bannerForm.pcCover" style="display:inline;float:left"/>
                <label style="color:red;padding-left:20px">图片尺寸建议800*600</label>
            </el-form-item>
             <el-form-item label="H5图片：" prop="h5Cover">
                <cropper-upload :uploadUrl="fileUploadUrl" v-model="bannerForm.h5Cover" style="display:inline;float:left"/>
                <label style="color:red;padding-left:20px">图片尺寸建议800*600</label>
            </el-form-item>
            <el-form-item label="跳转类型：">
                 <el-radio-group v-model="redirectTypeRadioValue">
                    <el-radio :label="1">链接</el-radio>
                    <el-radio :label="2">图文</el-radio>
                    <el-radio :label="3">无跳转</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="redirectTypeRadioValue === 1" label="链接地址：" prop="redirectUrl">
                <el-input v-model="bannerForm.redirectUrl"></el-input>
            </el-form-item>
            <el-form-item v-if="redirectTypeRadioValue === 2" label="图文内容" prop="content">
                <quill v-model="bannerForm.content"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('bannerForm', true)">保存并发布</el-button>
                <el-button type="primary" @click="submitForm('bannerForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  import banner from '@/api/cms/banner'
  import CropperUpload from '@/components/Upload/CropperUpload'
  import { FILE_API_URL } from '@/api/file'
  import quill from "@/components/RichTextEditor/quill"
  export default {
    components: {
        CropperUpload,
        quill
    },
    data() {
      return {
        fileUploadUrl: FILE_API_URL,
        redirectTypeRadioValue: 1,
        bannerForm: {
          title: '',
          subTitle:'',
          pcCover:'',
          h5Cover:'',
          redirectType: 'LINK',
          redirectUrl: '',
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          pcCover: [
            { required: true, message: '请选择网站图片', trigger: 'blur' }
          ],
          redirectUrl: [
            { required: true, message: '请选择链接地址', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写图文内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName, publish) {
        //this.$router.push({ path: '/banner/list' });
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let $this = this
            if(publish){
              this.bannerForm.state = "ONLINE"
            }
            banner.addOne(this.bannerForm).then(res => {
                this.$router.push({ path: '/banner/list' });
            }).catch(err => {
                $this.$message.error('新增失败');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },
    watch: {
       // 如果 `redirectTypeRadioValue` 发生改变，这个函数就会运行
        redirectTypeRadioValue: function (newRedirectTypeRadioValue, oldRedirectTypeRadioValue) {
            if(newRedirectTypeRadioValue === 1){
              this.bannerForm.content = ''
              this.bannerForm.redirectType = 'LINK';
            }else if(newRedirectTypeRadioValue === 2){
              this.bannerForm.redirectUrl = '' 
              this.bannerForm.redirectType = 'IMAGEANDTEXT';
            }else if(newRedirectTypeRadioValue === 3){
              this.bannerForm.content = ''
              this.bannerForm.redirectUrl = '' 
              this.bannerForm.redirectType = 'NONE';
            }
        }
    },
  }
</script>