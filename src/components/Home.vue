<template>
  <div class="home">
    <el-button type="success" @click="toLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  methods: {
    toLogin() {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>
</style>
