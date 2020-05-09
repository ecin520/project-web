<template>
<div class="not-found">
  <p class="msg">
    页面不存在<br />{{ time }}s<br />后跳转至<a class="to-home" @click="toHome">首页</a>
  </p>
</div>
</template>

<script>
export default {
  data() {
    return {
      time: 5,
      timer: null
    };
  },
  methods: {
    toHome() {
      this.$router.push({
        path: "/"
      });
    }
  },
  created() {
    let that = this;
    that.time = 5;
    this.timer = setInterval(() => {
      that.time -= 1;
      if (that.time === 0) {
        that.$router.push({
          path: "/"
        });
      }
    }, 1000);
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="scss">
.not-found {
  .msg {
    color: cornflowerblue;
    font-size: 3em;
    text-align: center;
    margin-top: 20%;
  }

  .to-home:hover {
    cursor: pointer;
  }

  .to-home {
    color: rgb(221, 136, 136);
  }
}
</style>
