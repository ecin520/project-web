<template>
<div class="project-home">
  <el-tabs style="box-shadow: none" type="border-card">
    <el-tab-pane label="项目详情">
      <project-browse-details></project-browse-details>
    </el-tab-pane>
    <el-tab-pane label="我的任务">
      <project-browse-task></project-browse-task>
    </el-tab-pane>
    <el-tab-pane label="群聊">
      <project-chat></project-chat>
    </el-tab-pane>
    <el-tab-pane label="文件">
      <project-file></project-file>
    </el-tab-pane>
    <el-tab-pane label="项目动态">
      <project-dynamic></project-dynamic>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import ProjectBrowseDetails from '@/components/views/content/single/project/ProjectBrowseDetails'
import ProjectBrowseTask from '@/components/views/content/single/project/ProjectBrowseTask'
export default {
  components: {
    ProjectBrowseDetails,
    ProjectBrowseTask
  },
  data() {
    return {

    };
  },
  methods: {

  },
  created() {

  }
};
</script>

<style lang="scss" scoped>
.project-home {
  margin: 55px 0;
}
</style>
