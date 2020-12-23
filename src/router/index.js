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
import Vue from 'vue'
import Router from 'vue-router'
import {findAuthByUserId} from '@/util/data'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
findAuthByUserId().then(res=>{
  
    if(res.data.code==200){
        console.log(res)
    }
})
const hostManage = resolve => require(['@/views/hostManage/hostManage'], resolve)

Vue.use(Router)
const routes = [
    {
        path: '/',
        // redirect: '/tongdao',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/views/login/login'], resolve),
    },
    {
        path: '/hostManage',
        name: 'main',
        component: hostManage,
    },
    
]
const router = new Router({
    routes
})
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g
    const isChunkLoadFailed = error.message.match(pattern)
    const targetPath = router.history.pending.fullPath
    if (isChunkLoadFailed) {
        router.go(0)
        router.replace(targetPath)
    }
})

export default router


// 动态路由 ，权限路由

// import Vue from 'vue'
// import Router from 'vue-router'
 
// import {routers, menuList, setMenuTree} from './routers'
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }


// Vue.use(Router)

// const router = new Router({
//     routes: routers.router
// })
 
// export var getMenuFuc = function (list) {
//     return setMenuTree(list)
// }
// if (localStorage.getItem('userId')) {
//     var list =getMenuFuc(JSON.parse(localStorage.getItem('menuTree')))
//     // console.log(list)
//     router.options.routes =routers.router.concat(list) 
//     router.addRoutes(list)
// }
 
// router.beforeEach((to, from, next) => {
//     if (!localStorage.getItem('userId') && to.name !== 'login') {
//         next('/login')
//     } else {
//         next()
//     }
// })
// router.onError((error) => {
//     const pattern = /Loading chunk (\d)+ failed/g
//     const isChunkLoadFailed = error.message.match(pattern)
//     const targetPath = router.history.pending.fullPath
//     if (isChunkLoadFailed) {
//         router.go(0)
//         router.replace(targetPath)
//     }
// })
// export default router