<!--
 * @author: SumO
 * @create: 2022-04-09 22:21 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-04-13 20:14 PM
 * @desc:
-->
<template>
  <div class="resource">
    <resource-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/List.vue'

export default Vue.extend({
  name: 'ResourceIndex',
  components: {
    ResourceList
  }
})
</script>

<style lang="scss" scoped></style>
