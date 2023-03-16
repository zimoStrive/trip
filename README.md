# trip 一些难点

1. tabbar 1.0 是手搭建 ，2.0 是组件库搭建

2. 有些页面不显示 tabbar(两种做法)
   1. 利用路由 meta 控制，在 app 组件获取 route 信息判断即可
   2. 在不需要展示的页面下添加样式 (city 组件演示，该项目采用 meta)
      ```css
      .city {
        position: relative;
        z-index: 9;
        height: 100vh;
        overflow-y: auto;
        background: #fff;
      }
      ```


