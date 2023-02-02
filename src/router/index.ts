import { createRouter, createWebHistory } from 'vue-router'
import 主页 from '@页面/主页.vue';
import 第01页 from '../views/第1页.vue';
import 第02页 from '../views/第2页.vue';
import 第03页 from '../views/第3页.vue';
import 第04页 from '../views/第4页.vue';
import 第05页 from '../views/第5页.vue';
import 第06页 from '../views/第6页.vue';
import 第07页 from '../views/第7页.vue';
import 第08页 from '../views/第8页.vue';
import 第09页 from '../views/第9页.vue';
import 第10页 from '../views/第10页.vue';
import 第11页 from '../views/第11页.vue';
import 默认页 from '../views/默认页.vue';
import 登录页 from '../views/登录页.vue';
import { pinia数据中心 } from '../stores/pinia数据';




let 主页子菜单 = [
    { path: 'mr',  components: { 内容: 默认页 },  },
    { path: '01',  components: { 内容: 第01页 },  },
    { path: '02',  components: { 内容: 第02页 },  },
    { path: '03',  components: { 内容: 第03页 },  },
    { path: '04',  components: { 内容: 第04页 },  },
    { path: '05',  components: { 内容: 第05页 },  },
    { path: '06',  components: { 内容: 第06页 },  },
    { path: '07',  components: { 内容: 第07页 },  },
    { path: '08',  components: { 内容: 第08页 },  },
    { path: '09',  components: { 内容: 第09页 },  },
    { path: '10',  components: { 内容: 第10页 },  },
    { path: '11',  components: { 内容: 第11页 },  },
]

const router = createRouter({

    history: createWebHistory(),
    routes: [
        { path: '/', components: { 主页: 主页 }, children: 主页子菜单 },
        { path: '/login', name: 'login', components: { 主页: 登录页 },  },

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
