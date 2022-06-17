<template>
  <div class="admin"></div>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    proxy.$ajax.get("/admin");

    return {};
  },
});
</script>

<style>
</style>