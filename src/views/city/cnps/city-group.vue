<template>
  <van-index-bar highlight-color="#ff9854" :index-list="indexList">
    <!-- 热门城市 -->
    <van-index-anchor index="热门" />
    <div class="list">
      <template v-for="item in groupData.hotCities">
        <div class="city" @click="cityClick(item)">{{ item.cityName }}</div>
      </template>
    </div>
    <!-- 根据首字母排列 -->
    <template v-for="(item, index) in groupData.cities">
      <van-index-anchor :index="item.group" />
      <template v-for="item2 in item.cities">
        <van-cell :title="item2.cityName" @click="cityClick(item2)" />
      </template>
    </template>
  </van-index-bar>
</template>

<script setup>

import useCityStore from '@/stores/modules/city';
import {computed} from 'vue'
import { useRouter } from 'vue-router';

const props = defineProps({
  groupData: {
    type: Object,
    //每个组件都会得到一个新的对象作为默认值，而不是同一个共享对象
    default: () => ({}),
  },
});

//动态的索引
const indexList = computed(() =>{
    const list = props.groupData.cities.map(item => item.group)
    list.unshift('#')
    return list
})

//监听城市的点击
const router = useRouter()
const cityStore = useCityStore
const cityClick = (city)=>{
    // 城市信息保存在city的store
    cityStore.currentCity = city
    //返回首页
    router.back()
} 

</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>
