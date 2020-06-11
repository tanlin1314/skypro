<template>
    <div>
           <el-card class="box-card">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="订单号">
                        <el-input v-model="formInline.OrderID" placeholder="订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人">
                        <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-select v-model="formInline.region" placeholder="订单状态">
                        <el-option label="订单状态一" value="shanghai"></el-option>
                        <el-option label="订单状态二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                     
                  
                   <el-form-item label="时间">
                        <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()">查询</el-button>
                    </el-form-item>
                    </el-form>

                    <!-- 订单 -->
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100%">
                      <el-table-column
                        fixed
                        prop="orderNo"
                        label="订单"
                        width="100">
                      </el-table-column>
                      <el-table-column
                        prop="orderTime"
                        label="下单时间"
                        width="100"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="phone"
                        label="手机号"
                        width="140">
                      </el-table-column>
                      <el-table-column
                        prop="consignee"
                        label="收货人"
                        width="100">
                      </el-table-column>
                      <el-table-column
                        prop="deliverAddress"
                        label="配送地址"
                        width="100">
                      </el-table-column>
                      <el-table-column
                        prop="deliveryTime"
                        label="到达时间"
                        width="100">
                      </el-table-column>
                       <el-table-column
                        prop="remarks"
                        label="备注"
                        width="120">
                      </el-table-column>
                       <el-table-column
                        prop="orderAmount"
                        label="金额"
                        width="100">
                      </el-table-column>
                       <el-table-column
                        prop="orderState"
                        label="状态"
                        width="100">
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope" >
                          <el-button @click="handleEdit(scope.$index, scope.row),dialogTableVisible=true" type="text" size="small">查看</el-button>
                          <el-button type="text" size="small" @click="dialogFormVisible=true,handedit(scope.$index, scope.row)">编辑</el-button>
                        </template>
                        </el-table-column>
                      </el-table>
                      <!-- 查看模态框 -->
                      <el-dialog title="查看" :visible.sync="dialogTableVisible" width="70%">
                      <el-table :data="tan"  border >
                        <el-table-column prop="id" label="id" w></el-table-column>
                        <el-table-column prop="orderNo" label="序号" ></el-table-column>
                        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
                        <el-table-column prop="phone" label="手机号"></el-table-column>
                        <el-table-column prop="consignee" label="用户名"></el-table-column>
                        <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
                        <el-table-column prop="deliveryTime" label="到达时间"></el-table-column>
                        <el-table-column prop="remarks" label="备注"></el-table-column>
                        <el-table-column prop="orderAmount" label="金额"></el-table-column>
                        <el-table-column prop="orderState" label="状态"></el-table-column>
                      </el-table>
                    </el-dialog>

                    <!-- 编辑 -->
                    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="订单号" :label-width="formLabelWidth">
                        <el-input v-model="form.orderNo" autocomplete="off"></el-input>
                      </el-form-item>
                       <el-form-item label="下单时间" :label-width="formLabelWidth">
                        <el-input v-model="form.orderTime" autocomplete="off"></el-input>
                      </el-form-item>
                       <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                      </el-form-item>
                       <el-form-item label="收货人" :label-width="formLabelWidth">
                        <el-input v-model="form.consignee" autocomplete="off"></el-input>
                      </el-form-item>
                       <el-form-item label="送货地址" :label-width="formLabelWidth">
                        <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
                      </el-form-item>
                       <el-form-item label="送达时间" :label-width="formLabelWidth">
                        <el-input v-model="form.deliveryTime" autocomplete="off"></el-input>
                      </el-form-item>
                       <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input v-model="form.remarks" autocomplete="off"></el-input>
                      </el-form-item>
                       <el-form-item label="订单金额" :label-width="formLabelWidth">
                        <el-input v-model="form.orderAmount" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="订单状态" :label-width="formLabelWidth">
                        <el-input v-model="form.orderState" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="orderEdit(),dialogFormVisible = false">确 定</el-button>
                    </div>
                  </el-dialog>
           

                      <!-- 分页 -->
                       <div class="block">
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="currentPage"
                          :page-sizes="[5, 10, 15, 20]"
                          :page-size="page_size"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="total">
                        </el-pagination>
                      </div>
            </el-card>
    </div>
</template>

