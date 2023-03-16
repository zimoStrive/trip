<template>
  <navBar/>

  <div class="banner">
    <img src="@/assets/img/home/banner.webp" alt="">
  </div>

  <!-- 定位 -->
  <searchBox/>
</template>

<script setup>
import navBar from './cpns/nav-bar.vue'
import searchBox from './cpns/search-box.vue'
</script>

<style lang="less" scoped>
.banner img{
  width: 100%;
}
</style>
