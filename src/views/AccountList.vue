<template>
  <div>
    <el-card class="box-card">
  <div slot="header">
    <el-table :data='userlist' @selection-change="tan" >
      <!-- 设置列名 -->
      <el-table-column type="selection" width="55"></el-table-column>
       <el-table-column label="账号" prop="account"></el-table-column>      
       <el-table-column label="用户组" prop="userGroup"></el-table-column>      
       <el-table-column label="创建时间" prop="ctime"></el-table-column>      
           <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="handleDelete(scope.$index, scope.row)">       
        <el-button
          size="mini"
          type="danger"
          slot="reference"
          >删除</el-button>
          </el-popconfirm>
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

  <el-button type="danger" @click="pdel">批量删除</el-button>
          
  </div>

</el-card>
  </div>
</template>

<script>
import {AccountList,DelID,Batchdel} from '@/api/apis.js'
  export default {
    data(){
      return{
        userlist:[],
        // 当前显示的页数
        currentPage: 1,
        page_sizes:[5,10,15,20],
        //每页显示条数
        page_size:10, 
        // 总条数
        total:0
      }
    },
    // 函数
    methods:{
      // 编辑
      handleEdit(index,row){
        console.log(index,row);
        
      },
      // 删除
      handleDelete(index,row){
        console.log(index,row);
        // 获取id
        // console.log(row.id);
        DelID(row.id).then((res)=>{
              console.log(res);
              // 删除成功就重新渲染
              this.rendering();
            })
      },
      // 批量删除   获取所有选中项 获取选中的id
      pdel(){
        console.log('获取选中的id');

        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=>{
                if(this.arr.length==0) return
                   Batchdel(JSON.stringify(this.arr)).then((res)=>{
                    console.log(res);
                    if(res.data.code==0){
                       this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                    }
                    this.rendering();
                    
                  })
              })
              
              

        
        
      },
      // 分页条  页数改变触发
       handleSizeChange(sizes) {
        // console.log(`每页 ${val} 条`);
         this.page_size=sizes
        this.rendering();         
      },
      // 当前页  点击页码触发函数  
      handleCurrentChange(page) {
        // console.log(`当前页: ${page}`);
        this.currentPage=page;
        this.rendering();
      },
      // 自定义渲染页面  获取账号列表  page:请求的页数,size：请求的条数
      rendering(){
          AccountList(this.currentPage,this.page_size).then((res)=>{
        console.log(res);
        this.userlist=res.data.data
        // 总条数
        this.total=res.data.total
        
      })
      },
      // 改变
    tan(selection){
      // 循环老数组在返回新数组
        // console.log(selection);
        // var arr=selection.map((v)=>{
        //   return v.id
        // })
         this.arr=selection.map(v => v.id)  //是数组 转字符串

        // console.log(JSON.stringify(arr));

   
      }
    },
    created(){
      // 自定义渲染页面  获取账号列表  
      this.rendering();
    }
  }
</script>

<style lang="less" scoped>

</style>