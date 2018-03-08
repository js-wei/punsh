/**
 * File: d:\works\punsh\src\views\pullrefresh.vue
 * Created Date: 2018-03-06 1:39:08
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-06 1:54:51
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div>
      <v-pull-refresh :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
            <ul class="listItem">
                <li v-for="(item,index) in listdata" :key="index">
                    <span>{{ item.date }}</span>
                    <span>{{ item.portfolio }}</span>
                    <span :class="{'state0':(item.state===0),'state1':(item.state==1),state2:(item.state===2)}"  >{{ item.drop }}</span>
                </li>
            </ul>
        </v-pull-refresh>
    </div>
</template>

<script>
    import vPullRefresh from '../components/pull-refresh.vue'
    export default {
        data() {
            return {
                counter: 1, //当前页
                num: 10, // 一页显示多少条
                pageStart: 0, // 开始页数
                pageEnd: 0, // 结束页数
                listdata: [], // 下拉更新数据存放数组
                scrollData: {
                    noFlag: false //暂无更多数据显示
                }
            }
        },
        components:{
            vPullRefresh
        },
        mounted: function() {
            this.getList();
        },
        methods: {
            getList() {
                var response = []
                for(let i = 0; i < 20; i++) {
                    response.push({
                        date: "2017-06-1"+i,
                        portfolio: "1.5195"+i,
                        drop: i+"+.00 %" ,
                        state: 1
                    })
                }
                this.listdata = response.slice(0, this.num);
            },
            onRefresh(done) {
                this.getList();
                done(); // call done
            },
            onInfinite(done) {
                this.counter++;
                let end = this.pageEnd = this.num * this.counter;
                let i = this.pageStart = this.pageEnd - this.num;

                let more = this.$el.querySelector('.load-more')
                for(i; i < end; i++) {
                    if(i >= 30) {
                        more.style.display = 'none'; //隐藏加载条
                        //走完数据调用方法
                        this.scrollData.noFlag = true;

                        break;
                    } else {
                        this.listdata.push({
                            date: "2017-06-1"+i,
                            portfolio: "1.5195"+i,
                            drop: i+"+.00 %" ,
                            state: 2
                        })
                        more.style.display = 'none'; //隐藏加载条
                    }
                }
                done();
            }
        }
    }
</script>

<style scoped>

</style>