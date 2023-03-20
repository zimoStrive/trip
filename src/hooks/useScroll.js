import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from 'lodash'

//第一种方式
/* export default function useScroll(reachBottomCB) {
    const scrollListenerHandler = function () {

        const clientHeight = document.documentElement.clientHeight
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop

        if (clientHeight + scrollTop >= scrollHeight) {
            reachBottomCB()
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', scrollListenerHandler)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', scrollListenerHandler)
    })
}  */

//第二种方式
export default function useScroll() {
    const isReachBottom = ref(false)
    const scrollTop = ref(0)
    const clientHeight = ref(0)
    const scrollHeight = ref(0)

    const scrollListenerHandler = throttle(function () {

        clientHeight.value = document.documentElement.clientHeight
        scrollHeight.value = document.documentElement.scrollHeight
        scrollTop.value = document.documentElement.scrollTop
        //console.log("节流~~~~")
        if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
            //console.log('滚动到底部了')
            isReachBottom.value = true
        }
    }, 200)

    onMounted(() => {
        window.addEventListener('scroll', scrollListenerHandler)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', scrollListenerHandler)
    })

    return { isReachBottom, scrollTop }
} 