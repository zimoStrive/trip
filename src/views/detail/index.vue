<template>
  <div class="detail" ref="detailRef">
    <!-- tab导航栏 -->
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />

    <van-nav-bar
      title="旅途"
      left-text="房屋详情"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 主要部分 -->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!-- 轮播图 -->
      <swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <!-- 信息部分 -->
      <detail-infos
        name="描述"
        :ref="getSectionRef"
        :top-infos="mainPart.topModule"
      />
      <!-- 房屋设施 -->
      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <!-- 房东介绍 -->
      <detail-landlord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <!-- 热门评论 -->
      <detail-comment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <!-- 预定须知 -->
      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <!-- 地图 -->
      <detail-map
        name="周边"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />
      <!-- 底部信息 -->
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <!-- 底部 -->
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">飞猪旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services/modules/detail";
import { ref, computed, watch } from "vue";

import tabControl from "@/components/tab-control/tab-control.vue";
import swipe from "./cpns/detail_01-swipe.vue";
import DetailInfos from "./cpns/detail_02-infos.vue";
import DetailFacility from "./cpns/detail_03-facility.vue";
import DetailLandlord from "./cpns/detail_04-landlord.vue";
import DetailComment from "./cpns/detail_05-comment.vue";
import DetailNotice from "./cpns/detail_06-notice.vue";
import DetailMap from "./cpns/detail_07-map.vue";
import DetailIntro from "./cpns/detail_08-intro.vue";
import useScroll from "@/hooks/useScroll";

const route = useRoute();
const router = useRouter();
const houseId = route.params.id;

//发起网络请求detail数据
const detailInfos = ref({});
const mainPart = computed(() => detailInfos.value.mainPart);
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});

//监听返回按钮的点击
const onClickLeft = () => {
  router.back();
};

// tabControl相关的操作
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => {
  //console.log(scrollTop.value);
  return scrollTop.value >= 300;
});

const sectionEls = ref({});
const names = computed(() => {
  return Object.keys(sectionEls.value);
});
const getSectionRef = (value) => {
  if(!value) return
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
};


let isClick = false
let currentDistance = -1
//tab触发的回调
const tabClick = (index) => {
  //Object.keys() 方法接收一个对象作为参数，返回该对象的键名组成的数组。
  const key = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[key];
  let distance = el.offsetTop;
  if (index !== 0) {
    distance = distance - 44;
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth", //开启平滑
  });
}; 

// 页面滚动, 滚动时匹配对应的tabControll的index
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return

  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)

  // 2.根据newValue去匹配想要索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  // console.log(index)
  tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="less" scoped>
.detail {
  height: 100vh;
  overflow-y: auto;
}
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
