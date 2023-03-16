<template>
  <div class="city">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        shape="round"
        show-action
        placeholder="城市/区域/位置"
        @cancel="cancelClick"
      />

      <!-- tab -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in citiesAll">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <template v-for="(value, key, index) in citiesAll">
        <cityGroup v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCityStore from "@/stores/modules/city";
import cityGroup from "./cnps/city-group.vue";

const router = useRouter();
const searchValue = ref();
const tabActive = ref();

//取消按钮的回调
const cancelClick = () => {
  router.back();
};

//获取store数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { citiesAll } = storeToRefs(cityStore);

const currentGroup = computed(() => citiesAll.value[tabActive.value]);
console.log(cityStore.citiesAll);
</script>

<style lang="less" scoped>
//隐藏tabbar
/* .city{
    position: relative;
    z-index: 9;
    height: 100vh;
    overflow-y: auto;
    background: #fff;
} */

.city {
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
    margin-bottom: 50px;
  }
}
</style>
