<template>
  <div class="hostManage" :style="{ backgroundImage: 'url(' + bgLogin + ')',height:flagheight?'100%':'' }">
    <header class="titles">海南省人口动态分析预测预警平台</header>
    <!-- 内容区 -->
    <section>
      <el-row :gutter="20">
        <!-- 左面列表项 -->
        <el-col  :span="18">
          <!-- 三等分 -->
          <ul class="flex mb2">
            <li class="listItem tc flex fc ac">
              <div>
                <img src="../../../static/image/home/store.png" alt="人口监测预警数据仓库">
                <p>人口监测预警数据仓库</p>
              </div>
            </li>
            <li class="listItem tc mrl flex fc ac">
              <div>
                <img src="../../../static/image/home/system.png" alt="人口基础信息分析系统">
                <p>人口基础信息分析系统</p>
              </div>
            </li>
            <li class="listItem tc flex fc ac">
              <div>
                <img src="../../../static/image/home/analyse.png" alt="人口信息动态分析系统">
                <p>人口信息动态分析系统</p>
              </div>
            </li>
          </ul>
          <ul class="flex mb2">
            <li class="listItem tc flex fc ac">
              <div>
                <img src="../../../static/image/home/papers.png" alt="死亡证件管理系统">
                <p>死亡证件管理系统</p>
              </div>
            </li>
            <li class="listItem tc mrl flex fc ac">
              <div>
                <img src="../../../static/image/home/sysplex.png" alt="人口预测预警综合决策支持系统">
                <p>人口预测预警综合决策支持系统</p>
              </div>
            </li>
            <li class="listItem tc flex fc ac">
              <div>
                <img src="../../../static/image/home/service.png" alt="公共服务资源配置系统">
                <p>公共服务资源配置系统</p>
              </div>
            </li> 
          </ul>
          <!-- 底部平分 -->
           <ul class="flex">
            <li class="listItem tc mr2 flex fc ac listItem1">
              <div>
                <img src="../../../static/image/home/casa.png" alt="智能分析系统">
                <p>智能分析系统</p>
              </div>
            </li>
            <li class="listItem tc flex fc ac listItem1">
              <div>
                <img src="../../../static/image/home/manage.png" alt="系统综合管理系统">
                <p>系统综合管理系统</p>
              </div>
            </li>
          </ul>
        </el-col>
        <!-- 右边list -->
        <el-col :span="5" :offset="1">
          <ul>
            <!-- 文件通知 -->
            <li class="listItem2 mb2">
              <p class="title">
                <img class="vam mr1" src="../../../static/image/home/advise.png" alt="文件通知">
                <span>文件通知</span>
              </p>
              <div class="p16 wp100">
                <div class="mb20">
                  <p class="word-sign-line wp100">海南省人口动态分析预测预警平台文件通知</p>
                  <span>2020-12-08</span>
                </div>
                <div class="mb20">
                  <p class="word-sign-line wp100">海南省人口动态分析预测预警平台文件通知</p>
                  <span>2020-12-08</span>
                </div>
              </div>
            </li>
            <!-- 交流反馈 -->
            <li class="listItem2 tc mb2" style="height:80px;line-height: 80px;">
              
                <img class="vam" src="../../../static/image/home/info.png" alt="交流反馈">
                <span  class="fz26 bolder">交流反馈</span>
            </li>
            <!-- 平台情况 -->
            <li class="listItem2" style="height:280px">
              <p class="title">
                <img class="vam mr1" src="../../../static/image/home/pie.png" alt="平台运行情况">
                <span>平台运行情况</span>
              </p>
              <div class="wp100 flex tc" >
                <div class="wp50 ps" >
                  <!-- 中间背景处理 -->
                  <div class="writeBox"></div>
                  <div>
                    <RingChart :chartData="chartData"  :chartSettings="chartSettings" :extend="extend"></RingChart>
                  </div>
                </div>
                <div class="wp50 ps">
                  <div class="writeBox"></div>
                   <div>
                    <RingChart :chartData="chartData" :chartSettings="chartSettings" :extend="extend2"></RingChart>
                  </div>
                </div>
                
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import {
    hostList,
    
} from '@/util/data'

