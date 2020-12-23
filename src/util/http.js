/*
 * Copyright 2014-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Axios from 'axios'
import router from '../router'
import {Loading} from 'element-ui'
// import base_64 from './base64'
let axiosIns = Axios.create({
    baseURL: process.env,
    timeout: 60 * 1000
})
// axiosIns.defaults.baseURL = 'http://127.0.0.1:8081';
axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
// axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';

axiosIns.defaults.responseType = 'json'
axiosIns.defaults.validateStatus = function() {
    return true
}
// http response interceptor
axiosIns.interceptors.response.use(
    response => {
        if (response.data && response.data.code === 302000) {
            router.push({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
        } else if (response.data && (response.data.code === 202052 || response.data.code === 202053)) {
            router.push({
                path: '/login'
            })
        } else {
            return response
        }
    },
    error => {
        // if (error.response) {
        //     switch (error.response.status) {
        //         case 401:
        //             store.commit(types.LOGOUT);
        //             router.replace({
        //                 path: 'login',
        //                 query: {redirect: router.currentRoute.fullPath}
        //             })
        //     }
        // }
        return Promise.reject(error)
    })

const addErrorLog = errorInfo => {
    const {statusText, status, request: {responseURL}} = errorInfo
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL
    }
    if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}
const startTips =
    '          .----.\n' +
    '       _.\'__    `.\n' +
    '   .--(O) (O)--/ #\\\n' +
    ' .\' @         / ###\\\n' +
    ' :   ·...·  ,  #####）\n' +
    '  `-..__.-\'_.- ### /\n' +
    '        `:_:   `..\n' +
    '      .\'"""""\'.\n' +
    '     //  start \\\\\n' +
    '     //  成功!  \\\\\n' +
    '    `-._______.-\'\n' +
    '    ___`. | .\'___\n' +
    '   (______|______)\n'
console.log(startTips)
class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                //
            }
        }
        return config
    }

    destroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
            Loading.service({}).close()
        }
    }
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                //Spin.show() // 不建议开启，因为界面不友好
                Loading.service({text:'Loading',spinner:'el-icon-loading',background:'rgba(0, 0, 0, 0.8)'})
            }
            let token = window.localStorage.getItem('token')
            this.queue[url] = true
            if (token) {
                config.headers.token = token
                return config
            }
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)
            const {data, status} = res
            if (res.data.code === 3001) {
                router.push({
                    path: '/login'
                })
                return ''
            }
            return {data, status}
        }, error => {
            this.destroy(url)
            if(error && error.response){
                error.message = error.response.data.message
                error.data = error.response.data
                return error
            }
            // addErrorLog(error.response)
            return Promise.reject(error)
        })
    }
    request(options) {
        // console.log(options)
        const instance = Axios.create()
        Axios.defaults.withCredentials = true //默认携带cookie
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default HttpRequest
/**post
 * @param options
 * @return {Promise}
 */
export function post(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options).then(response => {
            resolve(response)
        })
            .catch(error => {
                reject(error)
            })
    })
};
/**get
 * @param options
 * @return {Promise}
 */
export function get(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options).then(response => {
            resolve(response)
        })
            .catch(error => {
                reject(error)
            })
    })
};

/**patch
 * @param options
 * @return {Promise}
 */
export function patch(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options).then(response => {
            resolve(response)
        })
            .catch(error => {
                reject(error)
            })
    })
};
/**put
 * @param options
 * @return {Promise}
 */
export function put(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options).then(response => {
            resolve(response)
        })
            .catch(error => {
                reject(error)
            })
    })
};
/**delete
 * @param options
 * @return {Promise}
 */
export function deleted(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options).then(response => {
            resolve(response)
        })
            .catch(error => {
                reject(error)
            })
    })
};