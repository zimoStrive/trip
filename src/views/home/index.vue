<template>
  <navBar/>

  <div class="banner">
    <img src="@/assets/img/home/banner.webp" alt="">
  </div>

  <!-- 定位 -->
  <div class="location">
    <div class="city">广州</div>
    <div class="position">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">      
    </div>
  </div>
</template>

<script setup>
import navBar from './cpns/nav-bar.vue'
</script>

<style lang="less" scoped>
.banner img{
  width: 100%;
}

.location{
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .city{
    flex: 1;
  }

  .position{
    width: 78px;
    display: flex;
    align-items: center;

    .text{
      position: relative;
      top: 2px;
      font-size: 12px;

    }

    img{
      width: 18px;
      height: 18px;
      margin-left: 3px;
    }
  }
}
</style>
