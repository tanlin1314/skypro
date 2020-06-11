<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
            </div>
          <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        width="180">
    <el-input ></el-input>
   
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
          <el-table-column
        prop="date"
        label="是否启用"
        width="180">
        <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
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
          
            </el-card>
    </div>
</template>

<script>
    export default {
         data() {
      return {
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          value: true
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
    }
</script>

<style lang="less" scoped>
.box-card{
    margin: 20px;
}
</style>