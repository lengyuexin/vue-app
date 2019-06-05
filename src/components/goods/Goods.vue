<template>
    <div class="goods">
        <div class="menu">
            <ul>
                <li v-for="(item,i) in goods" :key="i" class="menu-item">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-item">
        	<ul>
        		<li v-for="(item,i) in goods" :key="i" class="food-list">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="(food,i) in item.foods" :key="i" class="food-item">
							<div class="icon">
								<img :src="food.icon" >
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
							</div>
						</li>
					</ul>
        		</li>
        	</ul>
        </div>
    </div>
</template>
<script>
const url = "https://lengyuexin.github.io/json/app.json";
export default {



    data() {
        return {
            goods: [],
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        }
    },
    created() {
        this.getGoods();


    },
    methods: {
        //获取商品信息
        getGoods() {
            this.$http.get(url).then(result => {
                this.goods = result.body.goods;

            })
        }
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
        background-color: #f3f5f7;

        ul {
            margin: 0;
            padding: 0;
            list-style: none;

            .menu-item {
				display:table;
				padding:0 12px;
				height:54px;
				

                .text {
                	display:table-cell;
                	font-size:12px;
                	width:56px;
                	line-height: 14px;
                	font-weight: 200;
                	box-shadow: 1px 0px 1px #999;
                	vertical-align: middle;
                    .icon {
                        width: 12px;
                        height: 12px;
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
    	width:100%;
        flex: 1;
        ul{

        	margin:0;
        	padding:0;
        	list-style: none;
        }
        .food-list{
        	.title{
	        	padding-left:14px;
	        	height:26px;
	        	line-height:26px;
	        	border-left: 2px solid #d9dde1;
	        	font-size:12px;
	        	color:rgb(147,153,159);
	        	background-color:#f3f5f7;
       		 }

       		  .food-item{
       		  	margin-bottom:18px;
       		  	display:flex;
       		  	justify-content: space-around;


       		  	.icon{
       		  		img{
       		  			vertical-align: top;
       		  		}
       		  	}

       		  	.content{
       		  	
       		  		width: 146px;
       		  		.name{
       		  			font-size:14px;
       		  			line-height:14px;
       		  			color:rgb(7,17,27);
       		  		}
       		  		.description,.extra{
       		  			color:rgb(147,153,159);
       		  			font-size:10px;
       		  			line-height:10px;
       		  		}
       		  		.price{
       		  		
       		  			span:first-child{
       		  				font-size:14px;
       		  				line-height:28px;
       		  				font-weight:350;
							color:red;
       		  				
       		  			}

       		  		}
       		  	}
       		  	
       		  }

        }
        
    }
}
</style>