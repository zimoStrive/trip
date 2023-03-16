import { defineStore } from 'pinia'
import { getCityAll } from '@/services'

const useCityStore = defineStore("city", {
    state: () => ({
        citiesAll: {},
        currentCity: {
            cityName: "广州"
        }
    }),
    actions: {
        async fetchAllCitiesData() {
            const res = await getCityAll()
            this.citiesAll = res.data
        }
    }
})

export default useCityStore