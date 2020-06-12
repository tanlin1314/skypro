<template>
    <div>
<!-- 商品统计 -->

  <div class="block">
    <span class="demonstration">时间范围</span>
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" @click="chaxun">查询</el-button>
  </div>

        <el-card class="box-card">
            <el-card class="box-card">
                <div id="main" style="height:400px;"></div>
            </el-card>
        </el-card>
    </div>
</template>

 <script>
import echarts from "echarts"; 
// import moment from 'moment'
import {orderOrdertotal} from '@/api/apis.js'
    export default {
    data() {
      return {
        value1: ["2019-10-01 00:00:00", "2019-10-10 00:00:00"],
      };
    },
    methods:{
        chaxun(){
            // console.log(this.value1=moment(this.value1).format("YYYY-MM-DD hh:mm:ss"));
            // console.log(JSON.stringify(this.value1));
            
                  orderOrdertotal(JSON.stringify(this.value1)).then((res)=>{
                console.log(res);})
            
        }
    },

  mounted() {
   
     
        // this.chaxun()

          var mycharts = echarts.init(document.getElementById("main"));
        //  console.log(JSON.stringify(this.value1));
         
            // orderOrdertotal(JSON.stringify(this.value1)).then((res)=>{
            //     console.log(res);
                    let option = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    restore: {show: true},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data: ['蒸发量', '降水量', '平均温度']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '水量',
                                    min: 0,
                                    max: 250,
                                    interval: 50,
                                    axisLabel: {
                                        formatter: '{value} ml'
                                    }
                                },
                                {
                                    type: 'value',
                                    name: '温度',
                                    min: 0,
                                    max: 25,
                                    interval: 5,
                                    axisLabel: {
                                        formatter: '{value} °C'
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '蒸发量',
                                    type: 'bar',
                                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                                },
                                {
                                    name: '降水量',
                                    type: 'bar',
                                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                                },
                                {
                                    name: '平均温度',
                                    type: 'line',
                                    yAxisIndex: 1,
                                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                                }
                            ]
                        };
                 mycharts.setOption(option);
            // })


          
  }

  };
</script>

<style lang="less" scoped>
.block{
    margin: 20px;
}
</style>