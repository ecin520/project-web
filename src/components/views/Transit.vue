<template>
<div class="transit">
  <div class="transit-bar">
    <el-menu mode="horizontal">
      <i @click="drawOut" class="el-icon-s-grid transit-bar-drawer"></i>
      <span>TeamWork</span>
      <div class="transit-bar-item">
        <el-link icon="el-icon-s-home" :underline="false" type="primary" @click="goHomePageClick">主页</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-badge is-dot class="item" :hidden="letterBadge">
          <el-link @click="privateMessageClick" icon="el-icon-message" :underline="false" type="primary">私信</el-link>
        </el-badge>
        <el-divider direction="vertical"></el-divider>
        <el-badge is-dot class="item" :hidden="noticeBadge">
          <el-popover placement="bottom" width="500" trigger="click">
            <el-link slot="reference" icon="el-icon-chat-line-round" :underline="false" type="primary">通知</el-link>
            <el-table border style="overflow: auto;height: 350px" :data="projectVerification">
              <el-table-column align="center" width="80px" label="项目">
                <template slot-scope="scope">
                  <el-link type="primary">{{scope.row.projectId}}</el-link>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="内容" prop="content"></el-table-column>
              <el-table-column align="center" width="80px" label="类型">
                <template slot-scope="scope">
                  <el-tag type="primary">{{scope.row.type === 'MANAGER_VERIFICATION' ? '管理' : '开发'}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" width="152px" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="refuseInvite(scope.row)">拒绝</el-button>
                  <el-button type="success" size="mini" @click="receiveInvite(scope.row)">加入</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-popover>
        </el-badge>
        <!-- <el-input class="transit-bar-item-search" placeholder="请输入搜索内容"></el-input> -->
      </div>
      <el-dropdown class="transit-bar-avatar" trigger="click" @command="handleCommand">
        <el-avatar :src="userInfo.avatar"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <span style="display: block;text-align: center;color: #409EFF">{{userInfo.username}}</span>
          <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
  <div style="margin-top: 51px">
    <router-view></router-view>
  </div>
  <el-drawer :visible.sync="drawer" direction="ltr" size="300px" style="outline: none;" :with-header="false">
    <p style="text-align: center" class="global-title">管理项目</p>
    <el-divider></el-divider>
    <el-row>
      <div @click="projectDetailClick(item)" v-for="(item, index) in myManagementProject" :key="index">
        <el-col>
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
  </el-drawer>
</div>
</template>

<script>
import {
  listProjectVerificationsByReceiveId,
  updateProjectVerificationByDeveloper,
  updateProjectVerificationByManager
} from '@/api/project'
import {
  listProjectsByManagerId
} from "@/api/manager";
export default {
  data() {
    return {
      drawer: false,
      letterBadge: true,
      noticeBadge: null,
      userInfo: null,
      myManagementProject: [],
      projectVerification: [{
        id: null,
        receiveId: null,
        sendId: null,
        projectId: null,
        content: null,
      }]
    };
  },
  methods: {
    drawOut() {
      this.drawer = true;
    },
    privateMessageClick() {
      this.$message({
        message: '功能未开放',
        type: 'success'
      })
    },
    goHomePageClick() {
      this.$router.push({
        path: '/home-page'
      })
    },
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.$store.dispatch('logout')
          this.$router.push({
            path: '/login'
          })
          break;
        case 'userInfo':
          this.$router.push({
            path: '/user-info'
          })
          break;
      }
    },
    refuseInvite(row) {
      let submitData = {
        ...row
      }
      submitData.status = -1
      if (row.type === 'DEVELOPER_VERIFICATION') {
        updateProjectVerificationByDeveloper(submitData).then(response => {
          this.$message({
            message: response,
            type: 'success'
          })
          this.init()
        })
      } else if (row.type === 'MANAGER_VERIFICATION') {
        updateProjectVerificationByManager(submitData).then(response => {
          this.$message({
            message: response,
            type: 'success'
          })
          this.init()
        })
      }
    },
    projectDetailClick(item) {
      this.$store.dispatch("setProjectDetailsInfo", item);
      this.$router.push({ path: '/project-home', name: 'ProjectHome', params: {status: 1} });
    },
    receiveInvite(row) {
      let submitData = {
        ...row
      }
      submitData.status = 1
      if (row.type === 'DEVELOPER_VERIFICATION') {
        updateProjectVerificationByDeveloper(submitData).then(response => {
          this.$message({
            message: response,
            type: 'success'
          })
          this.init()
        })
      } else if (row.type === 'MANAGER_VERIFICATION') {
        updateProjectVerificationByManager(submitData).then(response => {
          this.$message({
            message: response,
            type: 'success'
          })
          this.init()
        })
      }
    },
    init() {
      this.userInfo = this.$store.getters.getUserInfo

      listProjectVerificationsByReceiveId(this.userInfo.id).then(response => {
        this.projectVerification = response.content
        this.noticeBadge = this.projectVerification.length > 0 ? false : true
      })

      listProjectsByManagerId(this.userInfo.id).then(response => {
        this.myManagementProject = response.content;
      });
    }
  },
  created() {
    this.init()
  }
};
</script>

<style lang="scss">
@media screen and (max-width: 720px) {
  .transit-bar-item-search {
    display: none;
  }
}

.transit {
  outline: none;

  .transit-bar {
    outline: none;
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;

    .transit-bar-drawer:hover {
      cursor: pointer;
    }

    .transit-bar-drawer {
      margin-left: 20px;
      line-height: 50px;
      color: gainsboro;
      outline: none;
    }

    .transit-bar-avatar:hover {
      cursor: pointer;
    }

    .transit-bar-avatar {
      float: right;
      margin: 5px;
      outline: none;
    }

    .transit-bar-item {
      margin-left: 50px;
      display: inline;
      outline: none;

      .transit-bar-item-search {
        margin-left: 30px;
        width: 30%;
        border-radius: 30px;
        outline: none;
      }
    }
  }
}
</style>
