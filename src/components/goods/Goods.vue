<template>
    <div class="goods">
        <div class="menu" ref="menuScroll">
            <ul>
                <li v-for="(item,i) in goods" :key="i" class="menu-item" :class="{'current':currentIndex===i}" @click="selectMenu(i,$event)">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-item" ref="foodsScroll">
            <ul>
                <li v-for="(item,i) in goods" :key="i" class="food-list">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food,i) in item.foods" :key="i" class="food-item">
                            <div class="icon">
                                <img :src="food.icon">
                            </div>
                            <div class="content" style="display: inline-block;">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="description">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span>&yen;{{food.price}}</span>
                                    <span v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
                                </div>
                                 <div class="shopcart_btn">
                                    
                                   <svg  aria-hidden="true" @click="decrease">
                                      <use xlink:href="#icon-jianshaoanniu_dianji" ></use>
                                    </svg> 
                                    
                                  
                                    <svg  aria-hidden="true" @click="add">
                                        <use xlink:href="#icon-zengjiaanniu_dianji"></use>
                                    </svg>


                                 </div>
                            </div>
                        </li>
                    </ul>
                   
                </li>
            </ul>
        </div>
        <shopcart :selectFoods="[{'count':0,'price':10000000}]":deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
</template>
<script>
const url = "https://lengyuexin.github.io/json/app.json";
import betterScroll from 'better-scroll'
import shopcart from './shopCart/ShopCart.vue'
import '../../lib/iconfont/iconfont.js'
export default {


props:['seller'],
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        }
    },
    created() {
        this.getGoods();
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let curHeight = this.listHeight[i];
                let nextHeight = this.listHeight[i + 1];
                if (!nextHeight || (this.scrollY >=curHeight && this.scrollY < nextHeight)) {
                    return i;
                }
            }
            return 0;

        }

    },
    methods: {
        decrease(){
            alert('---')
        }, 

        add(){
            alert('+++')
        },
        //获取商品信息
        getGoods() {
            this.$http.get(url).then(result => {
                this.goods = result.body.goods;

                this.$nextTick(() => {
                    this.initScroll();
                    this.calculateHeight();
                })
            })
        },
        //初始化滚动条
        initScroll() {
            this.menuScroll = new betterScroll(this.$refs.menuScroll, {
              click:true
            })
            this.foodsScroll = new betterScroll(this.$refs.foodsScroll, {
                probeType: 3,  click:true
            })
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
      //获取计算高度
        calculateHeight() {
            let foodList = document.querySelectorAll('.food-list');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let liHeight = foodList[i].clientHeight;
                height += liHeight
                this.listHeight.push(height);
            }
        },

        selectMenu(index,event){
            if(!event._constructed){
              return;
            }
            let foodsList=document.querySelectorAll(".food-list")
            let el=foodsList[index];
            this.foodsScroll.scrollToElement(el,300);

        }

    },
    components:{
        shopcart
    }
}
</script>
<style lang="less" scoped>
.goods {
    display: flex;
    position: absolute;
    top: 179px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;

    .menu {
        flex: 0 0 80px;
        width: 80px;
     




        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            background-color: #f3f5f7;



            .menu-item {
                display: table;
                padding: 0 12px;
                height: 54px;



                &.current {

                    margin-top: -1px;
                    background-color: #fff;

                    .text {
                        font-weight: bold;
                        color:red;
                    }
                }


                .text {
                    display: table-cell;
                    font-size: 12px;
                    width: 56px;
                    line-height: 14px;
                    font-weight: 200;
                    box-shadow: 1px 0px 1px #999;
                    vertical-align: middle;

                    .icon {
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        margin-right: 2px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;

                        &.decrease {
                            background-image: url(./goods_img/decrease.png);
                        }

                        &.discount {
                            background-image: url(./goods_img/discount.png);
                        }

                        &.guarantee {
                            background-image: url(./goods_img/guarantee.png);
                        }

                        &.invoice {
                            background-image: url(./goods_img/invoice.png);
                        }

                        &.special {
                            background-image: url(./goods_img/special.png);
                        }
                    }

                }
            }
        }



    }

    .foods-item {
        width: 100%;
        flex: 1;
        background-color: #fff;

        ul {

            margin: 0;
            padding: 0;
            list-style: none;
        }

        .food-list {
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background-color: #f3f5f7;
            }

            .food-item {
                margin-bottom: 18px;
                display: flex;
                justify-content: space-between;
         
                .icon {
                    padding: 18px 10px 18px 18px;

                    img {
                        vertical-align: top;
                    }

                }

                .content {
                    padding-top: 18px;
                    width: 146px;


                    .name {
                        font-size: 14px;
                        line-height: 14px;
                        color: rgb(7, 17, 27);
                    }

                    .description,
                    .extra {
                        color: rgb(147, 153, 159);
                        font-size: 10px;
                        line-height: 18px;
                    }

                    .price {

                        span:first-child {
                            font-size: 14px;
                            line-height: 28px;
                            font-weight: 350;
                            color: red;

                        }

                        span:last-child {
                            font-size: 10px;
                            line-height: 24px;
                            font-weight: 350;
                            color: rgb(147, 153, 159);
                            text-decoration: line-through;

                        }

                    }
                }

                  .shopcart_btn{
                     display: flex;
                     justify-content: space-around;
                      height:15px;
                      padding:0 20px;
                   
                    
                }


            }

          
        }

    }
}
</style>