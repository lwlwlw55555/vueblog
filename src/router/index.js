import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Blogs from '../views/Blogs.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogDetail from '../views/BlogDetail.vue'
import Leqee from '../views/lw/Leqee.vue'
import DateRange from '../views/lw/DateRange.vue'
import Form from '../views/lw/Form.vue'
import Form2 from '../views/lw/Form2.vue'
import TableEdit from '../views/lw/TableEdit.vue'
import DateFix from '../views/lw/DateFix.vue'
import Shop from '../views/lw/Shop.vue'
import LeqeeXxl from '../views/lw/LeqeeXxl.vue'
import DeControl from '../views/de/DeControl.vue'
import DeGiftIgnore from '../views/de/DeGiftIgnore.vue'
import DeUpload from '../views/de/DeUpload.vue'
import DeOrder from '../views/de/DeOrder.vue'
import DeShuadan from '../views/de/DeShuadan.vue'
import LwJson from '../views/lw/LwJson.vue'
import DpProps from '../views/dp/DpProps.vue'
import AddDomain from '../views/lw/AddDomain.vue'
import DeDanengIgnore from '../views/de/DeDanengIgnore.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: {name: "DeUpload"}
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/blog/add',
        name: 'BlogAdd',
        component: BlogEdit,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/blog/:blogId',
        name: 'BlogDetail',
        component: BlogDetail
    },
    {
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        component: BlogEdit,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/leqee',
        name: 'Leqee',
        component: Leqee
    },
    {
        path: '/dateRange',
        name: 'DateRange',
        component: DateRange
    },
    {
        path: '/form',
        name: 'Form',
        component: Form
    },
    {
        path: '/form2',
        name: 'Form2',
        component: Form2
    },
    {
        path: '/tableEdit',
        name: 'TableEdit',
        component: TableEdit
    },
    {
        path: '/dateFix',
        name: 'DateFix',
        component: DateFix
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop
    },
    {
        path: '/leqeeXxl',
        name: 'LeqeeXxl',
        component: LeqeeXxl
    },
    {
        path: '/de/deControl',
        name: 'DeControl',
        component: DeControl
    },
    {
        path: '/de',
        name: 'DeUpload',
        component: DeUpload
    },
    {
        path: '/gift',
        name: 'DeGiftIgnore',
        component: DeGiftIgnore
    },
    {
        path: '/order',
        name: 'DeOrder',
        component: DeOrder
    },
    {
        path: '/shuadan',
        name: 'DeShuadan',
        component: DeShuadan
    },
    {
        path: '/json',
        name: 'LwJson',
        component: LwJson
    },
    {
        path: '/dp',
        name: 'DpProps',
        component: DpProps
    },
    {
        path: '/de/deGiftIgnore',
        name: 'DeGiftIgnore',
        component: DeGiftIgnore
    },
    {
        path: '/daneng',
        name: 'DeDanengIgnore',
        component: DeDanengIgnore
    },
    {
        path: '/de/deDanengIgnore',
        name: 'DeDanengIgnore',
        component: DeDanengIgnore
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/web/',
    // base: process.env.BASE_URL,
    routes
})

export default router
