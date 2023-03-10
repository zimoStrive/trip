<template>
  <div class="tabbar">
    <template v-for="(item, index) in tabbarData" :key="index">
      <div
        class="item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index,item.path)"
      >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" />
        <img v-else :src="getAssetURL(item.imageActive)" />
        <span>{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import tabbarData from "@/assets/data/tabbar";
import { getAssetURL } from "@/utils/load_assets";

import { ref } from "vue";

const currentIndex = ref(0);
const router = useRouter()

//点击tabbar激活样式和跳转路由
const itemClick = (index,path) => {
  currentIndex.value = index;
  router.push(path)
};
</script>

<style lang="less" scoped>
.tabbar {
  height: 50px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  border-top: solid 1px #f3f3f3;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & .active {
    color: var(--primary-color);
  }
  img {
    width: 36px;
  }
  span {
    font-size: 12px;
    margin-top: 2px;
  }
}
</style>
