<template>
    <div>
             <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                </div>
<!-- :rules="rules" -->
                <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="name">
                        <el-input v-model.number="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                      <el-form-item label="用户组" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="选择用户组">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                    </el-select>
                    </el-form-item>
                
                 
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                    </el-form>
                </el-card>
    </div>
</template>

<script>
import {Account} from '@/api/apis.js'
    export default {
         data() {
      return {
        ruleForm: {
          name: '',
          pass: '',
          region: '超级管理员'
          
        }
      }
      
    },
     methods: {
      submitForm() {
        //   发送请求
        Account(this.ruleForm.name,this.ruleForm.pass,this.ruleForm.region).then((res)=>{
            // console.log(res);
            if(res.data.code==5001){
               this.$message.error('请填写信息');
            }else{
                this.$message({
                    showClose: true,
                    message: '恭喜你，添加成功',
                    type: 'success'
                    });
            }


                // this.ruleForm.name='';
                // this.ruleForm.pass='';



            
        })


      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }},
     
    }
</script>

<style lang="less" scoped>
.el-input{
    width: 38%;
}
.el-card{
    margin: 20px;
}
</style>