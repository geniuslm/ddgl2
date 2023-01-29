import { createRouter, createWebHistory } from 'vue-router'
import 主页 from '@页面/主页.vue';
import 第1页 from '../views/第1页.vue';
import 第2页 from '../views/第2页.vue';
import 第3页 from '../views/第3页.vue';
import 第4页 from '../views/第4页.vue';
import 第5页 from '../views/第5页.vue';
import 第6页 from '../views/第6页.vue';
import 第7页 from '../views/第7页.vue';
import 第8页 from '../views/第8页.vue';
import 第9页 from '../views/第9页.vue';
import 第10页 from '../views/第10页.vue';
import 第11页 from '../views/第11页.vue';
import 默认页 from '../views/默认页.vue';
import 登录页 from '../views/登录页.vue';
import { pinia数据中心 } from '../stores/pinia数据';




const User = {
    template: `
      <div>
        <router-view></router-view>
      </div>
    `,
}


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            components: { 主页: 主页 },
            children: [

                {
                    path: 'mr',
                    name: '默认页',
                    components: { 内容: 默认页 },
                    props: true
                },
                {
                    path: '1',
                    name: '第1页',
                    components: { 内容: 第1页 },
                    props: true
                },
                {
                    path: '2',
                    name: '第2页',
                    components: { 内容: 第2页 },
                    props: true
                },
                {
                    path: '3',
                    name: '第3页',
                    components: { 内容: 第3页 },
                    props: true
                },
                {
                    path: '4',
                    name: '第4页',
                    components: { 内容: 第4页 },
                    props: true
                },
                {
                    path: '5',
                    name: '第5页',
                    components: { 内容: 第5页 },
                    props: true
                },
                {
                    path: '6',
                    name: '第6页',
                    components: { 内容: 第6页 },
                    props: true
                },
                {
                    path: '7',
                    name: '第7页',
                    components: { 内容: 第7页 },
                    props: true
                },

                {
                    path: '8',
                    name: '第8页',
                    components: { 内容: 第8页 },
                    props: true
                },

                {
                    path: '9',
                    name: '第9页',
                    components: { 内容: 第9页 },
                    props: true
                },
                {
                    path: '10',
                    name: '第10页',
                    components: { 内容: 第10页 },
                    props: true
                },
                {
                    path: '11',
                    name: '第11页',
                    components: { 内容: 第11页 },
                    props: true
                },
            ],
        },

        {
            path: '/login',
            name: 'login',
            components: { 主页: 登录页 },
            props: true
        },

    ]
})

//路由守卫
router.beforeEach((to, from, next) => {
    let pinia = pinia数据中心()
    let token = String(localStorage.getItem('token'))
    let 当前登录用户 = String(localStorage.getItem('当前登录用户'))
    if (当前登录用户 != 'null') {
        pinia.当前登录用户 = String(localStorage.getItem('当前登录用户'))
    }
    if ((token == '通过' && pinia.当前登录用户 != "") || to.path == '/login') {
        next();
    } else {
        next('/login');
    }
})








export default router
