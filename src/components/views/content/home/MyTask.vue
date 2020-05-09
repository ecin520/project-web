<template>
<div class="my-task">
  <el-card style="margin-bottom: 15px">
    <el-select @change="changeProject" v-model="currentProject" placeholder="请选择">
      <el-option v-for="(item, index) in myDevelopProject" :key="index" :value="item.id + ':' + item.name">
      </el-option>
    </el-select>
    <br><br>
    <el-tabs type="border-card">
      <el-tab-pane label="待领取任务">
        <el-table :border="true" :show-header="false" :data="toBeReceivedTasks">
          <el-table-column align="center" width="150px" prop="name"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="explanation"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="deadline"></el-table-column>
          <el-table-column align="center" width="85px">
            <template slot-scope="scope">
              <el-button @click="receiveTaskClick(scope.$index, scope.row)" size="mini" type="success">领取</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="待完成任务">
        <el-table :border="true" :show-header="false" :data="toBeCompletedTasks">
          <el-table-column align="center" width="150px" prop="name"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="explanation"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="deadline"></el-table-column>
          <el-table-column align="center" width="85px">
            <template slot-scope="scope">
              <el-button @click="taskDetailClick(scope.$index, scope.row)" size="mini" type="success">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>
  </el-card>
</div>
</template>

<script>
import {
  listProjectsByDeveloperId
} from '@/api/developer'
import {
  listAllTasksByProjectIdAndExecutor,
  updateTaskByDeveloper
} from '@/api/task'
export default {
  data() {
    return {
      userInfo: null,
      currentProject: null,
      projectOptinos: [],
      projectMap: null,
      myDevelopProject: [],
      tasks: [],
      toBeReceivedTasks: [],
      toBeCompletedTasks: []
    }
  },
  methods: {
    taskDetailClick(index, row) {
      this.$router.push({
        path: '/task-detail',
        name: 'TaskDetail',
        params: {
          taskDetail: row
        }
      })
    },
    receiveTaskClick(index, row) {
      let submitData = {
        ...row
      }
      submitData.status = -1
      updateTaskByDeveloper(submitData).then(response => {
        this.$message({
          message: response,
          type: 'success'
        })
        this.changeProject(this.currentProject)
      })
    },
    changeProject(value) {
      listAllTasksByProjectIdAndExecutor(this.projectMap.get(value), this.userInfo.id).then(response => {
        this.toBeReceivedTasks = response.content.filter(item => {
          return item.status === 0
        })
        this.toBeCompletedTasks = response.content.filter(item => {
          return item.status === -1
        })
      })
    },
    overTime(deadline) {
      if ((new Date().getTime() - new Date(deadline.replace('/-/g', '/')).getTime()) >= 0) {
        return false;
      }
      return true;
    },
    init() {
      this.userInfo = this.$store.getters.getUserInfo
      this.projectMap = new Map()
      listProjectsByDeveloperId(this.userInfo.id).then(response => {
        this.myDevelopProject = response.content
        this.myDevelopProject.forEach(element => {
          this.projectMap.set(element.id + ':' + element.name, element.id)
        });
        this.currentProject = this.myDevelopProject[0].id + ':' + this.myDevelopProject[0].name
        listAllTasksByProjectIdAndExecutor(this.myDevelopProject[0].id, this.userInfo.id).then(response => {
          this.toBeReceivedTasks = response.content.filter(item => {
            return item.status === 0 && this.overTime(item.deadline)
          })
          this.toBeCompletedTasks = response.content.filter(item => {
            return item.status === -1 && this.overTime(item.deadline)
          })
        })
      })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss"></style>
