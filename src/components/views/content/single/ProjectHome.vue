<template>
<div class="project-home">
  <el-tabs @tab-click="tabClick" style="box-shadow: none" type="border-card">
    <el-tab-pane label="项目详情">
      <project-detail ref="child0" :project="project"></project-detail>
    </el-tab-pane>
    <el-tab-pane label="任务">
      <project-task ref="child1"></project-task>
    </el-tab-pane>
    <el-tab-pane label="任务提交队列">
      <task-submit-queue ref="child2"></task-submit-queue>
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
import {
  listTaskTypes,
  updateTaskByManager,
  insertTask,
  listAllTasksByProjectId
} from '@/api/task'
import ProjectDetail from '@/components/views/content/single/project/ProjectDetail'
import ProjectTask from '@/components/views/content/single/project/ProjectTask'
import ProjectChat from '@/components/views/content/single/project/ProjectChat'
import ProjectFile from '@/components/views/content/single/project/ProjectFile'
import ProjectDynamic from '@/components/views/content/single/project/ProjectDynamic'
import TaskSubmitQueue from '@/components/views/content/single/project/TaskSubmitQueue'
export default {
  components: {
    ProjectDetail,
    ProjectTask,
    ProjectChat,
    ProjectFile,
    ProjectDynamic,
    TaskSubmitQueue
  },
  data() {
    return {
      
    };
  },
  methods: {
    tabClick(tab) {
      switch (tab.index) {
        case '0':
          this.$refs.child0.init()
          break;
        case '1':
          this.$refs.child1.init()
          break;
        case '2':
          this.$refs.child2.init()
          break;
        default:
          break;
      }
    }
  },
  created() {
    // if (this.$route.params.status === 1) {
    //   this.$refs.child0.init()
    // }
  }
};
</script>

<style lang="scss" scoped>
.project-home {
  margin: 55px 0;
}
</style>
