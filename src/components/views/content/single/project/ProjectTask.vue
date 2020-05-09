<template>
<div class="project-task">
  <div style="display: flex;justify-content: center;margin: 20px;">
    <el-steps>
      <span class="info-circle"></span>
      <span style="line-height: 14px">待处理&nbsp;&nbsp;&nbsp;</span>
      <span class="warning-circle"></span>
      <span style="line-height: 14px">待处理&nbsp;&nbsp;&nbsp;</span>
      <span class="error-circle"></span>
      <span style="line-height: 14px">待处理&nbsp;&nbsp;&nbsp;</span>
      <span class="success-circle"></span>
      <span style="line-height: 14px">待处理&nbsp;&nbsp;&nbsp;</span>
    </el-steps>
  </div>

  <!-- <el-row> -->

  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
    <p style="text-align: center;font-weight: 1000;color: #909399;">
      待处理任务
    </p>
    <el-card class="standard-pitch">
      <el-timeline class="project-task-timeline">
        <div v-for="item in tasks" :key="item">
          <el-timeline-item v-if="item.status === 0 && overTime(item.deadline)" color="#909399" :timestamp="item.deadline">
            <span style="color: #909399" class="pointer" @click="taskClick(item)">{{item.name}}</span>
          </el-timeline-item>
        </div>
        <el-button style="width: 100%" plain @click="addTaskClick">添加待办任务</el-button>
      </el-timeline>
    </el-card>
  </el-col>

  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
    <p style="text-align: center;font-weight: 1000;color: #E6A23C;">
      待完成任务
    </p>
    <el-card class="standard-pitch">
      <el-timeline class="project-task-timeline">
        <div v-for="item in tasks" :key="item">
          <el-timeline-item v-if="item.status === -1 && overTime(item.deadline)" color="#E6A23C" :timestamp="item.deadline">
            <span style="color: #E6A23C" class="pointer" @click="taskClick(item)">{{item.name}}</span>
          </el-timeline-item>
        </div>
      </el-timeline>
    </el-card>
  </el-col>

  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
    <p style="text-align: center;font-weight: 1000;color: #67C23A;">
      已完成任务
    </p>
    <el-card class="standard-pitch">
      <el-timeline class="project-task-timeline">
        <div v-for="item in tasks" :key="item">
          <el-timeline-item v-if="item.status === 1 && overTime(item.deadline)" color="#67C23A" :timestamp="item.deadline">
            <span style="color: #67C23A" class="pointer" @click="taskClick(item)">{{item.name}}</span>
          </el-timeline-item>
        </div>
      </el-timeline>
    </el-card>
  </el-col>

  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
    <p style="text-align: center;font-weight: 1000;color: #F56C6C;">
      未完成任务
    </p>
    <el-card class="standard-pitch">
      <el-timeline class="project-task-timeline">
        <div v-for="item in tasks" :key="item">
          <el-timeline-item v-if="!overTime(item.deadline)" color="#F56C6C" :timestamp="item.deadline">
            <span style="color: #F56C6C" class="pointer" @click="taskClick(item)">{{item.name}}</span>
          </el-timeline-item>
        </div>
      </el-timeline>
    </el-card>
  </el-col>

  <el-dialog top="7vh" width="650px" title="任务详情" :visible.sync="taskDetailDialogVisible">
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
        <el-select style="width: 195px" v-model="taskDetail.type" placeholder="请选择">
          <el-option v-for="(item, index) in typeOptions" :key="index" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input v-model="taskDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="优先级">
        <el-select style="width: 195px" v-model="taskDetail.priority" placeholder="请选择">
          <el-option v-for="(item, index) in priorityOptions" :key="index" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker style="width: 195px" v-model="taskDetail.startingTime" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker style="width: 195px" v-model="taskDetail.deadline" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input disabled="true" v-model="taskDetail.createTime"></el-input>
      </el-form-item>
      <el-form-item label="任务状态">
        <el-select style="width: 195px" v-model="taskDetail.status" placeholder="请选择">
          <el-option v-for="(item, index) in statusOptions" :key="index" :value="item"></el-option>
        </el-select>
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
          <el-button plain slot="reference">委派任务</el-button>
        </el-popover>
        <el-input disabled="true" style="width: 405px" v-model="taskDetail.executor"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input style="width: 495px" type="textarea" v-model="taskDetail.explanation" textarea></el-input>
      </el-form-item>
      <el-form-item label="提交内容">
        <el-input style="width: 495px" type="textarea" v-model="taskDetail.content" textarea></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button size="mini" plain @click="projectDialogVisible = false">取消</el-button>
      <el-button size="mini" type="danger" @click="deleteTaskDetail">删除</el-button>
      <el-button size="mini" type="success" @click="submitTaskDetail">修改</el-button>
    </div>
  </el-dialog>

  <el-dialog top="7vh" width="650px" title="添加待办任务" :visible.sync="addTaskDialogVisible">
    <el-form size="small" :inline="true" label-width="90px" label-position="right" :model="addTask">
      <el-form-item label="任务类型">
        <el-select style="width: 195px" v-model="addTask.type" placeholder="请选择">
          <el-option v-for="(item, index) in typeOptions" :key="index" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input v-model="addTask.name"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker style="width: 195px" v-model="addTask.startingTime" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker style="width: 195px" v-model="addTask.deadline" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="优先级">
        <el-select style="width: 195px" v-model="addTask.priority" placeholder="请选择">
          <el-option v-for="(item, index) in priorityOptions" :key="index" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务状态">
        <el-input disabled="true" v-model="addTask.status"></el-input>
      </el-form-item>
      <el-form-item label="任务执行者">
        <el-popover placement="right" width="600" trigger="click">
          <el-table style="height: 300px;overflow: auto;" :border="true" :show-header="false" :data="executors">
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
          <el-button plain slot="reference">委派任务</el-button>
        </el-popover>
        <el-input disabled="true" style="width: 405px" v-model="addTask.executor"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input style="width: 495px" type="textarea" v-model="addTask.explanation" textarea></el-input>
      </el-form-item>
      <el-form-item label="提交内容">
        <el-input style="width: 495px" type="textarea" v-model="addTask.content" textarea></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button size="mini" plain @click="addTaskDialogVisible = false">取消</el-button>
      <el-button size="mini" type="success" @click="submitAddTask">添加</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import {
  listTaskTypes,
  updateTaskByManager,
  insertTask,
  deleteTask,
  listAllTasksByProjectId
} from '@/api/task'
import {
  listDevelopersByProjectId
} from '@/api/developer'
export default {

  data() {
    return {
      tasks: [],
      taskDetail: {},
      project: {},
      userInfo: null,
      addTask: {
        id: null,
        projectId: null,
        executor: null,
        initiator: null,
        name: null,
        status: 0,
        type: null,
        explanation: null,
        startingTime: null,
        deadline: null,
        content: null,
        priority: null,
        createTime: null
      },
      taskDetailDialogVisible: false,
      addTaskDialogVisible: false,
      typeOptions: [],
      priorityOptions: [],
      priorityMap: null,
      statusOptions: [],
      statusMap: null,
      executors: []
    }
  },
  methods: {
    overTime(deadline) {
      if ((new Date().getTime() - new Date(deadline.replace('/-/g', '/')).getTime()) >= 0) {
        return false;
      }
      return true;
    },
    taskClick(item) {
      this.taskDetail = {
        ...item
      }
      this.taskDetail.priority = this.getPriorityByCode(this.taskDetail.priority)
      this.taskDetail.status = this.getStatusByCode(this.taskDetail.status)
      this.taskDetailDialogVisible = true;
    },
    submitTaskDetail() {
      let submitData = {
        ...this.taskDetail
      }
      submitData.priority = this.priorityMap.get(submitData.priority)
      submitData.status = this.statusMap.get(submitData.status)
      submitData.deadline = this.$moment(submitData.deadline).format("YYYY-MM-DD hh:mm:ss")
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
    getStatusByCode(key) {
      switch (key) {
        case -1:
          return '待完成';
        case 0:
          return '待处理';
        case 1:
          return '完成';
        case 2:
          return '提交';
      }
    },
    submitAddTask() {
      let submitData = {
        ...this.addTask
      }
      submitData.projectId = this.project.id
      submitData.initiator = this.userInfo.id
      submitData.priority = this.priorityMap.get(this.addTask.priority)
      submitData.startingTime = this.$moment(this.addTask.startingTime).format("YYYY-MM-DD hh:mm:ss")
      submitData.deadline = this.$moment(this.addTask.deadline).format("YYYY-MM-DD hh:mm:ss")
      insertTask(submitData).then(response => {
        this.$message({
          message: response,
          type: 'success'
        })
        this.addTaskDialogVisible = false
        this.addTask = {
          id: null,
          projectId: null,
          executor: null,
          initiator: null,
          name: null,
          status: 0,
          type: null,
          explanation: null,
          startingTime: null,
          deadline: null,
          content: null,
          priority: null,
          createTime: null
        }

        this.init()
      })

    },
    deleteTaskDetail() {
      deleteTask(this.taskDetail.id, this.project.id).then(response => {
        this.$message({message: response, type: 'success'})
        this.taskDetailDialogVisible = false
        this.init()
      })
    },
    addTaskClick() {
      this.addTaskDialogVisible = true
    },
    addExecutorClick(index, row) {
      this.$message({
        message: '添加' + row.id + '成功',
        type: 'success'
      })
      this.addTask.executor = row.id
    },
    init() {

      this.priorityOptions = ['普通', '警告', '紧急']

      this.priorityMap = new Map()
      this.priorityMap.set('普通', 0)
      this.priorityMap.set('警告', 1)
      this.priorityMap.set('紧急', 2)

      this.statusOptions = ['待处理', '待完成', '提交', '完成']

      this.statusMap = new Map()
      this.statusMap.set('待处理', 0)
      this.statusMap.set('待完成', -1)
      this.statusMap.set('提交', 2)
      this.statusMap.set('完成', 1)

      this.userInfo = this.$store.getters.getUserInfo

      let tPro = this.$store.getters.getProjectDetails

      if (tPro === undefined) {
        this.$router.push({
          path: '/my-home'
        });
      } else {
        this.project = tPro;
      }

      listTaskTypes().then(response => {
        this.typeOptions = response.content
      })

      listDevelopersByProjectId(this.project.id).then(response => {
        this.executors = response.content
      })

      listAllTasksByProjectId(this.project.id).then(response => {
        this.tasks = response.content
      })
    }
  },
  created() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
.project-task {
  .project-task-timeline {
    font-size: 1.2em;
    padding: 0;
  }
}
</style>
