import axios from './api.request'

// 请求基础方法
const ajaxFun = (url,data) => {
    return axios.request({
        url: url,
        data,
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    })
} 
const ajaxFunGet = (url,data) => {
    return axios.request({
        url: url,
        params:data,
        method: 'GET',
        headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}


/*平台权限管理*/
//查询某用户所有权限
export const findAuthByUserId = ()=>{
    return ajaxFunGet('/user/auth/findAuthByUserId')
}
/*获取基本配置*/
// 组织类型，节点状态，节点类型
export const config = ()=>{
    return ajaxFunGet('/common/config')
}

