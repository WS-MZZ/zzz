<template>
    <div class="form-container" shadow="never">
        <el-form :model="newsForm" :rules="rules" ref="newsForm" label-width="100px" >
            <el-form-item label="标题：" prop="title">
                <el-input v-model="newsForm.title" placeholder="请输入3 到 20 个字符" ></el-input>
            </el-form-item>
            <el-form-item label="副标题：" prop="subTitle">
                <el-input v-model="newsForm.subTitle" placeholder="50字以内" ></el-input>
            </el-form-item>
            <el-form-item label="来源：" prop="source">
                <el-input v-model="newsForm.source" placeholder="请输入新闻来源" ></el-input>
            </el-form-item>
            <el-form-item label="作者：" prop="author">
                <el-input v-model="newsForm.author" placeholder="请输入作者" ></el-input>
            </el-form-item>
            <el-form-item label="摘要：" prop="summary">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入新闻摘要" v-model="newsForm.summary"></el-input>
            </el-input>
            </el-form-item>
            <el-form-item label="封面图片：" prop="cover">
              <cropper-upload :uploadUrl="fileUploadUrl" v-model="newsForm.cover" style="display:inline;float:left"/>
              <label style="color:red;padding-left:20px">图片尺寸建议800*600</label>
            </el-form-item>
            <el-form-item label="类型：">
                <el-checkbox-group v-model="newsForm.tagNames">
                    <el-checkbox v-for="tag in tags" :label="tag.name" :key="tag.id" name="tag"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="跳转类型：">
                 <el-radio-group v-model="redirectTypeRadioValue">
                    <el-radio :label="1">链接</el-radio>
                    <el-radio :label="2">图文</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="redirectTypeRadioValue === 1" label="链接地址：" prop="redirectUrl">
                <el-input v-model="newsForm.redirectUrl"></el-input>
            </el-form-item>
            <el-form-item v-if="redirectTypeRadioValue === 2" label="图文内容" prop="content">
                <quill v-model="newsForm.content"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('newsForm', true)">保存并发布</el-button>
                <el-button @click="cancel()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  import news from '@/api/cms/news'
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
        tags:[],
        newsForm: {
          id: -1,
          title: '',
          subTitle: '',
          source: '',
          author: '',
          cover: '',
          summary: '',
          tagNames:[],
          redirectType: 'LINK',
          redirectUrl: '',
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
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
    created(){
        //this.getInit()
    },
    methods: {
      submitForm(formName, publish) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let $this =  this
            if(publish){
              this.newsForm.state = "ONLINE"
            }
            news.updateOne(this.newsForm).then(res => {
                this.$router.push({ path: '/news/list' })
            }).catch(err => {
                $this.$message.error('新增失败');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel() {
        this.$router.push({ path: '/news/list' })
      },
      getInit(){
        let $this = this
        let id = this.$route.query.id;
        $this.newsForm.id = id
        news.getOne(id).then(res => {
            $this.newsForm = res.data
            let initTags = []
            if(res.data.tags && res.data.tags.length > 0){
                 for(let i = 0, len = res.data.tags.length; i < len; i ++){
                    initTags.push(res.data.tags[i].name)
                }
            }
            $this.newsForm.tagNames = initTags
     
            if($this.newsForm.redirectType === 'IMAGEANDTEXT'){
                $this.redirectTypeRadioValue = 2
            }else if($this.newsForm.redirectType === 'LINK'){
                $this.redirectTypeRadioValue = 1
            }
            news.getTags().then(res => {
                $this.tags = res.data
            }).catch(err => {
                console.error('获取tags失败')
            })
        }).catch(err => {
            this.$message.error('error');
        })
        
      }
    },
    mounted(){
        this.getInit()
    },
    watch: {
        // 如果 `redirectTypeRadioValue` 发生改变，这个函数就会运行
        redirectTypeRadioValue: function (newRedirectTypeRadioValue, oldRedirectTypeRadioValue) {
            if(newRedirectTypeRadioValue === 1){
              this.newsForm.content = ''
              this.newsForm.redirectType = 'LINK';
            }else if(newRedirectTypeRadioValue === 2){
              this.newsForm.redirectUrl = '' 
              this.newsForm.redirectType = 'IMAGEANDTEXT';
            }else if(newRedirectTypeRadioValue === 3){
              this.newsForm.content = ''
              this.newsForm.redirectUrl = '' 
              this.newsForm.redirectType = 'NONE';
            }
        }
    },
  }
</script>