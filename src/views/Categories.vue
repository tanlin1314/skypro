<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品分类</span>
                <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="AddCategory">添加分类</el-button> -->
                <el-button type="text" style="float: right; padding: 3px 0" @click="dialogFormVisible  = true">添加分类</el-button>
                <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>

                    <el-form-item label="是否启用" :label-width="formLabelWidth">
                    <el-switch v-model="form.state1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>  
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="AddCategory">确 定</el-button>
                </div>
              </el-dialog>
            </div>


            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="id" label="序号"></el-table-column>
              <el-table-column prop="cateName" label="分类名称">
              </el-table-column>
              <el-table-column prop="date" label="是否启用">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949" active-value="100"
                    inactive-value="0">
                  </el-switch>
                </template>
              </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
            </el-table>

              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="page_sizes"
                  :page-size="page_size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </el-card>
    </div>
</template>

<script>
import {Catelist,Addcate,Delcate} from '@/api/apis.js'
    export default {
         data() {
      return {
        input4: '',
        // value1:'',
        tableData: [],
        state: '',
        // 当前显示的条数
        currentPage:1,
        page_sizes:[3,6,9],
        // 每页显示的条数
        page_size:3,
        // 总条数
        total:0,
        // 添加分类
        form:{
          name:'',
          state1: true
          
        },
        formLabelWidth: '120px',
        dialogTableVisible: false,
        dialogFormVisible: false,


      }
    },
    methods: {
      // 添加分类
      AddCategory(){
        console.log(this.form.name);
        // console.log(this.form.state);false
        let state = this.form.state1 == 0 ? 'false' : 'true';
        // console.log(state);
          Addcate(this.form.name,state).then((res)=>{
            console.log(res);
          })
          this.rendering()
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        // 获取id
        // console.log(this.id);
        console.log( index, row.id);
        
        Delcate(row.id).then((res)=>{
            console.log(res);
        })
        this.rendering()
        
      },
      // 条 
       handleSizeChange(sizess) {
        // console.log(`每页 ${sizess} 条`);
        this.page_size=sizess
        this.rendering()
      },
      // 页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val;
        this.rendering()
      },
      rendering(){
        console.log(this.page_size);
        
        Catelist(this.currentPage,this.page_size).then((res)=>{
        // console.log(res.data);
        this.tableData=res.data.data
        // 获取总条数
        this.total=res.data.total

        // this.id=res.data.
        this.tableData.forEach(i=> {
            i.state=i.state==1?'100':'0'
             this.id= i.id
            //  console.log(this.id);
             
           
            
          });
        console.log(this.tableData);
        
     
      
 
       
       
        
      })
      }
    },
    created(){
      this.rendering()
      
    }
    }
</script>

<style lang="less" scoped>
.box-card{
    margin: 20px;
}
</style>