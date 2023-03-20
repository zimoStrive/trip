import { defineStore } from "pinia";
import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from '@/services/modules/home'

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        category: [],
        houseList: [],
        currentPage: 1
    }),
    actions: {
        async fetchHomeHotSuggests() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchHomeCategories() {
            const res = await getHomeCategories()
            this.category = res.data
        },
        async fetchHomeHouseList() {
            const res = await getHomeHouselist(this.currentPage)
            this.houseList.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore