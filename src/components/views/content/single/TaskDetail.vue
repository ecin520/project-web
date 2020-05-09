<template>
<div class="task-detail">
  <el-card class="standard-pitch">
    <div slot="header" class="global-title" style="font-size: 1.5em;color: #E6A23C"><i style="color: #67C23A" @click="goBack" class="el-icon-caret-left pointer"></i> {{taskDetail.name}}</div>
    <div style="">
      <el-row :gutter="20">
        <el-col :lg="8" :xl="8">
          <div style="padding: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <p>ID : {{taskDetail.id}}</p>
            <p>项目ID : {{taskDetail.projectId}}</p>
            <p>发布者 : {{taskDetail.initiator}}</p>
            <p>任务类型 : {{taskDetail.type}}</p>
            <p>任务名称 : {{taskDetail.name}}</p>
            <p>优先级 :
              <el-tag v-if="taskDetail.priority === 0" type="primary">{{getPriorityByCode(taskDetail.priority)}}</el-tag>
              <el-tag v-else-if="taskDetail.priority === 1" type="warning">{{getPriorityByCode(taskDetail.priority)}}</el-tag>
              <el-tag v-else-if="taskDetail.priority === 2" type="danger">{{getPriorityByCode(taskDetail.priority)}}</el-tag>

            </p>
            <p>开始时间 : {{taskDetail.startTime}}</p>
            <p>截止时间 : {{taskDetail.deadline}}</p>
            <p>创建时间 : {{taskDetail.createTime}}</p>
            <p>任务状态 : {{taskDetail.status}}</p>
            <p>执行者 : {{taskDetail.executor}}</p>
          </div><br>
        </el-col>
        <el-col :lg="16" :xl="16">
          <div style="padding: 10px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <span class="global-title standard-pitch">任务描述</span>
            <p class="standard-pitch">{{taskDetail.explanation}}</p>
          </div>
        </el-col>
      </el-row>

    </div>
  </el-card>
  <div class="submit-content">
    <p class="global-title">提交内容</p>
    <mark-editor v-model="taskDetail.content" :isClear="isClear" @change="change"></mark-editor>
  </div>

  <div class="annex">
    <span class="global-title" style="display: block">附件</span>
    <el-link style="margin-right: 20px;line-height: 50px" v-for="(item, index) in annexes" :key="index" class="el-icon-files" :href="item.url" target="_blank">
      {{item.name}}
    </el-link>
    <el-upload :show-file-list="false" action :http-request="uploadAnnex" :auto-upload="true">
      <el-link style="line-height: 50px" v-loading="loading">上传附件</el-link>
    </el-upload>

  </div>
  <div class="submit-bottom">
    <el-button type="success" size="small" @click="taskSubmitClick">任务提交</el-button>
  </div>

</div>
</template>

<script>
import MarkEditor from '@/components/editor/MarkEditor'
import {
  listTaskTypes,
  updateTaskByManager,
  updateTaskByDeveloper,
  insertTask,
  listAllTasksByProjectId,
  listAllTasksByProjectIdAndExecutor
} from '@/api/task'
import {
  insertAnnex,
  updateAnnex,
  listAnnexesByTaskId,
  deleteAnnex
} from '@/api/annex'
export default {
  components: {
    MarkEditor
  },
  data() {
    return {
      isClear: false,
      detail: "",
      taskDetail: {
        id: null,
        projectId: null,
        executor: null,
        initiator: null,
        name: null,
        status: null,
        type: null,
        explanation: null,
        startingTime: null,
        deadline: null,
        content: null,
        priority: null,
        createTime: null
      },
      taskDetailDialogVisible: false,
      annexes: [],
      loading: false
    }
  },
  methods: {
    change(val) {
      console.log(val)
    },
    goBack() {
      this.$router.go(-1);
    },
    getPriorityByCode(key) {
      switch (key) {
        case 0:
          return '普通';
        case 1:
          return '警告';
        case 2:
          return '紧急';
      }
    },
    uploadAnnex(params) {

      let annex = null
      let file = params.file;
      let formdata = new FormData();
      formdata.append("file", file);

      this.$axios({
          url: "http://www.pytap.com:8081//file/fileUpload",
          method: "post",
          data: formdata,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.$message({
            message: "上传成功",
            type: "success"
          });
          annex = {
            name: '附件' + this.annexes.length,
            url: response.data,
            taskId: this.taskDetail.id
          }
          insertAnnex(annex).then(response => {
            this.annexes.push(this.annex)
            this.refreshAnnex()
          })

        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "上传失败",
            type: "error"
          });
        });
    },
    taskSubmitClick() {
      let submitData = {
        ...this.taskDetail
      }
      submitData.status = 2
      updateTaskByDeveloper(submitData).then(response => {
        this.$message({
          message: response,
          type: 'success'
        })
        this.$router.go(-1);
      })

    },
    refreshAnnex() {
      listAnnexesByTaskId(this.taskDetail.id).then(response => {
        this.annexes = response.content
      })
    },
    init() {
      this.taskDetail = this.$route.params.taskDetail
      this.refreshAnnex()
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss">
.task-detail {
  margin-top: 70px;
  margin-bottom: 100px;
}

.submit-content {
  margin: 20px;
}

.annex {
  margin: 20px;
}

.submit-bottom {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
