<template>
  <div class="category">
    <template v-for="item in category" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <span class="text">{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import useHomeStore from "@/stores/modules/home";

const homeStore = useHomeStore();
const { category } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.category {
  display: flex;
  height: 80px;
  padding: 0 10px;
  margin-top: 8px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    width: 70px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    img {
      width: 32px;
      height: 32px;
    }
    .text{
        font-size: 12px;
        margin-top: 8px;
    }
  }
}
</style>
