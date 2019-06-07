<template>
    <div class="shopcart_btn">
        <svg aria-hidden="true" @click="decrease" v-show="food.count>0">
            <use xlink:href="#icon-jianshaoanniu_dianji"></use>
        </svg>
        <div style="display: inline-block;margin:-2px -20px 0 -20px;" >
            <span class="count" v-show="food.count>0">{{food.count}}</span>
             <transition
			      @before-enter="beforeEnter"
			      @enter="enter"
			      @after-enter="afterEnter">
			      <div class="ball" v-show="flag" ref="ball"></div>
   		   </transition>
               
        </div>
        <svg aria-hidden="true" @click="add()">
            <use xlink:href="#icon-zengjiaanniu_dianji"></use>
        </svg>

        
    </div>
</template>
<script>
import iconfont from '../../lib/iconfont/iconfont.js'
import Vue from 'vue'
export default {

    name: 'CartBtn',
    props: ['food'],

    data() {
        return {
            flag: false
        }
    },

    methods: {

        decrease() {
            this.food.count--;
        },

        add() {
 			this.flag = !this.flag;
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            }
        },
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)";
        },
        enter(el, done) {
            el.offsetWidth;

            const ballPosition = this.$refs.ball.getBoundingClientRect();

            const iconBoxPosition = document
                .getElementById("iconBox")
                .getBoundingClientRect();

            const xDist = iconBoxPosition.left - ballPosition.left;
            const yDist = iconBoxPosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";

           
            done();
        },
        afterEnter(el) {
            this.flag = !this.flag;

        }

    }
}
</script>
<style lang="less" scoped>
.shopcart_btn {
    position: relative;
    display: flex;
    height: 15px;
    padding: 0 20px;



    .count {
        display: inline-block;
        height: 15px;
        font-size: 10px;
        line-height: 19px;
        color: #000;

    }

    .ball {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #00a0dc;
        position: absolute;
        left: 44%;
        top: 1px;
    }




}
</style>