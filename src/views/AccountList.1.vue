<template>
    <div>   
       <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>账户列表</span>
         <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange" >
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="账号"
            width="120">
            <template slot-scope="scope">{{ scope.row.account }}</template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="用户组"
            width="120">
            <template slot-scope="scope">{{ scope.row.userGroup }}</template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="创建时间"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.ctime }}</template>
            </el-table-column>
             <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">
                    <el-button type="text" @click="dialogFormVisible = true" class="bj"> 编辑</el-button>

                  <el-dialog title="修改用户名" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="用户组" :label-width="formLabelWidth">
                        <el-input v-model="form.userGroup" autocomplete="off"></el-input>
                      </el-form-item>
                     
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                  </el-dialog>
                    </el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
                

        </el-table>
            <div class="block">
            <!-- <span class="demonstration">完整功能</span> -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="page_sizes"
         
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>


      
          
        </div>
    
        </el-card>
    </div>
</template>

<script>
import {AccountList} from '@/api/apis.js'
import {DelID} from '@/api/apis.js'  
import {Amend} from '@/api/apis.js'


 export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        // 当前页码
          currentPage4: 1,
          // 每页显示条数
          page_sizes:['5','10','30'],
          // 总条数
          total:0,
          dialogTableVisible: false,
        dialogFormVisible: false,
         form: {
          name: '',
          userGroup:''
         
        },
        formLabelWidth: '60px'
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
         Amend(row.id,row.account,row.userGroup).then((res)=>{
          console.log(res);
          // if(res.data.code==0){
          //   this.tableData.account=this.
          // }
          
        })
      },
      handleDelete(index,row) {
        console.log(row);
       

        DelID(row.id).then(()=>{
          this.getData();                 
        })
      },
       handleSizeChange(tiao) {
        // console.log(`每页 ${tiao} 条`);
        this.page_sizes=tiao;
            this.getData(this.total);
      },
      handleCurrentChange(val) {
      //  
        this.currentPage4=val;
         console.log(`当前页: ${val}`);
    // 换页码就重新获取数据
        this.getData();

      },
      // 获取自定义函数
      getData(){
         AccountList(this.currentPage4,10).then((res)=>{
     console.log(res.data);
     
    this.tableData=res.data.data
    // 从数据中获取到总条数转换为整数，赋值给分页组件
    this.total=parseInt(res.data.total)
    
      
      })
      }
    },
    created(){
      // 发送请求
      // console.log(this.currentPage4);
      this.getData();
    }
  }
</script>

<style lang="less" scoped>
.el-card{
    margin: 20px;
}
.bj{
 padding: 0  !important;
//  margin: 5px;
}

</style>