<template>
  <div class="content">
    <h2>热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <houseItemType3
          v-if="item.discoveryContentType === 3"
          :item-data="item.data"
        />
        <houseItemType9
          v-else-if="item.discoveryContentType === 9"
          :item-data="item.data"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import houseItemType3 from "@/components/house-item-type3/index.vue";
import houseItemType9 from "@/components/house-item-type9/index.vue";
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";

const homeStore = useHomeStore();
const { houseList } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
