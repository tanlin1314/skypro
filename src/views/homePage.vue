<template>
    <div class="tb">
<el-row :gutter="20">
  <el-col :span="6">
            <div class="Administration">
                <i class="iconfont icon-dingdan"></i>
                  <div>
                 <div class="dj">
                     <p>总订单</p>
             <span>{{totalOrder}}</span>
                 </div>
             </div>
            </div>
  </el-col>
  <el-col :span="6">
      <div class="Administration">
                <i class="iconfont icon-qian"></i>
                  <div>
                 <div class="dj">
                     <p>总销售额</p>
            <span>{{totalAmount}}</span>
                 </div>
             </div>
            </div>
          </el-col>
  <el-col :span="6">
       <div class="Administration">
                <i class="iconfont icon-dingdanliebiao"></i>
                  <div>
                 <div class="dj">
                     <p>今日订单</p>
             <span>{{todayOrder}}</span>
                 </div>
             </div>
            </div>
          </el-col>
  <el-col :span="6">
  <div class="Administration">
                <i class="iconfont icon-qian4
"></i>
                  <div>
                 <div class="dj">
                     <p>今日销售额</p>
             <span>{{totayAmount}}</span>
                 </div>
             </div>
            </div>
          </el-col>
</el-row>
<el-card class="box-card">
  <div id="main" style="height:400px;"></div>

</el-card>


    </div>
</template>

<script>
import echarts from "echarts";
import {Totaldata} from '@/api/apis.js'
export default {
    data(){
        return{
            totalOrder:0,
            totalAmount:0,
            todayOrder:0,
            totayAmount:0,
            

        }
    },


    //     // totalOrder: 5486
    //     // totalAmount: 202466
    //     // todayOrder: 189
    //     // totayAmount: 2189
    //     // xData: (7) ["2019/11/17", "2019/11/18", "2019/11/19", "2019/11/20", "2019/11/21", "2019/11/22", "2019/11/23"]
    //     // orderData: (7) [120, 132, 101, 134, 90, 230, 210]
    //     // amountData: (7) [220, 282, 191, 234, 290, 330, 310]
    // //   Totaldata().then((res)=>{
    // //       console.log(res);
          
    // //   })


  mounted() {
    var mycharts = echarts.init(document.getElementById("main"));
    Totaldata().then((res)=>{
          console.log(res);
        //   totalOrder,totalAmount,todayOrder,totayAmount,
          let{xData,orderData,amountData,totalOrder,totalAmount,todayOrder,totayAmount,}=res.data;
        this.totalOrder = totalOrder;
        this.totalAmount = totalAmount;
        this.totayAmount = totayAmount;
        this.todayOrder = todayOrder;

          let option =  {
    title: {
        text: '数据管理'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:xData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '订单数据',
            type: 'line',
            stack: '总量',
            data:orderData
        },
        {
            name: '金额数据',
            type: 'line',
            stack: '总量',
            data: amountData
        },
        
    ]
};
        mycharts.setOption(option);
            })
    
    

  }


};
</script>

<style lang="less" scoped>
.tb {
    margin-top: 20px;
    margin-left: 20px;
    
//   margin-top: 20px;
//   margin-left: 20px;
  
}
.el-card__body{
    padding: 0;
}

.Administration{
    width: 200px;
    display: flex;
    justify-content:space-between;
    height: 60px;
    background-color: #ffffff;
}
.iconfont{
    font-size: 54px;
    margin-left: 20px;
}
.dj{
    margin-top: 10px;
    margin-right: 20px;
}

.box-card{
    margin-top: 30px;
    margin-right: 20px;
}
</style>