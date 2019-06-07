<template>
    <div class="container">
        <v-header :seller="seller"></v-header>
        <div class="tab">
            <router-link tag="div" to="/goods" class="tab-item">商品</router-link>
            <router-link tag="div" to="/comments" class="tab-item">评论</router-link>
            <router-link tag="div" to="/seller" class="tab-item">商家</router-link>
        </div>
        <router-view :seller="seller"></router-view>
    </div>
</template>
<script>
import header from './components/header/Header.vue'
const url = "https://lengyuexin.github.io/json/app.json";
export default {

    name: 'App',

    data() {
        return {
            seller: {}
        }
    },
    components: {
        'v-header': header
    },

    created() {
        this.getSeller();

    },
    methods: {
        //获取商家数据
        getSeller() {
            this.$http.get(url).then(result => {
                    this.seller = result.body.seller;
                    
                   
                })

            
        }}


    }
</script>
<style lang="less" scoped>
.container {
    .tab {
        border-bottom: 1px solid #333;
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;

        .tab-item {
            flex: 1;
            text-align: center;

            &.active {
                color: red;
            }
        }
    }
}
</style>