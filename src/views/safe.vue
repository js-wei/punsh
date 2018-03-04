<template>
	<div class="safe">
		<v-head :title="title"></v-head>
		<div class="mui-content">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<router-link to="phone" class="mui-navigate-right">
						手机号
						<div class="mui-pull-right">
							<span id="phone">135******92</span>
						</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell" @click="changePhone">
					<span  class="mui-navigate-right">
						修改密码
					</span>
				</li>
			</ul>
		</div>
		<v-modal :modal="modal" v-on:ok="yes" v-on:cancel="no">
			<div slot="modal-content" v-html="modal.content"></div>
		</v-modal>
	</div>
</template>
<script>
	import vHead from '@/components/header.vue'
	import vModal from '@/components/dialog.vue'

	export default{
		data(){
			return{
				title:'安全和隐私设置',
                modal:{
                    show:false,
                    isHeader:true,
                    isFooter:true,
                    title:'友情提示',
                    yes:'确定',
                    cancel:'取消',
                    content:''
                }
			}
		},
		components:{
			vHead,
            vModal
		},
		methods:{
            changePhone(e){
              this.modal.show=true;
              this.modal.content='您确定要向手机发送验证码吗?'
			},
            yes(e){
				//TODO 发送验证码
				
				this.$router.push({path:'/password'});
            },
            no(e){}
		}
	}
</script>
<style lang="scss">
	@import "../assets/style/base";
	.safe{
		.mui-content{
			margin-top:10px;
			background-color: nth($baseColor,1);
			.mui-table-view{
				.mui-table-view-cell{
					height:50px;
					line-height:40px;
					a{
						font-size:2rem;
						.mui-pull-right{
							margin-right:20px;
						}
					}
				}
			}
		}
		/*
		.toolbar{
			width:100vw;
			height:60px;
			line-height:60px;
			margin-top:.8rem;
			text-align:center;
			.function{
				width:100vw;
				height:100%;
				background-color:nth($baseColor,1);
				&.btn{
					height:50px;
				}
				a{
					font-size:1.8rem;
					color:lighten( nth($baseColor,2),50%);
					.toolbar-left{
						width:40%;
						float: left;
						text-align:left;
						margin-left:1rem;
					}
					.toolbar-right{
						width:50%;
						float: right;
						text-align:right;
						margin-right:1rem;
						.mui-switch{
							margin-top:12px;
							margin-right:10px;
						}
					}
				}
				&.margin-top{
					margin-top:.8rem;
				}
				&.margin-top10{
					margin-top:2rem;
				}
				&.border-top{
					border-top:.1rem solid lighten(nth($baseColor,2),89%);
				}
			}
		}*/
	}
</style>