<template>
  <div class="user-info">
    <el-card>{{userInfo}}</el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
     userInfo: null
    }
  },
  methods: {
    init() {
      this.userInfo = this.$store.getters.getUserInfo
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped lang="scss">
.user-info {
  margin-top: 55px;
}
</style>
