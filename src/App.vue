<script setup>
import tabBar from '@/components/tab-bar/index.vue'
import {useRoute} from 'vue-router'

const route = useRoute()
</script>

<template>
<div>
  <router-view></router-view>
  <!-- 第一种 做法 -->
  <tabBar v-if="!route.meta.hideTabbar"></tabBar> 
  <!-- <tabBar></tabBar> -->
</div>
</template>

<style scoped>

</style>
