<template>
<div>
  {{message}}
  {{messageObj}}
</div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
let message = reactive([])
let messageObj = reactive({name:'wx'})
</script>

<style scoped>

</style>