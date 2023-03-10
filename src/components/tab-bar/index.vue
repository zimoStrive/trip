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
import { useRouter } from "vue-router";
import tabbarData from "@/assets/data/tabbar";
import { getAssetURL } from "@/utils/load_assets";

import { ref } from "vue";

const currentIndex = ref(0);
const router = useRouter();

</script>

<style lang="less" scoped>


img{
    height: 28px;
}
</style>
