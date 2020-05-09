<template>
<div class="project-detail">
  <el-row :gutter="10">
    <el-col :sm="8" :md="8" :lg="6" :xl="8">
      <el-card>
        <span class="global-title text-center" slot="header">{{
                project.name
              }}</span>
        <el-image style="line-height: 250px" class="project-detail-image" :src="project.image" fit="fit"></el-image>
        <el-progress style="margin: 30px" :text-inside="true" :stroke-width="24" :percentage="projectProgress" :format="format" status="success"></el-progress>
      </el-card>
    </el-col>
    <el-col :sm="16" :md="16" :lg="18" :xl="16">
      <div>
        <el-card>
          <el-divider content-position="center">
            <p class="global-title">项目管理员</p>
          </el-divider>
          <span style="line-height: 10px" @click="selectManagerClick(item)" class="manager-list" v-for="(item, index) in projectManagers" :key="index">
            <el-avatar class="pointer" :src="item.avatar"></el-avatar>
          </span>

          <el-divider content-position="center">
            <p class="global-title">项目工作成员</p>
          </el-divider>
          <span style="line-height: 10px" @click="selectManagerClick(item)" class="manager-list" v-for="(item, index) in projectDevelopers" :key="index">
            <el-avatar class="pointer" :src="item.avatar"></el-avatar>
          </span>

          <el-divider content-position="center">
            <p class="global-title">项目简介</p>
          </el-divider>
          <span>{{project.explanation}}</span>
        </el-card>
      </div>
    </el-col>
  </el-row>

  <el-dialog width="450px" :show-close="false" :visible.sync="userDetailsDialogVisible">
    <span slot="title">详情信息</span>
    <el-card v-if="userDetails.id !== ''">
      <span slot="header">
        <el-avatar :src="userDetails.avatar"></el-avatar>
        <span style="position: absolute;font-size: 1.5em;margin: 7px 15px;">{{userDetails.username}}（id:{{userDetails.id}}）</span>
      </span>
      <p>邮箱：{{userDetails.email}}</p>
      <p>昵称：{{userDetails.nickname}}</p>
      <p>注释：{{userDetails.note}}</p>
    </el-card>
  </el-dialog>

</div>
</template>

<script>
import {
  listManagersByProjectId
} from '@/api/manager'
import {
  listDevelopersByProjectId
} from '@/api/developer'
export default {
  data() {
    return {
      project: {
        id: '',
        image: '',
        creater: '',
        name: '',
        type: '',
        status: '',
        createTime: '',
        explanation: ''
      },
      projectManagers: [],
      projectDevelopers: [],
      projectProgress: 1,
      otherSideId: null,
      userInfo: null,
      userDetails: {
        id: '',
        avatar: '',
        email: '',
        nickname: '',
        note: ''
      },
      userDetailsDialogVisible: false
    }
  },
  methods: {
    format(percentage) {
      return "项目进度" + `${percentage}%`;
    },
    selectManagerClick(item) {
      this.userDetails = item
      this.userDetailsDialogVisible = true
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

      listManagersByProjectId(this.project.id).then(response => {
        this.projectManagers = response.content
      })

      listDevelopersByProjectId(this.project.id).then(response => {
        this.projectDevelopers = response.content
      })
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>
.project-detail-image {
  width: 100%;

}

.manager-list {
  margin: 3px;
}
</style>
