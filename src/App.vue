<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  margin: 0;
  border: 0;
}

body {
  /* overflow-y: auto; */
  padding-right: 0 !important
}

body::-webkit-scrollbar {
  width: 0px;
  height: 5px;
}

body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #b9b9b9;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
