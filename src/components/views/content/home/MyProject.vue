<template>
<div class="my-project">
  <el-card>
    <p class="standard-pitch global-title">我管理的项目</p>
    <el-divider></el-divider>
    <el-row>
      <div @click="projectDetailClick(item)" v-for="(item, index) in myManagementProject" :key="index">
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
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <div @click="createProject">
          <el-card class="add-card standard-pitch">
            <p style="text-align: center;line-height: 80px">创建新项目</p>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-card>

  <el-card v-if="myDevelopmentProject.length > 0" style="margin-top: 10px">
    <p class="standard-pitch global-title">我工作的项目</p>
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

  <el-dialog width="650px" title="新建项目" :visible.sync="newProjectDialogVisible">
    <el-form size="small" :inline="true" label-width="90px" label-position="right" :modal="projectSubmit">
      <el-form-item label="项目名称">
        <el-input v-model="projectSubmit.name"></el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select style="width: 195px" v-model="projectSubmit.type" placeholder="请选择">
          <el-option v-for="(item, index) in typeOptions" :key="index" :value="item.name">
          </el-option>
        </el-select>
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
      <el-button size="mini" plain @click="newProjectDialogVisible = false">取消</el-button>
      <el-button size="mini" type="success" @click="newProjectConfirm">确定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  listUserProjects,
  insertProject,
  listProjectTypes
} from "@/api/project";
import {
  listProjectsByManagerId
} from "@/api/manager";
import {
  listProjectsByDeveloperId
} from "@/api/developer";
export default {
  data() {
    return {
      project: [],
      myManagementProject: [],
      myDevelopmentProject: [],
      newProjectDialogVisible: false,
      projectSubmit: {
        id: "",
        image: "",
        creater: "",
        name: "",
        type: "",
        status: "",
        createTime: "",
        explanation: ""
      },
      uploadLoading: false,
      typeOptions: [],
      userInfo: null
    };
  },
  methods: {
    projectDetailClick(item) {
      this.$store.dispatch("setProjectDetailsInfo", item);
      this.$router.push({path: "/project-home"});
    },
    projectBrowseClick(item) {
      this.$store.dispatch("setProjectDetailsInfo", item);
      this.$router.push({path: "/project-browse"});
    },
    createProject() {
      this.newProjectDialogVisible = true;
    },
    newProjectConfirm() {
      this.projectSubmit.creater = this.userInfo.id;
      insertProject(this.projectSubmit)
        .then(response => {
          this.$message({
            message: response.message,
            type: "success"
          });
          this.newProjectDialogVisible = false;
          this.init();
        })
        .catch(error => {
          console.log(error);
          this.newProjectDialogVisible = false;
        });
    },
    fileUpload(params) {
      this.uploadLoading = true;

      let file = params.file,
        fileType = file.type,
        isImage = fileType.indexOf("image") != -1,
        isLt10M = file.size / 1024 / 1024 < 10;

      if (!isImage) {
        this.$message.error("请上传正确的图片格式");
        return;
      }
      if (!isLt10M) {
        this.$message.error("文件大小不能超过10M");
        return;
      }

      let formdata = new FormData();
      formdata.append("file", file);
      this.$axios({
          url: "http://www.pytap.com:8081//fileUpload/imageUpload",
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
          this.projectSubmit.image = response.data;
          this.uploadLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "上传失败",
            type: "error"
          });
          this.uploadLoading = false;
        });
    },
    init() {
      this.userInfo = this.$store.getters.getUserInfo;
      // listUserProjects(this.userInfo.id).then(response => {
      //   this.project = response.content
      // })

      listProjectTypes().then(response => {
        this.typeOptions = response.content;
      });

      listProjectsByManagerId(this.userInfo.id).then(response => {
        this.myManagementProject = response.content;
      });

      listProjectsByDeveloperId(this.userInfo.id).then(response => {
        this.myDevelopmentProject = response.content;
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss"></style>
