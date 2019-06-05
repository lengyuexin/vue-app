<template>
    <div class="container">
        <div class="main">
            <img :src="seller.avatar" alt="">
            <div class="brand">
                <img src="./header_img/brand.png" alt="">
                <span>{{seller.name}}</span>
                <div class="info">
                    <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
                </div>
                <div class="supports" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="icon-description">{{seller.supports[0].description}}</span>
                </div>
                <div class="supports-count" v-if="seller.supports">
                    <span @click="showDetail">{{seller.supports.length}}个</span>
                </div>
            </div>
        </div>
        <div class="footer" @click="showDetail">
            <img src="./header_img/bulletin.png" alt="" width="22" height="12">
            <span>{{seller.bulletin}}</span>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <div class="detail" v-show="detailFlag">
            <div class="head">
                <h1 class="name">{{seller.name}}</h1>
                <star ></star>
            </div>
            <div class="detail-item">
                <span class="liner"></span>
                <span class="info">优惠信息</span>
                <span class="liner"></span>
            </div>
            <div class="supportsList" v-for="(item,i) in seller.supports" :key="i">
                <img :src="picArr[seller.supports[i].type]">
                <span class="icon-description">{{seller.supports[i].description}}</span>
            </div>
            <div class="detail-item" style="margin-top: 28px;">
                <span class="liner"></span>
                <span class="info">商家公告</span>
                <span class="liner"></span>
            </div>
            <p id="desc">{{seller.bulletin}}</p>
            <i class="mui-icon mui-icon-close" @click="closeDetail"></i>
        </div>
    </div>
</template>
<script>

    import star from '../common/Star.vue'
export default {

    name: 'Header',

    data() {
        return {
            score:this.seller.score,
            detailFlag: false,
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
            picArr: [
                'src/components/header/header_img/decrease.png',
                'src/components/header/header_img/discount.png',
                'src/components/header/header_img/guarantee.png',
                'src/components/header/header_img/invoice.png',
                'src/components/header/header_img/special.png'
            ]
        }
    },
    props: ['seller'],
    components:{
        star
    },
    methods: {
        showDetail() {
            this.detailFlag = true;

            this.$store.commit('getScore', this.seller.score);
        },

        closeDetail() {
            this.detailFlag = false;
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    position: relative;
    background: rgba(7, 17, 27, 0.5);

    .main {
        position: relative;

        &>img {
            width: 64px;
            height: 64px;
            border-radius: 2px;
            margin: 24px 16px 18px 24px;

        }

        .brand {
            display: inline-block;
            vertical-align: top;
            margin-top: 26px;

            img {
                border-radius: 2px;
                margin: 0 6px 8px 0;
                width: 30px;
                height: 18px;
            }

            span {
                display: inline-block;
                font-size: 16px;
                line-height: 18px;
                font-weight: bold;
                color: rgb(255, 255, 255);
                vertical-align: top;
            }

            .info {
                span {
                    font-size: 12px;
                    font-weight: 200;
                    line-height: 12px;
                    color: rgb(255, 255, 255);
                }
            }

            .supports {
                .icon {
                    width: 12px;
                    height: 12px;
                    display: inline-block;
                    margin-right: 4px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;

                    &.decrease {
                        background-image: url(./header_img/decrease.png);
                    }

                    &.discount {
                        background-image: url(./header_img/discount.png);
                    }

                    &.guarantee {
                        background-image: url(./header_img/guarantee.png);
                    }

                    &.invoice {
                        background-image: url(./header_img/invoice.png);
                    }

                    &.special {
                        background-image: url(./header_img/special.png);
                    }
                }

                .icon-description {
                    font-size: 10px;
                    font-weight: 200;
                    line-height: 12px;
                    color: rgb(255, 255, 255);
                }
            }

            .supports-count {
                background: rgba(0, 0, 0, 0.2);
                position: absolute;
                bottom: 8px;
                right: 24px;
                border-radius: 4px;
                margin-bottom: 10px;

                span {
                    font-size: 10px;
                    font-weight: 200;
                    line-height: 12px;
                    color: rgb(255, 255, 255);
                    padding: 7px;
                }
            }



        }

    }

    .footer {

        background-color: rgba(7, 17, 27, 0.2);
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        img {
            margin-left: 14px;
            margin-right: 4px;
            vertical-align: middle;

        }

        span {
            line-height: 28px;
            font-size: 10px;
            font-weight: 100;
        }
    }

    .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
        color: #fff;
    }

    .detail {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(7, 17, 27, .8);
        z-index:100;
        padding: 64px 36px 32px 36px;

        .head {
            width:100%;
            text-align: center;

            .name {
                font-size: 16px;
                font-weight: 350;
                line-height: 16px;
                color: #fff;
                margin-bottom: 16px;
            }

           
        }

        .detail-item {
            display: flex;
            justify-content: space-between;

            .liner {
                display: inline-block;
                width: 112px;
                margin-bottom: 24px;
                background-color: rgba(255, 255, 255, .2);
                height: 1px;
            }

            .info {
                display: inline-block;
                margin: 0 8px;
                font-size: 12px;
                color: #fff;
                margin-bottom: 2px;
                line-height: 6px;
            }

        }

        .supportsList {

            display: flex;
            justify-content: space-between;
            padding-right: 30px;

            img {
                width: 12px;
                height: 12px;
                line-height: 16px;
                margin: 0px 6px 12px 0;
            }

            .icon-description {
                display: inline-block;
                font-size: 12px;
                line-height: 12px;
                font-weight: 100;
                color: white;
            }
        }

        #desc{
            font-size:12px;
            line-height:18px;
            font-weight:100;
            color:#fff;
        }

        i{
            position:absolute;
            bottom:10%;
            left:48%;
            font-size:32px;
            color:rgba(255,255,255,.5);

        }

    }
}
</style>