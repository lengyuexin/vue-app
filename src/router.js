 import VueRouter from 'vue-router' //导入vue-router


import goods from './components/goods/Goods.vue'
import comments from './components/comments/Comments.vue'
import seller from './components/seller/Seller.vue'




//创建路由对象
var router = new VueRouter({
  routes: [
    //建立路由匹配规则
    { path: '/', redirect: '/goods' },
    { path: '/goods', component: goods },
    { path: '/comments', component: comments },
    { path: '/seller', component: seller }
   
   
  ],
  linkActiveClass:"active"//手动设置当前选中样式
})

// 把路由对象暴露出去
export default router