import request from '../request'

//热门城市
export function getHomeHotSuggests() {
  return request.get({ 
    url: "/home/hotSuggests" 
  })
}

// 分类
export function getHomeCategories() {
  return request.get({
    url: "/home/categories"
  })
}

// 房子列表
export function getHomeHouselist(currentPage) {
  return request.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}