<script>
import {orderList,orderSearch,orderDetail,orderEdit} from '@/api/apis.js'
import moment from 'moment'
    export default {
           data() {
            return {
              // value2: '',
              // 订单表单
              formInline: {
                phone: '',
                OrderID: '',
                region:'',
                consignee:'',
              },
              form: {
                id:'',
                orderNo: '',
                orderTime: '',
                phone: '',
                consignee: '',
                deliverAddress: '',
                deliveryTime: '',
                remarks: '',
                orderAmount: '',
                orderState: '',
                
                
              },
               tan: [], //查看

                dialogTableVisible: false,
                dialogFormVisible:false,
                  formLabelWidth: '120px',
              value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
              tableData: [],
              // 分页
              currentPage: 1,
              total:1,
              page_size:5
            };
          },
     methods: {
       orderEdit(){
         console.log(this.id);
         console.log(111);
         
         
         orderEdit(this.id,this.form.orderNo,this.form.orderTime,this.form.phone,this.form.consignee,this.form.deliverAddress,this.form.deliveryTime,this.form.remarks,this.form.orderAmount,this.form.orderState).then((res)=>{
           console.log(res);
           })
     },
       handedit(index, row){
         console.log(index, row);
        this.id=row.id;         
        this.orderNo=row.orderNo;
        this.orderTime=row.orderTime;
        this.phone=row.phone;
        this.consignee=row.consignee;
        this.deliverAddress=row.deliverAddress;
        this.deliveryTime=row.deliveryTime;
        this.remarks=row.remarks;
        this.orderAmount=row.orderAmount;
        this.orderState=row.orderState;
        // console.log(this.id);
        

        
        
        
        //  id: 21
        //   orderNo: "16013"
        //   orderTime: "2020-06-04 05:35:19"
        //   phone: "18181358998"
        //   consignee: "汪小哥"
        //   deliverAddress: "天府新谷"
        //   deliveryTime: "2020-04-16 10:44:58"
        //   remarks: "不要辣"
        //   orderAmount: 30
        //   orderState: "已完成"
        // console.log(row.id,row.orderNo,row.orderTime,row.phone,row.consignee,row.deliverAddress);
        
        //  orderEdit(row.id,row.orderNo,row.orderTime,row.phone,row.consignee,row.deliverAddress,row.deliveryTime,row.remarks,row.orderAmount,row.orderState).then((res)=>{
        //    console.log(res);
           
        //  })
       },
      //  查看
       handleEdit(index, row){
         console.log(index, row);
         orderDetail(row.id).then((res)=>{
          //  console.log(res.data.data);
           this.tan=[res.data.data];

       // 时间转换
          this.tan.forEach(v => {
          // console.log(v.orderTime);
          //  console.log(moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss"));
          v.deliveryTime=moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss")
           v.orderTime=moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss")
           
            
        });

           console.log(this.tan);
           
           
         })



       }, 
      onSubmit() {
        orderSearch(this.currentPage,this.page_size,this.formInline.OrderID,this.formInline.consignee,this.formInline.phone,this.formInline.region,this.formInline.value1).then(res=>{
          // console.log(res);
           this.total=res.data.total
        this.tableData=res.data.data
        // 时间转换
          this.tableData.forEach(v => {
          // console.log(v.orderTime);
          //  console.log(moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss"));
          v.deliveryTime=moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss")
           v.orderTime=moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss")
           
            
        });
        })
      },
       handleSizeChange(val) {
        this.page_size=val;
       
          this.orderList()
      },
      handleCurrentChange(val) {
         this.currentPage=val;
         this.orderList()
      },
      orderList(){
        orderList(this.currentPage,this.page_size).then((res)=>{
        // console.log(res.data.data);
        this.total=res.data.total
        this.tableData=res.data.data
        this.tableData.forEach(v => {
          // console.log(v.orderTime);
          //  console.log(moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss"));
          v.deliveryTime=moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss")
           v.orderTime=moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss")
           
            
        });
        // this.gridData=res.data.data

        // console.log(this.gridData);
        
        
        
      })
      }
    },
    created(){
      // console.log(this.order);
      this.orderList()
    }
  
    }
</script>

<style lang="less" scoped>
    .box-card{
        margin: 20px;
    }
    .block{
      margin-top: 20px;
    }
</style>