<!--
 * @author: SumO
 * @create: 2022-04-07 19:28 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-04-09 22:26 PM
 * @desc:
-->
<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import request from '@/utils/request'

export default Vue.extend({
  name: 'App'
})
</script>
<style lang="scss" scoped>
 .title {
  color:$success-color;
}
</style>
