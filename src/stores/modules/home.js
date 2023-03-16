import { defineStore } from "pinia";
import {getHomeHotSuggests} from '@/services/modules/home'

const useHomeStore = defineStore("home",{
    state:() =>({
        hotSuggests:[]
    }),
    actions:{
        async fetchHomeHotSuggests() {
            const res =await getHomeHotSuggests()
            this.hotSuggests = res.data
        }
    }
})

export default useHomeStore