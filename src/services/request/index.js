import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

class Request {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    //添加请求拦截器
    this.instance.interceptors.request.use(config =>{
      mainStore.isLoading = true
      return config 
    },err =>{
      return err
    })

    //添加响应拦截器
    this.instance.interceptors.response.use(res =>{
      mainStore.isLoading = false
      return res
    }, err =>{
      mainStore.isLoading = false
      return err
    })
  }

  request(config) {
    //请求前开启loading（第一种方式）
    //mainStore.isLoading = true 
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        //请求成功关闭loading
        //mainStore.isLoading = false
        resolve(res.data)
      }).catch(err => {
        //mainStore.isLoading = false
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new Request(BASE_URL, TIMEOUT)