import bg from '@/../static/image/banner.png'
import store from '@/store/index.js'
import RingChart from '@/components/Chart/RingChart'
export default {
    name: 'hostManage',
    components: {
        RingChart
    },
    data() {
        this.chartSettings = {
            radius: [28, 40],
            // offsetY: 300
        }
        return {
            bgLogin: bg,
            chartData: {
                columns: ['date', 'user'],
                rows: [
                    {'date': '人口', 'user': 193},
                    {'date': '资源', 'user': 330},
                    {'date': '数据', 'user': 213},
                ]
            },
            extend: {
                title: {
                    text: '数据采集情况',
                    left: '47%',
                    bottom:'10',
                    textStyle:{
                        color:'#FFF',
                        fontSize:'16'
                    },
                    textAlign:'center'
                    
                },
                color:['#F9BF33','#FD7A59','#D8D8D8'],
                graphic: {
                    //图形中间文字
                    type: 'text',
                    left: '10',
                    top: 'center',
                    style: {
                        textAlign: 'center',
                        // fill: '#fff'
                    }
                },
                tooltip: {
                    show: false,
                    // trigger: 'item',
                    // backgroundColor: '#FFFFF',
                    // position: 'center',
                    // textStyle: {
                    //     align: 'center'
                    // },
                    // formatter: function(params) {
                    //     console.log(params)
                    //     var res =
                    //         '<div><p style="font-size:32px;color:#000;padding-bottom:10px">' +
                    //         params.percent +
                    //         '%</p><span style="font-size:14px;color:#666666">' +
                    //         params.name +
                    //         '</span></div>'
                    //     return res
                    // }
                },
                legend: {
                    show:false,
                    // type: 'scroll',
                    // icon: 'circle',
                    // orient: 'vertical',
                    // right: '20%',
                    // top: '50%',
                    // formatter: params => {
                    //     console.log(params)
                      
                    //     let res = this.$data.chartData.rows.filter(val => {
                    //         if (val.date == params) {
                    //             return true
                    //         }
                    //     })
                    //     return params + '    ' + res[0].user 
                    // }
                },
                'series.0.hoverAnimation': true,
                'series.0.avoidLabelOverlap': false,
                'series.0.silent': false,
                'series.0.center': ['40%', '50%'],
                'series.0.legendHoverLink': true,
                'series.0.label': {
                    //去除饼图的指示折线
                    normal: {
                        show: false,
                        position: 'center',
                        formatter: function(params) {
                            var res = params.percent + '%\r\n' + params.name
                            return res
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '12',
                        }
                    }
                },
                'series.0.left': '20%'
            },
            extend2: {
                title: {
                    text: '数据储存情况',
                    left: '47%',
                    bottom:'10',
                    textStyle:{
                        color:'#FFF',
                        fontSize:'16'
                    },
                    textAlign:'center'
                    
                },
                grid:{
                    height:180
                },
                color:['#F9BF33','#40D46A','#D8D8D8'],
                graphic: {
                    //图形中间文字
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        textAlign: 'center',
                        fill: '#fff'
                    }
                },
                tooltip: {
                    show: false,
                },
                legend: {
                    show:false,
                },
                // 'series.0.hoverAnimation': true,
                'series.0.avoidLabelOverlap': false,
                'series.0.silent': false,
                'series.0.center': ['40%', '50%'],
                'series.0.legendHoverLink': true,
                'series.0.label': {
                    //去除饼图的指示折线
                    normal: {
                        show: false,
                        position: 'center',
                        formatter: function(params) {
                            var res = params.percent + '%\r\n' + params.name
                            return res
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '12',
                        }
                    }
                },
                'series.0.left': '10%'
            }
        }
    },
    computed: {
        flagheight() {
            return this.$store.state.heightClient>900?true:false
        }
    },
    watch: {
        // '$store.state.heightClient'(val){
        //     console.log(val)
        // }
    },
    mounted() {
        
    },
    methods: {
    }
}
</script>

<style scoped>
/* #app{
  background-image: url('../../../static/image/banner.png');
} */
.mb2{
  margin-bottom: 2rem;
}
.mr2{
  margin-right: 2rem;
}
.mrl{
  margin: 0 2rem;
}
.mr1{
  margin-right: 1rem;
}
.hostManage{
    position: relative;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    color:#ffffff;
}
.titles{
    padding-top: 80px;
    font-size: 48px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    text-align: center;
    
}
section{
  padding: 80px;
  max-width: 1920px;
  min-width: 1200px;
}
.listItem,.listItem1{
  width: 33%;
  /* max-width: 360px; */
  height: 180px;
  background: rgba(28,108,255,0.35);
  border-radius: 4px;
  padding: 10px;
  font-size: 22px;
  font-family: PingFang SC Bold, PingFang SC Bold-Bold;
  font-weight: 700;
  }
  .listItem1{
    width: 50%;
  }
.listItem2{
  width: 100%;
  /* max-width: 360px; */
  height: 180px;
  background: rgba(28,108,255,0.3);
  border-radius: 4px;
  font-size: 16px;
}
.title{
  /* height: 2rem; */
  width: 100%;
  padding: 5px 1rem;
  font-weight: 700;
  border-radius: 4px;
  background: rgba(28,108,255,0.4);
  font-size: 22px;
  align-self: start;
}
.writeBox{
  position: absolute;
  width:70px;
  height: 70px;
  border-radius: 100%;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50% ,-50%);
}
</style>
