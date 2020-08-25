<template>
    <div class="form-container" shadow="never">
        <el-form :model="tagForm" :rules="rules" ref="tagForm" label-width="100px" >
            <el-form-item label="分类名称：" prop="name">
                <el-input v-model="tagForm.name" placeholder="请输入分类名称" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('tagForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  import news from '@/api/cms/news'
  export default {
    data() {
      return {
        tagForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let $this =  this
            news.addTag(this.tagForm.name).then(res => {
                this.$router.push({ path: '/news/tag-list' });
            }).catch(err => {
                $this.$message.error('新增失败');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>