<template>
    <div>
           <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品列表</span>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="属性分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="商品图片">
                            <img :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+ props.row.imgUrl" alt="">
                        </el-form-item>
                      
                        <el-form-item label="商品描述">
                            <span>{{ props.row.goodsDesc }}</span>
                        </el-form-item>
                        <el-form-item label="商品评价">
                            <span>{{ props.row.pj }}</span>
                        </el-form-item>
                          <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                          
                        <el-form-item label="创建时间">
                            <span>{{ props.row.ctime }}</span>
                        </el-form-item>
                        <el-form-item label="商品销量">
                            <span>{{ props.row.sellCount }}</span>
                        </el-form-item>
                        
                        </el-form>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="商品 名称"
                    prop="name">
                    </el-table-column>
                    <el-table-column
                    label="分类"
                    prop="category">
                    </el-table-column>
                    <el-table-column
                    label="价格"
                    prop="price">
                    </el-table-column>
                      <el-table-column
                    label="图片"
                    >
                    <template slot-scope="scope">
                     <img :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+ scope.row.imgUrl" alt="" width="20px" height="20px">
                    </template>
                     
                    </el-table-column>
                      <el-table-column
                    label="描述"
                    prop="goodsDesc">
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

                <!-- 分业 -->
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
import {Lsit,goodsDel} from '@/api/apis.js'
    export default {
        data() {
      return {
        tableData: [],
         currentPage: 1,
         total:1,
         imgUrl:'',
        //  条数
         page_size:10 
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
    //   删除
      handleDelete(index, row) {
          console.log(row.id);
          
          goodsDel(row.id).then((res)=>{
              console.log(res);
              this.goodlist()
              
          })
      },
    //   分业
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val;
        this.goodlist()
      },
      goodlist(){
        //   console.log(this.currentPage);
          
              Lsit(this.currentPage,this.page_size).then((res)=>{
            console.log( res);
          this.tableData=res.data.data;
          this.tableData.forEach(i => {
            this.ratings=i.ratings                 
          });
          this.total=res.data.total   
        })
      }
    },
    created(){
        this.goodlist()
    
    }
    }
</script>

<style lang="less" scoped>
.box-card{
    margin: 20px;

    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .block{
      margin-top: 20px;
  }
}
</style>