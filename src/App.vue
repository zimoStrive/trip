<script setup>
import tabBar from '@/components/tab-bar/index.vue'
import {useRoute} from 'vue-router'
import loading from '@/components/loading/index.vue'
const route = useRoute()
</script>

<template>
<div>
  <router-view v-slot="props">
    <KeepAlive incluce="home">
      <component :is="props.Component"></component>
    </KeepAlive>
  </router-view>

  <!-- 第一种 做法 -->
  <tabBar v-if="!route.meta.hideTabbar"></tabBar> 
  <!-- <tabBar></tabBar> -->

  <loading/>
  
</div>
</template>

<style scoped>

</style>
