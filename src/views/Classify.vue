<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品分类</span>
      <el-button style="float: right; padding: 3px 0" @click='add_btn' type="text">添加分类</el-button>
      <!-- 添加分类的模态框 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-tooltip placement="top">
              <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" active-value="100"
                inactive-value="0">
              </el-switch>
            </el-tooltip>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add_classify_btn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 分类的表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="cateName" label="分类名称" width="180"></el-table-column>
      <el-table-column label="是否启用">
        <!-- :content="value"  -->
        <!-- <el-tooltip placement="top">  row.flag -->
        <!-- 表格的滑动按钮 -->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949" active-value="100"
            inactive-value="0">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器:当前页码,每页条数-->
    <!--page-sizes:每页条数的数组,page-sizes:可以选择的每页显示的条数,page-size: 默认每页显示的条数,pager:当前页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[5, 10, 15]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

  </el-card>

</template>

<script>
  import {
    API_GOODS_ADDCATE,
    API_GOODS_CATELIST
  } from "@/api/apis";

  export default {
    data() {
      return {
        // 第几页
        currentPage: 1,
        // 每页显示几条
        pageSize: '5',
        name: "",
        // 总条数
        total: 0,
        tableData: [],
        delivery: false,
        formLabelWidth: '120px',
        // 模态框是否显示
        dialogFormVisible: false,
        dialogTableVisible: false,
        value: '100',
        // flag:true
      };
    },

    methods: {
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      // 显示模态框
      add_btn() {
        // console.log(1);
        this.dialogFormVisible = true
      },
      add_classify_btn() {
        // console.log(1);
        // console.log(this.name);
        // console.log(this.value);
        let state = this.value == 100 ? 'true' : 'false';
        if (this.name == '') return;
        API_GOODS_ADDCATE(this.name, state).then(res => {
          // console.log(res.data.code);
          if (res.data.code == 0) {
            //  隐藏模态框
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功~',
              type: 'success'
            });
          }
        })
      },
      // 分页:动态每页显示条数
      handleSizeChange(val) {
        // console.log(`${val}`);
        this.pageSize = val; //动态改变
        // console.log(this.pageSize);
        this.refresh(this.currentPage)
        // 改变之后应该停留在当前的页面
        // this.refresh(this.pageSize)
      },
      // 分页:动态当前页,第几页
      handleCurrentChange(val) {
        // console.log(`${val}`);
        //动态改变:每页多少条
        this.currentPage = val;
        // console.log( this.currentPage );
        this.refresh(this.currentPage)
        // this.refresh(this.currentPage)

      },
      refresh() {
        API_GOODS_CATELIST(this.currentPage, this.pageSize).then(res => {
          this.total = res.data.total
          this.tableData = res.data.data
          this.tableData.forEach(i=> {
            i.state=i.state==1?'100':'0'
          });
        })
      }
    },
    created() {
      this.refresh(this.currentPage)
    },

  };
</script>

<style lang="less">
  .el-pagination .el-select .el-input .el-input__inner {
    padding-right: 25px;
    border-radius: 3px;
    width: 100px;
  }
</style>