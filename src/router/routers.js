import Vue from 'vue'
import Router from 'vue-router'
import {router} from '@/router/index'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
const hostManage = resolve => require(['@/views/hostManage/hostManage'], resolve)

// 静态路由
export let initMenu=[
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/views/login/login'], resolve),
    },
    {
        path: '/homePage',
        name: 'hostManage',
        // redirect: '/hostManage',
        leaf: true,
        nameKey: 'dataOverviewMian',
        menuShow: true,
        iconCls: 'im-icon-gailan sidebar-icon',
        component: hostManage,
        // children: [
        //     {
        //         path: '/hostManage', component: hostManage, name: '通道浏览', nameKey: 'dataOverview', menuShow: true, meta: {requireAuth: true}
        //     }
        // ]
    },
]
//动态配置路由
export let menu=[
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/views/login/login'], resolve),
    },
    {
        path: '/main',
        name: 'main',
        redirect: '/hostManage',
        leaf: true,
        nameKey: 'dataOverviewMian',
        menuShow: true,
        iconCls: 'im-icon-gailan sidebar-icon',
        component: hostManage,
    },
]
export let menuList = []
export const setMenuTree = function (menuTree) {
    var list = []
    menuTree.map(el=>{
        list.push(el.menuPath)
        // list.push(el)
    })
    console.log(list)
    menuList= hanleFor(menu,list)
    return menuList
}
     
const hanleFor = function (rMap,r){
    return rMap.filter( (item,index) =>{
        if(r.includes(item.nameKey)){
            if(item.children) item.children = hanleFor(item.children,r)
            return true
        }else{
            return false
        }
    })
}
export const routers = {
    router: initMenu
}