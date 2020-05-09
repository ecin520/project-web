<template>
<div class="project-detail">
  <el-row :gutter="10">
    <el-col :sm="8" :md="8" :lg="6" :xl="8">
      <el-card>
        <span class="global-title text-center" slot="header">{{
                project.name
              }}</span>
        <el-image style="line-height: 250px" class="project-detail-image" :src="project.image" fit="fit"></el-image>
        <!-- <el-progress style="margin: 30px" :text-inside="true" :stroke-width="24" :percentage="projectProgress" :format="format" status="success"></el-progress> -->
        <el-button type="danger" style="width: 100%;margin-bottom: 30px" size="medium" @click="deleteProject">删除项目</el-button><br>
        <el-button plain style="width: 100%;margin-bottom: 30px" size="medium" @click="modifyProjectInfo">修改项目信息</el-button>
      </el-card>
    </el-col>
    <el-col :sm="16" :md="16" :lg="18" :xl="16">
      <div>
        <el-card>
          <el-divider content-position="center">
            <p class="global-title">管理成员</p>
          </el-divider>
          <span @click="selectManagerClick(item)" class="manager-list" v-for="(item, index) in projectManagers" :key="index">
            <el-avatar class="pointer" :src="item.avatar"></el-avatar>
          </span>
          <span @click="showAddManagerClick" class="manager-list">
            <el-avatar class="el-icon-plus pointer"></el-avatar>
          </span>

          <el-divider content-position="center">
            <p class="global-title">工作成员</p>
          </el-divider>
          <span @click="selectManagerClick(item)" class="manager-list" v-for="(item, index) in projectDevelopers" :key="index">
            <el-avatar class="pointer" :src="item.avatar"></el-avatar>
          </span>
          <span @click="showAddDeveloperClick" class="manager-list">
            <el-avatar class="el-icon-plus pointer"></el-avatar>
          </span>

          <el-divider content-position="center">
            <p class="global-title">项目简介</p>
          </el-divider>
          <span>{{project.explanation}}</span>
        </el-card>
      </div>
    </el-col>
  </el-row>

  <el-dialog width="650px" title="项目信息修改" :visible.sync="projectDialogVisible">
    <el-form size="small" :inline="true" label-width="90px" label-position="right" :model="projectSubmit">
      <el-form-item label="ID">
        <el-input disabled="true" v-model="projectSubmit.id"></el-input>
      </el-form-item>
      <el-form-item label="项目创建者">
        <el-input disabled="true" v-model="projectSubmit.creater"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="projectSubmit.name"></el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select style="width: 195px" v-model="projectSubmit.type" placeholder="请选择">
          <el-option v-for="(item, index) in typeOptions" :key="index" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目状态">
        <el-select style="width: 195px" v-model="projectSubmit.status" placeholder="请选择">
          <el-option v-for="(item, index) in statusOptions" :key="index" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input disabled="true" v-model="projectSubmit.createTime"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input style="width: 500px;" type="textarea" v-model="projectSubmit.explanation"></el-input>
      </el-form-item>
      <el-form-item label="展示图片">
        <el-card v-loading="uploadLoading" style="width: 500px;">
          <el-upload action :limit="1" :http-request="fileUpload" :auto-upload="true" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-input style="margin-top: 15px" v-model="projectSubmit.image"></el-input>
        </el-card>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button size="mini" plain @click="projectDialogVisible = false">取消</el-button>
      <el-button size="mini" type="danger" @click="submitProjectInfo">修改</el-button>
    </div>
  </el-dialog>

  <el-dialog width="450px" :show-close="false" :visible.sync="managerDialogVisible">
    <el-input style="margin-bottom: 10px" v-model="otherSideId" placeholder="对方ID">
      <el-button @click="searchMateClick" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-card v-if="invitedUser.id !== ''">
      <span slot="header">
        <el-avatar :src="invitedUser.avatar"></el-avatar>
        <span style="position: absolute;font-size: 1.5em;margin: 7px 15px;">{{invitedUser.username}}（id:{{invitedUser.id}}）</span>
      </span>
      <p>邮箱：{{invitedUser.email}}</p>
      <p>昵称：{{invitedUser.nickname}}</p>
      <p>注释：{{invitedUser.note}}</p>
    </el-card>
    <el-input style="margin-top: 10px" v-if="invitedUser.id !== ''" v-model="verificationContent" placeholder="请输入验证内容"></el-input>
    <div slot="footer">
      <el-button size="small" plain @click="managerDialogVisible = false">取消</el-button>
      <el-button size="small" type="success" @click="invitedUserClick">邀请</el-button>
    </div>
  </el-dialog>

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
  listProjectTypes,
  insertProjectVerification,
  updateProject,
  deleteProjectById
} from '@/api/project'
import {
  listManagersByProjectId
} from '@/api/manager'
import {
  listDevelopersByProjectId
} from '@/api/developer'
import {
  getByUserId,
  getByUsername
} from '@/api/user'
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
      typeOptions: [],
      statusOptions: [
        "开发阶段",
        "暂停阶段",
        "完成阶段"
      ],
      invitedUser: {
        id: '',
        avatar: '',
        username: '',
        email: '',
        nickname: '',
        note: ''
      },
      projectSubmit: {
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
      userDetails: {},
      projectProgress: 1,
      projectDialogVisible: false,
      managerDialogVisible: false,
      userDetailsDialogVisible: false,
      otherSideId: null,
      userInfo: null,
      verificationContent: '',
      verificationType: '',
      uploadLoading: false
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
    deleteProject() {

      this.$confirm('此操作不可逆，是否继续', 'WARNING', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deleteProjectById(this.project.id).then(response => {
          console.log(response)
          if (response !== undefined) {
            this.$message({
              message: response,
              type: 'success'
            })
            this.$router.push({
              path: '/my-project'
            })
          }
        })
      }).catch(() => {

      });

    },
    modifyProjectInfo() {
      this.projectSubmit = {
        ...this.project
      }
      this.projectDialogVisible = true
    },
    submitProjectInfo() {
      updateProject(this.projectSubmit).then(response => {
        this.$store.dispatch("setProjectDetailsInfo", this.projectSubmit);
        this.project = this.$store.getters.getProjectDetails
        this.$message({
          message: response,
          type: 'success'
        })
        this.init()
        this.projectDialogVisible = false
      })
    },
    fileUpload(params) {

      this.uploadLoading = true

      let file = params.file,
        fileType = file.type,
        isImage = fileType.indexOf('image') != -1,
        isLt10M = file.size / 1024 / 1024 < 10;

      if (!isImage) {
        this.$message.error('请上传正确的图片格式');
        return;
      }
      if (!isLt10M) {
        this.$message.error('文件大小不能超过10M');
        return;
      }

      let formdata = new FormData();
      formdata.append('file', file);
      this.$axios({
        url: 'http://www.pytap.com:8081//fileUpload/imageUpload',
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.projectSubmit.image = response.data
        this.uploadLoading = false
      }).catch(error => {
        console.log(error)
        this.$message({
          message: '上传失败',
          type: 'error'
        })
        this.uploadLoading = false
      });
    },
    searchMateClick() {
      getByUserId(this.otherSideId).then(response => {
        this.invitedUser = response.content
      }).catch(error => {
        this.invitedUser = {
          id: '',
          avatar: '',
          username: '用户不存在',
          email: '用户不存在',
          nickname: '用户不存在',
          note: '用户不存在'
        }
      })
    },
    invitedUserClick() {
      if (this.invitedUser.id === '') {
        this.$message({
          message: '用户为空',
          type: 'error'
        })
      } else {
        let projectVerification = {
          sendId: this.userInfo.id,
          receiveId: this.invitedUser.id,
          projectId: this.project.id,
          content: this.verificationContent,
          type: this.verificationType
        }
        insertProjectVerification(projectVerification).then(response => {
          this.$message({
            message: response,
            type: 'success'
          })
          this.managerDialogVisible = false
        })
      }
    },
    showAddManagerClick() {
      this.verificationType = 'MANAGER_VERIFICATION'
      this.managerDialogVisible = true;
    },
    showAddDeveloperClick() {
      this.verificationType = 'DEVELOPER_VERIFICATION'
      this.managerDialogVisible = true;
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

      listProjectTypes().then(response => {
        this.typeOptions = response.content
      })

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
