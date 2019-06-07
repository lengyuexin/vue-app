<template>
    <div class="container">
        <div class="cart-left">
            <div class="iconBox">
                <div class="icon" :class="totalCount>0?'active':''">
                    <i class="mui-icon mui-icon-extra mui-icon-extra-cart"></i>
                </div>
                <div class="badge" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <span class="price">
                &yen;{{totalPrice}}
            </span>
            <span class="desc">
                另需配送费￥{{deliveryPrice}}元
            </span>
        </div>
        <div class="cart-right" :class="totalCount>0?'active':''">
            <span class="send" v-show="totalCount==0">
                ￥{{minPrice}}起送{{totalCount}}
            </span>
             <span class="send" v-show="totalCount!=0">
               去结算
            </span>
        </div>
    </div>
</template>
<script>
export default {

    name: 'ShopCart',
    props: ['deliveryPrice', 'minPrice', 'selectFoods'],
    computed: {
        //商品总价计算
        totalPrice() {
            let total = 0;

            this.selectFoods.forEach(item => {
                total += item.count * item.price;
            })
            return total;

        },
        //商品总数量计算
        totalCount() {
            let count = 0;

            this.selectFoods.forEach(item => {
                count += item.count
            })
            return count;

        }

    },

    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.container {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #141d27;
    width: 100%;
    height: 48px;
    z-index: 50;
    display: flex;

    .cart-left {


        flex: 1;

        .iconBox {
            position: relative;
            top: -8px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background-color: #141d27;
            margin-left: 18px;
            z-index: 80;
            padding: 6px 0;
            box-sizing: border-box;
            display: inline-block;

            .badge {
                position: absolute;
                top: 0px;
                right: 0px;
                width: 27px;
                height: 21px;
                border-radius: 21px;
                line-height: 21px;
                text-align: center;
                font-size: 9px;
                color: #fff;
                background: linear-gradient(90deg, #fc9153, #f01414);
                box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .4);
            }



            .icon {
                background-color: #333;
                margin-left: 5px;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                text-align: center;


                i {
                    font-size: 24px;
                    color: rgba(255, 255, 255, .4);
                    line-height: 24px;
                    padding: 6px;


                }
            }

            .icon.active {
                background-color: skyblue;

                i {
                    color: #fff;
                }

            }



        }

        .price {
            display: inline-block;
            height: 24px;
            font-size: 16px;
            color: rgba(255, 255, 255, .4);
            line-height: 24px;
            border-right: 1px solid rgba(255, 255, 255, .2);
            padding-right: 6px;
            font-weight: 350;
        }

        .desc {
            display: inline-block;
            font-size: 12px;
            color: rgba(255, 255, 255, .4);
            line-height: 24px;

        }

    }

    .cart-right {
        display: flex;
        flex: 0 0 105px;
        background-color: #333;


    }



    .send {
        display: inline-block;
        color: rgba(255, 255, 255, .4);
        line-height: 48px;
        height: 48px;
        font-size: 12px;
        font-weight: 700;
        width: 100%;
        text-align: center;
    }

    .cart-right.active {
        background-color: #00b43c;
        .send{
            color:#fff;
        }

    }

}
</style>