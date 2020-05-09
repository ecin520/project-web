<template>
<div class="project-browse-task">
  <el-card>
    <span style="color: #909399" slot="header">
      待领取任务
    </span>
    <el-table style="" border :data="pendingTasks">
      <el-table-column align="center" width="90px" label="任务类型" prop="type"></el-table-column>
      <el-table-column align="center" width="90px" :show-overflow-tooltip="true" label="执行人" prop="executor"></el-table-column>
      <el-table-column align="center" width="90px" label="发布人" prop="initiator"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" label="任务名称" prop="name"></el-table-column>
      <el-table-column align="center" label="开始时间" prop="startingTime"></el-table-column>
      <el-table-column align="center" label="截止时间" prop="deadline"></el-table-column>
      <el-table-column align="center" width="90px" label="优先级" prop="priority">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.priority === 0" type="primary">{{getPriorityByCode(scope.row.priority)}}</el-tag>
          <el-tag v-else-if="scope.row.priority === 1" type="warning">{{getPriorityByCode(scope.row.priority)}}</el-tag>
          <el-tag v-else-if="scope.row.priority === 2" type="danger">{{getPriorityByCode(scope.row.priority)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px">
        <template slot-scope="scope">
          <el-button @click="taskReceiveClick(scope.$index, scope.row)" size="mini" type="primary">领取</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <br>
  <el-card>
    <span style="color: #E6A23C" slot="header">
      待完成任务
    </span>
    <el-table style="" border :data="tasks">
      <el-table-column align="center" width="90px" label="任务类型" prop="type"></el-table-column>
      <el-table-column align="center" width="90px" :show-overflow-tooltip="true" label="执行人" prop="executor"></el-table-column>
      <el-table-column align="center" width="90px" label="发布人" prop="initiator"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" label="任务名称" prop="name"></el-table-column>
      <el-table-column align="center" label="开始时间" prop="startingTime"></el-table-column>
      <el-table-column align="center" label="截止时间" prop="deadline"></el-table-column>
      <el-table-column align="center" width="90px" label="优先级" prop="priority">
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
  </el-card>
  <br>
  <el-card>
    <span style="color: #F56C6C" slot="header">
      未完成任务
    </span>
    <el-table style="" border :data="overTimeTasks">
      <el-table-column align="center" width="90px" label="任务类型" prop="type"></el-table-column>
      <el-table-column align="center" width="90px" :show-overflow-tooltip="true" label="执行人" prop="executor"></el-table-column>
      <el-table-column align="center" width="90px" label="发布人" prop="initiator"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" label="任务名称" prop="name"></el-table-column>
      <el-table-column align="center" label="开始时间" prop="startingTime"></el-table-column>
      <el-table-column align="center" label="截止时间" prop="deadline"></el-table-column>
      <el-table-column align="center" width="90px" label="优先级" prop="priority">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.priority === 0" type="primary">{{getPriorityByCode(scope.row.priority)}}</el-tag>
          <el-tag v-else-if="scope.row.priority === 1" type="warning">{{getPriorityByCode(scope.row.priority)}}</el-tag>
          <el-tag v-else-if="scope.row.priority === 2" type="danger">{{getPriorityByCode(scope.row.priority)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px">
        <template slot-scope="scope">
          <el-button @click="overTimeTasksClick(scope.$index, scope.row)" size="mini" type="success">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <br>
  <el-card>
    <span style="color: #67C23A" slot="header">
      完成的任务
    </span>
    <el-table style="" border :data="completedTasks">
      <el-table-column align="center" width="90px" label="任务类型" prop="type"></el-table-column>
      <el-table-column align="center" width="90px" :show-overflow-tooltip="true" label="执行人" prop="executor"></el-table-column>
      <el-table-column align="center" width="90px" label="发布人" prop="initiator"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" label="任务名称" prop="name"></el-table-column>
      <el-table-column align="center" label="开始时间" prop="startingTime"></el-table-column>
      <el-table-column align="center" label="截止时间" prop="deadline"></el-table-column>
      <el-table-column align="center" width="90px" label="优先级" prop="priority">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.priority === 0" type="primary">{{getPriorityByCode(scope.row.priority)}}</el-tag>
          <el-tag v-else-if="scope.row.priority === 1" type="warning">{{getPriorityByCode(scope.row.priority)}}</el-tag>
          <el-tag v-else-if="scope.row.priority === 2" type="danger">{{getPriorityByCode(scope.row.priority)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px">
        <template slot-scope="scope">
          <el-button @click="completedTasksClick(scope.$index, scope.row)" size="mini" type="success">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog class="task-dialog" top="7vh" width="650px" title="任务详情" :visible.sync="taskDetailDialogVisible">
    <el-form size="small" :inline="true" label-width="90px" label-position="right" :model="taskDetail">
      <el-form-item label="ID">
        <el-input disabled="true" v-model="taskDetail.id"></el-input>
      </el-form-item>
      <el-form-item label="项目ID">
        <el-input disabled="true" v-model="taskDetail.projectId"></el-input>
      </el-form-item>
      <el-form-item label="发布者">
        <el-input disabled="true" v-model="taskDetail.initiator"></el-input>
      </el-form-item>
      <el-form-item label="任务类型">
        <el-input disabled="true" v-model="taskDetail.type"></el-input>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input disabled="true" v-model="taskDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="优先级">
        <el-tag v-if="taskDetail.priority === 0" type="primary">{{getPriorityByCode(taskDetail.priority)}}</el-tag>
        <el-tag v-else-if="taskDetail.priority === 1" type="warning">{{getPriorityByCode(taskDetail.priority)}}</el-tag>
        <el-tag v-else-if="taskDetail.priority === 2" type="danger">{{getPriorityByCode(taskDetail.priority)}}</el-tag>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker disabled="true" style="width: 195px" v-model="taskDetail.startingTime" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker disabled="true" style="width: 195px" v-model="taskDetail.deadline" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input disabled="true" v-model="taskDetail.createTime"></el-input>
      </el-form-item>
      <el-form-item label="任务状态">
        <el-input disabled="true" v-model="taskDetail.status"></el-input>
      </el-form-item>
      <el-form-item label="任务执行者">
        <el-popover placement="right" width="600" trigger="click">
          <el-table style="height: 300px;overflow: scroll;" :border="true" :show-header="false" :data="executors">
            <el-table-column align="center" width="61">
              <template slot-scope="scope">
                <el-avatar :src="scope.row.avatar"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80px" prop="username"></el-table-column>
            <el-table-column show-overflow-tooltip="true" prop="note"></el-table-column>
            <el-table-column align="center" width="85px">
              <template slot-scope="scope">
                <el-button @click="addExecutorClick(scope.$index, scope.row)" size="mini" type="success">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button disabled="true" plain slot="reference">委派任务</el-button>
        </el-popover>
        <el-input disabled="true" style="width: 405px" v-model="taskDetail.executor"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input disabled="true" style="width: 495px" type="textarea" v-model="taskDetail.explanation" textarea></el-input>
      </el-form-item>
      <el-form-item label="提交内容">
        <el-input disabled="true" style="width: 495px" type="textarea" v-model="taskDetail.content" textarea></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button size="mini" plain @click="taskDetailDialogVisible = false">取消</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import {
  listTaskTypes,
  updateTaskByManager,
  updateTaskByDeveloper,
  insertTask,
  listAllTasksByProjectId,
  listAllTasksByProjectIdAndExecutor
} from '@/api/task'
export default {
  data() {
    return {
      tasks: [],
      pendingTasks: [],
      overTimeTasks: [],
      completedTasks: [],
      taskDetail: {},
      project: {},
      userInfo: {},
      taskDetailDialogVisible: false
    }
  },
  methods: {
    taskDetailClick(index, row) {
      this.taskDetail = {
        ...row
      };
      this.$router.push({
        path: '/task-detail',
        name: 'TaskDetail',
        params: {
          taskDetail: row
        }
      })
    },
    taskReceiveClick(index, row) {
      let submitData = {
        ...row
      }
      submitData.status = -1
      updateTaskByDeveloper(submitData).then(response => {
        this.$message({
          message: response,
          type: 'success'
        })
        this.init()
      })
    },
    overTimeTasksClick(index, item) {
      this.taskDetailDialogVisible = true
      this.taskDetail = item
    },
    completedTasksClick(index, item) {
      this.taskDetailDialogVisible = true
      this.taskDetail = item
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
    overTime(deadline) {
      if ((new Date().getTime() - new Date(deadline.replace('/-/g', '/')).getTime()) >= 0) {
        return false;
      }
      return true;
    },
    init() {

      console.log(this.$route.params.project)

      this.userInfo = this.$store.getters.getUserInfo

      let tPro = this.$store.getters.getProjectDetails

      if (tPro === undefined) {
        this.$router.push({
          path: '/my-home'
        });
      } else {
        this.project = tPro;
      }

      listAllTasksByProjectIdAndExecutor(this.project.id, this.userInfo.id).then(response => {
        this.tasks = response.content.filter(item => {
          return item.status === -1 && this.overTime(item.deadline)
        })
        this.pendingTasks = response.content.filter(item => {
          return item.status === 0 && this.overTime(item.deadline)
        })
        this.overTimeTasks = response.content.filter(item => {
          return item.status !== 1 && !this.overTime(item.deadline)
        })
        this.completedTasks = response.content.filter(item => {
          return item.status === 1
        })
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
  border-color: #a0a0a0;
  border-radius: 1px;
  background: #474949;
}

.markdown-body>>>code {
  font-size: 14px;

}

.markdown-body {
  margin: 0 auto;
}
</style>
