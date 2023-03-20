<template>
  <div class="home">
    <navBar />

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>

    <!-- 定位 -->
    <searchBox />

    <!-- 分类 -->
    <category />
    <!-- 搜索条 -->
    <div class="search-bar" v-if="showSearch">
      <searchBar />
    </div>
    <!-- 内容区域 -->
    <content />

    <!-- <button @click="add">加载更多</button> -->
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import navBar from "./cpns/nav-bar.vue";
import searchBox from "./cpns/search-box.vue";
import category from "./cpns/category.vue";
import content from "./cpns/content.vue";
import searchBar from "@/components/search-bar/index.vue";
import useScroll from "@/hooks/useScroll";
import { watch, ref, computed } from "vue";

const homeStore = useHomeStore();
homeStore.fetchHomeHotSuggests();
homeStore.fetchHomeCategories();
homeStore.fetchHomeHouseList();

/* const add = ()=>{
  homeStore.fetchHomeHouseList()
} */

/*
监听window窗口的滚动（hooks）
1.当我们离开页面时, 我们移除监听
2.如果别的页面也进行类似的监听, 会编写重复代码
*/

// 第一种方法
/* useScroll(() =>{
  homeStore.fetchHomeHouseList();
}) */

//第二种方式
const { isReachBottom, scrollTop } = useScroll();
watch(isReachBottom, (newvalue) => {
  if (newvalue) {
    homeStore.fetchHomeHouseList().then(() => {
      isReachBottom.value = false;
    });
  }
});

//控制搜索框显示
// 第一种做法
/* const showSearch = ref(false);
watch(scrollTop, (newVal) => {
  showSearch.value = newVal > 200;
}); */

// 第二种做法
// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
const showSearch = computed(() => {
  return scrollTop.value > 360;
});
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
}
.banner img {
  width: 100%;
}
.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
