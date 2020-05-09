<template>
<div class="my-home">
  <el-card>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="近期任务">
          <el-table :border="true" :show-header="false" :data="recentTask">
            <el-table-column align="center" width="150px" prop="name"></el-table-column>
            <el-table-column show-overflow-tooltip="true" prop="explanation"></el-table-column>
            <el-table-column align="center" width="85px">
              <template slot-scope="scope">
                <el-button @click="taskDetailClick(scope.$index, scope.row)" size="mini" type="success">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待认领任务">
          <el-table :border="true" :show-header="false" :data="toBeReceivedTask">
            <el-table-column align="center" width="150px" prop="name"></el-table-column>
            <el-table-column show-overflow-tooltip="true" prop="explanation"></el-table-column>
            <el-table-column align="center" width="85px">
              <template slot-scope="scope">
                <el-button @click="receiveTaskClick(scope.$index, scope.row)" size="mini" type="success">领取</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div><br>
    <el-card v-if="myDevelopmentProject.length > 0" style="margin-top: 10px">
      <p class="standard-pitch global-title">最近项目</p>
      <el-divider></el-divider>
      <el-row>
        <div @click="projectBrowseClick(item)" v-for="(item, index) in myDevelopmentProject" :key="index">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-card :style="
                item.image !== ''
                  ? { 'background-image': 'url(' + item.image + ')' }
                  : 'background-image: linear-gradient(rgb(129, 194, 218), deepskyblue)'
              " class="show-card standard-pitch">
              <span>{{ item.name }}</span><br />
              <span style="font-size: 0.8em">{{ item.explanation }}</span>
            </el-card>
          </el-col>
        </div>
      </el-row>
    </el-card>
  </el-card>
</div>
</template>

<script>
import {
  listProjectsByDeveloperId
} from '@/api/developer'
import {
  listAllTasksByUserId,
  updateTaskByDeveloper
} from '@/api/task'
export default {
  data() {
    return {
      project: [],
      myDevelopmentProject: [],
      recentTask: [],
      toBeReceivedTask: [],
      userInfo: null
    };
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
        this.init()
      })
    },
    projectBrowseClick(item) {
      this.$store.dispatch("setProjectDetailsInfo", item);
      this.$router.push({
        path: "/project-browse"
      });
    },
    overTime(deadline) {
      if ((new Date().getTime() - new Date(deadline.replace('/-/g', '/')).getTime()) >= 0) {
        return false;
      }
      return true;
    },
    init() {
      this.userInfo = this.$store.getters.getUserInfo;
      listProjectsByDeveloperId(this.userInfo.id).then(response => {
        this.myDevelopmentProject = response.content;
      });
      listAllTasksByUserId(this.userInfo.id).then(response => {
        this.recentTask = response.content.filter(item => {
          return item.status === -1 && this.overTime(item.deadline)
        })
        this.toBeReceivedTask = response.content.filter(item => {
          return item.status === 0 && this.overTime(item.deadline)
        })
      })
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss">
.my-home {
  .my-home-rencent-project {
    position: relative;
  }
}
</style>
