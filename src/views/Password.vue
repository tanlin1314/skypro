<template>
    <div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                </div>

                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="ypass">
                        <el-input type="password" v-model="ruleForm.ypass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                    </el-form>
                </el-card>
    </div>
</template>

<script>
import {Checkoldpwd,Editpwd} from '@/api/apis.js'
    export default {
    data() {

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          ypass:''
       
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        
        }
      };
    },
    methods: {
      submitForm() {
        // 获取id
        this.id=localStorage.id
        // 获取密码
        console.log(this.ruleForm.ypass);
        console.log(this.ruleForm.pass);
        // console.log(this.id);
        
        
        // 验证原密码
        Checkoldpwd(this.ruleForm.ypass,this.id).then((res)=>{
          console.log(res);
          if(res.data.code==1){
            this.$message.error('原密码错误');
          }  
        })

        // 修改密码
        Editpwd(this.ruleForm.pass,this.id).then((res)=>{
          console.log(res);
          if(res.data.code==0){
               
            this.$message({
                message: '恭喜你，修改成功',
                type: 'success'
              });  
              setTimeout(()=>{
              this.$router.push('/');
              },2000)        
          }
          
        })


      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>

</style>