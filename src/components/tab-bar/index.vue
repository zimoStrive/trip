<template>
  <div class="tabbar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon="props">
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" />
            <img v-else :src="getAssetURL(item.imageActive)" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>


  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import tabbarData from "@/assets/data/tabbar";
import { getAssetURL } from "@/utils/load_assets";
import {watch,ref} from 'vue'

// 监听路由改变时, 找到对应的索引, 设置currentIndex
const currentIndex = ref(0);
const route = useRoute();
watch(route ,()=>{
  const index = tabbarData.findIndex(item => item.path === route.path)
  if(index === -1) return 
  currentIndex.value = index   
})

</script>

<style lang="less" scoped>


img{
    height: 28px;
}
</style>
