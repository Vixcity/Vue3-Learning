<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent, onMounted, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    // const { proxy } = getCurrentInstance(); // 获取当前组件示例

    // console.log(proxy.$ajax)

    // console.log("created");
    // onMounted(() => {
    //   console.log("onMounted");
    // });

    // 可以发请求
    // const res = proxy.$ajax.get('/')
    // console.log(res.data)
    return {
      // a: 1,
    };
  },
});
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
