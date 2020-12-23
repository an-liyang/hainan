import HttpRequest from './http'
// import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? '/platform' :'/platform'
// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.1.151:20000/platform' :'http://192.168.1.228:20000/platform'
// console.log(baseUrl)
const axios = new HttpRequest(baseUrl)
export default axios