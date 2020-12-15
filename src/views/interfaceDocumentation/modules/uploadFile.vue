<template>
  <div>
    <div class="menu-detailSty">
      <div class="detail-title">上传单个文件/创建目录</div>
      <div class="detail-briefintroduction">
        简介这里是接口的简介简介这里是接口的简介简介这里是接口的简介简介这里是接口的简介简介这里是接口的简介
      </div>
      <div class="detail-moType">
        <div class="moType-module">
          所属分类: <span class="moType-moduleContent">公共类</span>
        </div>
        <div class="moType-module">
          收费类型: <span class="moType-moduleContent">按次收费</span>
        </div>
        <div class="moType-module">
          输入输出类型: <span class="moType-moduleContent">IN</span>
        </div>
      </div>
      <!-- API URL -->
      <div class="detail-tableModule">
        <div class="tableModule-title">Api URL</div>
        <div class="tableModule-border">
          <div class="tablemodule-borderTop">
            <div class="bordertop-left">URL</div>
            <div class="bordertop-right">https://api.saas.copeople.demo.aks.chilunyc.com/api/file/v2/{path}</div>
          </div>
          <div class="tablemodule-borderBottom">
            <div class="bordertop-left">请求方式</div>
            <div class="bordertop-right">POST</div>
          </div>
        </div>
      </div>
      <!-- 请求参数 -->
      <div class="detail-tableModule">
        <div class="tableModule-title">请求参数</div>
        <div>
          <el-table
            :data="tableData"
            border
            style="width: 100%;"
            :header-cell-style="{background:'#f5f7fa',color:'black'}"
          >
            <el-table-column
              prop="dateName"
              label="参数名"
            />
            <el-table-column
              prop="meaning"
              label="含义"
            />
            <el-table-column
              prop="rule"
              label="规则说明"
            />
            <el-table-column
              prop="confirm"
              label="是否必须"
            />
            <el-table-column
              prop="defaultValue"
              label="缺省值"
            />
          </el-table>
        </div>
      </div>
      <!-- 返回结果参数说明 -->
      <div class="detail-tableModule">
        <div class="tableModule-title">返回结果参数说明</div>
        <div>
          <el-table
            :data="tableDetail"
            border
            style="width: 100%;"
            :header-cell-style="{background:'#f5f7fa',color:'black'}"
          >
            <el-table-column
              prop="date"
              label="名称"
            />
            <el-table-column
              prop="meaning"
              label="含义"
            />
            <el-table-column
              prop="rule"
              label="规则说明"
            />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',
  data() {
    return {
      tableDetail: [],
      tableData: [
        {
          dateName: 'file',
          meaning: '当创建文件夹时，该参数不用传',
          rule: '',
          confirm: '否',
          defaultValue: ''
        },
        {
          dateName: 'name',
          meaning: '文件存储时的最终文件名',
          rule: '',
          confirm: '否',
          defaultValue: ''
        },
        {
          dateName: 'useUuid',
          meaning: '是否使用UUID命名文件名',
          rule: '',
          confirm: '否',
          defaultValue: ''
        },
        {
          dateName: 'replace',
          meaning: '当该路径下存在同名文件是否覆盖',
          rule: '',
          confirm: '否',
          defaultValue: ''
        },
        {
          dateName: 'isDir',
          meaning: '当前请求是否是创建目录',
          rule: '',
          confirm: '否',
          defaultValue: ''
        },
        {
          dateName: 'appId',
          meaning: 'appId',
          rule: '',
          confirm: '否',
          defaultValue: ''
        },
        {
          dateName: 'appSecret',
          meaning: 'appSecret',
          rule: '',
          confirm: '否',
          defaultValue: ''
        },
        {
          dateName: 'sysEnterpriseId',
          meaning: '企业id',
          rule: '',
          confirm: '否',
          defaultValue: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-detail {
  // width: 80%;
  .menu-detailSty {
    margin-left: 15px;
    .detail-title {
      font-weight: 600;
      padding: 10px 0px;
      margin-bottom: 10px;
    }
    .detail-briefintroduction {
      font-size: 14px;
      color: rgb(179, 176, 176);
      margin-bottom: 20px;
    }
    .detail-moType {
      display: flex;
      // justify-content: space-around;
      .moType-module {
        margin-right: 10px;
        color: rgb(179, 176, 176);
        width: 30%;
        font-size: 14px;
        .moType-moduleContent {
          color: black;
        }
      }
    }
    // API URL
    .detail-tableModule {
      margin-top: 30px;
      .tableModule-title {
        height: 40px;
      }
      .tableModule-border {
        border: 1px solid  #EBEEF5;
        height: 70px;
        .tablemodule-borderTop {
          display: flex;
          width: 100%;
          height: 35px;
          line-height: 35px;
          padding: 0 10px;
          border-bottom: 1px solid  #EBEEF5;
        }
        .bordertop-left {
          width: 10%;
          border-right: 1px solid  #EBEEF5;
        }
        .bordertop-right {
          padding: 0 10px;
        }
        .tablemodule-borderBottom {
          display: flex;
          width: 100%;
          height: 35px;
          line-height: 35px;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
