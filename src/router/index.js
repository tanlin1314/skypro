import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import { Token } from '@/api/apis.js'

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/Index',
            name: 'Index',
            component: () =>
                import ('../views/Index.vue'),
            children: [
                // 后台首页  默认首页/index/homePage.vue
                {
                    path: '/index/homePage',
                    name: '/index/homePage',
                    component: () =>
                        import ('../views/homePage.vue'),
                    meta: ["super", "normal"]
                },
                // 新增商品
                {
                    path: '/Index/goods_add',
                    component: () =>
                        import ('../views/goods_add.vue'),
                    meta: ["super"]
                },
                // 订单管理
                {
                    path: '/Index/management',
                    component: () =>
                        import ('../views/management.vue'),
                    meta: ["super"]
                },
                // 商品列表
                {
                    path: '/Index/ProductList',
                    component: () =>
                        import ('../views/ProductList.vue'),
                    meta: ["super", "normal"]
                },
                // 商品分类
                {
                    path: '/Index/Categories',
                    component: () =>
                        import ('../views/Categories.vue'),
                    meta: ["super", "normal"]
                },
                // 店铺管理
                {
                    path: '/Index/Order',
                    component: () =>
                        import ('../views/Order.vue'),
                    meta: ["super", "normal"]
                },
                // 账户列表
                {
                    path: '/Index/AccountList',
                    component: () =>
                        import ('../views/AccountList.vue'),
                    meta: ["super"]
                },
                // 添加账号
                {
                    path: '/Index/AddAccount',
                    component: () =>
                        import ('../views/AddAccount.vue'),
                    meta: ["super"]
                },
                // 修改密码
                {
                    path: '/Index/Password',
                    component: () =>
                        import ('../views/Password.vue'),
                    meta: ["super"]
                },
                // 商品统计
                {
                    path: '/Index/Commodity',
                    component: () =>
                        import ('../views/Commodity.vue'),
                    meta: ["super"]
                },
                // 订单统计
                {
                    path: '/Index/Statistics',
                    component: () =>
                        import ('../views/Statistics.vue'),
                    meta: ["super"]
                },
                // 个人中心
                {
                    path: '/Index/Personal',
                    component: () =>
                        import ('../views/Personal.vue'),
                    meta: ["super", "normal"]

                },
            ]
        },


    ]
})


// 添加路由前置守卫
router.beforeEach((to, from, next) => {
    //to: 即将要进入的目标 路由对象
    // from:当前导航正要离开的路由
    if (to.path != '/') {
        // 非登陆页面的请求   验证登陆
        Token(localStorage.token).then((res) => {
            console.log(res);
            if (res.data.code == 0) {
                next() //放行

                // 功能2：权限拦截
            } else {
                next('/')
            }

        })




    } else {
        next()
    }
})
export default router