<template>
<div class="task-queue">

  <el-table style="" border :data="tasks">
    <el-table-column align="center" :show-overflow-tooltip="true" label="任务名称" prop="name"></el-table-column>
    <el-table-column align="center" label="任务类型" prop="type"></el-table-column>
    <el-table-column align="center" :show-overflow-tooltip="true" label="执行人" prop="executor"></el-table-column>
    <el-table-column align="center" label="发布人" prop="initiator"></el-table-column>
    <el-table-column align="center" label="优先级" prop="priority">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.priority === 0" type="primary">{{getPriorityByCode(scope.row.priority)}}</el-tag>
        <el-tag v-else-if="scope.row.priority === 1" type="warning">{{getPriorityByCode(scope.row.priority)}}</el-tag>
        <el-tag v-else-if="scope.row.priority === 2" type="danger">{{getPriorityByCode(scope.row.priority)}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="80px">
      <template slot-scope="scope">
        <el-button @click="taskDetailClick(scope.$index, scope.row)" size="mini" type="success">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-pagination style="float: right;min-height: 30px;margin-top: 20px;" background layout="prev, pager, next" :total="1000"></el-pagination> -->
  <el-dialog fullscreen :visible.sync="taskDetailDialogVisible">
    <el-card>
      <div slot="header" class="global-title" style="font-size: 1.5em;color: #E6A23C"> {{taskDetail.name}}</div>
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
              <p>开始时间 : {{taskDetail.startingTime}}</p>
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

    <p class="global-title">提交内容</p>
    <el-card>
      <p v-highlight class="markdown-body" v-html="taskDetail.content"></p>
    </el-card>
    <span class="global-title" style="display: block;margin-top: 20px">附件</span>
    <el-link style="margin-right: 20px;line-height: 50px" v-for="(item, index) in annexes" :key="index" class="el-icon-files" :href="item.url" target="_blank">
      {{item.name}}
    </el-link>
    <div slot="footer">
      <el-button type="danger" size="small" @click="taskRedo">任务重做</el-button>
      <el-button type="success" size="small" @click="taskComplete">任务完成</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import {
  listTaskTypes,
  updateTaskByManager,
  insertTask,
  listAllTasksByProjectId
} from '@/api/task'
import {
  insertAnnex,
  updateAnnex,
  listAnnexesByTaskId,
  deleteAnnex
} from '@/api/annex'
export default {
  data() {
    return {
      tasks: [],
      taskDetail: {},
      taskDetailDialogVisible: false,
      userInfo: {},
      project: {},
      annexes: []
    }
  },
  methods: {
    taskDetailClick(index, row) {
      this.taskDetail = {
        ...row
      };
      this.taskDetailDialogVisible = true;
    },
    taskComplete() {
      let submitData = {
        ...this.taskDetail
      }
      submitData.status = 1
      updateTaskByManager(submitData).then(response => {
        this.$message({
          message: response,
          type: 'success'
        })
        this.taskDetailDialogVisible = false
        this.init()
      })

    },
    taskRedo() {
      let submitData = {
        ...this.taskDetail
      }
      submitData.status = -1
      updateTaskByManager(submitData).then(response => {
        this.$message({
          message: response,
          type: 'success'
        })
        this.taskDetailDialogVisible = false
        this.init()
      })
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
    init() {
      this.userInfo = this.$store.getters.getUserInfo

      let tPro = this.$store.getters.getProjectDetails

      if (tPro === undefined) {
        this.$router.push({
          path: '/my-home'
        });
      } else {
        this.project = tPro;
      }

      listAllTasksByProjectId(this.project.id).then(response => {
        this.tasks = response.content.filter((item) => {
          return item.status === 2
        })
      })

      listAnnexesByTaskId(this.taskDetail.id).then(response => {
        this.annexes = response.content
      })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped>
.markdown-body>>>pre {
  border-style: solid;
  border-width: 1px;
  border-color: #e0e3e7;
  border-radius: 7px;
  /*background: #333333;*/
  background: #fdfdfe;
}

.markdown-body>>>code {
  font-size: 14px;

}

.markdown-body {
  margin: 0 auto;
}
</style>
