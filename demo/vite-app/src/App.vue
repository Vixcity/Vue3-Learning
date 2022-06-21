<template>
  <input v-model="message" />
  {{ message }}
  <div :key="index" v-for="(item,index) in arr">{{ item }}</div>
</template>

<script setup lang="ts">
// 通过 ref 去把它包装成一个响应式的数据
import { ref,Ref,isRef,shallowRef,triggerRef,customRef } from 'vue';
const message = ref<string | number>('text')
// const messages:Ref<string> = ref('text')
const arr:Array<string> = ['a','b','c','d']
arr.splice(2,0,'ddd')
console.log(isRef(message),isRef(arr))

// 浅层响应式
const meaasgeObj = shallowRef({
  name:'wx',
})

// 可以强制更新 Ref 的内容
triggerRef(meaasgeObj)

// 同一个函数里面的 ref 的更新会导致 shallowRef 的更新
function myRef<T> (value:T){
  return customRef( (track, trigger) => {
    return {
      get(){
        track()
        return value
      },
      set(newVal:T){
        value = newVal
        trigger()
      }
    }
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
