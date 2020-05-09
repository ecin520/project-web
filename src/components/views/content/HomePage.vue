<template>
<div class="home-page">
  <el-row>
    <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 5, offset: 0 }" :md="{ span: 4, offset: 0 }">
      <el-menu style="text-align: center;" active-text-color="#303133" @select="selectHandle" class="home-page-menu">
        <el-menu-item class="menu-item" index="1"><i class="el-icon-house"></i>首页</el-menu-item>
        <el-menu-item class="menu-item" index="2"><i class="el-icon-s-management"></i>我的项目</el-menu-item>
        <el-menu-item class="menu-item" index="3"><i class="el-icon-edit-outline"></i>我的任务</el-menu-item>
        <el-menu-item class="menu-item" index="4"><i class="el-icon-document-checked"></i>工作空间</el-menu-item>
        <el-menu-item class="menu-item" index="5"><i class="el-icon-s-custom"></i>人脉</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 19, offset: 0 }" :md="{ span: 20, offset: 0 }">
      <div class="standard-pitch">
        <transition mode="out-in" name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    selectHandle(index) {
      switch (index) {
        case "1":
          this.$router.push({path: "/my-home"});
          break;
        case "2":
          this.$router.push({path: "/my-project"});
          break;
        case "3":
          this.$router.push({path: "/my-task"});
          break;
        case "4":
          this.$router.push({path: "/work-space"});
          break;
        case "5":
          this.$router.push({path: "/contact"});
          break;
        default:
          break;
      }
    }
  },
  created() {

  }
};
</script>

<style lang="scss">
.home-page {
  .home-page-menu {
    border: none;

    .menu-item {
      border: 0.5px solid rgb(230, 231, 238);
      background-color: white !important;
    }

    .menu-item:hover {
      background-color: rgb(202, 232, 243) !important;
    }
  }
}
</style>
